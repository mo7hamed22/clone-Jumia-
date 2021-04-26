import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import data from '../localization/data';


const resources = data;
i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
	debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;