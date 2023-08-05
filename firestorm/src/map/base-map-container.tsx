"use client";
import BaseMapProvider, {
  useBaseMapContextReducer,
  IBaseMapContext,
  BaseMapContext,
} from "@/map/base-map-context";
import BaseMap from "@/map/base-map";
import BaseMapFilter from "@/map/base-map-filter";
import MapTimeRange from "./map-time-range";
import SideMapProvider, { useSideMapContextReducer } from "./side-map-context";
import SideMap from "./side-map-container";
import { IPoluent } from "@/utils/files";
import Offcanvas from "react-bootstrap/Offcanvas";
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
  // const sideMapState = useSideMapContextReducer({ poluents });

  return (
    <BaseMapProvider value={baseMapState}>
      {/* <SideMapProvider value={sideMapState}> */}
      <main className="h-100 w-100">
        <Sidebar />
        <BaseMap />
        <BaseMapFilter />
        {/* <MapTimeRange context={BaseMapContext} /> */}
      </main>
      {/* <SideMap /> */}
      {/* </SideMapProvider> */}
    </BaseMapProvider>
  );
};

export default BaseMapContainer;
