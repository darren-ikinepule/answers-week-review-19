import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TrainingActivity {
  id: number;
  type: string;
  date: string;
  duration: number;
}

interface DailyData {
  day: string;
  totalDuration: number;
}

interface TrainingChartProps {
  activities: TrainingActivity[];
  playerName: string;
}

export const TrainingChart: React.FC<TrainingChartProps> = ({ activities, playerName }) => {
  const getDailyData = (): DailyData[] => {
    const dailyTotals: Record<string, number> = {};

    activities.forEach(activity => {
      const date = activity.date;
      
      if (!dailyTotals[date]) {
        dailyTotals[date] = 0;
      }
      dailyTotals[date] += activity.duration;
    });

    const allDays = ['2025-06-01', '2025-06-02', '2025-06-03', '2025-06-04'];
    
    return allDays.map(date => ({
      day: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      totalDuration: dailyTotals[date] || 0
    }));
  };

  const dailyData = getDailyData();

  return (
    <div className="training-chart">
      <h2>{playerName} - Training Duration (June 1-4, 2025)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dailyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => [`${value} minutes`, 'Training Duration']} />
          <Legend />
          <Bar dataKey="totalDuration" fill="#8884d8" name="Training Duration (minutes)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}; 