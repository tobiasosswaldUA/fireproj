"use-client";

import { Context, useContext } from "react";
import { BaseMapContext, IBaseMapContext } from "./base-map-context";
import FormRange from "react-bootstrap/FormRange";
import { Badge, Button, FormLabel } from "react-bootstrap";
import { ISideMapContext, SideMapContext } from "./side-map-context";

const MapTimeRange = ({ context }: { context: Context<IBaseMapContext> }) => {
  const {
    backgroundMapType,
    poluentPrediction,
    currentPrediction,
    dispatch,
    selectedPoluent,
  } = useContext(context);

  if (backgroundMapType !== "poluents" || !poluentPrediction) {
    return null;
  }

  const currentPredictionList = poluentPrediction.predictions[selectedPoluent];

  return (
    <>
      <div
        style={{ left: "25%", right: "25%" }}
        className="position-absolute bottom-0"
      >
        <div className="d-flex justify-content-start mb-3 gap-3 fs-5">
          {poluentPrediction.poluents.map(({ name }, idx: number) => (
            <Button
              key={name + idx}
              className="text-uppercase rounded-pill"
              variant={selectedPoluent === name ? "primary" : "secondary"}
            >
              {name}
            </Button>
          ))}
        </div>
        <div className="p-3 mb-4 bg-white rounded d-flex align-items-center gap-3">
          <div className="display-3">🕘</div>
          <div className="flex-grow-1">
            <FormLabel>Poluent at time: {currentPrediction?.time}</FormLabel>
            <FormRange
              value={currentPredictionList.findIndex(
                (el) => el === currentPrediction,
              )}
              min={0}
              max={currentPredictionList.length - 1}
              onChange={(e) =>
                dispatch({
                  currentPrediction:
                    currentPredictionList[e.target.valueAsNumber],
                })
              }
            />
            <div className="d-flex justify-content-between">
              <span>{currentPredictionList[0].time}</span>
              <span>
                {currentPredictionList[currentPredictionList.length - 1].time}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapTimeRange;
