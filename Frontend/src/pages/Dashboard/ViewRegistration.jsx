import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  ArrowBack,
  Delete,
  Edit,
  Email,
  Phone,
  Person,
  School,
  CalendarMonth,
  Badge,
  Wc,
  Info,
} from "@mui/icons-material";

export default function ViewRegistration() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  /*
   * Fetch registration by UUID
   */
  useEffect(() => {
    const fetchRegistration = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/restfull/${id}`);

        if (response.data?.success) {
          setRegistration(response.data.data);
        } else {
          setError(response.data?.message || "Failed to load registration.");
        }
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

  // *==========================================*
  // *Edit registration*
  // *==========================================*

  const handleEdit = (id) => {
    console.log("Edit registration:", id);

    // Navigate to the edit route
    window.location.href = `/dashboard/edit/${id}`;
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
   * Error / Not found
   */
  if (error || !registration) {
    return (
      <Box sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate("/dashboard")}
            sx={{ alignSelf: "flex-start" }}
          >
            Back to registrations
          </Button>

          <Alert severity="error">{error || "Registration not found."}</Alert>
        </Stack>
      </Box>
    );
  }

  /*
   * Status chip
   */
  const renderStatus = (status) => {
    switch (status) {
      case "bewerber":
        return <Chip label="Bewerber" color="warning" size="small" />;

      case "student":
        return <Chip label="Student" color="success" size="small" />;

      case "archive":
        return <Chip label="Archive" color="default" size="small" />;

      default:
        return (
          <Chip label={status || "Unknown"} variant="outlined" size="small" />
        );
    }
  };

  /*
   * Privacy policy chip
   */
  const renderPrivacy = (value) => {
    return value === 1 ? (
      <Chip label="Accepted" color="success" size="small" />
    ) : (
      <Chip label="Not accepted" color="error" size="small" />
    );
  };

  /*
   * Information item
   */
  const InfoItem = ({ icon, label, value }) => {
    return (
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "primary.main",
            color: "primary.contrastText",
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography variant="caption" color="text.secondary" display="block">
            {label}
          </Typography>

          <Typography
            variant="body1"
            fontWeight={600}
            sx={{
              wordBreak: "break-word",
            }}
          >
            {value || "—"}
          </Typography>
        </Box>
      </Stack>
    );
  };

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
            <Typography variant="h4" fontWeight={800} gutterBottom>
              Registration Details
            </Typography>

            <Typography variant="body2" color="text.secondary">
              View registration information
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate(`/dashboard`)}
            >
              Back
            </Button>

            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={() => handleEdit(registration.id)}
            >
              Edit
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

        {error && <Alert severity="error">{error}</Alert>}

        {/* Registration overview */}
        <Card
          elevation={0}
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 4 } }}>
            <Stack spacing={3}>
              {/* Name / Status */}
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
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Person fontSize="large" />
                  </Box>

                  <Box>
                    <Typography variant="h5" fontWeight={800}>
                      {registration.first_name} {registration.last_name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Registration
                    </Typography>
                  </Box>
                </Stack>

                {renderStatus(registration.status)}
              </Stack>

              <Divider />

              {/* Personal Information */}
              <Box>
                <Typography variant="h6" fontWeight={750} gutterBottom>
                  Personal Information
                </Typography>

                <Grid container spacing={3} sx={{ mt: 0.5 }}>
                  <Grid item xs={12} md={6}>
                    <InfoItem
                      icon={<Person />}
                      label="First Name"
                      value={registration.first_name}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <InfoItem
                      icon={<Person />}
                      label="Last Name"
                      value={registration.last_name}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <InfoItem
                      icon={<Email />}
                      label="Email"
                      value={registration.email}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <InfoItem
                      icon={<Phone />}
                      label="Phone"
                      value={registration.phone}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <InfoItem
                      icon={<Wc />}
                      label="Gender"
                      value={registration.gender}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* Course Information */}
              <Box>
                <Typography variant="h6" fontWeight={750} gutterBottom>
                  Course Information
                </Typography>

                <Grid container spacing={3} sx={{ mt: 0.5 }}>
                  <Grid item xs={12} md={6}>
                    <InfoItem
                      icon={<School />}
                      label="Course Level"
                      value={registration.course_level}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <InfoItem
                      icon={<School />}
                      label="Course Type"
                      value={registration.course_type}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <InfoItem
                      icon={<CalendarMonth />}
                      label="Preferred Start Date"
                      value={registration.preferred_start_date}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* Registration Information */}
              <Box>
                <Typography variant="h6" fontWeight={750} gutterBottom>
                  Registration Information
                </Typography>

                <Grid container spacing={3} sx={{ mt: 0.5 }}>
                  <Grid item xs={12} md={6}>
                    <InfoItem
                      icon={<Badge />}
                      label="Registration ID"
                      value={registration.id}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <InfoItem
                      icon={<CalendarMonth />}
                      label="Created At"
                      value={registration.created_at}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <InfoItem
                      icon={<Badge />}
                      label="Status"
                      value={registration.status}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "primary.main",
                          color: "primary.contrastText",
                          flexShrink: 0,
                        }}
                      >
                        <Info />
                      </Box>

                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                        >
                          Privacy Policy
                        </Typography>

                        {renderPrivacy(registration.privacy_policy)}
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* Additional Information */}
              <Box>
                <Typography variant="h6" fontWeight={750} gutterBottom>
                  Additional Information
                </Typography>

                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "background.default",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {registration.addInfo ||
                      "No additional information provided."}
                  </Typography>
                </Paper>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
