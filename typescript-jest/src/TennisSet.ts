import {TennisGame} from "./TennisGame";

export const notFinished = Symbol("notFinished");

export interface TennisSet {
    completed: boolean;
    score: string;
    winner: string | typeof notFinished;
}

export function computeSetFromGames(games: TennisGame[]) : TennisSet {
    let completed = false;
    let winner: "player1" | "player2" | typeof notFinished = notFinished;
    let score = "score";
    let resultSet: TennisSet = {completed, score, winner};
    return resultSet;
}
