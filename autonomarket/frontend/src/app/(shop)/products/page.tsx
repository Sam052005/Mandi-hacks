import { ProductCard } from '@/components/shop/ProductCard';

export default function ProductsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 w-full flex-1">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-2">
                        AI-Curated Catalog
                    </h1>
                    <p className="text-gray-400">Discover and negotiate the best deals autonomously.</p>
                </div>

                <div className="flex bg-gray-900 border border-gray-800 rounded-lg p-1">
                    <button className="px-4 py-2 text-sm text-white bg-gray-800 rounded-md shadow">All</button>
                    <button className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">Tech</button>
                    <button className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">Hardware</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <ProductCard
                    id={1}
                    name="Sony WH-1000XM5 Wireless Headphones"
                    description="Industry leading noise canceling headphones. Two processors control 8 microphones for unprecedented noise cancellation."
                    price={29999}
                />
                <ProductCard
                    id={2}
                    name="Apple MacBook Air M3"
                    description="Supercharged by M3, the MacBook Air is light and powerful."
                    price={114900}
                />
                <ProductCard
                    id={3}
                    name="Keychron Q1 Pro Mechanical Keyboard"
                    description="A fully customizable 75% layout custom mechanical keyboard featuring QMK/VIA support."
                    price={16500}
                />
                <ProductCard
                    id={4}
                    name="LG 27GP850-B Ultragear Gaming Monitor"
                    description="27 Inch QHD (2560 x 1440) Nano IPS Display, 165Hz Refresh Rate."
                    price={35000}
                />
                <ProductCard
                    id={5}
                    name="Logitech MX Master 3S"
                    description="Advanced Wireless Mouse with Ultrafast Scrolling, Ergonomic Design."
                    price={8900}
                />
            </div>
        </div>
    );
}
