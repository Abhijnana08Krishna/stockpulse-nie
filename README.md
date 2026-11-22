# Stock Pulse — Lab Inventory Tracker (TECH-07)

A lightweight lab inventory tracker built for NIE labs to record component stock and usage, with an automatic low-stock alert system that notifies lab staff before essential supplies run out.

## User Research
- **NIE CSE Student:** "Sometimes, we need basic components like LEDs and resistors during lab sessions, but they may not be available when required. Having a system that shows the available stock would make things easier."
- **Lab Assistant, NIE:** "Keeping track of small components manually is difficult. Sometimes, we realise that an item is out of stock only when someone asks for it. Automatic low-stock notifications would help us manage inventory better."

## Features & Architecture
- **Inventory Database & Stock Management (`stockManager.js`):** Stores lab items (resistors, LEDs, solder wire, insulation tape, jumper wires), tracks current quantities against minimum thresholds, and handles adding, restocking, and deducting stock.
- **Automatic Low-Stock Alert:** Triggers automatically via callback hook whenever an item's stock drops to or below its minimum threshold, without requiring manual checking.
- **Dashboard Interface:** Displays live inventory levels and allows quick logging of stock usage.

## Tools & AI Used
- GitHub (Repository & Version Control)
- JavaScript (`localStorage` for data persistence)
- AI Assistance (Used for structuring modular code and documentation)

