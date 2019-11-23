const { RichEmbed } = require("discord.js")
const { red_light } = require("../../colours.json");

module.exports = {
    config: {
        name: "channelcreate",
        description: "Creates a channel in the guild!",
        usage: "<channel name>",
        category: "moderation",
        accessableby: "Administrators",
        aliases: ["chc", "c"]
    },
    run: async (bot, message, args) => {
      let channel = args[0];
let guild = message.guild;
      guild.createChannel(channel, { type: 'text' })
  .then(console.log)
  .catch(console.error);
    let embed = new RichEmbed()
    .setColor(red_light)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "Channel Create")
    .addField("Moderator:", message.author.username)
    .addField("Channel Name:", channel)
    .addField("Date:", message.createdAt.toLocaleString())
    
        let sChannel = message.guild.channels.find(c => c.name === "modmails")
        sChannel.send(embed)
    }
}