import Chart, { ChartI } from './Chart';
import './MainWindow.scss';

const gData: ChartI[] = [
  {url: "https://google.com", date: "2022-11-13 15:11:34", pingTime: 50},
  {url: "https://google.com", date: "2022-11-13 15:15:34", pingTime: 100},
  {url: "https://google.com", date: "2022-11-13 15:16:34", pingTime: 15},
  {url: "https://google.com", date: "2022-11-13 15:17:34", pingTime: 23},
  {url: "https://google.com", date: "2022-11-13 15:20:34", pingTime: 35},
  {url: "https://google.com", date: "2022-11-13 15:26:34", pingTime: 50},
  {url: "https://google.com", date: "2022-11-13 15:27:34", pingTime: 70},
  {url: "https://google.com", date: "2022-11-13 15:28:34", pingTime: 105},
  {url: "https://google.com", date: "2022-11-13 15:29:34", pingTime: 220}
]

const tData: ChartI[] = [
  {url: "https://twitter.com", date: "2022-11-13 15:11:34", pingTime: 80},
  {url: "https://twitter.com", date: "2022-11-13 15:15:34", pingTime: 20},
  {url: "https://twitter.com", date: "2022-11-13 15:16:34", pingTime: 70},
  {url: "https://twitter.com", date: "2022-11-13 15:17:34", pingTime: 105},
  {url: "https://twitter.com", date: "2022-11-13 15:20:34", pingTime: 130},
  {url: "https://twitter.com", date: "2022-11-13 15:26:34", pingTime: 150},
  {url: "https://twitter.com", date: "2022-11-13 15:27:34", pingTime: 70},
  {url: "https://twitter.com", date: "2022-11-13 15:28:34", pingTime: 80},
  {url: "https://twitter.com", date: "2022-11-13 15:29:34", pingTime: 60}
];

const mergedData = [
  {date: "2022-11-13 15:11:34", pingTimeT: 80, pingTimeG: 50},
  {date: "2022-11-13 15:15:34", pingTimeT: 20, pingTimeG: 100},
  {date: "2022-11-13 15:16:34", pingTimeT: 70, pingTimeG: 15},
  {date: "2022-11-13 15:17:34", pingTimeT: 105, pingTimeG: 23},
  {date: "2022-11-13 15:20:34", pingTimeT: 130, pingTimeG: 35},
  {date: "2022-11-13 15:26:34", pingTimeT: 150, pingTimeG: 50},
  {date: "2022-11-13 15:27:34", pingTimeT: 70, pingTimeG: 70},
  {date: "2022-11-13 15:28:34", pingTimeT: 80, pingTimeG: 105},
  {date: "2022-11-13 15:29:34", pingTimeT: 60, pingTimeG: 220}
];

function MainWindow() {
  return (
    <div className="MainWindow">
      <h1 className='title'>Ping Graphs</h1>
      <Chart data={mergedData} dataKeys={["pingTimeT", "pingTimeG"]} colors={["#2196F3","#FF0000"]}></Chart>
    </div>
  );
}

export default MainWindow;
