# My Project

This project includes a React application and a PHP backend that interacts with a MySQL database. This README provides instructions on how to set up the PHP backend using XAMPP and import the SQL schema to create the necessary database and the table.

## Project Structure

```
Tryonics_Task/
│
├── fronend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── php-backend/
│   ├── fetch_users.php
│   ├── insert_user.php
│   ├── update_user.php
│   ├── delete_user.php
│
├── database.sql
│
└── README.md
```

## Prerequisites

- [XAMPP](https://www.apachefriends.org/index.html) installed on your system.
- Basic knowledge of how to use XAMPP and MySQL.

## Setting Up the PHP Backend

1. **Start XAMPP:**
   - Open XAMPP Control Panel.
   - Start the Apache and MySQL modules.

2. **Add PHP Backend to XAMPP:**
   - Copy the `php-backend` folder from this project.
   - Paste the `php-backend` folder into the `htdocs` directory of your XAMPP installation. The `htdocs` directory is typically located at:
     ```
     C:\xampp\htdocs\
     ```

3. **Verify PHP Backend:**
   - Open your web browser.
   - Go to `http://localhost/backend/fetch_users.php` (or any other PHP file you want to test) to verify that the PHP backend is accessible.

## Import SQL Schema to MySQL

1. **Open phpMyAdmin:**
   - In your web browser, go to `http://localhost/phpmyadmin`.

2. **Import SQL Schema:**
   - Click on the `Import` tab.
   - Click on `Choose File` and select the `database.sql` file 
   - Click `Import` to import the SQL schema. This will create the database and the necessary tables and insert some data.

## Running the React Application

1. **Navigate to Frontend Directory:**
   - Open a terminal or command prompt.
   - Navigate to the `frontend` directory:
     ```bash
     cd .\frontend\
     ```

2. **Install Dependencies:**
   - Make sure you have [Node.js](https://nodejs.org/) installed.
   - Install the required dependencies:
     ```bash
     npm install
     ```

3. **Start the React Application:**
   - Start the development server:
     ```bash
     npm start
     ```
   - The React application should now be running at `http://localhost:3000`.

## Conclusion

Your PHP backend should now be set up and running on XAMPP, and your MySQL database should be configured with the necessary tables. You can start building and testing React application with the backend API.
