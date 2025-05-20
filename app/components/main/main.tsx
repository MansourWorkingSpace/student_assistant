// app/components/main/index.tsx or index.js
import styles from './main.module.css';

export default function Main() {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Student Assistant</h1>
      <p className={styles.description}>
        Organize your student life with ease. Track your budget, manage your notes, and stay fit—all in one place.
      </p>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>📒 Notes Hub</h2>
          <p>Create, organize, and share course notes easily.</p>
        </div>
        <div className={styles.card}>
          <h2>💸 Budget Tracker</h2>
          <p>Track expenses and manage your student budget.</p>
        </div>
        <div className={styles.card}>
          <h2>🍎 Nutrition & Fitness</h2>
          <p>Plan meals, workouts, and stay healthy.</p>
        </div>
        <div className={styles.card}>
          <h2>🔔 Notifications</h2>
          <p>Get timely reminders and updates.</p>
        </div>
      </div>
    </div>
  );
}
