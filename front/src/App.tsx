import { BrowserRouter, Route, Routes } from "react-router-dom";
import Notfound from "./pages/Notfound";
import Page from "./pages/Page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Page />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
