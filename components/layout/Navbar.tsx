"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, type Variants } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Rooms",      href: "/rooms" },
  { name: "Restaurant", href: "/restaurant" },
  { name: "Sports",     href: "/sports" },
  { name: "Gallery",    href: "/gallery" },
  { name: "About",      href: "/about" },
  { name: "Contact",    href: "/contact" },
];

const EXPAND_SCROLL_THRESHOLD = 80;

// "spring" must be `as const` so TypeScript narrows to the literal,
// not widened to `string`, which would fail Framer Motion's Variants type.
const containerVariants: Variants = {
  expanded: {
    y: 0, opacity: 1, width: "auto",
    transition: {
      type: "spring" as const,
      damping: 20, stiffness: 300,
      staggerChildren: 0.07, delayChildren: 0.2,
    },
  },
  collapsed: {
    y: 0, opacity: 1, width: "3rem",
    transition: {
      type: "spring" as const,
      damping: 20, stiffness: 300,
      staggerChildren: 0.05, staggerDirection: -1,
    },
  },
};

const logoVariants: Variants = {
  expanded:  { opacity: 1, x: 0, rotate: 0,    transition: { type: "spring" as const, damping: 15 } },
  collapsed: { opacity: 0, x: -25, rotate: -180, transition: { duration: 0.3 } },
};

const itemVariants: Variants = {
  expanded:  { opacity: 1, x: 0,   scale: 1,    transition: { type: "spring" as const, damping: 15 } },
  collapsed: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } },
};

const collapsedIconVariants: Variants = {
  expanded:  { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  collapsed: {
    opacity: 1, scale: 1,
    transition: { type: "spring" as const, damping: 15, stiffness: 300, delay: 0.15 },
  },
};

export default function Navbar() {
  const [isExpanded, setExpanded] = React.useState(true);

  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);
  const scrollPositionOnCollapse = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
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

  const handleNavClick = (e: React.MouseEvent) => {
    if (!isExpanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={containerVariants}
        whileHover={!isExpanded ? { scale: 1.1 } : {}}
        whileTap={!isExpanded ? { scale: 0.95 } : {}}
        onClick={handleNavClick}
        className={cn(
          "flex items-center overflow-hidden rounded-full border border-hg-border bg-hg-black/85 shadow-xl backdrop-blur-md h-12",
          !isExpanded && "cursor-pointer justify-center"
        )}
      >
        {/* Logo */}
        <motion.div
          variants={logoVariants}
          className="flex-shrink-0 flex items-center pl-3 pr-2"
        >
          <Link href="/" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white/90 rounded px-1.5 py-0.5 hover:bg-white transition-colors">
              <Image
                src="/logo.jpg"
                alt="Hotel Garden"
                width={28}
                height={36}
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </motion.div>

        {/* Nav links */}
        <motion.div
          className={cn(
            "flex items-center gap-1 sm:gap-2 pr-2",
            !isExpanded && "pointer-events-none"
          )}
        >
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

          {/* Book Now CTA */}
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

        {/* Collapsed menu icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            variants={collapsedIconVariants}
            animate={isExpanded ? "expanded" : "collapsed"}
          >
            <Menu className="h-5 w-5 text-hg-gold" />
          </motion.div>
        </div>
      </motion.nav>
    </div>
  );
}
