"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchBar } from "@/components/shop/SearchBar";
import {
    ShoppingBag,
    LayoutDashboard,
    History,
    Wallet,
    Shield,
    Search
} from "lucide-react";
import { motion } from "framer-motion";

export function Header() {
    const pathname = usePathname();

    const navItems = [
        { name: "Shop", href: "/products", icon: ShoppingBag },
        { name: "Approvals", href: "/approvals", icon: Shield, badge: true },
        { name: "Audit", href: "/audit", icon: History },
        { name: "Cart", href: "/cart", icon: ShoppingBag },
    ];

    return (
        <header className="sticky top-0 z-[100] w-full border-b border-white/5 bg-slate-950/60 backdrop-blur-2xl">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between gap-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-4 group shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center font-black text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-transform group-hover:scale-110">
                        A
                    </div>
                    <div className="hidden lg:block">
                        <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 uppercase tracking-tighter">
                            AutonoMarket
                        </span>
                        <div className="h-0.5 w-0 group-hover:w-full bg-blue-500 transition-all duration-300" />
                    </div>
                </Link>

                {/* Search - Desktop */}
                <div className="hidden md:flex flex-1 max-w-2xl">
                    <SearchBar />
                </div>

                {/* Navigation */}
                <nav className="flex items-center gap-2 lg:gap-8">
                    <div className="hidden lg:flex items-center gap-6">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative px-3 py-2 text-sm font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${isActive ? 'text-white' : 'text-slate-500 hover:text-white'
                                        }`}
                                >
                                    <item.icon size={16} className={isActive ? 'text-blue-400' : ''} />
                                    {item.name}
                                    {item.badge && (
                                        <span className="flex h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                                    )}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute -bottom-[26px] left-0 right-0 h-1 bg-blue-500 rounded-t-full shadow-[0_0_15px_#3b82f6]"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="w-px h-8 bg-white/5 hidden lg:block"></div>

                    <button className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black text-xs uppercase tracking-widest transition-all group active:scale-95 shadow-xl">
                        <Wallet size={16} className="text-blue-400 group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">Connect Wallet</span>
                    </button>
                </nav>
            </div>
        </header>
    );
}
