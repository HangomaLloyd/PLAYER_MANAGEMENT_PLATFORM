// API Response Types
export interface Club {
  _id: string;
  clubName: string;
  clubDivision: string;
  province: string;
  adminName: string;
  email: string;
  phoneNumber: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Player {
  _id: string;
  name: string;
  age: number;
  nrc: string;
  position: string;
  club: string;
  nationality?: string;
  phone?: string;
  email?: string;
  avatar?: string;
  status: string;
  joined: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Transfer {
  _id: string;
  playerId: string;
  player?: Player;
  fromClub: string;
  toClub: string;
  amount: string;
  type: string;
  status: string;
  requestDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Match {
  _id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  competition: string;
  status: string;
  score?: string;
  round?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id: string;
  email: string;
  role: 'clubadmin' | 'superadmin';
  clubName?: string;
  adminName?: string;
  logo?: string;
  createdAt?: string;
  updatedAt?: string;
}

// API Response Wrappers
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form Types
export interface ClubFormData {
  clubName: string;
  clubDivision: string;
  province: string;
  adminName: string;
  email: string;
  phoneNumber: string;
}

export interface PlayerFormData {
  name: string;
  age: number;
  nrc: string;
  position: string;
  club: string;
  nationality?: string;
  phone?: string;
  email?: string;
  joined: string;
}

export interface TransferFormData {
  playerId: string;
  toClub: string;
  amount: string;
  type: 'Permanent' | 'Loan';
}

// Dashboard Metrics
export interface DashboardMetrics {
  totalClubs: number;
  totalPlayers: number;
  pendingClubRegistrations: number;
  pendingTransferRequests: number;
}

// Activity Types
export interface Activity {
  action: string;
  entity: string;
  time: string;
  type?: 'registration' | 'transfer' | 'disciplinary';
}