import React from "react";
import styles from "@styles/HomeLayout.module.css";
import Image from "next/image";
import LogoutButton from "@components/LogoutButton";
import NavButtons from "@components/NavButtons";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className={styles.HomeLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.content}>
          <Image
            className={styles.avatar}
            width={40}
            height={40}
            src="/images/avatar.svg"
            alt="imagen del usuario"
          />

          <NavButtons />
        </div>

        <LogoutButton />
      </aside>

      <main className={styles.main}>{children}</main>
    </section>
  );
}
