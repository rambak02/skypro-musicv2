"use client";
import clsx from "clsx";
import styles from "./Bar.module.css";
import { useEffect, useRef, useState } from "react";
import { TrackType } from "@/types/type";
import Image from "next/image";
import ProgressBar from "../ProgressBar/ProgressBar";
import { formatSecond } from "./helper/helper";

export const Bar: React.FC<{ track: TrackType | null }> = ({ track }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  //состояние для зацикливания трека
  const [isLoop, setIsLoop] = useState(false);
  //Состояние для управления воспроизведением
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.5);

  const duration = audioRef.current?.duration || 0;

  const tooglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying((prev) => !prev);
  };

  const toogleLoop = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isLoop) {
        audio.loop = false;
      } else {
        audio.loop = true;
      }
      setIsLoop((prev) => !prev);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (track && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [track])

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = parseFloat(e.target.value);
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleNextTrack = () => {
    alert("Еще не реализовано")
  }
  const handlePrevTrack = () => {
    alert("Еще не реализовано")
  }
  const handleShuffleTrack = () => {
    alert("Еще не реализовано")
  }
  const formattedCurrentTime = formatSecond(Number(currentTime.toFixed(0)));
  const formattedDuration = formatSecond(Number(duration.toFixed(0)));
  return (
    <div className={styles.bar}>
      <audio
        className={styles.audio}
        src={track?.track_file}
        ref={audioRef}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
      ></audio>
      <div className={styles.barTime}>
        {formattedCurrentTime + "/" + formattedDuration}
      </div>
      <div className={styles.bar__content}>
        <ProgressBar
          max={duration}
          value={currentTime}
          step={0.01}
          onChange={handleProgressChange}
        />
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.playerControls}>
              <div className={styles.player__btnPrev} onClick = {handlePrevTrack}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                className={clsx(styles.player__btnPlay, styles._btn)}
                onClick={tooglePlay}
              >
                {isPlaying ? (
                  <Image
                    src="img/icon/pause.svg"
                    height={20}
                    width={22}
                    alt="pause"
                  />
                ) : (
                  <svg className={styles.player__btnPlaySvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-play"></use>
                  </svg>
                )}
              </div>
              <div className={styles.player__btnNext} onClick = {handleNextTrack}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>

              <div
                className={clsx(styles.player__btnRepeat, styles._btnIcon)}
                onClick={toogleLoop}
              >
                <svg
                  className={clsx(styles.player__btnRepeatSvg, {
                    [styles.active]: isLoop,
                  })}
                >
                  <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div className={clsx(styles.player__btnShuffle, styles._btnIcon)} onClick = {handleShuffleTrack}>
                <svg className={styles.player__btnShuffleSvg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={clsx(styles.player__trackPlay, styles.trackPlay)}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <a className={styles.trackPlay__authorLink} href="http://">
                    {track?.name}
                  </a>
                </div>
                <div className={styles.trackPlay__album}>
                  <a className={styles.trackPlay__albumLink} href="http://">
                    {track?.author}
                  </a>
                </div>
              </div>

              <div className={styles.trackPlay__likeDis}>
                <div className={clsx(styles.trackPlay__like, styles._btnIcon)}>
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div
                  className={clsx(styles.trackPlay__dislike, styles._btnIcon)}
                >
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={clsx(styles.bar__volumeBlock, styles.volume)}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={clsx(styles.volume__progress, styles._btn)}>
                <input
                  className={clsx(styles.volume__progressLine, styles._btn)}
                  type="range"
                  name="range"
                  min="0"
                  max="1"
                   step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
