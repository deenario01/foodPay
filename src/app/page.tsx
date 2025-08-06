"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import styles from "./homepage.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const sendOtp = async () => {
    if (loading) return;

    if (!email.trim() || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${location.origin}/dashboard`, // required for Supabase auth flow
      },
    });

    if (error) {
      alert("Login failed. Please try again.");
      console.error("Supabase error:", error.message);
    } else {
      localStorage.setItem("email", email);
      localStorage.setItem("otp_sent_at", Date.now().toString());
      router.push("/verify");
    }

    setLoading(false);
  };

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.container}>
        <Image
          src="/images/smiling_burger.png"
          alt="FoodPay Logo"
          width={300}
          height={300}
          priority
          className={styles.image}
        />
        <h1 className={styles.heading}>Welcome to FoodPay!</h1>

        <input
          type="email"
          className={styles.input}
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <button
          onClick={sendOtp}
          disabled={loading || !email}
          className={styles.button}
        >
          {loading ? "Sending..." : "Login"}
        </button>
      </main>
    </div>
  );
}
