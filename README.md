# Blogue - client

[![Netlify Status](https://api.netlify.com/api/v1/badges/226f0fc3-cf20-46f0-a3a6-9405d6a47167/deploy-status)](https://app.netlify.com/sites/blogue/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![](assets/images/demo.gif)

A anonymous community journalling site built using JavaScript, HTML, and CSS, inspired by the aesthetics of Vogue magazine.
Users can make posts anonymously, with an optional feature to add a GIF.
Other users can comment and react on the submitted posts.

### Installation

-   Clone or download this repo and [blogue-server](https://github.com/roselynle/blogue-server) repo

### Usage

-   Open your terminal/CLI and navigate to the `blogue-server` folder
-   Run `npm install` to install dependencies
-   Run `npm start` to launch server
-   Navigate to the `blogue-client` folder
-   Run `npm install` to install dependencies
-   Load `index.html` in your browser
-   Happy posting!

## Technologies

-   Client side: JavaScript, CSS and HTML
-   Test suite: Jest
    -   Dependencies include: Concurrently, Watchify, Jest-Fetch-Mock

## Process

-   Split the team into into two and created separate repos for the front end and back end
-   Discussion on how we envisioned the user interface to look like
-   Mapped out the basic layout of the webapge on Wireframe
-   Researched how to implement any required technologies for the project that we were unfamiliar with
-   Made use of the GitHub project board to keep on top of required tasks and used Slack to communicate team progress
-   Implemented a number of features and functionalities and tested these
-   Improved the user interface by adding styling
-   Debugged any issues we came across

## Wins & Challenges

### Wins

-   Achieved a minimum viable product. The following functionalities are available to the user: making anonymous posts, adding GIFs, reacting and commenting on other peoples' posts
-   Users can see all the posts towards the bottom of the page as well as when they were posted
-   Client side sucessfully sends data to server and can be accessed. In addition, server side can receive and send data back to the client
-   Character count tracking function which shows users how many characters they have left out of the max length
-   Webpage is responsive on a majority of devices
-   Successful incorporation of the Giphy API allowing users to retreive GIFs

### Challenges

-   Difficulties with unit testing on complicated functions
-   Coming across numerous bugs and error messages on developer tools

## Bugs

-   Preview of GIF image does not disappear when post is submitted, it will only disappear when the page is refreshed.
-   The following bugs were encountered during the process and fixed: communication issues between client and server side, posts not appending to page upon clicking submit, form not clearing once post has been submitted, multiple GIFs being generated upon clicking 'add gif' button, emoji reaction count not incrementing

## Future Features

-   Adding a functionality to allow the users to sort the submitted posts (e.g. in most recent or most reacted order)
-   Granting superuser access to the admin so that they are able to delete or edit any posts (e.g. posts that may be inappropriate or hateful)
-   Grouping the posts with tags pertaining to their subject matter, so that users to find posts relating to a specific subject matter.
-   Search feature to allow users to find posts using specific keywords

## Licence

-   MIT
