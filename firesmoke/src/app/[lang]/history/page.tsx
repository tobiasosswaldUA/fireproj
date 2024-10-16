import { HISTORY_OPTIONS, HistoryFile } from "@/utils/files";
import "mapbox-gl/dist/mapbox-gl.css";
import { HistoryManager } from "@/history/history-manager";

const getHistoryOptions = async (): Promise<HistoryFile> => {
  const historyFile: HistoryFile = await fetch(
    process.env.NEXT_PUBLIC_URL + `/${HISTORY_OPTIONS}`,
  ).then((res) => res.json());
  return historyFile;
};

export default async function Home({ params: { lang } }: any) {
  const historyFile = await getHistoryOptions();

  return <HistoryManager events={historyFile.events} />;
}
