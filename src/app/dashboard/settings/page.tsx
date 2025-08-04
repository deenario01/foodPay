"use client";

import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import styles from '../dashboard.module.css';

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <DashboardLayout title="Settings">
      <div className={styles.content}>
        <h2>Settings</h2>
        {user && (
          <div className={styles.userInfo}>
            <h3>User Information</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Last Sign In:</strong> {new Date(user.last_sign_in_at || '').toLocaleString()}</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 