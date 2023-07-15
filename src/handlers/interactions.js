const { Collection } = require('discord.js')
const path = require('path')
const fs = require('fs')
const colors = require('colors')

module.exports ={
	execute(client){
		console.log('0--------------| Slash Commands'.blue)
    client.commands = new Collection();
const foldersPath = path.join(__dirname, '../commands/slash');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`.yellow);
		}
	}
}
console.log(`[SCMDS] Loaded ${client.commands.size} Slash Commands!`.green)
	}
}