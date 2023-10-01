// Function to store game data in local storage
function storeGameData(level, question, errors, time) {
    let gameData = JSON.parse(localStorage.getItem('gameData')) || [];
    gameData.push({ level, question, errors, time });
    localStorage.setItem('gameData', JSON.stringify(gameData));
  }
  
// Function to show game history
function showGameHistory() {
    let gameData = JSON.parse(localStorage.getItem('gameData')) || [];
    let report = '';
    gameData.forEach((game, index) => {
      report += `<p>Game ${index + 1}: Level ${game.level}, Question: ${game.question}, Errors: ${game.errors}, Time: ${game.time} seconds</p>`;
    });
    document.getElementById('gameHistory').innerHTML = report;
    document.getElementById('gameHistoryOverlay').style.display = 'block';

  }
    
  // Function to clear game history
  function clearGameHistory() 
  {
    localStorage.removeItem('gameData');
    document.getElementById('gameHistory').innerHTML = '';
    showGameHistory();
  }
  
  function closeGameHistory() {
    document.getElementById('gameHistoryOverlay').style.display = 'none';
    console.log("closeGameHistory.");
  }

  