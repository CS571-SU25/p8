import React, { createContext, useState } from 'react';

export const ReportsContext = createContext();

export const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState([]);

  const submitReport = (report) => {
    // In a real app, this would likely post to a server
    setReports([...reports, { ...report, id: Date.now() }]);
    console.log('Report submitted:', report);
  };

  const fetchReports = () => {
    // In a real app, this would fetch from a server
    console.log('Fetching reports...');
  };

  return (
    <ReportsContext.Provider value={{ reports, submitReport, fetchReports }}>
      {children}
    </ReportsContext.Provider>
  );
};