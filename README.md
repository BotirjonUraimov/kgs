# KSG API Server

This is the backend API server for the KSG app, built with Express.js and TypeScript. It interfaces with PostgreSQL for data persistence and the Skinport API for fetching item data.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (v14.x or newer recommended)
- PostgreSQL (v12.x or newer recommended)
- npm (usually comes with Node.js)

## Installation

Follow these steps to get your development environment running:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BotirjonUraimov/ksg.git
   cd ksg

2. **Install dependencies:**
   ```bash
   npm install
   
3. **Set up the PostgreSQL database:**
   - Make sure PostgreSQL is running.
   - Create a database named user (or another name, but ensure it matches your .env setup).
   - Use the SQL provided in this README to create the necessary tables.
     
4. **Configure environment variables:**
   - Copy the .env.example file to a new file called .env.
   - Adjust the DATABASE_URL in the .env file to match your PostgreSQL credentials and database name.
   - Use the SQL provided in this README to create the necessary tables.
     
   Example .env content:
   
   ```bash
   DATABASE_URL=postgres://username:password@localhost:5432/user

## Running the Application

  **To run the application locally:**
    ```bash
    npm start

This will compile the TypeScript files and start the server on the port specified in your .env file (default is 3000). You can access the API at http://localhost:3000.

## API Endpoints

The server has the following endpoints:

- **GET /api/items:**
   - Fetches item data from the Skinport API and returns it with additional fields for tradable and non-tradable minimum prices. Caching is implemented to improve performance.
- **POST /api/users/deduct:**
   - Deducts a specified amount from a user's balance. Body parameters required are userId (integer) and amount (decimal).


## Database Setup

    
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      balance DECIMAL(10, 2) NOT NULL
     );
  
  **Insert a sample user for testing:**
  
    
    INSERT INTO users (balance) VALUES (1000.00);

## Testing

Currently, there are no automated tests set up. You can test the API using tools like Postman or cURL.

## Contributing

Contributions are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
ISC







   
