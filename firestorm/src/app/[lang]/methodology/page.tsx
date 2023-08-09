import MethodologyContent from "@/methodology/methodology-content";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

export default async function Methodology({ params: { lang } }: any) {
  return <MethodologyContent />;
}
