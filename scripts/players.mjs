const ACTOR_TYPE_CHARACTER = 'character'

export const findPlayerCharacters = () => findActorByType(ACTOR_TYPE_CHARACTER)
export const findActorByType = (typeName) => game.actors.filter(actor => actor.type === typeName.toLowerCase())
export const findPlayerCharacterByName = (name) => findPlayerCharacters()
                                                    .filter(chara => chara.name.toLowerCase() === name.toLowerCase())[0]

export const addHeroPointToCharacter = async (name) => {
    const playerActor = findPlayerCharacterByName(name)
    const currentHeroPoints = playerActor.system.resources.heroPoints.value
    if (currentHeroPoints < 3) {
        return await Actor.updateDocuments(
            [{_id: playerActor.id, 'system.resources.heroPoints.value': currentHeroPoints+1}]
        )
    }
}

export const deductHeroPointFromPlayerCharacter = async (name) => {
    const playerActor = findPlayerCharacterByName(name)
    const currentHeroPoints = playerActor.system.resources.heroPoints.value
    if (currentHeroPoints > 0) {
        return await Actor.updateDocuments(
            [{_id: playerActor.id, 'system.resources.heroPoints.value': currentHeroPoints-1}]
        )
    }
}