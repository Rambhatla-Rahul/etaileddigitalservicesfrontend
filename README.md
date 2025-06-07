# 🛍️ ETailed Digital Services — Frontend

This is the **frontend** repository of the ETailed Digital Services platform, built using **Next.js (App Router)**, **React.js**, and **Tailwind CSS**. It provides a seamless onboarding dashboard UI with theme/layout preferences, user authentication, and data visualizations.

---

## 📸 Preview


> Live deployment: [etaileddigitalservicesfrontend.vercel.app](etaileddigitalservicesfrontend.vercel.app)  (in order to login/signup go to [https://github.com/Rambhatla-Rahul/etaileddigitalservicesbackend](https://github.com/Rambhatla-Rahul/etaileddigitalservicesbackend) and follow the steps to start the server and then login.
> GitHub repo: [https://github.com/Rambhatla-Rahul/etaileddigitalservicesfrontend](https://github.com/Rambhatla-Rahul/etaileddigitalservicesfrontend)

---
## Images of the server for example profile
### Dark Theme
![image](https://github.com/user-attachments/assets/6852cfce-d892-4900-921a-b26e211d3f06)
### Light Theme
![image](https://github.com/user-attachments/assets/55cdbea9-a599-47f9-9740-1f5e1b8b028d)

## ⚙️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/docs) (App Router)
- **Language:** JavaScript (ES6+)
- **UI Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Charting:** [react-chartjs-2](https://react-chartjs-2.js.org/) & [Chart.js](https://www.chartjs.org/)
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Authentication:** JWT-based (token in localStorage)

---

## 🧑‍💻 Getting Started

### 1. 📦 Clone the Repository

```bash
git clone https://github.com/Rambhatla-Rahul/etaileddigitalservicesfrontend.git
cd etaileddigitalservicesfrontend
```
### 2. 🔧 Install Dependencies
bash
```bash
npm install
```
This will install all the required node modules defined in package.json.

### 3. 📁 Create .env File
In the project root, create a .env file to connect the frontend to your backend API:
env
NEXT_PUBLIC_API_URL=http://localhost:5000
⚠️ Make sure your backend server is running and accessible on this URL and port.


### 4. 🚀 Run the Development Server
```bash
npm run dev
```
Then visit: http://localhost:3000


🗂️ Project Structure
```bash

etaileddigitalservicesfrontend/
├── app/                 # Next.js App Router pages
├── components/          # UI components like BasicInfo, TeamInfo
├── context/             # Global user state using Context API
├── public/              # Static files (e.g., icons, logos)
├── styles/              # Tailwind CSS setup (optional overrides)
├── .env                 # Environment variables
├── package.json         # Project scripts and dependencies
└── README.md            # You're here!
```

## 💡 Features
✅ Modern UI with Tailwind
✅ User onboarding with preferences
✅ JWT-based authentication
✅ Theme toggle (light/dark)
✅ Dynamic layout support (grid/flex)
✅ Bar chart visualizations for project progress
✅ Context API for global user management
✅ Protected dashboard routing


## 🧑‍🎓 Author
Rambhatla Rahul
🔗 GitHub: @Rambhatla-Rahul


## 🗣️ Feedback / Issues
If you encounter any issues or want to suggest improvements, feel free to:

⭐️ Star the repository

🐛 Open a GitHub Issue

📩 Submit a Pull Request
