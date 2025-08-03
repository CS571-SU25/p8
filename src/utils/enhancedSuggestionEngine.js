// Enhanced suggestion engine with more detailed recommendations
export const enhancedSuggestionEngine = {
  // Base weather recommendations
  weather: {
    rain: {
      base: 'Waterproof protection is essential today.',
      items: ['Waterproof jacket or raincoat', 'Umbrella', 'Water-resistant shoes', 'Quick-dry materials'],
      accessories: ['Waterproof bag', 'Hood or hat'],
      tips: 'Avoid suede or leather shoes. Choose darker colors to hide water spots.'
    },
    hot: {
      base: 'Stay cool and protected from the sun.',
      items: ['Lightweight breathable fabrics', 'Short sleeves or sleeveless', 'Shorts or light pants', 'Sandals or breathable shoes'],
      accessories: ['Sunglasses', 'Sun hat', 'Sunscreen'],
      tips: 'Choose light colors to reflect heat. Cotton and linen are ideal fabrics.'
    },
    warm: {
      base: 'Perfect weather for layering.',
      items: ['Light jacket or cardigan', 'Long sleeves or light sweater', 'Comfortable pants', 'Closed-toe shoes'],
      accessories: ['Light scarf (optional)', 'Crossbody bag'],
      tips: 'Easy to remove layers if it gets warmer. Great weather for most activities.'
    },
    cool: {
      base: 'Layer up for comfort and style.',
      items: ['Medium-weight jacket', 'Sweater or hoodie', 'Long pants', 'Closed shoes with socks'],
      accessories: ['Light scarf', 'Beanie (optional)'],
      tips: 'Perfect for layering. Consider bringing a light jacket you can carry.'
    },
    cold: {
      base: 'Bundle up and stay warm.',
      items: ['Heavy coat or parka', 'Warm sweater or thermal layers', 'Insulated pants', 'Warm boots'],
      accessories: ['Warm scarf', 'Gloves', 'Beanie or warm hat'],
      tips: 'Layer thermal underwear. Protect extremities from cold. Waterproof outer layer recommended.'
    }
  },

  // Gender-specific suggestions
  gender: {
    female: {
      hot: {
        items: ['Sundress', 'Flowy blouse', 'Skirt or shorts', 'Sandals or ballet flats'],
        accessories: ['Statement earrings', 'Crossbody bag', 'Hair ties'],
        tips: 'Flowy fabrics help with air circulation. Consider a light cardigan for air conditioning.'
      },
      warm: {
        items: ['Blouse or nice top', 'Cardigan or blazer', 'Jeans or trousers', 'Flats or low heels'],
        accessories: ['Scarf as accent', 'Handbag', 'Light jewelry'],
        tips: 'Great weather for transitional pieces. Mix textures for visual interest.'
      },
      cool: {
        items: ['Sweater or pullover', 'Trench coat or jacket', 'Jeans or pants', 'Boots or closed shoes'],
        accessories: ['Scarf', 'Tote bag', 'Statement necklace'],
        tips: 'Perfect for boots and cozy sweaters. Layer necklaces for style.'
      },
      cold: {
        items: ['Wool coat or puffer jacket', 'Warm sweater', 'Thermal leggings or pants', 'Warm boots'],
        accessories: ['Warm scarf', 'Gloves', 'Beanie', 'Warm socks'],
        tips: 'Invest in quality outerwear. Thermal layers are your friend.'
      }
    },
    male: {
      hot: {
        items: ['T-shirt or polo', 'Shorts or linen pants', 'Sneakers or loafers', 'Lightweight shirt'],
        accessories: ['Watch', 'Minimal wallet', 'Sunglasses'],
        tips: 'Linen and cotton are ideal. Consider moisture-wicking fabrics for active days.'
      },
      warm: {
        items: ['Long-sleeve shirt', 'Light jacket or cardigan', 'Chinos or jeans', 'Casual shoes'],
        accessories: ['Belt', 'Watch', 'Light jacket'],
        tips: 'Great weather for smart casual looks. Easy to adjust layers.'
      },
      cool: {
        items: ['Sweater or hoodie', 'Jacket or blazer', 'Jeans or trousers', 'Boots or dress shoes'],
        accessories: ['Scarf', 'Watch', 'Leather jacket'],
        tips: 'Perfect for layering. Denim jackets work great over sweaters.'
      },
      cold: {
        items: ['Heavy coat or parka', 'Warm sweater', 'Thermal layers', 'Insulated boots'],
        accessories: ['Beanie', 'Gloves', 'Warm scarf', 'Thick socks'],
        tips: 'Thermal underwear is essential. Waterproof outer layers recommended.'
      }
    }
  },

  // Purpose-specific recommendations
  purpose: {
    business: {
      description: 'Professional and polished appearance',
      items: ['Dress shirt or blouse', 'Blazer or suit jacket', 'Dress pants or skirt', 'Dress shoes'],
      accessories: ['Professional bag', 'Watch', 'Minimal jewelry'],
      tips: 'Stick to neutral colors. Ensure clothes are well-fitted and wrinkle-free.'
    },
    casual: {
      description: 'Comfortable and relaxed style',
      items: ['Comfortable top', 'Jeans or casual pants', 'Sneakers or casual shoes', 'Casual jacket'],
      accessories: ['Casual bag', 'Comfortable accessories'],
      tips: 'Prioritize comfort. Mix and match favorite pieces.'
    },
    sport: {
      description: 'Athletic and functional wear',
      items: ['Moisture-wicking top', 'Athletic shorts or leggings', 'Sports shoes', 'Athletic jacket'],
      accessories: ['Sports watch', 'Water bottle', 'Gym bag'],
      tips: 'Choose breathable, flexible fabrics. Proper footwear is crucial.'
    },
    formal: {
      description: 'Elegant and sophisticated attire',
      items: ['Formal dress or suit', 'Dress shoes', 'Elegant accessories'],
      accessories: ['Formal bag', 'Dress watch', 'Elegant jewelry'],
      tips: 'Pay attention to fit and details. Classic styles work best.'
    },
    outdoor: {
      description: 'Practical and weather-appropriate',
      items: ['Outdoor jacket', 'Comfortable pants', 'Hiking boots or sturdy shoes', 'Layers'],
      accessories: ['Backpack', 'Hat', 'Outdoor gear'],
      tips: 'Layer for temperature changes. Choose durable, weather-resistant materials.'
    }
  },

  // Style preferences
  styles: {
    modern: {
      description: 'Clean lines and contemporary pieces',
      characteristics: ['Minimalist', 'Sleek', 'Updated classics']
    },
    classic: {
      description: 'Timeless and traditional styles',
      characteristics: ['Traditional cuts', 'Neutral colors', 'Quality basics']
    },
    trendy: {
      description: 'Current fashion trends and statement pieces',
      characteristics: ['Fashion-forward', 'Bold choices', 'Seasonal trends']
    },
    bohemian: {
      description: 'Free-spirited and artistic style',
      characteristics: ['Flowy fabrics', 'Earthy tones', 'Layered accessories']
    },
    minimalist: {
      description: 'Simple and understated elegance',
      characteristics: ['Neutral palette', 'Clean lines', 'Quality over quantity']
    }
  },

  // Color recommendations based on weather and season
  colors: {
    hot: ['White', 'Light blue', 'Pastels', 'Light gray', 'Cream'],
    warm: ['Earth tones', 'Soft colors', 'Light layers'],
    cool: ['Deeper tones', 'Jewel colors', 'Rich textures'],
    cold: ['Dark colors', 'Rich tones', 'Warm colors'],
    rain: ['Darker colors', 'Navy', 'Black', 'Dark gray']
  }
};

// Function to get weather category
export const getWeatherCategory = (temp, condition) => {
  if (condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('storm')) {
    return 'rain';
  } else if (temp > 25) {
    return 'hot';
  } else if (temp > 18) {
    return 'warm';
  } else if (temp > 10) {
    return 'cool';
  } else {
    return 'cold';
  }
};

// Enhanced outfit suggestion function
export const getEnhancedOutfitSuggestion = (weatherData, userPreferences) => {
  const { temp, condition } = weatherData;
  const { gender, purpose, style, colorPreference, weatherSensitivity } = userPreferences;
  
  const weatherCategory = getWeatherCategory(temp, condition);
  const weatherInfo = enhancedSuggestionEngine.weather[weatherCategory];
  const genderInfo = enhancedSuggestionEngine.gender[gender][weatherCategory];
  const purposeInfo = enhancedSuggestionEngine.purpose[purpose];
  const styleInfo = enhancedSuggestionEngine.styles[style];
  
  // Adjust for weather sensitivity
  let adjustedWeatherCategory = weatherCategory;
  if (weatherSensitivity === 'sensitive') {
    if (weatherCategory === 'warm') adjustedWeatherCategory = 'cool';
    if (weatherCategory === 'cool') adjustedWeatherCategory = 'cold';
  } else if (weatherSensitivity === 'resistant') {
    if (weatherCategory === 'cool') adjustedWeatherCategory = 'warm';
    if (weatherCategory === 'cold') adjustedWeatherCategory = 'cool';
  }

  return {
    weatherCategory: adjustedWeatherCategory,
    baseRecommendation: weatherInfo.base,
    essentialItems: [...weatherInfo.items, ...genderInfo.items],
    accessories: [...weatherInfo.accessories, ...genderInfo.accessories],
    tips: [weatherInfo.tips, genderInfo.tips, purposeInfo.tips].filter(Boolean),
    purposeGuidance: purposeInfo.description,
    styleGuidance: styleInfo.description,
    colorSuggestions: enhancedSuggestionEngine.colors[weatherCategory],
    detailedSuggestion: generateDetailedSuggestion(weatherInfo, genderInfo, purposeInfo, styleInfo)
  };
};

// Generate a detailed, personalized suggestion
const generateDetailedSuggestion = (weatherInfo, genderInfo, purposeInfo, styleInfo) => {
  return `${weatherInfo.base} For your ${purposeInfo.description.toLowerCase()}, consider ${genderInfo.items.slice(0, 2).join(' and ')}. ${styleInfo.description} would work well with ${genderInfo.accessories.slice(0, 2).join(' and ')}. ${weatherInfo.tips}`;
};