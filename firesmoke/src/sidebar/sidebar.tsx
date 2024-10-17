"use client";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { BaseMapContext } from "../map/base-map-context";

import React from "react";

import PoluentGradient from "@/poluents/poluent-gradient";
import { useTranslations } from "next-intl";
import { SidebarContext } from "./sidebar-context";
import PredictionRange from "./prediction-range";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import Legend from "./legend";
import { SidebarContainer } from "./sidebar-container";

const Sidebar = () => {
  const {
    dispatch,
    backgroundMapType,
    poluentPrediction,
    selectedPoluent,
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
    <SidebarContainer show={show}>
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
            <div className="">
              <Dropdown>
                <Dropdown.Toggle
                  className="w-100"
                  variant="outline-secondary"
                  dangerouslySetInnerHTML={{
                    __html: t.raw(
                      `poluents.${selectedPoluent?.name
                        .toLowerCase()
                        .replace(".", "")}`,
                    ),
                  }}
                ></Dropdown.Toggle>
                <DropdownMenu>
                  {predictionSource.poluents.map((poluent) => (
                    <Dropdown.Item
                      key={poluent.name}
                      value={poluent.name}
                      dangerouslySetInnerHTML={{
                        __html: t.raw(
                          `poluents.${poluent.name
                            .toLowerCase()
                            .replace(".", "")}`,
                        ),
                      }}
                      onClick={() => {
                        dispatch({
                          selectedPoluent: poluent,
                          currentPrediction:
                            predictionSource.predictions[poluent.name][0],
                        });
                      }}
                    ></Dropdown.Item>
                  ))}
                </DropdownMenu>
              </Dropdown>
              {/* <Form.Select
                  value={selectedPoluent?.name}
                  onChange={(e) => {
                    const poluent = predictionSource.poluents.find(
                      (pol) => pol.name === e.target.value,
                    );

                    if (poluent) {
                      dispatch({
                        selectedPoluent: poluent,
                        currentPrediction:
                          predictionSource.predictions[poluent.name][0],
                      });
                    }
                  }}
                >
                  {predictionSource.poluents.map((poluent) => (
                    <option key={poluent.name} value={poluent.name}>
                      {t(
                        `poluents.${poluent.name
                          .toLowerCase()
                          .replace(".", "")}`,
                      )}
                    </option>
                  ))}
                </Form.Select> */}
            </div>
          </div>
        ) : undefined}

        <PoluentGradient />
        <PredictionRange />
        <Legend />
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
