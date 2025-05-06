import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Badge,
  Divider,
  useTheme,
} from "@mui/material";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Settings from "@mui/icons-material/Settings";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Logout from "@mui/icons-material/Logout";

import { ColorModeContext, tokens } from "../theme";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const openUser = Boolean(anchorElUser);

  const [notificationsLength, setNotificationsLength] = useState(0);

  const handleClickUser = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUser = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      ></Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton aria-label="noti" id="noti-button" aria-haspopup="true">
          <Badge
            badgeContent={notificationsLength}
            sx={{
              "& .MuiBadge-badge": {
                fontWeight: "600",
                color: colors.primary[400],
                backgroundColor: colors.yoggieRed[500],
              },
            }}
          >
            <NotificationsOutlinedIcon color="action" />
          </Badge>
        </IconButton>

        <IconButton
          id="menu-button"
          aria-controls={openUser ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openUser ? "true" : undefined}
          onClick={handleClickUser}
        >
          <PersonOutlinedIcon />
        </IconButton>
      </Box>

      <Menu
        id="account-menu"
        anchorEl={anchorElUser}
        open={openUser}
        onClose={handleCloseUser}
        MenuListProps={{ "aria-labelledby": "menu-button" }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleCloseUser}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleCloseUser}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            logout();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Topbar;
