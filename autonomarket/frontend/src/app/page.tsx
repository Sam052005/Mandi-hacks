"use client";
import React from "react";
import { ProductCard } from '@/components/shop/ProductCard';
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Shield, Cpu } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-48 px-6 overflow-hidden">
        {/* Animated Background Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] -z-10"
        />

        <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 glass bg-white/5 text-xs font-black uppercase tracking-[0.2em] text-blue-400"
          >
            <Sparkles size={14} /> The Future of Agentic Commerce
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-7xl md:text-9xl font-black tracking-tighter text-white leading-[0.9]"
          >
            Agentic Market<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400">
              With Governance
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-slate-400 max-w-2xl font-medium leading-relaxed"
          >
            Meet the first marketplace where AI agents don't just find products—they negotiate, route, and execute, while critical decisions escalate to your human oversight.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 pt-4"
          >
            <Link href="/products" className="group px-10 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-sm flex items-center gap-3 hover:bg-blue-500 hover:text-white transition-all overflow-hidden relative">
              Launch Catalog <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-blue-600 translate-x-full group-hover:translate-x-0 transition-transform -z-10" />
            </Link>
            <button className="px-10 py-5 rounded-2xl border border-white/10 glass hover:bg-white/5 text-white font-black uppercase tracking-widest text-sm transition-all active:scale-95">
              Whitepaper v.01
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="relative px-6 pb-32">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 border-b border-white/5 pb-12">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-white glow-text">Featured Intelligence</h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest flex items-center gap-3">
                <Cpu size={18} className="text-blue-500" /> Real-time Negotiation Protocol
              </p>
            </div>
            <Link href="/products" className="group flex items-center gap-4 text-slate-400 font-black uppercase tracking-widest text-xs hover:text-white transition-colors">
              Browse Discovery Feed <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500 transition-colors"><ArrowRight size={16} /></div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <ProductCard
              id={1}
              name="Sony WH-1000XM5 ANC"
              description="Industry leading noise canceling headphones. Two processors control 8 microphones for unprecedented noise cancellation."
              price={29999}
            />
            <ProductCard
              id={2}
              name="Apple MacBook Air M3"
              description="Supercharged by M3, the MacBook Air is light and powerful. Perfect for portable performance."
              price={114900}
            />
            <ProductCard
              id={3}
              name="Keychron Q1 Pro"
              description="A fully customizable 75% layout custom mechanical keyboard featuring QMK/VIA support."
              price={16500}
            />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-6 border-t border-white/5 bg-slate-900/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Agentic Discovery", desc: "LLM-driven semantic matching across global catalogs.", icon: Zap },
            { title: "Smart Escrow", desc: "Funds secured in WUSD until delivery verified.", icon: Shield },
            { title: "Human Governance", desc: "Cerebrum HITL ensures zero runaway autonomous spending.", icon: Cpu }
          ].map((item, i) => (
            <div key={i} className="space-y-4 p-8 rounded-3xl glass border-white/5 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <item.icon size={30} />
              </div>
              <h4 className="text-xl font-black text-white">{item.title}</h4>
              <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
