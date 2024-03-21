import React, { useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Talent");

  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleLogout = () => {
    setMobileMenuOpen(false);
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
                        <button
                          onClick={handleLogout}
                          className={`${
                            active ? "bg-gray-100" : ""
                          } block px-4 py-2 text-sm font-semibold leading-6 text-gray-900 w-full text-left`}
                        >
                          Logout
                        </button>
                      )}
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


        <div className="lg:hidden flex items-center">
          <button
            type="button"
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={() => setMobileMenuOpen(true)}
          >

          </button>
        </div>


        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white p-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center -m-1.5 p-1.5">
                {/* Your logo */}
                <span className="inline">Talent Swap</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                
              </button>
            </div>
            <div className="mt-6">

              <div>
                <input
                  className="rounded-full w-full py-2 px-4 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  type="text"
                  placeholder="Start your search"
                />
              </div>

              <div>
                <Link
                  to="/dashboard"
                  className="block py-2.5 px-4 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                >
                  Dashboard
                </Link>

              </div>
              <div>
                {isLoggedIn ? (
                  <Link
                    to="/"
                    onClick={handleLogout}
                    className="block py-2.5 px-4 text-base font-semibold leading-6 text-gray-900 hover:bg-red-500"
                  >
                    Log Out
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/form"
                      state={{ LoginForm: "true" }}
                      className="block py-2.5 px-4 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/form"
                      state={{ LoginForm: "false" }}
                      className="block py-2.5 px-4 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                    >
                      Signup
                    </Link>
                  </>
                )}
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </nav>
    </header>
  );
};

export default Navbar;
