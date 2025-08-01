# CrossLink Backend API

A Node.js/Express backend API that connects schools, interns, and employers in one platform. Built with Sequelize ORM and PostgreSQL database.

## 🚀 Features

- **Authentication System** - User registration and login with JWT
- **Goal Management** - Internship goals tracking and management
- **Reflections** - Student reflection and feedback system
- **Student Management** - Student profiles and data
- **Employer Management** - Employer profiles and interactions
- **Reporting System** - Get reports and analytics
- **School Management** - School profiles and administration

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Development**: nodemon

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **PostgreSQL** database server
- **npm** package manager

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/BayinganaEdwin/crosslink-bn.git
cd crosslink-bn
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

**⚠️ Important**: This application requires environment variables to run properly. Without them, the app will not start.

Create a `.env` file in the root directory and add the following variables:

```env
# Database Configuration
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_NAME=crosslink_db
DATABASE_URL=postgresql://username:password@host:port/database

# Server Configuration
PORT=9000
NODE_ENV=development

# JWT Secret (for authentication)
JWT_SECRET=your_jwt_secret_key
```

**Note**: Refer to the `.env.example` file for the exact variable names and format.

### 4. Database Setup

Make sure your PostgreSQL server is running and create a database (the app will attempt to create it automatically if it doesn't exist).

### 5. Run the Application

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start on `http://localhost:9000` (or the port specified in your .env file).

## 📚 API Endpoints

The API provides the following main routes:

- `/api/auth` - Authentication endpoints
- `/api/goals` - Internship goals management
- `/api/reflections` - Student reflections and feedback
- `/api/students` - Student management
- `/api/employers` - Employer management
- `/api/reports` - Reporting and analytics
- `/api/school` - School management

## 🗄️ Database Models

- **User** - User authentication and profiles
- **InternshipGoal** - Internship goals and objectives
- **Reflection** - Student reflections and feedback
- **Feedback** - Feedback system

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS enabled for cross-origin requests
- Environment variable protection

## 📝 Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon

**Note**: Make sure to set up your environment variables properly before running the application. The app will not function without the required database and JWT configuration. 