import fetch from "node-fetch";
import { insertData } from "./database.js";

export const GetPing = async (url) => {
  const startTime = new Date().getTime();
  try {
    let res = await fetch(url);
    const endTime = new Date().getTime();
    if (res.status === 200) {
      const realResTime = res.headers.get('x-response-time');
      if (realResTime !== null) {
        // Real response time from the response header
        return realResTime.replace("ms", "");
      } else {
        // Estimated response time
        return (endTime - startTime)/2 - 30;
      }
    } else {
      return 0;
    }
  } catch (error) {
    console.log(error);
  }
  return 0;
}

export const insertPings = async (urls) => {
  const pingDate = toSqlDatetime(new Date());
  const pingRequests = urls.map(async (url) => {
    let pingTime = await GetPing(url);
    console.log(`Response time to ${url} at ${pingDate} - ${pingTime}ms`);
    return {
      url: url,
      date: pingDate,
      pingTime: pingTime
    };
  })

  let results = await Promise.all(pingRequests);
  insertData(results);
  
  return "Inserted pings to database.";
}

// Returns current date and time in sql format
const toSqlDatetime = (inputDate) => {
  const date = new Date(inputDate);
  const dateWithOffest = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  return dateWithOffest.toISOString().slice(0, 19).replace('T', ' ');
}