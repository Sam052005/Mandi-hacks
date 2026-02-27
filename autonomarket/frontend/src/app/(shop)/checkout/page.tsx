"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
    const [step, setStep] = useState(1);

    return (
        <div className="max-w-3xl mx-auto px-4 py-12 w-full flex-1">
            <div className="mb-12">
                <h1 className="text-3xl font-bold text-white mb-2">Checkout</h1>
                <div className="flex items-center gap-4 text-sm">
                    <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-400' : 'text-gray-500'}`}>
                        <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-bold text-xs">1</span>
                        Review
                    </div>
                    <div className="w-12 h-px bg-gray-800"></div>
                    <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-400' : 'text-gray-500'}`}>
                        <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-bold text-xs">2</span>
                        Payment
                    </div>
                    <div className="w-12 h-px bg-gray-800"></div>
                    <div className={`flex items-center gap-2 ${step >= 3 ? 'text-blue-400' : 'text-gray-500'}`}>
                        <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-bold text-xs">3</span>
                        Confirmation
                    </div>
                </div>
            </div>

            <div className="p-8 rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-md shadow-2xl">
                {step === 1 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white">Order Summary</h2>
                        <div className="p-4 rounded-lg bg-gray-950/50 border border-gray-800 flex justify-between">
                            <span>Sony WH-1000XM5</span>
                            <span>₹103,410 (Negotiated)</span>
                        </div>
                        <button
                            onClick={() => setStep(2)}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all"
                        >
                            Continue to Payment
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 text-center">
                        <h2 className="text-xl font-semibold text-white">Settlement</h2>
                        <div className="p-8 rounded-xl bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border border-blue-500/20 flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="2"></path></svg>
                            </div>
                            <div>
                                <p className="text-gray-300 font-medium">Weilchain WUSD Escrow</p>
                                <p className="text-xs text-gray-500">Secure settlement with automated agent audit</p>
                            </div>
                        </div>
                        <div className="text-sm text-gray-400">
                            Connected Wallet: <span className="text-mono text-white">0x71C...4920</span>
                        </div>
                        <button
                            onClick={() => setStep(3)}
                            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all"
                        >
                            Authorize Escrow Deposit
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6 text-center animate-in zoom-in-95 duration-500">
                        <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 mx-auto">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white">Escrow Secured!</h2>
                        <p className="text-gray-400">
                            Your funds are held in the Weilchain Escrow. The Discovery agent is coordinating with the supplier for delivery.
                        </p>
                        <div className="p-4 rounded-lg bg-gray-950/50 border border-gray-800 text-xs text-left font-mono">
                            <p className="text-emerald-500"># TX: 0x82f...a10b</p>
                            <p className="text-gray-500"># Audit Hash: 92fa...11ee</p>
                        </div>
                        <Link
                            href="/audit"
                            className="block w-full py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition-all"
                        >
                            View Transaction Audit Trail
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
