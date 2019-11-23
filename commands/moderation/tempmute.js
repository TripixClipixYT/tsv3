const { RichEmbed } = require("discord.js")
const { red_light } = require("../../colours.json");
const ms = require("ms");
// const { casing } = require("../../botconfig.json");

module.exports = {
    config: {
        name: "tempmute",
        description: "Disabled until is fixed!",
        usage: "<user> <reason> <time>",
        category: "moderation",
        accessableby: "Members",
        aliases: ["tm"],
        status: "Disabled"
    },
    run: async (bot, message, args) => {
// message.reply("Sorry, this command is temporary disabled until the dev fix it. Sorry for the incovience!")
// check if the command caller has permission to use the command
if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You dont have permission to use this command.");

if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to add roles!")
      
//define the reason and mutee
let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!mutee) return message.channel.send("Please supply a user to be warned!");
let time = args.slice(2).join(" ");
if(!time) return message.channel.send("Please input a time while typing the command!")
let reason = args.slice(1).join(" ");
if(!reason) reason = "No reason given"

//define mute role and if the mute role doesnt exist then create one
let muterole = message.guild.roles.find(r => r.name === "Muted")
if(!muterole) {
    try{
        muterole = await message.guild.createRole({
            name: "Muted",
            color: "#514f48",
            permissions: []
        })
        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SEND_TTS_MESSAGES: false,
                ATTACH_FILES: false,
                SPEAK: false
            })
        })
    } catch(e) {
        console.log(e.stack);
    }
}
//add role to the mentioned user and also send the user a dm explaing where and why they were muted
mutee.addRole(muterole.id).then(() => {
    message.delete()
    mutee.send(`Hello, you have been muted in ${message.guild.name} for: ${reason} Time: ${ms(ms(time))}`).catch(err => console.log(err))
    message.channel.send(`${mutee.user.username} was successfully muted for ${ms(ms(time))}.`)
})
setTimeout(function(){
  mutee.removeRole(muterole.id)
  // message.channel.send(`<@${mutee.user.tag}> has been unmuted!`)
  let ewqembed = new RichEmbed()
    .setColor(red_light)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "Tempmute End")
    .addField("Mutee:", mutee.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    .addField("Lenght:", `${ms(ms(time))}`)

let sChannel = message.guild.channels.find(c => c.name === "modmails")
sChannel.send(ewqembed)
}, ms(time))
//send an embed to the modlogs channel
let embed = new RichEmbed()
    .setColor(red_light)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "Tempmute")
    .addField("Mutee:", mutee.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    .addField("Lenght:", `${ms(ms(time))}`)

let sChannel = message.guild.channels.find(c => c.name === "modmails")
sChannel.send(embed)
    }
}