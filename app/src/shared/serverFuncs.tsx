import axios from "axios";

export async function StartPingLoop() {
  try {
    await axios.get('startPingLoop');
  } catch (error) {
    console.log(error);
  }
}

export async function StopPingLoop() {
  try {
    await axios.get(`stopPingLoop`);
  } catch (error) {
    console.log(error);
  }
}