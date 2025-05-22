"use client";

import React from "react";
import { LuCircleArrowOutDownRight } from "react-icons/lu";
import { createClient } from "@utils/supabase/client";
import { useRouter } from "next/navigation";
import styles from "@styles/LogoutButton.module.css";

export default function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth?mode=signin");
  };

  return (
    <button onClick={logout} className={styles.logoutButton}>
      <LuCircleArrowOutDownRight className={styles.icon} />
    </button>
  );
}
