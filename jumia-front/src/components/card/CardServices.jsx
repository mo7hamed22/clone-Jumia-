import React from "react";
import { ReactComponent as IconTruckFill } from "bootstrap-icons/icons/truck.svg";
import { ReactComponent as IconLifePreserverFill } from "bootstrap-icons/icons/life-preserver.svg";
import { ReactComponent as IconArrowCounterclockwiseFill } from "bootstrap-icons/icons/arrow-counterclockwise.svg";
import { useTranslation } from "react-i18next";
const CardServices = (props) => {
  const { t } = useTranslation();
  return (
    <div className="card">
      <div className="card-header font-weight-bold text-uppercase">
        {t("CustomService")}
      </div>
      <div className="card-body">
        <div className="row border-bottom">
          <div className="col-2">
            <IconTruckFill className="h1" />
          </div>
          <div className="col">
            <div className="ml-3">
              <span className="font-weight-bold">{t("Delivery.title")}</span>
              <p className="text-muted small">{t("Delivery.body")}</p>
            </div>
          </div>
        </div>
        <div className="row border-bottom py-3">
          <div className="col-2">
            <IconLifePreserverFill className="h1" />
          </div>
          <div className="col">
            <div className="ml-3">
              <span className="font-weight-bold">{t("Support.title")}</span>
              <p className="text-muted small m-0">{t("Support.body")}</p>
            </div>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-2">
            <IconArrowCounterclockwiseFill className="h1" />
          </div>
          <div className="col">
            <div className="ml-3">
              <span className="font-weight-bold">{t("return.title")}</span>
              <p className="text-muted small m-0">{t("return.body")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardServices;
