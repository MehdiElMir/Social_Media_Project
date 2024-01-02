import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";
function Home() {
  const { users } = useSelector((state) => state.usersReducer);
  return (
    <div>
      <DefaultLayout>
        <h1>Home Page</h1>
        <h2>Users length is {users.length}</h2>
      </DefaultLayout>
    </div>
  );
}

export default Home;
