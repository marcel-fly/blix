import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";

const advancedSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
  serverAddress: z.string().url("Invalid URL").optional(),
  serverPath: z
    .string()
    .regex(/^[\w\/]+$/, "Invalid server path")
    .optional(),
  port: z.preprocess(
    (arg) => Number(arg),
    z
      .number()
      .min(1024, "Port must be at least 1024")
      .max(65535, "Port must be less than 65536")
      .optional()
  ),
  useSSL: z.boolean().optional(),
});

const manualSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export default function AccountForm() {
  const [accountType, setAccountType] = React.useState("Advanced");
  const {
    control: advancedControl,
    handleSubmit: handleAdvancedSubmit,
    formState: { errors: advancedErrors },
  } = useForm({
    resolver: zodResolver(advancedSchema),
    defaultValues: {
      username: "",
      password: "",
      serverAddress: "",
      serverPath: "",
      port: "",
      useSSL: false,
    },
  });

  const {
    control: manualControl,
    handleSubmit: handleManualSubmit,
    formState: { errors: manualErrors },
  } = useForm({
    resolver: zodResolver(manualSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Box sx={{ mt: 1 }}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="account-type-label">Account Type</InputLabel>
        <Select
          labelId="account-type-label"
          value={accountType}
          label="Account Type"
          onChange={(event) => setAccountType(event.target.value)}
        >
          <MenuItem value="Advanced">Advanced</MenuItem>
          <MenuItem value="Manual">Manual</MenuItem>
        </Select>
      </FormControl>

      {accountType === "Advanced" && (
        <form
          onSubmit={handleAdvancedSubmit((data) => alert(JSON.stringify(data)))}
        >
          <Controller
            name="username"
            control={advancedControl}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                label="User Name"
                error={!!advancedErrors.username}
                helperText={advancedErrors.username?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={advancedControl}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                error={!!advancedErrors.password}
                helperText={advancedErrors.password?.message}
              />
            )}
          />
          <Controller
            name="serverAddress"
            control={advancedControl}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                label="Server Address"
                error={!!advancedErrors.serverAddress}
                helperText={advancedErrors.serverAddress?.message}
              />
            )}
          />
          <Controller
            name="serverPath"
            control={advancedControl}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                label="Server Path"
                error={!!advancedErrors.serverPath}
                helperText={advancedErrors.serverPath?.message}
              />
            )}
          />
          <Controller
            name="port"
            control={advancedControl}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                label="Port"
                type="number"
                InputProps={{ inputProps: { min: 1024, max: 65535 } }}
                error={!!advancedErrors.port}
                helperText={advancedErrors.port?.message}
              />
            )}
          />
          <Controller
            name="useSSL"
            control={advancedControl}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} />}
                label="Use SSL"
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit Advanced
          </Button>
        </form>
      )}

      {accountType === "Manual" && (
        <form
          onSubmit={handleManualSubmit((data) => alert(JSON.stringify(data)))}
        >
          <Controller
            name="username"
            control={manualControl}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                label="User Name"
                error={!!manualErrors.username}
                helperText={manualErrors.username?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={manualControl}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                error={!!manualErrors.password}
                helperText={manualErrors.password?.message}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit Manual
          </Button>
        </form>
      )}
    </Box>
  );
}
