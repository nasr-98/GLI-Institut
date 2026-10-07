import React, { useMemo, useState } from "react";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { Box, CssBaseline, ThemeProvider } from "@mui/material";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { createAppTheme } from "./theme/theme";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Prices from "./pages/Prices";
import Contact from "./pages/Contact";
import Registration from "./pages/Registration";
import LegalPage from "./pages/LegalPage";
import About from "./pages/About";
import Course from "./pages/Course";
import TestDeinDeutsch from "./pages/TestDeinDeutsch";

import Impressum from "./pages/legal/Impressum";
import Datenschutz from "./pages/legal/Datenschutz";
import AGB from "./pages/legal/AGB";

import ProtectedRoute from "./components/ProtectedRoute";
import Registrations from "./pages/Dashboard/MainTable";
import AddRegistration from "./pages/Dashboard/AddRegistration";
import EditRegistration from "./pages/Dashboard/EditRegistration";
import ViewRegistration from "./pages/Dashboard/ViewRegistration";
import CreateRegistration from "./pages/Dashboard/CreateRegistration";

import NotFound from "./pages/NotFound";

import Login from "./pages/Login";

import "./styles.css";

function AppContent() {
  const [mode, setMode] = useState("light");
  const [lang, setLang] = useState("en");

  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");

  /*
   * Determine direction from current language.
   *
   * Arabic -> RTL
   * English -> LTR
   * German -> LTR
   */
  const direction = lang === "ar" ? "rtl" : "ltr";

  /*
   * Create Emotion cache according to direction.
   */
  const emotionCache = useMemo(() => {
    if (direction === "rtl") {
      return createCache({
        key: "mui-rtl",
        stylisPlugins: [prefixer, rtlPlugin],
      });
    }

    return createCache({
      key: "mui-ltr",
      stylisPlugins: [prefixer],
    });
  }, [direction]);

  /*
   * MUI Theme
   */
  const theme = useMemo(
    () => createAppTheme(mode, direction),
    [mode, direction],
  );

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <ScrollToTop />

        <Box
          dir={direction}
          sx={{
            minHeight: "100vh",
            width: "100%",
          }}
        >
          {/* Header is hidden on Dashboard */}
          {!isDashboard && (
            <Header
              lang={lang}
              setLang={setLang}
              mode={mode}
              setMode={setMode}
            />
          )}

          <Routes>
            {/* ========================= */}
            {/* Public Website Routes     */}
            {/* ========================= */}

            <Route path="/" element={<Home lang={lang} />} />

            <Route path="/about" element={<About lang={lang} />} />

            <Route path="/courses" element={<Courses lang={lang} />} />

            <Route path="/course/:id" element={<Course lang={lang} />} />

            <Route path="/prices" element={<Prices lang={lang} />} />

            <Route path="/contact" element={<Contact lang={lang} />} />

            <Route path="/register" element={<Registration lang={lang} />} />

            <Route
              path="/testDeinDeutsch"
              element={<TestDeinDeutsch lang={lang} />}
            />

            {/* ========================= */}
            {/* Dashboard Login            */}
            {/* ========================= */}

            <Route path="/login" element={<Login />} />

            {/* ========================= */}
            {/* Protected Dashboard Routes */}
            {/* ========================= */}

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Registrations />} />

              <Route
                path="/dashboard/create"
                element={<CreateRegistration />}
              />
              <Route path="/dashboard/add" element={<AddRegistration />} />

              <Route
                path="/dashboard/edit/:id"
                element={<EditRegistration />}
              />

              <Route
                path="/dashboard/view/:id"
                element={<ViewRegistration />}
              />
            </Route>

            {/* ========================= */}
            {/* Legal Pages                */}
            {/* ========================= */}

            <Route path="/impressum" element={<Impressum lang={lang} />} />

            <Route path="/datenschutz" element={<Datenschutz lang={lang} />} />

            <Route path="/agb" element={<AGB lang={lang} />} />

            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Footer is hidden on Dashboard */}
          {!isDashboard && <Footer lang={lang} />}
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
