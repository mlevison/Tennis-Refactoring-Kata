export class PlayerCoachChallenge {
  constructor(private playerName: string) {}

  challengeWon(): void { }

  challengeLost(): void { }

  newSet(): void {}

  challengesRemaining(): number { return -1;}
}
