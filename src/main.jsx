import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css"
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { extendedApiSlice } from "./features/posts/postsSlice.js";
store.dispatch(extendedApiSlice.endpoints.getPosts.initiate())
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
