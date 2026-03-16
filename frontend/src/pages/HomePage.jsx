import { Link } from 'react-router-dom';
import { ArrowRight, Clock, ShieldCheck, Zap } from 'lucide-react';

const HomePage = () => {
    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center px-12 overflow-hidden bg-slate-50">
                <div className="relative z-10 max-w-3xl">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm mb-6">
                        <Zap h-4 w-4 />
                        Powered by Advanced AI Prediction
                    </div>
                    <h1 className="text-7xl font-black text-secondary leading-[1.1] mb-8">
                        Precision Food <br />
                        <span className="text-primary italic">Delivery.</span> Reimagined.
                    </h1>
                    <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-xl">
                        Schedule your meals and get hyper-accurate ETAs. 
                        No more guessing game, just delicious food exactly when you want it.
                    </p>
                    <div className="flex gap-4">
                        <Link to="/register" className="group flex items-center gap-3 bg-secondary text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-primary transition-all shadow-xl shadow-secondary/20">
                            Get Started Now
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/login" className="px-8 py-5 rounded-2xl font-bold text-lg border-2 border-slate-200 hover:border-primary transition-all">
                            View Restaurants
                        </Link>
                    </div>
                </div>

                {/* Decorative Elements ??$$$ */}
                <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-0"></div>
                <div className="absolute bottom-0 right-20 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] -z-0"></div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-12 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="p-10 rounded-[40px] bg-slate-50 hover:bg-primary/5 transition-colors border border-slate-100 group">
                        <div className="bg-white p-4 rounded-2xl w-fit shadow-lg mb-8 group-hover:scale-110 transition-transform">
                            <Clock className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Hyper-Accurate ETA</h3>
                        <p className="text-slate-500 leading-relaxed font-medium">
                            Our AI model processes real-time traffic, weather, and historical data to tell you EXACTLY when your food arrives.
                        </p>
                    </div>

                    <div className="p-10 rounded-[40px] bg-slate-50 hover:bg-primary/5 transition-colors border border-slate-100 group">
                        <div className="bg-white p-4 rounded-2xl w-fit shadow-lg mb-8 group-hover:scale-110 transition-transform">
                            <Zap className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Scheduled Orders</h3>
                        <p className="text-slate-500 leading-relaxed font-medium">
                            Plan your day with precision. Order now and schedule your delivery for anytime, 24/7.
                        </p>
                    </div>

                    <div className="p-10 rounded-[40px] bg-slate-50 hover:bg-primary/5 transition-colors border border-slate-100 group">
                        <div className="bg-white p-4 rounded-2xl w-fit shadow-lg mb-8 group-hover:scale-110 transition-transform">
                            <ShieldCheck className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Secure & Reliable</h3>
                        <p className="text-slate-500 leading-relaxed font-medium">
                            Built with industry-standard encryption and a robust database design to ensure your orders are always on track.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
