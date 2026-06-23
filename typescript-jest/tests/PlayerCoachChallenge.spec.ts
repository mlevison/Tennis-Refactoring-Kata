import { PlayerCoachChallenge } from '../src/PlayerCoachChallenge';

const STARTING_CHALLENGES = 3;

describe('PlayerCoachChallenge', () => {
  let challenges: PlayerCoachChallenge;

  beforeEach(() => {
    challenges = new PlayerCoachChallenge('player1');
  });

  describe('a player starts with 3 challenges per set', () => {
    it('reports 3 challenges remaining before any are used', () => {
      expect(challenges.challengesRemaining()).toBe(STARTING_CHALLENGES);
    });
  });

  describe('winning a challenge keeps the count unchanged', () => {
    it('still has the starting number after a win', () => {
      challenges.challengeWon();
      expect(challenges.challengesRemaining()).toBe(STARTING_CHALLENGES);
    });

    it('stays the same across repeated wins', () => {
      challenges.challengeWon();
      challenges.challengeWon();
      challenges.challengeWon();
      expect(challenges.challengesRemaining()).toBe(STARTING_CHALLENGES);
    });

    it('does not restore a challenge that was previously lost', () => {
      challenges.challengeLost(); // now 2
      challenges.challengeWon();
      expect(challenges.challengesRemaining()).toBe(2);
    });
  });

  describe('losing a challenge decrements the count by one', () => {
    it('drops from 3 to 2 on the first loss', () => {
      challenges.challengeLost();
      expect(challenges.challengesRemaining()).toBe(2);
    });

    it('decrements once per loss', () => {
      challenges.challengeLost();
      expect(challenges.challengesRemaining()).toBe(2);
      challenges.challengeLost();
      expect(challenges.challengesRemaining()).toBe(1);
      challenges.challengeLost();
      expect(challenges.challengesRemaining()).toBe(0);
    });
  });

  describe('the count can never go below 0', () => {
    it('stays at 0 when losing with no challenges left', () => {
      challenges.challengeLost(); // 2
      challenges.challengeLost(); // 1
      challenges.challengeLost(); // 0
      challenges.challengeLost(); // would be -1
      expect(challenges.challengesRemaining()).toBe(0);
    });

    it('never reports a negative number after exhausting challenges', () => {
      challenges.challengeLost();
      challenges.challengeLost();
      challenges.challengeLost();
      challenges.challengeLost();
      challenges.challengeLost();
      expect(challenges.challengesRemaining()).toBeGreaterThanOrEqual(0);
    });
  });

  describe('newSet resets the challenge allowance', () => {
    it('returns to 3 challenges after a new set', () => {
      challenges.challengeLost(); // 2
      challenges.challengeLost(); // 1
      challenges.newSet();
      expect(challenges.challengesRemaining()).toBe(STARTING_CHALLENGES);
    });
  });
});
