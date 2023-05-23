import { addHeroPointToCharacter, deductHeroPointFromPlayerCharacter, findPlayerCharacters } from "./scripts/players.mjs"

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
            this.playerIds = Array.from(e.currentTarget.selectedOptions).map(opt => opt.value)
        }
    }

    async _handleAddHeroPointClick(event) {
        await Promise.all(this.playerIds.map(async (id) => await addHeroPointToCharacter(id)))
        this.render()
    }

    async _handleSubtractHeroPointClick(event) {
        await Promise.all(this.playerIds.map(async (id) => await deductHeroPointFromPlayerCharacter(id)))
        this.render()
    }

    activateListeners(html) {
        super.activateListeners(html)

        html.on("change", "[data-action]", this._handleChange.bind(this))
        html.on("click", "#add-points", this._handleAddHeroPointClick.bind(this))
        html.on("click", "#subtract-points", this._handleSubtractHeroPointClick.bind(this))
    }
}