import { useAppDispatch, useAppSelector } from "./store";
import {
  addLikeInTrack,
  dislike,
  likeTrack,
  removeLikeInTrack,
} from "@/store/features/playlistSlice";
import { TrackType } from "@/types/type";

type Props = {
  track: TrackType;
};

export const useLikeTrack = ({ track }: Props) => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.auth.tokens);
  const likedTracks = useAppSelector((state) => state.playlist.likedTracks);
  const isLiked = likedTracks.includes(track);

  const handleLike = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (!tokens.access) {
      return alert("вы незарегистрированы");
    }
    const likedAction = isLiked ? removeLikeInTrack : addLikeInTrack;
    try {
      await dispatch(likedAction({ access: tokens.access, id: track._id }));
      isLiked
        ? dispatch(dislike( track))
        : dispatch(likeTrack(track ));
    } catch (error) {
      console.error(error);
    }
  };
  return { isLiked, handleLike };
};
