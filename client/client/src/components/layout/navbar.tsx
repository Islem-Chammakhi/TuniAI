import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="relative z-50">
      <div className="absolute inset-0 mosaic-bg"></div>
      <nav
        className={`relative z-10 flex items-center justify-between px-6 py-4 bg-sand lg:px-16 transition-all duration-300 ${
          isScrolled
            ? "bg-opacity-90 backdrop-blur-sm shadow-md"
            : "bg-opacity-90 backdrop-blur-sm"
        }`}
      >
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-terracotta"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C7.03 2 3 6.03 3 11C3 14.03 4.53 16.82 7 18.47V22H9V19H11V22H13V19H15V22H17V18.46C19.47 16.81 21 14.03 21 11C21 6.03 16.97 2 12 2M12 4C13.8 4 15.5 4.91 16.54 6.36C17 5.2 18.46 4.5 20 4.97C20 4.97 18.87 6.22 19 7C19.19 8.19 20.06 9.12 21.03 9.68C20.32 12.75 16.96 15 13.25 14.25C10.2 13.63 8 11.06 8 8C8 5.79 9.79 4 12 4Z" />
            </svg>
            <span className="text-2xl font-bold font-el-messiri text-terracotta">
              TuniTales
            </span>
          </div>
        </Link>

        {/* Mobile menu button */}
        <button
          className="block p-2 rounded-md lg:hidden text-dark-brown hover:bg-sand hover:bg-opacity-50"
          onClick={toggleMobileMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <NavLink href="/" isActive={location === "/"}>
            Home
          </NavLink>
          <NavLink
            href="/questionnaire"
            isActive={location === "/questionnaire"}
          >
            Plan
          </NavLink>
          <NavLink href="/map" isActive={location === "/map"}>
            Map
          </NavLink>
          <NavLink href="/about" isActive={location === "/about"}>
            About
          </NavLink>
          <Link href="/discover">
            <Button className="px-6 py-2 rounded-full bg-terracotta text-sm text-white font-medium hover:bg-opacity-90 transition-colors shadow-md">
              Identify
            </Button>
          </Link>

        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden absolute z-20 w-full bg-sand bg-opacity-95 shadow-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-4 space-y-4">
              <MobileNavLink href="/" isActive={location === "/"}>
                Home
              </MobileNavLink>
              <MobileNavLink
                href="/questionnaire"
                isActive={location === "/questionnaire"}
              >
                Trip Planner
              </MobileNavLink>
              <MobileNavLink
                href="/discover"
                isActive={location === "/discover"}
              >
                Discover
              </MobileNavLink>
              <MobileNavLink href="/map" isActive={location === "/map"}>
                Map
              </MobileNavLink>
              <MobileNavLink href="/about" isActive={location === "/about"}>
                About
              </MobileNavLink>
              <Button className="w-full px-6 py-2 rounded-full bg-terracotta text-white font-medium hover:bg-opacity-90 transition-colors shadow-md">
                Sign In
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  href,
  isActive,
  children,
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <a
        className={`font-medium transition-colors relative ${
          isActive ? "text-terracotta" : "hover:text-terracotta"
        }`}
      >
        {children}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 w-full h-0.5 bg-terracotta"
            layoutId="navbar-underline"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </a>
    </Link>
  );
}

function MobileNavLink({
  href,
  isActive,
  children,
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <a
        className={`block py-2 font-medium ${
          isActive
            ? "text-terracotta"
            : "hover:text-terracotta transition-colors"
        }`}
      >
        {children}
      </a>
    </Link>
  );
}
