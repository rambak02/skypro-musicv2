export type StaredUserType = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
};

export type TrackType = {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string;
  duration_in_seconds: number;
  album: string;
  logo: null | string;
  track_file: string;
  stared_user: StaredUserType[];
};
export type TracksType = {
  tracks: TrackType[];
};
export type FilterItemType = {
  title: string;
  list: string[];
  value: string;
  tracks: TrackType[];
  isOpen: boolean;
  onClick: (value: string) => void;
};

