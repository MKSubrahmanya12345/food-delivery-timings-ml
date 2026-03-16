import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, User, LogOut, Menu } from 'lucide-react';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 py-4 ${isScrolled ? 'top-2' : 'top-0'}`}>
            <div className={`max-w-7xl mx-auto px-8 py-4 flex items-center justify-between transition-all duration-500 rounded-[32px] ${isScrolled ? 'glass premium-shadow border-white/40' : 'bg-transparent border-transparent'}`}>
                <Link to="/" className="flex items-center gap-2">
                    <div className="bg-primary p-2 rounded-xl">
                        <ShoppingBag className="text-white h-6 w-6" />
                    </div>
                    <span className="text-2xl font-black text-secondary tracking-tight">
                        DeliverEase <span className="text-primary">AI</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8 font-bold text-secondary/80">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    {user && <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>}
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-2xl">
                                <User className="h-4 w-4 text-primary" />
                                <span className="text-xs font-black text-secondary tracking-tight">{user.name}</span>
                            </div>
                            <button onClick={handleLogout} className="p-2 text-secondary hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                <LogOut className="h-6 w-6" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <Link to="/login" className="px-5 py-2 rounded-full font-bold text-secondary hover:bg-slate-100 transition-all">
                                Login
                            </Link>
                            <Link to="/register" className="px-6 py-2 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                                Join Now
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
