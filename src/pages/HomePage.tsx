import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { ZodError } from "zod";
import FilterPanel from "../components/FilterPanel";
import UserList from "../components/UserList";
import Loader from "../components/Loader";
import ErrorAlert from "../components/ErrorAlert";
import { useFilterStore } from "../store/useFilterStore";
import { getAllUsers } from "../api/client/getAllUsers";
import { UserPreview } from "../validation/userSchema";

const HomePage = () => {
  const filter = useFilterStore((state) => state.filter);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [users, setUsers] = useState<UserPreview[]>([]);

  const loadUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      if (err instanceof ZodError) {
        setError("Ошибка валидации данных");
      } else {
        setError((err as Error).message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorAlert message={error} onRetry={loadUsers} />;

  return (
    <Box>
      <Typography variant="h4" align="center" marginBottom={3}>
        Список пользователей
      </Typography>
      <FilterPanel />
      <UserList
        users={
          !filter ? users : users?.filter((user) => user.status === filter)
        }
      />
    </Box>
  );
};

export default HomePage;
