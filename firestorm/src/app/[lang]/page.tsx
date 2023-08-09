import BaseMapContainer from "@/map/base-map-container";
import fs from "fs";
import {
  DESCRIPTION_FILE,
  IDescriptionFile,
  IFocalDescription,
  IImageDescription,
  IPoluent,
  IPredictionPoint,
  PUBLIC_FOLDER,
  convertFileNameToPredictionPoint,
} from "@/utils/files";
import crypto from "crypto";
import "mapbox-gl/dist/mapbox-gl.css";
import { IBaseMapContext } from "@/map/base-map-context";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import FireNav from "@/nav/nav";

function getData(): {
  nationalPrediction: IBaseMapContext["poluentPrediction"];
  focalPoints: IBaseMapContext["focalPoints"];
  indexes: IBaseMapContext["indexes"];
} {
  const descriptionFile: IDescriptionFile = JSON.parse(
    fs.readFileSync(`${PUBLIC_FOLDER}${DESCRIPTION_FILE}`) as any,
  );

  return {
    ...descriptionFile,
    indexes: descriptionFile.indexes
      .map((descriptionFile) =>
        convertFileNameToPredictionPoint(descriptionFile, crypto.randomUUID()),
      )
      .filter((el) => el !== null) as IPredictionPoint[],
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
                descriptionFile.national.domain,
              ),
            )
            .filter((el) => el !== null) as IPredictionPoint[],
        };
      }, {}),
    })),
  };
}

export default async function Home({ params: { lang } }: any) {
  const { nationalPrediction, focalPoints, indexes } = await getData();

  return (
    <BaseMapContainer
      poluentPrediction={nationalPrediction}
      focalPoints={focalPoints}
      indexes={indexes}
    />
  );
}
