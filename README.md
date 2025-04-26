# Invoice System

An easy-to-use web application for creating, managing, and tracking invoices.

## ✨ Features
- Create and manage invoices
- Client management
- Payment tracking
- Dashboard with quick stats
- Secure authentication with JWT

## 🛠 Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)

## 🚀 Setup Instructions

### Database Setup
- Import the provided database file into your PostgreSQL server.
- Create a `.env` file inside the backend project folder and add:
  ```
  DB_URL="<add your database link>"
  JWT_SECRET="<add your secret>"
  ```

### Backend Setup
1. Open your terminal.
2. Navigate to the backend folder:
   ```
   cd invoice-system-backend
   ```
3. Install backend dependencies:
   ```
   npm install
   ```
4. Start the backend server with nodemon:
   ```
   npx nodemon server.js
   ```

### Frontend Setup
1. Open a new terminal window/tab.
2. Navigate to the frontend folder:
   ```
   cd invoice-system-frontend
   ```
3. Install frontend dependencies:
   ```
   npm install
   ```
4. Start the frontend development server:
   ```
   npm start
   ```

## 📸 Screenshots
> _Add some screenshots of your app here after setup!_

Example:

![Dashboard Screenshot](path/to/dashboard-screenshot.png)

## 📄 License
This project is licensed for educational purposes.

## 👌 Acknowledgements
Thanks to everyone who contributed to open-source libraries used in this project.


