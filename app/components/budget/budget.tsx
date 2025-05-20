import React from 'react';
import styles from './budget.module.css';

type SummaryCardProps = {
  title: string;
  amount: string;
  type: 'income' | 'expense' | 'balance';
};

const BudgetTracker = () => {
  // Summary Card Component
  const SummaryCard = ({ title, amount, type }: SummaryCardProps) => (
    <div className={`${styles.card} ${styles[type]}`}>
      <h2>{title}</h2>
      <p>{amount}</p>
    </div>
  );

  return (
    <div className={styles.container}>
      {/* Budget Header */}
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>💰 Budget Tracker</h1>
        <p className={styles.description}>
          Track your income and expenses to stay on top of your student budget.
        </p>
      </div>

      {/* Summary Cards */}
      <div className={styles.summaryCards}>
        <SummaryCard title="Total Income" amount="$1200" type="income" />
        <SummaryCard title="Total Expenses" amount="$650" type="expense" />
        <SummaryCard title="Balance" amount="$550" type="balance" />
      </div>
    </div>
  );
};

export default BudgetTracker;
