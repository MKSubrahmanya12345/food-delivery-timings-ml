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
                                         {/* Mock Image ??$$$ */}
                                         <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-110 transition-transform duration-700"></div>
                                         <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-black text-primary uppercase tracking-widest leading-none">
                                            {r.cuisineType || 'Fast Food'}
                                         </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-secondary mb-2">{r.name}</h3>
                                        <p className="text-slate-500 text-sm font-medium mb-4">{r.address}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-black bg-slate-50 px-3 py-1.5 rounded-xl text-slate-400">
                                                {r.openingTime} - {r.closingTime}
                                            </span>
                                            <div className="w-10 h-10 bg-secondary group-hover:bg-primary rounded-full flex items-center justify-center text-white transition-colors">
                                                <Plus />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section>
                         <h2 className="text-2xl font-black text-secondary flex items-center gap-3 mb-8">
                            <ShoppingBag className="text-primary" /> Your Recent Orders
                        </h2>
                        <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden premium-shadow">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    <tr>
                                        <th className="px-8 py-5 text-sm font-black text-slate-400 uppercase tracking-widest">Order ID</th>
                                        <th className="px-8 py-5 text-sm font-black text-slate-400 uppercase tracking-widest">Restaurant</th>
                                        <th className="px-8 py-5 text-sm font-black text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="px-8 py-5 text-sm font-black text-slate-400 uppercase tracking-widest">Estimated Arrival</th>
                                        <th className="px-8 py-5 text-sm font-black text-slate-400 uppercase tracking-widest">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {orders.map(order => (
                                        <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-6 font-bold text-secondary">#{order.id}</td>
                                            <td className="px-8 py-6 font-bold text-secondary">{order.restaurant.name}</td>
                                            <td className="px-8 py-6">
                                                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tight
                                                    ${order.status === 'delivered' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                                    {order.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-primary font-black">
                                                    <Clock className="h-4 w-4" />
                                                    {order.predictedEtaMinutes ? `${order.predictedEtaMinutes} mins` : 'Calculating...'}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <Link to={`/track/${order.id}`} className="text-secondary hover:text-primary transition-colors">
                                                    <Eye />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            )}

            {user.role === 'restaurant_owner' && (
                <div className="space-y-8">
                     <h2 className="text-2xl font-black text-secondary flex items-center gap-3">
                        <ShoppingBag className="text-primary" /> Incoming Orders
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {orders.map(order => (
                            <div key={order.id} className="bg-white p-8 rounded-[40px] border border-slate-100 premium-shadow">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-xl font-black text-secondary">Order #{order.id}</h3>
                                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{order.orderDate}</p>
                                    </div>
                                    <span className="bg-blue-50 text-blue-600 font-black px-4 py-1.5 rounded-full text-xs uppercase">
                                        {order.status}
                                    </span>
                                </div>
                                <div className="mb-6 space-y-2">
                                    {order.items.map(item => (
                                        <div key={item.id} className="flex justify-between text-slate-500 font-medium">
                                            <span>{item.quantity}x {item.menuItem.name}</span>
                                            <span>${item.priceAtOrder}</span>
                                        </div>
                                    ))}
                                    <div className="pt-2 border-t border-slate-50 flex justify-between font-black text-secondary">
                                        <span>Total</span>
                                        <span>${order.totalAmount}</span>
                                    </div>
                                </div>
                                {order.status === 'pending' && (
                                    <button className="w-full py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                                        Accept Order
                                    </button>
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
