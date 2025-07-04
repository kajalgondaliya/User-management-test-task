🚀 NestJS User Management API
A RESTful API built with NestJS and MongoDB for managing user resources with full CRUD operations.
📋 Tech Stack

NestJS (TypeScript)
MongoDB with Mongoose ODM
Class Validator for input validation
Class Transformer for data transformation

🚀 Installation & Setup

1. Clone the Repository

```bash

git clone https://github.com/kajalgondaliya/User-management-test-task.git
cd User-management-test-task

```

2. Install Dependencies

```bash
npm install
```

3. Configure Environment Variables
   Create a `.env` file in the root directory.

```bash
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/user-management
# For MongoDB Atlas, use:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/user-management

# Application Port
PORT=3000
```

4. Run the Application

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

🚀 Swagger API Documentation 

The API documentation is available at `http://localhost:3000`. You can interact with the API using the provided endpoints and request methods.

🧹 Validation Rules

name: Required, string, minimum 2 characters
email: Required, valid email format, unique
age: Required, positive number, minimum 0, maximum 120

