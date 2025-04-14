import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface RentEscalationProps {
  escalations: Array<{
    year: number;
    amount: number;
  }>;
}

export default function RentEscalationChart({ escalations }: RentEscalationProps) {
    const chartData = {
        labels: escalations.map(e => e.year.toString()),
        datasets: [{
            label: 'Base Rent PSF',
            data: escalations.map(e => e.amount),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Rent Escalations Over Time'
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Rent PSF ($)'
                }
            }
        }
    };

    return (
        <div className="h-full w-full">
            <Line data={chartData} options={chartOptions} />
        </div>
    );
} 