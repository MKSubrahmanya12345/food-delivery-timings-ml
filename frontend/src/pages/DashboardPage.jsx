import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosConfig';
import { ShoppingBag, Utensils, Truck, Plus, Eye, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ordersRes, restaurantsRes] = await Promise.all([
                    api.get('/orders'),
                    user.role === 'customer' ? api.get('/restaurants') : Promise.resolve({ data: [] })
                ]);
                setOrders(ordersRes.data);
                setRestaurants(restaurantsRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user.role]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-8 max-w-7xl mx-auto animate-fade-in">
            <header className="mb-12">
                <h1 className="text-4xl font-black text-secondary mb-2">
                    Welcome back, <span className="text-primary italic">{user.name}!</span>
                </h1>
                <p className="text-slate-500 font-bold">Your DeliverEase {user.role.replace('_', ' ')} Dashboard</p>
            </header>

            {user.role === 'customer' && (
                <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slide-up">
                        <div className="bg-white p-6 rounded-[32px] border border-slate-100 flex items-center gap-4 premium-shadow">
                            <div className="bg-primary/10 p-3 rounded-2xl text-primary"><ShoppingBag /></div>
                            <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Orders</p>
                                <p className="text-2xl font-black text-secondary">{orders.length}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-[32px] border border-slate-100 flex items-center gap-4 premium-shadow">
                            <div className="bg-green-100 p-3 rounded-2xl text-green-600"><CheckCircle /></div>
                            <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Delivered</p>
                                <p className="text-2xl font-black text-secondary">{orders.filter(o => o.status === 'delivered').length}</p>
                            </div>
                        </div>
                    </div>

                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-secondary flex items-center gap-3">
                                <Utensils className="text-primary" /> Popular Restaurants
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {restaurants.map(r => (
                                <Link to={`/restaurants/${r.id}`} key={r.id} className="group bg-white rounded-[32px] overflow-hidden border border-slate-100 hover:border-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/5">
                                    <div className="h-48 bg-slate-100 relative overflow-hidden">
                                         <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-110 transition-transform duration-700"></div>
                                         <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-black text-primary uppercase tracking-widest leading-none">
                                            {r.cuisineType || 'Fast Food'}
                                         </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">{r.name}</h3>
                                        <p className="text-slate-500 text-sm font-medium mb-4">{r.address}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-black bg-slate-50 px-3 py-1.5 rounded-xl text-slate-400">
                                                {r.openingTime} - {r.closingTime}
                                            </span>
                                            <div className="w-10 h-10 bg-secondary group-hover:bg-primary rounded-full flex items-center justify-center text-white transition-all group-hover:rotate-90">
                                                <Plus />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            )}

            {user.role === 'restaurant_owner' && (
                <div className="space-y-8 animate-slide-up">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                         <div className="bg-slate-900 p-6 rounded-[32px] text-white flex items-center gap-4 premium-shadow orange-glow">
                            <div className="bg-primary p-3 rounded-2xl"><Utensils /></div>
                            <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Revenue</p>
                                <p className="text-2xl font-black">${orders.reduce((acc, o) => acc + parseFloat(o.totalAmount), 0).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>

                     <h2 className="text-2xl font-black text-secondary flex items-center gap-3 mt-12">
                        <ShoppingBag className="text-primary" /> Active Orders
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {orders.map(order => (
                            <div key={order.id} className="bg-white p-8 rounded-[40px] border border-slate-100 hover:border-primary/20 transition-all premium-shadow">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-xl font-black text-secondary">Order #{order.id}</h3>
                                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{order.orderDate}</p>
                                    </div>
                                    <span className={`font-black px-4 py-1.5 rounded-full text-xs uppercase ${order.status === 'pending' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="mb-8 space-y-3">
                                    {order.items.map(item => (
                                        <div key={item.id} className="flex justify-between text-slate-500 font-bold text-sm">
                                            <span className="flex items-center gap-2">
                                                <span className="text-primary text-xs tracking-tighter">{item.quantity}x</span>
                                                {item.menuItem.name}
                                            </span>
                                            <span>${item.priceAtOrder}</span>
                                        </div>
                                    ))}
                                    <div className="pt-4 border-t border-slate-50 flex justify-between font-black text-secondary text-lg">
                                        <span>Total</span>
                                        <span className="text-primary">${order.totalAmount}</span>
                                    </div>
                                </div>
                                {order.status === 'pending' && (
                                    <div className="flex gap-3">
                                        <button className="flex-1 py-4 bg-secondary text-white rounded-2xl font-black text-sm shadow-lg hover:bg-slate-800 transition-all">
                                            Decline
                                        </button>
                                        <button className="flex-[2] py-4 bg-primary text-white rounded-2xl font-black text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                                            Accept & Prepare
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {user.role === 'delivery_person' && (
                <div className="space-y-8">
                    <h2 className="text-2xl font-black text-secondary flex items-center gap-3">
                        <Truck className="text-primary" /> Assigned Deliveries
                    </h2>
                    {/* Delivery content ??$$$ */}
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
