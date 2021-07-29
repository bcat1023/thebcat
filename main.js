const express = require('express')
const app = express()
const Discord = require('discord.js');
const client = new Discord.Client();
const message = Discord.message;

//custom data
//The values above should not be changed, But the ones below can be changed
const debug = false;
const greetchannel = "general";
const botname = 'thebcat';
const wakekey = '!';
const token = "token_here";
//The values above can be changed to fix your needs
/* for future use const botchannel = "thebcat";*/

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  if (debug == true) {
    console.log("Debug mode is on");
  } else {
    console.log("Debug mode is off");
  }
});

client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === `${greetchannel}`);
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Hi ${member}, My name is ${botname}. My job is to help you out. If you want to feel free to go over to any channel and type ` + '`!help`' + ` If you ever need any help. Remember im here to help`);
});

client.on('message', message => {
  if (message.content === `${wakekey}version`) {
    message.channel.send("Art by @Ray, Programing by @dozingvoid");
    message.channel.send("Version 8.0.0")
    message.channel.send(`${botname}, 2021, Made by dozingvoid`)
  }
})

client.on('message', message => {
  if (message.content == `${wakekey}help`) {
    message.channel.send("If messages stop going in wait a couple minutes because it might just be loading, Our servers aren't the fastest ")
    message.channel.send("Hey there, just to remind you. Slow mode is required for this bot to work fluidly or bugs may happen. These bugs could break your entire server and get the bot stuck in a infinite loop that you cant end. Literally, remove the bot and adding it back wont work");
    message.channel.send("Hello, Here is a list of commands you can use");
    message.channel.send("Some of these commands will only work if you have administrative access");
    message.channel.send("Use `!kick @user` To kick users");
    message.channel.send("Use `!version` To view the bots version");
    message.channel.send("Use `!ban @user` To ban users");
    message.channel.send("Use `!ping` to see if the bot is online");
    message.channel.send("Use `!test` to see if the bot is online");
    message.channel.send("Thats all i can do right now but my developer is making even more features as you read!");
    return
  }
});

client.on('message', msg => {
  if (msg.content === `${wakekey}ping`) {
    msg.reply('pong');
  }
});

client.on('message', msg => {
  if (msg.content === `${wakekey}test`) {
    msg.reply('Hello, Im Here');
  }
});

client.on('message', message => {
  if (message.content.startsWith(`${wakekey}kick`)) {
    message.channel.send('Attempting To Kick User, Please Wait')
    if (!message.guild) {
      return message.reply(`@here your don't have have the rights to kick members`)
    };
    if (message.content.startsWith(`${wakekey}kick`)) {
      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          member
            .kick('')
            .then(() => {
              message.reply(`Successfully kicked ${user.tag}`);
            })
            .catch(err => {
              message.reply('I was unable to kick the member');
              console.error(err);
              if (debug == true) {
                message.reply(err);
              } else { return }
            });
        } else {
          message.reply("That user isn't in this guild!");
        }
      } else {
        message.reply("That user doesn't exist");
      }
    }
  }
});

client.on('message', message => {
  if (!message.guild) return message.reply(`@here your don't have have the rights to kick members`);
  if (message.content.startsWith(`${wakekey}ban`)) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban({
            reason: 'They were bad!',
          })
          .then(() => {
            message.reply(`Successfully banned ${user.tag}`);
          })
          .catch(err => {
            message.reply('I was unable to ban the member');
            if (debug == true) {
              message.reply(err);
            } else { return }
          });
      } else {
        message.reply("That user isn't in this guild!");
      }
    } else {
      message.reply("You didn't mention the user to ban!");
    }
  }
});

client.login(`${tokenid}`);
app.get('/', function (req, res) {
  res.send('Bot is online');
})

app.listen(3000)