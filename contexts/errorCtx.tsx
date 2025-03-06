import { AxiosError } from 'axios';
import React, { createContext, useState, useContext } from 'react';

type ApiError = {
  message: string;
  info?: any,
  status?: number;
  canRetry: boolean
};

type ErrorResponseData = {
    message?: string;
    error?: any;
  };

type ErrorContextType = {
  apiErrors: ApiError[];
  hasErrors: boolean;
  addApiError: (error: AxiosError<ErrorResponseData>) => void;
  clearApiErrors: () => void;
  nextApiError: () => void;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

interface ErrorProviderProps {
  children: React.ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [apiErrors, setApiErrors] = useState<ApiError[]>([]);
  const hasErrors = apiErrors.length > 0;

  const addApiError = (error: AxiosError<ErrorResponseData>) => {
      const newApiErr = {
          message: error.response?.data?.message || error.message || 'something went wrong',
          status: error.response?.status,
          info: error.response?.data?.error || {},
          canRetry: error.response?.status !== 500
      }
      setApiErrors((prevErrors) => [...prevErrors, newApiErr]);
  };

  const clearApiErrors = () => {
    setApiErrors([]);
  };

  const nextApiError = () => {
    if (apiErrors.length) {
      setApiErrors((prevErrors) => prevErrors.slice(1));
    }
  }

  return (
    <ErrorContext.Provider value={{
        apiErrors,
        addApiError,
        clearApiErrors,
        nextApiError,
        hasErrors
    }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useErrorContext must be used within an ErrorProvider');
  }
  return context;
};