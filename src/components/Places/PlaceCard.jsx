import React from "react";
import { HiOutlineHeart, HiOutlineMapPin, HiOutlineSparkles } from "react-icons/hi2";

const PlaceCard = ({
  img,
  title,
  location,
  description,
  price,
  type,
  handleOrderPopup,
}) => {
  return (
    <article
      className="group overflow-hidden rounded-[28px] border border-sand-dark/70 bg-warm-white shadow-soft transition duration-500 hover:-translate-y-2 hover:shadow-luxury"
      onClick={handleOrderPopup}
    >
      <div className="relative overflow-hidden">
        <img
          src={img}
          alt={title}
          className="h-[280px] w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-forest shadow-sm">
          <HiOutlineSparkles className="text-gold" />
          Featured
        </div>
        <button className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-forest shadow-sm">
          <HiOutlineHeart />
        </button>
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-sand/80">
              {location}
            </p>
            <h3 className="text-2xl font-semibold text-cream">{title}</h3>
          </div>
          <div className="rounded-full bg-cream px-4 py-2 text-sm font-semibold text-forest">
            ${price}
          </div>
        </div>
      </div>

      <div className="space-y-5 p-6">
        <div className="flex items-center gap-2 text-sm text-clay">
          <HiOutlineMapPin />
          <span className="font-medium">{location}</span>
        </div>

        <p className="line-clamp-3 text-sm leading-7 text-slate">{description}</p>

        <div className="flex items-center justify-between border-t border-sand-dark pt-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mist">
              Travel Style
            </p>
            <p className="mt-2 text-sm font-medium text-forest">{type}</p>
          </div>
          <button className="rounded-full border border-forest/15 px-4 py-2 text-sm font-semibold text-forest transition hover:bg-sand">
            View Escape
          </button>
        </div>
      </div>
    </article>
  );
};

export default PlaceCard;
