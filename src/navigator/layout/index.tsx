import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UserGroupIcon,
  XMarkIcon,
  Cog6ToothIcon,
  UsersIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
  WrenchScrewdriverIcon,
  ChevronUpIcon,
  PowerIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
// import logo from "assets/images/logo.png";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

const navigation = [
  {
    name: "Dashboard",
    icon: HomeIcon,
    href: "/dashboard",
  },
  {
    name: "Vendors",
    icon: UserGroupIcon,
    href: "/vendors",
    count: 3,
  },
  {
    name: "Products",
    icon: FolderIcon,
    href: "/products",
    count: 4,
  },

  {
    name: "Services",
    icon: WrenchScrewdriverIcon,
    href: "/services",
  },
  {
    name: "Service Requests",
    icon: ShoppingCartIcon,
    href: "/service-requests",
    count: 12,
  },
  {
    name: "Farmers",
    icon: InboxIcon,
    href: "/farmers",
    count: 12,
  },
  {
    name: "Produce",
    icon: InboxIcon,
    href: "/produce",
    count: 12,
  },
  {
    name: "Orders",
    icon: ShoppingBagIcon,
    href: "/orders",
    count: 12,
  },
  {
    name: "Production Requests",
    icon: ShoppingCartIcon,
    href: "/production",
    count: 12,
  },
  {
    name: "Users",
    icon: UsersIcon,
    href: "/users",
    count: 12,
  },
  {
    name: "Settings",
    icon: Cog6ToothIcon,
    href: "/settings",
    count: 12,
  },
  {
    name: "Category",
    icon: GiftIcon,
    href: "/categories",
    count: 16,
  },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cookies, , removeCookie] = useCookies(["accessToken"]);
  const [{ user }] = useCookies(["user"]);
  const location = useLocation();
  
  if (!cookies?.accessToken) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      {cookies?.accessToken && (
        <div>
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 md:hidden"
              onClose={setSidebarOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-green-600 bg-opacity-75" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-green-800">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                          type="button"
                          className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <span className="sr-only">Close sidebar</span>
                          <XMarkIcon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                      <div className="flex flex-shrink-0 items-center px-4">
                        {/* <img
                          className="h-8 w-auto"
                          src={logo}
                          alt="Your Company"
                        /> */}
                      </div>
                      <nav className="mt-5 space-y-1 px-2">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={
                              location.pathname === item.href
                                ? "bg-green-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                : "text-green-300 hover:bg-green-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                            }
                          >
                            <item.icon
                              className={
                                location.pathname === item.href
                                  ? "text-green-200 mr-3 flex-shrink-0 h-6 w-6"
                                  : "text-green-400 group-hover:text-green-300 mr-3 flex-shrink-0 h-6 w-6"
                              }
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        ))}
                      </nav>
                    </div>
                    <div className="flex justify-between items-center flex-shrink-0 bg-green-700 p-4">
                      <Link
                        to="users/user/profile"
                        className="group block flex-shrink-0 hover:cursor-pointer"
                      >
                        <div className="flex items-center">
                          <div>
                            {/* <img
                              className="inline-block h-10 w-10 rounded-full"
                              src={logo}
                              alt=""
                            /> */}
                          </div>
                          <div className="ml-3">
                            <p className="text-base font-medium text-white">
                              {user?.name}
                            </p>
                            <p className="text-sm font-medium text-green-400 group-hover:text-green-300">
                              View profile
                            </p>
                          </div>
                        </div>
                      </Link>
                      <div className="text-base mr-3 font-medium text-green-300 transition-all bg-green-800 p-2 w-10 h-10 flex justify-center items-center rounded-full duration-300 hover:text-white hover:bg-green-600  hover:cursor-pointer">
                        <ChevronUpIcon
                          className="w-4"
                          onClick={() => removeCookie("accessToken")}
                        />{" "}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
                <div className="w-14 flex-shrink-0">
                  {/* Force sidebar to shrink to fit close icon */}
                </div>
              </div>
            </Dialog>
          </Transition.Root>

          {/* Static sidebar for desktop */}
          <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex min-h-0 flex-1 flex-col bg-green-800">
              <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                  {/* <img className="h-9 w-auto" src={logo} alt="Farmercom LTD" /> */}
                </div>
                <nav className="mt-5 flex-1 space-y-1 px-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={
                        location.pathname === item.href
                          ? "bg-green-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                          : "text-green-300 hover:bg-green-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      }
                    >
                      <item.icon
                        className={
                          location.pathname === item.href
                            ? "text-green-200 mr-3 flex-shrink-0 h-6 w-6"
                            : "text-green-400 group-hover:text-green-300 mr-3 flex-shrink-0 h-6 w-6"
                        }
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex justify-between items-center flex-shrink-0 bg-green-700 p-4">
                <Link to="users/user/profile" className="hover:cursor-pointer">
                  <div className="group block w-full flex-shrink-0">
                    <div className="flex items-center">
                      <div>
                        <img
                          className="inline-block h-9 w-9 rounded-full"
                          src={user?.image}
                          alt={user?.name}
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-white">
                          {user?.name}
                        </p>
                        <p className="text-xs font-medium text-green-300 group-hover:text-green-200">
                          View profile
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
                <button className="text-base  font-medium text-green-300 transition-all p-2 rounded-full duration-300 hover:text-white hover:bg-green-600  hover:cursor-pointer" onClick={() => removeCookie("accessToken")}>
                  <PowerIcon
                    className="w-4"
                  />{" "}
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col md:pl-64">
            <div className="sticky top-0 z-10 bg-green-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
              <button
                type="button"
                className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-green-500 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <main className="flex-1">
              <div className="py-6 ">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}