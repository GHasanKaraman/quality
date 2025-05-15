import { Route, Routes } from "react-router";
import Login from "./features/auth/Login";
import Layout from "./components/Layout";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<AppLayout />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
