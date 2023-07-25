import { IFocalDescription, IPredictionPoint } from "@/utils/files";
import { Dispatch, PropsWithChildren, Reducer, createContext, useContext, useReducer } from "react";

export interface ISideMapContext {
  focalPoint?: IFocalDescription<IPredictionPoint>;
  selectedPoluent: string;
  currentPrediction?: IPredictionPoint;
  dispatch: Dispatch<Partial<ISideMapContextState>>;
}

export type ISideMapContextState = Omit<ISideMapContext, 'dispatch'>;

export const useSideMapContextReducer = (initialValue: Partial<ISideMapContextState>): ISideMapContext => {
  const [state, dispatch] = useReducer<Reducer<ISideMapContextState, Partial<ISideMapContextState>>>(
    (prevState: ISideMapContextState, action: Partial<ISideMapContextState>) => ({...prevState, ...action}),
    {
      focalPoint: initialValue.focalPoint,
      selectedPoluent: 'smoke',
      currentPrediction: 
        initialValue.selectedPoluent &&
        initialValue.focalPoint &&
        initialValue.focalPoint.predictions[initialValue.selectedPoluent]?.length ? initialValue.focalPoint.predictions[initialValue.selectedPoluent][0] : undefined,
      ...initialValue
    });
  return {
    ...state,
    dispatch
  }
}

export const SideMapContext = createContext<ISideMapContext>({focalPoint: undefined, dispatch: () => this, selectedPoluent: 'smoke',});

export const useCurrentSideMapBackground = (): undefined | mapboxgl.ImageSourceOptions => {
  const {currentPrediction} = useContext(SideMapContext);
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

const SideMapProvider = ({children, value}: PropsWithChildren & {value: ISideMapContext}) => {
  
  return (<SideMapContext.Provider value={value}>
    {children}
  </SideMapContext.Provider>)
}

export default SideMapProvider;