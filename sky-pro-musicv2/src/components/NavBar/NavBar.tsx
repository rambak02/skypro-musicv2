"use client";

import clsx from "clsx";
import styles from "./NavBar.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { logout } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";

export const NavBar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const handleLogoutUser = () => {
    dispatch(logout());
  };
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  const handleNavigate = () => {
   
    if (user) {
      router.push("/route/favoritePage");
    } else {
      alert("вы незарегистрированы");
    }
  };

  return (
    <div className={styles.mainNav}>
      <div className={styles.navLogo}>
        <Image src="/img/logo.png" alt="logo" width={113} height={17} />
      </div>
      <div
        className={clsx(styles.navBurger, { [styles.open]: isOpen })}
        onClick={toggleMenu}
      >
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
      </div>
      <div
        className={clsx(styles.navMenu, styles.closeMenu, {
          [styles.openMenu]: isOpen,
        })}
      >
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <a href="/" className={styles.menuLink}>
              Главное
            </a>
          </li>
          <li className={styles.menuItem} onClick={handleNavigate}>
            Мой плейлист
          </li>
          {user ? (
            <li className={styles.menuItem} onClick={handleLogoutUser}>
              <Link href="/signin" className={styles.menuLink}>
                Выйти
              </Link>
            </li>
          ) : (
            <li className={styles.menuItem}>
              <Link href="/signin" className={styles.menuLink}>
                Войти
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
