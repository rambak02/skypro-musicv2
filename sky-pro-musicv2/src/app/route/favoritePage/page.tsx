"use client";
import styles from "../layout.module.css";
import { TrackType } from "@/types/type";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { useEffect } from "react";
import { getFavoriteTracks, setPlaylist } from "@/store/features/playlistSlice";
import { Filter } from "@/components/Filter/Filter";
import { Playlist } from "@/components/Playlist/Playlist";

export default function MainFavPageSongs() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.tokens?.access);
  const favTracks: TrackType[] = useAppSelector(
    (state) => state.playlist.likedTracks
  );
  useEffect(() => {
    if (token) {
      if (favTracks) {
        dispatch(getFavoriteTracks(token));
      }
    }
  }, [dispatch, favTracks, token]);

  if (!token) {
    return <div>Чтобы увидеть свои треки требуется авторизация</div>;
  }
  return (
    <>
      <h2 className={styles.centerblock__h2}>Мои треки</h2>
      <Filter tracks={favTracks} />
      <Playlist tracks={favTracks} />
    </>
  );
}
