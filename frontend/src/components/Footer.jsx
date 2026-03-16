const Footer = () => {
    return (
        <footer className="bg-slate-900 pt-20 pb-10 px-12 text-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="bg-primary p-2 rounded-xl">
                            <ShoppingBag className="text-white h-6 w-6" />
                        </div>
                        <span className="text-2xl font-black tracking-tight text-white">
                            DeliverEase <span className="text-primary">AI</span>
                        </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium">
                        Redefining food delivery with AI-powered precision. The smartest way to satisfy your cravings.
                    </p>
                </div>

                <div>
                    <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-6 text-primary">Discover</h4>
                    <ul className="space-y-4 text-slate-400 text-sm font-bold">
                        <li className="hover:text-white transition-colors cursor-pointer">Near Me</li>
                        <li className="hover:text-white transition-colors cursor-pointer">Top Rated</li>
                        <li className="hover:text-white transition-colors cursor-pointer">Cuisines</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-6 text-primary">Support</h4>
                    <ul className="space-y-4 text-slate-400 text-sm font-bold">
                        <li className="hover:text-white transition-colors cursor-pointer">Help Center</li>
                        <li className="hover:text-white transition-colors cursor-pointer">Safety</li>
                        <li className="hover:text-white transition-colors cursor-pointer">Terms</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-6 text-primary">Contact</h4>
                    <p className="text-slate-400 text-sm font-bold mb-4">hello@deliverease.ai</p>
                    <div className="flex gap-4">
                        <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-primary transition-all cursor-pointer">
                            <Heart className="h-5 w-5" />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                    &copy; 2024 DeliverEase AI. Built for the Hackathon.
                </p>
            </div>
            
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-0"></div>
        </footer>
    );
};

const Heart = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
);

export default Footer;
