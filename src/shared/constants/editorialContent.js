import Img1 from "../../assets/places/tajmahal.jpg";
import Img2 from "../../assets/places/water.jpg";
import Img3 from "../../assets/places/boat.jpg";

export const BLOGS_DATA = [
  {
    id: 1,
    image: Img1,
    title: "How to experience India beyond the postcard spots",
    description:
      "A warmer, slower way to travel through iconic cities with better local context, softer itineraries, and memorable stays.",
    author: "Aarav Menon",
    date: "April 22, 2026",
    category: "Destination Notes",
    body: [
      "The best trips rarely come from collecting landmarks as fast as possible. They come from slowing down enough to notice neighborhoods, routines, and local rhythms that never fit neatly into a postcard.",
      "A stronger India itinerary often means fewer check-ins, more time with a knowledgeable local guide, and a better balance between iconic stops and quieter experiences that actually stay with you.",
      "That is where thoughtful planning matters. The right local context can turn a famous destination from something crowded and expected into something textured, human, and memorable.",
    ],
  },
  {
    id: 2,
    image: Img2,
    title: "What makes a guide-led island trip feel truly effortless",
    description:
      "From transfers and timing to the best local food stops, here is how great planning turns a beach holiday into something richer.",
    author: "Mila Ross",
    date: "May 03, 2026",
    category: "Planning Ideas",
    body: [
      "Island travel feels luxurious when the awkward parts disappear. Reliable transfers, local timing, and a guide who knows what to skip often matter more than adding more activities to the itinerary.",
      "The most effortless trips build in breathing room. That means knowing when to leave space for weather, when to book the boat early, and where to eat without sending travelers into tourist-trap guesswork.",
      "A well-guided island stay feels calm because the decisions are already clearer. Travelers can focus on the setting instead of managing logistics all day.",
    ],
  },
  {
    id: 3,
    image: Img3,
    title: "Planning a slower luxury trip without overpacking the itinerary",
    description:
      "A practical framework for balancing signature experiences, good hotels, and actual breathing room in your travel calendar.",
    author: "Ritika Shah",
    date: "May 18, 2026",
    category: "Luxury Travel",
    body: [
      "Luxury is not just about better hotels. It is also about pace, comfort, and enough room in the day for a trip to feel graceful rather than exhausting.",
      "A slower trip often works better when each day has one anchor experience instead of three competing highlights. That keeps energy higher and gives the destination a chance to feel lived in rather than consumed.",
      "The strongest premium itineraries trade volume for quality. Fewer rushed moves, stronger local curation, and more intentional downtime usually create a much better traveler memory.",
    ],
  },
];

export const ABOUT_CONTENT = {
  eyebrow: "About Travellgo",
  title: "Building a calmer way to discover places through local insight.",
  body:
    "Travellgo is designed around a simple idea: travelers should find guides, trips, and planning support in one place without the experience feeling noisy or fragmented.",
  storyTitle: "Our journey",
  storyBody:
    "The product started from the belief that meaningful travel happens when local knowledge is easier to trust. Instead of treating travel like a list of transactions, the goal is to connect discovery, confidence, and human context in a more thoughtful flow.",
  founderTitle: "Meet the founder",
  founderName: "Shankar",
  founderBody:
    "Shankar built Travellgo to bring together technology, hospitality, and local expertise. The vision is to help travelers discover better experiences while giving guides a more credible place to present what they do best.",
  impactTitle: "Why the platform matters",
  impactCards: [
    {
      value: "Local-first",
      label: "A traveler journey shaped by guides and real destination context.",
    },
    {
      value: "Trust-led",
      label: "Verification, clearer flows, and calmer design improve confidence.",
    },
    {
      value: "Two-sided",
      label: "Built for both travelers booking trips and guides publishing them.",
    },
  ],
  contactTitle: "Get in touch",
  contactBody:
    "Whether you want to collaborate, ask questions, or explore how the platform is evolving, reach out here.",
  locationsTitle: "Our location",
  locationsBody:
    "The current repo points to a single embedded location map. If more office or guide hubs are added later, this section can expand easily.",
};

export const slugifyBlogTitle = (title = "") =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
