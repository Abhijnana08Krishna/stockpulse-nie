// Stock Pulse - Database & Stock Management Module
// Author: Ambika M

const STORAGE_KEY = "stock_pulse_inventory";

// Default NIE lab inventory data (resistors, LEDs, solder, tape, etc.)
const DEFAULT_INVENTORY = [
  { id: "item_1", name: "10k Ohm Resistors", category: "Components", stock: 120, minThreshold: 30, unit: "pcs" },
  { id: "item_2", name: "5mm Red LEDs", category: "Components", stock: 18, minThreshold: 25, unit: "pcs" },
  { id: "item_3", name: "Rosin Core Solder Wire", category: "Consumables", stock: 2, minThreshold: 3, unit: "rolls" },
  { id: "item_4", name: "Electrical Insulation Tape", category: "Consumables", stock: 4, minThreshold: 5, unit: "rolls" },
  { id: "item_5", name: "Male-to-Male Jumper Wires", category: "Wiring", stock: 60, minThreshold: 20, unit: "pcs" }
];

// 1. Initialize database with default data if empty
function initDatabase() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_INVENTORY));
  }
  return getAllItems();
}

// 2. Read all stock items
function getAllItems() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// 3. Add a new item to the lab database
function addNewItem(name, category, stock, minThreshold, unit) {
  const items = getAllItems();
  const newItem = {
    id: "item_" + Date.now(),
    name: name,
    category: category,
    stock: Number(stock),
    minThreshold: Number(minThreshold),
    unit: unit
  };
  items.push(newItem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return newItem;
}

// 4. Record stock usage & check if stock is low (for auto-alert hook)
function recordUsage(itemId, quantityUsed, onLowStockCallback) {
  const items = getAllItems();
  const item = items.find(i => i.id === itemId);
  if (!item) return null;

  item.stock = Math.max(0, item.stock - Number(quantityUsed));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

  // Trigger automatic alert hook if stock drops to or below minimum threshold
  if (item.stock <= item.minThreshold && typeof onLowStockCallback === "function") {
    onLowStockCallback(item);
  }
  return item;
}

// 5. Restock an existing item
function restockItem(itemId, quantityAdded) {
  const items = getAllItems();
  const item = items.find(i => i.id === itemId);
  if (!item) return null;

  item.stock += Number(quantityAdded);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return item;
}

// Export functions for dashboard and alert modules
window.StockDB = {
  initDatabase,
  getAllItems,
  addNewItem,
  recordUsage,
  restockItem
};
