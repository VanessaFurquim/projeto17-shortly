import { rankingDataRepository } from "../repositories/rankingRepositories.js"

export async function getRanking (request, response) {

    try {
        const rankingData = await rankingDataRepository()
      
        response.status(200).send(rankingData.rows)

    } catch (error) { response.status(500).send(error.message) }
}