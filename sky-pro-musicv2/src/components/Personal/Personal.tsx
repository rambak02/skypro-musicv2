"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import styles from "./Personal.module.css";
import { logout } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";
import logoutImg from "../../../public/img/icon/exit.svg";
import Image from "next/image";
export const Personal = () => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const handleLogoutUser = async () => {
    await dispatch(logout());
    navigate.push("signin");
  };
  return (
    <div className={styles.sidebarPersonal}>
      <p className={styles.sidebarPersonalName}>
        {user ? user.username : "Войти"}
      </p>
      <div className={styles.sidebarIcon} onClick={handleLogoutUser}>
        <Image src={logoutImg} width={40} height={40} alt="выход" />
      </div>
    </div>
  );
};
