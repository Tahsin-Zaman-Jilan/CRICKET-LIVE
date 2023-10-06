import React, { useEffect, useState } from "react";
import "./App.css";
import {InfinitySpin} from "react-loader-spinner";


const App = () => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const fetchMatchData = () => {
    // Simulate a delay for 3 seconds to show the loader
    setTimeout(() => {
      setIsLoading(false);
  
      // Your fetch logic here
      // For example, you can fetch data from an API like this:
     
       

      
      fetch("https://api.cricapi.com/v1/currentMatches?apikey=f7a8b179-d762-4e69-8081-02fae36d94fc&offset=0")
        .then((response) => response.json())
        .then((data) => {
          if (data.data) {
            const currentDate = new Date();
            const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
            const teamRanking = {
              "India": 1,
              "Pakistan": 2,
              "Australia": 3,
              "South Africa": 4,
              "England": 5,
              "New Zealand": 6,
              "Sri Lanka": 7,
              "Bangladesh": 8,
              "Afghanistan": 9,
              "West Indies": 10
            };
            const matchesData = data.data
              .filter((match) => new Date(match.date) >= oneWeekAgo)
              .map((match) => ({
                id: match.unique_id,
                name: match.name,
                status: match.matchStarted ? match.status : "Match not started",
                team1Logo: match.teamInfo[0].img,
                team2Logo: match.teamInfo[1].img,
                score: match.score || [],
                team1Name: match.teamInfo[0].name,
                team2Name: match.teamInfo[1].name,
                matchDate: new Date(match.date)
              }));
  
            matchesData.sort((a, b) => {
              const team1Rank = teamRanking[a.team1Name] || 11;
              const team2Rank = teamRanking[b.team1Name] || 11;
  
              if (team1Rank !== team2Rank) {
                return team1Rank - team2Rank;
              }
  
              return b.matchDate - a.matchDate;
            });
  
            setMatches(matchesData);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, 3000); // Wait for 3 seconds
  };
  

  useEffect(() => {
    fetchMatchData();
  }, []);

  return (
    <div className="container">
      <button className="button">CRICKET LIVE</button>
    
      {isLoading ? (
        <div className="loader-container">
  <div className="big-loader">
    <InfinitySpin type="ThreeDots" color="#007BFF" />
  </div>
</div>

      ) : (
        matches.map((match) => (
          <div className="match-box" key={match.id}>
          <h2>{match.name}</h2>
          <div className="team-info">
            <img className="team-logo" src={match.team1Logo} alt={`${match.name} - Team 1 Logo`} />
            <span>{match.status}</span>
            <img className="team-logo" src={match.team2Logo} alt={`${match.name} - Team 2 Logo`} />
          </div>
          <div className="score-info">
            {match.score.length > 0 && (
              <>
                <p><strong>{match.name}</strong></p>
                {match.score.map((score, index) => (
                  <p key={index}>{score.inning}: {score.r}/{score.w} in {score.o} overs</p>
                ))}
              </>
            )}
          </div>
        </div>
        ))
      )}
    </div>
  );
};

export default App;