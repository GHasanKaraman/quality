import { useEffect } from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import { Box } from "@mui/material";
import Header from "../../components/Header";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60000, // Poll every 60 seconds
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log(users);
    }
  }, [isSuccess]);

  return (
    <Box m="80px 20px">
      <Header title="USERS" subtitle="List of Users" />
    </Box>
  );
};
export default UsersList;
