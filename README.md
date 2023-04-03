# Chatroomer

Chatroomer is chat application that uses [Socket.IO](https://socket.io/) event based library.

Created with ReactJS and developing done with Vite frontend tool.

# Frontend

## Testing

Chatroomer contains EndtoEnd testing with Cypress. Tests contain some default user routes, like authentication, joining and removing rooms.

Also tests for mobile view to see if everything works correctly when viewport is scaled down.

## Scalablity


Scaling tests done with chrome device toolbar, works properly. Haven't tested with real mobile device so topbar in mobile phones might cause some issues.

# Backend

Node JS [Backend](https://github.com/wepukka/FriendliesServer) connects to frontend with socket and informs client of realtime events, such as users joining room or new messages being posted.

## Authentication

JSON Web Token authentication to confirm user credentials with api request

## Data routes

Routes to handle user and other data changes in database.

# What can u do in Chatroomer?

**Registered users**

    - Join & Delete rooms. Each user have their own rooms they have connected.
    - Chat..
    
# About

This project was made purely as a learning exercise and is not published anywhere.

## Images

Desktop                    |  Mobile
:-------------------------:|:-------------------------:
<img src="https://user-images.githubusercontent.com/83569026/229291361-a0033def-26f6-4b46-bfdb-946ea497355c.png" width="400" heigh="400"/>                         | <img src="https://user-images.githubusercontent.com/83569026/229290107-066224a6-46c3-4f1b-9b0b-117c3b1cf302.png" width="200" heigh="200"/> 
<img src="https://user-images.githubusercontent.com/83569026/229290046-e9f88084-08fe-4e53-a74a-9e67962657e4.png" width="400" heigh="400"/>                    | <img src="https://user-images.githubusercontent.com/83569026/229290188-83197cbf-16dd-47b7-930f-9c00a0801856.png" width="200" heigh="200"/> 
 ![](empty)                       |  <img src="https://user-images.githubusercontent.com/83569026/229290234-1579e947-e00e-4255-ba26-7ac6a86d8e6a.png" width="200" heigh="200"/> 
                           
                           
                           
                           
     
