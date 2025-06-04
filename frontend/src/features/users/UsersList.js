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
  } = useGetUsersQuery("usersList", {
    pollingInterval: 40000, // Poll every 60 seconds
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (isError) {
    content = <p>Error: {error?.data?.message || "An error occurred"}</p>;
  }
  if (isSuccess) {
    content = Object.values(users?.entities)?.map((user) => (
      <Box
        key={user.id}
        sx={{
          padding: "10px",
          margin: "10px 0",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <h3>{user.name}</h3>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
      </Box>
    ));
  }

  return (
    <Box m="80px 20px">
      <Header title="USERS" subtitle="List of Users" />
      {content}
    </Box>
  );
};
export default UsersList;
