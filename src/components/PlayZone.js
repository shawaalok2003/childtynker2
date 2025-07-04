import React, { useState, useEffect } from 'react';
import './PlayZone.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const PlayZone = () => {
  const [currentGame, setCurrentGame] = useState(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState('menu'); // menu, playing, paused, completed
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [achievements, setAchievements] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);

  // Game categories and games
  const gameCategories = [
    {
      id: 'ai',
      name: 'Artificial Intelligence',
      icon: 'fas fa-brain',
      color: '#FF6B6B',
      description: 'Learn about AI concepts through interactive games'
    },
    {
      id: 'robotics',
      name: 'Robotics',
      icon: 'fas fa-robot',
      color: '#4ECDC4',
      description: 'Build and program virtual robots'
    },
    {
      id: 'coding',
      name: 'Coding',
      icon: 'fas fa-code',
      color: '#45B7D1',
      description: 'Learn programming fundamentals'
    },
    {
      id: 'logic',
      name: 'Logic & Problem Solving',
      icon: 'fas fa-puzzle-piece',
      color: '#96CEB4',
      description: 'Develop critical thinking skills'
    }
  ];

  const games = [
    {
      id: 'ai-pattern',
      name: 'AI Pattern Recognition',
      category: 'ai',
      difficulty: 'beginner',
      description: 'Help the AI learn patterns and predict the next sequence',
      icon: 'fas fa-brain',
      color: '#FF6B6B',
      maxScore: 100
    },
    {
      id: 'robot-maze',
      name: 'Robot Maze Navigator',
      category: 'robotics',
      difficulty: 'beginner',
      description: 'Program a robot to navigate through a maze',
      icon: 'fas fa-robot',
      color: '#4ECDC4',
      maxScore: 100
    },
    {
      id: 'code-blocks',
      name: 'Code Block Builder',
      category: 'coding',
      difficulty: 'beginner',
      description: 'Drag and drop code blocks to create programs',
      icon: 'fas fa-code',
      color: '#45B7D1',
      maxScore: 100
    },
    {
      id: 'logic-gates',
      name: 'Logic Gate Designer',
      category: 'logic',
      difficulty: 'intermediate',
      description: 'Design digital circuits using logic gates',
      icon: 'fas fa-microchip',
      color: '#96CEB4',
      maxScore: 150
    },
    {
      id: 'neural-network',
      name: 'Neural Network Trainer',
      category: 'ai',
      difficulty: 'intermediate',
      description: 'Train a neural network to recognize images',
      icon: 'fas fa-network-wired',
      color: '#FF6B6B',
      maxScore: 150
    },
    {
      id: 'robot-arm',
      name: 'Robot Arm Controller',
      category: 'robotics',
      difficulty: 'intermediate',
      description: 'Control a robotic arm to complete tasks',
      icon: 'fas fa-hand-paper',
      color: '#4ECDC4',
      maxScore: 150
    }
  ];

  const filteredGames = selectedCategory === 'all' 
    ? games 
    : games.filter(game => game.category === selectedCategory);

  // Timer effect
  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameState]);

  const startGame = (game) => {
    setCurrentGame(game);
    setScore(0);
    setTimeLeft(60);
    setGameState('playing');
  };

  const pauseGame = () => {
    setGameState('paused');
  };

  const resumeGame = () => {
    setGameState('playing');
  };

  const endGame = () => {
    setGameState('completed');
    // Add achievement if score is high enough
    if (score >= currentGame.maxScore * 0.8) {
      const newAchievement = {
        id: `${currentGame.id}-master`,
        title: `${currentGame.name} Master`,
        description: `Scored ${score} points in ${currentGame.name}`,
        icon: currentGame.icon,
        color: currentGame.color,
        date: new Date().toLocaleDateString()
      };
      setAchievements(prev => [...prev, newAchievement]);
    }
  };

  const resetGame = () => {
    setCurrentGame(null);
    setScore(0);
    setTimeLeft(60);
    setGameState('menu');
  };

  const addScore = (points) => {
    setScore(prev => prev + points);
  };

  // Render game content based on current game
  const renderGameContent = () => {
    if (!currentGame) return null;

    switch (currentGame.id) {
      case 'ai-pattern':
        return <AIPatternGame score={score} addScore={addScore} level={level} />;
      case 'robot-maze':
        return <RobotMazeGame score={score} addScore={addScore} level={level} />;
      case 'code-blocks':
        return <CodeBlocksGame score={score} addScore={addScore} level={level} />;
      case 'logic-gates':
        return <LogicGatesGame score={score} addScore={addScore} level={level} />;
      case 'neural-network':
        return <NeuralNetworkGame score={score} addScore={addScore} level={level} />;
      case 'robot-arm':
        return <RobotArmGame score={score} addScore={addScore} level={level} />;
      default:
        return <div className="game-placeholder">Game coming soon!</div>;
    }
  };

  if (gameState === 'menu') {
    return (
      <div className="playzone">
        <div className="playzone-header">
          <h1><i className="fas fa-gamepad"></i> AI & Robotics Play Zone</h1>
          <p>Learn AI and robotics through fun interactive games!</p>
        </div>

        <div className="playzone-stats">
          <div className="stat-card">
            <i className="fas fa-trophy"></i>
            <h3>Total Score</h3>
            <p>{score}</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-star"></i>
            <h3>Level</h3>
            <p>{level}</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-medal"></i>
            <h3>Achievements</h3>
            <p>{achievements.length}</p>
          </div>
        </div>

        <div className="category-filter">
          <button 
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            <i className="fas fa-th"></i> All Games
          </button>
          {gameCategories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              style={{ '--category-color': category.color }}
            >
              <i className={category.icon}></i> {category.name}
            </button>
          ))}
        </div>

        <div className="games-grid">
          {filteredGames.map(game => (
            <div key={game.id} className="game-card" style={{ '--game-color': game.color }}>
              <div className="game-card-header">
                <i className={game.icon}></i>
                <span className="difficulty-badge">{game.difficulty}</span>
              </div>
              <h3>{game.name}</h3>
              <p>{game.description}</p>
              <div className="game-card-footer">
                <span className="max-score">Max Score: {game.maxScore}</span>
                <button 
                  className="play-btn"
                  onClick={() => startGame(game)}
                >
                  <i className="fas fa-play"></i> Play Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {achievements.length > 0 && (
          <div className="achievements-section">
            <h2><i className="fas fa-medal"></i> Recent Achievements</h2>
            <div className="achievements-grid">
              {achievements.slice(-3).map(achievement => (
                <div key={achievement.id} className="achievement-card" style={{ '--achievement-color': achievement.color }}>
                  <i className={achievement.icon}></i>
                  <h4>{achievement.title}</h4>
                  <p>{achievement.description}</p>
                  <small>{achievement.date}</small>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="playzone-game">
      <div className="game-header">
        <div className="game-info">
          <h2><i className={currentGame.icon}></i> {currentGame.name}</h2>
          <p>{currentGame.description}</p>
        </div>
        <div className="game-controls">
          <div className="game-stats">
            <div className="stat">
              <i className="fas fa-star"></i>
              <span>Score: {score}</span>
            </div>
            <div className="stat">
              <i className="fas fa-clock"></i>
              <span>Time: {timeLeft}s</span>
            </div>
            <div className="stat">
              <i className="fas fa-layer-group"></i>
              <span>Level: {level}</span>
            </div>
          </div>
          <div className="game-buttons">
            {gameState === 'playing' && (
              <button className="control-btn pause-btn" onClick={pauseGame}>
                <i className="fas fa-pause"></i> Pause
              </button>
            )}
            {gameState === 'paused' && (
              <button className="control-btn resume-btn" onClick={resumeGame}>
                <i className="fas fa-play"></i> Resume
              </button>
            )}
            <button className="control-btn exit-btn" onClick={resetGame}>
              <i className="fas fa-times"></i> Exit
            </button>
          </div>
        </div>
      </div>

      {gameState === 'paused' && (
        <div className="pause-overlay">
          <div className="pause-modal">
            <h3><i className="fas fa-pause"></i> Game Paused</h3>
            <p>Take a break or continue playing!</p>
            <button className="resume-btn" onClick={resumeGame}>
              <i className="fas fa-play"></i> Resume Game
            </button>
          </div>
        </div>
      )}

      {gameState === 'completed' && (
        <div className="completion-overlay">
          <div className="completion-modal">
            <h3><i className="fas fa-trophy"></i> Game Complete!</h3>
            <div className="final-score">
              <h4>Final Score: {score}</h4>
              <p>Max Score: {currentGame.maxScore}</p>
              <div className="score-percentage">
                {Math.round((score / currentGame.maxScore) * 100)}%
              </div>
            </div>
            {score >= currentGame.maxScore * 0.8 && (
              <div className="achievement-unlocked">
                <i className="fas fa-medal"></i>
                <p>Achievement Unlocked!</p>
              </div>
            )}
            <div className="completion-buttons">
              <button className="play-again-btn" onClick={() => startGame(currentGame)}>
                <i className="fas fa-redo"></i> Play Again
              </button>
              <button className="menu-btn" onClick={resetGame}>
                <i className="fas fa-home"></i> Back to Menu
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="game-content">
        {renderGameContent()}
      </div>
    </div>
  );
};

// Game Components
const AIPatternGame = ({ score, addScore, level }) => {
  const [patterns, setPatterns] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [currentPattern, setCurrentPattern] = useState([]);

  useEffect(() => {
    generateNewPattern();
  }, [level]);

  const generateNewPattern = () => {
    const colors = ['red', 'blue', 'green', 'yellow'];
    const patternLength = Math.min(3 + level, 8);
    const newPattern = [];
    
    for (let i = 0; i < patternLength; i++) {
      newPattern.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    
    setCurrentPattern(newPattern);
    setPatterns(prev => [...prev, newPattern]);
    setUserInput([]);
  };

  const handleColorClick = (color) => {
    const newInput = [...userInput, color];
    setUserInput(newInput);
    
    if (newInput.length === currentPattern.length) {
      checkPattern(newInput);
    }
  };

  const checkPattern = (input) => {
    const isCorrect = input.every((color, index) => color === currentPattern[index]);
    
    if (isCorrect) {
      addScore(10 + level * 2);
      setTimeout(generateNewPattern, 1000);
    } else {
      addScore(-5);
    }
  };

  return (
    <div className="ai-pattern-game">
      <div className="pattern-display">
        <h3>Remember the Pattern:</h3>
        <div className="pattern-sequence">
          {currentPattern.map((color, index) => (
            <div 
              key={index} 
              className={`pattern-color ${color}`}
              style={{ animationDelay: `${index * 0.5}s` }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="user-input">
        <h3>Repeat the Pattern:</h3>
        <div className="color-buttons">
          {['red', 'blue', 'green', 'yellow'].map(color => (
            <button
              key={color}
              className={`color-btn ${color}`}
              onClick={() => handleColorClick(color)}
            ></button>
          ))}
        </div>
        <div className="user-sequence">
          {userInput.map((color, index) => (
            <div key={index} className={`user-color ${color}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RobotMazeGame = ({ score, addScore, level }) => {
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });
  const [goalPosition, setGoalPosition] = useState({ x: 4, y: 4 });
  const [maze, setMaze] = useState([]);
  const [commands, setCommands] = useState([]);
  const [executing, setExecuting] = useState(false);

  useEffect(() => {
    generateMaze();
  }, [level]);

  const generateMaze = () => {
    const size = 5 + Math.floor(level / 2);
    const newMaze = Array(size).fill().map(() => Array(size).fill(0));
    
    // Add some obstacles
    for (let i = 0; i < size * 2; i++) {
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);
      if (x !== 0 || y !== 0) {
        newMaze[y][x] = 1; // obstacle
      }
    }
    
    setMaze(newMaze);
    setRobotPosition({ x: 0, y: 0 });
    setGoalPosition({ x: size - 1, y: size - 1 });
    setCommands([]);
  };

  const addCommand = (command) => {
    setCommands(prev => [...prev, command]);
  };

  const executeCommands = async () => {
    setExecuting(true);
    for (let i = 0; i < commands.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      moveRobot(commands[i]);
    }
    setExecuting(false);
    checkWin();
  };

  const moveRobot = (command) => {
    setRobotPosition(prev => {
      const newPos = { ...prev };
      switch (command) {
        case 'up': newPos.y = Math.max(0, newPos.y - 1); break;
        case 'down': newPos.y = Math.min(maze.length - 1, newPos.y + 1); break;
        case 'left': newPos.x = Math.max(0, newPos.x - 1); break;
        case 'right': newPos.x = Math.min(maze[0].length - 1, newPos.x + 1); break;
      }
      return newPos;
    });
  };

  const checkWin = () => {
    if (robotPosition.x === goalPosition.x && robotPosition.y === goalPosition.y) {
      addScore(20 + level * 5);
      setTimeout(generateMaze, 1000);
    }
  };

  return (
    <div className="robot-maze-game">
      <div className="maze-container">
        <div className="maze">
          {maze.map((row, y) => (
            <div key={y} className="maze-row">
              {row.map((cell, x) => (
                <div 
                  key={x} 
                  className={`maze-cell ${cell === 1 ? 'obstacle' : ''} ${
                    robotPosition.x === x && robotPosition.y === y ? 'robot' : ''
                  } ${
                    goalPosition.x === x && goalPosition.y === y ? 'goal' : ''
                  }`}
                >
                  {robotPosition.x === x && robotPosition.y === y && (
                    <i className="fas fa-robot"></i>
                  )}
                  {goalPosition.x === x && goalPosition.y === y && (
                    <i className="fas fa-flag-checkered"></i>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="controls">
        <div className="command-buttons">
          <button onClick={() => addCommand('up')} disabled={executing}>
            <i className="fas fa-arrow-up"></i>
          </button>
          <div className="horizontal-controls">
            <button onClick={() => addCommand('left')} disabled={executing}>
              <i className="fas fa-arrow-left"></i>
            </button>
            <button onClick={() => addCommand('right')} disabled={executing}>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          <button onClick={() => addCommand('down')} disabled={executing}>
            <i className="fas fa-arrow-down"></i>
          </button>
        </div>
        
        <div className="command-list">
          <h4>Commands:</h4>
          <div className="commands">
            {commands.map((cmd, index) => (
              <span key={index} className="command">{cmd}</span>
            ))}
          </div>
        </div>
        
        <div className="action-buttons">
          <button onClick={executeCommands} disabled={executing || commands.length === 0}>
            <i className="fas fa-play"></i> Execute
          </button>
          <button onClick={() => setCommands([])} disabled={executing}>
            <i className="fas fa-trash"></i> Clear
          </button>
        </div>
      </div>
    </div>
  );
};

const CodeBlocksGame = ({ score, addScore, level }) => {
  const [codeBlocks, setCodeBlocks] = useState([]);
  const [targetCode, setTargetCode] = useState([]);
  const [availableBlocks, setAvailableBlocks] = useState([]);

  useEffect(() => {
    generatePuzzle();
  }, [level]);

  const generatePuzzle = () => {
    const blocks = [
      { id: 1, type: 'move', text: 'move()', color: '#4ECDC4' },
      { id: 2, type: 'turn', text: 'turn()', color: '#45B7D1' },
      { id: 3, type: 'repeat', text: 'repeat(3)', color: '#96CEB4' },
      { id: 4, type: 'if', text: 'if(obstacle)', color: '#FF6B6B' },
      { id: 5, type: 'function', text: 'function()', color: '#FFE66D' }
    ];
    
    const target = [
      { type: 'repeat', text: 'repeat(3)', color: '#96CEB4' },
      { type: 'move', text: 'move()', color: '#4ECDC4' },
      { type: 'turn', text: 'turn()', color: '#45B7D1' }
    ];
    
    setTargetCode(target);
    setAvailableBlocks(blocks);
    setCodeBlocks([]);
  };

  const addBlock = (block) => {
    setCodeBlocks(prev => [...prev, block]);
    setAvailableBlocks(prev => prev.filter(b => b.id !== block.id));
  };

  const removeBlock = (index) => {
    const block = codeBlocks[index];
    setCodeBlocks(prev => prev.filter((_, i) => i !== index));
    setAvailableBlocks(prev => [...prev, block]);
  };

  const checkSolution = () => {
    const isCorrect = codeBlocks.length === targetCode.length &&
      codeBlocks.every((block, index) => block.type === targetCode[index].type);
    
    if (isCorrect) {
      addScore(15 + level * 3);
      setTimeout(generatePuzzle, 1000);
    } else {
      addScore(-3);
    }
  };

  return (
    <div className="code-blocks-game">
      <div className="target-area">
        <h3>Target Code:</h3>
        <div className="target-code">
          {targetCode.map((block, index) => (
            <div key={index} className="code-block" style={{ backgroundColor: block.color }}>
              {block.text}
            </div>
          ))}
        </div>
      </div>
      
      <div className="workspace">
        <div className="code-area">
          <h3>Your Code:</h3>
          <div className="code-blocks-container">
            {codeBlocks.map((block, index) => (
              <div 
                key={index} 
                className="code-block draggable" 
                style={{ backgroundColor: block.color }}
                onClick={() => removeBlock(index)}
              >
                {block.text}
              </div>
            ))}
          </div>
        </div>
        
        <div className="available-blocks">
          <h3>Available Blocks:</h3>
          <div className="blocks-container">
            {availableBlocks.map(block => (
              <div 
                key={block.id} 
                className="code-block available" 
                style={{ backgroundColor: block.color }}
                onClick={() => addBlock(block)}
              >
                {block.text}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <button className="check-btn" onClick={checkSolution}>
        <i className="fas fa-check"></i> Check Solution
      </button>
    </div>
  );
};

const LogicGatesGame = ({ score, addScore, level }) => {
  const [gates, setGates] = useState([]);
  const [connections, setConnections] = useState([]);
  const [inputs, setInputs] = useState({ A: false, B: false });
  const [targetOutput, setTargetOutput] = useState(false);

  useEffect(() => {
    generateCircuit();
  }, [level]);

  const generateCircuit = () => {
    const newGates = [
      { id: 'gate1', type: 'AND', x: 200, y: 100 },
      { id: 'gate2', type: 'OR', x: 200, y: 200 },
      { id: 'gate3', type: 'NOT', x: 400, y: 150 }
    ];
    
    setGates(newGates);
    setConnections([]);
    setTargetOutput(Math.random() > 0.5);
  };

  const toggleInput = (input) => {
    setInputs(prev => ({ ...prev, [input]: !prev[input] }));
  };

  const calculateOutput = () => {
    // Simple logic gate simulation
    let output = false;
    if (gates.length > 0) {
      const gate1 = gates[0];
      if (gate1.type === 'AND') {
        output = inputs.A && inputs.B;
      } else if (gate1.type === 'OR') {
        output = inputs.A || inputs.B;
      } else if (gate1.type === 'NOT') {
        output = !inputs.A;
      }
    }
    return output;
  };

  const checkCircuit = () => {
    const output = calculateOutput();
    if (output === targetOutput) {
      addScore(20 + level * 4);
      setTimeout(generateCircuit, 1000);
    } else {
      addScore(-5);
    }
  };

  return (
    <div className="logic-gates-game">
      <div className="circuit-area">
        <div className="inputs">
          <div className="input-switch">
            <label>Input A</label>
            <button 
              className={`switch ${inputs.A ? 'on' : 'off'}`}
              onClick={() => toggleInput('A')}
            >
              {inputs.A ? '1' : '0'}
            </button>
          </div>
          <div className="input-switch">
            <label>Input B</label>
            <button 
              className={`switch ${inputs.B ? 'on' : 'off'}`}
              onClick={() => toggleInput('B')}
            >
              {inputs.B ? '1' : '0'}
            </button>
          </div>
        </div>
        
        <div className="gates-container">
          {gates.map(gate => (
            <div 
              key={gate.id} 
              className={`logic-gate ${gate.type.toLowerCase()}`}
              style={{ left: gate.x, top: gate.y }}
            >
              {gate.type}
            </div>
          ))}
        </div>
        
        <div className="output">
          <label>Output: {calculateOutput() ? '1' : '0'}</label>
        </div>
      </div>
      
      <div className="circuit-controls">
        <div className="target">
          <h4>Target Output: {targetOutput ? '1' : '0'}</h4>
        </div>
        <button className="check-circuit-btn" onClick={checkCircuit}>
          <i className="fas fa-check"></i> Check Circuit
        </button>
      </div>
    </div>
  );
};

const NeuralNetworkGame = ({ score, addScore, level }) => {
  const [trainingData, setTrainingData] = useState([]);
  const [currentInput, setCurrentInput] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    generateTrainingData();
  }, [level]);

  const generateTrainingData = () => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      const input = [Math.random() > 0.5, Math.random() > 0.5, Math.random() > 0.5];
      const output = input.filter(x => x).length >= 2; // At least 2 true values
      data.push({ input, output });
    }
    setTrainingData(data);
    generateNewInput();
  };

  const generateNewInput = () => {
    const input = [Math.random() > 0.5, Math.random() > 0.5, Math.random() > 0.5];
    setCurrentInput(input);
    setPrediction(null);
  };

  const makePrediction = (predictedOutput) => {
    const actualOutput = currentInput.filter(x => x).length >= 2;
    const isCorrect = predictedOutput === actualOutput;
    
    if (isCorrect) {
      addScore(10 + level * 2);
      setAccuracy(prev => Math.min(100, prev + 10));
    } else {
      addScore(-2);
      setAccuracy(prev => Math.max(0, prev - 5));
    }
    
    setPrediction(predictedOutput);
    setTimeout(generateNewInput, 1500);
  };

  return (
    <div className="neural-network-game">
      <div className="network-visualization">
        <div className="input-layer">
          <h4>Input Layer</h4>
          {currentInput.map((value, index) => (
            <div key={index} className={`neuron ${value ? 'active' : 'inactive'}`}>
              {value ? '1' : '0'}
            </div>
          ))}
        </div>
        
        <div className="hidden-layer">
          <h4>Hidden Layer</h4>
          <div className="neurons">
            <div className="neuron">H1</div>
            <div className="neuron">H2</div>
            <div className="neuron">H3</div>
          </div>
        </div>
        
        <div className="output-layer">
          <h4>Output Layer</h4>
          <div className="neuron">Output</div>
        </div>
      </div>
      
      <div className="prediction-area">
        <h3>Make a Prediction:</h3>
        <div className="current-input">
          Input: [{currentInput.map(x => x ? '1' : '0').join(', ')}]
        </div>
        
        <div className="prediction-buttons">
          <button 
            className="prediction-btn true"
            onClick={() => makePrediction(true)}
            disabled={prediction !== null}
          >
            Predict: True
          </button>
          <button 
            className="prediction-btn false"
            onClick={() => makePrediction(false)}
            disabled={prediction !== null}
          >
            Predict: False
          </button>
        </div>
        
        {prediction !== null && (
          <div className="prediction-result">
            <p>Your prediction: {prediction ? 'True' : 'False'}</p>
            <p>Actual: {currentInput.filter(x => x).length >= 2 ? 'True' : 'False'}</p>
          </div>
        )}
      </div>
      
      <div className="training-info">
        <h4>Training Data:</h4>
        <div className="training-examples">
          {trainingData.slice(0, 5).map((example, index) => (
            <div key={index} className="training-example">
              [{example.input.map(x => x ? '1' : '0').join(', ')}] → {example.output ? 'True' : 'False'}
            </div>
          ))}
        </div>
        <div className="accuracy">
          <h4>Accuracy: {accuracy}%</h4>
        </div>
      </div>
    </div>
  );
};

const RobotArmGame = ({ score, addScore, level }) => {
  const [armPosition, setArmPosition] = useState({ x: 50, y: 50 });
  const [targetPosition, setTargetPosition] = useState({ x: 80, y: 30 });
  const [gripperOpen, setGripperOpen] = useState(true);
  const [holdingObject, setHoldingObject] = useState(false);
  const [objectPosition, setObjectPosition] = useState({ x: 20, y: 80 });

  useEffect(() => {
    generateNewTask();
  }, [level]);

  const generateNewTask = () => {
    setTargetPosition({
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 10
    });
    setObjectPosition({
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 10
    });
    setArmPosition({ x: 50, y: 50 });
    setGripperOpen(true);
    setHoldingObject(false);
  };

  const moveArm = (direction) => {
    setArmPosition(prev => {
      const newPos = { ...prev };
      switch (direction) {
        case 'up': newPos.y = Math.max(10, newPos.y - 5); break;
        case 'down': newPos.y = Math.min(90, newPos.y + 5); break;
        case 'left': newPos.x = Math.max(10, newPos.x - 5); break;
        case 'right': newPos.x = Math.min(90, newPos.x + 5); break;
      }
      return newPos;
    });
  };

  const toggleGripper = () => {
    if (gripperOpen && !holdingObject) {
      // Check if arm is near object
      const distance = Math.sqrt(
        Math.pow(armPosition.x - objectPosition.x, 2) + 
        Math.pow(armPosition.y - objectPosition.y, 2)
      );
      if (distance < 10) {
        setHoldingObject(true);
      }
    } else if (!gripperOpen && holdingObject) {
      // Check if arm is near target
      const distance = Math.sqrt(
        Math.pow(armPosition.x - targetPosition.x, 2) + 
        Math.pow(armPosition.y - targetPosition.y, 2)
      );
      if (distance < 10) {
        setHoldingObject(false);
        addScore(25 + level * 5);
        setTimeout(generateNewTask, 1000);
      }
    }
    setGripperOpen(!gripperOpen);
  };

  return (
    <div className="robot-arm-game">
      <div className="workspace">
        <div className="robot-arm" style={{ left: `${armPosition.x}%`, top: `${armPosition.y}%` }}>
          <div className="arm-base"></div>
          <div className={`gripper ${gripperOpen ? 'open' : 'closed'}`}></div>
        </div>
        
        <div className="object" style={{ left: `${objectPosition.x}%`, top: `${objectPosition.y}%` }}>
          {!holdingObject && <div className="cube"></div>}
        </div>
        
        <div className="target" style={{ left: `${targetPosition.x}%`, top: `${targetPosition.y}%` }}>
          <div className="target-zone"></div>
        </div>
        
        {holdingObject && (
          <div className="held-object" style={{ left: `${armPosition.x}%`, top: `${armPosition.y}%` }}>
            <div className="cube"></div>
          </div>
        )}
      </div>
      
      <div className="arm-controls">
        <div className="movement-controls">
          <button onClick={() => moveArm('up')}>
            <i className="fas fa-arrow-up"></i>
          </button>
          <div className="horizontal-controls">
            <button onClick={() => moveArm('left')}>
              <i className="fas fa-arrow-left"></i>
            </button>
            <button onClick={() => moveArm('right')}>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          <button onClick={() => moveArm('down')}>
            <i className="fas fa-arrow-down"></i>
          </button>
        </div>
        
        <div className="gripper-control">
          <button 
            className={`gripper-btn ${gripperOpen ? 'open' : 'closed'}`}
            onClick={toggleGripper}
          >
            <i className="fas fa-hand-paper"></i>
            {gripperOpen ? 'Close' : 'Open'} Gripper
          </button>
        </div>
        
        <div className="task-info">
          <h4>Task: Move the cube to the target zone</h4>
          <p>Status: {holdingObject ? 'Holding object' : 'Not holding object'}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayZone; 