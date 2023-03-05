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
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This is a FFCS API developed using **Nodejs and Express** as a part of **dyte vit hiring 2023**. This API provides endpoints which can be used in an application implementing FFCS. The endpoints are protected with **jsonwebtoken authorization**. The login routes are protected with **bcrypt authentication.**




### Built With

![C++](https://img.shields.io/badge/-Nodejs-333333?style=for-the-badge&logo=javascript)
![Express](https://img.shields.io/badge/-express.js-333333?style=for-the-badge&logo=express)
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
    npm start
  ```


<!-- USAGE EXAMPLES -->
## Usage

All the API routes with their usages are given below. Preferebly use POSTMAN for accessing endpoints.

### ADMIN ROUTES



**CREATE-ADMIN**

request route
```sh
   http://localhost:3000/admin/createAdmin
```
example request body
```json
  {
    "id": "A002",
    "password": "admin1"
  }
```
---

**ADMIN-LOGIN**

request route
```sh
   http://localhost:3000/admin/login
```
example request body
```json
  {
    "id": "A002",
    "password": "admin1"
  }
```
---


_For more examples, please refer to the [Documentation](https://www.postman.com/blue-shuttle-421600/workspace/ffcs-api/api/e42caaef-2742-44ac-8625-2c986dd2bb5a/documentation/16618256-f9f68df6-3e31-4042-9dab-ce6aacd77177?branch=&version=cd6090c5-9d03-4652-8d59-a11efa2627e3)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Jayendra Awasthi - jayendraawasthi06@gmail.com


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
