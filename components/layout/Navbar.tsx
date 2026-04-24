"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  type Variants,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Rooms",      href: "/rooms" },
  { name: "Restaurant", href: "/restaurant" },
  { name: "Draft Week", href: "/draft-week" },
  { name: "Gallery",    href: "/gallery" },
  { name: "About",      href: "/about" },
  { name: "Contact",    href: "/contact" },
];

const EXPAND_SCROLL_THRESHOLD = 80;

const containerVariants: Variants = {
  expanded: {
    y: 0, opacity: 1, width: "auto",
    transition: { type: "spring" as const, damping: 20, stiffness: 300, staggerChildren: 0.07, delayChildren: 0.2 },
  },
  collapsed: {
    y: 0, opacity: 1, width: "3rem",
    transition: { type: "spring" as const, damping: 20, stiffness: 300, staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const logoVariants: Variants = {
  expanded:  { opacity: 1, x: 0,   rotate: 0,    transition: { type: "spring" as const, damping: 15 } },
  collapsed: { opacity: 0, x: -25, rotate: -180,  transition: { duration: 0.3 } },
};

const itemVariants: Variants = {
  expanded:  { opacity: 1, x: 0,   scale: 1,    transition: { type: "spring" as const, damping: 15 } },
  collapsed: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } },
};

const desktopCollapseIconVariants: Variants = {
  expanded:  { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  collapsed: { opacity: 1, scale: 1,   transition: { type: "spring" as const, damping: 15, stiffness: 300, delay: 0.15 } },
};

export default function Navbar() {
  const [isExpanded, setExpanded] = React.useState(true);
  const [isMobile, setIsMobile]   = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);
  const scrollPositionOnCollapse = React.useRef(0);

  // Detect mobile — runs only client-side
  React.useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMobileOpen(false); // close dropdown if resized to desktop
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Desktop-only scroll collapse
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isMobile) return;
    const previous = lastScrollY.current;
    if (isExpanded && latest > previous && latest > 150) {
      setExpanded(false);
      scrollPositionOnCollapse.current = latest;
    } else if (
      !isExpanded &&
      latest < previous &&
      scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD
    ) {
      setExpanded(true);
    }
    lastScrollY.current = latest;
  });

  // Desktop collapsed-pill click → expand
  const handleDesktopPillClick = (e: React.MouseEvent) => {
    if (!isExpanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">

      {/* ── MOBILE NAV ── */}
      {isMobile ? (
        <div
          className="flex items-center gap-3 rounded-full border border-hg-border bg-hg-black/85 shadow-xl backdrop-blur-md px-3 py-2 cursor-pointer"
          onClick={() => setMobileOpen((p) => !p)}
        >
          {/* Logo */}
          <div className="bg-white/90 rounded px-1.5 py-0.5">
            <Image
              src="/logo.jpg"
              alt="Hotel Garden"
              width={24}
              height={30}
              className="object-contain"
              priority
            />
          </div>
          {/* Hamburger / Close */}
          <motion.div
            animate={{ rotate: mobileOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {mobileOpen
              ? <X    className="h-5 w-5 text-hg-gold" />
              : <Menu className="h-5 w-5 text-hg-gold" />
            }
          </motion.div>
        </div>
      ) : (

      /* ── DESKTOP NAV ── */
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={isExpanded ? "expanded" : "collapsed"}
          variants={containerVariants}
          whileHover={!isExpanded ? { scale: 1.1 } : {}}
          whileTap={!isExpanded ? { scale: 0.95 } : {}}
          onClick={handleDesktopPillClick}
          className={cn(
            "flex items-center overflow-hidden rounded-full border border-hg-border bg-hg-black/85 shadow-xl backdrop-blur-md py-2",
            !isExpanded && "cursor-pointer justify-center"
          )}
        >
          {/* Logo */}
          <motion.div variants={logoVariants} className="flex-shrink-0 flex items-center pl-3 pr-2">
            <Link href="/" onClick={(e) => e.stopPropagation()}>
              <div className="bg-white/90 rounded px-1.5 py-0.5 hover:bg-white transition-colors">
                <Image src="/logo.jpg" alt="Hotel Garden" width={28} height={36} className="object-contain" priority />
              </div>
            </Link>
          </motion.div>

          {/* Nav links */}
          <motion.div className={cn("flex items-center gap-1 sm:gap-2 pr-3", !isExpanded && "pointer-events-none")}>
            {navItems.map((item) => (
              <motion.div key={item.name} variants={itemVariants}>
                <Link
                  href={item.href}
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs font-medium text-hg-cream/70 hover:text-hg-gold transition-colors px-2 py-1 tracking-wide whitespace-nowrap"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <motion.div variants={itemVariants}>
              <Link
                href="/booking"
                onClick={(e) => e.stopPropagation()}
                className="ml-1 bg-hg-gold hover:bg-hg-gold-light text-hg-black font-bold text-xs px-4 py-1.5 rounded-full tracking-wide whitespace-nowrap transition-colors"
              >
                Book Now
              </Link>
            </motion.div>
          </motion.div>

          {/* Collapse-to-hamburger icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div variants={desktopCollapseIconVariants} animate={isExpanded ? "expanded" : "collapsed"}>
              <Menu className="h-5 w-5 text-hg-gold" />
            </motion.div>
          </div>
        </motion.nav>
      )}

      {/* ── MOBILE DROPDOWN ── */}
      <AnimatePresence>
        {isMobile && mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: -8, scale: 0.96 }}
            transition={{ type: "spring" as const, damping: 22, stiffness: 300 }}
            className="mt-2 rounded-2xl border border-hg-border bg-hg-black/95 backdrop-blur-md shadow-xl p-3 flex flex-col gap-0.5 min-w-[200px]"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-hg-cream/80 hover:text-hg-gold px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-white/10">
              <Link
                href="/booking"
                onClick={() => setMobileOpen(false)}
                className="block bg-hg-gold hover:bg-hg-gold-light text-hg-black font-bold text-sm px-4 py-2.5 rounded-full text-center transition-colors"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
