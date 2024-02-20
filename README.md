# Product Transaction Dashboard

This project comprises a backend API and frontend application. The backend initializes a database from a third-party API, provides transaction-related endpoints, and computes statistics, charts, and combined data. The frontend visualizes transactions, statistics, and charts with a user-friendly interface, offering functionalities like search, pagination, and month filter.

# Project Screenshots

<img width="978" alt="image" src="https://github.com/Shivam-Samant/product_transaction_dashboard/assets/91321534/7089eb55-e504-4f93-90f5-1435730b1b0c">

<img width="988" alt="image" src="https://github.com/Shivam-Samant/product_transaction_dashboard/assets/91321534/455d8083-1396-4963-9480-cf243a373ec8">

<img width="984" alt="image" src="https://github.com/Shivam-Samant/product_transaction_dashboard/assets/91321534/7e1d1410-9c63-4a36-ab82-7bf8e2ecab05">

<img width="993" alt="image" src="https://github.com/Shivam-Samant/product_transaction_dashboard/assets/91321534/e846ffcd-cf32-4cee-95a3-9dcd027b6a0b">

<img width="573" alt="image" src="https://github.com/Shivam-Samant/product_transaction_dashboard/assets/91321534/391c287b-4cb9-48d9-9be7-ad04677991ba">

# Installation Steps

1. Clone the repository
    ```sh
    git clone https://github.com/Shivam-Samant/product_transaction_dashboard.git
    ```

1. Navigate to the project directory
    ```sh
    cd product_transaction_dashboard
    ```

## Frontend Setup

1. Move to the frontend directory
    ```sh
    cd client
    ```

1. Install the application dependencies
    ```sh
    npm install
    ```

1. Copy the `.env.example` file as `.env` and configure it accordingly
    ```sh
    cp .env.example .env
    ```

1. Run the application
    ```sh
    npm start
    ```

## Backend Setup

1. Move to the backend directory
    ```sh
    cd server
    ```

1. Install the application dependencies
    ```sh
    npm install
    ```

1. Copy the `.env.example` file as `.env` and configure it accordingly
    ```sh
    cp .env.example .env
    ```

1. Hit the below endpoint to seed the data in the database
    ```sh
    <backend-url>/api/product-transactions/init
    ```
    **Note:** The default backend url is `http://localhost:8000`

1. Run the application
    ```sh
    npm run dev
    ```
