Hotel Rooms Application
Description
The Hotel Rooms Application is a web-based platform that allows users to explore and view various hotel room listings. Built with Node.js and Express, the application connects to a MongoDB database to fetch and display room details dynamically. It features a user-friendly interface with responsive design, ensuring a seamless experience across different devices.

Features
View Rooms: Browse a list of available hotel rooms with detailed information.
Responsive Design: Optimized for both desktop and mobile devices.
Dynamic Rendering: Utilizes EJS templates for server-side rendering.
Database Integration: Connects to MongoDB to store and retrieve room listings.
Logging and Error Handling: Implements middleware for logging requests and handling errors gracefully.
Static Assets: Serves static files such as CSS from the public directory.
Technologies Used
Node.js: JavaScript runtime environment.
Express.js: Web framework for Node.js.
MongoDB: NoSQL database for storing room listings.
EJS: Embedded JavaScript templating for dynamic HTML rendering.
Body-Parser: Middleware for parsing incoming request bodies.
dotenv: Loads environment variables from a .env file.
Custom Middleware: For logging (logger.js) and error handling (errorHandler.js).

Usage
Landing Page

Navigate to http://localhost:3000 to view the landing page.
Click the Start button to go to the Rooms page.
Rooms Page

View a list of hotel rooms fetched from the MongoDB database.
Each room entry displays relevant details such as room type, price, and amenities.

## API Endpoints

### Rooms Endpoints

| HTTP Method | Endpoint              | Description                                            |
| ----------- | --------------------- | ------------------------------------------------------ |
| **GET**     | `/rooms`              | Retrieve a paginated and filtered list of hotel rooms. |
| **POST**    | `/rooms/:id/favorite` | Add a specific room to the favorites list.             |

### Favorites Endpoints

| HTTP Method | Endpoint                | Description                                     |
| ----------- | ----------------------- | ----------------------------------------------- |
| **GET**     | `/favorites`            | Retrieve all favorited rooms.                   |
| **POST**    | `/favorites/:id/remove` | Remove a specific room from the favorites list. |
| **POST**    | `/favorites/:id/update` | Update notes for a specific favorite room.      |

-
