"use client";
import { useState } from "react";

const MOCK_APPROVALS = [
    {
        id: 1,
        order_id: 101,
        product_name: "Apple MacBook Air M3",
        supplier_id: 12,
        amount: 114900.0,
        status: "PENDING",
        risk_score: "High",
        reason: "Transaction value exceeds auto-approval threshold."
    },
    {
        id: 2,
        order_id: 102,
        product_name: "Bulk Order: Keychron Keyboards x50",
        supplier_id: 8,
        amount: 825000.0,
        status: "PENDING",
        risk_score: "Critical",
        reason: "New supplier, first transaction over 500k."
    }
];

export default function ApprovalsPage() {
    const [approvals, setApprovals] = useState(MOCK_APPROVALS);

    const handleAction = (id: number, action: 'approve' | 'reject') => {
        setApprovals(approvals.filter(a => a.id !== id));
        // In a real app, this would hit POST /api/v1/approvals/{id}/action
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-12 w-full flex-1">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Governance Dashboard</h1>
                    <p className="text-gray-400">Review and authorize agent-negotiated transactions.</p>
                </div>
                <div className="px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                    Live Feed Active
                </div>
            </div>

            {approvals.length === 0 ? (
                <div className="p-12 text-center rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-md">
                    <p className="text-gray-400">No pending approvals at this time.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {approvals.map((approval) => (
                        <div key={approval.id} className="p-6 rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-md shadow-xl flex flex-col md:flex-row gap-6">
                            <div className="flex-1 space-y-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">{approval.product_name}</h3>
                                        <p className="text-sm text-gray-400 mt-1">Order #{approval.order_id} • Supplier #{approval.supplier_id}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold font-mono text-white">₹{approval.amount.toLocaleString()}</div>
                                        <span className="inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full bg-red-500/20 text-red-400 border border-red-500/20">
                                            {approval.risk_score} Risk
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4 rounded-lg bg-gray-950/50 border border-gray-800">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1 block">Agent Reasoning</span>
                                    <p className="text-sm text-gray-300">{approval.reason}</p>
                                </div>
                            </div>

                            <div className="flex md:flex-col gap-3 justify-end md:w-48 border-t md:border-t-0 md:border-l border-gray-800 pt-4 md:pt-0 md:pl-6">
                                <button
                                    onClick={() => handleAction(approval.id, 'approve')}
                                    className="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleAction(approval.id, 'reject')}
                                    className="flex-1 px-4 py-3 bg-transparent border border-gray-700 hover:border-red-500 text-red-400 hover:bg-red-500/10 font-medium rounded-lg transition-all"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
