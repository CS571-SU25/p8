# Weather Forecast Web App — UI & Implementation Plan

## 1. Overview
This document systematically combines UI design prototypes with specific implementation methods to help the team form a unified understanding of interface and functionality implementation for each module based on the existing project structure. The document does not include deployment steps and focuses solely on the alignment of functionality implementation and interface design.

## 2. Technology Stack & Project Structure
- **Frontend Framework**: React + Vite
- **UI Library**: React-Bootstrap + Custom CSS (modular .module.css)
- **State Management**: React Context + Hooks + js-cookie
- **Routing**: React Router (HashRouter)

```
src/
├── assets/             # Icons, static resources
├── components/         # Components (organized by functionality folders)
├── contexts/           # Global Context providers
├── hooks/              # Custom Hooks
├── pages/              # Route pages (HomePage, ItineraryPage)
├── utils/              # API encapsulation & utility functions
├── App.jsx             # Routing & Provider nesting
└── main.jsx            # Entry point (imports global CSS)
```

## 3. Global UI Structure

### Header
- Logo + Application name
- City search box
- Action icons (favorites, refresh, settings)

### Tab Navigation
- Overview / OOTD / Alerts / Sun Times
- Implemented using React-Bootstrap `<Nav>` or custom styled Pill-style tabs

### Content Area
- Renders corresponding page components based on currently selected tab

## 4. Tab Design & Implementation

### 4.1 Overview

#### UI Elements
1. **Large Card (.OverviewCard)**
   - Left side: Weather icon + main temperature + description
   - Top right: Date
   - Bottom right: Feels-like temperature + UV index
2. **4 Metric Tiles** (Humidity, Wind, Visibility, Pressure)
3. **Footer**: Sunrise/sunset times

#### Implementation
- Component: `<CurrentConditions>`
- Styling: CurrentConditions.module.css
- Data source: WeatherContext.current
- Sub-components: `<DetailTile icon label value />`
- 5-day carousel: `<ForecastCarousel>`, using React-Bootstrap `<Carousel>`

### 4.2 OOTD (Outfit of the Day)

#### UI Elements
1. **Card Display**: Image + title + description + tags (`<Badge>`)
2. **Controls**: Preferences button, Refresh button
3. **Suggestion Banner**: Highlighted background text strip

#### Implementation
- Component: `<OOTDCard>`
- Props: `{ outfit, onRefresh, onOpenPreferences }`
- Data: Backend or AI recommendation service returns outfit object
- Styling: OOTDCard.module.css

### 4.3 Alerts

#### UI Elements
1. **List**: Each item with highlighted border, containing icon + title + description
2. **Action Icons**: 🔔 toggle enable/disable, ❌ delete
3. **Add Button**: Top right corner + Add Alert

#### Implementation
- Components: `<AlertList>`, `<AlertFormModal>`
- Context: AlertsContext provides alerts, addAlert(), removeAlert(), toggleAlert()
- Periodic checking: useEffect + setInterval, triggers notifications based on WeatherContext.current
- Styling: AlertList.module.css

### 4.4 Sun Times

#### UI Elements
1. **Daylight Progress Bar**: Shows percentage of daylight passed + current time
2. **Sunrise and Sunset Cards**: Colorful gradient background + time + distance (past/remaining)
3. **Footer**: Total day length or "Currently daytime"

#### Implementation
- Component: `<SunTimes>`
- Data: WeatherContext.current.sunrise, sunset
- Calculation: JS Date object comparison with current time
- Progress bar: Bootstrap `<ProgressBar>` or custom `<div className="progress">`
- Styling: SunTimes.module.css

## 5. Context & Data Flow

### WeatherContext
- current, forecast state
- Method: fetchWeather(location)
- Called during initialization and search

### FavoritesContext
- favorites: string[]
- Syncs with cookies (js-cookie)
- toggleFavorite(location)

### AlertsContext
- alerts: AlertItem[]
- addAlert(), removeAlert(), toggleAlert()
- Periodic checking and notification triggering

### ReportsContext
- reports: Report[]
- submitReport(), fetchReports()

## 6. Common Utilities & Hooks

### api.js
```javascript
export async function getCurrentAndForecast(loc) { /* fetch current + forecast */ }
export async function getHistorical(loc, dateRange) { /* ... */ }
```

### useFetchWeather.js
```javascript
import { useContext, useEffect } from 'react';

function useFetchWeather(location) {
  const { fetchWeather } = useContext(WeatherContext);
  useEffect(() => { fetchWeather(location); }, [location]);
}
```

### cookies.js
Encapsulates js-cookie for reading/writing favorites

## Conclusion
Through the above alignment of UI and implementation methods, the team can clearly define each component's responsibilities, the location of style files, and the flow of state/data, ensuring efficient collaboration and code maintainability. Wishing the project smooth progress!