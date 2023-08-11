import BaseMapContainer from "@/map/base-map-container";
import {
  DESCRIPTION_FILE,
  IDescriptionFile,
  IPredictionPoint,
  convertFileNameToPredictionPoint,
} from "@/utils/files";
import crypto from "crypto";
import "mapbox-gl/dist/mapbox-gl.css";
import { IBaseMapContext } from "@/map/base-map-context";

const getData = async (): Promise<{
  nationalPrediction: IBaseMapContext["poluentPrediction"];
  focalPoints: IBaseMapContext["focalPoints"];
  indexes: IBaseMapContext["indexes"];
}> => {
  const descriptionFile: IDescriptionFile = (await fetch(
    process.env.NEXT_PUBLIC_URL + `/${DESCRIPTION_FILE}`,
    { next: { revalidate: 60 } },
  ).then((res) => res.json())) as any;
  console.log(descriptionFile);
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
                focal.domain,
              ),
            )
            .filter((el) => el !== null) as IPredictionPoint[],
        };
      }, {}),
    })),
  };
};

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
