import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useTheme } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";

import logo from "../../img/logo.png";
import factory from "../../img/factory.gif";

import "./loginPage.css";

const LoginPage = (props) => {
  const theme = useTheme();

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    document.title = props.title || "";
  }, [props.title]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const login = async (values) => {
    const { username, password } = values;

    /*const result = await axios.post("/login", { username, password });
    constnsole.log(result);
*/
    //navigate("/dashboard");
  };

  const handleSubmit = async (values, { resetForm }) => {
    login(values);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Please enter your username!"),
      password: yup.string().required("Please enter your password!"),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <section>
      <img alt="gif" className="bg" src={factory} />
      <form className="login" onSubmit={formik.handleSubmit}>
        <img alt="logo" src={logo} />
        <div className="inputBox">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formik.values.username}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <span className="errorText">
            {formik.touched.username && formik.errors.username}
          </span>
        </div>
        <div className="inputBox">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <span className="errorText">
            {formik.touched.password && formik.errors.password}
          </span>
        </div>
        <div className="inputBox">
          <input type="submit" value="Login" id="btn" />
        </div>
        <div className="group">
          <a href="#">Forget Password</a>
          <a href="#">Signup</a>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
