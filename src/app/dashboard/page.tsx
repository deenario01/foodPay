"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import styles from "./dashboard.module.css";

interface UserInfo {
  id: string;
  email: string;
  created_at: string;
}

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        router.push("/");
      } else {
        setUserInfo({
          id: user.id,
          email: user.email ?? "N/A",
          created_at: user.created_at ?? "N/A",
        });
      }

      setLoading(false);
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <h2 className={styles.heading}>Loading your dashboard...</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to your Dashboard!</h1>
      <div className={styles.infoBox}>
        <p><strong>Email:</strong> {userInfo?.email}</p>
        <p><strong>User ID:</strong> {userInfo?.id}</p>
        <p><strong>Created At:</strong> {new Date(userInfo?.created_at || "").toLocaleString()}</p>
      </div>
      <button className={styles.button} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
