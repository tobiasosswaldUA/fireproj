'use client'
import { IPoluent, IPredictionPoint } from "@/utils/files";
import { Dispatch, PropsWithChildren, Reducer, createContext, useContext, useReducer } from "react";

export interface ISideMapContext {
  poluents: IPoluent[];
  backgroundMapType: 'poluents'
  center?: [number, number];
  name?: string;
  poluentPrediction?: Record<string, IPredictionPoint[]>;
  selectedPoluent: string;
  currentPrediction?: IPredictionPoint;
  dispatch: Dispatch<Partial<ISideMapContextState>>;
}

export type ISideMapContextState = Omit<ISideMapContext, 'dispatch'>;

export const useSideMapContextReducer = (initialValue: Partial<ISideMapContextState>): ISideMapContext => {
  const [state, dispatch] = useReducer<Reducer<ISideMapContextState, Partial<ISideMapContextState>>>(
    (prevState: ISideMapContextState, action: Partial<ISideMapContextState>) => ({...prevState, ...action}),
    {
      backgroundMapType: 'poluents',
      name: initialValue.name,
      center: initialValue.center,
      selectedPoluent: 'smoke',
      poluents: [],
      currentPrediction: 
        initialValue.selectedPoluent &&
        initialValue.poluentPrediction &&
        initialValue.poluentPrediction[initialValue.selectedPoluent]?.length ? initialValue.poluentPrediction[initialValue.selectedPoluent][0] : undefined,
      ...initialValue
    });
  return {
    ...state,
    dispatch
  }
}

export const SideMapContext = createContext<ISideMapContext>({name: undefined, center: undefined, dispatch: () => this, selectedPoluent: 'smoke',backgroundMapType: 'poluents', poluents: []});

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