import { useContext, Fragment } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BaseMapContext } from "./base-map-context";
import FormLabel from "react-bootstrap/FormLabel";
import FormRange from "react-bootstrap/FormRange";
import formatISO9075 from "date-fns/formatISO9075";
import parseISO from "date-fns/parseISO";
import React from "react";

const Sidebar = () => {
  const {
    dispatch,
    backgroundMapType,
    poluentPrediction,
    selectedPoluent,
    currentPrediction,
    indexes,
  } = useContext(BaseMapContext);

  const currentPredictionList = selectedPoluent
    ? poluentPrediction.predictions[selectedPoluent?.name]
    : [];
  console.log(indexes, indexes[0]);
  const predictionSource = poluentPrediction;
  return (
    <div className="sidebar">
      <div className="d-flex flex-column h-100 p-4">
        <h2>
          {backgroundMapType} {/*TODO ADD TRANSLATION*/}
        </h2>
        <div className="flex-grow-1">
          {backgroundMapType === "poluents" ? (
            <div className="d-flex flex-column mt-3">
              <Form.Label>Available Poluents</Form.Label>
              <div className="d-flex justify-content-between">
                {poluentPrediction.poluents.map((poluent) => (
                  <Fragment key={poluent.name}>
                    <input
                      type="radio"
                      className="btn-check"
                      name={`options-${poluent.name}`}
                      id={`selector-${poluent.name}`}
                      autoComplete="off"
                      checked={poluent.name === selectedPoluent?.name}
                      onChange={(e) => {
                        if (e.target.checked) {
                          dispatch({
                            selectedPoluent: poluent,
                            currentPrediction:
                              predictionSource.predictions[poluent.name][0],
                          });
                        }
                      }}
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor={`selector-${poluent.name}`}
                    >
                      {poluent.name}
                    </label>
                  </Fragment>
                ))}
              </div>
            </div>
          ) : undefined}
          {["poluents", "indexes"].includes(backgroundMapType) &&
          currentPrediction &&
          currentPredictionList.length ? (
            <div className="mt-3">
              <FormLabel>
                Poluent at time:
                {formatISO9075(parseISO(currentPrediction.time))}
              </FormLabel>
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
          ) : null}
        </div>
        <div className="d-flex justify-content-center gap-4 p-4">
          <Button
            variant={
              backgroundMapType === "poluents"
                ? "secondary"
                : "outline-secondary"
            }
            onClick={() => {
              const poluent = poluentPrediction.poluents[0];
              dispatch({
                backgroundMapType: "poluents",
                selectedPoluent: poluent,
                currentPrediction:
                  poluentPrediction.predictions[poluent.name][0],
              });
            }}
          >
            Poluents
          </Button>
          <Button
            variant={
              backgroundMapType === "indexes"
                ? "secondary"
                : "outline-secondary"
            }
            onClick={() =>
              dispatch({
                backgroundMapType: "indexes",
                currentPrediction: indexes[0],
              })
            }
          >
            Air Quality
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
