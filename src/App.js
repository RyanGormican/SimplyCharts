import React, { useState } from 'react';
import './App.css';
import { Icon } from '@iconify/react';
function App() {
  const [chartData, setChartData] = useState(null);
  const [showTitle, setShowTitle] = useState(false);
  const [datasetSize, setDatasetSize] = useState(3);
  const initialColors = ['#34baeb', '#34baec', '#34baed']; 
  const [backgroundColor, setBackgroundColor] = useState(initialColors.slice(0, datasetSize));
  const [titleText, setTitleText] = useState('Sample Title');
  const [DataLabel, setDataLabel] = useState('Sample Data Label');
  const [chartType, setChartType] = useState('bar');
  const [datasetValues, setDatasetValues] = useState(Array.from({ length: datasetSize }, (_, index) => 1));
  const [datasetLabels, setDatasetLabels] = useState(Array.from({ length: datasetSize }, (_, index) => ``));
  const handleSizeChange = (increment) => {
    const newSize = Math.max(1, Math.min(15, datasetSize + increment));
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
  console.log(initialColors);
setBackgroundColor((prevColors) =>
  Array.from({ length: newSize }, (_, index) =>
    index < prevColors.length ? prevColors[index] : chartType === 'bar' || chartType === 'line' || chartType === 'horizontalBar' ? backgroundColor[0] : backgroundColor[0]
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
const handleColorChange = (index, color) => {
  const newColors = [...backgroundColor];
  newColors[index] = color.startsWith('#') ? color : `#${color}`;
  setBackgroundColor(newColors);
};
const handleChartTypeChange = (newChartType) => {
  setChartType(newChartType);
  if (newChartType !== 'pie') {
  setBackgroundColor(Array.from({ length: datasetSize }, () => initialColors[0]));
  }
};
  const fetchChart = async () => {
    try {
      const chartData = {
        type: chartType,
        data: {
          labels: datasetLabels,
          datasets: [
            {
              backgroundColor: backgroundColor,
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
           <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#valuesCollapse" aria-expanded="false" aria-controls="datasetCollapse" style={{ width: '80vw',border: '2px solid #ffffff'}}>
Formation Values
  </button>
  <div class="collapse show" id="valuesCollapse">
  <div class = "card card-body d-flex mx-auto" style= {{backgroundColor: '#282c34', border: '2px solid #ffffff', maxWidth:'80vw'}}>
        <div  class="btn-group d-flex mx-auto">
         <button type="button" class="btn btn-primary dropdown-toggle chart-type-btn"  data-bs-toggle="dropdown"  aria-haspopup="true" aria-expanded="false" style={{ width: '5vw', border: '2px solid #ffffff' }}>
      {chartType !== 'bar' && chartType !== 'horizontalBar' ? (
      <div>
         {chartType.charAt(0).toUpperCase() + chartType.slice(1)}
      </div>
      ) : (
      <div>
      {chartType === 'bar' ? (
      <p> Vertical Bar </p>
      ) : (
     <p> Horizontal Bar </p>
      )}
    </div>
      )}
      
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item"  onClick={() => handleChartTypeChange('bar')}href="#">Vertical Bar</a>
    <a class="dropdown-item"  onClick={() => handleChartTypeChange('horizontalBar')}href="#">Horizontal Bar</a>
    <a class="dropdown-item"  onClick={() => handleChartTypeChange('pie')} href="#">Pie</a>
    <a class="dropdown-item"  onClick={() => handleChartTypeChange('line')}href="#">Line</a><
  /div>
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
        {chartType !== 'pie' ? (
        <div>
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
    Primary Data Color
    <input
      type="color"
      value={backgroundColor[0]}  
      onChange={(e) => {
        const newColor = e.target.value;
        setBackgroundColor(Array.from({ length: datasetSize }, () => newColor));
      }}
    />
  </label>
</div>
</div>
        ):( "")}
        </div>
        </div>
    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#datasetCollapse" aria-expanded="false" aria-controls="datasetCollapse" style={{ width: '80vw',border: '2px solid #ffffff'}}>
Dataset Values
  </button>
  <div class="collapse show" id="datasetCollapse">
  <div class = "card card-body  d-flex mx-auto" style= {{backgroundColor: '#282c34', border: '2px solid #ffffff', maxWidth:'80vw'}}>
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
          </div>
          <div class="dataset">
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
          <div class="dataset">
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
           {chartType === 'pie' && (
          <div className="dataset">
            {backgroundColor.map((color, index) => (
              <label key={index}>
                Color {index + 1}
                <input
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                />
              </label>
            ))}
          </div>
        )}
          </div>
          </div>
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
