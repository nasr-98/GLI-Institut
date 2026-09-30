import axios from "axios";

import React, { useEffect, useState } from "react";

import {
  Alert,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import content from "../data/content";
import PageShell from "../components/PageShell";

export default function Registration({ lang }) {
  const t = content[lang];

  // --------------------------------------------------
  // Initial form values
  // --------------------------------------------------

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
    privacyPolicy: false,
  };

  // --------------------------------------------------
  // States
  // --------------------------------------------------

  const [sent, setSent] = useState(false);

  const [serverError, setServerError] = useState("");

  const [values, setValues] = useState(initialValues);

  const [errors, setErrors] = useState({});

  // --------------------------------------------------
  // Validation functions
  // --------------------------------------------------

  const validateName = (name) => {
    const nameRegex = /^[A-Za-zÄÖÜäöüßẞÀ-ÖØ-öø-ÿ\s'-]+$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    /*
      Allows:

      +49 151 12345678
      0151 12345678
      +4915112345678
      0151-12345678
      (0151) 12345678
    */

    const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;

    return phoneRegex.test(phone);
  };

  // --------------------------------------------------
  // Validate all form fields
  // --------------------------------------------------

  const validateForm = (formValues = values) => {
    const newErrors = {};

    // *First Name*
    if (!formValues.firstName.trim()) {
      newErrors.firstName = t.requiredField || "This field is required.";
    } else if (formValues.firstName.trim().length < 2) {
      newErrors.firstName =
        t.firstNameInvalid || "First name must contain at least 2 characters.";
    } else if (!validateName(formValues.firstName.trim())) {
      newErrors.firstName =
        t.firstNameInvalid || "First name may contain Latin letters only.";
    }

    // *Last Name*
    if (!formValues.lastName.trim()) {
      newErrors.lastName = t.requiredField || "This field is required.";
    } else if (formValues.lastName.trim().length < 2) {
      newErrors.lastName =
        t.lastNameInvalid || "Last name must contain at least 2 characters.";
    } else if (!validateName(formValues.lastName.trim())) {
      newErrors.lastName =
        t.lastNameInvalid || "Last name may contain Latin letters only.";
    }

    // Email
    if (!formValues.email.trim()) {
      newErrors.email = t.requiredField || "This field is required.";
    } else if (!validateEmail(formValues.email.trim())) {
      newErrors.email = t.invalidEmail || "Please enter a valid email address.";
    }

    // Phone
    if (!formValues.phone.trim()) {
      newErrors.phone = t.requiredField || "This field is required.";
    } else if (!validatePhone(formValues.phone.trim())) {
      newErrors.phone = t.invalidPhone || "Please enter a valid phone number.";
    }

    // Gender
    if (!formValues.gender) {
      newErrors.gender = t.requiredField || "This field is required.";
    }

    // Course Level
    if (!formValues.courseLevel) {
      newErrors.courseLevel = t.requiredField || "This field is required.";
    }

    // Course Type
    if (!formValues.courseType) {
      newErrors.courseType = t.requiredField || "This field is required.";
    }

    // Preferred Start Date
    if (!formValues.preferredStartDate) {
      newErrors.preferredStartDate =
        t.requiredField || "This field is required.";
    }

    // Privacy Policy
    if (!formValues.privacyPolicy) {
      newErrors.privacyPolicy =
        t.privacyPolicyError || "You must accept the privacy policy.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // --------------------------------------------------
  // useEffect
  // Validate fields whenever values change
  // --------------------------------------------------

  useEffect(() => {
    const newErrors = {};

    // *First Name*
    if (values.firstName) {
      const firstName = values.firstName.trim();

      if (firstName.length < 2) {
        newErrors.firstName =
          t.firstNameInvalid ||
          "First name must contain at least 2 characters.";
      } else if (!validateName(firstName)) {
        newErrors.firstName =
          t.firstNameInvalid || "First name may contain Latin letters only.";
      }
    }

    // *Last Name*
    if (values.lastName) {
      const lastName = values.lastName.trim();

      if (lastName.length < 2) {
        newErrors.lastName =
          t.lastNameInvalid || "Last name must contain at least 2 characters.";
      } else if (!validateName(lastName)) {
        newErrors.lastName =
          t.lastNameInvalid || "Last name may contain Latin letters only.";
      }
    }

    // Email
    if (values.email && !validateEmail(values.email.trim())) {
      newErrors.email = t.invalidEmail || "Please enter a valid email address.";
    }

    // Phone
    if (values.phone && !validatePhone(values.phone.trim())) {
      newErrors.phone = t.invalidPhone || "Please enter a valid phone number.";
    }

    /*
      Replace the errors instead of merging them.

      This is important when the form is cleared after
      successful submission.
    */

    setErrors(newErrors);
  }, [values, t]);

  // --------------------------------------------------
  // Handle every change in the form
  // --------------------------------------------------

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;

    // Update form values
    setValues((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error for current field
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    // Clear server error
    setServerError("");

    // Hide success message while editing
    setSent(false);
  };

  // --------------------------------------------------
  // Send form data to backend
  // --------------------------------------------------

  const fetchSendEmail = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/sendRegistration`,
        values,
      );

      // Show success message
      setSent(true);

      // Remove server error
      setServerError("");

      // Return true to handleSubmit
      return true;
    } catch (error) {
      console.error("Error sending data:", error);

      // Hide success message
      setSent(false);

      // Show server error
      setServerError("error");

      // Return false to handleSubmit
      return false;
    }
  };

  // --------------------------------------------------
  // Submit form
  // --------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate entire form
    const isValid = validateForm();

    // Stop if form is invalid
    if (!isValid) {
      // Find first error
      const firstError = document.querySelector(".Mui-error");

      // Scroll to first error
      if (firstError) {
        firstError.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      return;
    }

    // Send data to backend
    const success = await fetchSendEmail();

    // --------------------------------------------------
    // Clear form ONLY after successful submission
    // --------------------------------------------------

    if (success) {
      setValues({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        courseLevel: "",
        courseType: "",
        preferredStartDate: "",
        addInfo: "",
        privacyPolicy: false,
      });

      // Clear validation errors
      setErrors({});
    }
  };

  // --------------------------------------------------
  // JSX
  // --------------------------------------------------

  return (
    <PageShell title={t.register} subtitle={t.registerText}>
      <Card component="form" onSubmit={handleSubmit}>
        <CardContent
          sx={{
            p: { xs: 3, md: 5 },
            maxWidth: 760,
            width: "100%",
          }}
        >
          {/* ----------------------------------------
              Success message
          ----------------------------------------- */}

          <Stack spacing={2.5}>
            {/* ----------------------------------------
                First Name
            ----------------------------------------- */}

            <TextField
              required
              fullWidth
              name="firstName"
              label={t.firstName}
              value={values.firstName}
              onChange={handleChange}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
            />

            {/* ----------------------------------------
                Last Name
            ----------------------------------------- */}

            <TextField
              required
              fullWidth
              name="lastName"
              label={t.lastName}
              value={values.lastName}
              onChange={handleChange}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
            />

            {/* ----------------------------------------
                Email
            ----------------------------------------- */}

            <TextField
              required
              fullWidth
              name="email"
              type="email"
              label={t.email}
              value={values.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />

            {/* ----------------------------------------
                Phone
            ----------------------------------------- */}

            <TextField
              required
              fullWidth
              name="phone"
              type="tel"
              label={t.phone}
              value={values.phone}
              onChange={handleChange}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
            />

            {/* ----------------------------------------
                Gender
            ----------------------------------------- */}

            <FormControl required fullWidth error={Boolean(errors.gender)}>
              <InputLabel>{t.gender}</InputLabel>

              <Select
                name="gender"
                label={t.gender}
                value={values.gender}
                onChange={handleChange}
              >
                <MenuItem value="male">{t.male}</MenuItem>

                <MenuItem value="female">{t.female}</MenuItem>

                <MenuItem value="other">{t.other}</MenuItem>
              </Select>

              {errors.gender && (
                <FormHelperText>{errors.gender}</FormHelperText>
              )}
            </FormControl>

            {/* ----------------------------------------
                Course Level
            ----------------------------------------- */}

            <FormControl required fullWidth error={Boolean(errors.courseLevel)}>
              <InputLabel>{t.courseLevel}</InputLabel>

              <Select
                name="courseLevel"
                label={t.courseLevel}
                value={values.courseLevel}
                onChange={handleChange}
              >
                <MenuItem value="A1">A1</MenuItem>

                <MenuItem value="A2">A2</MenuItem>

                <MenuItem value="B1">B1</MenuItem>

                <MenuItem value="B2">B2</MenuItem>
                <MenuItem value="C1">C1</MenuItem>
              </Select>

              {errors.courseLevel && (
                <FormHelperText>{errors.courseLevel}</FormHelperText>
              )}
            </FormControl>

            {/* ----------------------------------------
                Course Type
            ----------------------------------------- */}

            <FormControl required fullWidth error={Boolean(errors.courseType)}>
              <InputLabel>{t.courseType}</InputLabel>

              <Select
                name="courseType"
                label={t.courseType}
                value={values.courseType}
                onChange={handleChange}
              >
                <MenuItem value="regular">{t.regularCourse}</MenuItem>

                <MenuItem value="intensive">{t.intensiveCourse}</MenuItem>
              </Select>

              {errors.courseType && (
                <FormHelperText>{errors.courseType}</FormHelperText>
              )}
            </FormControl>

            {/* ----------------------------------------
                Preferred Start Date
            ----------------------------------------- */}

            <TextField
              required
              fullWidth
              name="preferredStartDate"
              type="date"
              label={t.preferredStartDate}
              value={values.preferredStartDate}
              onChange={handleChange}
              error={Boolean(errors.preferredStartDate)}
              helperText={errors.preferredStartDate}
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* ----------------------------------------
                Additional Information
            ----------------------------------------- */}

            <TextField
              fullWidth
              name="addInfo"
              multiline
              rows={5}
              label={t.addInfo}
              value={values.addInfo}
              onChange={handleChange}
            />

            {/* ----------------------------------------
                Privacy Policy
            ----------------------------------------- */}

            <FormControl required error={Boolean(errors.privacyPolicy)}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="privacyPolicy"
                    checked={values.privacyPolicy}
                    onChange={handleChange}
                  />
                }
                label={t.privacyPolicyAgreement}
              />

              {errors.privacyPolicy && (
                <FormHelperText>{errors.privacyPolicy}</FormHelperText>
              )}
            </FormControl>

            {sent && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {t.success}
              </Alert>
            )}

            {/* ----------------------------------------
              Server error message
          ----------------------------------------- */}

            {serverError === "error" && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {t.formError}
              </Alert>
            )}

            {/* ----------------------------------------
                Submit Button
            ----------------------------------------- */}

            <Button type="submit" variant="contained" size="large">
              {t.submitRegistration}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </PageShell>
  );
}
