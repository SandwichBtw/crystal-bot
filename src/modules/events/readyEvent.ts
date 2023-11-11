// You'll want some way to pass the client object to this file.
// Best way to do it is via function parameters
client.on('ready', bot => {
    console.log(`Logged in as ${bot.user.tag}`)
})