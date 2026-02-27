"use client";
import Link from 'next/link';

const MOCK_CART = [
    {
        id: 1,
        name: "Sony WH-1000XM5 Wireless Headphones",
        price: 29999,
        quantity: 1,
        agent_status: "Negotiated (-10%)",
    }
];

export default function CartPage() {
    const total = MOCK_CART.reduce((acc, item) => acc + item.price, 0);
    const negotiatedTotal = total * 0.9;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 w-full flex-1">
            <h1 className="text-3xl font-bold text-white mb-8">Your Shopping Cart</h1>

            <div className="grid gap-8">
                <div className="space-y-4">
                    {MOCK_CART.map((item) => (
                        <div key={item.id} className="p-6 rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-md flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center text-xs text-gray-500">Img</div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                                        {item.agent_status}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-bold text-white">₹{item.price.toLocaleString()}</div>
                                <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-6 rounded-xl border border-gray-800 bg-gray-950/80 backdrop-blur-xl space-y-4 shadow-2xl">
                    <div className="flex justify-between text-gray-400">
                        <span>Subtotal</span>
                        <span>₹{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-emerald-400 text-sm">
                        <span>Agent Negotiation Savings</span>
                        <span>- ₹{(total - negotiatedTotal).toLocaleString()}</span>
                    </div>
                    <div className="h-px bg-gray-800"></div>
                    <div className="flex justify-between text-xl font-bold text-white">
                        <span>Total</span>
                        <span>₹{negotiatedTotal.toLocaleString()}</span>
                    </div>

                    <Link
                        href="/checkout"
                        className="block w-full text-center px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 mt-4"
                    >
                        Proceed to Checkout
                    </Link>
                    <p className="text-center text-xs text-gray-500 pt-2">
                        Settlement via Weilchain WUSD Stablecoin
                    </p>
                </div>
            </div>
        </div>
    );
}
