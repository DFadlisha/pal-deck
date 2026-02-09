// Notification types
export type NotificationType = 'match' | 'message' | 'like' | 'info';

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
    data?: any;
}

class NotificationService {
    private notifications: Notification[] = [];
    private listeners: ((notifications: Notification[]) => void)[] = [];

    // Request notification permission
    async requestPermission(): Promise<boolean> {
        if (!('Notification' in window)) {
            console.log('This browser does not support notifications');
            return false;
        }

        if (Notification.permission === 'granted') {
            return true;
        }

        if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();
            return permission === 'granted';
        }

        return false;
    }

    // Show browser notification
    async showNotification(title: string, options?: NotificationOptions) {
        const hasPermission = await this.requestPermission();

        if (hasPermission) {
            new Notification(title, {
                icon: '/paldeck-icon.png',
                badge: '/paldeck-badge.png',
                ...options,
            });
        }
    }

    // Add in-app notification
    addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) {
        const newNotification: Notification = {
            ...notification,
            id: Date.now().toString(),
            timestamp: new Date(),
            read: false,
        };

        this.notifications.unshift(newNotification);
        this.notifyListeners();

        // Also show browser notification
        this.showNotification(notification.title, {
            body: notification.message,
            tag: notification.type,
        });

        return newNotification;
    }

    // Get all notifications
    getNotifications(): Notification[] {
        return this.notifications;
    }

    // Get unread count
    getUnreadCount(): number {
        return this.notifications.filter(n => !n.read).length;
    }

    // Mark notification as read
    markAsRead(id: string) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification) {
            notification.read = true;
            this.notifyListeners();
        }
    }

    // Mark all as read
    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
        this.notifyListeners();
    }

    // Clear all notifications
    clearAll() {
        this.notifications = [];
        this.notifyListeners();
    }

    // Subscribe to notification changes
    subscribe(callback: (notifications: Notification[]) => void) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }

    private notifyListeners() {
        this.listeners.forEach(listener => listener(this.notifications));
    }

    // Notification helpers
    notifyMatch(userName: string, userPhoto: string) {
        return this.addNotification({
            type: 'match',
            title: "It's a Match! 🎉",
            message: `You and ${userName} want to be friends!`,
            data: { userName, userPhoto },
        });
    }

    notifyMessage(userName: string, message: string) {
        return this.addNotification({
            type: 'message',
            title: `New message from ${userName}`,
            message: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
            data: { userName },
        });
    }

    notifyLike(userName: string) {
        return this.addNotification({
            type: 'like',
            title: 'Someone likes you! 💙',
            message: `${userName} swiped right on you!`,
            data: { userName },
        });
    }
}

export const notificationService = new NotificationService();
