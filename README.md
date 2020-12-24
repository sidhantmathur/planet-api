# Planet API

The way to get information about all discovered exo-planets

## Important Links

- [Hosted Site](https://sidhantmathur.github.io/exo-planetarium/#/)
- [Client Repo](https://github.com/sidhantmathur/exo-planetarium)
- [Heroku Hosted API](https://gentle-wave-86032.herokuapp.com/)
- [Data Source](https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PSCompPars)

## User Stories

- As a new user I'd like to create an account

- As an existing user I'd like to sign in

- As an authenticated user I'd like to update my password

- As an authenticated user I'd like to log out

- As an authenticated user I'd like to view some cool pre-made exoplanet data

- As an authenticated user I'd like to look for my own planets

- As an authenticated user I'd like to have cool visualizations and graphs of the data.

- As an authenticated user I'd like to save planets later and CRUD them.

## Technologies Used

### Back-End

- Node.js
- Express
- MongoDB
- Mongoose
- MongoDB Atlas
- Heroku

### Front-End

- React
- HTML/CSS/Javascript
- Bootstrap
- Chakra-UI

## Future Development

- Stripe integration; limit favs and search number, unlimited for paid subscribers
- Save planet from 'show more' page
- More links to further information about facilities, publications etc.

## Wireframe and More

[Planning Wireframe & ERD](https://imgur.com/LaDhYRF)

### Routes

| Request | URL               | Function                  |
|---------|-------------------|---------------------------|
| GET     | /favs             | Index of user's favs      |
| GET     | /favs/:id         | Show one fav              |
| POST    | /favs             | Create fav                |
| PATCH   | /favs/:id         | Update fav                |
| DELETE  | /favs/:id         | Delete fav                |
| DELETE  | /favs-delete-all/ | Delete all favs           |

| Request | URL             | Function                  |
|---------|-----------------|---------------------------|
| GET     | /planets-index/ | Index of all planets      |
| GET     | /planets/:id    | Show one planet           |
