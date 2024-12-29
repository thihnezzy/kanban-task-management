import { jwtDecode } from 'jwt-decode';

export const isAccessTokenValid = (token: string): boolean => {
  try {
    const decodedToken = jwtDecode<{ exp: number }>(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decodedToken.exp > currentTime; // Check if token is not expired
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
};
