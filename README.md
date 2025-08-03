🛠️ Project Setup Instructions
Follow these steps to run the project locally:

1. Clone the Repository

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2. Install Dependencies

npm install
# or
yarn install

3. Start the Development Server

npm start
# or
yarn dev
Visit http://localhost:3000 in your browser.

🔧 Project Structure

📦 src/         # Images and static files
├── components/       # Reusable UI components (Header, ThemeToggle, etc.)
├── pages/            # Route-level pages (Home, About, Cart, Contact)
├── store/            # Redux store and cart slice
├── themes/           # Theme definitions
├── context/          # Theme Context setup
├── App.tsx           # Main app component with routes 

🧰 Tech Stack
React + TypeScript

Redux Toolkit for cart state management

styled-components for theming and CSS-in-JS

React Router DOM for navigation

Framer Motion for smooth UI animations

React Toastify for toast notifications


🎨 Features
✨ 3 Theme Modes (Light, Dark, Sidebar)

🛒 Add to Cart and Remove from Cart with Redux

🧾 Order and Address Forms

🧭 Responsive Layout for all devices

🎞️ Animations on theme change and cart interactions

🌙 Animated Sun/Moon toggle switch