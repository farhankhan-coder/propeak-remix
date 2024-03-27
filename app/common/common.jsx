// app/services/common-service.js

// Function to generate MongoDB ObjectId
export function mongoObjectId() {
  var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
}

// Function to get client IP address from request
export function getClientIp(req) {
  let ip;
  if (req.headers["x-forwarded-for"]) {
    return (ip = req.headers["x-forwarded-for"].split(",")[0]);
  } else if (req.connection && req.connection.remoteAddress) {
    return (ip = req.connection.remoteAddress);
  } else {
    return (ip = req.ip);
  }
}

// Function to sort an array of objects by a specific property
export function sort(res, name) {
  res.sort((a, b) => {
    return a[name].toLowerCase().localeCompare(b[name].toLowerCase());
  });
}

// Function to get days in a year or month
export function getDays(day, year, value) {
  var d = new Date(),
    month = year,
    all = [];

  var num;
  switch (day) {
    case "Sunday":
      num = 0;
      break;
    case "Monday":
      num = 1;
      break;
    case "Tuesday":
      num = 2;
      break;
    case "Wednesday":
      num = 3;
      break;
    case "Thursday":
      num = 4;
      break;
    case "Friday":
      num = 5;
      break;
    case "Saturday":
      num = 6;
  }

  // Get all the other days in the year
  if (value === "year") {
    d.setFullYear(year, 0, 1);
    // Get the first day in the year
    while (d.getDay() !== num) {
      d.setDate(d.getDate() + 1);
    }
    while (d.getFullYear().toString() === year) {
      all.push(new Date(d.getTime()));
      d.setDate(d.getDate() + 7);
    }
  } else {
    d.setDate(1);
    // Get the first Monday in the month
    while (d.getDay() !== num) {
      d.setDate(d.getDate() + 1);
    }

    // Get all the other Mondays in the month
    while (d.getMonth() === month) {
      all.push(new Date(d.getTime()));
      d.setDate(d.getDate() + 7);
    }
  }

  return all;
}

// Function to get the number of days in a year
export function daysInYear(year) {
  if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    // Leap year
    return 366;
  } else {
    // Not a leap year
    return 365;
  }
}

// Function to get the number of days in a month
export function daysInMonth(month, year) {
  var now = new Date();
  return new Date(year, month, 0).getDate();
}

// Function to get the number of Sundays between two dates
export function getSundayInaMonth(dString1, dString2) {
  var d1 = new Date(Date.parse(dString1));
  var d2 = new Date(Date.parse(dString2));
  var aDay = 24 * 60 * 60 * 1000;
  let Sun = 0;
  for (var d, i = d1.getTime(), n = d2.getTime(); i <= n; i += aDay) {
    d = new Date(i).getDay();
    if (d === 0) Sun++;
  }
  return Sun;
}

// Function to get the number of Sundays in a month
export function sundaysInMonth(m, y) {
  var days = new Date(y, m, 0).getDate();
  var sundays = [8 - new Date(m + "/01/" + y).getDay()];
  for (var i = sundays[0] + 7; i < days; i += 7) {
    sundays.push(i);
  }
  return sundays;
}
