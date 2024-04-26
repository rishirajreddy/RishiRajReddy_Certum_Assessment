# Certum Assessment API

## Prerequisites

Ensure Node.js and NPM are installed on your computer.

## Installation

1. Clone the repository from the GitHub.
2. Navigate to the project directory:
   ```
   cd project_name
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a postgres database or you can use if you have any.

5. Modify the postgres credentials in `/config/db.config.js`

6. You can run `npm run import` to import the demo data to your database.

7. Start the application:
   ```
   npm run dev
   ```

## Validations

Request body validations are implemented using the Joi NPM package for both Users and Appointments.

## Postman Collection

Explore and test the API endpoints using the Postman collection

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/33652057-5f8ee3b9-6fa1-4a0a-8ec2-78d6b00d9bba?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D33652057-5f8ee3b9-6fa1-4a0a-8ec2-78d6b00d9bba%26entityType%3Dcollection%26workspaceId%3D68f6ed53-7aef-48e0-9d63-44c80c7cb542)
