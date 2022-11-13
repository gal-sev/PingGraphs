import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './Chart.scss';

export interface ChartI {
  url: string,
  date: string,
  pingTime: number
}

function Chart(props: {data: any[], dataKeys: string[], colors: string[], title: string}) {
  return (
    <div className="Chart">
      <h1>{props.title}</h1>
      <LineChart width={600} height={400} data={props.data}>
        {props.dataKeys.map((keyName, index) => {
          return <Line 
            key={index+keyName}
            type={'monotone'} 
            dataKey={keyName} 
            stroke={props.colors[index]} 
            strokeWidth={3}/>
        })}
        <CartesianGrid stroke={"#ccc"}/>
        <XAxis dataKey={"date"}/>
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  );
}

export default Chart;
