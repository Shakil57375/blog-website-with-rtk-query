import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { extendedApiSlice } from "./features/posts/postsSlice.jsx";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; // Change this line

// Dispatch API call to load posts (optional based on your logic)
store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());

// Rendering the application
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
);
