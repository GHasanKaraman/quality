import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

import logo from "../../img/logo.png";
import factory from "../../img/factory.gif";

import "./login.css";

const LoginPage = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    document.title = props.title || "";
  }, [props.title]);

  const handleSubmit = async (values, { resetForm }) => {
    const { username, password } = values;

    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      resetForm();
      navigate("/dashboard");
    } catch (error) {
      if (!error.status) {
        enqueueSnackbar("Network error, please try again later", {
          variant: "error",
        });
      } else if (error.status === 400) {
        enqueueSnackbar("Invalid username or password", { variant: "error" });
      } else if (error.status === 401) {
        enqueueSnackbar("Unauthorized", {
          variant: "error",
        });
      } else {
        enqueueSnackbar("An unexpected error occurred", { variant: "error" });
        console.error(error.data?.message);
      }
    }
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
