import { useEffect, useState } from 'react';
import { startFetchInterval, startPingInterval, stopPingInterval } from '../shared/serverFuncs';
import Chart from './Chart';
import './MainWindow.scss';

const urls = [
  "https://google.com",
  "https://facebook.com",
  "https://twitter.com", 
  "https://cnet.com",
  "https://amazon.com", 
];
const colors = ["#2196F3", "#FF0000", "#FFF0F0", "#00FF00", "#FFA500"];

function MainWindow() {
  // Needs to be initiated with the same number of arrays you are searching for
  const [chartsData, setChartsData] = useState([[],[],[],[],[]]);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("chartsData") + "");
    if (storageData) {
      setChartsData(storageData);
    }
    // Fetching data from server every 3 seconds
    startFetchInterval(chartsData, setChartsData, urls);
  }, []);
  
  return (
    <div className="MainWindow">
      <h1 className='Title'>Ping Graphs</h1>
      <div className='ButtonsHolder'>
        <button className='StartPingIntvBtn' 
          onClick={() => {startPingInterval()}}>
            Start Ping Interval
        </button>
        <button className='StopPingIntvBtn' 
          onClick={() => {stopPingInterval()}}>
            Stop Ping Interval
        </button>
      </div>
      <div className='Charts'>
        {
          chartsData.map((chartD, index) => {
            return <Chart 
              key={index}
              data={chartD} 
              dataKeys={["pingTime"]} 
              colors={[colors[index]]}
              title={urls[index].substring(8)}/>
          })
        }
      </div>
    </div>
  );
}

export default MainWindow;
