"use client";
import { useState, useRef, useEffect } from "react";

const BUSINESSES = [
  { id: "salon", label: "Salon", emoji: "💇", name: "Sharp Cuts Salon", color: "#25D366", context: "You are the AI agent for Sharp Cuts Salon, a premium unisex salon in India. Services: Haircut ₹300-600, Highlights ₹1500+, Smoothening ₹2500+, Facial ₹800, Manicure ₹400. Hours: Mon-Sat 10AM-8PM. Slots available: 11AM, 2PM, 4:30PM on weekends. Be friendly, warm, answer in 2-3 short sentences max. If you don't know, say 'Let me connect you with our team!'" },
  { id: "clinic", label: "Clinic", emoji: "🏥", name: "Dr. Mehta's Clinic", color: "#4A9EFF", context: "You are the AI agent for Dr. Mehta's Clinic, a general physician clinic in India. Services: Consultation ₹300, Health checkup packages from ₹999. Hours: Mon-Sat 9AM-6PM. Doctor available by appointment. Be professional, empathetic, answer in 2-3 short sentences. If you don't know, say 'Let me connect you with our team!'" },
  { id: "restaurant", label: "Restaurant", emoji: "🍛", name: "Zest Kitchen", color: "#FF8C42", context: "You are the AI agent for Zest Kitchen, a North Indian and Chinese restaurant in India. Hours: 12PM-11PM daily. Delivery on Swiggy & Zomato. Dine-in available, 40 covers. Popular dishes: Dal Makhani, Butter Chicken, Hakka Noodles. Be warm, foodie-friendly, answer in 2-3 short sentences. If you don't know, say 'Let me connect you with our team!'" },
  { id: "coaching", label: "Coaching", emoji: "📚", name: "Apex Coaching Center", color: "#A78BFA", context: "You are the AI agent for Apex Coaching Center, a JEE/NEET coaching institute in India. Batches: Morning 7AM-10AM, Evening 5PM-8PM. Fee: ₹45,000/year. Demo class available on request. Be encouraging, student-friendly, answer in 2-3 short sentences. If you don't know, say 'Let me connect you with our team!'" },
];

type Message = { role: "user" | "bot"; text: string; time: string };

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function Home() {
  const [activeBiz, setActiveBiz] = useState(BUSINESSES[0]);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: `Hi! Welcome to ${BUSINESSES[0].name} 👋 How can I help you today?`, time: getTime() }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const switchBiz = (biz: typeof BUSINESSES[0]) => {
    setActiveBiz(biz);
    setMessages([{ role: "bot", text: `Hi! Welcome to ${biz.name} 👋 How can I help you today?`, time: getTime() }]);
    setInput("");
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg, time: getTime() }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, context: activeBiz.context }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "bot", text: data.reply, time: getTime() }]);
    } catch {
      setMessages(prev => [...prev, { role: "bot", text: "Let me connect you with our team!", time: getTime() }]);
    }
    setLoading(false);
  };

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{ borderBottom: "0.5px solid var(--border)", padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "rgba(8,8,8,0.9)", backdropFilter: "blur(12px)", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: 32, height: 32, background: "var(--green)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#000"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.07-1.35C8.46 21.51 10.19 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.64 13.5c-.2.55-1.15 1.05-1.59 1.11-.41.06-.93.08-1.5-.1-.35-.11-.8-.26-1.37-.51-2.41-1.04-3.98-3.47-4.1-3.63-.12-.16-.97-1.29-.97-2.46 0-1.17.61-1.75.83-1.99.22-.24.48-.3.64-.3h.46c.15 0 .35-.06.54.41.2.49.68 1.68.74 1.8.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.24.25-.1.49.14.24.61 1.01 1.31 1.64.9.8 1.66 1.05 1.9 1.17.24.12.38.1.52-.06.14-.16.58-.68.74-.91.16-.23.32-.19.54-.11.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.14 1.13z"/></svg>
          </div>
          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, color: "var(--text)" }}>LeadMate</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <a href="#demo" style={{ padding: "8px 18px", fontSize: 13, color: "var(--muted)", textDecoration: "none", borderRadius: 8, border: "0.5px solid var(--border2)", transition: "all 0.15s" }}>Live Demo</a>
          <a href="#contact" style={{ padding: "8px 18px", fontSize: 13, color: "#000", background: "var(--green)", textDecoration: "none", borderRadius: 8, fontWeight: 500 }}>Get Started</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "100px 40px 80px", maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--green-glow)", border: "0.5px solid rgba(37,211,102,0.25)", borderRadius: 20, padding: "6px 16px", marginBottom: 32, fontSize: 12, color: "var(--green)" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--green)", display: "inline-block", boxShadow: "0 0 8px var(--green)" }}></span>
          AI-powered · Works on WhatsApp · Made for India
        </div>
        <h1 style={{ fontSize: "clamp(42px, 7vw, 80px)", fontWeight: 800, lineHeight: 1.05, marginBottom: 24, letterSpacing: "-2px" }}>
          Never miss a<br />
          <span style={{ color: "var(--green)" }}>customer</span> again.
        </h1>
        <p style={{ fontSize: 18, color: "var(--muted)", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.7 }}>
          LeadMate is an AI agent that handles your WhatsApp customer queries 24/7 — bookings, FAQs, pricing — all in your brand's voice.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#demo" style={{ padding: "14px 32px", background: "var(--green)", color: "#000", borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: "none", fontFamily: "Syne, sans-serif" }}>Try the demo →</a>
          <a href="#how" style={{ padding: "14px 32px", border: "0.5px solid var(--border2)", color: "var(--text)", borderRadius: 10, fontSize: 15, textDecoration: "none" }}>How it works</a>
        </div>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 600, margin: "64px auto 0", textAlign: "center" }}>
          {[
            { val: "24/7", label: "Always online" },
            { val: "<2s", label: "Reply time" },
            { val: "0", label: "Missed leads" },
          ].map(s => (
            <div key={s.val} style={{ padding: "20px 16px", background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: 12 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "var(--green)", fontFamily: "Syne, sans-serif" }}>{s.val}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 12, color: "var(--green)", letterSpacing: "0.1em", marginBottom: 12, textTransform: "uppercase" }}>Live Demo</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, letterSpacing: "-1px", marginBottom: 12 }}>Talk to a real AI agent</h2>
          <p style={{ color: "var(--muted)", fontSize: 15 }}>Pick a business type and send a message. This is exactly what your customers will experience.</p>
        </div>

        {/* Business switcher */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 24, flexWrap: "wrap" }}>
          {BUSINESSES.map(biz => (
            <button key={biz.id} onClick={() => switchBiz(biz)}
              style={{ padding: "8px 18px", borderRadius: 8, border: `0.5px solid ${activeBiz.id === biz.id ? biz.color : "var(--border2)"}`, background: activeBiz.id === biz.id ? `${biz.color}18` : "var(--surface)", color: activeBiz.id === biz.id ? biz.color : "var(--muted)", cursor: "pointer", fontSize: 13, fontFamily: "DM Sans, sans-serif", fontWeight: activeBiz.id === biz.id ? 500 : 400, transition: "all 0.15s" }}>
              {biz.emoji} {biz.label}
            </button>
          ))}
        </div>

        {/* WhatsApp-style chat */}
        <div style={{ background: "var(--surface)", border: "0.5px solid var(--border2)", borderRadius: 16, overflow: "hidden", maxWidth: 560, margin: "0 auto", boxShadow: "0 40px 80px rgba(0,0,0,0.4)" }}>
          {/* Chat header */}
          <div style={{ padding: "14px 18px", background: "var(--surface2)", borderBottom: "0.5px solid var(--border)", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: `${activeBiz.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{activeBiz.emoji}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{activeBiz.name}</div>
              <div style={{ fontSize: 11, color: "var(--green)", display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", display: "inline-block", boxShadow: "0 0 6px var(--green)" }}></span>
                AI Agent · Online
              </div>
            </div>
            <div style={{ marginLeft: "auto", fontSize: 11, color: "var(--muted)" }}>WhatsApp</div>
          </div>

          {/* Messages */}
          <div style={{ height: 320, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10, background: "#0d1117" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ maxWidth: "75%", alignSelf: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ padding: "10px 14px", borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px", background: msg.role === "user" ? "#1f3d2a" : "var(--surface)", border: msg.role === "bot" ? "0.5px solid var(--border)" : "none", fontSize: 13, lineHeight: 1.6, color: msg.role === "user" ? "#d4f5e2" : "var(--text)" }}>
                  {msg.text}
                </div>
                <div style={{ fontSize: 10, color: "var(--muted2)", marginTop: 3, textAlign: msg.role === "user" ? "right" : "left", paddingInline: 4 }}>{msg.time}</div>
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: "flex-start", padding: "10px 14px", background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: "12px 12px 12px 2px", display: "flex", gap: 4, alignItems: "center" }}>
                {[0, 0.2, 0.4].map((d, i) => (
                  <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--muted)", display: "inline-block", animation: `pulse 1.2s ${d}s infinite` }}></span>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "12px 14px", borderTop: "0.5px solid var(--border)", display: "flex", gap: 8, background: "var(--surface2)" }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Type a customer message..."
              style={{ flex: 1, background: "var(--surface)", border: "0.5px solid var(--border2)", borderRadius: 8, padding: "9px 14px", fontSize: 13, color: "var(--text)", fontFamily: "DM Sans, sans-serif", outline: "none" }} />
            <button onClick={sendMessage} disabled={loading || !input.trim()}
              style={{ width: 38, height: 38, background: "var(--green)", border: "none", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: loading || !input.trim() ? 0.5 : 1, transition: "opacity 0.15s" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#000"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "var(--muted2)", marginTop: 16 }}>This is a live AI — responses are real, not scripted.</p>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: "80px 40px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontSize: 12, color: "var(--green)", letterSpacing: "0.1em", marginBottom: 12, textTransform: "uppercase" }}>How it works</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, letterSpacing: "-1px" }}>Set up in 10 minutes</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {[
            { step: "01", title: "Tell us about your business", desc: "Business name, services, pricing, working hours — all in a simple form. No tech knowledge needed." },
            { step: "02", title: "We train your AI agent", desc: "Your LeadMate agent learns your business inside out. It speaks in your tone, knows your prices, handles your FAQs." },
            { step: "03", title: "Connect to WhatsApp", desc: "We connect the agent to your WhatsApp number. From that moment — every customer gets an instant reply." },
            { step: "04", title: "You track, we handle", desc: "Dashboard shows all conversations. You only step in when it's truly needed. Everything else — handled." },
          ].map(s => (
            <div key={s.step} style={{ padding: "24px", background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: 12 }}>
              <div style={{ fontSize: 11, color: "var(--green)", fontFamily: "DM Mono, monospace", marginBottom: 14, letterSpacing: "0.05em" }}>{s.step}</div>
              <div style={{ fontSize: 15, fontWeight: 600, fontFamily: "Syne, sans-serif", marginBottom: 8 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHO IS IT FOR */}
      <section style={{ padding: "60px 40px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 700, letterSpacing: "-1px", marginBottom: 8 }}>Built for Indian small businesses</h2>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>If your customers message you on WhatsApp, LeadMate is for you.</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
          {["Salons & Spas", "Clinics & Doctors", "Restaurants", "Coaching Centers", "Real Estate", "Travel Agents", "Gyms & Fitness", "Photography Studios", "Retail Shops", "Home Services"].map(tag => (
            <div key={tag} style={{ padding: "8px 16px", background: "var(--surface)", border: "0.5px solid var(--border2)", borderRadius: 20, fontSize: 13, color: "var(--muted)" }}>{tag}</div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 12, color: "var(--green)", letterSpacing: "0.1em", marginBottom: 12, textTransform: "uppercase" }}>Pricing</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, letterSpacing: "-1px" }}>Simple, honest pricing</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {[
            { name: "Starter", price: "₹2,499", period: "/month", features: ["1 WhatsApp number", "Up to 500 messages/mo", "Basic FAQ handling", "Email support"], highlight: false },
            { name: "Growth", price: "₹4,999", period: "/month", features: ["1 WhatsApp number", "Unlimited messages", "Booking management", "Dashboard analytics", "Priority support"], highlight: true },
          ].map(plan => (
            <div key={plan.name} style={{ padding: "28px", background: plan.highlight ? "var(--green-glow)" : "var(--surface)", border: `0.5px solid ${plan.highlight ? "rgba(37,211,102,0.3)" : "var(--border)"}`, borderRadius: 14, position: "relative" }}>
              {plan.highlight && <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: "var(--green)", color: "#000", fontSize: 10, fontWeight: 600, padding: "3px 12px", borderRadius: 10 }}>MOST POPULAR</div>}
              <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>{plan.name}</div>
              <div style={{ fontSize: 36, fontWeight: 700, fontFamily: "Syne, sans-serif", color: plan.highlight ? "var(--green)" : "var(--text)", marginBottom: 4 }}>{plan.price}<span style={{ fontSize: 14, fontWeight: 400, color: "var(--muted)" }}>{plan.period}</span></div>
              <div style={{ borderTop: "0.5px solid var(--border)", margin: "20px 0", paddingTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--muted)" }}>
                    <span style={{ color: "var(--green)", fontSize: 16 }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <a href="#contact" style={{ display: "block", textAlign: "center", padding: "11px", background: plan.highlight ? "var(--green)" : "transparent", border: `0.5px solid ${plan.highlight ? "var(--green)" : "var(--border2)"}`, borderRadius: 8, color: plan.highlight ? "#000" : "var(--text)", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>Get started</a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" style={{ padding: "80px 40px", maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, letterSpacing: "-1px", marginBottom: 16 }}>Ready to stop missing leads?</h2>
        <p style={{ color: "var(--muted)", fontSize: 15, marginBottom: 36, lineHeight: 1.7 }}>We set up your AI agent in 24 hours. No tech skills needed. Just fill out the form and we handle everything.</p>
        <div style={{ background: "var(--surface)", border: "0.5px solid var(--border2)", borderRadius: 14, padding: 28, textAlign: "left" }}>
          {[
            { label: "Business name", placeholder: "Sharp Cuts Salon" },
            { label: "Your WhatsApp number", placeholder: "+91 98765 43210" },
            { label: "Business type", placeholder: "Salon / Clinic / Restaurant..." },
          ].map(f => (
            <div key={f.label} style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>{f.label}</label>
              <input placeholder={f.placeholder} style={{ width: "100%", background: "var(--surface2)", border: "0.5px solid var(--border2)", borderRadius: 8, padding: "10px 14px", fontSize: 14, color: "var(--text)", fontFamily: "DM Sans, sans-serif", outline: "none" }} />
            </div>
          ))}
          <button style={{ width: "100%", padding: "13px", background: "var(--green)", border: "none", borderRadius: 8, color: "#000", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "Syne, sans-serif", marginTop: 4 }}>
            Set up my AI agent →
          </button>
          <p style={{ fontSize: 11, color: "var(--muted2)", textAlign: "center", marginTop: 12 }}>We'll reach out within 24 hours. No spam, ever.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "0.5px solid var(--border)", padding: "24px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15 }}>
          <div style={{ width: 24, height: 24, background: "var(--green)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#000"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.07-1.35C8.46 21.51 10.19 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.64 13.5c-.2.55-1.15 1.05-1.59 1.11-.41.06-.93.08-1.5-.1-.35-.11-.8-.26-1.37-.51-2.41-1.04-3.98-3.47-4.1-3.63-.12-.16-.97-1.29-.97-2.46 0-1.17.61-1.75.83-1.99.22-.24.48-.3.64-.3h.46c.15 0 .35-.06.54.41.2.49.68 1.68.74 1.8.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.24.25-.1.49.14.24.61 1.01 1.31 1.64.9.8 1.66 1.05 1.9 1.17.24.12.38.1.52-.06.14-.16.58-.68.74-.91.16-.23.32-.19.54-.11.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.14 1.13z"/></svg>
          </div>
          LeadMate
        </div>
        <div style={{ fontSize: 12, color: "var(--muted2)" }}>© 2025 LeadMate. Built for Indian businesses.</div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </main>
  );
}
