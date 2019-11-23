const figlet = require('figlet');

module.exports = {
  config: {
    name: "ascii",
    description: "Converts a text into ASCII",
    usage: "<text>",
    category: "fun",
    accessableby: "Members",
    aliases: []
  },
  run: async (bot, message, args) => {
        try {
            if (!args.join(' ')) return message.reply('Please specify texts for the ascii conversion');
            figlet.text(args.join(' '), {
                font: "ANSI Shadow",
                horizontalLayout: "default",
                verticalLayout: "default"
            }, function (err, data) {
                if (err) {
                    console.log("Somthing Went Wrong...")
                    console.dir(err)
                    return;
                }
                message.channel.send(data, {
                    code: "md"
                })
            })
        } catch (err) {
            console.error(err)
        }
    }
}