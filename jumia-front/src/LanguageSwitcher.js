import React from "react";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  function handleChange(e) {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem('cur_lang', e.target.value);
  }
  const { t } = useTranslation();

  return (
    <div className="form-control">
      <select
        value={i18n.language}
        onChange={handleChange}
      >
        <option selected disabled> - {t("lang")} - </option>
        <option value="en">English</option>
        <option value="ar">عربي</option>
      </select>
    </div>
  );
}
export default LanguageSwitcher;