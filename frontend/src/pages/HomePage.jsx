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
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col items-center mb-16">
                        <h2 className="text-4xl font-black text-secondary mb-4">Why Choose DeliverEase?</h2>
                        <div className="h-1.5 w-24 bg-primary rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="p-10 rounded-[40px] bg-slate-50 hover:bg-white hover:premium-shadow transition-all border border-slate-100 group">
                            <div className="bg-white p-4 rounded-2xl w-fit shadow-lg mb-8 group-hover:scale-110 transition-transform">
                                <Clock className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Hyper-Accurate ETA</h3>
                            <p className="text-slate-500 leading-relaxed font-medium">
                                Our AI model processes real-time traffic, weather, and historical data to tell you EXACTLY when your food arrives.
                            </p>
                        </div>

                        <div className="p-10 rounded-[40px] bg-slate-50 hover:bg-white hover:premium-shadow transition-all border border-slate-100 group">
                            <div className="bg-white p-4 rounded-2xl w-fit shadow-lg mb-8 group-hover:scale-110 transition-transform">
                                <Zap className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Scheduled Orders</h3>
                            <p className="text-slate-500 leading-relaxed font-medium">
                                Plan your day with precision. Order now and schedule your delivery for anytime, 24/7.
                            </p>
                        </div>

                        <div className="p-10 rounded-[40px] bg-slate-50 hover:bg-white hover:premium-shadow transition-all border border-slate-100 group">
                            <div className="bg-white p-4 rounded-2xl w-fit shadow-lg mb-8 group-hover:scale-110 transition-transform">
                                <ShieldCheck className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Secure & Reliable</h3>
                            <p className="text-slate-500 leading-relaxed font-medium">
                                Built with industry-standard encryption and a robust database design to ensure your orders are always on track.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it Works ??$$$ */}
            <section className="py-24 px-12 bg-slate-900 text-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-20 animate-slide-up">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">The Process</span>
                        <h2 className="text-5xl font-black mb-6 italic">Simple. Transparent. <span className="text-primary">Smart.</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-0.5 bg-slate-800 -z-0"></div>

                        {[
                            { step: '01', title: 'Pick Restaurant', desc: 'Browse curated top-rated dining spots', icon: <Utensils className="h-6 w-6" /> },
                            { step: '02', title: 'Select Menu', desc: 'Choose your favorites and customize', icon: <ShoppingCart className="h-6 w-6" /> },
                            { step: '03', title: 'Schedule AI ETA', desc: 'Pick your preferred time & get prediction', icon: <Clock className="h-6 w-6" /> },
                            { step: '04', title: 'Enjoy Feast', desc: 'Real-time tracking until the first bite', icon: <ShieldCheck className="h-6 w-6" /> }
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center group">
                                <div className="h-20 w-20 rounded-3xl bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:bg-primary group-hover:border-primary transition-all duration-500 mb-8 relative z-10 orange-glow">
                                    <div className="text-white group-hover:scale-110 transition-transform">{item.icon}</div>
                                </div>
                                <span className="text-primary font-black text-xs mb-3">{item.step}</span>
                                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Decorative Background Effects ??$$$ */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(234,88,12,0.1),transparent_50%)]"></div>
            </section>
        </div>
    );
};

export default HomePage;
