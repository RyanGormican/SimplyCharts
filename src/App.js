import React, { useState, useEffect } from 'react';
import './App.css';
import { Icon } from '@iconify/react';
function App() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const response = await fetch(
          'https://quickchart.io/chart?c={type:\'bar\',data:{labels:[1,2,3],datasets:[{label:\'Test\',data:[1,2,3]}]}}'
        );
         const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setChartData(imageUrl);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChart();
  }, []); 
  return (
    <div className="App">
      <header className="App-header">
       <div className="links">
          <a href="https://www.linkedin.com/in/ryangormican/">
            <Icon icon="mdi:linkedin" color="#0e76a8" width="60" />
          </a>
          <a href="https://github.com/RyanGormican/SimplyCharts">
            <Icon icon="mdi:github" color="#e8eaea" width="60" />
          </a>
          <a href="https://ryangormicanportfoliohub.vercel.app/">
            <Icon icon="teenyicons:computer-outline" color="#199c35" width="60" />
          </a>
        </div>

         {chartData && (
          <div className="chart-container">
            <img src={chartData} alt="Chart" />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
