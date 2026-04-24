"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
    <div className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Background photo */}
      <Image
        src="/hotel-hero.png"
        alt="Hotel Garden exterior at dusk, Santa Coloma, Andorra"
        fill
        priority
        className="object-cover object-[center_60%]"
      />
      {/* Dark overlay so text stays readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,8,6,0.55) 0%, rgba(10,8,6,0.45) 50%, rgba(10,8,6,0.72) 100%)",
        }}
        aria-hidden
      />
      <div className="relative z-10 container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">

          {/* Badge */}
          <div>
            <Link
              href="/draft-week"
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
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-stretch sm:items-center">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-3 bg-hg-gold hover:bg-hg-gold-light text-hg-black font-bold text-sm px-6 py-3 rounded-full transition-colors"
            >
              Book your stay <MoveRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+376615817"
              className="inline-flex items-center justify-center gap-3 border border-hg-cream/30 hover:border-hg-gold text-hg-cream hover:text-hg-gold text-sm px-6 py-3 rounded-full transition-colors"
            >
              Jump on a call <PhoneCall className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
