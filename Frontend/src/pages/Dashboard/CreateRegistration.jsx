import React, { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { ArrowBack, Save, PersonAdd } from "@mui/icons-material";

export default function AddRegistration() {
  const navigate = useNavigate();

  const initialValues = {
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
  };

  const [formData, setFormData] = useState(initialValues);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle inputs
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // Handle privacy checkbox
  const handlePrivacyChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      privacyPolicy: event.target.checked,
    }));

    setError("");
    setSuccess("");
  };

  // Validate form
  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "gender",
      "courseLevel",
      "courseType",
      "preferredStartDate",
    ];

    const hasEmptyField = requiredFields.some(
      (field) => !String(formData[field] ?? "").trim(),
    );

    if (hasEmptyField) {
      setError("Please fill in all required fields.");
      return false;
    }

    // English and German Latin letters
    const nameRegex = /^[A-Za-zÄÖÜäöüßẞ\s'-]+$/;

    if (
      !nameRegex.test(formData.firstName.trim()) ||
      formData.firstName.trim().length < 2
    ) {
      setError("First name must contain at least 2 Latin letters.");
      return false;
    }

    if (
      !nameRegex.test(formData.lastName.trim()) ||
      formData.lastName.trim().length < 2
    ) {
      setError("Last name must contain at least 2 Latin letters.");
      return false;
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return false;
    }

    const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;

    if (!phoneRegex.test(formData.phone.trim())) {
      setError("Please enter a valid phone number.");
      return false;
    }

    const allowedStatuses = ["bewerber", "student", "archive"];

    if (!allowedStatuses.includes(formData.status)) {
      setError("Invalid registration status.");
      return false;
    }

    if (!formData.privacyPolicy) {
      setError("You must accept the privacy policy.");
      return false;
    }

    return true;
  };

  // Create registration
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      const payload = {
        ...formData,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        addInfo: formData.addInfo.trim(),
      };

      const response = await api.post("/restfull", payload);

      if (response.data?.success) {
        setSuccess(
          response.data.message || "Registration created successfully.",
        );

        setFormData(initialValues);

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setError(response.data?.message || "Failed to create registration.");
      }
    } catch (error) {
      console.error("Error creating registration:", error);

      setError(
        error.response?.data?.message || "Failed to create registration.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Stack spacing={3}>
        {/* Header */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          spacing={2}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "primary.main",
                color: "primary.contrastText",
              }}
            >
              <PersonAdd />
            </Box>

            <Box>
              <Typography variant="h4" fontWeight={800}>
                Add Registration
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Create a new student registration
              </Typography>
            </Box>
          </Stack>

          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </Button>
        </Stack>

        {/* Messages */}
        {error && (
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" onClose={() => setSuccess("")}>
            {success}
          </Alert>
        )}

        {/* Form */}
        <Card
          elevation={0}
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 4 } }}>
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={4}>
                {/* Personal Information */}
                <Box>
                  <Typography variant="h6" fontWeight={750} gutterBottom>
                    Personal Information
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    Enter the applicant's personal information.
                  </Typography>

                  <Grid container spacing={2.5}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        required
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        required
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        required
                        type="email"
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        required
                        type="tel"
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
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
                    </Grid>
                  </Grid>
                </Box>

                <Divider />

                {/* Course Information */}
                <Box>
                  <Typography variant="h6" fontWeight={750} gutterBottom>
                    Course Information
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    Select the German course for the applicant.
                  </Typography>

                  <Grid container spacing={2.5}>
                    <Grid item xs={12} md={6}>
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
                    </Grid>

                    <Grid item xs={12} md={6}>
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
                          <MenuItem value="private">Private</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        required
                        type="date"
                        label="Preferred Start Date"
                        name="preferredStartDate"
                        value={formData.preferredStartDate}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Divider />

                {/* Status */}
                <Box>
                  <Typography variant="h6" fontWeight={750} gutterBottom>
                    Registration Status
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    Select the initial status of this registration.
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
                  </FormControl>
                </Box>

                <Divider />

                {/* Additional Information */}
                <Box>
                  <Typography variant="h6" fontWeight={750} gutterBottom>
                    Additional Information
                  </Typography>

                  <TextField
                    fullWidth
                    multiline
                    minRows={5}
                    label="Additional Information"
                    name="addInfo"
                    value={formData.addInfo}
                    onChange={handleChange}
                    placeholder="Additional notes..."
                  />
                </Box>

                <Divider />

                {/* Privacy Policy */}
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.privacyPolicy}
                        onChange={handlePrivacyChange}
                      />
                    }
                    label="Privacy Policy accepted"
                  />
                </Box>

                <Divider />

                {/* Actions */}
                <Stack
                  direction={{
                    xs: "column-reverse",
                    sm: "row",
                  }}
                  justifyContent="flex-end"
                  spacing={2}
                >
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    onClick={() => navigate("/dashboard")}
                    disabled={saving}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Save />}
                    disabled={saving}
                  >
                    {saving ? "Creating..." : "Create Registration"}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
