"use client"; //react or whatever

import { useState, useEffect, use } from 'react';


type Item = {
  name: string;
  cost: number;
  active: boolean;
  seasonal_menu_item: boolean;
  
};

export default function Home() {
  const [currentOrder, setCurrentOrder] = useState<Item[]>([]);
  const [menuItems, setMenuItems] = useState<Item[]>([]);
  useEffect(() => {
    fetch('/api/menu_items')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch menu items');
        }        return res.json();
      })
      .then((data: Item[]) => {
        const parse = data
          .filter((item) => item.active)
          .map((item) => ({ ...item, cost: Number(item.cost) }));

        setMenuItems(parse); // Only show active items
      })
      .catch((err) => console.error(err));
  }, []);

  const addToOrder = (item: Item) => {
    setCurrentOrder([...currentOrder, item]);
  };

  const chargeOrder = () => {
    const total = currentOrder.reduce((sum, item) => sum + item.cost, 0);
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
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              style={{ padding: "1rem", minWidth: "120px" }}
              onClick={() => addToOrder(item)}
            >
              {item.name} - ${item.cost.toFixed(2)}
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
              {item.name} - ${item.cost.toFixed(2)}
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