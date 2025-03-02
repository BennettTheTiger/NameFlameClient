import React, { createContext, useState, useContext, useEffect } from 'react';

type ModalInfo = {
  message: string;
  primaryActionTitle: string;
  primaryAction: () => void;
  secondaryActionTitle?: string;
  secondaryAction?: () => void;
};

type ConfirmationContextType = {
  confirmationModals: ModalInfo[];
  requiresConfirmation: boolean;
  requireConfirmation: (newModal: Partial<ModalInfo>) => void;
  resolveModal: () => void;
};

const ConfirmationContext = createContext<ConfirmationContextType | undefined>(undefined);

interface ChildProviderProps {
  children: React.ReactNode;
}

export const ConfirmationProvider: React.FC<ChildProviderProps> = ({ children }) => {
  const [confirmationModals, setConfirmationModals] = useState<ModalInfo[]>([]);
  const requiresConfirmation = confirmationModals.length > 0;

  const resolveModal = () => {
    setConfirmationModals((prevModals) => {
        if (prevModals.length === 0) {
            return prevModals;
        }
        return prevModals.slice(1);
    });
  };

  const requireConfirmation = (newModal: Partial<ModalInfo>) => {
    const defaultModal = {
      message: 'Are you sure?',
      primaryActionTitle: 'Ok',
      primaryAction: () => { console.log('default primary action') },
      secondaryActionTitle: 'Cancel',
      secondaryAction: resolveModal,
    };
    setConfirmationModals((prevModals) => [...prevModals, { ...defaultModal, ...newModal }]);
  };


  return (
    <ConfirmationContext.Provider value={{
      confirmationModals,
      requireConfirmation,
      resolveModal,
      requiresConfirmation
    }}>
      {children}
    </ConfirmationContext.Provider>
  );
};

export const useConfirmationContext = (): ConfirmationContextType => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error('useConfirmationContext must be used within a ConfirmationProvider');
  }
  return context;
};