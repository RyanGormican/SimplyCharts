import React, { useState } from 'react';
import './App.css';
import { Icon } from '@iconify/react';

function App() {
  const [chartData, setChartData] = useState(null);
  const [showTitle, setShowTitle] = useState(true);
  const [titleText, setTitleText] = useState('Sample Title');
  const [DataLabel, setDataLabel] = useState('Sample Data Label');
  const [datasetSize, setDatasetSize] = useState(3);
  const [datasetValues, setDatasetValues] = useState(Array.from({ length: datasetSize }, (_, index) => 1));
  const [datasetLabels, setDatasetLabels] = useState(Array.from({ length: datasetSize }, (_, index) => ``));
  const handleSizeChange = (increment) => {
    const newSize = Math.max(1, Math.min(10, datasetSize + increment));
    setDatasetSize(newSize);
setDatasetValues((prevValues) =>
    Array.from({ length: newSize }, (_, index) =>
      index < datasetSize ? prevValues[index] : 1
    )
  );
     setDatasetLabels((prevLabels) =>
    Array.from({ length: newSize }, (_, index) =>
      index < datasetSize ? prevLabels[index] : ''
    )
  );
  };

  const handleValueChange = (index, value) => {
  const newValues = [...datasetValues];
  const isValidInput = /^-?\d*\.?\d*$/.test(value);
  if (isValidInput) {
    newValues[index] = value === '' ? '' : parseFloat(value);
    setDatasetValues(newValues);
  }
};
  const handleLabelChange = (index, label) => {
  const newLabels = [...datasetLabels];
  newLabels[index] = label;
  setDatasetLabels(newLabels);
};
  const fetchChart = async () => {
    try {
      const chartData = {
        type: 'bar',
        data: {
          labels: datasetLabels,
          datasets: [
            {
              label: DataLabel,
              data: datasetValues,
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
        <div className="title">
        SimplyCharts
        </div>
        <div className="chart-controls">
        <div>
          <label>
            Primary Data Label
            <input
              type="text"
              value={DataLabel}
              onChange={(e) => setDataLabel(e.target.value)}
            />
          </label>
         </div>
         <div>
          <label>
            Dataset Size
            <button type="button" onClick={() => handleSizeChange(-1)}>
              <Icon icon="ic:baseline-minus" />
            </button>
            {datasetSize}
            <button type="button" onClick={() => handleSizeChange(1)}>
              <Icon icon="ic:baseline-plus" />
            </button>
          </label>

          {datasetValues.map((value, index) => (
            <label key={index}>
              Value {index + 1}
              <input
                type="number"
                step="any"
                value={value === '' ? '' : value}
                onChange={(e) => handleValueChange(index, e.target.value)}
                className="small-input"
              />
            </label>
          ))}
          </div>
          <div>
          {datasetValues.map((value, index) => (
  <label key={index}>
    Label {index + 1}
    <input
      type="text"
      value={datasetLabels[index]}
      onChange={(e) => handleLabelChange(index, e.target.value)}
    />
  </label>
))}
          </div>
          <div>
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
          </div>
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
