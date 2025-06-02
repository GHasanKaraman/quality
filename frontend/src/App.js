import { Route, Routes } from "react-router";
import Login from "./features/auth/Login";
import Layout from "./components/Layout";
import AppLayout from "./components/AppLayout";
import UsersList from "./features/users/UsersList";
import Prefetch from "./features/auth/Prefetch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route element={<Prefetch />}>
          <Route path="dashboard" element={<AppLayout />}>
            <Route path="users">
              <Route index element={<UsersList />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
