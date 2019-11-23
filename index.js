const { Client, Collection, RichEmbed } = require("discord.js");
const { token } = require("./botconfig.json");
const bot = new Client();

bot.on('guildMemberAdd', (member) => {
    console.log(`New user has joined ${member.user.username}`);
  
    const memberRole = member.guild.roles.find(r => r.name === 'Member');
    const channel = member.guild.channels
      .filter(x => x.type === 'text')
      .find(c => c.name === 'member-log');
  
    if (!memberRole || !channel) return;
  
    try {
      member.addRole(memberRole);
    } catch (error) {
      console.error(`Failed to add a Member role to user ${memberRole.user.username}. Error: ${error}`);
    }
  
    channel.send(`**${member.user.username}** has joined!`);
});
bot.on('roleDelete', (role) => {
  console.log(`A role was deleted! Name: ${role.name}`);

  const channel = role.guild.channels
    .filter(x => x.type === 'text')
    .find(c => c.name === 'modmails');

  if (!channel) return;}

  channel.send(`A role was deleted\nRole Name: **${role.name}**`);
});
bot.on('roleCreate', (role) => {
  console.log(`A role was created! Name: ${role.name}`);

  const channel =.guild.channels
    .filter(x => x.type === 'text')
    .find(c => c.name === 'modmails');

  if (!channel) return;

  channel.send(`A role was created!\nRole Name: **${role.name}**`);
});
bot.on('guildMemberRemove', (member) => {
    const channel = member.guild.channels
      .filter(x => x.type === 'text')
      .find(c => c.name === 'member-log');
if(!channel) return;
    channel.send(`**${member.user.username}** has left!`);
});
bot.on('guildCreate', (guild) => {
  let channel = guild.channels.filter((cx => cx.type === "text" && cx.permissionsFor(guild.me).has("SEND_MESSAGES"))).first();
  let createguildembed = new RichEmbed()
  .setColor('GREEN')
  .setDescription('Thanks for inviting me!\nI am happy to moderate this beatiful server!\n\nCheck **${prefix}help** for more info!')
  channel.send(createguildembed);
});
["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.login(token);