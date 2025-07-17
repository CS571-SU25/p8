import React, { createContext, useState } from 'react';

export const AlertsContext = createContext();

export const AlertsProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (alert) => {
    setAlerts([...alerts, { ...alert, id: Date.now(), enabled: true }]);
  };

  const removeAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const toggleAlert = (id) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
      )
    );
  };

  return (
    <AlertsContext.Provider value={{ alerts, addAlert, removeAlert, toggleAlert }}>
      {children}
    </AlertsContext.Provider>
  );
};