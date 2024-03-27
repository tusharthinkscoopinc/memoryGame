import React from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <header className="bg-white">
      <nav className="mx-auto flex items-center justify-between p-4 lg:px-8">
        <div className="flex">
          {/* Logo or any other content */}
        </div>

        <div className="hidden lg:flex lg:gap-x-4">
          {/* Search bar or any other content */}
        </div>

        <div className="hidden lg:flex">
          {isLoggedIn ? (
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="flex items-center space-x-2 p-2 text-white">
                <span className="text-xl">👤</span>
              </Menu.Button>
              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/admin-panel"
                          className={`${
                            active ? "bg-gray-100" : ""
                          } block px-4 py-2 text-sm font-semibold leading-6 text-gray-900 w-full text-left`}
                        >
                          Admin Panel
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/"
                          className={`${
                            active ? "bg-gray-100" : ""
                          } block px-4 py-2 text-sm font-semibold leading-6 text-gray-900 w-full text-left`}
                        >
                          Game  
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-900 font-medium focus:outline-none"
                      >
                        Logout
                      </button>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <>
              <Link
                to="/form"
                state={{ LoginForm: "true" }}
                className="block px-4 py-2 text-base font-semibold leading-7 text-gray-900"
              >
                Login
              </Link>
              <Link
                to="/form"
                state={{ LoginForm: "false" }}
                className="block px-4 py-2 text-base font-semibold leading-7 bg-[#4F46E5] text-white hover:bg-blue-600"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
