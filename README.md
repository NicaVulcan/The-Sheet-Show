# The-Sheet-Show

A concept DnD Character Creator Web App Built on MySQL, Node, Express, and Handlebars.
> Click here to see live demo: https://sheetshow.erikplachta.com

## User Story

Sheet Show is a Web App designed to expedite character creation for Dungeons and Dragons 5th Edition. The app allows users to create a character, save it to a database, and then view it on a character sheet. The character sheet is a dynamic page that is generated based on the user's input. The user can then edit the character and save the changes to the database. The user can also delete the character from the database.

- WHEN user navigates to website, THEN all existing characters are displayed.
- WHEN user creates an account, THEN user is redirected to the home-page logged in.
- WHEN user is logged in, THEN they have CRUD access to their own characters.

## Authors

- [Christiana Morales](https://github.com/NicaVulcan)
- [Connie Barrantes](https://github.com/barrantesc)
- [Erik Plachta](https://github.com/erikplachta)
- [Mary Margaret Lawton](https://github.com/mmlawton15)

## Milestones

- :ballot_box_with_check: **Alpha Release** | MVP Proof of Concept 
  > 2021-02-22 | Group completed fully functional proof of concept.
- :white_medium_square: **Beta Release** - Polished Release Ready for User Base
  > NOTE: A beta release of this application may never happen. This project was something we did as a group to learn more about related technologies and get experience working as a team. We may continue to work on this project in the future, but it is not a priority.

---

## Application Overview

<!-- ### Login Page

Where users navigate to 

<img src='./LogIn.png' width="600" /> -->

### Character Creator

 Create a new Character via the Character Creator page. All created characters
 for all users are displayed on the home page. Character Sheets can be deleted,
 updated, and viewed by signed in users.
> NOTE: At this time ALL users can edit all characters. 

<img src='./CharacterCreator.png' width="600" />

### Characters

> Viewing 

<img src='./Characters.png' width="600" />

### Character Sheet

> View

> Once logged in, you can navigate to https://sheetshow.erikplachta.com/character-sheet to view a blank character sheet.

<img src='./Sheet.png' width="600" />

---

## Technologies

A list of all technologies used within the project:

- Bcrypt
- Bootstrap
- Connect-Session-Sequelize
- Character-Sheet-CSS
- DnD5e API
- Dotenv
- Express
- Express-Handlebars
- Express-Session
- MySQL2
- Node.js
- Restful API
- Sequelize

## MIT License

[MIT License](./LICENSE)