import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ClipboardDocumentListIcon,
  XMarkIcon,
  PowerIcon,
  GiftIcon,
  TagIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Link, Outlet, useLocation } from "react-router-dom";
import Logo from "assets/Logo";
import NavHr from "assets/navhr";

const navigation = [
  {
    name: "Notes",
    icon: ClipboardDocumentListIcon,
    href: "/notes",
  },
  {
    name: "Category",
    icon: GiftIcon,
    href: "/categories",
    count: 16,
  },
  {
    name: "Tags",
    icon: TagIcon,
    href: "/tags",
    count: 16,
  }
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();


  return (
    <>
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
              <div className="fixed inset-0 bg-[#F8F9FA] bg-opacity-75" />
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
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-[#F8F9FA]">
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
                          className="h-6 w-6 text-slate-600"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Mobile sidebar */}
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <Logo />
                    </div>
                    <div className="text-center m-6">
                      <NavHr />
                    </div>
                    <nav className="mt-5 space-y-1 px-2">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={
                            location.pathname === item.href
                              ? "bg-white text-[#2D3748] group flex items-center px-2 py-3 text-sm font-medium rounded-xl transition-all duration-300"
                              : "text-[#A0AEC0] hover:bg-indigo-700 hover:text-white group flex items-center px-2 py-3.5 text-sm font-medium rounded-xl transition-all duration-600 delay-200"
                          }
                        >
                          <item.icon
                            className={
                              location.pathname === item.href
                                ? "bg-indigo-500 text-white p-2 rounded-xl mr-3 flex-shrink-0 w-10 transition-all duration-600 delay-200"
                                : "text-indigo-500 group-hover:text-indigo-500 mr-3 flex-shrink-0 h-6 w-6 transition-all duration-600 delay-200"
                            }
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      ))}
                    </nav>
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
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col border-r-[0.05rem] border-r-[#ebebeb] pr-4">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col bg-[#F8F9FA]">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                <Logo />
              </div>
              <div className="text-center m-6">
                <NavHr />
              </div>
              <nav className="mt-5 flex-1 space-y-4 px-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={
                      location.pathname === item.href
                        ? "bg-white text-[#2D3748] group flex items-center px-2 py-3 text-sm font-medium rounded-xl transition-all duration-300"
                        : "text-[#A0AEC0] hover:bg-indigo-700 hover:text-white group flex items-center px-2 py-3.5 text-sm font-medium rounded-xl transition-all duration-600 delay-200"
                    }
                  >
                    <item.icon
                      className={
                        location.pathname === item.href
                          ? "bg-indigo-500 text-white p-2 rounded-xl mr-3 flex-shrink-0 w-10 transition-all duration-600 delay-200"
                          : "text-indigo-500 group-hover:text-indigo-500 mr-3 flex-shrink-0 h-6 w-6 transition-all duration-600 delay-200"
                      }
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>

            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-64 bg-[#F8F9FA] h-screen">
          <div className="sticky flex justify-between items-center top-0 z-10 bg-[#F8F9FA] pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-indigo-500 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="flex md:hidden">
              <div className="text-base  font-medium text-indigo-500 transition-all p-2 rounded-full duration-300 hover:text-indigo-600  hover:cursor-pointer">
                <UserIcon className="w-6" />
              </div>
              <button className="text-base font-medium text-indigo-500 transition-all p-2 rounded-full duration-300 hover:text-indigo-600  hover:cursor-pointer">
                <PowerIcon
                  className="w-6"
                />{" "}
              </button>
            </div>
          </div>
          <main className="flex-1">
            <div className="px-6 sm:px-6 md:px-20 md:py-8">
              <div className="sm:flex sm:items-center mb-6">
                <div className="sm:flex-auto">

                  <div className="relative">
                    <div className="block absolute top-[1.1rem] left-4 text-base font-medium text-[#7B70AF]">
                      <MagnifyingGlassIcon className="w-4" />
                    </div>
                    <input
                      type="search"
                      name="search"
                      id="search"
                      // onChange={onChange}
                      placeholder="Search"
                      className="mt-1 w-full border-gray-50  placeholder:text-xs focus:border-indigo-500 focus:ring-indigo-500 sm:text-md transition-all duration-200  text-darkBlue block  rounded-xl  shadow-sm bg-white sm:text-md pl-10 py-3"
                    />
                  </div>
                </div>
                <div className="mt-4 hidden sm:ml-16 sm:flex-none md:flex">
                  <div className="text-base  font-medium text-indigo-500 transition-all p-2 rounded-full duration-300 hover:text-indigo-600  hover:cursor-pointer">
                    <UserIcon className="w-6" />
                  </div>
                  <button className="text-base font-medium text-indigo-500 transition-all p-2 rounded-full duration-300 hover:text-indigo-600  hover:cursor-pointer">
                    <PowerIcon
                      className="w-6"
                    />{" "}
                  </button>
                </div>
              </div>
            </div>
            <div className="px-4 md:px-0 py-6 ">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}