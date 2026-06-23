/**
 * A single set within a tennis match. A set is a collection of games:
 * first player to six games (with a two-game lead) wins, otherwise a
 * tiebreak is played at six games all.
 */
export interface TennisSet {
  /** Record that the named player won a game in this set. */
  wonGame(playerName: string): void;

  /** Current set score from player1's perspective, e.g. "6-4" or "3-2". */
  getScore(): string;

  /** True once the set has been decided (no further games can be played). */
  isComplete(): boolean;

  /** Name of the player who won the set, or null while it is still in play. */
  getWinner(): string | null;

  /** True when the set is at six games all and a tiebreak is in progress. */
  isTiebreak(): boolean;
}
