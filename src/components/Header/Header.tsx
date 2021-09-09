/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { HeaderProps } from "../../interfaces/HeaderProps";
import AuthController from "../../controllers/Authentication/AuthController";
import { useHistory } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/dashboard", current: true },
  { name: "Home", href: "https://rendin.ee", current: false },
];

export const Header = (props: HeaderProps) => {
  const history = useHistory();
  const signOut = async () => {
    await AuthController.signOut();
    history.push('/login');
  };

  return (
    <Disclosure as="nav" className="bg-white-100 border-b-2">
      {({ open }) => (
        <>
          <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-rendin focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block h-8 w-auto"
                    src="https://rendin.ee/_nuxt/img/rendin-logo.66b36f6.svg"
                    alt="rendin"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href="#"
                        className={`
                            ${item.current ? "bg-rendin text-white" : "text-rendin hover:bg-rendin hover:text-white"} 
                            px-3 py-2 rounded-md text-sm font-medium
                          `}
                        aria-current={item.current ? "page" : undefined}
                        onClick={() => history.push(item.href)}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="bg-rendin p-1 rounded-full text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-white">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={props?.userInfo?.userImage}
                        alt=""
                      />
                      {/* in real scenario, image would be fetched from user's data */}
                      <p className="text-sm pl-2 text-gray-600 hidden md:block">{props?.userInfo?.name}</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2 h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
                            onClick={() => history.push('/profile')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      {/* we will add more options here */}
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
                            onClick={signOut}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          {/* mobile menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`${item.current ? "bg-rendin text-white" : "text-rendin hover:bg-rendin hover:text-white"}
                      'block px-3 py-2 rounded-md text-base font-medium'
                    `}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
