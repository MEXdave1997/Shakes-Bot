const Discord = require('discord.js')
const Client = new Discord.Client()
const config = require('./config.js')

// sets prefix
const prefix = config.prefix 
Client.on('ready', () => {
    Client.user.setActivity('with Friends', {type: "PLAYING"})
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
    if (!message.content.startsWith(prefix) || message.author.bot) return

    if (message.content.startsWith(prefix + 'ban')) {
        const user = message.mentions.users.first();

        if (user) {
            let member = message.guild.member(user)

            if (member) {
                member.ban({
                    reason: 'Innapropriate Behavior',
                }).then(() => {
                    message.reply(`Successfully banned ${user.tag}`)
                }).catch(err => {
                    message.reply('I was unable to ban user!')
                    console.log(err)
                })
            } else {
                message.reply('That user isn\'t in this guild')
            }
        } else {
            message.reply('You didn\'t mention the user to ban!')
        }
    }
    
   if (message.content.startsWith(config.prefix + 'roles')) {
      for (let key of message.guild.roles.keyArray()) {
          message.channel.send(key + ': ' + message.guild.roles.get(key).name)
      } 
   }


})

Client.login(config.token)
