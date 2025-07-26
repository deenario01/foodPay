"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
    <>
      <h2>OTP sent to {email}</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={userOtp}
        onChange={(e) => setUserOtp(e.target.value)}
      />
      <button onClick={verifyOtp}>Verify OTP</button>
    </>
  );
}
