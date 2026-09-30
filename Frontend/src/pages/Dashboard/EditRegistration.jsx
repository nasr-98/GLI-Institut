import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
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

import { ArrowBack, Save, Person, Delete } from "@mui/icons-material";

export default function EditRegistration() {
  const { id } = useParams();
  const navigate = useNavigate();

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
    status: "bewerber",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /*
   * Fetch registration
   */
  useEffect(() => {
    const fetchRegistration = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/restfull/${id}`);

        if (!response.data?.success) {
          setError(response.data?.message || "Failed to load registration.");
          return;
        }

        const registration = response.data.data;

        setFormData({
          firstName: registration.first_name || "",
          lastName: registration.last_name || "",
          email: registration.email || "",
          phone: registration.phone || "",
          gender: registration.gender || "",
          courseLevel: registration.course_level || "",
          courseType: registration.course_type || "",
          preferredStartDate: registration.preferred_start_date || "",
          addInfo: registration.addInfo || "",
          status: registration.status || "bewerber",
        });
      } catch (error) {
        console.error("Error fetching registration:", error);

        setError(
          error.response?.data?.message || "Failed to load registration.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRegistration();
    }
  }, [id]);

  /*
   * Handle normal inputs
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  /*
   * Validate form
   */
  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.gender ||
      !formData.courseLevel ||
      !formData.courseType ||
      !formData.preferredStartDate
    ) {
      setError("Please fill in all required fields.");

      return false;
    }

    const allowedStatuses = ["bewerber", "student", "archive"];

    if (!allowedStatuses.includes(formData.status)) {
      setError("Invalid registration status.");

      return false;
    }

    return true;
  };

  /*
   * Save changes
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      const response = await api.put(`/restfull/${id}`, formData);

      if (response.data?.success) {
        setSuccess(
          response.data.message || "Registration updated successfully.",
        );

        /*
         * Go back to view page after successful update
         */
        setTimeout(() => {
          navigate(`/dashboard`);
        }, 800);
      } else {
        setError(response.data?.message || "Failed to update registration.");
      }
    } catch (error) {
      console.error("Error updating registration:", error);

      setError(
        error.response?.data?.message || "Failed to update registration.",
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * Delete registration
   */
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this registration?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      const response = await api.delete(`/restfull/${id}`);

      if (response.data?.success) {
        navigate("/dashboard");
      } else {
        setError(response.data?.message || "Failed to delete registration.");
      }
    } catch (error) {
      console.error("Error deleting registration:", error);

      setError(
        error.response?.data?.message || "Failed to delete registration.",
      );
    } finally {
      setDeleting(false);
    }
  };

  /*
   * Loading
   */
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack alignItems="center" spacing={2}>
          <CircularProgress />

          <Typography color="text.secondary">
            Loading registration...
          </Typography>
        </Stack>
      </Box>
    );
  }

  /*
   * Error
   */
  if (error && !formData.firstName) {
    return (
      <Box sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(`/registrations/view/${id}`)}
            sx={{
              alignSelf: "flex-start",
            }}
          >
            Back
          </Button>

          <Alert severity="error">{error}</Alert>
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Stack spacing={3}>
        {/* Header */}
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          justifyContent="space-between"
          alignItems={{
            xs: "stretch",
            sm: "center",
          }}
          spacing={2}
        >
          <Box>
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
                <Person />
              </Box>

              <Box>
                <Typography variant="h4" fontWeight={800}>
                  Edit Registration
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Update registration information
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate(`/dashboard`)}
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
          <CardContent
            sx={{
              p: { xs: 2, md: 4 },
            }}
          >
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
                    Update the student's personal information.
                  </Typography>

                  <Grid container spacing={2.5}>
                    {/* First Name */}
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

                    {/* Last Name */}
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

                    {/* Email */}
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

                    {/* Phone */}
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        required
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </Grid>

                    {/* Gender */}
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
                    Update the selected German course.
                  </Typography>

                  <Grid container spacing={2.5}>
                    {/* Course Level */}
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

                    {/* Course Type */}
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
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Preferred Start Date */}
                    <Grid item xs={12} md={6}>
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
                    Change the current status of this registration.
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
                    onClick={() => navigate(`/registrations/view/${id}`)}
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
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<Delete />}
                    onClick={handleDelete}
                    disabled={deleting}
                  >
                    {deleting ? "Deleting..." : "Delete"}
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
