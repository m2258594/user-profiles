import { useEffect, useState } from "react";
import { ZodError } from "zod";
import { useParams } from "@tanstack/react-router";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import { User } from "../validation/userSchema";
import { getUserById } from "../api/client/getUserById";
import { statusLabelMap } from "../constants/statuses";

const UserPage = () => {
  const { id } = useParams({ from: "/user/$id" });
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const loadUser = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getUserById(id);
      setUser(data);
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
    loadUser();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        severity="error"
        action={
          <Button color="inherit" size="small" onClick={loadUser}>
            Повторить
          </Button>
        }>
        {error}
      </Alert>
    );
  }

  if (!user) return null;

  return (
    <Paper sx={{ p: 4, maxWidth: 600, margin: "0 auto" }}>
      <Typography variant="h5" gutterBottom>
        {user.fullName}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography>
        <strong>Телефон:</strong> {user.phone}
      </Typography>
      <Typography>
        <strong>Email:</strong> {user.email}
      </Typography>
      <Typography>
        <strong>Должность:</strong> {user.jobTitle}
      </Typography>
      <Typography>
        <strong>Локация:</strong> {user.location}
      </Typography>
      <Typography>
        <strong>Статус:</strong> {statusLabelMap[user.status]}
      </Typography>
      <Typography>
        <strong>Дата регистрации:</strong>{" "}
        {new Date(user.createdAt).toLocaleDateString("ru-RU")}
      </Typography>
    </Paper>
  );
};

export default UserPage;
