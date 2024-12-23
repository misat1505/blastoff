import { Suspense } from "react";
import { routes } from "@/lib/routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <Router>
      <Navbar />
      <ScrollToTop>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <Suspense fallback={<Loading />}>
                  <route.component />
                </Suspense>
              }
            />
          ))}
        </Routes>
      </ScrollToTop>
    </Router>
  );
};

export default App;
