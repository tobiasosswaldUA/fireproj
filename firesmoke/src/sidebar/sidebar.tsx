"use client";
import { useCallback, useContext, useEffect } from "react";
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

  const { show, needsToResetFocal } = useContext(SidebarContext);

  const goToPoluents = useCallback(() => {
    const poluent = poluentPrediction?.poluents?.[0] ?? undefined;
    dispatch({
      backgroundMapType: "poluents",
      selectedPoluent: poluent,
      currentPrediction: poluent
        ? poluentPrediction?.predictions[poluent.name]?.[0] ?? undefined
        : undefined,
    });
  }, [dispatch, poluentPrediction?.poluents, poluentPrediction?.predictions]);
  const isFocal = backgroundMapType === "focal";

  const predictionSource =
    currentFocal && isFocal ? currentFocal : poluentPrediction;

  useEffect(() => {
    if (isFocal) {
      goToPoluents();
    }
  }, [needsToResetFocal]);
  return (
    <SidebarContainer show={show}>
      <h2 className="d-flex justify-content-between">
        <span
          dangerouslySetInnerHTML={{
            __html: t.raw(`sidebar.title.${backgroundMapType}`),
          }}
        ></span>
      </h2>
      <p>
        {isFocal
          ? t(`sidebar.title.subtitle_focal`)
          : t(`sidebar.title.subtitle`)}
      </p>
      {isFocal ? (
        <Button
          className="ms-auto align-self-start"
          variant="outline-secondary"
          onClick={goToPoluents}
        >
          {t("sidebar.title.back")}
        </Button>
      ) : null}
      <div className="flex-grow-1">
        {["poluents", "focal"].includes(backgroundMapType) &&
        selectedPoluent ? (
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
                  {(predictionSource?.poluents ?? []).map((poluent) => (
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
                            predictionSource?.predictions[poluent.name][0],
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
        {isFocal ? null : <Legend />}
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
