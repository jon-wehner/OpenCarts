<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** jon-wehner, opencarts, twitter_handle, jonjwehner@gmail.com, OpenCarts, project_description
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <!-- <a href="https://github.com/jon-wehner/opencarts">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h3 align="center">OpenCarts</h3>

  <p align="center">
    A platform for connecting users with local businesses. 
    <br />    
    <br />
    <a href="https://opencarts.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/jon-wehner/opencarts/issues">Report Bug/Request Features</a>    
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#technologies">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#frontend-technologies">Frontend Technologies</a>    
    </li>
    <li><a href="#Backend-technologies">Backend Technologies</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project
OpenCarts is a platform for users to connect with local food carts and skip the line. Users can search the platform for local food carts by name, location, or cuisine and make reservations. Users can view past and future reservations, and also leave reviews. The frontend of the application was created in the ReactJS library, and the Express NodeJS framework was utilized for the backend. The application is connected to a postgres databse and deployed to Heroku.

### Technologies
- React with TypeScript
- Redux
- NodeJS
- Express
- Sequelize
- postgreSQL
- CircleCI


## Frontend Technologies
### React with TypeScript
The OpenCarts frontend was created with the aid of the ReactJS library. The application makes heavy use of React's component tree and virtualDOM features to update components without page refreshes. I created components that could be used in several different areas of the application to streamline development and provide a consistent user experience. TypeScript was added to the project to add variable typing and simplify future development of the application. Variable typing reduces errors, and allows developers to easily see what types are being passed into compoments without needing to trace the props through several layers of parent components. 
### Redux 
OpenCarts relies on the redux library for app-wide state management. The modern Redux tooling with Redux Toolkit was adding to simplify the implementation of the Redux library, and reduce the amount of boilerplate code. Redux-thunk is utilized to handle asynclogic utilized in calls to the API.

## Backend Technologies
The backend of the application consists of a RESTful API created with the Express framework. The Sequelize ORM was utilized to interface with a PostgreSQL database. 
### Express
Express is a minimalist web framework for Node.js. A large amount of middleware packages exist that developers can use to streamline API development. It is also possible to create custom middleware, such as a middleware function to handle async calls. Express only has a basic set of features out of the box, and developers can include middleware to improve the functionality of their application. This results in a backend that has only the features required, and nothing extra. 
### PostgreSQL
OpenCarts uses the PostgreSQL database to store application data. Postgres is an open-source and highly regarded relational database system. The system is very well document and has an active development community. One reason that I chose to use a relational database over a NoSQL databse is that I felt it was right for the scale of the application, and the enforced schema validation helps reduce data anamolies.
## Roadmap

See the [open issues](https://github.com/jon-wehner/opencarts/issues) for a list of proposed features (and known issues).


<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Jon Wehner - jonjwehner@gmail.com

Project Link: [https://github.com/jon-wehner/opencarts](https://github.com/jon-wehner/opencarts)

<!-- ACKNOWLEDGEMENTS -->

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/jon-wehner/opencarts.svg?style=for-the-badge
[contributors-url]: https://github.com/jon-wehner/opencarts/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/jon-wehner/opencarts.svg?style=for-the-badge
[forks-url]: https://github.com/jon-wehner/opencarts/network/members
[stars-shield]: https://img.shields.io/github/stars/jon-wehner/opencarts.svg?style=for-the-badge
[stars-url]: https://github.com/jon-wehner/opencarts/stargazers
[issues-shield]: https://img.shields.io/github/issues/jon-wehner/opencarts.svg?style=for-the-badge
[issues-url]: https://github.com/jon-wehner/opencarts/issues
[license-shield]: https://img.shields.io/github/license/jon-wehner/opencarts.svg?style=for-the-badge
[license-url]: https://github.com/jon-wehner/opencarts/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/jonathan-wehner
