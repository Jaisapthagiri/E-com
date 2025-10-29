# 🛍️ Mock E-Commerce Cart

A **full-stack shopping cart web app** built using the **MERN Stack** (MongoDB, Express, React, Node.js).
Users can browse products, add or remove them from the cart, view totals, simulate a checkout, confirm their order, and view their past orders.

This project was developed as part of the **E-Commerce Full Stack**.

---

## 🚀 Features

### 🧑‍💻 User

* Register and login securely
* Browse products
* Add and remove products from the cart
* View cart with total price calculation
* Proceed to checkout and view payment receipt
* Confirm orders (Cash on Delivery flow)
* View all previously confirmed orders in **My Orders** page

---

## 🛠️ Tech Stack

| Layer              | Technology Used              |
| ------------------ | ---------------------------- |
| **Frontend**       | React, Vite, Tailwind CSS    |
| **Backend**        | Node.js, Express.js          |
| **Database**       | MongoDB                      |
| **Authentication** | JWT (stored in localStorage) |
| **HTTP Client**    | Axios with Interceptors      |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Jaisapthagiri/Mock-Ecom-Cart.git
cd Mock-Ecom-Cart
```

### 2️⃣ Install Dependencies

**Frontend**

```bash
cd client
npm install
```

**Backend**

```bash
cd ../server
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the **server** folder:

```bash
PORT=4000
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME = your_jwt_secret
CLOUDINARY_API_KEY = your_jwt_secret
CLOUDINARY_API_SECRET = your_jwt_secret

```

Create a `.env` (or `.env.local`) file in the **client** folder:

```bash
VITE_CURRENCY= ₹
VITE_API_URL= Your backend URL
```

### 4️⃣ Run the Project

**Backend**

```bash
cd server
npm run server
# Runs at http://localhost:4000
```

**Frontend**

```bash
cd client
npm run dev
# Runs at http://localhost:5173
```

---

## 💡 Usage Flow

1. **Login/Register** to access product pages.
2. **Browse products** and add items to your cart.
3. Go to **Cart Page** → review products and prices.
4. Click **Checkout** → navigate to **Payment Page**.
5. On **Payment Page**, you’ll see a **receipt summary** and a **Confirm Order** button.
6. After confirmation, order details are stored in **MongoDB** and you are redirected to **My Orders Page**.
7. The cart is automatically cleared after successful order confirmation.

---

## 📡 API Endpoints

### 🧍 User Authentication

```
POST   /api/user/register     → Register a new user  
POST   /api/user/login        → Login existing user  
GET    /api/user/is-auth      → Verify authentication  
POST   /api/user/logout       → Logout user  
```

### 🛒 Products

```
GET    /api/product/list      → Fetch all products  
GET    /api/product/:id       → Fetch product by ID  
```

### 🛍️ Cart

```
POST   /api/cart/add          → Add product to cart  
DELETE /api/cart/remove/:id   → Remove product from cart  
GET    /api/cart              → Get all items in user’s cart  
```

### 💰 Orders

```
POST   /api/order/cod         → Place order (Cash on Delivery)  
GET    /api/order/user        → Get all orders for logged-in user  
```

---

## 🧩 Frontend Libraries

* `react` – Core UI library
* `react-router-dom` – Routing
* `axios` – API calls
* `react-hot-toast` – Notifications
* `lucide-react` – Icons
* `tailwindcss` – Styling

---

## ⚙️ Backend Libraries

* `express` – Web framework
* `mongoose` – MongoDB ORM
* `jsonwebtoken` – Authentication
* `bcryptjs` – Password hashing
* `dotenv` – Environment variables
* `cors` – Cross-origin support
* `cookie-parser` – Parse cookies
* `cloudinary` – For Storing Images

---

## Image Handling

Product images are uploaded and stored using Cloudinary. The project uses a seed script to automatically populate sample products with pre-uploaded Cloudinary image URLs during initialization.

## 🧾 Project Flow Summary

```
Login/Register → Product List → Add to Cart → Checkout → Payment Receipt → Confirm Order → My Orders
```

---

## 🤝 Contributing

Contributions and suggestions are always welcome!
You can fork this repo and open a pull request with improvements.

---
