import { Routes, Route, Outlet, Navigate } from "react-router";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";

import LoginPage from "../features/auth/LoginPage.js";

const BarLayout = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Outlet />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

const RegularLayout = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Outlet />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

const Router = () => {
  return (
    <Routes>
      <Route element={<RegularLayout />}>
        <Route exact path="/" element={<LoginPage title="CiboQA | Login" />} />
        <Route
          exact
          path="/login"
          element={<LoginPage title="CiboQA | Login" />}
        />
      </Route>

      <Route element={<BarLayout />}>
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default Router;
