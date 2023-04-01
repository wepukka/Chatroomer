# Chatroomer

Chatroomer is chat application that uses [Socket.IO](https://socket.io/) event based library.

Created with ReactJS and developing done with Vite frontend tool.

# Frontend

## Testing

Chatroomer contains EndtoEnd testing with Cypress. Tests contain some default user routes, like authentication, joining and removing rooms.

Also tests for mobile view to see if everything works correctly when viewport is scaled down.

## Scalablity

Scaling tests done with chrome device toolbar, works properly. Haven't tested with real mobile device so topbar in mobile phones might cause some issues due to viewport height is not

# Backend

Node JS [Backend](https://github.com/wepukka/FriendliesServer) connects to frontend with socket and informs client of realtime events, such as users joining room or new messages being posted.

## Authentication

JSON Web Token authentication to confirm user credentials with api request

## Data routes

Routes to handle user and other data changes in database.

# What can u do in Chatroomer?

- Join & Delete rooms. Each user have their own rooms they have connected.
- Chat..

# About

This project was made purely as a learning exercise and is not published anywhere.
