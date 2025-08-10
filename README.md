
# JWT Authentication with Passport.js Example

This repository demonstrates a simple JWT-based authentication system using Express.js, Passport.js, and `passport-jwt`. Users can log in with username and password, receive a JWT token, and access protected routes by sending the token.

---

## Features

- User login with username and password.
- JWT token generation on successful login.
- Protect routes using Passport JWT strategy.
- Validate JWT tokens sent via `Authorization` header as Bearer token.
- Simple in-memory user store (replace with a database in production).
- Environment variable support for JWT secret key using `dotenv`.

---

## Project Structure

- `main.js` : Express app setup and server start.
- `config/passport-jwt.js`: Passport JWT strategy configuration.
- `routes/index.js`: Routes for login and protected endpoints.
- `.env`: Environment variables (contains `JWT_SECRET_KEY`).

---

## Setup

1. Clone the repo:
```bash
   git clone https://github.com/ashutoshh-jhaa/jwt-auth.git
   cd jwt-auth
 ```
2. Install dependencies:
```bash
npm install express passport passport-jwt jsonwebtoken dotenv
```
3. Create a .env file in the root with:
```bash
JWT_SECRET_KEY=your_secret_key_here
```
4. Start the server:
```bash
node index.js
```

### Usage
---
####   Login
- Send a POST request to /login with form data:
- Field	Description
    username	User's username
    password	User's password
    - Example:
	  ```bash
	  curl -X POST http://localhost:4000/login -d "username=ashutosh&password=1234"
	  ```
	-   Response:
		  ```bash
		  {
		    "token": "jwt_token_here"
		  }
		  ```

####  Access Protected Route
-  Send a GET request to /dashboard with the JWT token in the Authorization header
	  ```bash
	    curl -H "Authorization: Bearer <jwt_token_here>" http://localhost:4000/dashboard
	  ```
	- Response:
		```html
		Welcome to dashboard, <username>
		```
  
### How It Works
---
- Login Route: Validates username and password, then creates and returns a JWT token.
- JWT Strategy: Extracts the token from the Authorization header, verifies it, and finds the user by ID embedded in the token.
- Protected Routes: Use passport.authenticate('jwt') middleware to ensure the user has a valid JWT token before allowing access
