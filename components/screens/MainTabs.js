import {
  Box,
  Plus,
  Truck,
  User,
  Clock,
  ChevronRight,
  CheckCircle2,
  Banknote,
  MapPin,
  CreditCard,
  Phone,
  LogOut,
} from 'lucide-react';

export function DashboardTab({
  user,
  t,
  history,
  collection,
  activePickup,
  totalEstimatedValue,
  totalItems,
  goTo,
  switchTab,
}) {
  return (
    <div className="flex flex-col h-full bg-[#F5F7F8] overflow-y-auto pb-24">
      <div className="bg-[#0F2A44] text-white p-6 rounded-b-[40px] shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-blue-200">Hello,</p>
            <h2 className="text-2xl font-bold">{user.name.split(' ')[0]} 👋</h2>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <User size={24} color="#FFF" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 text-[#0F2A44] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5B400] rounded-full opacity-10 -mr-10 -mt-10" />
          <p className="text-sm font-bold text-gray-500 mb-1">
            Current Collection Value
          </p>
          <h1 className="text-4xl font-extrabold text-[#1DB954]">
            Rs. {totalEstimatedValue}
          </h1>
          <p className="text-sm text-gray-500 mt-2 font-medium">
            {totalItems} Items Stored
          </p>
        </div>
      </div>

      <div className="p-6 mt-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => goTo('ADD_CATEGORY')}
            className="bg-[#1DB954] text-white p-4 rounded-2xl shadow-md flex flex-col items-center justify-center space-y-2 hover:bg-green-600 transition-colors"
          >
            <Plus size={32} />
            <span className="font-bold">{t.addItems}</span>
          </button>

          <button
            onClick={() => {
              if (collection.length === 0) {
                alert('Your collection is empty!');
              } else {
                goTo('REQUEST_PICKUP');
              }
            }}
            className="bg-[#0F2A44] text-white p-4 rounded-2xl shadow-md flex flex-col items-center justify-center space-y-2 hover:bg-blue-900 transition-colors"
          >
            <Truck size={32} />
            <span className="font-bold">{t.requestPickup}</span>
          </button>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-[#0F2A44] text-lg">Recent Activity</h3>
            <button
              onClick={() => switchTab('WALLET')}
              className="text-sm text-[#1DB954] font-bold"
            >
              View All
            </button>
          </div>

          {activePickup && (
            <div
              onClick={() => goTo('TRACKING')}
              className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center mb-3 shadow-sm active:scale-95 transition-transform cursor-pointer"
            >
              <div className="w-10 h-10 bg-[#0F2A44] rounded-full flex items-center justify-center text-white mr-4">
                <Clock size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#0F2A44]">Pickup Scheduled</h4>
                <p className="text-sm text-gray-500">Today, Afternoon</p>
              </div>
              <ChevronRight className="text-gray-400" />
            </div>
          )}

          {history.slice(0, 2).map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl flex items-center mb-3 shadow-sm border border-gray-100"
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-[#1DB954] mr-4">
                <CheckCircle2 size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#0F2A44]">Pickup #{item.id}</h4>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-[#F5B400]">
                  + Rs.{item.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CollectionTab({ t, collection, totalEstimatedValue, goTo, prices }) {
  return (
    <div className="flex flex-col h-full bg-[#F5F7F8] overflow-y-auto pb-24">
      <div className="bg-white p-6 shadow-sm sticky top-0 z-10 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-[#0F2A44]">{t.collection}</h2>
          <p className="text-gray-500 text-sm mt-1">
            {collection.length} categories saved
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-gray-400 uppercase">Est. Value</p>
          <h3 className="text-xl font-bold text-[#1DB954]">
            Rs. {totalEstimatedValue}
          </h3>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {collection.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Box size={48} className="mx-auto mb-4 opacity-50" />
            <p>Your collection is empty</p>
          </div>
        ) : (
          collection.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center"
            >
              <div className="text-3xl mr-4 bg-gray-50 w-12 h-12 rounded-lg flex items-center justify-center">
                {prices[item.category]?.icon || '📦'}
              </div>

              <div className="flex-1">
                <h4 className="font-bold text-[#0F2A44]">{item.category}</h4>
                <p className="text-sm text-gray-500">
                  {item.qty} {item.unit}
                </p>
              </div>

              <div className="text-right">
                {item.pendingWeight ? (
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded font-bold">
                    Pending Weight
                  </span>
                ) : (
                  <span className="font-bold text-[#1DB954]">Rs. {item.value}</span>
                )}
              </div>
            </div>
          ))
        )}

        <button
          onClick={() => goTo('ADD_CATEGORY')}
          className="w-full border-2 border-dashed border-[#1DB954] text-[#1DB954] py-4 rounded-xl font-bold flex items-center justify-center mt-4 hover:bg-green-50"
        >
          <Plus size={20} className="mr-2" />
          Add More Items
        </button>
      </div>
    </div>
  );
}

export function WalletTab({ t, balance, history, goTo }) {
  return (
    <div className="flex flex-col h-full bg-[#F5F7F8] overflow-y-auto pb-24">
      <div className="bg-[#0F2A44] p-6 pb-12 rounded-b-[40px] text-white shadow-lg text-center">
        <h2 className="text-xl font-medium mb-6 opacity-90">{t.wallet} Balance</h2>
        <h1 className="text-5xl font-bold text-[#F5B400] mb-8">Rs. {balance}</h1>
        <button
          onClick={() => goTo('WITHDRAW')}
          className="bg-white text-[#0F2A44] px-8 py-3 rounded-full font-bold shadow-md hover:bg-gray-100"
        >
          Withdraw Funds
        </button>
      </div>

      <div className="p-6 -mt-6">
        <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
          <h3 className="font-bold text-[#0F2A44] mb-4 text-lg">
            Recent Payments
          </h3>

          {history.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#1DB954] mr-4">
                  <Banknote size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0F2A44]">Pickup #{item.id}</h4>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
              </div>

              <span className="font-bold text-[#1DB954]">+ Rs.{item.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProfileTab({ t, user, goTo, handleLogout }) {
  return (
    <div className="flex flex-col h-full bg-[#F5F7F8] overflow-y-auto pb-24">
      <div className="bg-white p-6 shadow-sm sticky top-0 z-10">
        <h2 className="text-2xl font-bold text-[#0F2A44]">{t.profile}</h2>
      </div>

      <div className="p-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center mb-6">
          <div className="w-16 h-16 bg-[#1DB954] rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-xl text-[#0F2A44]">{user.name}</h3>
            <p className="text-gray-500">{user.phone}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-100 flex items-center">
            <MapPin className="text-gray-400 mr-4" />
            <div>
              <p className="text-sm font-bold text-[#0F2A44]">Address</p>
              <p className="text-sm text-gray-500">
                {user.address}, {user.district}
              </p>
            </div>
          </div>

          <div className="p-4 border-b border-gray-100 flex items-center">
            <CreditCard className="text-gray-400 mr-4" />
            <div>
              <p className="text-sm font-bold text-[#0F2A44]">Payment Method</p>
              <p className="text-sm text-gray-500">{user.paymentMethod}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <button
            onClick={() => goTo('LANGUAGE')}
            className="w-full p-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 text-left"
          >
            <span className="font-bold text-[#0F2A44]">Change Language</span>
            <ChevronRight className="text-gray-400" />
          </button>

          <button className="w-full p-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 text-left">
            <span className="font-bold text-[#0F2A44]">Contact Support</span>
            <Phone className="text-gray-400" size={18} />
          </button>

          <button
            onClick={handleLogout}
            className="w-full p-4 flex items-center justify-between hover:bg-red-50 text-left"
          >
            <span className="font-bold text-red-500">Logout</span>
            <LogOut className="text-red-500" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}