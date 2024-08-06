import styles from "./layout.module.css";
import { Bar } from "@/components/Bar/Bar";
import { NavBar } from "@/components/NavBar/NavBar";
import { Search } from "@/components/Search/Search";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import clsx from "clsx";
0
export default function TrackLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.main}>
          <NavBar />
          <div className={clsx(styles.main__centerblock, styles.centerblock)}>
            <Search />
            {children}
          </div>
          <Sidebar />
        </div>
        <Bar />
      </div>
    </div>
  );
}
