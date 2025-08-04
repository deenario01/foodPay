"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Restaurant } from '@/lib/restaurantService';
import styles from '../app/dashboard/dashboard.module.css';

interface SidebarProps {
  restaurant: Restaurant | null;
  loadingRestaurant: boolean;
}

export default function Sidebar({ restaurant, loadingRestaurant }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>{restaurant ? restaurant.name : ''}</h2>
        {restaurant && (
          <p className={styles.restaurantName}>{restaurant.description}</p>
        )}
        {loadingRestaurant && (
          <p className={styles.loadingText}></p>
        )}
        {!loadingRestaurant && !restaurant && (
          <p className={styles.noRestaurantText}></p>
        )}
      </div>
      <nav className={styles.nav}>
        <Link 
          href="/dashboard/stats" 
          className={`${styles.navItem} ${isActive('/dashboard/stats') ? styles.active : ''}`}
        >
          📊 Stats
        </Link>
        <Link 
          href="/dashboard/menu" 
          className={`${styles.navItem} ${isActive('/dashboard/menu') ? styles.active : ''}`}
        >
          🍽️ Menu Items
        </Link>
        <Link 
          href="/dashboard/website" 
          className={`${styles.navItem} ${isActive('/dashboard/website') ? styles.active : ''}`}
        >
          🌐 Website Settings
        </Link>
        <Link 
          href="/dashboard/settings" 
          className={`${styles.navItem} ${isActive('/dashboard/settings') ? styles.active : ''}`}
        >
          ⚙️ Settings
        </Link>
      </nav>
    </aside>
  );
} 