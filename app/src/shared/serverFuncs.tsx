import axios from "axios";

let currentFetchInterval: any = undefined;

export function startFetchInterval(chartsData: any[][], setChartsData: any, urls: string[]) {
  if (currentFetchInterval === undefined) {
    currentFetchInterval = setInterval(() => fetchNewData(chartsData, setChartsData, urls), 3000);
    console.log("Started fetch loop");
  } else {
    console.log("Fetch loop already running");
  }
}

export function startPingInterval() {
  axios.get("/startPingLoop").then((res) => {
    alert(res.data);
  }).catch((err) => console.log(err));
}

export function stopPingInterval() {
  axios.get("/stopPingLoop").then((res) => {
    alert(res.data);
  }).catch((err) => console.log(err));
}

export function fetchNewData(chartsData: any[][], setChartsData: any, urls: string[]) {
  const fetchedChartsData = urls.map(async (url) => {
    try {
      let fetchedChartData = (await axios.get(`pingsDB/?url=${url}`)).data;
      return fetchedChartData;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  })
  if (fetchedChartsData !== undefined) {
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
      localStorage.setItem("chartsData", JSON.stringify(newChartsData));
    });
  }
}

// Join object arrays without Duplicates.
function joinWithoutDupes(A: any[], B: any[]) {
  const a = new Set(A.map(x => x.item))
  const b = new Set(B.map(x => x.item))
  return [...A.filter(x => !b.has(x.item)), ...B.filter(x => !a.has(x.item))];
}