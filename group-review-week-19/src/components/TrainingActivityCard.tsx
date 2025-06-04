interface TrainingActivity {
  id: number;
  type: string;
  date: string;
  duration: number;
}

interface TrainingActivityCardProps {
  activity: TrainingActivity;
}

export const TrainingActivityCard: React.FC<TrainingActivityCardProps> = ({ activity }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="activity-card">
      <div className="activity-header">
        <h3 className="activity-type">{activity.type}</h3>
        <span className="activity-duration">{activity.duration} min</span>
      </div>
      <p className="activity-date">{formatDate(activity.date)}</p>
    </div>
  );
}; 