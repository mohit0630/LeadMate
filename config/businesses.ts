// ============================================
// LEADMATE — BUSINESS CONFIG
// ============================================
// To add a new client, just add a new object
// to this array. Nothing else needs to change.
// ============================================

export interface Business {
  id: string;           // unique slug, no spaces
  name: string;         // display name
  type: string;         // business category
  emoji: string;        // for UI
  color: string;        // accent color (hex)
  phone: string;        // whatsapp number (masked)
  hours: string;        // working hours
  services: string;     // services & pricing
  location: string;     // city / area
  extra: string;        // any extra info the agent should know
}

const businesses: Business[] = [
  // ── DEMO BUSINESSES (keep these for the landing page demo) ──
  {
    id: "salon",
    name: "Sharp Cuts Salon",
    type: "Salon & Spa",
    emoji: "💇",
    color: "#25D366",
    phone: "+91 99832 XXXXX",
    hours: "Mon–Sat, 10AM–8PM",
    services: "Haircut ₹300–600 | Highlights ₹1500+ | Smoothening ₹2500+ | Facial ₹800 | Manicure ₹400",
    location: "Gurgaon",
    extra: "Walk-ins welcome. Advance booking preferred on weekends. Slots available: 11AM, 2PM, 4:30PM.",
  },
  {
    id: "clinic",
    name: "Dr. Mehta's Clinic",
    type: "Healthcare",
    emoji: "🏥",
    color: "#4A9EFF",
    phone: "+91 99832 XXXXX",
    hours: "Mon–Sat, 9AM–6PM",
    services: "General Consultation ₹300 | Health Checkup ₹999+ | Blood Tests available",
    location: "Delhi",
    extra: "Doctor available by appointment. Emergency slots available on call.",
  },
  {
    id: "restaurant",
    name: "Zest Kitchen",
    type: "Restaurant",
    emoji: "🍛",
    color: "#FF8C42",
    phone: "+91 99832 XXXXX",
    hours: "Daily, 12PM–11PM",
    services: "North Indian & Chinese cuisine. Dal Makhani, Butter Chicken, Hakka Noodles. Delivery on Swiggy & Zomato.",
    location: "Jaipur",
    extra: "Dine-in capacity 40 covers. Party bookings accepted for 20+ people.",
  },
  {
    id: "coaching",
    name: "Apex Coaching Center",
    type: "Coaching Institute",
    emoji: "📚",
    color: "#A78BFA",
    phone: "+91 99832 XXXXX",
    hours: "Morning 7AM–10AM | Evening 5PM–8PM",
    services: "JEE/NEET Coaching ₹45,000/year | Demo class free | Study material included",
    location: "Bhiwadi",
    extra: "Batches starting every month. Scholarship available for meritorious students.",
  },

  // ── ADD YOUR REAL CLIENTS BELOW ──
  // {
  //   id: "client1",
  //   name: "Client Business Name",
  //   type: "Business Type",
  //   emoji: "🏪",
  //   color: "#25D366",
  //   phone: "+91 99832 XXXXX",
  //   hours: "Mon–Sat, 10AM–7PM",
  //   services: "Service 1 ₹X | Service 2 ₹Y",
  //   location: "City",
  //   extra: "Any extra info the AI should know about this business.",
  // },
];

export default businesses;

// ── HELPER: build AI system prompt from business config ──
export function buildPrompt(biz: Business): string {
  return `You are the WhatsApp AI agent for ${biz.name}, a ${biz.type} based in ${biz.location}.

Business hours: ${biz.hours}
Services & pricing: ${biz.services}
Additional info: ${biz.extra}

Instructions:
- Reply in 2-3 short sentences maximum
- Be friendly, warm, and professional
- Always answer in the same language the customer uses (Hindi or English)
- If you don't know something, say: "Let me connect you with our team!"
- Never make up prices or services not listed above
- If asked for booking, ask for their preferred time and name`;
}
