import clsx from "clsx";
import styles from "./Bar.module.css";
import { TrackType } from "@/types/type";
import { useLikeTrack } from "@/hooks/likes";
import { useAppSelector } from "@/hooks/store";
type BarLikeProps = {
    track: TrackType
}

export const BarLike = ({ track }: BarLikeProps) => {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const { handleLike } = useLikeTrack({ track });
  if (!currentTrack) {
    return null;
  }
  return (
    <div className={styles.trackPlay__likeDis}>
      <div
        className={clsx(styles.trackPlay__like, styles._btnIcon)}
        onClick={handleLike}
      >
        <svg className={styles.trackPlay__likeSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
        </svg>
      </div>
      <div
        onClick={handleLike}
        className={clsx(styles.trackPlay__dislike, styles._btnIcon)}
      >
        <svg className={styles.trackPlay__dislikeSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-dislike"></use>
        </svg>
      </div>
    </div>
  );
};
