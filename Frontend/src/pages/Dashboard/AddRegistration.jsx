import React, { useState } from "react";

import api from "../../api/axios";

import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { PersonAdd, Save, ArrowBack } from "@mui/icons-material";

export default function AddRegistration() {
  const navigate = useNavigate();

  // *==========================================*
  // *State*
  // *==========================================*

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    courseLevel: "",
    courseType: "",
    preferredStartDate: "",
    addInfo: "",

    // *Default status*
    status: "bewerber",

    // *Privacy Policy*
    privacyPolicy: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // *==========================================*
  // *Handle input changes*
  // *==========================================*

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // *==========================================*
  // *Reset form*
  // *==========================================*

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      courseLevel: "",
      courseType: "",
      preferredStartDate: "",
      addInfo: "",
      status: "bewerber",
      privacyPolicy: false,
    });
  };

  // *==========================================*
  // *Submit form*
  // *==========================================*

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    // *========================================*
    // *Frontend validation*
    // *========================================*

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.gender ||
      !formData.courseLevel ||
      !formData.courseType ||
      !formData.preferredStartDate ||
      !formData.status
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // *========================================*
    // *Validate status*
    // *========================================*

    const allowedStatuses = ["bewerber", "student", "archive"];

    if (!allowedStatuses.includes(formData.status)) {
      setError("Invalid registration status.");
      return;
    }

    try {
      setLoading(true);

      // *======================================*
      // *POST request*
      // *======================================*

      const response = await api.post("/restfull/add", formData);

      console.log("Registration created:", response.data);

      if (response.data?.success) {
        setSuccess(
          response.data.message || "Registration created successfully.",
        );
        setError("");

        resetForm();
      } else {
        setError(response.data?.message || "Failed to create registration.");
        setSuccess("");
      }
    } catch (error) {
      console.error("Error creating registration:", error);

      setError(
        error.response?.data?.message || "Failed to create registration.",
      );
    } finally {
      setLoading(false);
    }
  };

  // *==========================================*
  // *Component*
  // *==========================================*

  return (
    <Box
      sx={{
        width: "100%",
        p: {
          xs: 2,
          md: 4,
        },
      }}
    >
      {/* ======================================
          Header
      ====================================== */}

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        justifyContent="space-between"
        alignItems={{
          xs: "flex-start",
          sm: "center",
        }}
        spacing={2}
        sx={{
          mb: 4,
        }}
      >
        <Box>
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <PersonAdd color="primary" />

            <Typography variant="h4" fontWeight={800}>
              Add Registration
            </Typography>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            Add a new course registration to the database.
          </Typography>
        </Box>

        {/* Back to Dashboard */}

        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </Button>
      </Stack>

      {/* ======================================
          Form
      ====================================== */}

      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={0}
        sx={{
          p: {
            xs: 2,
            md: 4,
          },
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack spacing={3}>
          {/* ==================================
              Personal Information
          ================================== */}

          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              Personal Information
            </Typography>

            <Stack
              direction={{
                xs: "column",
                md: "row",
              }}
              spacing={2}
            >
              <TextField
                fullWidth
                required
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                required
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Stack>
          </Box>

          {/* ==================================
              Contact Information
          ================================== */}

          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              Contact Information
            </Typography>

            <Stack spacing={2}>
              <TextField
                fullWidth
                required
                type="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                required
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>

                <Select
                  name="gender"
                  value={formData.gender}
                  label="Gender"
                  onChange={handleChange}
                >
                  <MenuItem value="male">Male</MenuItem>

                  <MenuItem value="female">Female</MenuItem>

                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Box>

          {/* ==================================
              Course Information
          ================================== */}

          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              Course Information
            </Typography>

            <Stack spacing={2}>
              <FormControl fullWidth required>
                <InputLabel>Course Level</InputLabel>

                <Select
                  name="courseLevel"
                  value={formData.courseLevel}
                  label="Course Level"
                  onChange={handleChange}
                >
                  <MenuItem value="A1">A1</MenuItem>
                  <MenuItem value="A2">A2</MenuItem>
                  <MenuItem value="B1">B1</MenuItem>
                  <MenuItem value="B2">B2</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth required>
                <InputLabel>Course Type</InputLabel>

                <Select
                  name="courseType"
                  value={formData.courseType}
                  label="Course Type"
                  onChange={handleChange}
                >
                  <MenuItem value="regular">Regular</MenuItem>

                  <MenuItem value="intensive">Intensive</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                required
                type="date"
                label="Preferred Start Date"
                name="preferredStartDate"
                value={formData.preferredStartDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Stack>
          </Box>

          {/* ==================================
              Registration Status
          ================================== */}

          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              Registration Status
            </Typography>

            <FormControl fullWidth required>
              <InputLabel>Status</InputLabel>

              <Select
                name="status"
                value={formData.status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value="bewerber">Bewerber</MenuItem>

                <MenuItem value="student">Student</MenuItem>

                <MenuItem value="archive">Archive</MenuItem>
              </Select>

              <FormHelperText>
                Select the current status of the registration.
              </FormHelperText>
            </FormControl>
          </Box>

          {/* ==================================
              Additional Information
          ================================== */}

          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              Additional Information
            </Typography>

            <TextField
              fullWidth
              multiline
              minRows={4}
              label="Additional Information"
              name="addInfo"
              value={formData.addInfo}
              onChange={handleChange}
              placeholder="Additional information..."
            />
          </Box>

          {/* ======================================
          Alerts
      ====================================== */}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* ==================================
              Submit
          ================================== */}

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={2}
            justifyContent="flex-end"
          >
            <Button
              type="button"
              variant="outlined"
              disabled={loading}
              onClick={resetForm}
            >
              Clear
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <Save />
                )
              }
            >
              {loading ? "Saving..." : "Add Registration"}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
