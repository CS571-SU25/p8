// Weather alert monitoring service
import { NotificationService } from './notificationService';

export class AlertMonitor {
  constructor() {
    this.lastCheckedWeather = null;
    this.triggeredAlerts = new Set(); // Track which alerts have been triggered recently
  }

  checkAlerts(weatherData, alerts) {
    if (!weatherData || !alerts || alerts.length === 0) {
      return;
    }

    const activeAlerts = alerts.filter(alert => alert.enabled);
    
    activeAlerts.forEach(alert => {
      const shouldTrigger = this.shouldTriggerAlert(alert, weatherData);
      
      if (shouldTrigger) {
        this.triggerAlert(alert, weatherData);
      }
    });
    
    this.lastCheckedWeather = weatherData;
  }

  shouldTriggerAlert(alert, weather) {
    // Don't trigger the same alert multiple times within 30 minutes
    const alertKey = `${alert.id}-${Date.now()}`;
    const thirtyMinutesAgo = Date.now() - (30 * 60 * 1000);
    
    // Clean old triggered alerts
    this.triggeredAlerts.forEach(key => {
      const timestamp = parseInt(key.split('-').pop());
      if (timestamp < thirtyMinutesAgo) {
        this.triggeredAlerts.delete(key);
      }
    });

    // Check if this alert was recently triggered
    const recentlyTriggered = Array.from(this.triggeredAlerts).some(key => 
      key.startsWith(`${alert.id}-`)
    );

    if (recentlyTriggered) {
      return false;
    }

    // Check alert conditions
    const conditionResult = this.evaluateAlertCondition(alert, weather);
    return conditionResult;
  }

  evaluateAlertCondition(alert, weather) {
    const { type, threshold, condition } = alert;
    // Get location from either alert.location or alert.settings.location
    const alertLocation = alert.location || alert.settings?.location;

    // Check if location matches (case-insensitive)
    if (alertLocation && weather.location) {
      const normalizedAlertLocation = alertLocation.toLowerCase().trim();
      const normalizedCurrentLocation = weather.location.toLowerCase().trim();
      
      // Check if locations match (exact match or if current location contains alert location)
      const locationMatches = normalizedAlertLocation === 'current location' || 
                             normalizedCurrentLocation === normalizedAlertLocation ||
                             normalizedCurrentLocation.includes(normalizedAlertLocation) ||
                             normalizedAlertLocation.includes(normalizedCurrentLocation);
      
      if (!locationMatches) {
        return false;
      }
    }

    if (!threshold) {
      // For alerts without specific thresholds, check general conditions
      return this.checkGeneralConditions(alert, weather);
    }

    let currentValue;
    
    switch (type) {
      case 'temperature':
        currentValue = weather.temp;
        break;
      case 'wind':
        currentValue = weather.windSpeed || 0;
        break;
      case 'humidity':
        currentValue = weather.humidity || 0;
        break;
      case 'pressure':
        currentValue = weather.pressure || 0;
        break;
      case 'precipitation':
        // Check if it's currently raining/snowing
        return weather.description.toLowerCase().includes('rain') || 
               weather.description.toLowerCase().includes('snow') ||
               weather.description.toLowerCase().includes('storm');
      default:
        return false;
    }

    if (currentValue === undefined) {
      return false;
    }

    // Evaluate condition
    let result = false;
    switch (condition) {
      case 'above':
        result = currentValue > threshold;
        break;
      case 'below':
        result = currentValue < threshold;
        break;
      case 'equals':
        result = Math.abs(currentValue - threshold) < 0.1;
        break;
      default:
        return false;
    }

    return result;
  }

  checkGeneralConditions(alert, weather) {
    const description = weather.description.toLowerCase();
    const { type } = alert;

    switch (type) {
      case 'precipitation':
        return description.includes('rain') || description.includes('snow') || description.includes('storm');
      case 'wind':
        return description.includes('wind') || (weather.windSpeed && weather.windSpeed > 20);
      case 'general':
        return description.includes('storm') || description.includes('severe');
      default:
        return false;
    }
  }

  async triggerAlert(alert, weather) {
    // Add to triggered alerts set
    this.triggeredAlerts.add(`${alert.id}-${Date.now()}`);

    // Show browser notification
    try {
      await NotificationService.showWeatherAlert(alert, weather);
    } catch (error) {
      console.error('Error showing notification:', error);
    }

    // You could also trigger other actions here:
    // - Play a sound
    // - Show in-app notification
    // - Send to external services
    
    return true;
  }



  // Get status of monitoring
  getStatus() {
    return {
      lastChecked: this.lastCheckedWeather,
      triggeredAlertsCount: this.triggeredAlerts.size,
      isMonitoring: true
    };
  }

  // Clear triggered alerts (useful for testing)
  clearTriggeredAlerts() {
    this.triggeredAlerts.clear();
  }
}

// Create a singleton instance
export const alertMonitor = new AlertMonitor();