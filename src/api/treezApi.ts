
import { encodeToBase64 } from '@/utils/encoding';

const TREEZ_API_BASE_URL = 'https://api.dev.treez.io';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role?: string;
  };
  [key: string]: any; // For other possible fields in the response
}

/**
 * Authenticates a user with Treez API
 * @param credentials - User credentials
 * @returns Authentication response with token
 */
export async function loginToTreez(credentials: LoginCredentials): Promise<LoginResponse> {
  try {
    const encodedData = encodeToBase64(credentials);
    
    const response = await fetch(`${TREEZ_API_BASE_URL}/auth/v1/login`, {
      method: 'POST',
      headers: {
        'x-application': 'SellTreez',
        'Content-Type': 'application/json',
      },
      body: encodedData,
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || `Login failed with status: ${response.status}`);
    }
    
    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

/**
 * Stores authentication token in localStorage
 * @param token - Authentication token
 */
export function storeAuthToken(token: string): void {
  localStorage.setItem('treez_auth_token', token);
}

/**
 * Gets authentication token from localStorage
 * @returns Authentication token or null if not found
 */
export function getAuthToken(): string | null {
  return localStorage.getItem('treez_auth_token');
}

/**
 * Clears authentication token from localStorage
 */
export function clearAuthToken(): void {
  localStorage.removeItem('treez_auth_token');
}

/**
 * Checks if user is authenticated
 * @returns True if authenticated, false otherwise
 */
export function isAuthenticated(): boolean {
  return !!getAuthToken();
}
