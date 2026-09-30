import React, { useState } from "react";

import api from "../api/axios";

import { useNavigate } from "react-router-dom";

import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";

import {
  PersonOutline,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

export default function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage({
      type: "",
      text: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage({
      type: "",
      text: "",
    });

    if (!values.username.trim() || !values.password) {
      setMessage({
        type: "error",
        text: "Please enter your username and password.",
      });

      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/login", {
        username: values.username.trim(),
        password: values.password,
      });

      if (response.data?.success) {
        setMessage({
          type: "success",
          text: response.data.message || "Login successful!",
        });

        setValues({
          username: "",
          password: "",
        });

        // Go to Dashboard after successful login
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 500);
      } else {
        setMessage({
          type: "error",
          text: response.data?.message || "Login failed.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);

      setMessage({
        type: "error",
        text:
          error.response?.data?.message || "Login failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        px: 2,
        py: 4,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
        }}
      >
        <Stack spacing={3}>
          <Box textAlign="center">
            <Box
              sx={{
                width: 64,
                height: 64,
                mx: "auto",
                mb: 2,
                borderRadius: 3,
                bgcolor: "primary.main",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LockOutlined sx={{ fontSize: 32 }} />
            </Box>

            <Typography variant="h4" fontWeight={800}>
              Welcome Back
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Sign in to your account
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={values.username}
                onChange={handleChange}
                autoComplete="username"
                required
                placeholder="Enter your username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined />
                    </InputAdornment>
                  ),

                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.4,
                  borderRadius: 2,
                  fontWeight: 700,
                  textTransform: "none",
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>

              {message.text && (
                <Alert severity={message.type}>{message.text}</Alert>
              )}
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
