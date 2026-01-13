import React from "react";
import { Box, Grid, Typography, Link, Divider } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1c1d1f",
        color: "#fff",
        mt: 8,
        px: { xs: 3, md: 8 },
        py: 6,
      }}
    >
      <Grid container spacing={4}>
        {/* About */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography fontWeight={600} mb={2}>
            About
          </Typography>
          <FooterLink text="About us" />
          <FooterLink text="Careers" />
          <FooterLink text="Contact us" />
          <FooterLink text="Blog" />
          <FooterLink text="Investors" />
        </Grid>

        {/* Discover */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography fontWeight={600} mb={2}>
            Discover Gyanami
          </Typography>
          <FooterLink text="Get the app" />
          <FooterLink text="Teach on Gyanami" />
          <FooterLink text="Plans and Pricing" />
          <FooterLink text="Affiliate" />
          <FooterLink text="Help and Support" />
        </Grid>

        {/* Business */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography fontWeight={600} mb={2}>
            Gyanami for Business
          </Typography>
          <FooterLink text="Gyanami Business" />
        </Grid>

        {/* Legal */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography fontWeight={600} mb={2}>
            Legal & Accessibility
          </Typography>
          <FooterLink text="Accessibility statement" />
          <FooterLink text="Privacy policy" />
          <FooterLink text="Sitemap" />
          <FooterLink text="Terms" />
        </Grid>
      </Grid>

      <Divider sx={{ borderColor: "#3e4143", my: 4 }} />

      {/* Bottom row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="body2" color="#aaa">
          © {new Date().getFullYear()} Gyanami, Inc.
        </Typography>

        <Typography variant="body2" color="#aaa">
          English
        </Typography>
      </Box>
    </Box>
  );
}

/* Reusable footer link */
function FooterLink({ text }) {
  return (
    <Link
      href="#"
      underline="none"
      sx={{
        display: "block",
        color: "#fff",
        fontSize: 14,
        mb: 1,
        "&:hover": {
          textDecoration: "underline",
        },
      }}
    >
      {text}
    </Link>
  );
}

export default Footer;
