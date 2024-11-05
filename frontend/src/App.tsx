import { Suspense } from "react";
import { routes } from "./lib/routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";

const App = () => {
  return (
    <Router>
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
    </Router>
  );
};

export default App;
