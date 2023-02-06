<div align="center">

  <h1>Social App created using EJS and Nodejs</h1>
  
  <p>
    An awesome social media website.
    <br/>
  </p>
  
<h4>
    <a href="https://github.com/taskrepo/hulkappsbackend/blob/main/README.md">Documentation</a>
  <span> · </span>
    <a href="https://github.com/taskrepo/hulkappsbackend/issues">Request Feature</a>
  </h4>
</div>

<br />

<!-- Table of Contents -->
# :notebook_with_decorative_cover: Table of Contents

- [How I approached this problem](#notebook_with_decorative_cover-how-i-approached-this-problem)
- [Environment Variables](#key-environment-variables)
 - [Getting Started](#toolbox-getting-started)
    * [Prerequisites](#bangbang-prerequisites)
    * [Tech Stack](#space_invader-tech-stack)
    * [Features](#dart-features)
    * [Color Reference](#art-color-reference)
- [Roadmap](#compass-roadmap)


# :notebook_with_decorative_cover:  How I approached this problem:

I approached the project with a combination of enthusiasm and focus. As a full-stack developer, I was excited to tackle the challenge of creating a backend and frontend application with a range of functionalities such as user registration, login, logout, post creation, commenting, pagination, and post editing and deletion.

I particularly enjoyed the process of bringing the various components together and watching the project come to life. One aspect I appreciated was the opportunity to apply my skills and knowledge to create a user-friendly and seamless experience for the end-user.

However, I did face some challenges along the way, particularly in ensuring the smooth integration of the frontend and backend. I was able to overcome these challenges through effective troubleshooting and by seeking guidance from more experienced colleagues when necessary.

In total, I estimate that the completion of the project took approximately 20 hours, spread out over several days. Despite the time constraints, I am proud of the end result and the opportunity to demonstrate my passion for software development.

<!-- Env Variables -->
### :key: Environment Variables

To run this project you need to create a .env file and add text given bellow. After that install the node modules using `npm install` and then start the server using the `npm run devStart` command. It will start the server on localhost:3000.

`SECRET_KEY` = secret

`MONGO_URI`= mongodb://localhost:27017/hulkapps -> (NOTE : You can name the collection however you like and use your's localhost port if its different)

`emailError`= "Email already exists in the database"

`emailRegex`= "Email is not in a valid format"

`passwordError`= "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"


`MONGO_URI`= 
For this project you do not need to do this since this is a test project. You can skip this part , or you can add the .env file and change the api key to "process.env.API_KEY".

<!-- Getting Started -->
## 	:toolbox: Getting Started

<!-- Prerequisites -->
### :bangbang: Prerequisites

<!-- TechStack -->
### :space_invader: Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://www.javascript.com/>Javascript</a></li>
    <li><a href="https://ejs.co/">EJS</a></li>
    <li><a href="https://www.selenium.dev/">Selenium Java</a></li>
    <li><a href="https://nodejs.org/en/">NodeJS</a></li>
    
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
     <li><a href="https://www.javascript.com/>Javascript</a></li>
    <li><a href="https://ejs.co/">EJS</a></li>
    <li><a href="https://nodejs.org/en/">NodeJS</a></li>
  </ul>
</details>

<!-- Features -->
### :dart: Features

- Feature 1
    User will be able to register and login onto the website. It has validation of fields and authentification.
- Feature 2
    The user can create , edit , delete , see comments and add a comment onto the post. The user can only delete the post when there are no comments          available.
- Feature 3
    When users opens a post he/she can see the post and have a pagination of seeing the next or previous post.

<!-- Color Reference -->
### :art: Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Primary Color | ![#222831](https://via.placeholder.com/10/222831?text=+) #222831 |
| Secondary Color | ![#393E46](https://via.placeholder.com/10/393E46?text=+) #393E46 |
| Accent Color | ![#00ADB5](https://via.placeholder.com/10/00ADB5?text=+) #00ADB5 |
| Text Color | ![#EEEEEE](https://via.placeholder.com/10/EEEEEE?text=+) #EEEEEE |


<!-- Roadmap -->
## :compass: Roadmap

* [x] Todo 1
* [ ] Todo 2
