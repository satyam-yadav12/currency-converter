# 💱 Currency Converter App

A modern, responsive currency converter built with **React**, **Vite**, **Tailwind CSS**, and **Material UI**. It fetches real-time and historical exchange rates using the [CurrencyBeacon API](https://currencybeacon.com/).

---

## ✨ Features

- Dynamic Currency Search
- Real time Currency Conversion
- Time-Series Graphs (7D, 30D, 90D)
- Top 10 Currency Rates at a Glance
- Conversion History with LocalStorage

---

## 🛠 Tech Stack

- **Frontend**: React + Vite +JavaScript
- **Styling**: Tailwind CSS, Material UI
- **Charting**: @mui/x-charts
- **HTTP Requests**: Axios
- **API**: CurrencyBeacon

---

## 🔗 Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

## ⚙️ Setup Instructions

### Prerequisites

- Install [Node.js](https://nodejs.org/)

### Project Setup

```bash
npm create vite@latest currency-converter --template react
cd currency-converter
npm install
```

### Install Dependencies

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/x-charts axios
```

Configure Tailwind in `tailwind.config.js` and add the `@tailwind` directives in `index.css`.

---

## 🔐 Environment Variables

Create a `.env` file in the root of your project:

```env
VITE_API_URL=https://api.currencybeacon.com/v1/convert?
VITE_API_KEY=your_api_key_here
VITE_API_SERIES=https://api.currencybeacon.com/v1/timeseries?
VITE_API_LATEST=https://api.currencybeacon.com/v1/latest?
```

> Do not commit this file. Add `.env` to `.gitignore`.

---

## ✅ Run the App

```bash
npm run dev
```

> The app runs at `http://localhost:5173/` by default.

---

## 📬 Contribution

Contributions are welcome! If you'd like to add features or fix bugs, feel free to fork the repo and open a pull request
