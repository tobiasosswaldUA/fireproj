import "../globals.scss";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { createTranslator, NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import FireNav from "@/nav/nav";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: ReactNode;
  params: { lang: string };
};

async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  return ["en", "pt"].map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { lang } }: Props) {
  const messages = await getMessages(lang);

  // You can use the core (non-React) APIs when you have to use next-intl
  // outside of components. Potentially this will be simplified in the future
  // (see https://next-intl-docs.vercel.app/docs/next-13/server-components).
  const t = createTranslator({ locale: lang, messages });

  return {
    title: t("Meta.title"),
  };
}

export default async function LocaleLayout({
  children,
  params: { lang },
}: Props) {
  const messages = await getMessages(lang);

  return (
    <html className="h-full" lang={lang}>
      <body className={`${inter.className} flex h-full flex-col`}>
        <NextIntlClientProvider locale={lang} messages={messages}>
          <FireNav />
          <main className="main">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
