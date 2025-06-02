const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {});

// @desc Refresh
// @route GET /auth/refresh
// @access Public - access token is expired
const refresh = asyncHandler(async (req, res) => {});

// @desc Logout
// @route POST /auth/logout
// @access Public - clear cookies if exists
const logout = asyncHandler(async (req, res) => {});
