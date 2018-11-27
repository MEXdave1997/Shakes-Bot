const Discord = require('discord.js')
const Client = new Discord.Client()
const config = require('./config.js')

// sets configuration variables
const prefix = config.prefix
const token = config.token
const guildID = config.guildID

Client.on('ready', () => {
    Client.user.setActivity('with Friends', {type: "PLAYING"})
    console.log("I am ready!")

    let rolesChannel = Client.guilds.get(guildID).channels.find(channel => channel.name === 'roles' && channel.type === 'text')
    let message = {
        "embed": {
            "title": 'React with the emote that corresponds to the role you want.',
            "description": '<:fries:514507420832104459> | Fry boi'
        }
    }
    // rolesChannel.send(message)

    // These messages are fetched so that role reactions appear in messageReactionAdd and messageReactionRemove
    rolesChannel.fetchMessages().then(messages => {
        for (let message of messages) {
            // For some reason it puts the message ID in array spot 0, and the message itself in array spot 1. This ID is redundant and can be found with message.id
            message = message[1];
            console.log(message)
        }
    })
})

/// Welcomes a new member
Client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(channel => channel.name === 'welcome' && channel.type === 'text')

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
    
    if (message.content.startsWith(prefix + 'roles')) {
        let roles = '';
        for (let key of message.guild.roles.keyArray()) {
            roles += key + ': ' + message.guild.roles.get(key).name.replace(/@/g, '') + '\n'
        }
        roles = roles.substring(0, roles.length - 1)
        message.channel.send(roles)
    }

    if (message.content.startsWith(prefix + 'roll')) {
        // overly complex implementation incoming 
        let dice = {
            sides: 6,
            roll: () => {
                let randomNumber = Math.floor(Math.random() * this.sides) + 1
                return randomNumber
            }
        }

        if (dice.roll > 3) {
            message.channel.send(`Congrats! You rolled a ${dice.roll}!`)
        } else {
            message.channel.send(`Too bad! Looks like you rolled a ${dice.roll}`)
        }

    }

})

Client.on('messageReactionAdd', reaction => {
    //
})

Client.on('messageReactionRemove', reaction => {
    //
})

Client.login(token)
