const { Chart, registerables } = require("chart.js");
const { createCanvas } = require("canvas");
const fs = require("fs");
const path = require("path");

// Register necessary components for Chart.js
Chart.register(...registerables);

fs.readFile(
  "C:\\Users\\Admin\\Desktop\\Summerprogram\\GitAction\\StatOrganization\\completeTask\\data.json",
  "utf8",
  (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    try {
      data = JSON.parse(jsonString);
      createRecentActivityChart(data);
      createLanguagesChart(data);
      createActiveDayChart(data);
      createActiveHourChart(data);
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  }
);

function createLanguagesChart(data) {
  // Create a canvas
  const canvas = createCanvas(800, 600);
  const ctx = canvas.getContext("2d");

  let languageData = data.repositoryStats.languages.filter(
    (language) => language.percentage > 1
  );
  // Chart configuration
  const config = {
    type: "doughnut",
    data: {
      labels: languageData.map((language) => language.language),
      datasets: [
        {
          data: languageData.map((language) => language.percentage),
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(201, 203, 207, 1)",
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(201, 203, 207, 1)",
          ],
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: "white", // Labels color for dark theme
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)", // Tooltip background color for dark theme
          titleColor: "white", // Tooltip title color for dark theme
          bodyColor: "white", // Tooltip body color for dark theme
        },
      },
    },
  };

  // Create chart instance
  const chart = new Chart(ctx, config);

  // Save the chart as an image
  const out = fs.createWriteStream(
    path.join(__dirname, "img", "languages.png")
  );
  const stream = canvas.createPNGStream();
  stream.pipe(out);
}

function createRecentActivityChart(data) {
  // Create a canvas
  const canvas = createCanvas(800, 600);
  const ctx = canvas.getContext("2d");

  var labels = Array.from(
    { length: data.recentActivity.pushEvents.length },
    (v, i) => i + 1
  );
  // Chart configuration
  const config = {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Push Events",
          data: data.recentActivity.pushEvents,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 1)",
          fill: false,
          borderRadius: 3,
        },
        {
          label: "Issue Events",
          data: data.recentActivity.issueEvents,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 1)",
          fill: false,
          borderRadius: 3,
        },
        {
          label: "Pull Request Events",
          data: data.recentActivity.pullRequestEvents,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 1)",
          fill: false,
          borderRadius: 3,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: "white", // Labels color for dark theme
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)", // Tooltip background color for dark theme
          titleColor: "white", // Tooltip title color for dark theme
          bodyColor: "white", // Tooltip body color for dark theme
        },
      },
      interaction: {
        intersect: false,
      },
      scales: {
        y: {
          ticks: {
            color: "white", // Y-axis tick color for dark theme
          },
        },
        x: {
          ticks: {
            color: "white", // X-axis tick color for dark theme
          },
        },
      },
    },
  };

  // Create chart instance
  const chart = new Chart(ctx, config);

  // Save the chart as an image
  const out = fs.createWriteStream(
    path.join(__dirname, "img", "recentActivities.png")
  );
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on("finish", () => console.log("The PNG file was created."));
}

function createActiveDayChart(data) {
  // Create a canvas
  const canvas = createCanvas(800, 600);
  const ctx = canvas.getContext("2d");

  var color = data.recentActivity.activeDay.map((value) => {
    let max = Math.max(...data.recentActivity.activeDay);
    var opacity = value / max;
    return (color = `rgba(54, 162, 235, ${opacity})`);
  });
  // Chart configuration
  const config = {
    type: "bar",
    data: {
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      datasets: [
        {
          label: "Active Days",
          data: data.recentActivity.activeDay,

          backgroundColor: color,
          fill: false,
          borderRadius: 3,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: "white", // Labels color for dark theme
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)", // Tooltip background color for dark theme
          titleColor: "white", // Tooltip title color for dark theme
          bodyColor: "white", // Tooltip body color for dark theme
        },
      },
      interaction: {
        intersect: false,
      },
      scales: {
        y: {
          ticks: {
            color: "white", // Y-axis tick color for dark theme
          },
        },
        x: {
          ticks: {
            color: "white", // X-axis tick color for dark theme
          },
        },
      },
    },
  };

  // Create chart instance
  const chart = new Chart(ctx, config);

  // Save the chart as an image
  const out = fs.createWriteStream(
    path.join(__dirname, "img", "activeDays.png")
  );
  const stream = canvas.createPNGStream();
  stream.pipe(out);
}

function createActiveHourChart(data) {
  // Create a canvas
  const canvas = createCanvas(800, 600);
  const ctx = canvas.getContext("2d");

  var color = data.recentActivity.activeHour.map((value) => {
    let max = Math.max(...data.recentActivity.activeHour);
    var opacity = value / max;
    return (color = `rgba(54, 162, 235, ${opacity})`);
  });
  // Chart configuration
  const config = {
    type: "bar",
    data: {
      labels: Array.from({ length: 24 }, (v, i) => i),
      datasets: [
        {
          label: "Active Hours",
          data: data.recentActivity.activeHour,

          backgroundColor: color,
          fill: false,
          borderRadius: 3,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: "white", // Labels color for dark theme
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)", // Tooltip background color for dark theme
          titleColor: "white", // Tooltip title color for dark theme
          bodyColor: "white", // Tooltip body color for dark theme
        },
      },
      interaction: {
        intersect: false,
      },
      scales: {
        y: {
          ticks: {
            color: "white", // Y-axis tick color for dark theme
          },
        },
        x: {
          ticks: {
            color: "white", // X-axis tick color for dark theme
          },
        },
      },
    },
  };

  // Create chart instance
  const chart = new Chart(ctx, config);

  // Save the chart as an image
  const out = fs.createWriteStream(
    path.join(__dirname, "img", "activeHours.png")
  );
  const stream = canvas.createPNGStream();
  stream.pipe(out);
}
