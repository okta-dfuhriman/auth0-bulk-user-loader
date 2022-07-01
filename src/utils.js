async function pause(ms) {
  if (process.env.DEBUG) console.log(`Pausing execution for ${ms}ms`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

function currentTime() {
  const now = new Date();
  return `${now.getHours()}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${now
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
}

module.exports = {
  pause,
  currentTime
};
