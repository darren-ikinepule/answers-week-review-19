import { useState } from 'react';
import './App.css';
import { PlayerList } from './components/PlayerList';
import { TrainingChart } from './components/TrainingChart';
import { TrainingList } from './components/TrainingList';

interface Player {
  id: number;
  name: string;
  position: string;
  age: number;
  team: string;
  isSouthIslander?: boolean;
}

interface TrainingActivity {
  id: number;
  type: string;
  date: string;
  duration: number;
}

function App() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const generateTrainingData = (player: Player): TrainingActivity[] => {
    const trainingTypes = ["Running", "Weightlifting", "Drills", "Cardio", "Skills Practice", "Recovery", "Scrummaging", "Lineout Practice"];
    const activities: TrainingActivity[] = [];
    
    const availableDays = [1, 2, 3, 4];
    const numActivities = 8 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < numActivities; i++) {
      const day = availableDays[Math.floor(Math.random() * availableDays.length)];
      const type = trainingTypes[Math.floor(Math.random() * trainingTypes.length)];
      
      let baseDuration = 45;
      if (type === "Running" || type === "Cardio") baseDuration = 35;
      if (type === "Weightlifting") baseDuration = 60;
      if (type === "Skills Practice") baseDuration = 90;
      if (type === "Recovery") baseDuration = 30;
      
      const positionMultiplier = ["Lock", "Hooker", "Prop"].includes(player.position) ? 1.2 : 1.0;
      const duration = Math.floor(baseDuration * positionMultiplier * (0.8 + Math.random() * 0.4));
      
      activities.push({
        id: i + 1,
        type,
        date: `2025-06-${day.toString().padStart(2, '0')}`,
        duration
      });
    }
    
    return activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const handlePlayerSelect = (player: Player) => {
    setSelectedPlayer(player);
  };

  const handleBackToPlayers = () => {
    setSelectedPlayer(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Rugby Training Tracker</h1>
        <p>Track and analyze rugby training performance</p>
        {selectedPlayer && (
          <button className="back-button" onClick={handleBackToPlayers}>
            ← Back to Players
          </button>
        )}
      </header>

      <main className="app-main">
        {!selectedPlayer ? (
          <PlayerList onPlayerSelect={handlePlayerSelect} />
        ) : (
          <>
            <section className="chart-section">
              <TrainingChart 
                activities={generateTrainingData(selectedPlayer)} 
                playerName={selectedPlayer.name}
              />
            </section>

            <section className="list-section">
              <TrainingList player={selectedPlayer} />
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
