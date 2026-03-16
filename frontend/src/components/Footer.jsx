const Footer = () => {
    return (
        <footer className="bg-secondary text-white py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-2">
                    <h3 className="text-2xl font-bold mb-4">DeliverEase AI</h3>
                    <p className="text-slate-400 max-w-sm">
                        Revolutionizing food delivery with hyper-accurate ETAs and intelligent scheduling.
                        Built for the ultimate customer convenience.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold mb-4 text-primary">Links</h4>
                    <ul className="space-y-2 text-slate-400">
                        <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Restaurants</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Delivery Partners</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4 text-primary">Support</h4>
                    <ul className="space-y-2 text-slate-400">
                        <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
                &copy; 2024 DeliverEase AI. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
