"use client";
import styles from "./page.module.css";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { getTokens, getUser } from "@/store/features/authSlice";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const error = useAppSelector((state)=> state.auth.error)
  const navigate = useRouter()
  const dispatch = useAppDispatch()
  const signIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      await Promise.all([
        dispatch(getTokens(formData)).unwrap(),
        dispatch(getUser(formData)).unwrap(),
      ]);
      navigate.push("/")
    } catch (err: unknown) {
      if (err instanceof Error){
        console.error(err.message);
      
      } 
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin} action="#">
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
              onChange={handleInputChange}
              className={clsx(styles.modalInput, styles.login)}
              type="text"
              name="email"
              placeholder="Почта"
            />
            <input
              onChange={handleInputChange}
              className={clsx(styles.modalInput, styles.password)}
              type="password"
              name="password"
              placeholder="Пароль"
            />
            {error ? <div className={styles.error}>{error}</div> : "" }
            <button className={styles.modalBtnEnter} onClick={signIn} type="submit">
              Войти
            </button>
            <button className={styles.modalBtnSignup}>
              <Link href="/signup">Зарегистрироваться</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
