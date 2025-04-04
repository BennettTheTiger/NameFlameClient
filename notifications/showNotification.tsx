import { Platform } from 'react-native';
import showWebNotification from './showWebNotification';

function showNotification(title: string, message: string, data?: any) {
    if (Platform.OS === 'web') {
        showWebNotification(title, message);
    }
    else {
        // For mobile platforms, use Expo Notifications
        const { Notifications } = require('expo-notifications');
        Notifications.scheduleNotificationAsync({
            content: {
                title,
                body: message,
                data,
            },
            trigger: null, // Show immediately
        });
    }
}

export default showNotification;