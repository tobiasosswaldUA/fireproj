"use client";
import BaseMapProvider, {
  useBaseMapContextReducer,
  IBaseMapContext,
} from "@/map/base-map-context";
import BaseMap from "@/map/base-map";
import Sidebar from "./sidebar";

const BaseMapContainer = ({
  poluentPrediction,
  focalPoints,
  indexes,
}: {
  poluentPrediction: IBaseMapContext["poluentPrediction"];
  focalPoints: IBaseMapContext["focalPoints"];
  indexes: IBaseMapContext["indexes"];
}) => {
  const baseMapState = useBaseMapContextReducer({
    backgroundMapType: "poluents",
    poluentPrediction,
    selectedPoluent: undefined,
    focalPoints: focalPoints,
    indexes,
  });

  return (
    <BaseMapProvider value={baseMapState}>
      <Sidebar />
      <BaseMap />
    </BaseMapProvider>
  );
};

export default BaseMapContainer;
