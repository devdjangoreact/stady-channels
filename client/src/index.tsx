import { lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, HashRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./features/store";
import { ContextProvider } from "./contexts/ContextProvider";

import reportWebVitals from "./reportWebVitals";

import axios from "axios";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// ** Lazy load app
const LazyApp = lazy(() => import("./App"));

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ContextProvider>
        <LazyApp />
      </ContextProvider>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
