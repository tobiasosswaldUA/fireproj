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
  return (
    <div className="mb-5 mt-3">
      <div className="w-100 gradient rounded-pill"></div>
      <div className="position-relative pb-3">
        <div className="position-absolute start-0">
          {selectedPoluent.minValue}
          {selectedPoluent.unit}
        </div>
        <div className="position-absolute end-0">
          {selectedPoluent.maxValue}
          {selectedPoluent.unit}
        </div>
      </div>
    </div>
  );
};

export default PoluentGradient;
