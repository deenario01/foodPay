"use client";

import React, { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import styles from "./homepage.module.css";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendMagicLink = async () => {
    if (!email.trim()) {
      alert("Please enter a valid email.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:3000/auth/callback",
      },
    });

    setLoading(false);

    if (error) {
      alert("Failed to send login link. Please try again.");
      console.error(error);
    } else {
      alert("Magic link sent! Check your email to continue.");
      // No redirect here — user must click the link in their email
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Red columns on the left */}
      <div className={styles.redColumn}></div>
      <div className={styles.redColumn}></div>

      {/* Main content */}
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
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className={styles.button}
          onClick={sendMagicLink}
          disabled={loading || !email.trim()}
        >
          {loading ? "Sending..." : "Login"}
        </button>
      </main>

      {/* Red columns on the right */}
      <div className={styles.redColumn}></div>
      <div className={styles.redColumn}></div>

      {/* White line */}
      <div className={styles.whiteLine}></div>
    </div>
  );
}
