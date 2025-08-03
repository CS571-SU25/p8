// Browser notification service for weather alerts
export class NotificationService {
  static async requestPermission() {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission === 'denied') {
      return false;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  static async showNotification(title, options = {}) {
    const hasPermission = await this.requestPermission();
    
    if (!hasPermission) {
      console.warn('Notification permission not granted');
      return null;
    }

    // Filter out unsupported options for basic Notification constructor
    const { actions, ...supportedOptions } = options;
    
    const defaultOptions = {
      icon: '/vite.svg',
      badge: '/vite.svg',
      tag: 'weather-alert',
      requireInteraction: true,
      ...supportedOptions
    };

    try {
      const notification = new Notification(title, defaultOptions);
      
      // Add click handler for basic interaction
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
      
      // Auto-close after 10 seconds if not interacted with
      setTimeout(() => {
        if (notification) {
          notification.close();
        }
      }, 10000);

      return notification;
    } catch (error) {
      console.error('Error showing notification:', error);
      return null;
    }
  }

  static showWeatherAlert(alert, currentWeather) {
    const title = `🌤️ Weather Alert: ${alert.title}`;
    const body = `${alert.description}\nCurrent: ${currentWeather.temp}°C, ${currentWeather.description}`;
    
    const options = {
      body,
      icon: this.getWeatherIcon(alert.type),
      tag: `weather-alert-${alert.id}`,
      data: { alertId: alert.id, type: 'weather-alert' }
      // Note: actions are not supported in basic Notification constructor
      // They are only available in ServiceWorkerRegistration.showNotification()
    };

    return this.showNotification(title, options);
  }

  static getWeatherIcon(alertType) {
    const icons = {
      temperature: '🌡️',
      precipitation: '🌧️',
      wind: '💨',
      humidity: '💧',
      pressure: '📊',
      uv: '☀️',
      'air-quality': '🌫️',
      general: '⚠️'
    };
    return icons[alertType] || '⚠️';
  }

  static checkPermissionStatus() {
    if (!('Notification' in window)) {
      return 'not-supported';
    }
    return Notification.permission;
  }

  static async testNotification() {
    const title = '🧪 Test Notification';
    const options = {
      body: 'This is a test notification to verify that notifications are working correctly.',
      icon: '/vite.svg',
      tag: 'test-notification'
    };

    return this.showNotification(title, options);
  }
}