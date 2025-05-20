'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import styles from './Navbar.module.css';


export default function Navbar() {
  const { status, data: session } = useSession();

  return (
    <nav className={styles.navbar}>
      <div className={styles['nav-container']}>
        <Link href="/" className={styles.logo}>
          <h1>Student Assistant</h1>
        </Link>
        <ul className={styles['nav-links']}>
          <li><Link href="/budget">Budget Tracker</Link></li>
          <li><Link href="/Notes">Notes</Link></li>
          <li><Link href="/nutrition">Nutrition</Link></li>

          {status === 'loading' && <li>Loading...</li>}

          {status === 'authenticated' && (
            <>
              <li>{session.user?.name}</li>
              <li>
                <Link href="/api/auth/signout" className={styles['login-button']}>Sign out</Link>
              </li>
            </>
          )}

          {status === 'unauthenticated' && (
            <li>
              <Link href="/api/auth/signin" className={styles['login-button']}>Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
