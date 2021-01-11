/* 
index file of this bot

i01 Bot created by Wesley Dzitzer (Discord screen name ProBoz - John the Chief).

Prototype build submitted to the developers of the Halo Fan Game Installation 01, Soon Studios Team.

There are files that are ignored called Pics/i01ConceptArt, Pics/i01Memes, and a stand alone i01MCCInfo, bot profile pic image.

If files need to be installed, while you are cd'ed in DiscordBot folder, run:
'npm install discord.js' refer to https://discord.js.org/#/docs/main/stable/general/welcome

*/

//Create variables Discord, the logger (bot token) which is botconfig.json, and initialize the bot module instance itself

const discord = require("discord.js");
const {
        prefix, 
        helpMenu, 
        responseMenu, 
        blacklistWords
      } = require("./botconfig.json"); //check botconfig.json for prefix value, and lists.

const {
        token
    } = require("./bottoken.json"); //check bottoken.json for the bot's token. Keep file untracked.

const cmdMaster = require("./prefixLibrary.js"); //import prefix command strings from prefixLibrary.js

const client = new discord.Client();

client.login(token); //is the token from bottoken.json

var badWords = []; //intialize badWords lookup table array
var theHelpList = []; //initialize the help menu
var response = []; //initialize the response menu

var obtainLists = function () { //retireve blacklistWords, helpMenu, and responseMenu from botconfig.json
    console.log("I have retrieved lists from botconfig.json! You currently have:"); //start of list retrieve
    //log each list to console after its retrieved

    badWords = blacklistWords; //retrieve blacklistWords from botconfig.json
    console.log("Blacklisted words lookup table:");
    console.log(badWords);

    theHelpList = helpMenu; //Help menu array refer to cmd object, help key.
    console.log("Help Menu list:");
    console.log(theHelpList);

    response = responseMenu; //random responses the bot can say in the cmd object, poke key.
    console.log("Random Response list: ")
    console.log(response);

    console.log("Thanks, and have fun!"); //end of list retrieve
};

client.on("ready", () => {
    console.log(`You are successfully logged in as ${client.user.tag}!`);
    console.log("...........................................................\n" +
    "Welcome to the Official i01 bot created by ProBoz-John the Chief.\n" +
    "There should be the following lists visible: badWords lookup table, theHelpList menu, and response menu.\n" +
    "In the event any of these lists do not appear, ensure botconfig.json is included.");

    obtainLists(); //run obtainLists function
    client.user.setActivity("i01", {type: "PLAYING"}); //sets bot activity
});

client.on("message", async message => {
    //How the bot listens to commands to know which one to execute

    let messageArray = message.content.split(" "); //grabs a human user's message, splits into messageArray
    var botResponse = messageArray[0].toLowerCase(); //takes the command, adds to message array index 0.

    if (message.author.bot
        || (message.channel.type === "dm")) { 
        //check that bot isn't sending messages to itself or in DM's
        return;
    }

    //order is important! contentCatcher functions begin here
    var contentCatcherProfanity = function () {

        var msgCatcher = message.content.toLowerCase(); //collect message content for the profanity filter, convert to lower case

            var badWordIndex = 0;

            for (var b = 0; b < badWords.length; b++) {

                var theBadWord = badWords[badWordIndex];
                console.log("Checking for: " + theBadWord); //log that the bad word was checked

                if (msgCatcher.includes(theBadWord)) { //undecided on how to proceed with this part
                    message.channel.send(`Please do not use that word here. Refer to the rules/guidelines in the welcome channel if you are not sure. <@${message.author.id}>`);
                    message.delete();
                    console.log("Blacklisted word " + theBadWord +  " was detected and deleted."); //log blacklisted word removal.
                    return;

                } else {
                    console.log("Blacklisted word was not detected."); //log that bad word was not detected

                };
            badWordIndex++;
            };
    };

    var contentCatcherSoon = function () {

        var msgCatcher2 = message.content.toLowerCase(); //collect message content for the release date filter, convert to lower case

        
        if (msgCatcher2.includes("installation 01")
            || msgCatcher2.includes("installation01")
            || msgCatcher2.includes("i01")) {

            if (msgCatcher2.includes("release") 
            || msgCatcher2.includes("date")) {

                message.channel.send(response[7]); //if a discord user asks for release date, pull the soon from response array.
            };
        };
    };
    //order is important! contentCatcher functions end here

    if (!message.content.startsWith(`${prefix}`)) {
        //catches bot if anything else but prefix, set to ".", was typed

        /*
        Check to ensure the bot checks for profanity and soon in public channels only, parentID is category.
        bot testing public category ID = 680647584112443413
        bot testing voice channels category ID = 680647584112443414

        i01 official installation01 category ID = 360679521650868224
        i01 official general category ID = 360679166242455553
        i01 official voice category ID = 360597366144761859
        */
       if ((message.channel.parentID === "680647584112443413"
       || message.channel.parentID === "680647584112443414"
       || message.channel.parentID === "360679521650868224"
       || message.channel.parentID === "360679166242455553"
       || message.channel.parentID === "360597366144761859")) {

        contentCatcherProfanity(); //run profanity filter
        contentCatcherSoon(); //run Soon filter
       };

        return;
    };

    //798027124354580481 = snowflake id of the #bot-commands in ProBoz i01 Bot Test (guild) server
    //530585406182391838 = snowflake id of the #bot-commands in official i01 discord (guild) server
    if (message.channel.id === "798027124354580481"
       || message.channel.id === "530585406182391838")  { //check to ensure that the prefix commands are only used in #bot-commands
        
        var cmd = { //cmd is object function library, check prefixLibrary.js for full list
        
            help : cmdMaster.help,
            botMsgA : function () {
                //Help Command, all commands and every index must be listed in theHelpList array.
                message.channel.send("Available bot commands:\n" 
                                    + theHelpList[0] 
                                    + theHelpList[1] 
                                    + theHelpList[2] 
                                    + theHelpList[3] 
                                    + theHelpList[4] 
                                    + theHelpList[5] 
                                    + theHelpList[6]);
            },
            hi : cmdMaster.hi,
            botMsgB : function () {
                //Hello message for the discord user.
                message.channel.send("Welcome to wait chat! I am the official i01 bot created by ProBoz. Use command .help to get assistance.");
            },
            mcc : cmdMaster.mcc,
            botMsgC : function () {
                //discord user asks about .MCC or .mcc in message, send picture of i01 is not affected by MCC PC info.
                message.channel.send({files: ["./Pics/i01MCCInfo.png"]});
            },
            beanmeme : cmdMaster.beanmeme,
            botMsgD : function () {
                //discord user needs their fresh Bean meme in the i01 server
                png = 7; //total number of images in the i01Memes folder, change set number if image is added, .png only.
                pngNum = Math.floor(Math.random() * png - 1 + 1) + 1;
                message.channel.send({files: ["./Pics/i01Memes/" + pngNum + ".png"]});
            },
            concept : cmdMaster.concept,
            botMsgE : function () {
                //discord user wishes to see a concept art image from i01
                jpg = 11; //total number of images in the i01Concept folder, change set number if image is added, .jpg only.
                jpgNum = Math.floor(Math.random() * jpg - 1 + 1) + 1;
                message.channel.send({files: ["./Pics/i01ConceptArt/" + jpgNum + ".jpg"]});
            },
            music : cmdMaster.music,
            botMsgF : function() {
                //discord user wishes to hear jafet's music for i01, bot leaves link to i01 music youtube playlist.
                message.channel.send("https://www.youtube.com/playlist?list=PLcmCPaTl-p5bVFAwJoUearAms6NxaevvK");
            },
            poke : cmdMaster.poke,
            botMsgG : function () {
                //discord user requests a random message!
                var aRandom = Math.floor((Math.random() * (response.length - 1)) - 1 + 1); //pick random greeting using length of response.
                message.channel.send(response[aRandom]); //send random greeting.
            },
        };

    switch (botResponse) { //Parse botResponse into the key value from object cmd.

        //all cases that use prefix 1
        case cmd.help :
            cmd.botMsgA();
        break;

        case cmd.hi :
            cmd.botMsgB();
        break;

        case cmd.mcc :
            cmd.botMsgC();
        break;

        case cmd.beanmeme :
            cmd.botMsgD();
        break;

        case cmd.concept :
            cmd.botMsgE();
        break;

        case cmd.music:
            cmd.botMsgF();
        break;

        case cmd.poke:
            cmd.botMsgG();
        break;

        default:
        //default answer should anything outside of the listed commands be typed.
        message.channel.send("I'm sorry, I did not understand what command you were typing. Try using .help if you are not sure.");
    }

    } else {
        message.channel.send("nope.avi");
    };
});