import React from "react";
import { List, Typography } from "@mui/material";
import { UserCard } from "./UserCard";
import { UserPreview } from "../validation/userSchema";

const UserList: React.FC<UserListProps> = ({ users }) => (
  <>
    {!users.length ? (
      <Typography>Пользователи не найдены</Typography>
    ) : (
      <List>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </List>
    )}
  </>
);

export default UserList;

interface UserListProps {
  users: UserPreview[];
}
