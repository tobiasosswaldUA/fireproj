"use client";
import BaseMap from "@/map/base-map";
import BaseMapContainer from "@/map/base-map-container";
import { IBaseMapContext } from "@/map/base-map-context";
import { SidebarHistory } from "@/sidebar/sidebar-history";
import {
  convertFileNameToPredictionPoint,
  HistoryItem,
  IDescriptionFile,
  IPredictionPoint,
} from "@/utils/files";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

interface HistoryManagerProps {
  events: HistoryItem[];
}

const getData = async (
  fileName: string,
): Promise<{
  nationalPrediction: IBaseMapContext["poluentPrediction"];
  focalPoints: IBaseMapContext["focalPoints"];
}> => {
  const descriptionFile: IDescriptionFile = (await fetch(
    process.env.NEXT_PUBLIC_URL + `/${fileName}`,
    { next: { revalidate: 60 } },
  ).then((res) => res.json())) as any;
  return {
    ...descriptionFile,
    nationalPrediction: {
      ...descriptionFile.national,
      predictions: Object.keys(descriptionFile.national.predictions).reduce(
        (acc, curr) => {
          return {
            ...acc,
            [curr]: descriptionFile.national.predictions[curr]
              .map((e) =>
                convertFileNameToPredictionPoint(
                  e,
                  crypto.randomUUID(),
                  descriptionFile.national.domain,
                ),
              )
              .filter((el) => el !== null) as IPredictionPoint[],
          };
        },
        {},
      ),
    },
    focalPoints: descriptionFile.focal.map((focal) => ({
      ...focal,
      predictions: Object.keys(focal.predictions).reduce((acc, curr) => {
        return {
          ...acc,
          [curr]: focal.predictions[curr]
            .map((e) =>
              convertFileNameToPredictionPoint(
                e,
                crypto.randomUUID(),
                focal.domain,
              ),
            )
            .filter((el) => el !== null) as IPredictionPoint[],
        };
      }, {}),
    })),
  };
};

export const HistoryManager = ({ events }: HistoryManagerProps) => {
  const t = useTranslations("History");
  const [loadedHistory, setLoadedHistory] = useState<
    Record<
      string,
      {
        nationalPrediction: IBaseMapContext["poluentPrediction"];
        focalPoints: IBaseMapContext["focalPoints"];
      }
    >
  >({});
  const [currentHistory, setCurrentHistory] = useState("");

  const loadHistory = async (fileName: string) => {
    try {
      if (!loadedHistory[fileName]) {
        const data = await getData(fileName);
        setLoadedHistory((prev) => ({ ...prev, [fileName]: data }));
      }
      setCurrentHistory(fileName);
    } catch {}
  };

  if (currentHistory) {
    const { nationalPrediction, focalPoints } = loadedHistory[currentHistory];
    return (
      <>
        <Alert className="mb-0 d-flex align-items-center" variant={"warning"}>
          {t("live")}
          <Button
            type="button"
            onClick={() => setCurrentHistory("")}
            variant="secondary"
            className="d-block ms-auto"
          >
            {t("clear")}
          </Button>
        </Alert>
        <BaseMapContainer
          poluentPrediction={nationalPrediction}
          focalPoints={focalPoints}
        />
      </>
    );
  }

  return (
    <>
      <SidebarHistory loadFile={loadHistory} events={events} />
      <BaseMap />
    </>
  );
};
