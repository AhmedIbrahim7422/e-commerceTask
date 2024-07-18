
# E-Commerce Store Web App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.14.

This is a basic e-commerce store web application built using Angular, Angular Material, and Bootstrap. The app provides different views and functionalities based on user roles (Admin and User).

## Features

### Login Display
- **User:** 
  - Username: `test`
  - Password: `testUser`
- **Admin:**
  - Username: `admin`
  - Password: `adminUser`

### Categories/Product Display
- **API:** 
  -Use https://fakestoreapi.com/
- **Admin View:**
  - Displays all products in a table with pagination.
  - Allows adding, updating, and deleting products.
- **User View:**
  - Displays different categories and products under each category with a filter section.
  - Shows full data for each item (using a popup or other suitable methods).


## Setup and Usage

### Prerequisites
- Node.js
- Angular CLI

### Installation
1. Clone the repository:
   git clone https://github.com/AhmedIbrahim7422/e-commerceTask.git
   cd e-commerceTask

2. Install the dependencies:
   npm install

### Running the Application
1. Start the development server:
   ng serve

2. Open your browser and navigate to `http://localhost:4200`.

## Project Structure
- `src/app`: Contains the main application modules and components.
  - `src/app/shared` Contains the main services, Interfaces and Authgarud.
- `src/assets`: Contains static assets like images and styles.
- `src/environments`: Contains environment-specific configuration.

## Development Practices
- Mobile-friendly design with responsive layouts.
- Usage of Angular Material and Bootstrap for a modern UI.
- Consuming API endpoints for dynamic data fetching.

## Contribution
Feel free to fork this project and submit pull requests. Any contributions to enhance the application are welcome.
