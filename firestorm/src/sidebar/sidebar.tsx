import { useContext, Fragment } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BaseMapContext } from "../map/base-map-context";

import React from "react";

import PoluentGradient from "@/poluents/poluent-gradient";
import { useTranslations } from "next-intl";
import { SidebarContext } from "./sidebar-context";
import PredictionRange from "./prediction-range";

const Sidebar = () => {
  const {
    dispatch,
    backgroundMapType,
    poluentPrediction,
    selectedPoluent,
    indexes,
    currentFocal,
  } = useContext(BaseMapContext);
  const t = useTranslations("Index");

  const { show } = useContext(SidebarContext);

  const goToPoluents = () => {
    const poluent = poluentPrediction.poluents[0];
    dispatch({
      backgroundMapType: "poluents",
      selectedPoluent: poluent,
      currentPrediction: poluentPrediction.predictions[poluent.name][0],
    });
  };

  const predictionSource =
    currentFocal && backgroundMapType === "focal"
      ? currentFocal
      : poluentPrediction;
  return (
    <div className={`sidebar ${show ? "show" : ""}`}>
      <div className="d-flex flex-column h-100 p-4">
        <h2 className="d-flex justify-content-between">
          {t(`sidebar.title.${backgroundMapType}`)}
          {backgroundMapType === "focal" ? (
            <Button
              className="ms-auto"
              variant="outline-secondary"
              onClick={goToPoluents}
            >
              {t("sidebar.title.back")}
            </Button>
          ) : null}
        </h2>
        <p>{t(`sidebar.title.subtitle`)}</p>
        <div className="flex-grow-1">
          {["poluents", "focal"].includes(backgroundMapType) ? (
            <div className="d-flex flex-column mt-3">
              <Form.Label>{t("sidebar.available_poluents")}</Form.Label>
              <div className="d-flex justify-content-between">
                {predictionSource.poluents.map((poluent) => (
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
                      dangerouslySetInnerHTML={{
                        __html: t.raw(
                          `poluents.${poluent.name
                            .toLowerCase()
                            .replace(".", "")}`,
                        ),
                      }}
                    ></label>
                  </Fragment>
                ))}
              </div>
            </div>
          ) : undefined}

          <PoluentGradient />
          <PredictionRange />
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
            {t("sidebar.map_type.poluents")}
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
            {t("sidebar.map_type.indexes")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
