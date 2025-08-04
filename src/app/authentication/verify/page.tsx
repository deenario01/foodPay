"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import styles from './verify.module.css';

export default function Verify() {
  const [otp, setOtp] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  const { session } = useAuth();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (!savedEmail) {
      router.push("/authentication/login");
    } else {
      setEmail(savedEmail);
    }
  }, [router]);

  // Check if user is already authenticated
  useEffect(() => {
    console.log('Verify page - Current session:', session);
    if (session) {
      console.log('Session found, redirecting to dashboard');
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleVerifyOtp = async () => {
    if (!otp || otp.trim() === '') {
      setMessage('Please enter the OTP');
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      console.log('Verifying OTP:', otp, 'for email:', email);
      
      // Verify the OTP with Supabase
      const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token: otp,
        type: 'email'
      });

      console.log('OTP verification result:', { data, error });

      if (error) {
        console.error("OTP verification error:", error);
        setMessage(`Error: ${error.message}`);
      } else if (data.session) {
        // Successfully verified and session created
        console.log('OTP verified successfully, session created:', data.session);
        setMessage("Login successful! Redirecting to dashboard...");
        
        // Force a redirect after a short delay to ensure session is set
        setTimeout(() => {
          console.log('Executing redirect to dashboard');
          router.push("/dashboard");
        }, 1500);
      } else {
        console.log('OTP verification failed - no session created');
        setMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      setMessage("No email found. Please go back to login.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/authentication/verify`,
        },
      });

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("OTP resent! Check your email.");
        setOtp(""); // Clear the OTP input
      }
    } catch (error) {
      setMessage("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <h2 className={styles.heading}>Enter OTP</h2>
      <p className={styles.description}>
        We've sent a 6-digit OTP to <strong>{email}</strong>
      </p>
      
      {message && (
        <div className={styles.message}>
          {message}
        </div>
      )}
      
      <input
        type="text"
        placeholder="Enter 6-digit OTP"
        className={styles.input}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={6}
        pattern="[0-9]{6}"
      />
      
      <button 
        onClick={handleVerifyOtp} 
        className={styles.button}
        disabled={loading || !otp}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
      
      <button 
        onClick={handleResendOtp} 
        className={styles.resendButton}
        disabled={loading}
      >
        {loading ? "Sending..." : "Resend OTP"}
      </button>
      
      <button 
        onClick={() => router.push("/authentication/login")} 
        className={styles.backButton}
      >
        Back to Login
      </button>
    </main>
  );
}
