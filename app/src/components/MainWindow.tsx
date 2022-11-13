import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from './Chart';
import './MainWindow.scss';

const urls = [
  "https://google.com",
  "https://twitter.com", 
  "https://amazon.com", 
  "https://facebook.com",
  "https://cnet.com",
];
const colors = ["#2196F3", "#FF0000", "#FFF0F0", "#00FF00", "#FFA500"];

// Join object arrays without Duplicates.
const joinWithoutDupes = (A: any[], B: any[]) => {
  const a = new Set(A.map(x => x.item))
  const b = new Set(B.map(x => x.item))
  return [...A.filter(x => !b.has(x.item)), ...B.filter(x => !a.has(x.item))];
}

function MainWindow() {
  // Needs to be initiated with the same number of arrays you are searching for
  const [chartsData, setChartsData] = useState([[],[],[],[],[]]);

  useEffect(() => {
    const fetchedChartsData = urls.map(async (url) => {
      let chartData = (await axios.get(`pingsDB/?url=${url}`)).data;
      return chartData;
    })

    Promise.all(fetchedChartsData).then((resData) => {
      let newChartsData: any[] = [];
      resData.forEach((pingsData, index) => {
        let mergedUniqData = joinWithoutDupes(chartsData[index], pingsData);
        if (mergedUniqData.length > 1) {
          newChartsData.push(mergedUniqData);
        } else {
          newChartsData.push(chartsData[index]);
        }
      });
      setChartsData(newChartsData);
    });

    
  }, []);
  
  return (
    <div className="MainWindow">
      <h1 className='title'>Ping Graphs</h1>
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
