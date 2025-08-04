"use client";

import DashboardLayout from '@/components/DashboardLayout';
import styles from '../dashboard.module.css';

export default function StatsPage() {
  return (
    <DashboardLayout title="Statistics">
      <div className={styles.content}>
        <h2>Statistics</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Total Orders</h3>
            <p className={styles.statNumber}>1,234</p>
            <p className={styles.statChange}>+12% from last month</p>
          </div>
          <div className={styles.statCard}>
            <h3>Revenue</h3>
            <p className={styles.statNumber}>$45,678</p>
            <p className={styles.statChange}>+8% from last month</p>
          </div>
          <div className={styles.statCard}>
            <h3>Active Users</h3>
            <p className={styles.statNumber}>892</p>
            <p className={styles.statChange}>+15% from last month</p>
          </div>
          <div className={styles.statCard}>
            <h3>Menu Items</h3>
            <p className={styles.statNumber}>156</p>
            <p className={styles.statChange}>+3 new this week</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 