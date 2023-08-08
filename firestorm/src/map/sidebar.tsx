import { useContext, Fragment } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BaseMapContext } from "./base-map-context";
import FormLabel from "react-bootstrap/FormLabel";
import FormRange from "react-bootstrap/FormRange";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
import React from "react";
import { IPredictionPoint } from "@/utils/files";
import PoluentGradient from "@/poluents/poluent-gradient";

const Sidebar = () => {
  const {
    dispatch,
    backgroundMapType,
    poluentPrediction,
    selectedPoluent,
    currentPrediction,
    indexes,
    currentFocal,
  } = useContext(BaseMapContext);

  let currentPredictionList: IPredictionPoint[];
  switch (backgroundMapType) {
    case "focal":
      currentPredictionList =
        selectedPoluent && currentFocal
          ? currentFocal.predictions[selectedPoluent?.name]
          : [];
      break;
    case "poluents":
      currentPredictionList = selectedPoluent
        ? poluentPrediction.predictions[selectedPoluent?.name]
        : [];
      break;
    case "indexes":
      currentPredictionList = indexes;
      break;
    default:
      currentPredictionList = [];
      break;
  }

  const goToPoluents = () => {
    const poluent = poluentPrediction.poluents[0];
    dispatch({
      backgroundMapType: "poluents",
      selectedPoluent: poluent,
      currentPrediction: poluentPrediction.predictions[poluent.name][0],
    });
  };

  const predictionSource = poluentPrediction;
  return (
    <div className="sidebar">
      <div className="d-flex flex-column h-100 p-4">
        <h2 className="d-flex justify-content-between">
          {backgroundMapType} {/*TODO ADD TRANSLATION*/}
          {backgroundMapType === "focal" ? (
            <Button
              className="ms-auto"
              variant="outline-secondary"
              onClick={goToPoluents}
            >
              Go Back
            </Button>
          ) : null}
        </h2>
        <div className="flex-grow-1">
          {["poluents", "focal"].includes(backgroundMapType) ? (
            <div className="d-flex flex-column mt-3">
              <Form.Label>Available Poluents</Form.Label>
              <div className="d-flex justify-content-between">
                {(backgroundMapType === "poluents"
                  ? poluentPrediction
                  : poluentPrediction
                ).poluents.map((poluent) => (
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

          <PoluentGradient />

          {currentPrediction && currentPredictionList.length ? (
            <div className="mt-3">
              <FormLabel>
                Prediction at:&nbsp;
                {format(parseISO(currentPrediction.time), "HH:mm dd-MM-yy")}
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
                <span>
                  {format(
                    parseISO(currentPredictionList[0].time),
                    "dd-MM-yyyy",
                  )}
                </span>
                <span>
                  {format(
                    parseISO(
                      currentPredictionList[currentPredictionList.length - 1]
                        .time,
                    ),
                    "dd-MM-yyyy",
                  )}
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
            onClick={goToPoluents}
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
                selectedPoluent: undefined,
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
