import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import OutletPage from "./outlets/OutletPage";
import PageBarangList from "./pages/barang/PageBarangList";
import PageBarangCreate from "./pages/barang/PageBarangCreate";
import PageBarangDetail from "./pages/barang/PageBarangDetail";
import { ContextApplication } from "./libs/config/contexts";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <ContextApplication.Provider
        value={{ isAuthenticated, setIsAuthenticated }}
      >
        <HashRouter>
          <Routes>
            <Route path="/" element={<OutletPage />}>
              <Route index={true} element={<PageBarangList />} />
              <Route path={"new"} element={<PageBarangCreate />} />
              <Route path={"detail/:id"} element={<PageBarangDetail />} />
            </Route>
          </Routes>
        </HashRouter>
      </ContextApplication.Provider>
    </>
  );
}

export default App;