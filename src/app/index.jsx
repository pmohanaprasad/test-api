import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./containers/Dashboard";
import PageNotFound from "./containers/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pagenotfound" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
