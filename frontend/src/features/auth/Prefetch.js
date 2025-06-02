import { store } from "../../app/store";
import { useEffect } from "react";
import { usersApiSlice } from "../users/usersApiSlice";
import { Outlet } from "react-router";

const Prefetch = () => {
  useEffect(() => {
    console.log("Subscribing...");

    // Prefetch the users data when this component mounts
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    return () => {
      console.log("Unsubscribing...");
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
export default Prefetch;
