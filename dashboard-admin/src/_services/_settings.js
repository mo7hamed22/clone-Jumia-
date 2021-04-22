import axios from "axios";
export const Setting_ser = {
    getSettings,
};

function getSettings() {
  return axios.get("http://localhost:8080/settings/get-settings");
}





