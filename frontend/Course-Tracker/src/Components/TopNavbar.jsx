import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

function TopNavbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="default" elevation={1}>
        <Toolbar>
          {/* Logo */}
          <Box sx={{ mr: 3, display: "flex", alignItems: "center" }}>
            <img
              src="/logo.png"
              alt="Logo"
              onClick={() => window.location.href = "/"}
              style={{ height: "40px", cursor: "pointer" }}
            />
          </Box>

          {/* Search Bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f1f1f1",
              px: 1,
              borderRadius: 1,
              width: 320,
            }}
          >
            <SearchIcon sx={{ color: "gray", mr: 1 }} />
            <InputBase placeholder="Search…" sx={{ flex: 1 }} />
          </Box>

          {/* Push content to right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Teach at Gyanami */}
          <Button
            color="inherit"
            sx={{
              mr: 2,
              fontWeight: 500,
              textTransform: "none",
            }}
          >
            Teach at Gyanami
          </Button>

          {/* My Learning */}
          <Button
            color="inherit"
            sx={{
              mr: 2,
              textTransform: "none",
            }}
          >
            My Learning
          </Button>

          {/* Wishlist */}
          <IconButton color="inherit">
            <FavoriteBorderIcon />
          </IconButton>

          {/* Cart */}
          <IconButton color="inherit">
            <ShoppingCartOutlinedIcon />
          </IconButton>

          {/* Notifications */}
          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Profile */}
          <IconButton sx={{ ml: 1 }}>
            <Avatar
              alt="Profile"
              src="https://i.pravatar.cc/300"
              sx={{ width: 32, height: 32 }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Spacer for fixed AppBar */}
      <Toolbar />
    </Box>
  );
}

export default TopNavbar;
