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

function getData(): {
  nationalPrediction: IBaseMapContext["poluentPrediction"];
  focalPoints: IBaseMapContext["focalPoints"];
  indexes: IBaseMapContext["indexes"];
} {
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data')
  // }
  // const dirContents = fs.readdirSync(`${PUBLIC_FOLDER}${SMOKE_FORECAST_FOLDER}`);
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

export default async function Home() {
  const { nationalPrediction, focalPoints, indexes } = await getData();
  console.log(indexes);
  return (
    <BaseMapContainer
      poluentPrediction={nationalPrediction}
      focalPoints={focalPoints}
      indexes={indexes}
    />
  );
}
