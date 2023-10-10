import { useTranslations } from "next-intl";

const Legend = () => {
  const t = useTranslations("Index");
  return <div>{t(`sidebar.marker_legend`)}</div>;
};

export default Legend;
