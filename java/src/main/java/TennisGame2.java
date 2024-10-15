
public class TennisGame2 implements TennisGame
{
    public int P1point = 0;
    public int P2point = 0;
    
    public String P1res = "";
    public String P2res = "";
    private String player1Name;
    private String player2Name;

    public TennisGame2(String player1Name, String player2Name) {
        this.player1Name = player1Name;
        this.player2Name = player2Name;
    }

    private String getTextScoreFromNumber(int score) {
        if (score==0)
            return "Love";
        if (score==1)
            return "Fifteen";
        if (score==2)
            return "Thirty";
        if (score==3)
            return "Forty";

        throw new IllegalStateException();
    }

    public String getScore(){
        String score = "";

        if (P1point>=4 && (P1point-P2point)>=2)
        {
            score = "Win for player1";
            return score;
        }
        if (P2point>=4 && (P2point-P1point)>=2)
        {
            score = "Win for player2";
            return score;
        }

        if (P1point > P2point && P2point >= 3)
        {
            score = "Advantage player1";
            return score;
        }
        
        if (P2point > P1point && P1point >= 3)
        {
            score = "Advantage player2";
            return score;
        }

        if (P1point == P2point) {
            if (P1point==0)
                score = "Love-All";
            if (P1point==1)
                score = "Fifteen-All";
            if (P1point==2)
                score = "Thirty-All";
            if (P1point>=3)
                score = "Deuce";
            return score;
        }

        P1res = getTextScoreFromNumber(P1point);
        P2res = getTextScoreFromNumber(P2point);

        return P1res + "-" + P2res;
        
    }
    
    public void SetP1Score(int number){
        
        for (int i = 0; i < number; i++)
        {
            P1Score();
        }
            
    }
    
    public void SetP2Score(int number){
        
        for (int i = 0; i < number; i++)
        {
            P2Score();
        }
            
    }
    
    public void P1Score(){
        P1point++;
    }
    
    public void P2Score(){
        P2point++;
    }

    public void wonPoint(String player) {
        if (player == "player1")
            P1Score();
        else
            P2Score();
    }
}