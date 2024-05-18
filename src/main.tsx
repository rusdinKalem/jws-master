import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import ProvideContext from "./contexts/dataContexts";
import ProvidePrayersContext from "./contexts/prayersContext";
import ProvideColorsContext from "./contexts/colorsContext";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ProvideContext>
      <ProvidePrayersContext>
      <ProvideColorsContext>
                            <App />
      </ProvideColorsContext>
      </ProvidePrayersContext>
    </ProvideContext>
  </React.StrictMode>
);
