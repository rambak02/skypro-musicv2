import { getTracks } from "@/api/api";
import { addLike, fetchFavoriteTracks, removeLike } from "@/api/userApi";
import { TrackType } from "@/types/type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getAllTracks = createAsyncThunk("playlist/getTracks", async () => {
  try {
    const allTracks = await getTracks();
    return allTracks;
  } catch (error) {
    return null;
  }
});
export const getFavoriteTracks = createAsyncThunk(
  "playlist/getFavoriteTracks",
  async (access: string) => {
    try {
      const favoriteTracks = await fetchFavoriteTracks(access);
      return favoriteTracks;
    } catch (error) {
      return null;
    }
  }
);
export const addLikeInTrack = createAsyncThunk(
  "playlist/addFavoriteTracks",
  async ({ access, id }: LikesType) => {
    const likedTrack = await addLike({ access, id });
    return likedTrack;
  }
);

export const removeLikeInTrack = createAsyncThunk(
  "playlist/removeFavoriteTracks",
  async ({ access, id }: LikesType) => {
    const dislikedTrack = await removeLike({ access, id });
    return dislikedTrack;
  }
);
type PlaylistStateType = {
  isPlaying: boolean;
  currentTrack: TrackType | null;
  tracks: TrackType[];
  isShuffled: boolean;
  shuffledPlaylist: TrackType[];
  likedTracks: TrackType[];
};
type LikesType = {
  access: string;
  id: number;
};
const initialState: PlaylistStateType = {
  isPlaying: false,
  currentTrack: null,
  tracks: [],
  isShuffled: false,
  shuffledPlaylist: [],
  likedTracks: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setCurrentTrack: (
      state,
      action: PayloadAction<{ currentTrack: TrackType; tracks: TrackType[] }>
    ) => {
      state.currentTrack = action.payload.currentTrack;
      state.tracks = action.payload.tracks;
      state.shuffledPlaylist = [...action.payload.tracks].sort(
        () => 0.5 - Math.random()
      );
      state.isPlaying = true;
    },
    nextTrack: (state) => {
      const playlist = state.isShuffled ? state.shuffledPlaylist : state.tracks;
      const currentIndex = playlist.findIndex(
        (track) => track._id === state.currentTrack?._id
      );
      const nextIndex = currentIndex + 1;
      if (nextIndex >= playlist.length) {
        return;
      }
      state.currentTrack = playlist[nextIndex];
      state.isPlaying = true;
    },
    prevTrack: (state) => {
      const playlist = state.isShuffled ? state.shuffledPlaylist : state.tracks;
      const currentIndex = playlist.findIndex(
        (track) => track._id === state.currentTrack?._id
      );
      const prevIndex = currentIndex - 1;
      if (prevIndex < 0) {
        return;
      }
      state.currentTrack = playlist[prevIndex];
      state.isPlaying = true;
    },
    toggleShuffleTrack: (state) => {
      state.isShuffled = !state.isShuffled;
    },
    togglePlayingTrack: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setPlaylist: (state, action: PayloadAction<{ tracks: TrackType[] }>) => {
      state.tracks = action.payload.tracks;
    },
    likeTrack: (state, action: PayloadAction<TrackType>) => {
      state.likedTracks.push(action.payload);
    },
    dislike: (state, action: PayloadAction<TrackType>) => {
      state.likedTracks = state.likedTracks.filter(
        (el) => el._id !== action.payload._id
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        getFavoriteTracks.fulfilled,
        (state, action: PayloadAction<TrackType[]>) => {
          if (action.payload) {
            state.likedTracks = action.payload;
          }
        }
      )
      .addCase(
        getAllTracks.fulfilled,
        (state, action: PayloadAction<TrackType[]>) => {
          if (action.payload) {
            state.tracks = action.payload;
          }
        }
      );
  },
});

export const {
  setCurrentTrack,
  nextTrack,
  prevTrack,
  toggleShuffleTrack,
  togglePlayingTrack,
  setPlaylist,
  likeTrack,
  dislike,
} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
