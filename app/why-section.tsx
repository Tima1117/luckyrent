"use client";

import Image from "next/image";
import { motion, animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export type WhyCopy = {
  eyebrow: string;
  title: string;
  route: { title: string; text: string; pins: [string, string, string] };
  tank: { title: string; text: string };
  docs: { title: string; items: [string, string, string] };
  chat: { title: string; msgs: [string, string, string] };
  stats: [[number, string, string], [number, string, string], [number, string, string]];
  cta: { title: string; text: string; btn: string; href: string };
};

const ROUTE = "M28 182 C 110 182, 140 118, 205 112 S 320 50, 372 30";

function Counter({ value, suffix, decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const mv = useMotionValue(0);
  const text = useTransform(mv, v => v.toFixed(decimals) + (suffix || ""));
  useEffect(() => {
    if (!inView) return;
    const c = animate(mv, value, { duration: 1.6, ease: "easeOut" });
    return () => c.stop();
  }, [inView, mv, value]);
  return <motion.span ref={ref}>{text}</motion.span>;
}

function RouteCard({ c }: { c: WhyCopy["route"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [pos, setPos] = useState({ x: 28, y: 182 });
  useEffect(() => {
    if (!inView || !pathRef.current) return;
    const p = pathRef.current; const L = p.getTotalLength();
    const c = animate(0, 1, { duration: 2.4, ease: "easeInOut", delay: 0.3, onUpdate: v => { const pt = p.getPointAtLength(v * L); setPos({ x: pt.x, y: pt.y }); } });
    return () => c.stop();
  }, [inView]);
  const pins: [number, number, string][] = [[28, 182, c.pins[0]], [205, 112, c.pins[1]], [372, 30, c.pins[2]]];
  return (
    <motion.div ref={ref} className="why-card why-route" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.6 }}>
      <Image src="/images/car-sonata.webp" alt="" fill sizes="(max-width: 960px) 100vw, 60vw" style={{ objectFit: "cover" }} />
      <div className="why-route-shade" />
      <svg viewBox="0 0 400 220" className="why-route-svg" aria-hidden>
        <path d={ROUTE} fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="2" strokeDasharray="5 9" />
        <motion.path ref={pathRef} d={ROUTE} fill="none" stroke="var(--accent)" strokeWidth="3.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 2.4, ease: "easeInOut", delay: 0.3 }} />
        {pins.map(([x, y, label], i) => (
          <motion.g key={label} initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.3 + i * 1.05, type: "spring", stiffness: 300, damping: 18 }} style={{ transformOrigin: `${x}px ${y}px` }}>
            <circle cx={x} cy={y} r="9" fill="var(--accent)" opacity=".25" />
            <circle cx={x} cy={y} r="4.5" fill="#fff" />
            <text x={x + (i === 2 ? -12 : 14)} y={y + (i === 2 ? 28 : 5)} textAnchor={i === 2 ? "end" : "start"} className="why-pin-label">{label}</text>
          </motion.g>
        ))}
        <g transform={`translate(${pos.x} ${pos.y})`}>
          <circle r="11" fill="var(--accent)" />
          <path d="M-5.5 1.5h11M-5.5 1.5a1.6 1.6 0 0 1-1.6-1.6v-2.2l1.9-3.9a1.6 1.6 0 0 1 1.4-.9h7.6a1.6 1.6 0 0 1 1.4.9l1.9 3.9v2.2a1.6 1.6 0 0 1-1.6 1.6M-4 1.5v1.6M4 1.5v1.6" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
      <div className="why-card-text">
        <h3>{c.title}</h3>
        <p>{c.text}</p>
      </div>
    </motion.div>
  );
}

function TankCard({ c }: { c: WhyCopy["tank"] }) {
  return (
    <motion.div className="why-card why-tank" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.6, delay: 0.1 }}>
      <div className="why-gauge">
        <svg viewBox="0 0 120 70" aria-hidden>
          <path d="M12 62 A48 48 0 0 1 108 62" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="10" strokeLinecap="round" />
          <motion.path d="M12 62 A48 48 0 0 1 108 62" fill="none" stroke="var(--accent)" strokeWidth="10" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }} />
          <text x="18" y="54" className="why-gauge-mark">E</text>
          <text x="96" y="54" className="why-gauge-mark">F</text>
        </svg>
        <div className="why-gauge-value"><Counter value={100} suffix="%" /></div>
      </div>
      <h3>{c.title}</h3>
      <p>{c.text}</p>
    </motion.div>
  );
}

function DocsCard({ c }: { c: WhyCopy["docs"] }) {
  return (
    <motion.div className="why-card why-docs" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.6, delay: 0.2 }}>
      <h3>{c.title}</h3>
      <ul>
        {c.items.map((it, i) => (
          <motion.li key={it} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.35, duration: 0.4 }}>
            <svg viewBox="0 0 24 24" aria-hidden><circle cx="12" cy="12" r="11" fill="var(--accent)" /><motion.path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 + i * 0.35, duration: 0.35 }} /></svg>
            <span>{it}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function ChatCard({ c }: { c: WhyCopy["chat"] }) {
  return (
    <motion.div className="why-card why-chat" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.6, delay: 0.3 }}>
      <h3>{c.title}</h3>
      <div className="chat">
        {c.msgs.map((m, i) => (
          <motion.div key={m} className={`bubble ${i === 1 ? "me" : ""}`} initial={{ opacity: 0, y: 10, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.6, duration: 0.35 }}>
            {m}{i === 1 && <span className="tick">✓✓</span>}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function WhySection({ c }: { c: WhyCopy }) {
  return (
    <section className="why" id="why">
      <div className="container">
        <div className="section-head">
          <div><p className="eyebrow">{c.eyebrow}</p><h2 className="section-title light">{c.title}</h2></div>
        </div>
        <div className="bento">
          <RouteCard c={c.route} />
          <TankCard c={c.tank} />
          <DocsCard c={c.docs} />
          <ChatCard c={c.chat} />
          <motion.div className="why-card why-stats" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.6, delay: 0.35 }}>
            {c.stats.map(([v, suffix, label], i) => (
              <div key={label} className="stat">
                <b><Counter value={v} suffix={suffix} decimals={i === 0 ? 1 : 0} /></b>
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
          <motion.div className="why-card why-cta" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.6, delay: 0.4 }}>
            <div>
              <h3>{c.cta.title}</h3>
              <p>{c.cta.text}</p>
            </div>
            <a className="btn btn-wa" href={c.cta.href} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
              {c.cta.btn}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
