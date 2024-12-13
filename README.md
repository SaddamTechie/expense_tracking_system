# Expense Tracking system

RESTFUL API created with NodeJS + Express + Postgres (pg library) + SwaggerUI .

## Description:

Expense tracking API help users track their day to day expense and records them.  
The API implements security best practices for user authentication (e.g., password hashing, JWT).  
It Validates user input and sanitize data to prevent common security vulnerabilities (e.g., SQL injection).  
It has secure data and API endpoints using authentication and authorization mechanisms.

## Documentation

[![wakatime](https://wakatime.com/badge/user/018e3ecb-fa1f-434f-b459-2db22895060e/project/e444a6df-cfd1-40b3-ba11-61ed3505475a.svg)](https://wakatime.com/badge/user/018e3ecb-fa1f-434f-b459-2db22895060e/project/e444a6df-cfd1-40b3-ba11-61ed3505475a)  
The API Documentation is on https://expense-tracker-alpha-swart.vercel.app/api/docs/ implemented  
using SwaggerUI.Feel free to test.

### How to clone the repository on your local machine.

```
git clone https://github.com/SaddamTechie/expense_tracking_system.git
cd expense_tracking_system
npm install
```

Set up your POSTGRES database either locally or use hosting providers like [NEON](https://neon.tech/).
Create .env file in your root of the project directory and add these:

```
PORT = <PORT for running Nodejs app>
PGHOST= <YourPostgresHostUrl>
PGDATABASE= <Your database name>
PGUSER= <Postgres username>
PGPASSWORD= <postgres password>
JWT_SECRET= <Your JWT secret.>
```

**Note:**  
At the time of deployment,swaggerUI v5.6 was not working with vercel,so I needed to downgrade to version 4.3 and used https://cdn.jsdelivr.net/gh/ajatkj/swagger-ui-improved-theme/css/swagger-ui-improved.css cdn for custom styling.You can as well stick to it or change it to your desired version and theme.
