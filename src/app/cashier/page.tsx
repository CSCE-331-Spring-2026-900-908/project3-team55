"use client"; //react or whatever

import { useState } from 'react';

// Sample menu items
const menuItems = [
  { id: 1, name: "Coffee", price: 3.5 },
  { id: 2, name: "Tea", price: 2.5 },
  { id: 3, name: "Sandwich", price: 5.0 },
  { id: 4, name: "Cake", price: 4.0 },
];

type Item = {
  id: number;
  name: string;
  price: number;
};

export default function Home() {
  const [currentOrder, setCurrentOrder] = useState<Item[]>([]);

  const addToOrder = (item: Item) => {
    setCurrentOrder([...currentOrder, item]);
  };

  const chargeOrder = () => {
    const total = currentOrder.reduce((sum, item) => sum + item.price, 0);
    alert(`Total: $${total.toFixed(2)}. Order has been charged!`);
    setCurrentOrder([]);
  };
  
  return (
    <div style ={{ display: 'flex', minHeight: '100vh', fontFamily: "sans-serif" }}>
        {/* Left navigation panel */}
      <div style={{ width: "250px", background: "#f0f0f0", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2>CASHIER MENU</h2>
        <button>Place Orders</button>
        <button>Previous Orders</button>
        
        <button>Transactions</button>
        <button>Other Option</button>
        <button>Log Out</button>
      </div>

      {/* Center menu items */}
      <div style={{ flex: 1, padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2>Menu</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              style={{ padding: "1rem", minWidth: "120px" }}
              onClick={() => addToOrder(item)}
            >
              {item.name} - ${item.price.toFixed(2)}
            </button>
          ))}
        </div>
      </div>

      {/* Right current order panel */}
      <div style={{ width: "250px", background: "#f7f7f7", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2>CURRENT SALE</h2>
        <ul style={{ flex: 1, overflowY: "auto", padding: 0, listStyle: "none" }}>
          {currentOrder.map((item, idx) => (
            <li key={idx}>
              {item.name} - ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
        <button onClick={chargeOrder} style={{ padding: "0.5rem", backgroundColor: "#4CAF50", color: "white" }}>
          Charge
        </button>
      </div>
    </div>
    
  );
}