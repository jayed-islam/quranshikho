import { QuranDynamicScreen } from "@/src/sections/quran/view/quran-dynamic-screen-view";
import { FC } from "react";

export const metadata = {
  title: "Quran: Quran.com",
};

interface IQuranProps {
  params: {
    id: string;
  };
}

const QuranDynamicPage: FC<IQuranProps> = ({ params }) => {
  const { id } = params;
  return <QuranDynamicScreen id={id as string} />;
};

export default QuranDynamicPage;
