import { SnackbarProvider } from "notistack";
import { ScrollRestoration } from "react-router";
import Router from "./routes/router";

function App() {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Router />
    </SnackbarProvider>
  );
}

export default App;
