import React, { useState, useRef } from 'react';
import './App.css';
import { Icon } from '@iconify/react';
function App() {
  const [chartData, setChartData] = useState([]);
  const [showTitle, setShowTitle] = useState(false);
  const [datasetSize, setDatasetSize] = useState(3);
  const initialColors = ['#34baeb', '#34baec', '#34baed']; 
  const [backgroundColor, setBackgroundColor] = useState(initialColors.slice(0, datasetSize));
  const [titleText, setTitleText] = useState('Sample Title');
  const [DataLabel, setDataLabel] = useState('Sample Label');
  const [legendPosition, setLegendPosition] = useState('top');
  const [chartType, setChartType] = useState('bar');
  const [showYAxis, setShowYAxis] = useState(true);
  const [showXAxis, setShowXAxis] = useState(true);
  const [yAxisLabel, setyAxisLabel] = useState('');
  const [xAxisLabel, setxAxisLabel] = useState('');
    const carouselRef = useRef(null); 
    const [activeChartIndex, setActiveChartIndex] = useState(0);

  const [datasetValues, setDatasetValues] = useState(Array.from({ length: datasetSize }, (_, index) => 1));
  const [datasetLabels, setDatasetLabels] = useState(Array.from({ length: datasetSize }, (_, index) => ``));
  const [datasetXValues, setDatasetXValues] = useState(Array.from({ length: datasetSize }, (_, index) => 0));
const [datasetYValues, setDatasetYValues] = useState(Array.from({ length: datasetSize }, (_, index) => 0));
const [datasetRadius, setDatasetRadius] = useState(Array.from({ length: datasetSize }, (_, index) => 5));
const [showDataLabels, setShowDataLabels] = useState(false);
const [dataLabelsAlignment, setDataLabelsAlignment] = useState('center');
  const handleSizeChange = (increment) => {
    const newSize = Math.max(1, Math.min(15, datasetSize + increment));
    setDatasetSize(newSize);
setDatasetValues((prevValues) =>
    Array.from({ length: newSize }, (_, index) =>
      index < datasetSize ? prevValues[index] : 1
    )
  );
  setDatasetXValues((prevValues) =>
    Array.from({ length: newSize }, (_, index) =>
      index < datasetSize ? prevValues[index] : 1
    )
  );
  setDatasetYValues((prevValues) =>
    Array.from({ length: newSize }, (_, index) =>
      index < datasetSize ? prevValues[index] : 1
    )
  );
    setDatasetRadius((prevValues) =>
    Array.from({ length: newSize }, (_, index) =>
      index < datasetSize ? prevValues[index] : 1
    )
  );
     setDatasetLabels((prevLabels) =>
    Array.from({ length: newSize }, (_, index) =>
      index < datasetSize ? prevLabels[index] : ''
    )
  );
  console.log(backgroundColor);
setBackgroundColor((prevColors) =>
  Array.from({ length: newSize }, (_, index) =>
    index < prevColors.length ? prevColors[index] : chartType === 'bar' || chartType === 'horizontalBar' ? backgroundColor[0] : ''
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
const handleXValueChange = (index, value) => {
  const newXValues = [...datasetXValues];
  const isValidInput = /^-?\d*\.?\d*$/.test(value);
  if (isValidInput) {
    newXValues[index] = value === '' ? '' : parseFloat(value);
    setDatasetXValues(newXValues);
  }
};

const handleYValueChange = (index, value) => {
  const newYValues = [...datasetYValues];
  const isValidInput = /^-?\d*\.?\d*$/.test(value);
  if (isValidInput) {
    newYValues[index] = value === '' ? '' : parseFloat(value);
    setDatasetYValues(newYValues);
  }
};
const handleRadiusChange = (index, value) => {
  const newRadiusValues = [...datasetRadius];
  const isValidInput = /^-?\d*\.?\d*$/.test(value);
  if (isValidInput) {
    newRadiusValues[index] = value === '' ? '' : parseFloat(value);
    setDatasetRadius(newRadiusValues);
  }
};
const hexToRgb = (hex) => {
  hex = hex.replace(/^#/, '');
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r},${g},${b}`;
};
const hexToRgbA = (hexArray,alpha) => {
return hexArray.map((hex) => {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r},${g},${b},${alpha})`;
  });
};

const datasetBackgroundColor =
  chartType === 'scatter'
    ? backgroundColor[0]
    : chartType === 'radar' || chartType === 'polarArea'
    ? `rgba(${hexToRgb(backgroundColor[0])}, 0.5)`
    : backgroundColor;

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
 if (newChartType === 'line' || newChartType === 'scatter') {
    setBackgroundColor([backgroundColor[0]]);
  } else {
    setBackgroundColor(Array.from({ length: datasetSize }, () => backgroundColor[0]));
      setShowXAxis(true);
        setShowYAxis(true);
  }
  if (newChartType === 'pie' || newChartType === 'polarArea' || newChartType === 'doughnut' || newChartType === 'radar'){
        setyAxisLabel('');
        setxAxisLabel('');
        setShowXAxis(false);
        setShowYAxis(false);
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
            borderColor: chartType === 'scatter' || chartType === 'radar' ? [backgroundColor[0]] : backgroundColor,
            backgroundColor: chartType === 'scatter' ? backgroundColor[0] : (chartType === 'radar') ? `rgba(${hexToRgb(backgroundColor[0])}, 0.5)` : (chartType === 'polarArea')? hexToRgbA(backgroundColor,0.5) : backgroundColor,
            label: DataLabel,
            data: chartType === 'scatter'
              ? datasetXValues.map((xValue, index) => ({
                  x: xValue,
                  y: datasetYValues[index],
                }))
              : chartType === 'bubble' 
              ? datasetXValues.map((xValue, index) => ({
                  x: xValue,
                  y: datasetYValues[index],
                  r: datasetRadius[index],
                }))
              : datasetValues,
            fill: chartType === 'radar' ? 'origin' : false,
          },
        ],
      },
      options: {
      legend: {
      position: legendPosition,
      },
        title: {
          display: showTitle,
          text: titleText,
        },
        plugins: {
            datalabels: {
               display: showDataLabels,
               align : dataLabelsAlignment,
            }
        },
        scales: {
          xAxes: [
            {
              display: showXAxis,
              scaleLabel: {
                display: true,
                labelString: xAxisLabel,
              },
            },
          ],
          yAxes: [
            {
              display: showYAxis,
              scaleLabel: {
                display: true,
                labelString: yAxisLabel,
              },
              ticks: {
            beginAtZero: true,
          },
            },
          ],
        },
      },
    };

    const chartDataString = encodeURIComponent(JSON.stringify(chartData));
    const apiUrl = `https://quickchart.io/chart?c=${chartDataString}`;

    const response = await fetch(apiUrl);
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    setChartData((prevChartData) => [...prevChartData, imageUrl]);
  carouselRef.current.to(chartData.length);
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
        Chart Type 
         <button type="button" class="btn btn-primary dropdown-toggle chart-type-btn"  data-bs-toggle="dropdown"  aria-haspopup="true" aria-expanded="false" style={{ width: '5vw', border: '2px solid #ffffff' }}>
      {chartType !== 'bar' && chartType !== 'horizontalBar'  ? (
      <div> 
      {chartType === 'polarArea' ? (
        <div>
        <p> Polar </p>
        </div>
        ) : (
      <div>
         {chartType.charAt(0).toUpperCase() + chartType.slice(1)}
      </div>
      )}
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
    <a class="dropdown-item"  onClick={() => handleChartTypeChange('line')}href="#">Line</a>
    <a class="dropdown-item"  onClick={() => handleChartTypeChange('scatter')}href="#">Scatter</a>
    <a class="dropdown-item"  onClick={() => handleChartTypeChange('bubble')}href="#">Bubble</a>
    <a class="dropdown-item"  onClick={() => handleChartTypeChange('polarArea')}href="#">Polar</a>
    <a class="dropdown-item"  onClick={() => handleChartTypeChange('doughnut')}href="#">Doughnut</a>
    <a class="dropdown-item"  onClick={() => handleChartTypeChange('radar')}href="#">Radar</a>
    </div>
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
          <div>
           <label>
            Data Labels
            <input
              type="checkbox"
              checked={showDataLabels}
              onChange={() => setShowDataLabels(!showDataLabels)}
            />
          </label>
               {showDataLabels && (
     <div>
Data Labels Alignment
    <button type="button" class="btn btn-primary dropdown-toggle chart-type-btn"  data-bs-toggle="dropdown"  aria-haspopup="true" aria-expanded="false" style={{ width: '5vw', border: '2px solid #ffffff' }}>
  {dataLabelsAlignment.charAt(0).toUpperCase() + dataLabelsAlignment.slice(1)}
      
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item"  onClick={() => setDataLabelsAlignment('top')}href="#">Top</a>
    <a class="dropdown-item"  onClick={() => setDataLabelsAlignment('left')}href="#">Left</a>
    <a class="dropdown-item"  onClick={() => setDataLabelsAlignment('right')}href="#">Right</a>
    <a class="dropdown-item"  onClick={() => setDataLabelsAlignment('bottom')}href="#">Bottom</a>
    <a class="dropdown-item"  onClick={() => setDataLabelsAlignment('center')}href="#">Center</a>
    <a class="dropdown-item"  onClick={() => setDataLabelsAlignment('start')}href="#">Start</a>
    <a class="dropdown-item"  onClick={() => setDataLabelsAlignment('end')}href="#">End</a>
    </div>
        </div>        
          )}

          </div>
<div>
Legend Position
    <button type="button" class="btn btn-primary dropdown-toggle chart-type-btn"  data-bs-toggle="dropdown"  aria-haspopup="true" aria-expanded="false" style={{ width: '5vw', border: '2px solid #ffffff' }}>
  {legendPosition.charAt(0).toUpperCase() + legendPosition.slice(1)}
      
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item"  onClick={() => setLegendPosition('top')}href="#">Top</a>
    <a class="dropdown-item"  onClick={() => setLegendPosition('left')}href="#">Left</a>
    <a class="dropdown-item"  onClick={() => setLegendPosition('right')}href="#">Right</a>
    <a class="dropdown-item"  onClick={() => setLegendPosition('bottom')}href="#">Bottom</a>
    </div>
        </div>        
{chartType !== 'pie' && chartType !== 'polarArea' && chartType !== 'doughnut' ? (
  <div>
    {chartType !== 'radar' && (
      <div>
        <div>
          <label>
            Y-Axis
            <input
              type="checkbox"
              checked={showYAxis}
              onChange={() => setShowYAxis(!showYAxis)}
            />
          </label>

          {showYAxis && (
            <label>
              <input
                type="text"
                value={yAxisLabel}
                onChange={(e) => setyAxisLabel(e.target.value)}
              />
            </label>
          )}
        </div>
        <div>
          <label>
            X-Axis
            <input
              type="checkbox"
              checked={showXAxis}
              onChange={() => setShowXAxis(!showXAxis)}
            />
          </label>

          {showXAxis && (
            <label>
              <input
                type="text"
                value={xAxisLabel}
                onChange={(e) => setxAxisLabel(e.target.value)}
              />
            </label>
          )}
        </div>
      </div>
    )}
    <div>
      <label>
        Primary Label
        <input
          type="text"
          value={DataLabel}
          onChange={(e) => setDataLabel(e.target.value)}
        />
      </label>
    </div>

    <label>
      Primary Color
      <input
        type="color"
        value={backgroundColor[0]}
        onChange={(e) => {
          const newColor = e.target.value;
          setBackgroundColor(
            Array.from({ length: datasetSize }, () => newColor)
          );
        }}
      />
    </label>
  </div>
) : null}




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
          {chartType !== 'scatter' && chartType!== 'bubble'?(
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
          ) : ( 
          <div>
          <div  class="dataset">
          {datasetXValues.map((xValue, index) => (
  <label key={index}>
    X-Value {index + 1}
    <input
      type="number"
      step="any"
      value={xValue === '' ? '' : xValue}
      onChange={(e) => handleXValueChange(index, e.target.value)}
      className="small-input"
    />
  </label>
))}
</div>
<div class="dataset">
{datasetYValues.map((yValue, index) => (
  <label key={index}>
    Y-Value {index + 1}
    <input
      type="number"
      step="any"
      value={yValue === '' ? '' : yValue}
      onChange={(e) => handleYValueChange(index, e.target.value)}
      className="small-input"
    />
  </label>
))}
</div>
</div>
)}
          </div>
          {chartType === 'bubble' && (
  <div class="dataset">
    {datasetRadius.map((radius, index) => (
      <label key={index}>
        Radius {index + 1}
        <input
          type="number"
          step="any"
          value={radius === '' ? '' : radius}
          onChange={(e) => handleRadiusChange(index, e.target.value)}
          className="small-input"
        />
      </label>
    ))}
  </div>
)}

          <div class="dataset">
          { chartType !== 'scatter' && chartType !== 'bubble' ? (
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
):("")
}
          </div>
          <div>
           {chartType === 'pie' || chartType === 'polarArea' || chartType === 'doughnut'? (
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
        ) : ("")}
          </div>
          </div>
        </div>
        <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#chartCollapse" aria-expanded="false" aria-controls="datasetCollapse" style={{ width: '80vw',border: '2px solid #ffffff'}}>
Chart
  </button>
  <div class="collapse show" id="chartCollapse">
  <div class = "card card-body  d-flex mx-auto" style= {{backgroundColor: '#282c34', border: '2px solid #ffffff', maxWidth:'80vw'}}>
          <div className="button-container">
            <button type="button" className="btn btn-primary" onClick={fetchChart} style={{ width: '10vw',border: '2px solid #ffffff'}}>
              Create Chart
            </button>
          </div>

        <div class="carousel slide" id="chartCarousel" data-bs-ride="carousel" ref={carouselRef}>
<div class="carousel-inner">
  {chartData.map((chartUrl, index) => (
    <div key={index} class={`carousel-item ${index === 0 ? 'active' : ''}`}>
      <img src={chartUrl} class="d-block w-100" alt={`Chart ${index + 1}`} />
    </div>
  ))}
</div>

  <button class="carousel-control-prev" type="button" data-bs-target="#chartCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#chartCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

        </div>
        </div>
        </div>
      </header>
    </div>
  );
}

export default App;
