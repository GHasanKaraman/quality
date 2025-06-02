import { CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router";

const AppLayout = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Stack width="100%" className="app" direction="row">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Outlet />
          </main>
        </Stack>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default AppLayout;
