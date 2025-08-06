"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import styles from "./verify.module.css";

export default function VerifyPage() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const timestamp = localStorage.getItem("otp_sent_at");

    if (!storedEmail || !timestamp) {
      router.push("/");
      return;
    }

    const sentTime = parseInt(timestamp, 10);
    const now = Date.now();

    if (now - sentTime > 120000) {
      alert("OTP expired. Please request a new one.");
      localStorage.removeItem("email");
      localStorage.removeItem("otp_sent_at");
      router.push("/");
      return;
    }

    setEmail(storedEmail);
  }, []);

  const handleVerify = async () => {
    setError("");
    if (!otp || otp.trim().length !== 6) {
      setError("Enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });

    if (error) {
      console.error("OTP verification error:", error.message);
      setError("Verification failed. Please try again.");
      setLoading(false);
      return;
    }

    // Clear local storage
    localStorage.removeItem("email");
    localStorage.removeItem("otp_sent_at");

    // Wait a bit to ensure session is set
    setTimeout(() => {
      router.push("/dashboard");
    }, 500); // 0.5 second delay to allow Supabase session to persist

    setLoading(false);
  };

  return (
    <main className={styles.container}>
      <h2 className={styles.heading}>Enter the OTP sent to {email}</h2>

      <input
        className={styles.input}
        type="text"
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        disabled={loading}
      />

      {error && <p className={styles.error}>{error}</p>}

      <button
        className={styles.button}
        onClick={handleVerify}
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </main>
  );
}
