import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let status = "QC";

  if (token) {
    const decodedToken = jwtDecode(token);
    const { username, roles } = decodedToken.UserInfo;

    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");
    if (isManager) {
      status = "Manager";
    }
    if (isAdmin) {
      status = "Admin";
    }
    return {
      username,
      roles,
      isManager,
      isAdmin,
      status,
    };
  }

  return { username: "", picture: "", name: "", isManager, isAdmin, status };
};

export default useAuth;
