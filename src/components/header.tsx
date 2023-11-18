// import { Button } from "./ui/button";

// const Header = () => {
//   return (
//     <>
//       <header className="text-gray-600 body-font bg">
//         <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
//           <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
//             <a className="mr-5 hover:text-gray-900">First Link</a>
//             <a className="mr-5 hover:text-gray-900">Second Link</a>
//             <a className="mr-5 hover:text-gray-900">Third Link</a>
//             <a className="hover:text-gray-900">Fourth Link</a>
//           </nav>
//           <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               stroke="currentColor"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               stroke-width="2"
//               className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
//               viewBox="0 0 24 24"
//             >
//               <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
//             </svg>
//             <span className="ml-3 text-xl">Tailwind Snippets</span>
//           </a>
//           <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
//             <Button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
//               Button
//               <svg
//                 fill="none"
//                 stroke="currentColor"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 stroke-width="2"
//                 className="w-4 h-4 ml-1"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M5 12h14M12 5l7 7-7 7"></path>
//               </svg>
//             </Button>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };

// export default Header;

import { useState } from "react";
import { ChevronDownIcon, ArchiveIcon } from "@radix-ui/react-icons";
import ToggleDarkMode from "@/components/toggledarkmode";
import Link from "next/link";
import Logo from "@/components/logo";
import ToggleMenu from "@/components/togglemenu";
import { HeaderProps } from "@/lib/types";

export const headerData: HeaderProps = {
  links: [
    {
      label: "Pages",
      icon: ChevronDownIcon,
      links: [
        {
          label: "About us",
          href: "#",
        },
        {
          label: "Pricing",
          href: "#",
        },
        {
          label: "Contact us",
          href: "#",
        },
        {
          label: "FAQs",
          href: "#",
        },
        {
          label: "Privacy Policy",
          href: "#",
        },
        {
          label: "Terms & Conditions",
          href: "#",
        },
      ],
    },
    {
      label: "Blog",
      href: "#",
    },
    {
      label: "Contact",
      href: "#",
    },
  ],

  isSticky: true,
  showToggleTheme: true,
  showRssFeed: false,
  position: "right",
};

const Header = () => {
  const { links, isSticky, showToggleTheme, showRssFeed, position } =
    headerData;

  const updatedIsDropdownOpen =
    links &&
    links.map(() => {
      return false;
    });

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean[]>(
    updatedIsDropdownOpen as boolean[]
  );
  const [isToggleMenuOpen, setIsToggleMenuOpen] = useState<boolean>(false);

  const handleDropdownOnClick = (index: number) => {
    setIsDropdownOpen((prevValues) => {
      const newValues = [...(prevValues as boolean[])];
      newValues.forEach((value, i) => {
        if (value === true) {
          newValues[i] = false;
        } else {
          newValues[i] = i === index;
        }
      });
      return newValues;
    });
  };

  const handleCloseDropdownOnClick = (index: number) => {
    setIsDropdownOpen((prevValues) => {
      const newValues = [...(prevValues as boolean[])];
      newValues[index] = false;
      return newValues;
    });
  };

  const handleToggleMenuOnClick = () => {
    setIsToggleMenuOpen(!isToggleMenuOpen);
  };

  return (
    <header
      className={`top-0 z-40 mx-auto w-full flex-none bg-white transition-all duration-100 ease-in dark:bg-slate-900 md:bg-white/90 md:backdrop-blur-sm dark:md:bg-slate-900/90 ${
        isSticky ? "sticky" : "relative"
      }`}
      id="header"
    >
      <div className="mx-auto w-full max-w-7xl py-3 px-3 md:flex md:justify-between md:py-3.5 md:px-4">
        <div className="flex justify-between">
          <Link
            className="flex items-center"
            href="/"
            onClick={() =>
              isToggleMenuOpen
                ? handleToggleMenuOnClick()
                : setIsDropdownOpen(updatedIsDropdownOpen as boolean[])
            }
          >
            <Logo />
          </Link>
          <div className="flex items-center md:hidden">
            <ToggleMenu
              handleToggleMenuOnClick={handleToggleMenuOnClick}
              isToggleMenuOpen={isToggleMenuOpen}
            />
          </div>
        </div>
        <nav
          className={`${
            isToggleMenuOpen ? "block" : "hidden"
          } h-screen md:w-full ${
            position === "right"
              ? "justify-end"
              : position === "left"
              ? "justify-start"
              : "justify-center"
          } w-auto overflow-y-auto dark:text-slate-200 md:mx-5 md:flex md:h-auto md:items-center md:overflow-visible`}
          aria-label="Main navigation"
        >
          <ul className="flex w-full flex-col pt-8 text-xl md:w-auto md:flex-row md:self-center md:pt-0 md:text-base">
            {links &&
              links.map(({ label, href, icon: Icon, links }, index) => (
                <li
                  key={`item-link-${index}`}
                  className={links?.length ? "dropdown" : ""}
                >
                  {links && links.length ? (
                    <>
                      <button
                        className="flex items-center px-4 py-3 font-medium transition duration-150 ease-in-out hover:text-gray-900 dark:hover:text-white"
                        onClick={() => handleDropdownOnClick(index)}
                      >
                        {label}{" "}
                        {Icon && (
                          <Icon className="ml-0.5 hidden h-3.5 w-3.5 md:inline" />
                        )}
                      </button>
                      <ul
                        className={`${
                          isDropdownOpen[index] ? "block" : "md:hidden"
                        } rounded pl-4 font-medium drop-shadow-xl md:absolute md:min-w-[200px] md:bg-white/90 md:pl-0 md:backdrop-blur-md dark:md:bg-slate-900/90`}
                      >
                        {links.map(({ label: label2, href: href2 }, index2) => (
                          <li key={`item-link-${index2}`}>
                            <Link
                              className="whitespace-no-wrap block py-2 px-5 first:rounded-t last:rounded-b dark:hover:bg-gray-700 md:hover:bg-gray-200"
                              href={href2 as string}
                              onClick={() =>
                                isToggleMenuOpen
                                  ? handleToggleMenuOnClick()
                                  : handleCloseDropdownOnClick(index)
                              }
                            >
                              {label2}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      className="flex items-center px-4 py-3 font-medium transition duration-150 ease-in-out hover:text-gray-900 dark:hover:text-white"
                      href={href as string}
                      onClick={() =>
                        isToggleMenuOpen
                          ? handleToggleMenuOnClick()
                          : handleDropdownOnClick(index)
                      }
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
          </ul>
        </nav>
        <div
          className={`${
            isToggleMenuOpen ? "block" : "hidden"
          } fixed bottom-0 left-0 w-full justify-end p-3 md:static md:mb-0 md:flex md:w-auto md:self-center md:p-0`}
        >
          <div className="flex w-full items-center justify-between md:w-auto">
            {showToggleTheme && <ToggleDarkMode />}
            {showRssFeed && (
              <Link
                className="text-muted inline-flex items-center rounded-lg p-2.5 text-sm hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                aria-label="RSS Feed"
                href=""
              >
                <ArchiveIcon className="h-5 w-5" />
              </Link>
            )}
            {/* {actions && actions.length > 0 && (
              <div className="ml-4 flex w-max flex-wrap justify-end">
                {actions.map((callToAction, index) => (
                  <CTA
                    key={`item-action-${index}`}
                    data={callToAction as CallToAction}
                    class="m-1 py-2 px-5 text-sm font-semibold shadow-none md:px-6"
                  />
                ))}
              </div>
            )} */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
