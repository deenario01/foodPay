"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import { getRestaurantWithAdmin, Restaurant } from '@/lib/restaurantService';
import styles from '../app/dashboard/dashboard.module.css';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loadingRestaurant, setLoadingRestaurant] = useState(true);
  const { user } = useAuth();

  // Fetch restaurant data when user is authenticated
  useEffect(() => {
    const fetchRestaurant = async () => {
      if (user?.id) {
        setLoadingRestaurant(true);
        try {
          const restaurantData = await getRestaurantWithAdmin(user.id);
          setRestaurant(restaurantData);
        } catch (error) {
          console.error('Error fetching restaurant:', error);
        } finally {
          setLoadingRestaurant(false);
        }
      } else {
        setLoadingRestaurant(false);
      }
    };

    fetchRestaurant();
  }, [user]);

  return (
    <ProtectedRoute>
      <div className={styles.dashboard}>
        <Sidebar restaurant={restaurant} loadingRestaurant={loadingRestaurant} />
        
        {/* Main Content Area */}
        <div className={styles.main}>
          <TopBar title={title} loadingRestaurant={loadingRestaurant} />
          
          {/* Content */}
          <main className={styles.mainContent}>
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
} 