"use client";

import styles from "./Main.module.css";
import clsx from "clsx";
import { NavBar } from "@/components/NavBar/NavBar";
import { Playlist } from "@/components/Playlist/Playlist";
import { Filter } from "@/components/Filter/Filter";
import { Search } from "@/components/Search/Search";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Bar } from "@/components/Bar/Bar";
import { TrackType, TracksType } from "@/types/type";
import { useAppSelector } from "@/hooks/store";
type MainProps = {
  tracks: TrackType[];
};

export const Main = ({ tracks }: MainProps) => {
  return (
    <>
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter tracks={tracks} />
      <Playlist tracks={tracks} />
    </>
  );
};
