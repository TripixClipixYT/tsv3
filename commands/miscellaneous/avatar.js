const { RichEmbed } = require("discord.js");
module.exports = {
  config: {
    name: "avatar",
    aliases: ["av"],
    usage: `(user)`,
    category: "miscellaneous",
    description: "Get someone's avatar",
    accessableby: "Moderators"
  },
  run: async (bot, message, args) => {
    let member = message.mentions.users.first();
    let aEmbed = new RichEmbed()
      .setTitle(`${member.username}'s Avatar`, `${message.author.displayAvatarURL}`)
      .setImage(member.displayAvatarURL)
      .setFooter(bot.user.username, `${bot.user.displayAvatarURL}`)
      .setColor(15158332)
      .setTimestamp();
    message.channel.send(aEmbed);
  }
};
