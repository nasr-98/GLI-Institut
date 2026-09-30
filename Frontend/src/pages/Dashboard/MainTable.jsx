import React, { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Stack,
  Typography,
  Button,
  TextField,
  IconButton,
  Tooltip,
  Chip,
  InputAdornment,
  CircularProgress,
} from "@mui/material";

import {
  Refresh,
  Edit,
  Delete,
  Visibility,
  Search,
  Logout,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import api from "../../api/axios";

export default function Registrations() {
  const navigate = useNavigate();

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  /*
   * ============================================================
   * Fetch all registrations
   * ============================================================
   */
  const fetchRegistrations = async () => {
    try {
      setLoading(true);

      const response = await api.get("/restfull");

      setRegistrations(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  /*
   * ============================================================
   * Search registrations
   * ============================================================
   */
  const handleSearch = async (keyword) => {
    setSearch(keyword);

    if (!keyword.trim()) {
      fetchRegistrations();
      return;
    }

    try {
      setLoading(true);

      const response = await api.get("/restfull/search", {
        params: {
          q: keyword,
        },
      });

      setRegistrations(response.data?.data || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  /*
   * ============================================================
   * Delete registration
   * ============================================================
   */
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this registration?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/restfull/${id}`);

      fetchRegistrations();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  /*
   * ============================================================
   * Edit registration
   * ============================================================
   */
  const handleEdit = (id) => {
    navigate(`/dashboard/edit/${id}`);
  };

  /*
   * ============================================================
   * View registration
   * ============================================================
   */
  const handleView = (id) => {
    navigate(`/dashboard/view/${id}`);
  };

  /*
   * ============================================================
   * Logout
   * ============================================================
   */
  const handleLogout = async () => {
    try {
      await api.get("/login/out");

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Logout error:", error);

      /*
       * Even if the logout request fails,
       * send the user back to the login page.
       */
      navigate("/login", {
        replace: true,
      });
    }
  };

  /*
   * ============================================================
   * Initial load
   * ============================================================
   */
  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <Box
      sx={{
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >
      {/* ======================================================
          Header
      ====================================================== */}
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
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{
              mb: 0.5,
            }}
          >
            Control Panel
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Manage registrations
          </Typography>
        </Box>

        {/* Logout button */}
        <Button
          variant="outlined"
          color="error"
          startIcon={<Logout />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Stack>

      {/* ======================================================
          Search + Actions
      ====================================================== */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
          alignItems={{
            xs: "stretch",
            sm: "center",
          }}
        >
          <TextField
            fullWidth
            size="small"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by first name or last name..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={fetchRegistrations}
            disabled={loading}
            sx={{
              minWidth: {
                xs: "100%",
                sm: 120,
              },
            }}
          >
            Refresh
          </Button>

          <Button
            variant="contained"
            onClick={() => navigate("/dashboard/add")}
            sx={{
              minWidth: {
                xs: "100%",
                sm: 120,
              },
            }}
          >
            Add
          </Button>
        </Stack>
      </Paper>

      {/* ======================================================
          Total registrations
      ====================================================== */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Total registrations: <strong>{registrations.length}</strong>
        </Typography>
      </Box>

      {/* ======================================================
          Loading
      ====================================================== */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 8,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        /* ====================================================
           Table
        ==================================================== */
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              width: "100%",
              overflowX: "auto",
            }}
          >
            <Box
              component="table"
              sx={{
                width: "100%",
                minWidth: 900,
                borderCollapse: "collapse",

                "& th": {
                  textAlign: "left",
                  fontWeight: 700,
                  padding: "14px 16px",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  whiteSpace: "nowrap",
                },

                "& td": {
                  padding: "14px 16px",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  whiteSpace: "nowrap",
                },

                "& tbody tr:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Course</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {registrations.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        textAlign: "center",
                        padding: "40px",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        No registrations found.
                      </Typography>
                    </td>
                  </tr>
                ) : (
                  registrations.map((registration) => (
                    <tr key={registration.id}>
                      {/* Name */}
                      <td>
                        <Typography fontWeight={600}>
                          {registration.first_name} {registration.last_name}
                        </Typography>
                      </td>

                      {/* Email */}
                      <td>{registration.email}</td>

                      {/* Phone */}
                      <td>{registration.phone || "-"}</td>

                      {/* Course */}
                      <td>{registration.course_level || "-"}</td>

                      {/* Status */}
                      <td>
                        <Chip
                          label={registration.status || "bewerber"}
                          size="small"
                          color={
                            registration.status === "student"
                              ? "success"
                              : registration.status === "archive"
                                ? "default"
                                : "warning"
                          }
                        />
                      </td>

                      {/* Created */}
                      <td>
                        {registration.created_at
                          ? new Date(
                              registration.created_at,
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                      {/* Actions */}
                      <td>
                        <Stack direction="row" spacing={0.5}>
                          <Tooltip title="View">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleView(registration.id)}
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Edit">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleEdit(registration.id)}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(registration.id)}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
