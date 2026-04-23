"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["luxurious", "peaceful", "memorable", "breathtaking", "unique"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div
      className="w-full min-h-screen flex items-center"
      style={{
        background:
          "radial-gradient(ellipse at 25% 40%, #2E2410 0%, #1C1814 40%, #0F0D0B 75%)",
      }}
    >
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">

          {/* Badge */}
          <div>
            <Link
              href="/sports"
              className="inline-flex items-center gap-3 border border-hg-gold/30 bg-hg-gold/5 text-hg-gold text-xs tracking-[0.3em] uppercase px-5 py-2.5 rounded-full hover:bg-hg-gold/10 transition-colors"
            >
              CDP Fútbol Club × Hotel Garden <MoveRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Headline */}
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-hg-cream">Your stay will be</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-hg-gold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-hg-muted max-w-2xl text-center">
              Nestled in the heart of Andorra la Vella, Hotel Garden blends
              mountain tranquility with modern comfort. From our rooms to our
              restaurant, every detail is crafted for an unforgettable stay.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-row gap-3">
            <a
              href="tel:+376615817"
              className="inline-flex items-center gap-3 border border-hg-cream/30 hover:border-hg-gold text-hg-cream hover:text-hg-gold text-sm px-6 py-3 rounded-full transition-colors"
            >
              Jump on a call <PhoneCall className="w-4 h-4" />
            </a>
            <Link
              href="/booking"
              className="inline-flex items-center gap-3 bg-hg-gold hover:bg-hg-gold-light text-hg-black font-bold text-sm px-6 py-3 rounded-full transition-colors"
            >
              Book your stay <MoveRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
