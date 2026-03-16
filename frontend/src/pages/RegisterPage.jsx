import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, Phone, MapPin } from 'lucide-react';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '', password: '', name: '', role: 'customer', phone: '', address: ''
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-50/50">
            <div className="w-full max-w-2xl animate-fade-in bg-white p-12 rounded-[50px] shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col md:flex-row gap-12">
                <div className="flex-1">
                    <div className="bg-primary/10 p-4 rounded-2xl w-fit mb-8">
                        <UserPlus className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-4xl font-black text-secondary leading-tight mb-4">Join the <br/><span className="text-primary italic">Revolution.</span></h2>
                    <p className="text-slate-500 font-medium mb-10">Start your journey with the world's most accurate food delivery platform.</p>
                    
                    <div className="hidden md:block">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-secondary font-bold">
                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                AI Powered Predictions
                            </div>
                            <div className="flex items-center gap-3 text-secondary font-bold">
                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                Scheduled Convenience
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-[1.5]">
                    {error && <div className="bg-red-50 text-red-500 p-4 rounded-2xl mb-6 text-center font-bold">{error}</div>}
                    
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative col-span-2">
                             <input
                                type="text" placeholder="Full Name"
                                className="w-full pl-6 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary outline-none font-medium text-secondary"
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                required
                            />
                        </div>
                        <div className="relative col-span-2">
                            <input
                                type="email" placeholder="Email"
                                className="w-full pl-6 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary outline-none font-medium text-secondary"
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="password" placeholder="Password"
                                className="w-full pl-6 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary outline-none font-medium text-secondary"
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                required
                            />
                        </div>
                        <div className="relative">
                            <select
                                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary outline-none font-bold text-secondary appearance-none cursor-pointer"
                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                                value={formData.role}
                            >
                                <option value="customer">I'm a Customer</option>
                                <option value="restaurant_owner">I'm a Restaurant Owner</option>
                                <option value="delivery_person">I'm a Courier</option>
                            </select>
                        </div>
                        <div className="relative col-span-2">
                            <input
                                type="text" placeholder="Delivery Address"
                                className="w-full pl-6 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary outline-none font-medium text-secondary"
                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                                required
                            />
                        </div>
                        
                        <button type="submit" className="col-span-2 mt-4 py-4 bg-secondary text-white rounded-2xl font-black text-lg shadow-xl shadow-secondary/20 hover:bg-primary hover:shadow-primary/20 transition-all">
                            Create Account
                        </button>
                    </form>

                    <div className="mt-8 text-center text-slate-500 font-medium">
                        Already joined? <Link to="/login" className="text-primary font-bold hover:underline">Sign In Instead</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
