import { BaseMapContext } from "@/map/base-map-context";
import { IPoluent } from "@/utils/files";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import FormLabel from "react-bootstrap/FormLabel";

const PoluentGradient = () => {
  const { selectedPoluent } = useContext(BaseMapContext);
  const t = useTranslations("Index");

  if (!selectedPoluent) {
    return null;
  }

  const colours = ["#47E369", "#47B65E", "#EFE133", "#F99C47", "#F94747"];
  const discreveTranslations = [
    t("scale.very_good"),
    t("scale.good"),
    t("scale.average"),
    t("scale.weak"),
    t("scale.bad"),
  ];
  // Here we can change which variables show the descriptive gradient
  const shouldHaveFixedGradient = ["IQA","Visibility"].includes(selectedPoluent.name);

  return (
    <div className="mb-5 mt-3">
      <div
        className={`w-100 gradient rounded-pill d-flex overflow-hidden position-relative ${
          shouldHaveFixedGradient ? "" : "poluent-gradient"
        }`}
      >
        {shouldHaveFixedGradient
          ? colours.map((c) => (
              <div
                key={c}
                className="gradient-step"
                style={{ ["--step-colour" as any]: c }}
              ></div>
            ))
          : null}
        <div className="position-absolute top-50 start-50 translate-middle">
          {selectedPoluent.unit}
        </div>
      </div>
      <div style={{ height: 24 }} className="position-relative d-flex">
        {shouldHaveFixedGradient
          ? discreveTranslations.map((step) => (
              <div
                key={step}
                className="gradient-step d-flex align-items-center justify-content-center"
              >
                {step}
              </div>
            ))
          : selectedPoluent.intervals.map((interval, idx) => (
              <span
                key={interval}
                style={{ ["--step-idx" as any]: idx }}
                className={`position-absolute poluent-gradient-step ${
                  idx !== 0 ? "translate-middle-x" : ""
                }`}
              >
                {interval}
              </span>
            ))}
      </div>
    </div>
  );
};

export default PoluentGradient;
