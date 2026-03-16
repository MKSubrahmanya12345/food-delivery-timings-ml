import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, User, LogOut, Menu } from 'lucide-react';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="glass sticky top-0 z-50 w-full px-6 py-4 flex items-center justify-between premium-shadow">
            <Link to="/" className="flex items-center gap-2">
                <div className="bg-primary p-2 rounded-xl">
                    <ShoppingBag className="text-white h-6 w-6" />
                </div>
                <span className="text-2xl font-black text-secondary tracking-tight">
                    DeliverEase <span className="text-primary">AI</span>
                </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8 font-semibold text-secondary/80">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                {user && <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>}
            </nav>

            <div className="flex items-center gap-4">
                {user ? (
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
                            <User className="h-4 w-4 text-primary" />
                            <span className="text-sm font-bold text-secondary">{user.name}</span>
                        </div>
                        <button onClick={handleLogout} className="text-secondary hover:text-red-500 transition-colors">
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
        </header>
    );
};

export default Header;
