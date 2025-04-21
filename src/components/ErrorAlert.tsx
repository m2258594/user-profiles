import { Alert, AlertTitle, Button, Box } from "@mui/material";

const ErrorAlert = ({ message, onRetry }: ErrorAlertProps) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh">
    <Alert
      severity="error"
      action={
        <Button color="inherit" size="small" onClick={onRetry}>
          Повторить
        </Button>
      }>
      <AlertTitle>Ошибка</AlertTitle>
      {message}
    </Alert>
  </Box>
);

export default ErrorAlert;

interface ErrorAlertProps {
  message: string;
  onRetry: () => void;
}
