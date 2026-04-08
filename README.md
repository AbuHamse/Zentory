##📦 Zentory | Logistics Management Suite
Zentory is a high-performance, geometric-styled WMS (Warehouse Management System) designed with a sharp, industrial aesthetic. Built for efficiency, transparency, and rapid order fulfillment.

🚀 Quick Start (Development)
To get the client-side environment running, use the following commands:

🛠️ Installation
Bash
# Install all dependencies
npm install
💻 Run Client

Bash
# Serve the Angular application locally
ng serve

##🏗️ Build
#Bash
# Production build
ng build --configuration production
🏗️ Project Architecture
🗂️ Folder Structure
src/app/features/ — Contains core modules: Dashboard, Inventory, and Orders.

src/app/shared/ — Reusable ZTN-Widgets and layout components.

src/assets/data/ — Local JSON mock data for offline development.

##🛡️ Core Features
RBAC (Role-Based Access Control): Custom views for GMs, Managers, and Warehouse staff.

Command Center: A real-time overview of warehouse usage and revenue.

Master-Detail Fulfillment: Expandable order rows with line-item picking status.

Live Filtration: Signal-based filtering for order status (Processing, Picked, Shipped).

##🎨Design System (Zentory Aesthetics)
The application follows the ZTN Geometric Standard:

Primary: Madder Red (#A52A2A)

Background: Wham-Cream / Tan

Typography: Black, Uppercase, Tracking-wide headers.

Borders: Sharp 90-degree edges (No rounding).

##🛠️ Tech Stack
Framework: Angular (v17/18+)

Styling: Tailwind CSS

Icons: Material Icons & React Icons

Backend: Node.js / Express (Incoming...)

Database: MongoDB / Mongoose (Incoming...)

##📅 Upcoming Milestones
[ ] Connect Express Server and MongoDB.

[ ] Implement live Picking/Packing logic.

[ ] Add PDF Label generation for couriers.

[ ] Build Warehouse Worker-specific Mobile View.

#Zentory: Precision in every movement.