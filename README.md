# Nyamakima TechTrend 🛒
This project was submitted as part of my PLP Web Development Module final Project. The concepts applied are part of the trhematic areas learnt in class with great guidance of Mr. Dedan Okware.

![Nyamakima TechTrend](https://via.placeholder.com/1200x630?text=Nyamakima+TechTrend)

A modern e-commerce platform for tech products based in Kenya. This responsive web application allows users to browse, filter, and purchase the latest tech gadgets with a seamless shopping experience.

**🔗 Live Demo:** [Nyamakima TechTrend](https://feb-2025-final-project-and-deployment-rkimathi-5vq38fb84.vercel.app/)

## 📋 Features

- **Responsive Design**: Fully responsive interface that works on desktops, tablets, and mobile devices
- **Product Catalog**: Browse through a variety of tech products
- **Category Filtering**: Filter products by category (laptops, phones, accessories)
- **Price Sorting**: Sort products by price (low to high, high to low)
- **Shopping Cart**: Add products to cart, adjust quantities, and remove items
- **Order Summary**: Real-time calculation of subtotal, tax, and total with shipping
- **Newsletter Subscription**: Stay updated with the latest products and promotions
- **Accessibility Features**: Includes skip links and proper ARIA attributes

## 🛠️ Technologies Used

- **HTML5**: Semantic markup for structure
- **CSS3**: Custom styling with variables and responsive design
- **JavaScript**: Vanilla JS for dynamic functionality
- **FontAwesome**: Icons for enhanced UI
- **LocalStorage**: For persisting cart data
- **Vercel**: For deployment and hosting

## 🏗️ Project Structure

```
nyamakima-techtrend/
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   └── (product images)
├── index.html
├── products.html
├── cart.html
└── README.md
```

## 💡 Core Functionality

### Product Display

- Dynamically loads products from a JavaScript array
- Displays products with images, descriptions, and prices
- Allows adding products to cart directly from the listing

### Shopping Cart

- Persists cart data using localStorage
- Allows increasing/decreasing product quantities
- Calculates tax (16% VAT) and includes fixed shipping cost
- Simulates checkout process

### Filtering System

- Category-based filtering (All, Laptops, Phones, Accessories)
- Price-based sorting (Default, Low to High, High to Low)

## 🚀 Getting Started

### Prerequisites

- Any modern web browser
- Basic understanding of HTML, CSS, and JavaScript (for developers)

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nyamakima-techtrend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd nyamakima-techtrend
   ```

3. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python's built-in server (if Python is installed)
   python -m http.server
   ```

4. Access the site at `https://feb-2025-final-project-and-deployment-rkimathi-5vq38fb84.vercel.app`

## 📝 Future Improvements

- User authentication and account management
- Product search functionality
- Reviews and ratings system
- Payment gateway integration
- Admin dashboard for product management
- Wishlist feature
- Related products suggestions

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contact

For questions or feedback, please reach out at:
- Email: mwika.roy@gmail.com
- Phone: +254710831415

---

© 2025 Nyamakima TechTrend. All rights reserved.
