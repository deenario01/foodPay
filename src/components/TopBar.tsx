"use client";

import { useAuth } from '@/contexts/AuthContext';
import styles from '../app/dashboard/dashboard.module.css';

interface TopBarProps {
  title: string;
  loadingRestaurant: boolean;
}

export default function TopBar({ title, loadingRestaurant }: TopBarProps) {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className={styles.topBar}>
      <div className={styles.topBarLeft}>
        <h1>{title}</h1>
        <div className={styles.loadingContainer}>
          {loadingRestaurant && (
            <p className={styles.loadingText}>Loading restaurant data...</p>
          )}
        </div>
      </div>
      <div className={styles.topBarRight}>
        <span className={styles.profileBtn}>
          👤 {user?.email}
        </span>
        <button onClick={handleSignOut} className={styles.signoutBtn}>
          🚪 Sign Out
        </button>
      </div>
    </header>
  );
} 