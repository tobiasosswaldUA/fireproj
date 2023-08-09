"use client";
import { useTranslations } from "next-intl";

const MethodologyContent = () => {
  const t = useTranslations("Methodology");
  return <div>{t("title")}</div>;
};

export default MethodologyContent;
