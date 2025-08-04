"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from './homepage.module.css';

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (): Promise<void> => {
    if (!email || email.trim() === '') {
      setMessage('Please enter a valid email');
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/authentication/verify`,
        },
      });

      if (error) {
        console.error("Supabase error:", error);
        setMessage(`Error: ${error.message}`);
      } else {
        // Store email for OTP verification page
        localStorage.setItem("email", email);
        // Redirect to OTP verification page
        router.push("/authentication/verify");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <Image 
        src="/images/smiling_burger.png" 
        alt="FoodPay Logo" 
        width={300} 
        height={300} 
        priority 
      />
      <h1 className={styles.heading}>Welcome to FoodPay!</h1>
      <h4 className={styles.subheading}>Please enter your email to login</h4>
      
      {message && (
        <div className={styles.message}>
          {message}
        </div>
      )}
      
      <input
        type="email"
        className={styles.input}
        placeholder="Enter email"
        value={email}
        onChange={(e) => {
          console.log("Email input changed:", e.target.value);
          setEmail(e.target.value);
        }}
      />
      <button
        onClick={handleLogin}
        disabled={loading || !email}
        className={styles.button}
      >
        {loading ? "Sending..." : "Login/Signup"}
      </button>
    </main>
  );
}
