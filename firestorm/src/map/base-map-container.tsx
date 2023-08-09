"use client";
import BaseMapProvider, {
  useBaseMapContextReducer,
  IBaseMapContext,
} from "@/map/base-map-context";
import BaseMap from "@/map/base-map";
import Sidebar from "../sidebar/sidebar";

const BaseMapContainer = ({
  poluentPrediction,
  focalPoints,
  indexes,
}: {
  poluentPrediction: IBaseMapContext["poluentPrediction"];
  focalPoints: IBaseMapContext["focalPoints"];
  indexes: IBaseMapContext["indexes"];
}) => {
  const preSelectedPoluent = poluentPrediction.poluents.length
    ? poluentPrediction.poluents[0]
    : undefined;
  const baseMapState = useBaseMapContextReducer({
    backgroundMapType: "poluents",
    poluentPrediction,
    selectedPoluent: preSelectedPoluent,
    focalPoints: focalPoints,
    indexes,
    currentPrediction: preSelectedPoluent
      ? poluentPrediction.predictions[preSelectedPoluent.name][0]
      : undefined,
  });

  return (
    <BaseMapProvider value={baseMapState}>
      <Sidebar />
      <BaseMap />
    </BaseMapProvider>
  );
};

export default BaseMapContainer;
