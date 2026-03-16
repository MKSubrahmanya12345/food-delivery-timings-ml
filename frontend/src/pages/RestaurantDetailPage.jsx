import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { ShoppingCart, Plus, Minus, Clock, MapPin } from 'lucide-react';

const RestaurantDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState(null);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scheduledTime, setScheduledTime] = useState('');

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const { data } = await api.get(`/restaurants/${id}`);
                setRestaurant(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchRestaurant();
    }, [id]);

    const addToCart = (item) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId) => {
        setCart(prev => prev.reduce((acc, item) => {
            if (item.id === itemId) {
                if (item.quantity > 1) acc.push({ ...item, quantity: item.quantity - 1 });
            } else {
                acc.push(item);
            }
            return acc;
        }, []));
    };

    const total = cart.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);

    const placeOrder = async () => {
        if (!scheduledTime) return alert('Please select a preferred delivery time');
        try {
            const orderData = {
                restaurantId: restaurant.id,
                deliveryAddress: 'Home', // Mocked ??$$$
                deliveryLatitude: 12.9716, // Mocked
                deliveryLongitude: 77.5946,
                scheduledDeliveryTime: scheduledTime,
                items: cart.map(i => ({ menuItemId: i.id, quantity: i.quantity }))
            };
            const { data } = await api.post('/orders', orderData);
            navigate(`/track/${data.order.id}`);
        } catch (err) {
            alert('Failed to place order');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto p-8 animate-fade-in flex flex-col md:flex-row gap-12">
            <div className="flex-[2]">
                <header className="mb-12">
                    <div className="h-64 bg-slate-900 rounded-[50px] mb-8 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
                         <h1 className="text-6xl font-black text-white z-10">{restaurant.name}</h1>
                    </div>
                    <div className="flex flex-wrap gap-8">
                        <div className="flex items-center gap-3 text-secondary font-bold">
                            <MapPin className="text-primary" /> {restaurant.address}
                        </div>
                        <div className="flex items-center gap-3 text-secondary font-bold">
                            <Clock className="text-primary" /> {restaurant.openingTime} - {restaurant.closingTime}
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 gap-6">
                    {restaurant.menuItems?.map(item => (
                        <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center justify-between hover:border-primary/20 transition-all hover:shadow-xl hover:shadow-primary/5 group">
                            <div className="flex items-center gap-6">
                                <div className="h-24 w-24 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                    <Utensils className="text-slate-300 group-hover:text-primary transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-secondary">{item.name}</h3>
                                    <p className="text-slate-400 font-medium text-sm mb-2">{item.description}</p>
                                    <span className="text-primary font-black text-lg">${item.price}</span>
                                </div>
                            </div>
                            <button onClick={() => addToCart(item)} className="p-4 bg-secondary text-white rounded-2xl hover:bg-primary transition-all shadow-lg hover:rotate-12">
                                <Plus />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1">
                <div className="sticky top-32 glass p-8 rounded-[40px] border border-slate-100 premium-shadow">
                    <h2 className="text-2xl font-black text-secondary mb-8 flex items-center gap-3">
                        <ShoppingCart className="text-primary" /> Your Basket
                    </h2>
                    
                    {cart.length === 0 ? (
                        <p className="text-slate-400 font-bold text-center py-12 italic">Your basket is empty</p>
                    ) : (
                        <div className="space-y-6">
                            <div className="space-y-4 max-h-[40vh] overflow-auto pr-4">
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-50">
                                        <div>
                                            <h4 className="font-bold text-secondary">{item.name}</h4>
                                            <div className="text-xs font-black text-primary uppercase tracking-widest leading-none pt-1">
                                                ${item.price} Each
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-1">
                                            <button onClick={() => removeFromCart(item.id)} className="p-1 hover:text-red-500"><Minus h-4 w-4 /></button>
                                            <span className="font-black text-secondary px-2">{item.quantity}</span>
                                            <button onClick={() => addToCart(item)} className="p-1 hover:text-primary"><Plus h-4 w-4 /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-slate-100 mb-8 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 font-bold uppercase tracking-widest text-sm">Delivery Total</span>
                                    <span className="text-3xl font-black text-secondary">${total.toFixed(2)}</span>
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Schedule Arrival Time ??$$$</label>
                                    <input 
                                        type="datetime-local" 
                                        className="w-full p-4 bg-white border border-slate-100 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-primary"
                                        value={scheduledTime}
                                        onChange={(e) => setScheduledTime(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button onClick={placeOrder} className="w-full py-5 bg-primary text-white rounded-[24px] font-black text-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                Place Secure Order
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Utensils = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
);

export default RestaurantDetailPage;
