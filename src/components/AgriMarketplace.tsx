import React, { useState } from 'react';
import { Product, Order, CartItem } from '../types';
import { TranslationStrings } from '../translations';
import { ShoppingCart, Package, CheckCircle2, Truck, Plus, Minus, Search, Filter, Sparkles, MapPin, ExternalLink, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
  onUpdateCartQty: (productId: string, delta: number) => void;
  onClearCart: () => void;
  onPlaceOrder: (items: CartItem[], address: string) => Promise<void>;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  t: TranslationStrings;
}

const CATEGORIES = ['All', 'Seeds', 'Fertilizers', 'Biopesticides', 'Irrigation', 'Tools'];

export const AgriMarketplace: React.FC<Props> = ({
  products,
  orders,
  cart,
  onAddToCart,
  onUpdateCartQty,
  onClearCart,
  onPlaceOrder,
  isCartOpen,
  setIsCartOpen,
  t
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'catalog' | 'orders'>('catalog');
  const [deliveryAddress, setDeliveryAddress] = useState('Greenfield Valley Farm, Gate 2, Indore Rural, MP');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setIsSubmitting(true);
    try {
      await onPlaceOrder(cart, deliveryAddress);
      confetti({ particleCount: 70, spread: 50, origin: { y: 0.7 } });
      setIsCartOpen(false);
      setActiveTab('orders');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
            <Package className="w-6 h-6 text-emerald-700" />
            <span>Agricultural Supplies Marketplace & Order Tracking</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Direct farmer access to certified seeds, bio-fertilizers, and drip kits with milestone shipment tracking.
          </p>
        </div>

        {/* Catalog vs Orders Tab Switch */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-stone-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'catalog' ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-600'
              }`}
            >
              Browse Supplies ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'orders' ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-600'
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Track Orders ({orders.length})</span>
            </button>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Cart ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
          </button>
        </div>
      </div>

      {activeTab === 'catalog' ? (
        <>
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-stone-200">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold text-stone-500 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Category:
              </span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-stone-400">
                <Search className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search seeds, fertilizers..."
                className="pl-8 pr-3 py-1.5 border border-stone-300 rounded-lg text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-600 w-full sm:w-56"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                    {prod.ecoFriendly && (
                      <span className="absolute top-2.5 left-2.5 bg-emerald-600 text-white text-2xs font-bold px-2 py-0.5 rounded-full shadow-xs">
                        🌿 Certified Bio / Eco
                      </span>
                    )}
                    <span className="absolute bottom-2.5 right-2.5 bg-stone-900/80 backdrop-blur-xs text-white text-2xs font-bold px-2 py-0.5 rounded">
                      {prod.unit}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-2xs text-stone-500">
                      <span className="font-semibold uppercase tracking-wider text-emerald-800">
                        {prod.category}
                      </span>
                      <span>★ {prod.rating} ({prod.reviewsCount} reviews)</span>
                    </div>

                    <h3 className="font-bold text-sm text-stone-900 line-clamp-1">{prod.title}</h3>
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between border-t border-stone-100 mt-2">
                  <div>
                    <span className="text-2xs text-stone-400 block">Farmer Price</span>
                    <span className="text-lg font-extrabold text-stone-900">₹{prod.price}</span>
                  </div>

                  <button
                    onClick={() => onAddToCart(prod)}
                    className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl shadow-2xs transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Orders & Shipment Tracking View */
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs">
            <h2 className="text-base font-bold text-stone-900 mb-1">Your Order Dispatch & Delivery Status</h2>
            <p className="text-xs text-stone-500">Real-time agricultural logistics with rural hub delivery updates.</p>
          </div>

          <div className="space-y-4">
            {orders.map((order) => {
              const stepIndex = ['Order Placed', 'Processing', 'Dispatched', 'Delivered'].indexOf(order.status);

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-2xs space-y-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-stone-900 text-sm">{order.id}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-2xs font-bold uppercase tracking-wider ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5 flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Placed: {order.orderDate} • Est. Arrival: <strong>{order.estimatedDelivery}</strong></span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-stone-500 block">Total Billed</span>
                      <span className="text-lg font-extrabold text-emerald-800">₹{order.totalAmount}</span>
                    </div>
                  </div>

                  {/* Shipment Stepper */}
                  <div className="py-2">
                    <div className="grid grid-cols-4 gap-2 text-center">
                      {['Order Placed', 'Processing', 'Dispatched', 'Delivered'].map((st, idx) => {
                        const isDone = idx <= stepIndex;
                        return (
                          <div key={st} className="space-y-1.5">
                            <div className="flex items-center">
                              <div
                                className={`w-full h-1.5 rounded-full ${
                                  isDone ? 'bg-emerald-600' : 'bg-stone-200'
                                }`}
                              />
                            </div>
                            <div className={`text-2xs font-semibold ${isDone ? 'text-emerald-800' : 'text-stone-400'}`}>
                              {st}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Items Ordered List */}
                  <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-150 space-y-2">
                    <div className="text-2xs font-bold uppercase tracking-wider text-stone-500">Ordered Items:</div>
                    <div className="space-y-1.5">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="text-stone-800 font-medium">{it.title} (Qty: {it.quantity})</span>
                          <span className="font-semibold text-stone-700">₹{it.price * it.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-stone-200 text-2xs text-stone-500 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>Deliver to: {order.deliveryAddress}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
            {/* Cart Header */}
            <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-emerald-700" />
                <h3 className="font-bold text-stone-900 text-base">Your Agricultural Cart</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-xs font-semibold text-stone-500 hover:text-stone-900 px-2 py-1 rounded"
              >
                Close ✕
              </button>
            </div>

            {/* Cart Items */}
            <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-stone-100 mx-auto flex items-center justify-center text-stone-400">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-stone-700">Your cart is currently empty</p>
                  <p className="text-xs text-stone-400">Add certified seeds or bio-fertilizers from the catalog.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl border border-stone-200 bg-stone-50/60"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-xs text-stone-900 truncate">{item.title}</h4>
                      <div className="text-2xs text-stone-500 mt-0.5">₹{item.price} each</div>
                    </div>

                    <div className="flex items-center gap-2 bg-white border border-stone-300 rounded-lg px-2 py-1">
                      <button
                        onClick={() => onUpdateCartQty(item.id, -1)}
                        className="text-stone-500 hover:text-stone-900"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-stone-800 w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateCartQty(item.id, 1)}
                        className="text-stone-500 hover:text-stone-900"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right font-bold text-xs text-stone-900">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Checkout Footer */}
            {cart.length > 0 && (
              <form onSubmit={handleCheckout} className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3">
                <div>
                  <label className="block text-2xs font-bold uppercase text-stone-600 mb-1">
                    Delivery Address (Village / Farm Gate)
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-lg text-xs bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="flex items-center justify-between text-sm pt-2">
                  <span className="font-semibold text-stone-600">Total Payable:</span>
                  <span className="text-xl font-extrabold text-stone-900">₹{cartTotal}</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>{isSubmitting ? 'Confirming Order...' : 'Place Agricultural Order'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
