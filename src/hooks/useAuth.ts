import { useState, useEffect } from 'react';
import authStore from '@/store'
interface User {
  id: string;
  name: string;
  email: string;
}

const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const setAccessToken = authStore((state) => state.setAccessToken);
  const setUser = authStore((state) => state.setUser);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Simulate an API call to fetch user data
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`);
        const userData: User = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Simulate an API call to log in
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      const { token } = await response.json();
      setAccessToken(token);
      const responseUser = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData: User = await responseUser.json();
      console.log(userData);
      
      setUser(userData);
    } catch (error) {
      console.error('Failed to log in:', error);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      console.log(import.meta.env.VITE_API_URL);
      
      // Simulate an API call to register
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const userData: User = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Failed to register:', error);
    }
  }

  const logout = async () => {
    try {
      // Simulate an API call to log out
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      setUser(null);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return { loading, login, logout, register };
};

export default useAuth;