# Hubly - Ticket Management System

![Hubly Logo](Frontend/src/Images/logo_full.png)

Hubly is a comprehensive ticket management system designed to help businesses streamline customer interactions, track support tickets, and manage team workflows efficiently. This full-stack application provides a robust CRM solution with features for ticket tracking, team management, analytics, and an integrated chatbot.

## 🌟 Features

### User Management
- User registration and authentication
- Role-based access control
- User profile management

### Ticket Management
- Create, view, update, and resolve support tickets
- Ticket categorization and prioritization
- Real-time status tracking
- Search and filter functionality

### Team Collaboration
- Team creation and management
- Ticket assignment to team members
- Team performance analytics

### Dashboard & Analytics
- Comprehensive dashboard with ticket overview
- Performance metrics and analytics
- Visual data representation with charts and graphs

### Chatbot Integration
- AI-powered chatbot for customer support
- Automated ticket creation from chat interactions
- Customizable chatbot responses

### Contact Center
- Centralized communication hub
- Message history and tracking
- Customer information management

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19
- **Routing**: React Router v7
- **UI Components**: Custom components with CSS
- **Charts**: Recharts for data visualization
- **Progress Indicators**: React Circular Progressbar
- **Notifications**: React Toastify
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: Bcrypt for hashing
- **Validation**: Validator and Password-validator

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

## 🚀 Installation & Setup

### Clone the Repository
```bash
git clone https://github.com/yourusername/hubly-ticket-management.git
cd hubly-ticket-management
```

### Backend Setup
```bash
cd Backend
npm install

# Create a .env file with the following variables:
# PORT=5001
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# CLIENT_URL=http://localhost:5173

# Start the backend server
npm start
```

### Frontend Setup
```bash
cd Frontend
npm install

# Create a .env file with:
# VITE_API_URL=http://localhost:5001

# Start the frontend development server
npm run dev
```

## 🌐 Deployment

### Backend Deployment (Render)
1. Create a Render account at [render.com](https://render.com/)
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the service:
   - Build Command: `cd Backend && npm install`
   - Start Command: `cd Backend && npm start`
   - Add environment variables (PORT, MONGO_URI, JWT_SECRET, CLIENT_URL)

### Frontend Deployment (Netlify)
1. Create a Netlify account at [netlify.com](https://netlify.com/)
2. Connect your GitHub repository
3. Configure the build settings:
   - Base directory: `Frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables:
   - VITE_API_URL: Your deployed backend URL

## 📱 Application Structure

```
ticket-management-full-stack/
├── Backend/
│   ├── Controllers/       # Request handlers
│   ├── Middleware/        # Authentication and authorization
│   ├── Models/            # Database schemas
│   ├── Routes/            # API endpoints
│   ├── server.js          # Entry point
│   └── package.json       # Dependencies
│
└── Frontend/
    ├── public/            # Static assets
    ├── src/
    │   ├── Components/    # Reusable UI components
    │   ├── Images/        # Image assets
    │   ├── Pages/         # Application pages
    │   ├── UserContext.jsx # User authentication context
    │   ├── main.jsx       # Entry point
    │   └── index.css      # Global styles
    ├── index.html         # HTML template
    ├── vite.config.js     # Vite configuration
    └── package.json       # Dependencies
```

## 🔐 Authentication Flow

1. User registers or logs in
2. Backend validates credentials and issues a JWT
3. Frontend stores the JWT in localStorage
4. JWT is included in the Authorization header for protected API requests
5. Protected routes check for valid JWT before granting access

## 🔄 API Endpoints

### User Routes
- `POST /users/register` - Register a new user
- `POST /users/login` - Authenticate a user
- `GET /users/profile` - Get user profile information

### Ticket Routes
- `GET /tickets/:userId` - Get all tickets for a user
- `GET /tickets/:userId/status/:status` - Get tickets by status
- `POST /tickets` - Create a new ticket
- `PUT /tickets/:id` - Update a ticket
- `DELETE /tickets/:id` - Delete a ticket

### Team Routes
- `GET /team` - Get all teams
- `POST /team` - Create a new team
- `PUT /team/:id` - Update a team
- `DELETE /team/:id` - Delete a team

### Chatbot Routes
- `POST /chatbot/message` - Send a message to the chatbot
- `GET /chatbot/history/:userId` - Get chat history for a user

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 📞 Contact

For any questions or feedback, please reach out to [your-m43378361@gmail.com](mailto:m43378361@gmail.com).

---

