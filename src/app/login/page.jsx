"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useLoginUserMutation } from "../../lib/services/auth";
import { setCookie } from "nookies";
import { toast } from "react-toastify";
import { useAuthRedirect } from "../../components/useAuthRedirect";
import "react-toastify/dist/ReactToastify.css";
import LoadingDots from "../../components/LoadingDots";
import Logo from "../../utils/svgs/Logo";
import LeftLogo from "../../utils/svgs/LeftLogo";
import { BiError } from "react-icons/bi";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [apiError, setApiError] = useState("");
  const router = useRouter();
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();

  const { isAuthenticated, isLoading: isAuthLoading } = useAuthRedirect();

  // Show a loading spinner while checking authentication
  if (isAuthLoading) {
    return (
      <div>
        <LoadingDots />
      </div>
    ); // Customize loading
  }

  // If authenticated, redirect to dashboard
  if (isAuthenticated) {
    router.push("/dashboard");
    return null; // Prevent rendering login page
  }

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required.";
      formIsValid = false;
    }
    const emailRegex = /^[^\s@]+@hellomentor\.in$/;

    if (email && !emailRegex.test(email)) {
      newErrors.email = "Enter a valid @hellomentor.in email.";
      formIsValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required.";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const userData = await loginUser({ email, password }).unwrap();
      setCookie(null, "authToken", userData.accessToken, { path: "/" });
      localStorage.setItem("userDetails", JSON.stringify(userData));
      localStorage.setItem("authToken", userData.accessToken);

      toast.success(userData?.message || "Login successful!");

      if (userData.accessToken) {
        router.push("/dashboard");
      }
    } catch (error) {
      setApiError(`${error?.data?.errors[0]?.msg || error?.message}`);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.subContainer}>
        <div className={styles.innerContainer}>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.logo}>
              <LeftLogo />
            </div>
            <div>
              <h4>Login To Portal</h4>
            </div>

            <div className={styles.inputWrapper}>
              <label htmlFor="email" className={styles.loginFormLabel}>
                Email
              </label>
              <div className={styles.inputWithIcon}>
                {/* <FaEnvelope className={styles.inputIcon} /> */}
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && (
                <p className={styles.errorMessage}>{errors.email}</p>
              )}
            </div>

            <div className={styles.inputWrapper}>
              <label htmlFor="password" className={styles.loginFormLabel}>
                Password
              </label>
              <div className={styles.inputWithIcon}>
                {/* <FaLock className={styles.inputIcon} /> */}
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash style={{ color: "#9B9B9B" }} />
                  ) : (
                    <FaEye style={{ color: "#9B9B9B" }} />
                  )}
                </span>
              </div>
              {errors.password && (
                <p className={styles.errorMessage}>{errors.password}</p>
              )}
            </div>

            {isError && (
              <p className={styles.errorMessage}>
                {error?.data?.message || error?.message}
              </p>
            )}

            <div className={styles.buttonWrapper}>
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
            <div className={styles.apierror}>
              {isError && (
                <p>
                  <BiError /> {apiError}{" "}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
