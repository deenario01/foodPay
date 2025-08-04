// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata = {
  title: 'FoodPay',
  description: 'Login with OTP',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
