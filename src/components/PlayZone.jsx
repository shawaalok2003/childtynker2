import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlayZone.css";

const PlayZone = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const navigate = useNavigate();

  const games = [
    {
      id: 1,
      name: "Robotics Puzzle",
      description: "Solve puzzles to build robots",
      difficulty: "Beginner",
      category: "Robotics",
      image: "🤖"
    },
    {
      id: 2,
      name: "Code Blocks",
      description: "Learn coding with visual blocks",
      difficulty: "Beginner",
      category: "Coding",
      image: "🧩"
    },
    {
      id: 3,
      name: "Circuit Builder",
      description: "Build electronic circuits",
      difficulty: "Intermediate",
      category: "Electronics",
      image: "⚡"
    },
    {
      id: 4,
      name: "AI Explorer",
      description: "Explore artificial intelligence concepts",
      difficulty: "Advanced",
      category: "AI",
      image: "🧠"
    },
    {
      id: 5,
      name: "IoT Simulator",
      description: "Simulate Internet of Things devices",
      difficulty: "Intermediate",
      category: "IoT",
      image: "🌐"
    },
    {
      id: 6,
      name: "Drone Pilot",
      description: "Learn to control drones",
      difficulty: "Advanced",
      category: "Drones",
      image: "🚁"
    }
  ];

  const startGame = (game) => {
    setSelectedGame(game);
    alert(`Starting ${game.name}! This feature will be available soon.`);
  };

  return (
    <div className="playzone">
      <div className="playzone-header">
        <h1>🎮 ChildTynker PlayZone</h1>
        <p>Learn through interactive games and activities</p>
        <button onClick={() => navigate('/dashboard/student')} className="back-btn">
          ← Back to Dashboard
        </button>
      </div>

      <div className="games-grid">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <div className="game-icon">{game.image}</div>
            <h3>{game.name}</h3>
            <p>{game.description}</p>
            <div className="game-meta">
              <span className="difficulty">{game.difficulty}</span>
              <span className="category">{game.category}</span>
            </div>
            <button 
              className="play-btn"
              onClick={() => startGame(game)}
            >
              Play Now
            </button>
          </div>
        ))}
      </div>

      {selectedGame && (
        <div className="game-modal">
          <div className="modal-content">
            <h2>🎮 {selectedGame.name}</h2>
            <p>{selectedGame.description}</p>
            <div className="game-info">
              <p><strong>Difficulty:</strong> {selectedGame.difficulty}</p>
              <p><strong>Category:</strong> {selectedGame.category}</p>
            </div>
            <div className="modal-actions">
              <button className="start-game-btn">Start Game</button>
              <button 
                className="close-btn"
                onClick={() => setSelectedGame(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayZone; 