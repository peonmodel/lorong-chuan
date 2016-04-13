# About
Lorong is a webapp that enables boardgames to be played online with other players. It features a chat and multiple rooms. Each room hosts 1 game at a time which users can play. An account is not required to play the game.
This app is made in Meteor with minimal dependency on packages.

## Features
- User and guest accounts
- Nicknames (TODO)
- Game rooms (WIP)
- Chat
- Online versions of boardgames (TODO)
- Admin (TODO)

#### Install
Requires `lodash` as NPM dependency

Do `meteor npm install lodash`

#### Notes
- Continue using `moment` from atmosphere package instead of NPM,
@peonmodel had some issues with ES6 import for momentjs
- If any package is used, most often the most popular package is preferred.
- Bug reports and Pull Requests are welcome

## TODO:
- [ ] Setup players collection with temp names
- [ ] Setup CRON job to clear collections

- ### Accounts:
- [ ] Allow guest accounts to change name
- [ ] Create Guest account with user set name
- [ ] Pop-up for login/guest login/register for optional email etc
- [ ] Find a way to check for connected(active/idle) and disconnected users

- ### UI:
- [ ] Greyed out disable buttons (@Anima-t3d)
- [x] Chatbox should have overflow textarea/div to avoid lengthening the screen

- ### Chat
- [ ] webRTC (@peonmodel)

- ### Games
- [ ] Add game in main app
- [ ] Separate game into package
- [ ] Game schema should have teams & players & room
- [ ] Create generic game parent class (@peonmodel)

## Currently doing:
- Create Room, Chat, Players, with unique temp names, host, host powers, room name
- Can select game after joining room, each room only 1 game, show the selected game for each room
- Players can choose a nickname for each game, is not limited to username, required feature
for certain games to be played
