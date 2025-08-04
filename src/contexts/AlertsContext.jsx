import React, { createContext, useState, useEffect, useContext } from 'react';
import { alertMonitor } from '../utils/alertMonitor';
import { NotificationService } from '../utils/notificationService';

export const AlertsContext = createContext();

const ALERTS_STORAGE_KEY = 'weatherapp_alerts';

export function AlertsProvider({ children }) {
  const [alerts, setAlerts] = useState([]);
  const [notificationPermission, setNotificationPermission] = useState('default');

  // Load alerts from localStorage on mount
  useEffect(() => {
    const savedAlerts = localStorage.getItem('weatherAlerts');
    if (savedAlerts) {
      setAlerts(JSON.parse(savedAlerts));
    }
    
    // Check notification permission status
    setNotificationPermission(NotificationService.checkPermissionStatus());
  }, []);

  // Save alerts to localStorage when they change
  useEffect(() => {
    localStorage.setItem('weatherAlerts', JSON.stringify(alerts));
  }, [alerts]);

  // Request notification permission when first alert is added
  useEffect(() => {
    if (alerts.length > 0 && notificationPermission === 'default') {
      NotificationService.requestPermission().then(granted => {
        setNotificationPermission(granted ? 'granted' : 'denied');
      });
    }
  }, [alerts.length, notificationPermission]);

  const addAlert = (alert) => {
    const newAlert = {
      ...alert,
      id: Date.now(),
      enabled: true,
      createdAt: new Date().toISOString(),
      type: alert.type || 'general',
      priority: alert.priority || 'medium'
    };
    setAlerts(prevAlerts => [...prevAlerts, newAlert]);
  };

  const removeAlert = (id) => {
    setAlerts(prevAlerts => prevAlerts.filter((alert) => alert.id !== id));
  };

  const toggleAlert = (id) => {
    setAlerts(prevAlerts =>
      prevAlerts.map((alert) =>
        alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
      )
    );
  };

  const updateAlert = (id, updates) => {
    setAlerts(prevAlerts =>
      prevAlerts.map((alert) =>
        alert.id === id ? { ...alert, ...updates, updatedAt: new Date().toISOString() } : alert
      )
    );
  };

  const clearAllAlerts = () => {
    setAlerts([]);
  };

  const getActiveAlerts = () => {
    return alerts.filter(alert => alert.enabled);
  };

  // Method to check alerts against current weather
  const checkAlerts = (currentWeather) => {
    console.log('AlertsContext: checkAlerts called with:', { currentWeather, alertsCount: alerts.length });
    if (currentWeather && alerts.length > 0) {
      alertMonitor.checkAlerts(currentWeather, alerts);
    }
  };



  // Method to request notification permission manually
  const requestNotificationPermission = async () => {
    const granted = await NotificationService.requestPermission();
    setNotificationPermission(granted ? 'granted' : 'denied');
    return granted;
  };

  const value = {
    alerts,
    addAlert,
    removeAlert,
    toggleAlert,
    updateAlert,
    clearAllAlerts,
    checkAlerts,
    notificationPermission,
    requestNotificationPermission
  };

  return (
    <AlertsContext.Provider value={value}>
      {children}
    </AlertsContext.Provider>
  );
};