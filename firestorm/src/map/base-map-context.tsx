'use client'
import { IFocalDescription, IPredictionPoint } from "@/utils/files";
import { Dispatch, PropsWithChildren, Reducer, createContext, useContext, useReducer } from "react";

export interface IBaseMapContext {
  backgroundMapType: 'weather' | 'topography' | 'fuel' | 'poluents';
  selectedPoluent: string;
  poluentPrediction: Record<string, IPredictionPoint[]>;
  currentPrediction?: IPredictionPoint;
  dispatch: Dispatch<Partial<IBaseMapContextState>>;
  focalPoints: IFocalDescription<IPredictionPoint>[];
  poluents: string[];
}

export type IBaseMapContextState = Omit<IBaseMapContext, 'dispatch'>;

export const useBaseMapContextReducer = (initialValue: Partial<IBaseMapContextState>) => {
  const [state, dispatch] = useReducer<Reducer<IBaseMapContextState, Partial<IBaseMapContextState>>>(
    (prevState: IBaseMapContextState, action: Partial<IBaseMapContextState>) => ({...prevState, ...action}),
    {
      backgroundMapType: 'poluents',
      poluentPrediction: {'smoke': []},
      currentPrediction: initialValue.selectedPoluent && initialValue.poluentPrediction && initialValue.poluentPrediction[initialValue.selectedPoluent].length ? initialValue.poluentPrediction[initialValue.selectedPoluent][0] : undefined,
      selectedPoluent: 'smoke',
      focalPoints: [],
      poluents: [],
      ...initialValue
    });
  return {
    ...state,
    dispatch
  }
}

export const BaseMapContext = createContext<IBaseMapContext>({backgroundMapType: 'weather', poluentPrediction: {'smoke': []}, dispatch: () => this, selectedPoluent: 'smoke', focalPoints: [], poluents: []});

const findPrediction = (predictionList: IPredictionPoint[], value: string, key: keyof IPredictionPoint = 'uuid'): IPredictionPoint | undefined => {
  return predictionList.find(prediction => prediction[key] === value);
}

export const useCurrentBaseMapBackground = (): undefined | mapboxgl.ImageSourceOptions => {
  const {backgroundMapType, currentPrediction, poluentPrediction} = useContext(BaseMapContext);

  switch(backgroundMapType) {
    case 'fuel':
    case 'topography':
    case 'weather':
      return {
        'url': `/${backgroundMapType}.png`,
        'coordinates': [
          [-9, 42.15],
          [-6.12, 42.15],
          [-6.12, 36.8],
          [-9, 36.8]
        ]
      }
    case 'poluents':
      if (currentPrediction) {

        
        

          return {
            url: `${currentPrediction.fileName}`,
            coordinates: [
              [currentPrediction.topLeftLongitude, currentPrediction.topLeftLatitude],
              [currentPrediction.topRightLongitude, currentPrediction.topRightLatitude],
              [currentPrediction.bottomRightLongitude, currentPrediction.bottomRightLatitude],
              [currentPrediction.bottomLeftLongitude, currentPrediction.bottomLeftLatitude],
            ]
          }
        
      }
      return undefined
  }
}

const BaseMapProvider = ({children, value}: PropsWithChildren & {value: IBaseMapContext}) => {
  
  return (<BaseMapContext.Provider value={value}>
    {children}
  </BaseMapContext.Provider>)
}

export default BaseMapProvider;