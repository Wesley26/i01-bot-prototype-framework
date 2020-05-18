# i01-bot-prototype-framework

i01 bot created by Wesley Dzitzer

Prototype build submitted to the web developers of the Halo Fan Game Installation 01, Soon Studios Team. This repo is for portfolio showcasing only. To see the bot in action, visit the official i01 website, navigate to community, then discord to join the official Installation 01 Halo Fan Game discord server: https://installation01.org/

# Documentation:
Documentation of this prototype build:

- i01Bot.js:
Bot's index file - It makes the bot's bones work ;)

Arrays are stored in botconfig.json. Bot module pulls the lists from the JSON in botconfig and creates the following:
badWords - Blacklisted words lookup table
theHelpList - Help menu
response - random responses the bot can give to a discord user

function contentCatcherProfanity:
This function loops through badWords and checks the message content. Should the message contain the blacklisted word, bot removes the message and returns nothing. Otherwise, the bot continues checking through the list until end of list.
returns void

function contentCatcherSoon:
This function checks the message content for the words containing either "release" or "date". If found in the message content, bot will send the user a message saying "Soon".
returns void

Prefix functions are stored inside object cmd. Object cmd pulls the prefixes from prefixLibrary.js module.

function botMsgA:
Help Command, all commands and every index must be listed in theHelpList array.
returns void

function botMsgB:
Hello message for the discord user.
returns void

function botMsgC:
discord user asks about .MCC or .mcc in message, send picture of i01 is not affected by MCC PC info.
returns void

function botMsgD:
discord user needs their fresh Bean meme in the i01 server
returns void

function botMsgE:
discord user wishes to see a concept art image from i01
returns void

function botMsgF:
discord user wishes to hear jafet's music for i01, bot leaves link to i01 music youtube playlist.
returns void

function botMsgG:
discord user requests a random message!
returns void

- prefixLibrary.js
Bot's prefix library module, requires the prefix stored in botconfig.json

Commands stored in module object include:
help : ${prefix}help,
hi : ${prefix}hi,
mcc : ${prefix}mcc,
beanmeme : ${prefix}beanmeme,
concept : ${prefix}concept,
music : ${prefix}music,
poke : ${prefix}poke

- botconfig.json
Stores the bot's login token, command prefix value, help menu, response menu, and blacklisted words lookup table arrays.

- package.json
Bot's information, description, version number, etc.

- package-lock.json
Bot's discord.js library