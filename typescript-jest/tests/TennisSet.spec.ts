import { TennisGame } from "../src";
import { notFinished, TennisSet} from "../src/TennisSet";
import { playerOneWin, playerTwoWin } from "./MockGames";

// Helper to compute set status from a sequence of mock games
function computeSetFromGames(games: TennisGame[]) : TennisSet {
  let p1 = 0;
  let p2 = 0;
  let completed = false;
  let winner: "player1" | "player2" | typeof notFinished = notFinished;

  for (const g of games) {
    const score = g.getScore();
    if (score.includes("Win for player1")) {
      p1 += 1;
    } else if (score.includes("Win for player2")) {
      p2 += 1;
    } else {
      throw new Error(`Unexpected game score: ${score}`);
    }

    if ((p1 >= 6 || p2 >= 6) && Math.abs(p1 - p2) >= 2) {
      completed = true;
      winner = p1 > p2 ? "player1" : "player2";
      break;
    }
    // Tiebreak resolution: after 6-6, next game decides 7-6
    if ((p1 === 7 && p2 === 6) || (p2 === 7 && p1 === 6)) {
      completed = true;
      winner = p1 > p2 ? "player1" : "player2";
      break;
    }
  }

  const scoreStr = `${p1}-${p2}`;
  return { completed, winner, score: scoreStr };
}

function buildSetSequence(targetP1: number, targetP2: number): TennisGame[] {
    console.assert(targetP1 >= 0 && targetP1 <= 7, "Invalid targetP1");
    console.assert(targetP2 >= 0 && targetP2 <= 7, "Invalid targetP2");
  // Builds a sequence that ends exactly at target score with player1 the winner (targetP1 > targetP2)
  // and ensures the set is not prematurely won before the last game.
  const gamesPlayed: TennisGame[] = [];
  let mostGames = Math.max(targetP1, targetP2);
  for (let gameIndex = 0; gameIndex < mostGames; gameIndex++) {
      if (gameIndex < targetP1) {
          gamesPlayed.push(playerOneWin);
      }
      if (gameIndex < targetP2) {
          gamesPlayed.push(playerTwoWin);
      }
  }
  return gamesPlayed;
}

describe("Tennis Set winning rules (using mock games)", () => {
    test("set 1-0 is unfinished", () => {
        const seq = buildSetSequence(1, 0);
        const result = computeSetFromGames(seq);
        expect(result.completed).toBe(false);
        expect(result.winner).toBe(notFinished);
        expect(result.score).toBe("1-0");
    });
    test("set 5-0 is unfinished", () => {
        const seq = buildSetSequence(5, 0);
        const result = computeSetFromGames(seq);
        expect(result.completed).toBe(false);
        expect(result.winner).toBe(notFinished);
        expect(result.score).toBe("5-0");
    });
    test("set 0-1 is unfinished", () => {
        const seq = buildSetSequence(0, 1);
        const result = computeSetFromGames(seq);
        expect(result.completed).toBe(false);
        expect(result.winner).toBe(notFinished);
        expect(result.score).toBe("0-1");
    });
    test("set 0-5 is unfinished", () => {
        const seq = buildSetSequence(0, 5);
        const result = computeSetFromGames(seq);
        expect(result.completed).toBe(false);
        expect(result.winner).toBe(notFinished);
        expect(result.score).toBe("0-5");
    });

    test("Player1 can win a set 6-0", () => {
    const seq = buildSetSequence(6, 0);
    const result = computeSetFromGames(seq);
    expect(result.completed).toBe(true);
    expect(result.winner).toBe("player1");
    expect(result.score).toBe("6-0");
  });

  test("Player1 can win a set 6-1", () => {
    const seq = buildSetSequence(6, 1);
    const result = computeSetFromGames(seq);
    expect(result.completed).toBe(true);
    expect(result.winner).toBe("player1");
    expect(result.score).toBe("6-1");
  });

  test("Player1 can win a set 6-2", () => {
    const seq = buildSetSequence(6, 2);
    const result = computeSetFromGames(seq);
    expect(result.completed).toBe(true);
    expect(result.winner).toBe("player1");
    expect(result.score).toBe("6-2");
  });

  test("Player1 can win a set 6-3", () => {
    const seq = buildSetSequence(6, 3);
    const result = computeSetFromGames(seq);
    expect(result.completed).toBe(true);
    expect(result.winner).toBe("player1");
    expect(result.score).toBe("6-3");
  });

  test("Player1 can win a set 6-4", () => {
    const seq = buildSetSequence(6, 4);
    const result = computeSetFromGames(seq);
    expect(result.completed).toBe(true);
    expect(result.winner).toBe("player1");
    expect(result.score).toBe("6-4");
  });

  test("At 5-5, Player1 must win next two games to win the set 7-5", () => {
    const seq = buildSetSequence(7, 5);
    const result = computeSetFromGames(seq);
    expect(result.completed).toBe(true);
    expect(result.winner).toBe("player1");
    expect(result.score).toBe("7-5");
  });

  test("At 5-5, Player2 must win next two games to win the set 7-5", () => {
    const seq = buildSetSequence(5, 7);
    const result = computeSetFromGames(seq);
    expect(result.completed).toBe(true);
    expect(result.winner).toBe("player2");
    expect(result.score).toBe("5-7");
  });

  test("At 6-6, a tiebreak is played and next game decides 7-6 for Player1", () => {
    const seq = buildSetSequence(7, 6);
    const result = computeSetFromGames(seq);
    expect(result.completed).toBe(true);
    expect(result.winner).toBe("player1");
    expect(result.score).toBe("7-6");
  });

  test("At 6-6, a tiebreak is played and next game decides 7-6 for Player2", () => {
    const seq = buildSetSequence(6, 7);
    const result = computeSetFromGames(seq);
    expect(result.completed).toBe(true);
    expect(result.winner).toBe("player2");
    expect(result.score).toBe("6-7");
  });

  test("6-5 is not a completed set (must win by two)", () => {
    // Build 6-5 without closing the set

    const seq = buildSetSequence(6, 5);
    const result = computeSetFromGames(seq);
    expect(result.completed).toBe(false);
    expect(result.score).toBe("6-5");
    expect(result.winner).toBe(notFinished);
  });
});
