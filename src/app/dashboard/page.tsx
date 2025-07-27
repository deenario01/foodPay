import styles from './dashboard.module.css';

export default function Dashboard() {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>This is your dashboard</h1>
      </div>
    );
  }