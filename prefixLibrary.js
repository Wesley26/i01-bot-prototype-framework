/*
CommonJS module for bot command prefixes.
Prefixes are stored in module.exports object, i01Bot.js requires this file.

Soon TM
*/

const {prefix} = require("./botconfig.json"); //check botconfig.json for prefixes

module.exports = {

    help : `${prefix}help`,
    hi : `${prefix}hi`,
    mcc : `${prefix}mcc`,
    beanmeme : `${prefix}beanmeme`,
    concept : `${prefix}concept`,
    music : `${prefix}music`,
    poke : `${prefix}poke`

};