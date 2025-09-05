import { useState } from "react";
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Auth from "./Components/Auth/Auth";
const RoutingConfig = lazy(() => import("./Components/RoutingConfig"));
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="*" element={<Auth />} />
            <Route path="v/*" element={<RoutingConfig />} />
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
