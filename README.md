# 📗 Frontend README  
## (`toll-frontend/README.md`)

```md
# 🚗 Toll Plaza Frontend (Angular)

This is the frontend application for the **Toll Plaza Management System**, built with Angular.  
It allows operators to view vehicle logs, filter data, and add new vehicle entries.

---

## 🧱 Tech Stack

- **Angular**
- **Angular Material**
- **RxJS**
- **TypeScript**

---

## 📂 Project Structure

src/
├── app/
│ ├── components/
│ │ ├── dashboard/
│ │ └── new-entry/
│ ├── models/
│ │ └── vehicle-entry.model.ts
│ ├── services/
│ │ └── vehicle.service.ts
│ ├── app-routing.module.ts
│ └── app.module.ts
└── styles.css

yaml
Copy code

---

## ⚙️ Setup Instructions

### 1️⃣ Install dependencies
```bash
npm install
2️⃣ Run the application
bash
Copy code
ng serve
Frontend will be available at:

arduino
Copy code
http://localhost:4200
🔗 Backend Integration
The frontend communicates with the NestJS backend via REST APIs.

Base API URL:

ts
Copy code
http://localhost:3000/logs
Ensure the backend is running and CORS is enabled.

🖥️ Features
📊 Dashboard
Displays vehicle logs in a responsive table

Columns:

License Plate

Vehicle Type

Timestamp

Toll Fee

Status

🔍 Filtering
Search by license plate

Filter by vehicle type

Mobile-friendly layout

➕ Add New Entry
Reactive form

Fields:

License Plate

Vehicle Type

Auto-calculates toll fee

Submits data to backend

Dashboard updates instantly

🧠 State Management
Uses an Angular Service + BehaviorSubject

Shared state between:

Dashboard

New Entry form

📄 Data Model
ts
Copy code
export type VehicleType = 'Car' | 'Truck' | 'Motorcycle';
export type VehicleStatus = 'Paid' | 'Pending' | 'Violation';

export interface VehicleEntry {
  licensePlate: string;
  vehicleType: VehicleType;
  tollFee: string | number;
  status: VehicleStatus;
  timestamp?: string;
  isGovernment?: boolean;
}
🎨 UI & Responsiveness
Angular Material components

Responsive layout for mobile & desktop

Accessible form controls

🧪 Testing
Tested manually in browser

Verified:

API data rendering

Filtering

Form submission

Live dashboard updates

🚀 Future Enhancements
Edit/update vehicle status

Sorting & pagination

Authentication

Environment-based API URLs

