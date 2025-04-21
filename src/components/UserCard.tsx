import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";
import { Link } from "@tanstack/react-router";
import { UserPreview } from "../validation/userSchema";
import { statusLabelMap, UserStatusType } from "../constants/statuses";

export const UserCard = ({ user }: Props) => {
  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}>
          <Typography variant="h6">{user.fullName}</Typography>
          <Chip
            label={statusLabelMap[user.status]}
            color={statusColorMap[user.status]}
          />
        </Box>

        <Typography variant="body2">{user.phone}</Typography>

        <Box mt={2}>
          <Button variant="contained" component={Link} to={`/user/${user.id}`}>
            Подробнее
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

interface Props {
  user: UserPreview;
}

const statusColorMap: Record<UserStatusType, "success" | "warning" | "error"> =
  {
    active: "success",
    inactive: "warning",
    deleted: "error",
  };
