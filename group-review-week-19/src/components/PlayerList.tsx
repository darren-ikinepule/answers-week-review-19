interface Player {
  id: number;
  name: string;
  position: string;
  age: number;
  team: string;
  isSouthIslander?: boolean;
}

interface PlayerListProps {
  onPlayerSelect: (player: Player) => void;
}

export const PlayerList: React.FC<PlayerListProps> = ({ onPlayerSelect }) => {
  const players: Player[] = [
    { id: 1, name: "Beauden Barrett", position: "Fly Half", age: 33, team: "Blues", isSouthIslander: false},
    { id: 2, name: "Aaron Smith", position: "Scrum Half", age: 35, team: "Highlanders", isSouthIslander: true },
    { id: 3, name: "Brodie Retallick", position: "Lock", age: 33, team: "Chiefs", isSouthIslander: false },
    { id: 4, name: "Sam Whitelock", position: "Lock", age: 36, team: "Crusaders", isSouthIslander: true },
    { id: 5, name: "Richie Mo'unga", position: "Fly Half", age: 30, team: "Crusaders", isSouthIslander: true  },
    { id: 6, name: "Ardie Savea", position: "Flanker", age: 31, team: "Hurricanes", isSouthIslander: false },
    { id: 7, name: "Jordie Barrett", position: "Fullback", age: 27, team: "Hurricanes", isSouthIslander: false },
    { id: 8, name: "Will Jordan", position: "Wing", age: 26, team: "Crusaders" },
    { id: 9, name: "Rieko Ioane", position: "Centre", age: 27, team: "Blues", isSouthIslander: false },
    { id: 10, name: "Dane Coles", position: "Hooker", age: 38, team: "Hurricanes", isSouthIslander: false },
  ];
   
  return (
    <div className="player-list">
      <h2>New Zealand Rugby Players</h2>
      <p>Select a player to view their training data for June 1-4, 2025</p>
      <div className="players-grid">
        {players.map(player => (
          <div 
            key={player.id} 
            className="player-card"
            onClick={() => onPlayerSelect(player)}
          >
            <h3 className="player-name">{player.name}</h3>
            <p className="player-position">{player.position}</p>
            <p className="player-team">{player.team}</p>
            <p className="player-age">Age: {player.age}</p>
            {player.isSouthIslander === true ? <span className="south-island-badge">South Islander</span> : null}

            
         
          </div>
        ))}
      </div>
    </div>
  );
}; 