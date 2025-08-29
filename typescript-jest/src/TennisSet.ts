export const notFinished = Symbol("notFinished");

export interface TennisSet {
    completed: boolean;
    score: string;
    winner: string | typeof notFinished;
}