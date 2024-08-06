"use client";
import Image from "next/image";
import styles from "./page.module.css";
import clsx from "clsx";
import { createUser } from "@/store/features/authSlice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const error = useAppSelector((state) => state.auth.error);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }
  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      await Promise.all([dispatch(createUser(formData)).unwrap()]);
      navigate.push("signin");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerSignup}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin}>
            <a href="../">
              <div className={styles.modalLogo}>
                <Image
                  width={140}
                  height={21}
                  src="/img/logo_modal.png"
                  alt="Логотип"
                />
              </div>
            </a>
            <input
              className={clsx(styles.modalInput, styles.login)}
              type="email"
              name="email"
              placeholder="Почта"
              onChange={handleChange}
            />
            <input
              className={clsx(styles.modalInput, styles.passwordFirst)}
              type="password"
              name="password"
              placeholder="Пароль"
              onChange={handleChange}
            />
            <input
              className={clsx(styles.modalInput, styles.passwordDouble)}
              type="text"
              name="username"
              placeholder="имя пользователя"
              onChange={handleChange}
            />
            {error ? <div className={styles.error}>{error}</div> : ""}
            <button
              className={styles.modalBtnSignupEnt}
              onClick={handleSubmit}
              type="submit"
            >
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
