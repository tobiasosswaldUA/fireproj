'use-client'

import { useContext } from "react";
import { BaseMapContext } from "./base-map-context";
import FormRange from 'react-bootstrap/FormRange';
import { FormLabel } from "react-bootstrap";

const BaseMapTimeRange = () => {
  const {backgroundMapType, nationalPrediction, currentNationalPrediction, dispatch} = useContext(BaseMapContext);

  if (backgroundMapType !== 'smoke') {
    return null;
  }

  return (
    <div style={{left: '25%', right: '25%'}} className="p-3 mb-4 position-absolute bg-white rounded bottom-0">
      <FormLabel>Smoke at time: {currentNationalPrediction?.time}</FormLabel>
      <FormRange value={nationalPrediction.findIndex(el => el === currentNationalPrediction)} min={0} max={nationalPrediction.length - 1} onChange={e => dispatch({currentNationalPrediction: nationalPrediction[e.target.valueAsNumber]})}/>
    </div>
  )

}

export default BaseMapTimeRange;