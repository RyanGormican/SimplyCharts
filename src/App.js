import React, { useState } from 'react';
import './App.css';
import { Icon } from '@iconify/react';

function App() {
  const [chartData, setChartData] = useState(null);
  const [showTitle, setShowTitle] = useState(true);
  const [titleText, setTitleText] = useState('Sample Title');
  const [primarydataLabel, setPrimaryDataLabel] = useState('Sample Data Label')
  const fetchChart = async () => {
    try {
      const chartData = {
        type: 'bar',
        data: {
          labels: [1, 2, 3],
          datasets: [
            {
              label: primarydataLabel,
              data: [1, 2, 3],
            },
          ],
        },
        options: {
          title: {
            display: showTitle,
            text: titleText,
          },
        },
      };

      const chartDataString = encodeURIComponent(JSON.stringify(chartData));
      const apiUrl = `https://quickchart.io/chart?c=${chartDataString}`;

      const response = await fetch(apiUrl);
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setChartData(imageUrl);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

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

         <div>
          <label>
            Primary Data Label
              <input
                type="text"
                value={primarydataLabel}
                onChange={(e) => setTitleText(e.target.value)}
              />
        </label>
              </div>

        <div className="chart-controls">


          <label>
            Title
            <input
              type="checkbox"
              checked={showTitle}
              onChange={() => setShowTitle(!showTitle)}
            />
          </label>
         
          {showTitle && (
            <label>
             
              <input
                type="text"
                value={titleText}
                onChange={(e) => setTitleText(e.target.value)}
              />
            </label>
          )}
             <div className="button-container">
          <button type="button" className="btn btn-primary" onClick={fetchChart}>
            Create Chart
          </button>
          </div>
          {chartData && (
            <div className="chart-container">
              <img src={chartData} alt="Chart" />
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
