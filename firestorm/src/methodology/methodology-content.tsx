"use client";
import { useTranslations } from "next-intl";

const MethodologyContent = () => {
  const t = useTranslations("Methodology");
  return (
    <div className="p-5">
      <h1>{t("title")}</h1>
      <p>{t("general_content")}</p>
      <h2 className="mt-4">{t("fires")}</h2>
      <p>{t("lorem_ipsum")}</p>
      <h2 className="mt-4">{t("models")}</h2>
      <div className="d-flex flex-column flex-lg-row gap-4">
        <p>{t("models_description")}</p>
        <img
          src="http://gestao.tncreate.pt/upload/iqa/6rzyuWc8/img/content/Dewu5jYV/thumbs/esquema_previsao_web_page.png"
          alt="WRF-CHIMERE"
        />
      </div>
      <h2 className="mt-4">{t("air_quality")}</h2>
      <p>{t.raw("air_quality_description")}</p>
      <table className="w-100" border={1} cellPadding={2} cellSpacing={0}>
        <thead>
          <tr>
            <td rowSpan={2} style={{ verticalAlign: "top" }}>
              {t("pollutant")}
            </td>
            <td colSpan={5}>
              {t("index")}
              <br />
              <span>{t("index_sub")}</span>
            </td>
          </tr>
          <tr>
            <td>{t("index_good")}</td>
            <td>{t("index_fair")}</td>
            <td>{t("index_moderate")}</td>
            <td>{t("index_poor")}</td>
            <td>{t("index_very_poor")}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{t.raw("particles_2.5")}</td>
            <td>{t("0-10")}</td>
            <td>{t("10-20")}</td>
            <td>{t("20-25")}</td>
            <td>{t("25-50")}</td>
            <td>{t("50")}</td>
          </tr>
          <tr>
            <td>{t.raw("particles_10")}</td>
            <td>{t("0-20")}</td>
            <td>{t("20-40")}</td>
            <td>{t("40-50")}</td>
            <td>{t("50-100")}</td>
            <td>{t("100")}</td>
          </tr>
          <tr>
            <td>{t.raw("nitrogen")}</td>
            <td>{t("0-40")}</td>
            <td>{t("40-90")}</td>
            <td>{t("90-120")}</td>
            <td>{t("120-230")}</td>
            <td>{t("230")}</td>
          </tr>
          <tr>
            <td>{t.raw("ozone")}</td>
            <td>{t("0-50")}</td>
            <td>{t("50-100")}</td>
            <td>{t("100-130")}</td>
            <td>{t("130-240")}</td>
            <td>{t("240")}</td>
          </tr>
        </tbody>
      </table>

      <h2 className="mt-4">{t("smokestorm")}</h2>

      <p>{t.raw("smokestorm_description")}</p>

      <video width="100%" height="" controls>
        <source
          src="http://smokestorm.web.ua.pt/media/UA_SmokeStorm_Video_FINAL-HD-compress.mov"
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default MethodologyContent;
