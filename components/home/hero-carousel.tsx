"use client";

import { heroSlides } from "@/data/home";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex((next + heroSlides.length) % heroSlides.length);
    },
    [index],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  const slide = heroSlides[index];

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 shadow-2xl shadow-slate-900/25">
      <div className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-[540px]">
        {/* All slides stay mounted so every image loads (fixes blank slides 1, 3, 4) */}
        {heroSlides.map((s, i) => (
          <div
            key={s.id}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-in-out",
              i === index ? "z-[1] opacity-100" : "z-0 opacity-0",
            )}
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              priority={i < 2}
              sizes="(max-width: 1024px) 100vw, 1280px"
              className="object-cover object-center"
            />
            <div className={cn("absolute inset-0 bg-gradient-to-r", s.accent)} />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/45 to-slate-950/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20" />
          </div>
        ))}

        <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-end p-6 sm:min-h-[480px] sm:p-10 lg:min-h-[540px] lg:max-w-2xl lg:justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.id}
              custom={direction}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-flex w-fit rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                {slide.tag}
              </span>
              <h1 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {slide.title}
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-200 sm:text-base">
                {slide.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={slide.href}>
                  <Button
                    variant="secondary"
                    className="border-0 bg-white px-6 text-slate-950 shadow-lg hover:bg-slate-100"
                  >
                    {slide.cta}
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button
                    variant="ghost"
                    className="border border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20"
                  >
                    View Lookbook
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/25 sm:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/25 sm:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between sm:left-10 sm:right-10">
          <div className="flex gap-2">
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white/70",
                )}
              />
            ))}
          </div>
          <p className="hidden text-xs font-medium uppercase tracking-widest text-white/70 sm:block">
            {String(index + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}
