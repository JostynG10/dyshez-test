"use client";

import React, { useEffect, useState, cloneElement } from "react";
import { useRouter, usePathname } from "next/navigation";
import { BiShoppingBag } from "react-icons/bi";
import styles from "@styles/NavButtons.module.css";

// Define the routes for the navigation buttons
const routes = [
  {
    name: "Ordenes",
    path: "/home/orders",
    icon: <BiShoppingBag />,
  },
];

/**
 * NavButtons component renders navigation buttons for different routes.
 * It highlights the current route and handles navigation on button click.
 */
export default function NavButtons() {
  const [currentPath, setCurrentPath] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const currentRoute = routes.find((route) => route.path === pathname);
    if (currentRoute) {
      setCurrentPath(currentRoute.path);
    } else {
      setCurrentPath("");
    }
  }, [pathname]);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className={styles.buttonsBox}>
      {routes.map((route, index) => (
        <button
          key={index}
          onClick={() => handleNavigation(route.path)}
          className={styles.button}
          title={route.name}
        >
          {currentPath === route.path && (
            <span className={styles.selectedLine}></span>
          )}
          {cloneElement(route.icon, {
            className: `${styles.icon} ${
              currentPath === route.path ? styles.iconSelected : ""
            }`,
          })}
        </button>
      ))}
    </div>
  );
}
