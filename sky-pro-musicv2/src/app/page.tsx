import { getTracks } from "@/api/api";
import { Main } from "@/components/Main/Main";
import { TrackType } from "@/types/type";
import TrackLayout from "./route/layout";

export default async function Home() {
  let tracks: TrackType[] = [];
  let error: string | null = null;
  try {
    const res = await getTracks();
    tracks = res.data;
  } catch (err: unknown) {
    error =
      err instanceof Error
        ? "Ошибка при загрузке трека. " + err.message
        : "Неизвестная ошибка";
  }
  return (
    <TrackLayout>
      <Main tracks={tracks} />;
    </TrackLayout>
  );
}
