import { addHeroPointToCharacter, findPlayerCharacters } from "./scripts/players.mjs"

export class HeroPointsForm extends FormApplication {
    static get defaultOptions() {
        const defaults = super.defaultOptions

        const overrides = {
            height: 'auto',
            id: 'hero-points-form',
            template: `modules/pf2_ezheropoints/templates/hero-points-form.hbs`,
            title: 'Hero Points',
            userId: game.userId
        }

        const mergedOptions = foundry.utils.mergeObject(defaults, overrides)
        return mergedOptions
    }

    getData(options) {
        return {
            players: findPlayerCharacters()
        }
    }

    async _handleChange(e) {
        if (e.currentTarget.id === "playerList") {
            this.playerNames = Array.from(e.currentTarget.selectedOptions).map(opt => opt.value)
        }
    }

    async _handleButtonClick(event) {
        this.playerNames.forEach(name => console.log(name))
        //this.playerNames.map(async name => await addHeroPointToCharacter(name))
        await Actor.updateDocuments(
            game.actors.filter(actor => actor.type === "character")
            .map(character => ({_id: character.id, 'system.resources.heroPoints.value': character.system.resources.heroPoints.value+1})))
        this.render()
    }

    activateListeners(html) {
        super.activateListeners(html)

        html.on("change", "[data-action]", this._handleChange.bind(this))
        html.on("click", "#add-points", this._handleButtonClick.bind(this))
    }
}