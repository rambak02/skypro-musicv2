"use client";
import { TracksType } from "@/types/type";
import styles from "./Filter.module.css";
import { FilterItem } from "./FilterItem/FilterItem";
import { filters } from "./data";
import { useState } from "react";

export const Filter = ({ tracks }: TracksType) => {
  const [filterValue, setFilterValue] = useState<string | null>(null);
  const handleFilterValue = (value: string) =>
    setFilterValue((prev) => (prev === value ? null : value));
  const uniqueAuthors = Array.from(
    new Set(tracks.map((track) => track.author))
  );
  const uniqueGenre = Array.from(new Set(tracks.map((track) => track.genre)));
  const uniqueReleaseDate = Array.from(
    new Set(tracks.map((track) => new Date(track.release_date).getFullYear()))
  );
  const sortedUniqueReleaseDate = uniqueReleaseDate.sort((a, b) => b - a);
  filters[0].list = uniqueAuthors;
  filters[2].list = uniqueGenre;
  filters[1].list = sortedUniqueReleaseDate.map((e) => e.toString());
  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      {/* {filters.map((filter) => (
        <FilterItem
          value={filter.value}
          tracks={tracks}
          key={filter.title}
          title={filter.title}
          list={filter.list}
          onClick={handleFilterValue}
          isOpen={filterValue === filter.value}
        />
      ))} */}
    </div>
  );
};
