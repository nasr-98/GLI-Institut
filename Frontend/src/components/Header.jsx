import React, { useState } from "react";

import { Link, useLocation } from "react-router-dom";

import {
  AppBar,
  Box,
  Button,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";

import {
  Menu as MenuIcon,
  DarkMode,
  LightMode,
  ExpandMore,
} from "@mui/icons-material";

import content from "../data/content";

export default function Header({ lang, setLang, mode, setMode }) {
  const t = content[lang];
  const [mobile, setMobile] = useState(false);
  const [courseAnchor, setCourseAnchor] = useState(null);
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:900px)");
  const links = [
    ["/", t.home],
    ["/about", t.nav.about],
    ["/courses", t.nav.courses],
    ["/prices", t.nav.prices],
    ["/", t.nav.test],
    ["/contact", t.nav.contact],
  ];

  const go = (path) => {
    setMobile(false);
    if (path.startsWith("/#")) {
      window.location.href = path;
    }
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(128,145,170,.15)",
      }}
    >
      <Toolbar sx={{ minHeight: 78, gap: 2 }}>
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
            minWidth: 210,
          }}
        >
          <Box
            component="img"
            src="/logo.png"
            alt="German Language Institute logo"
            sx={{ width: 80, height: 80, objectFit: "contain", mr: 1.2 }}
          />
          <Box>
            <Typography fontWeight={800} lineHeight={1.05}>
              German Language
            </Typography>
            <Typography
              variant="caption"
              sx={{ opacity: 0.65, letterSpacing: ".12em" }}
            >
              INSTITUT
            </Typography>
          </Box>
        </Link>

        {!isMobile && (
          <Stack direction="row" spacing={0.5} sx={{ ml: "auto" }}>
            <Button
              component={Link}
              to="/"
              color={location.pathname === "/" ? "primary" : "inherit"}
            >
              {t.home}
            </Button>

            <Button component={Link} to="/about">
              {t.nav.about}
            </Button>

            <Button
              onClick={(e) => setCourseAnchor(e.currentTarget)}
              endIcon={<ExpandMore />}
            >
              {t.nav.courses}
            </Button>
            <Menu
              anchorEl={courseAnchor}
              open={Boolean(courseAnchor)}
              onClose={() => setCourseAnchor(null)}
            >
              <MenuItem
                component={Link}
                to="/courses"
                onClick={() => setCourseAnchor(null)}
              >
                {t.nav.courses}
              </MenuItem>
              <MenuItem
                component={Link}
                to="/prices"
                onClick={() => setCourseAnchor(null)}
              >
                {t.nav.prices}
              </MenuItem>
            </Menu>
            <Button>{t.nav.test}</Button>
            <Button component={Link} to="/contact">
              {t.nav.contact}
            </Button>
          </Stack>
        )}

        <FormControl
          size="small"
          sx={{ minWidth: 80, ml: isMobile ? "auto" : 1 }}
        >
          <InputLabel>Lang</InputLabel>
          <Select
            value={lang}
            label="Lang"
            onChange={(e) => setLang(e.target.value)}
          >
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="de">DE</MenuItem>
            <MenuItem value="ar">AR</MenuItem>
          </Select>
        </FormControl>

        <IconButton
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          aria-label="Toggle theme"
        >
          {mode === "light" ? <DarkMode /> : <LightMode />}
        </IconButton>

        {isMobile && (
          <IconButton onClick={() => setMobile(true)}>
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      <Drawer
        anchor={lang === "ar" ? "right" : "left"}
        open={mobile}
        onClose={() => setMobile(false)}
      >
        <Box sx={{ width: 280, p: 2 }}>
          <Typography variant="h6" fontWeight={800} sx={{ p: 2 }}>
            German Language Institute
          </Typography>
          <List>
            {links.map(([to, label]) => (
              <ListItemButton
                key={label}
                component={to.startsWith("/#") ? "button" : Link}
                to={to.startsWith("/#") ? undefined : to}
                onClick={() => go(to)}
              >
                <ListItemText primary={label} />
              </ListItemButton>
            ))}
            <ListItemButton
              component={Link}
              to="/register"
              onClick={() => setMobile(false)}
            >
              <ListItemText primary={t.cta} />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
