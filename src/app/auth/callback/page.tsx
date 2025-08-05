"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleLogin = async () => {
      const { error } = await supabase.auth.getSession();

      if (error) {
        alert("Login failed. Please try again.");
        router.push("/");
      } else {
        router.push("/dashboard");
      }
    };

    handleLogin();
  }, [router]);

  return <p>Signing you in...</p>;
}
