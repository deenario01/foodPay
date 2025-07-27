"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from './verify.module.css';

export default function Verify() {
  const [userOtp, setUserOtp] = useState<string>("");
  const [originalOtp, setOriginalOtp] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const savedOtp = localStorage.getItem("otp");
    const savedEmail = localStorage.getItem("email");
    if (!savedOtp || !savedEmail) {
      router.push("/");
    } else {
      setOriginalOtp(parseInt(savedOtp));
      setEmail(savedEmail);
    }
  }, []);

  const verifyOtp = () => {
    if (parseInt(userOtp) === originalOtp) {
      router.push("/dashboard");
    } else {
      alert("Incorrect OTP. Try again.");
    }
  };

  return (
    <main className={styles.container}>
    <h2 className={styles.heading}>OTP sent to {email}</h2>
    <input
      type="text"
      placeholder="Enter OTP"
      className={styles.input}
      value={userOtp}
      onChange={(e) => setUserOtp(e.target.value)}
    />
    <button onClick={verifyOtp} className={styles.button}>
      Verify OTP
    </button>
  </main>
  );
}
