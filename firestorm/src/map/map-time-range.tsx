'use-client'

import { Context, useContext } from "react";
import { BaseMapContext, IBaseMapContext } from "./base-map-context";
import FormRange from 'react-bootstrap/FormRange';
import { Badge, FormLabel } from "react-bootstrap";
import { ISideMapContext, SideMapContext } from "./side-map-context";

const MapTimeRange = ({context}: {context: Context<IBaseMapContext>}) => {
  const {backgroundMapType, poluentPrediction, currentPrediction, dispatch, selectedPoluent, poluents} = useContext(context);

  if (backgroundMapType !== 'poluents' || !poluentPrediction) {
    return null;
  }

  return (
    <>
      <div style={{left: '25%', right: '25%'}} className="position-absolute bottom-0">
        <div className="d-flex justify-content-start mb-3 gap-3 fs-5">
          {poluents.map((poluent: string, idx: number) => <Badge key={poluent+idx} text={idx === 2 ? 'white' : 'dark'} className="text-uppercase" pill bg={idx === 2 ? 'primary': "white"}>{poluent}</Badge>)}
        </div>
        <div className="p-3 mb-4 bg-white rounded d-flex align-items-center gap-3">
          <div className="display-3">
            🕘
          </div>
          <div className="flex-grow-1">
            <FormLabel>Poluent at time: {currentPrediction?.time}</FormLabel>
            <FormRange 
              value={
                poluentPrediction[selectedPoluent].findIndex(
                  el => el === currentPrediction)
              }
              min={0}
              max={poluentPrediction[selectedPoluent].length - 1}
              onChange={e => dispatch({currentPrediction: poluentPrediction[selectedPoluent][e.target.valueAsNumber]})}/>
            <div className="d-flex justify-content-between">
              <span>
                {poluentPrediction[selectedPoluent][0].time}
              </span>
              <span>
                {poluentPrediction[selectedPoluent][poluentPrediction[selectedPoluent].length - 1].time}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default MapTimeRange;