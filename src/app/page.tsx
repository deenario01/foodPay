"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './homepage.module.css';

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const sendOtp = async (): Promise<void> => {
    if (!email || email.trim() === '') {
        alert('Please enter a valid email');
        return;
      }

    const otp = Math.floor(100000 + Math.random() * 900000);
    setLoading(true);

    console.log("Sending email with:", { email, otp });

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp: otp,
        }),
      });

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Response result:", result);


      if (response.ok) {
        
        localStorage.setItem("otp", otp.toString());
        localStorage.setItem("email", email);

        // Redirect to verification page
        router.push("/verify");
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send OTP");
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
        onClick={sendOtp}
        disabled={loading || !email}
        className={styles.button}
      >
        {loading ? "Sending..." : "Login"}
      </button>
    </main>
  );
}
