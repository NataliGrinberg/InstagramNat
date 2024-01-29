
export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    formatTimeAgo
}

function makeId(length = 5) {
   // var text = "";
    var text = "e";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}



const formatter = new Intl.RelativeTimeFormat("en-us", {
    numeric: "auto",
  })

  const DIVISIONS = [
    { amount: 60, name: "seconds" },
    { amount: 60, name: "minutes" },
    { amount: 24, name: "hours" },
    { amount: 7, name: "days" },
    { amount: 4.34524, name: "weeks" },
    { amount: 12, name: "months" },
    { amount: Number.POSITIVE_INFINITY, name: "years" },
  ]

  function formatTimeAgo(date) {


// const timestamps = generateTimestamps();
// console.log(timestamps);

    let duration = (date - Date.now()) / 1000
  
    for (let i = 0; i < DIVISIONS.length; i++) {
      const division = DIVISIONS[i]
      if (Math.abs(duration) < division.amount) {
        return formatter.format(Math.round(duration), division.name)
      }
      duration /= division.amount
    }

//     const secs = date;
// const output = new Date(secs * 1000);

// console.log(output);
  }

  function generateTimestamps() {
    const startDate = new Date('2023-06-01');
    const endDate = new Date('2024-01-29');
    const timestamps = [];
  
    for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
      timestamps.push(currentDate.getTime());
    }
  
    return timestamps;
  }
  


