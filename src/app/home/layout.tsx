import React from "react";
import Image from "next/image";
import LogoutButton from "@components/common/LogoutButton";
import NavButtons from "@components/common/NavButtons";
import styles from "@styles/common/HomeLayout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className={styles.homeLayout}>
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
