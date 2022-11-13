import fetch from "node-fetch";

export const GetPing = async (url) => {
  const startTime = new Date().getTime();
  try {
    let res = await fetch(url);
    const endTime = new Date().getTime();
    if (res.status === 200) {
      const realResTime = res.headers.get('x-response-time');
      if (realResTime !== null) {
        // Real response time from the response header
        return realResTime;
      } else {
        // Estimated response time
        return (endTime - startTime)/2 - 30 + "ms";
      }
    } else {
      return 0;
    }
  } catch (error) {
    console.log(error);
  }
  return 0;
}