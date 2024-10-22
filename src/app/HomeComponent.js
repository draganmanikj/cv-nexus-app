import React from "react";
import Logo from "./util/images/logo.png";
import { translate } from "./util/lang/translate-wrapper";

function Home(props) {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <img alt="logo" src={Logo} style={{ width: "260px" }} />
      <h3>
        {translate("app.generic.sobranieRSM")}
      </h3>

      <h2>{translate("app.applicationName")}</h2>
    </div>
  );
}
export default Home;
