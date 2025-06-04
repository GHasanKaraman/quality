import { Outlet, Link } from "react-router";
import { useState, useEffect, useRef } from "react";
import { useRefreshMutation } from "./authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const PersistLogin = () => {
  const token = useSelector(selectCurrentToken);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
        setTrueSuccess(true);
      } catch (err) {
        console.error("Failed to refresh token:", err);
      }
    };

    if (!token) {
      verifyRefreshToken();
    }
  }, []);

  let content;
  if (isLoading) {
    //console.log("Loading...");
    content = <p>Loading...</p>;
  } else if (isError) {
    console.log("error");
    content = (
      <p>
        {error?.data?.message}
        <Link to="/login">Click here to log in</Link>.
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    //console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    console.log("Token and uninit");
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
