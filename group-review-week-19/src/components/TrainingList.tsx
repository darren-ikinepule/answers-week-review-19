import { TrainingActivityCard } from './TrainingActivityCard';

interface TrainingActivity {
  id: number;
  type: string;
  date: string;
  duration: number;
}

interface Player {
  id: number;
  name: string;
  position: string;
  age: number;
  team: string;
  isSouthIsland?: boolean;
}

interface TrainingListProps {
  player: Player;
}

export const TrainingList: React.FC<TrainingListProps> = ({ player }) => {
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

  const trainingActivities = generateTrainingData(player);

  return (
    <div className="training-list">
      <h2>{player.name} - Training Activities (June 1-4, 2025)</h2>
      <p>{player.position} | {player.team} | {trainingActivities.length} sessions</p>
      <div className="activities-grid">
        {trainingActivities.map(activity => (
          <TrainingActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}; 