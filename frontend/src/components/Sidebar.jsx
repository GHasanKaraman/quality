import { useEffect, useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, Avatar, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import packageInfo from "../../package.json";
import useAuth from "../hooks/useAuth";

import { tokens } from "../theme";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import logo from "../img/logo.png";

const Item = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  sub,
  parentTitle,
  disabled,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  return (
    <MenuItem
      disabled={disabled}
      active={selected === title}
      style={{
        color: disabled ? colors.grey[500] : colors.grey[100],
      }}
      onClick={() => {
        if (sub) {
          setSelected(parentTitle);
        } else {
          setSelected(title);
        }
        navigate(to);
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Sidebar = () => {

  const { username, status } = useAuth();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(
    (function () {
      const collapsed = localStorage.getItem("collapsed");
      if (collapsed === "true") {
        return true;
      }
      return false;
    })()
  );

  useEffect(() => {
    //user loading
  });

  return (
    <Box
      sx={{
        "& .ps-sidebar-container": {
          background: `${colors.primary[400]} !important`,
        },
        "& .ps-submenu-content": {
          background: `${colors.primary[400]} !important`,
          borderRadius: 2,
          marginLeft: 2,
        },
        "& .ps-menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .ps-menu-button": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .ps-menu-button:hover": {
          color: colors.ciboInnerGreen[500] + " !important",
          backgroundColor: "transparent !important",
        },
        "& .ps-menu-button.ps-active": {
          color: colors.ciboInnerGreen[400] + " !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <div style={{ width: "100%", textAlign: "center", marginTop: "5px" }}>
            <img
              src={logo}
              width="75%"
              alt="logo"
              style={{ pointerEvents: "none", marginBottom: "-15px" }}
            />
            {!isCollapsed ? (
              <Typography variant="h6" color={colors.grey[100]}>
                v{packageInfo.version}
              </Typography>
            ) : null}
          </div>
          <MenuItem
            onClick={() => {
              localStorage.setItem("collapsed", !isCollapsed);
              setIsCollapsed(!isCollapsed);
            }}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Avatar
                  sx={{ width: 100, height: 100, pointerEvents: "none" }}
                  alt=""
                  src={""}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {username}
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.ciboInnerGreen[500]}
                >
                  {status}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "5%"}></Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
