import OscarData from './sampledata.csv';
import Papa from 'papaparse';
import {useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
 
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
)
 
function Home() {
  const [chartData, setChartData] = useState({
    datasets: []
  });
  const [chartOptions, setChartOptions] = useState({})
 
  useEffect(() => {
    Papa.parse(OscarData, {
      download: true,
      header: true,
      dynamicTyping: true,
      delimiter: "",
      complete: ((result) => {
        console.log(result)
        setChartData({
          labels: result.data.map((item, index) => [item[' "Month"']]).filter( String ),
          datasets: [
            {
              label: "OSCAR WINNER",
              data: result.data.map((item, index) => [item[' "Values"']]).filter( Number ),
              borderColor: "black",
              backgroundColor: "red"

            }
          ]
        });
        setChartOptions({
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: "ALL OSCAR WINNERS SINCE 1928"
            }
          }
        })
      })
    })
  }, [])
 
  return (
    <div>
      <h1>HOME PAGE</h1>
      {
        chartData.datasets.length > 0 ? (
          <div>
            <Bar options={chartOptions} data={chartData}/>
            </div>
        ) : (
          <div>
            Loading...
            </div>
        )
      }
    </div>
  );
}
 
export default Home;
