import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
            <div className="w-full max-w-md animate-fade-in">
                <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-100">
                    <div className="flex justify-center mb-8">
                        <div className="bg-primary/10 p-4 rounded-2xl">
                            <LogIn className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-black text-center text-secondary mb-2">Welcome Back</h2>
                    <p className="text-center text-slate-500 font-medium mb-10">Sign in to continue to DeliverEase AI</p>

                    {error && <div className="bg-red-50 text-red-500 p-4 rounded-2xl mb-6 text-center font-bold">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary outline-none font-medium text-secondary"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary outline-none font-medium text-secondary"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="w-full py-4 bg-secondary text-white rounded-2xl font-black text-lg shadow-xl shadow-secondary/20 hover:bg-primary hover:shadow-primary/20 transition-all">
                            Sign In
                        </button>
                    </form>

                    <div className="mt-10 text-center text-slate-500 font-medium">
                        Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Create Account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
