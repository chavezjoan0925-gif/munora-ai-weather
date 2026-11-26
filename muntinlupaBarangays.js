/**
 * Muntinlupa City Barangays Microclimate Database
 * Preloaded recent search history entries with high-resolution microclimates
 */

export const INITIAL_MUNTINLUPA_BARANGAYS = [
  {
    id: "muntinlupa-alabang",
    name: "Alabang",
    subtitle: "Filinvest / Madrigal Business Park",
    city: "Muntinlupa City",
    province: "Metro Manila",
    region: "NCR",
    islandGroup: "Luzon",
    environment: "city",
    elevation: "24m (Alabang Commercial Plateau)",
    temp: 31,
    condition: "Fair",
    timeAgo: "10m ago",
    typicalCondition: "Fair / Warm Breeze",
    baseTemp: 31,
    baseHumidity: 72,
    rainfallAlert: null,
    tcwsAlert: null,
    tag: "Filinvest & Madrigal Commercial Hub"
  },
  {
    id: "muntinlupa-ayala-alabang",
    name: "Ayala Alabang",
    subtitle: "Residential District",
    city: "Muntinlupa City",
    province: "Metro Manila",
    region: "NCR",
    islandGroup: "Luzon",
    environment: "city",
    elevation: "32m (Low-Density Canopy Ridge)",
    temp: 31,
    condition: "Partly Cloudy",
    timeAgo: "25m ago",
    typicalCondition: "Partly Cloudy",
    baseTemp: 31,
    baseHumidity: 74,
    rainfallAlert: null,
    tcwsAlert: null,
    tag: "Tree-Canopy Residential District"
  },
  {
    id: "muntinlupa-tunasan",
    name: "Tunasan",
    subtitle: "South Border Laguna Gateway",
    city: "Muntinlupa City",
    province: "Metro Manila",
    region: "NCR",
    islandGroup: "Luzon",
    environment: "city",
    elevation: "11m (South Coastal Border / San Pedro Link)",
    temp: 30,
    condition: "Light Rain",
    timeAgo: "1h ago",
    typicalCondition: "Light Rain / Coastal Overcast",
    baseTemp: 30,
    baseHumidity: 84,
    rainfallAlert: "Yellow Advisory (Localized Lake Shower Bands)",
    tcwsAlert: null,
    tag: "South Border Laguna Gateway"
  },
  {
    id: "muntinlupa-putatan",
    name: "Putatan",
    subtitle: "City Hall Synoptic Station",
    city: "Muntinlupa City",
    province: "Metro Manila",
    region: "NCR",
    islandGroup: "Luzon",
    environment: "city",
    elevation: "16m (Government Center & Synoptic Base)",
    temp: 31,
    condition: "High Heat 39°C",
    timeAgo: "2h ago",
    typicalCondition: "High Heat 39°C (Caution Index)",
    baseTemp: 32,
    baseHumidity: 79,
    rainfallAlert: null,
    tcwsAlert: null,
    tag: "City Hall Synoptic Station"
  },
  {
    id: "muntinlupa-poblacion",
    name: "Poblacion",
    subtitle: "Lakefront / Synoptic Station",
    city: "Muntinlupa City",
    province: "Metro Manila",
    region: "NCR",
    islandGroup: "Luzon",
    environment: "countryside",
    elevation: "8m (Laguna de Bay Lakefront Shoreline)",
    temp: 30,
    condition: "Moderate Breeze",
    timeAgo: "Yesterday",
    typicalCondition: "Moderate Breeze / Fresh Lake Air",
    baseTemp: 30,
    baseHumidity: 78,
    rainfallAlert: null,
    tcwsAlert: null,
    tag: "Lakefront Heritage Center"
  }
];

// Helper to convert a barangay entry into full city format for weatherEngine
export function barangayToCityFormat(b) {
  return {
    id: b.id,
    name: `${b.name}, Muntinlupa`,
    province: "Metro Manila",
    region: "NCR",
    islandGroup: "Luzon",
    environment: b.environment,
    elevation: b.elevation,
    baseTemp: b.baseTemp,
    baseHumidity: b.baseHumidity,
    typicalCondition: b.typicalCondition,
    rainfallAlert: b.rainfallAlert,
    tcwsAlert: b.tcwsAlert,
    tag: b.tag
  };
}

