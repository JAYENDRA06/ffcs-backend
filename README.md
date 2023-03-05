[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=10357419&assignment_repo_type=AssignmentRepo)




<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h2 align="center">FFCS backend</h2>
  <h3><a href="https://www.postman.com/blue-shuttle-421600/workspace/ffcs-api/api/e42caaef-2742-44ac-8625-2c986dd2bb5a/documentation/16618256-f9f68df6-3e31-4042-9dab-ce6aacd77177?branch=&version=cd6090c5-9d03-4652-8d59-a11efa2627e3">POSTMAN API documentation </a></h3>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This is a FFCS API developed using **Nodejs and Express** as a part of **dyte vit hiring 2023**. This API provides endpoints which can be used in an application implementing FFCS. The endpoints are protected with **jsonwebtoken authorization**. The login routes are protected with **bcrypt authentication.**

### Database Schema

<img width="1888" alt="FFCS ER DIAGRAM (2)" src="https://user-images.githubusercontent.com/77437382/222975522-bb65611f-51cd-47ca-a154-f956faa5a380.png">


### Built With

![Nodejs](https://img.shields.io/badge/-Nodejs-333333?style=for-the-badge&logo=javascript)
![Express.js](https://img.shields.io/badge/-express.js-333333?style=for-the-badge&logo=express)
![Postgresql](https://img.shields.io/badge/-postgresql-333333?style=for-the-badge&logo=postgresql)


<!-- GETTING STARTED -->
## Getting Started

Here are a few steps you need to follow before executing the project files.

### Prerequisites
* Download and install nodejs from <a href='https://nodejs.org/en/'>here</a>
* Donwload and install postgresql from <a href='https://www.postgresql.org/download/'>here</a>

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/dyte-submissions/vit-hiring-2023-phase-1-JAYENDRA06.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create an .env file in root folder

4. Create a database in postgres named ffcs by entering the below command in psql terminal
   ```sql
    CREATE DATABASE ffcs;
   ```

5. Define the environment variables in `.env` as follows
   ```js
    PORT=3000
    DB_PASS=your_db_password
    DB_NAME=ffcs
    DB_USER=your_db_username
    USER_SECRET=a_hash_value
    ADMIN_SECRET=another_hash_value
   ```
6. Open command prompt in root folder
    ```sh
      node index.js
    ```
    ***after executing this command, all tables will be created in your database as below***
    ![image](https://user-images.githubusercontent.com/77437382/222976360-8318a7e1-2ce0-4a93-b333-b25b4f475358.png)


<!-- USAGE EXAMPLES -->
## Usage

All the API routes with their usages are given below. Preferebly use POSTMAN for accessing endpoints.

### ADMIN ROUTES



**CREATE-ADMIN**

Request route
```sh
POST: http://localhost:3000/admin/createAdmin
```
Example request body
```json
{
  "id": "A002",
  "password": "admin1"
}
```
---

**ADMIN-LOGIN**

Request route
```sh
POST: http://localhost:3000/admin/login
```
Example request body
```json
{
  "id": "A002",
  "password": "admin1"
}
```
The response generated will be something like
```json
{
  "success": true
  "id": "A002",
  "accessToken": "eyJhbGciOiJIUzI1NiJ9.QTAwMg.UWT3kmg_O0ofX8TIgKP1-HrpoWUbdzmv2b20SrZ5R48"
}
```
Note: this access token will be used by jwt for authorization so note it

---

**CREATE-FACULTY**

Request route
```sh
POST: http://localhost:3000/admin/faculty
```
Example request body
```json
{
  "id": "C002",
  "name": "faculty2"
}
```
Authorization header
```sh
Bearer access_token_recieved_earlier
```

---

**CREATE-SLOT**

Request route
```sh
POST: http://localhost:3000/admin/slot
```
Example request body
```json
{
  "id": "A2",
  "timings": [
    {
      "day": "MON",
      "start": "2019-08-24T14:15:21Z",
      "end": "2019-08-24T14:15:21Z"
    },
    {
      "day": "TUE",
      "start": "2019-08-24T14:15:21Z",
      "end": "2019-08-24T14:15:21Z"
    }
  ]
}
```
Authorization header
```sh
Bearer access_token_recieved_earlier
```

---


**CREATE-COURSE**

Request route
```sh
POST: http://localhost:3000/admin/course
```
Example request body
```json
{
  "id": "CSE3001",
  "name": "Augmented reality",
  "slot_ids": [
    "A1",
    "A2"
  ],
  "faculty_ids": [
    "C001",
    "C002"
  ],
  "course_type": "THEORY"
}
```
Authorization header
```sh
Bearer access_token_recieved_earlier
```

---


**CREATE-STUDENT**

Request route
```sh
POST: http://localhost:3000/admin/student
```
Example request body
```json
{
    "id": "20BCE2080",
    "name": "student2",
    "password": "student2"
}
```
Authorization header
```sh
Bearer access_token_recieved_earlier
```

---

### USER ROUTES

**USER-LOGIN**

Request route
```sh
POST: http://localhost:3000/user/login
```
Example request body
```json
{
    "id": "20BCE0536",
    "password": "student1"
}
```

The response generated will be something like
```json
{
    "success": true,
    "id": "20BCE0536",
    "accessToken": "eyJhbGciOiJIUzI1NiJ9.MjBCQ0UwNTM2.uqmFcdz2E_pfKs3oWMojXP94p4yUoU4nZifaql8eZoA"
}
```
Note: this access token will be used by jwt for authorization so note it


---

**GET-FACULTY**

Request route
```sh
GET: http://localhost:3000/faculty/{faculty_id}
```

Authorization header
```sh
Bearer access_token_recieved_earlier
```

---

**GET-COURSE**

Request route
```sh
GET: http://localhost:3000/course/{course_id}
```

Authorization header
```sh
Bearer access_token_recieved_earlier
```

---

**REGISTER-COURSE**

Request route
```sh
POST: http://localhost:3000/register
```
Example request body
```json
{
  "course_id": "CSE3001",
  "faculty_id": "C001",
  "slot_ids": [
    "A1"
  ]
}
```

Authorization header
```sh
Bearer access_token_recieved_earlier
```

---

**GET-TIMETABLE**

Request route
```sh
GET: http://localhost:3000/timetable
```

Authorization header
```sh
Bearer access_token_recieved_earlier
```

---


_For more information about requests and responses generated, please refer to the [Documentation](https://www.postman.com/blue-shuttle-421600/workspace/ffcs-api/api/e42caaef-2742-44ac-8625-2c986dd2bb5a/documentation/16618256-f9f68df6-3e31-4042-9dab-ce6aacd77177?branch=&version=cd6090c5-9d03-4652-8d59-a11efa2627e3)_


<!-- CONTACT -->
## Contact

Jayendra Awasthi - jayendraawasthi06@gmail.com

<a href="https://github.com/JAYENDRA06">![Gihutb](https://img.shields.io/badge/-JAYENDRA-333333?style=for-the-badge&logo=github)</a>
