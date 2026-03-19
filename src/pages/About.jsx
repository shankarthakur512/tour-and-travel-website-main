import React from "react";
import { FaBriefcase, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

import BlogsComp from "../components/Blogs/BlogsComp";
import Location from "../components/Location/Location";
import founderImage from "../assets/founder.jpg";
import { ABOUT_CONTENT } from "../shared/constants/editorialContent";

const impactIcons = [FaUsers, FaMapMarkerAlt, FaBriefcase];

const About = () => {
  return (
    <div className="min-h-screen bg-cream px-4 pb-20 pt-32 text-ink dark:bg-charcoal dark:text-cream">
      <div className="section-shell grid gap-10">
        <section className="overflow-hidden rounded-[36px] border border-sand-dark bg-[linear-gradient(135deg,#1A3530_0%,#2C4A3E_52%,#3D6B5A_100%)] px-8 py-10 shadow-luxury sm:px-12 sm:py-14">
          <span className="eyebrow-label">{ABOUT_CONTENT.eyebrow}</span>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-cream sm:text-5xl">
            {ABOUT_CONTENT.title}
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-8 text-sand/80 sm:text-base">
            {ABOUT_CONTENT.body}
          </p>
        </section>

        <section className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="surface-panel p-6 dark:border-white/10 dark:bg-[#18211E] sm:p-8">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
              {ABOUT_CONTENT.storyTitle}
            </span>
            <h2 className="mt-4 text-3xl font-semibold text-forest dark:text-cream">
              A travel experience shaped around clarity, confidence, and local trust.
            </h2>
            <p className="mt-5 text-sm leading-8 text-slate dark:text-sand/75">
              {ABOUT_CONTENT.storyBody}
            </p>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-sand-dark/70 shadow-soft dark:border-white/10">
            <img src={founderImage} alt={ABOUT_CONTENT.founderName} className="h-full w-full object-cover" />
          </div>
        </section>

        <section className="surface-panel p-6 dark:border-white/10 dark:bg-[#18211E] sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="flex justify-center lg:justify-start">
              <img
                src={founderImage}
                alt={ABOUT_CONTENT.founderName}
                className="h-56 w-56 rounded-full object-cover ring-4 ring-sand shadow-luxury dark:ring-white/10"
              />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
                {ABOUT_CONTENT.founderTitle}
              </span>
              <h2 className="mt-4 text-3xl font-semibold text-forest dark:text-cream">
                {ABOUT_CONTENT.founderName}
              </h2>
              <p className="mt-5 text-sm leading-8 text-slate dark:text-sand/75">
                {ABOUT_CONTENT.founderBody}
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {ABOUT_CONTENT.impactCards.map((item, index) => {
            const Icon = impactIcons[index];

            return (
              <article
                key={item.value}
                className="surface-panel p-6 text-center dark:border-white/10 dark:bg-[#18211E]"
              >
                <Icon className="mx-auto text-4xl text-gold" />
                <h3 className="mt-5 text-3xl font-semibold text-forest dark:text-cream">
                  {item.value}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate dark:text-sand/72">
                  {item.label}
                </p>
              </article>
            );
          })}
        </section>

        <section className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="surface-panel p-6 dark:border-white/10 dark:bg-[#18211E] sm:p-8">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
              {ABOUT_CONTENT.contactTitle}
            </span>
            <h2 className="mt-4 text-3xl font-semibold text-forest dark:text-cream">
              A simple contact space for collaboration and questions.
            </h2>
            <p className="mt-5 text-sm leading-8 text-slate dark:text-sand/75">
              {ABOUT_CONTENT.contactBody}
            </p>

            <form className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  type="text"
                  className="rounded-2xl border border-sand-dark bg-white px-4 py-4 text-sm text-ink outline-none transition focus:border-forest/40 dark:border-white/10 dark:bg-[#101714] dark:text-cream"
                  placeholder="Your Name"
                  required
                />
                <input
                  type="email"
                  className="rounded-2xl border border-sand-dark bg-white px-4 py-4 text-sm text-ink outline-none transition focus:border-forest/40 dark:border-white/10 dark:bg-[#101714] dark:text-cream"
                  placeholder="Your Email"
                  required
                />
              </div>
              <textarea
                rows="5"
                className="w-full rounded-2xl border border-sand-dark bg-white px-4 py-4 text-sm text-ink outline-none transition focus:border-forest/40 dark:border-white/10 dark:bg-[#101714] dark:text-cream"
                placeholder="Your Message"
                required
              />
              <button type="submit" className="brand-button w-full">
                Send Message
              </button>
            </form>
          </div>

          <div className="surface-panel p-6 dark:border-white/10 dark:bg-[#18211E] sm:p-8">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
              {ABOUT_CONTENT.locationsTitle}
            </span>
            <h2 className="mt-4 text-3xl font-semibold text-forest dark:text-cream">
              A grounded starting point for the brand story.
            </h2>
            <p className="mt-5 text-sm leading-8 text-slate dark:text-sand/75">
              {ABOUT_CONTENT.locationsBody}
            </p>
            <div className="mt-6 overflow-hidden rounded-[28px] border border-sand-dark/70 dark:border-white/10">
              <Location />
            </div>
          </div>
        </section>
      </div>

      <BlogsComp
        variant="compact"
        title="Editorial pieces that extend the same travel philosophy."
        copy="The journal helps the About page feel more alive and connected to the rest of the product."
      />
    </div>
  );
};

export default About;
