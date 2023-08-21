import FormLabel from "react-bootstrap/FormLabel";
import FormRange from "react-bootstrap/FormRange";
import parseISO from "date-fns/parseISO";
import formatInTimeZone from "date-fns-tz/formatInTimeZone";
import { pt } from "date-fns/locale";
import { IPredictionPoint } from "@/utils/files";
import { useTranslations, useLocale } from "next-intl";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { BaseMapContext } from "@/map/base-map-context";
import { Button } from "react-bootstrap";
import { SidebarContext } from "./sidebar-context";

const PredictionRange = () => {
  let currentPredictionList: IPredictionPoint[];
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [, forceRefresh] = useState({});
  const predictionRef = useRef<IPredictionPoint | null>(null);
  const predictionListRef = useRef<IPredictionPoint[]>([]);
  const {
    dispatch,
    backgroundMapType,
    poluentPrediction,
    selectedPoluent,
    currentPrediction,
    indexes,
    currentFocal,
  } = useContext(BaseMapContext);
  const { show, updateShow } = useContext(SidebarContext);
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
  const t = useTranslations("Index");
  const locale = useLocale();

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);
  predictionRef.current = currentPrediction ?? null;
  predictionListRef.current = currentPredictionList;

  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      forceRefresh({});
    }
  }, []);
  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      const index = predictionListRef.current?.findIndex(
        (el) => el.uuid === predictionRef.current?.uuid,
      );

      if (index >= predictionListRef.current.length - 1) {
        stopInterval();
      } else {
        dispatch({
          currentPrediction: predictionListRef.current[index + 1],
        });
      }
    }, 500);
  };
  useEffect(() => {
    stopInterval();
  }, [stopInterval, backgroundMapType, selectedPoluent, currentFocal]);
  if (currentPrediction && currentPredictionList.length) {
    return (
      <div className="mt-3">
        <FormLabel>
          {t("sidebar.prediction_time")}&nbsp;
          {formatInTimeZone(
            parseISO(currentPrediction.time),
            "UTC",
            "EEEE, dd MMM yyyy, HH",
            locale.includes("pt") ? { locale: pt } : undefined,
          )}
          &nbsp;UTC
        </FormLabel>
        <FormRange
          value={currentPredictionList.findIndex(
            (el) => el === currentPrediction,
          )}
          min={0}
          max={currentPredictionList.length - 1}
          onChange={(e) =>
            dispatch({
              currentPrediction: currentPredictionList[e.target.valueAsNumber],
            })
          }
        />
        <div className="d-flex justify-content-between align-items-center">
          <span>
            {formatInTimeZone(
              parseISO(currentPredictionList[0].time),
              "UTC",
              "dd-MM-yyyy",
            )}
          </span>
          <Button
            onClick={() => {
              if (intervalRef.current) {
                stopInterval();
              } else {
                startInterval();
                updateShow(false);
              }
            }}
          >
            {intervalRef.current
              ? t("sidebar.stop_run")
              : t("sidebar.run_prediction")}
          </Button>
          <span>
            {formatInTimeZone(
              parseISO(
                currentPredictionList[currentPredictionList.length - 1].time,
              ),
              "UTC",
              "dd-MM-yyyy",
            )}
          </span>
        </div>
      </div>
    );
  }

  return null;
};

export default PredictionRange;
