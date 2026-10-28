export type Role = 'farmer' | 'expert' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone: string;
  location: string;
  avatar: string;
  language: string;
}

export interface Farm {
  id: string;
  userId: string;
  name: string;
  location: string;
  areaAcres: number;
  soilType: 'Loamy' | 'Clay' | 'Black Cotton' | 'Sandy' | 'Alluvial' | 'Red';
  irrigationType: 'Drip' | 'Sprinkler' | 'Canal' | 'Rainfed';
  activeCropsCount: number;
  status: 'Active' | 'Fallow' | 'Preparation';
  registeredDate: string;
}

export interface Crop {
  id: string;
  farmId: string;
  name: string;
  variety: string;
  sowingDate: string;
  expectedHarvest: string;
  currentStage: 'Germination' | 'Vegetative' | 'Flowering' | 'Maturity' | 'Harvesting';
  stageProgress: number; // 0-100%
  healthScore: number; // 0-100
  targetYieldTons: number;
  waterNeed: 'Low' | 'Medium' | 'High';
  soilMoistureCurrent: number;
  notes: string;
}

export interface SoilReport {
  id: string;
  farmId: string;
  farmName: string;
  testDate: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  phLevel: number;
  organicCarbon: number;
  moisture: number;
  ec: number;
  healthStatus: 'Excellent' | 'Good' | 'Deficient' | 'Critical';
  recommendations: string[];
}

export interface WeatherData {
  current: {
    temp: number;
    feelsLike: number;
    condition: string;
    humidity: number;
    windSpeedKmh: number;
    windDirection: string;
    rainfallProbability: number;
    rainfallExpectedMm: number;
    uvIndex: number;
    soilTempCelsius: number;
    soilMoisturePercent: number;
    sprayingSuitability: string;
    sprayNotice: string;
    location: string;
  };
  forecast: {
    day: string;
    date: string;
    minTemp: number;
    maxTemp: number;
    condition: string;
    rainProb: number;
    sprayRating: string;
  }[];
  timestamp: string;
}

export interface PestAlert {
  id: string;
  name: string;
  severity: 'Severe' | 'High' | 'Moderate' | 'Low';
  affectedCrops: string[];
  region: string;
  detectionDate: string;
  symptoms: string;
  organicRemedy: string;
  chemicalRemedy: string;
  preventionTip: string;
}

export interface Product {
  id: string;
  title: string;
  category: 'Seeds' | 'Fertilizers' | 'Biopesticides' | 'Irrigation' | 'Tools';
  price: number;
  unit: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  ecoFriendly: boolean;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: { productId: string; title: string; quantity: number; price: number }[];
  totalAmount: number;
  status: 'Order Placed' | 'Processing' | 'Dispatched' | 'Delivered';
  orderDate: string;
  estimatedDelivery: string;
  deliveryAddress: string;
}

export interface ForumPost {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: Role;
  authorAvatar: string;
  title: string;
  content: string;
  category: 'Crop Diseases' | 'Soil Management' | 'Irrigation' | 'Govt Schemes' | 'Market Prices';
  likes: number;
  createdAt: string;
  answers: {
    id: string;
    authorName: string;
    authorRole: Role;
    isVerifiedExpert: boolean;
    content: string;
    createdAt: string;
  }[];
}

export interface TaskItem {
  id: string;
  epicId: number;
  title: string;
  description: string;
  status: 'Done' | 'In Progress' | 'To Do';
  points: number;
}

export interface ProjectMeta {
  demoUrl: string;
  githubUrl: string;
  studentName: string;
  mentorAssigned: string;
  submissionStatus: string;
  lastUpdated: string;
  architectureNotes: string;
  epicsCount: number;
  totalTasks: number;
  completedTasks: number;
  progressPercent: number;
  tasks: TaskItem[];
}
