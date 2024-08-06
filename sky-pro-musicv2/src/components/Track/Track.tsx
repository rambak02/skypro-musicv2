"use client";
import React, { useEffect } from "react";
import styles from "./Track.module.css";
import { TracksType, TrackType } from "@/types/type";
import { formatSecond } from "./helpers/helpers";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { setCurrentTrack } from "@/store/features/playlistSlice";
import clsx from "clsx";
import Image from "next/image";
import spriteImg from "../../../public/img/icon/note.svg";
import likeImg from "../../../public/img/icon/like.svg";
import dislikeImg from "../../../public/img/icon/dislike.svg";
import { useLikeTrack } from "@/hooks/likes";

type Props = {
  track: TrackType;
  tracks: TrackType[];
};

export const Track = ({ track, tracks }: Props) => {
  const { isLiked, handleLike } = useLikeTrack({ track });
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const isCurrentTrack = currentTrack?._id === track._id;
  const isPlayingTrack = useAppSelector((state) => state.playlist.isPlaying);
  const formattedTime = formatSecond(track.duration_in_seconds);
 

  return (
    <div
      onClick={() => dispatch(setCurrentTrack({ currentTrack: track, tracks }))}
      className={styles.playlistItem}
    >
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={clsx(styles.trackTitleImage)}>
            <div
              className={
                isCurrentTrack
                  ? clsx(styles.track_pulse, {
                      [styles.active]: isPlayingTrack,
                    })
                  : ""
              }
            ></div>
            <Image
              className={styles.trackTitleSvg}
              src={spriteImg}
              width={51}
              height={51}
              alt="изображение трека"
            />
          </div>
          <>
            <a className={styles.trackTitleLink} href="http://">
              {track.name} <span className={styles.trackTitleSpan}></span>
            </a>
          </>
        </div>
        <div className={styles.trackAuthor}>
          <a className={styles.trackAuthorLink} href="http://">
            {track.author}
          </a>
        </div>
        <div className={styles.trackAlbum}>
          <a className={styles.trackAlbumLink} href="http://">
            {track.album}
          </a>
        </div>
        <Image src ={isLiked ? dislikeImg : likeImg} width={14} height={12} alt="dislike/like" onClick={(e) =>  handleLike(e)}/>
        <span className={styles.trackTimeText}>{formattedTime}</span>
      </div>
    </div>
  );
};
