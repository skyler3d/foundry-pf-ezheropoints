import { findPlayerCharacters } from "./scripts/players.mjs"
import { HeroPointsForm } from "./HeroPointsForm.js"

Hooks.on("init", () => {
    console.log("blah blah blah")
})

Hooks.on("chatCommandsReady", (commands) => {
    commands.register({
        name: "/heropoints",
        module: "pf2_ezheropoints",
        description: "Give hero points",
        requiredRole: "GAMEMASTER",
        callback: (chat, parameters, messageData) => ({ content: parameters }),
        autocompleteCallback: (menu, alias, parameters) => [game.chatCommands.createInfoElement("Enter a message.")],
        closeOnComplete: true

    })
})

Hooks.on("invokeChatCommand", (chat, command, parameters, result, options) => {
    if (command.name === "/fellowship") result.content += "\nAnd my axe!";
})

Hooks.on("chatMessage", async (chat, message, data) => {
    if (message.startsWith("/heropoints")) {
        console.log("EZHeroPoints | blarg")
        findPlayerCharacters().forEach(player => console.log(player))
        
        const form = new HeroPointsForm()

        game.settings.register("atotallyrealid", "inject-button", {
            config: true,
            default: true,
            onChange: () => ui.players.render(),
            scope: 'client'
        })
        const userId = game.userId
        form.render(true, { userId })

        return false
    }
})