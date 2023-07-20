import { IPredictionPoint, SMOKE_FORECAST_FOLDER } from "@/utils/files";
import { Dispatch, PropsWithChildren, Reducer, createContext, useContext, useReducer } from "react";

export interface IBaseMapContext {
  backgroundMapType: 'weather' | 'topography' | 'fuel' | 'smoke';
  nationalPrediction: IPredictionPoint[];
  currentNationalPrediction?: IPredictionPoint;
  dispatch: Dispatch<Partial<IBaseMapContextState>>;
}

export type IBaseMapContextState = Omit<IBaseMapContext, 'dispatch'>;

export const useBaseMapContextReducer = (initialValue: Partial<IBaseMapContextState>) => {
  const [state, dispatch] = useReducer<Reducer<IBaseMapContextState, Partial<IBaseMapContextState>>>(
    (prevState: IBaseMapContextState, action: Partial<IBaseMapContextState>) => ({...prevState, ...action}),
    {
      backgroundMapType: 'smoke',
      nationalPrediction: [],
      currentNationalPrediction: initialValue.nationalPrediction?.length ? initialValue.nationalPrediction[0] : undefined,
      ...initialValue
    });
  return {
    ...state,
    dispatch
  }
}

export const BaseMapContext = createContext<IBaseMapContext>({backgroundMapType: 'weather', nationalPrediction: [], dispatch: () => this});

const findPrediction = (predictionList: IPredictionPoint[], value: string, key: keyof IPredictionPoint = 'uuid'): IPredictionPoint | undefined => {
  return predictionList.find(prediction => prediction[key] === value);
}

export const useCurrentBaseMapBackground = (): undefined | mapboxgl.ImageSourceOptions => {
  const {backgroundMapType, currentNationalPrediction, nationalPrediction} = useContext(BaseMapContext);

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
    case 'smoke':
      if (currentNationalPrediction) {

        
        

          return {
            url: `/${SMOKE_FORECAST_FOLDER}/${currentNationalPrediction.fileName}`,
            coordinates: [
              [currentNationalPrediction.topLeftLongitude, currentNationalPrediction.topLeftLatitude],
              [currentNationalPrediction.topRightLongitude, currentNationalPrediction.topRightLatitude],
              [currentNationalPrediction.bottomRightLongitude, currentNationalPrediction.bottomRightLatitude],
              [currentNationalPrediction.bottomLeftLongitude, currentNationalPrediction.bottomLeftLatitude],
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