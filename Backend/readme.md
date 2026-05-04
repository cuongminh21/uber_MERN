# Users API - Register Endpoint

# Backend - file .env
Add connect to mongodb
  Db_CONNECT=DB_MONGO_HERE
Add api google maps key
  GOOGLE_MAPS_API=API_KEY_HERE

# Extension - Backend
> npm init -y
> npm i express
> npm i dotenv cors
> npx nodemon
> npm i mongoose
> npm i bcrypt jsonwebtoken
> npm i express-validator
> npm i cookie-parser
> npm i socket.io

# Extension - Frontend
> npm create vite@latest
  > name: Frontend
  > React
  > javascript
  > no
> npm i react-router-dom
> npm i axios 
> npm i gsap   
> npm i @gsap/react
> npm i remixicon --save
> npm i socket.io-client
> npm i @react-google-maps/api
> npm install tailwindcss @tailwindcss/vite --legacy-peer-deps
> npx tailwindcss init

## Endpoint
POST /users/register

## Description
Register a new user. The endpoint validates input, hashes the password, creates the user record, and returns an authentication token along with the created user data.

## Request Headers
- Content-Type: application/json

## Request Body
JSON object with the following structure:

{
  "fullname": {
    "firstname": "string",    // required, min length 3
    "lastname": "string"      // optional, min length 3
  },
  "email": "user@example.com", // required, must be a valid email
  "password": "string"         // required, min length 6
}

Validation rules enforced:
- fullname.firstname: required, minimum 3 characters
- fullname.lastname: minimum 3 characters if provided
- email: required, must be a valid email
- password: required, minimum 6 characters

## Responses
- 201 Created
  - Description: User created successfully.
  - Body: JSON containing an auth token and the created user object.
  - Example:
    {
      "token": "<jwt-token>",
      "user": {
        "_id": "<userId>",
        "fullname": { "firstname": "John", "lastname": "Doe" },
        "email": "john@example.com",
        "socketId": null
      }
    }

- 400 Bad Request
  - Description: Validation failed. Returns an array of validation error objects.
  - Body example:
    {
      "errors": [
        { "msg": "Invalid Email", "param": "email", "location": "body" },
        { "msg": "First name must be at least 3 characters long", "param": "fullname.firstname", "location": "body" }
      ]
    }

- 500 Internal Server Error
  - Description: Unexpected server error while processing the request.
  - Body: Error message or generic server error response.

## Notes
- Passwords are hashed before storage.
- The returned user object should not include the password field.
- Make sure JWT secret is configured via the JWT_SECRET environment variable for token generation.

## Example cURL
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"John","lastname":"Doe"},"email":"john@example.com","password":"secret123"}'
