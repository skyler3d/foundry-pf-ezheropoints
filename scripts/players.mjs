const ACTOR_TYPE_CHARACTER = 'character'

export const findPlayerCharacters = () => findActorByType(ACTOR_TYPE_CHARACTER)
export const findActorByType = (typeName) => game.actors.filter(actor => actor.type === typeName.toLowerCase())
export const findPlayerCharacterByName = (name) => findPlayerCharacters()
                                                    .filter(chara => chara.name.toLowerCase() === name.toLowerCase())[0]
export const findPlayerCharacterById = (id) => findPlayerCharacters().filter(chara => chara.id === id)[0]

export const addHeroPointToCharacter = async (id) => {
    const playerActor = findPlayerCharacterById(id)
    const currentHeroPoints = playerActor.system.resources.heroPoints.value
    if (currentHeroPoints < 3) {
        return await Actor.updateDocuments(
            [{_id: playerActor.id, 'system.resources.heroPoints.value': currentHeroPoints+1}]
        )
    }
}

export const deductHeroPointFromPlayerCharacter = async (id) => {
    const playerActor = findPlayerCharacterById(id)
    const currentHeroPoints = playerActor.system.resources.heroPoints.value
    if (currentHeroPoints > 0) {
        return await Actor.updateDocuments(
            [{_id: playerActor.id, 'system.resources.heroPoints.value': currentHeroPoints-1}]
        )
    }
}