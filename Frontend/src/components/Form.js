import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaCaretDown } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { countries } from "./countries";
import { useLocation } from "react-router-dom";

const compnaytype = [
  "Product Based",
  "Consultancy Services",
  "Product & Consultancy",
];

const SignUpForm = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [country, setCountry] = useState(countries[74]);
  const [companyType, setCompanyType] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  useEffect(() => {
    const { state } = location;
    if (state && state.LoginForm === "true") {
      setIsSignUp(false);
      setEmail("");
      setPassword("");
    } else {
      setIsSignUp(true);
      setEmail("");
      setPassword("");
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateForm = () => {
      if (
        !email ||
        !firstName ||
        !lastName ||
        !password ||
        !country ||
        !companyType ||
        !agreeTerms
      ) {
        alert("All fields are required.");
        return false;
      }

      if (!validateEmail(email)) {
        setEmailError("Please enter a valid email address.");
        return false;
      }

      return true;
    };

    if (!validateForm()) {
      return;
    }
    try {
      const response = await fetch(`/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          password,
          country,
          companyType,
          jobTitle,
          companySize,
          agreeTerms,
        }),
      });

      const data = await response.json();

      if (data.success) {
        dispatch({ type: "LOGIN" });
        Navigate("/email-verification");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setCountry(countries);
        setCompanyType("");
        setJobTitle("");
        setCompanySize("1-10");
        localStorage.setItem("userId", data.user._id);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("isEmailVerified", "false");
        setAgreeTerms(false);
      } else {
        alert("Registration failed. Please try again with correct credentials");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("An error occurred. Please try again.", error);
    }
  };

  const LoginSubmit = async (e) => {
    e.preventDefault();
    const validateLoginForm = () => {
      if (!email) {
        alert("Email is required.");
        return false;
      }

      if (!validateEmail(email)) {
        setEmailError("Please enter a valid email address.");
        return false;
      }

      if (!password) {
        alert("Password is required.");
        return false;
      }
      return true;
    };

    if (!validateLoginForm()) {
      return;
    }

    try {
      const response = await fetch(`/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        dispatch({ type: "LOGIN" });
        localStorage.setItem("userId", data.user._id);
        localStorage.setItem("isEmailVerified", data.user.isEmailVerified);
        localStorage.setItem("user", JSON.stringify(data.user));
        if (data.user.isEmailVerified === true) {
          Navigate("/dashboard");
        } else {
          Navigate("/email-verification");
        }
      } else {
        console.log("Error : Something Went Wrong");
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.", error);
    }
  };

  const handleFormSwitch = () => {
    setIsSignUp(!isSignUp);
    setEmail("");
    setPassword("");
    setEmailError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (emailError) {
      const timer = setTimeout(() => {
        setEmailError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [emailError]);

  return (
    <div
      className="flex font-helvetica-neue"
      style={{
        minHeight: `calc(100vh - 76px)`,
        transition: `opacity 300ms ease-in-out`,
      }}
    >
      {isSignUp ? (
        <>
          {/* Left Section - User Signup Form */}
          <div className="w-full lg:w-1/2 p-4 lg:p-8 mx-auto my-auto">
            <form
              className="flex flex-wrap lg:w-4/5 mx-auto "
              onSubmit={handleSubmit}
            >
              <h1 className="px-3 text-2xl lg:text-5xl font-bold mb-2  tracking-wide">
                Create account
              </h1>
              <p className="px-4 mb-8 ">
                Create your account. It’s free and only take a minute
              </p>
              {/* First Name */}
              <div className="mb-4 w-full lg:w-1/2 px-3">
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-sm font-medium text-gray-700 "
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className=" p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 "
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Arjun"
                  required
                />
              </div>
              {/* Last Name */}
              <div className="mb-4 w-full lg:w-1/2 px-3">
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-sm font-medium text-gray-700 "
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className=" p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 "
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Kapoor"
                  required
                />
              </div>
              {/* Email */}
              <div className="mb-4 w-full lg:w-1/2 px-3">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700 "
                >
                  Business Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className=" p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="arjunkapoor@gmail.com"
                  required
                />
                {emailError && (
                  <div className="absolute top-full right-0 text-red-500 text-sm">
                    {emailError}
                  </div>
                )}
              </div>
              {/* Password */}
              <div className="mb-4 w-full lg:w-1/2 px-3 relative">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700 "
                >
                  Password
                </label>
                <div className="flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className=" p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    className="focus:outline-none ml-2 flex items-center justify-center rounded-md"
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "24px",
                    }}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>
              {/* Country */}
              <div className="mb-4 w-full lg:w-1/2 px-3 relative">
                <label
                  htmlFor="country"
                  className="mb-2 block text-sm font-medium text-gray-700 "
                >
                  Country
                </label>
                <Menu as="div" className="relative ">
                  {({ open }) => (
                    <>
                      <Menu.Button
                        className="p-2 w-full border border-gray-300 rounded-md text-left appearance-none focus:outline-none focus:border-blue-600 "
                        required
                      >
                        {country || "Select"}
                        <FaCaretDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                      </Menu.Button>

                      <Transition
                        show={open}
                        as={React.Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right max-h-40 overflow-auto absolute z-10 divide-y right-0  w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <div className="py-1">
                            {countries.map((type) => (
                              <Menu.Item key={type}>
                                {({ active }) => (
                                  <button
                                    onClick={() => setCountry(type)}
                                    className={`${
                                      active || type === country
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700"
                                    } block w-full px-4 py-2 text-sm text-left`}
                                  >
                                    {type}
                                  </button>
                                )}
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
              {/* Company Type */}
              <div className="mb-4 w-full lg:w-1/2 px-3 relative">
                <label
                  htmlFor="companyType"
                  className="mb-2 block text-sm font-medium text-gray-700 "
                >
                  Company Type
                </label>
                <Menu as="div" className="relative ">
                  {({ open }) => (
                    <>
                      <Menu.Button
                        className="p-2 w-full border border-gray-300 rounded-md text-left appearance-none focus:outline-none focus:border-blue-600 "
                        required
                      >
                        {companyType || "Select"}
                        <FaCaretDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                      </Menu.Button>

                      <Transition
                        show={open}
                        as={React.Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute z-10 divide-y right-0  w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <div className="py-1">
                            {compnaytype.map((type) => (
                              <Menu.Item key={type}>
                                {({ active }) => (
                                  <button
                                    onClick={() => setCompanyType(type)}
                                    className={`${
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700"
                                    } block w-full px-4 py-2 text-sm text-left`}
                                  >
                                    {type}
                                  </button>
                                )}
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
              {/* Job Title */}
              <div className="mb-4 w-full lg:w-1/2 px-3">
                <label
                  htmlFor="jobTitle"
                  className="mb-2 block text-sm font-medium text-gray-700 "
                >
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  className=" p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 "
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Software Developer II"
                  required
                />
              </div>
              {/* Company Size */}
              <div className="mb-4 w-full lg:w-1/2 px-3 relative">
                <label
                  htmlFor="companySize"
                  className="mb-2 block text-sm font-medium text-gray-700 "
                >
                  Company Size
                </label>
                <Menu as="div" className="relative ">
                  {({ open }) => (
                    <>
                      <Menu.Button
                        className="p-2 w-full border border-gray-300 rounded-md text-left focus:outline-none focus:border-blue-600 "
                        required
                      >
                        {companySize || "Select"}
                        <FaCaretDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                      </Menu.Button>

                      <Transition
                        show={open}
                        as={React.Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute z-10 divide-y max-h-40 overflow-auto right-0  w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <div className="py-1">
                            {[
                              "1-10",
                              "11-50",
                              "51-100",
                              "101-500",
                              "501-1000",
                              "1001-5000",
                              "5000+",
                            ].map((size) => (
                              <Menu.Item key={size}>
                                {({ active }) => (
                                  <button
                                    onClick={() => setCompanySize(size)}
                                    className={`${
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700"
                                    } block w-full px-4 py-2 text-sm text-left`}
                                  >
                                    {size}
                                  </button>
                                )}
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
              {/* Submit Button */}
              <div className="mb-4 w-full px-3">
                <div className="m-2 mb-5">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={() => setAgreeTerms(!agreeTerms)}
                    className="rounded bg-gray-200 border-transparent focus:border-transparent focus:bg-gray-200 text-gray-700 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500 "
                    required
                  />
                  <span className="ml-2">
                    I have read and agree to the{" "}
                    <Link
                      className="text-blue-600 underline hover:text-blue-800 focus:outline-none "
                      to="/terms-and-conditions"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      terms of service
                    </Link>
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#4F46E5] text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 "
                >
                  Join now!
                </button>
              </div>
            </form>
            {/* Switch between Signup and Login forms */}
            <div className="mb-4 w-full px-3 text-center">
              <button
                type="button"
                onClick={handleFormSwitch}
                className="text-blue-600 underline hover:text-blue-800 focus:outline-none "
              >
                {isSignUp ? "Already a user? Login" : "New user? Sign Up"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Left Section - Login */}
          <div className="my-auto w-full lg:w-1/2 p-4 lg:p-8 mx-auto">
            <form className="lg:w-4/6 mx-auto " onSubmit={LoginSubmit}>
              <h1 className="px-3 text-2xl lg:text-5xl font-bold mb-2  tracking-wide">
                Login account
              </h1>
              <p className="px-4 mb-8 ">
                Login In your account. It’s free and only take a minute
              </p>
              {/* Email */}
              <div className="mb-4 px-3">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700 "
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className=" p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
                {emailError && (
                  <div className="absolute top-full right-0 text-red-500 text-sm">
                    {emailError}
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="mb-4 px-3 relative">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700 "
                >
                  Password
                </label>
                <div className="flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className=" p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    className="focus:outline-none ml-2 flex items-around justify-center rounded-md"
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "24px",
                    }}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>

              <div
                onClick={() => Navigate("/forgot-password")}
                className="mb-4 pr-6 cursor-pointer	w-full px-3 text-right text-blue-600 underline hover:text-blue-800 focus:outline-none "
              >
                Forgot Password ?
              </div>
              {/* Submit Button */}
              <div className="mb-4 w-full px-3">
                <button
                  type="submit"
                  className="w-full bg-[#4F46E5] text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 "
                >
                  Log In
                </button>
              </div>
            </form>
            {/* Switch between Signup and Login forms */}
            <div className="mb-4 w-full px-3 text-center">
              <button
                type="button"
                onClick={handleFormSwitch}
                className="text-blue-600 underline hover:text-blue-800 focus:outline-none "
              >
                {isSignUp ? "Already a user? Login" : "New user? Sign Up"}
              </button>
            </div>
          </div>
        </>
      )}
      {/* Right Section - Benefits Display (to be added later) */}
      <div className="md:w-1/2 bg-[#4F46E5] rounded-l-2xl shadow-2xl shadow-blue-500 p-6 md:p-12 hidden sm:flex items-center justify-center">
        <img
          src="https://www.hackerrank.com/wp-content/themes/hackerrank/assets/images/get_started/gs-hire.png?v1"
          alt="Free trial features"
        />
      </div>
    </div>
  );
};

export default SignUpForm;
