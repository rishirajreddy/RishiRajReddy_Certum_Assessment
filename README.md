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

## Recommended APIs

### 1. Login API

- **Endpoint:** `/api/login`
- **Method:** POST
- **Description:** Authenticate users and generate access tokens.
- **Request Body:**
  ```json
  {
    "phone": "6760555412"
  }
  ```
  - **Response:**
    - **Status Code:** 200 OK
    - **Body:** OTP with user details (otp, user_details)
  - **Authentication:** Not Required

### 2. Signup API

- **Endpoint:** `/api/signup`
- **Method:** POST
- **Description:** Register new users.
- **Request Body:**
  ```json
  For Patient
  {
    "phone": "9832447008",
    "first_name": "Rishi",
    "last_name": "Raj",
    "pincode": "530026",
    "dob": "2000-04-10",
    "gender": "MALE",
    "user_type": "PATIENT"
  }
  For Doctor
  {
    "phone": "9832447018",
    "first_name": "Rishi",
    "last_name": "Raj",
    "pincode": "530026",
    "dob": "2000-04-10",
    "gender": "MALE",
    "user_type": "DOCTOR",
    "speciality": "Cardiac",
    "type": "IN_CLINIC",
    "availability_start": "17:00:00",
    "availability_end": "09:00:00"
  }
  ```
  - **Response:**
    - **Status Code:** 200 OK
    - **Body:** OTP with user details (otp, user_details)
  - **Authentication:** Not Required

### 3. Create Appointment API

- **Endpoint:** `/api/appointments`
- **Method:** POST
- **Description:** Create a new appointment.
- **Request Body:**
  ```json
  {
    "doctor_id": "2",
    "appointment_date": "2024-04-28 10:00:00"
  }
  ```
  - **Response:**
    - **Status Code:** 200 OK
    - **Body:**
      ```json
      {
        "doctor_id": "2",
        "appointment_date": "2024-04-28 10:00:00"
      }
      ```
  - **Authentication:** Required (JWT Token of Patient)

### 4. Get All Appointments API

- **Endpoint:** `/api/appointments`
- **Method:** GET
- **Description:** Retrieve all appointments
- **Response:**
  - **Status Code:** 200 OK
  - **Body:** All Appointments with Doctor Details

### 5. Get All Doctors with Appointments API

- **Endpoint:** `/api/doctors/appointments`
- **Method:** GET
- **Description:** Retrieve all doctors with whom appointments have already been scheduled.
- **Response:**
  - **Status Code:** 200 OK
  - **Body:** All Doctors with Appointment Details

## Extra APIs

### 1. Verify OTP

- **Endpoint:** `/api/verify-otp`
- **Method:** POST
- **Description:** Verify OTP
- **Response:**
  - **Status Code:** 200 OK
  - **Body:** access_token and user_details

### 2. Find Patient ABHA

- **Endpoint:** `/api/abha/patients`
- **Method:** POST
- **Description:** Get Patient's ABHA Details
- **Response:**
  - **Status Code:** 200 OK
  - **Body:** patiet with ABHA Details
- **Authentication:** Required (JWT Required)

### 3. Create Patient ABHA

- **Endpoint:** `/api/abha`
- **Method:** POST
- **Description:** Create Patient's ABHA Details
- **Request Body:**
  ```json
  {
    "abha_number": "99999999991234",
    "abha_address": "6277272772772@abdm"
  }
  ```
- **Response:**
  - **Status Code:** 200 OK
  - **Body:** ABHA Details
- **Authentication:** Required (Patient's JWT Required)

### 4. Find All ABHA

- **Endpoint:** `/api/abha`
- **Method:** GET
- **Description:** Get Patient's ABHA Details
- **Response:**
  - **Status Code:** 200 OK
  - **Body:** All ABHA Details
- **Authentication:** Not Required

### 5. Find All Patients

- **Endpoint:** `/api/patients`
- **Method:** GET
- **Description:** Get All Patients
- **Response:**
  - **Status Code:** 200 OK
  - **Body:** All Patient Details
- **Authentication:** Not Required

### 6. Find All Doctors

- **Endpoint:** `/api/doctors`
- **Method:** GET
- **Description:** Get All Doctors
- **Response:**
  - **Status Code:** 200 OK
  - **Body:** All Doctors Details
- **Authentication:** Not Required
