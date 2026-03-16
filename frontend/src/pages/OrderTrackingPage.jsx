import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosConfig';
import { Truck, MapPin, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const OrderTrackingPage = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await api.get(`/orders/${orderId}`);
                setOrder(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
        const interval = setInterval(fetchOrder, 10000); // Poll every 10s ??$$$
        return () => clearInterval(interval);
    }, [orderId]);

    if (loading) return <div>Loading...</div>;
    if (!order) return <div>Order not found</div>;

    const steps = [
        { label: 'Confirmed', status: ['confirmed', 'preparing', 'out_for_delivery', 'delivered'] },
        { label: 'Preparing', status: ['preparing', 'out_for_delivery', 'delivered'] },
        { label: 'Out for Delivery', status: ['out_for_delivery', 'delivered'] },
        { label: 'Delivered', status: ['delivered'] }
    ];

    return (
        <div className="max-w-5xl mx-auto p-12 animate-fade-in">
            <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6 text-right md:text-left">
                <div className="text-left w-full md:w-auto">
                    <h1 className="text-5xl font-black text-secondary leading-none mb-2">Tracking Order</h1>
                    <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-sm">Case ID: #D-7721-{order.id}</p>
                </div>
                {order.status !== 'delivered' && (
                    <div className="bg-primary/5 p-8 rounded-[40px] border border-primary/10 flex items-center gap-8 w-full md:w-auto">
                        <div className="bg-white p-5 rounded-3xl shadow-xl shadow-primary/5">
                            <Clock className="text-primary h-8 w-8" />
                        </div>
                        <div>
                            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px] mb-1">AI Predicted Arrival ??$$$</p>
                            <span className="text-4xl font-black text-secondary">{order.predictedEtaMinutes || '--'} <span className="text-lg">mins</span></span>
                        </div>
                    </div>
                )}
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-12">
                    <section className="bg-secondary rounded-[50px] p-10 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                                <Truck className="text-primary" /> Delivery Status
                            </h2>
                            <div className="space-y-10">
                                {steps.map((step, idx) => {
                                    const isCompleted = step.status.includes(order.status);
                                    return (
                                        <div key={idx} className="flex gap-6 relative">
                                            {idx < steps.length - 1 && (
                                                <div className={`absolute left-4 top-10 w-0.5 h-10 ${isCompleted ? 'bg-primary' : 'bg-slate-700'}`}></div>
                                            )}
                                            <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 transition-colors
                                                ${isCompleted ? 'bg-primary border-primary text-secondary' : 'bg-transparent border-slate-700 text-slate-700'}`}>
                                                {isCompleted ? <CheckCircle2 size={16} strokeWidth={3} /> : <div className="h-2 w-2 rounded-full bg-slate-700"></div>}
                                            </div>
                                            <div>
                                                <h4 className={`font-black text-lg ${isCompleted ? 'text-white' : 'text-slate-500'}`}>{step.label}</h4>
                                                {isCompleted && order.status === step.status[0] && (
                                                    <p className="text-primary font-bold text-xs uppercase tracking-widest animate-pulse">Current Phase</p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {/* Abstract Gradient Background ??$$$ */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 hover:bg-primary/30 rounded-full blur-[100px] -z-0 transition-colors"></div>
                    </section>

                    <section className="bg-slate-50 rounded-[50px] p-10 border border-slate-100">
                        <h2 className="text-xl font-black text-secondary mb-6 flex items-center gap-3">
                            <MapPin className="text-primary" /> Delivery Details
                        </h2>
                        <div className="space-y-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">To: {order.customer.name}</span>
                                <span className="text-lg font-bold text-secondary">{order.deliveryAddress}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">From: {order.restaurant.name}</span>
                                <span className="text-lg font-bold text-secondary">{order.restaurant.address}</span>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="bg-white rounded-[60px] border border-slate-100 p-10 premium-shadow">
                    <h2 className="text-2xl font-black text-secondary mb-8">Order Summary</h2>
                    <div className="space-y-6">
                        {order.items.map(item => (
                            <div key={item.id} className="flex justify-between items-center group">
                                <div className="flex items-center gap-4">
                                     <div className="bg-slate-50 px-3 py-2 rounded-xl text-primary font-black group-hover:bg-primary group-hover:text-white transition-colors">{item.quantity}x</div>
                                     <span className="font-bold text-secondary">{item.menuItem.name}</span>
                                </div>
                                <span className="font-bold text-slate-400">${(item.quantity * item.priceAtOrder).toFixed(2)}</span>
                            </div>
                        ))}
                        
                        <div className="mt-10 pt-10 border-t border-slate-100">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Subtotal</span>
                                <span className="font-bold text-secondary">${order.totalAmount}</span>
                            </div>
                            <div className="flex justify-between items-center mb-10">
                                <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Delivery Fee</span>
                                <span className="font-bold text-green-500">FREE</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-secondary font-black text-xl">Order Total</span>
                                <span className="text-4xl font-black text-primary leading-none">${order.totalAmount}</span>
                            </div>
                        </div>

                        {order.status === 'delivered' ? (
                            <div className="bg-green-50 p-6 rounded-3xl border border-green-100 flex items-center gap-4 mt-8">
                                <div className="bg-green-500 p-2 rounded-full text-white">
                                    <CheckCircle2 h-6 w-6 />
                                </div>
                                <div>
                                    <p className="font-black text-green-700">Delivered Successfully</p>
                                    <p className="text-green-600 text-xs font-medium">Thank you for using DeliverEase AI!</p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-slate-900 p-8 rounded-[40px] text-white flex items-center gap-6 mt-8 shadow-2xl shadow-indigo-500/10">
                                <AlertCircle className="text-primary h-10 w-10 flex-shrink-0" />
                                <p className="text-sm font-medium leading-relaxed">
                                    Our delivery partner is currently navigating the best route for your order. 
                                    <span className="text-primary block font-black mt-1">Updates are processed in real-time.</span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTrackingPage;
