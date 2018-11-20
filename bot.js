const Discord = require("discord.js")
const Client = new Discord.Client()
const config = require("./config.json")
let Guild = Discord.Guild

// sets prefix
const prefix = config.prefix 
Client.on('ready', () => {
    console.log("I am ready!")
})

/// Welcomes a new member
Client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'welcome')

    if (!channel) return

    channel.send(`Welcome to the server, ${member}`)
})

// Sends messages to a channel based on certain commands
Client.on('message', message => {

    // Exit and stop if prefix is not there
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    if (message.content.startsWith(prefix + 'ping')) {
        message.channel.send('pong!')
    }

    if (message.content.startsWith(config.prefix + 'foo')) {
        message.channel.send('bar')
    }
    
   if (message.content.startsWith(config.prefix + 'roles')) {
       let roles = Guild.roles 
       message
   }

})

Client.login(config.token)
