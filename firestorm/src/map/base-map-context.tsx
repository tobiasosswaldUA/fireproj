"use client";
import {
  IFocalDescription,
  IImageDescription,
  IPoluent,
  IPrediction,
  IPredictionPoint,
} from "@/utils/files";
import {
  Dispatch,
  PropsWithChildren,
  Reducer,
  createContext,
  useContext,
  useReducer,
} from "react";

export interface IBaseMapContext {
  backgroundMapType: "indexes" | "poluents" | "focal";
  selectedPoluent?: IPoluent;
  poluentPrediction: IPrediction;
  currentPrediction?: IPredictionPoint;
  dispatch: Dispatch<Partial<IBaseMapContextState>>;
  focalPoints: IFocalDescription<IPredictionPoint>[];
  indexes: IPredictionPoint[];
  currentFocal?: IFocalDescription<IPredictionPoint>;
}

export type IBaseMapContextState = Omit<IBaseMapContext, "dispatch">;

export const useBaseMapContextReducer = (
  initialValue: Partial<IBaseMapContextState>,
) => {
  const [state, dispatch] = useReducer<
    Reducer<IBaseMapContextState, Partial<IBaseMapContextState>>
  >(
    (
      prevState: IBaseMapContextState,
      action: Partial<IBaseMapContextState>,
    ) => ({ ...prevState, ...action }),
    {
      backgroundMapType: "poluents",
      poluentPrediction: {
        poluents: [],
        domain: { upperlat: 0, lowerlat: 0, leftlon: 0, rightlon: 0 },
        predictions: {},
      },
      currentPrediction:
        initialValue.selectedPoluent &&
        initialValue.poluentPrediction?.predictions &&
        initialValue.poluentPrediction.predictions[
          initialValue.selectedPoluent.name
        ].length
          ? initialValue.poluentPrediction.predictions[
              initialValue.selectedPoluent.name
            ][0]
          : undefined,
      selectedPoluent: undefined,
      focalPoints: [],
      indexes: [],
      ...initialValue,
    },
  );
  return {
    ...state,
    dispatch,
  };
};

export const BaseMapContext = createContext<IBaseMapContext>({
  backgroundMapType: "poluents",
  poluentPrediction: {
    poluents: [],
    domain: { upperlat: 0, lowerlat: 0, leftlon: 0, rightlon: 0 },
    predictions: {},
  },
  dispatch: () => this,
  selectedPoluent: undefined,
  focalPoints: [],
  indexes: [],
});

export const useCurrentBaseMapBackground = ():
  | undefined
  | mapboxgl.ImageSourceOptions => {
  const { backgroundMapType, currentPrediction, poluentPrediction } =
    useContext(BaseMapContext);

  switch (backgroundMapType) {
    case "focal":

    case "indexes":
    case "poluents":
      if (currentPrediction) {
        return {
          url: `${currentPrediction.fileName}`,
          coordinates: [
            [
              currentPrediction.topLeftLongitude,
              currentPrediction.topLeftLatitude,
            ],
            [
              currentPrediction.topRightLongitude,
              currentPrediction.topRightLatitude,
            ],
            [
              currentPrediction.bottomRightLongitude,
              currentPrediction.bottomRightLatitude,
            ],
            [
              currentPrediction.bottomLeftLongitude,
              currentPrediction.bottomLeftLatitude,
            ],
          ],
        };
      }
      return undefined;
  }
};

const BaseMapProvider = ({
  children,
  value,
}: PropsWithChildren & { value: IBaseMapContext }) => {
  return (
    <BaseMapContext.Provider value={value}>{children}</BaseMapContext.Provider>
  );
};

export default BaseMapProvider;
