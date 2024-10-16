"use client";
import { HistoryItem } from "@/utils/files";
import FormSelect from "react-bootstrap/FormSelect";
import Form from "react-bootstrap/Form";
import { SidebarContainer } from "./sidebar-container";
import FormLabel from "react-bootstrap/FormLabel";
import Button from "react-bootstrap/Button";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";

interface SidebarHistoryProps {
  events: HistoryItem[];
  loadFile: (fileName: string) => void;
}

export const SidebarHistory = ({ events, loadFile }: SidebarHistoryProps) => {
  const t = useTranslations("History");
  const [currentFile, setCurrentFile] = useState<string>(events[0]?.file);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loadFile(currentFile);
    } catch {
      setLoading(false);
    }
  };
  return (
    <SidebarContainer show={true}>
      <Form onSubmit={onSubmit}>
        <FormLabel
          className="mb-3"
          id="history-select-label"
          htmlFor="history-select"
        >
          {t("form")}
        </FormLabel>
        <FormSelect
          value={currentFile}
          onChange={(e) => setCurrentFile(e.target.value)}
          name="history-select"
          id="history-select"
          className="mb-3"
        >
          {events.map((event) => {
            return (
              <option key={event.id} value={event.file}>
                {event.name}
              </option>
            );
          })}
        </FormSelect>
        <Button disabled={loading} className="ms-auto d-block" type="submit">
          {loading ? t("loading") : t("go")}
        </Button>
      </Form>
    </SidebarContainer>
  );
};
