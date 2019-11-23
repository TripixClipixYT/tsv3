const { RichEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const { ownerid, Version } = require("../../botconfig.json");
// const { duration } = require("./uptime.js")
module.exports = {
  config: {
    name: "coinflip",
    description: "Between Heads and Tails who will win?",
    usage: "",
    category: "fun",
    accessableby: "Members",
    aliases: []
  },
  run: async (bot, message, args) => {
    function doRandHT() {
      var rand = ["HEADS!", "TAILS!"];

      return rand[Math.floor(Math.random() * rand.length)];
    }

    const embed = {
      title: `Here is the winner!`,
      description: doRandHT(),
      color: 7584788
    };
    message.channel.send({ embed });
  }
};
