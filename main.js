/**
 * DASHBOARD LOGIC
 * 
 * i.   Fetch data from JSON file.
 * ii.  Render data to the DOM.
 * iii. Change data displays according to context (daily, weekly, monthly)
 *      through manipulating CSS-styled classnames on user interaction.
 */


// Reference
const dashboard = document.getElementById("dashboard");
const dashboardContentController = document.getElementById("dashboard-display-controller");
const showDailyTimeButton = document.getElementById("show-daily-time-button");
const showWeeklyTimeButton = document.getElementById("show-weekly-time-button");
const showMonthlyTimeButton = document.getElementById("show-monthly-time-button");


// HOUR UNIT SUFFIXED IN SINGULAR/PLURAL FORM
const appropriateHourValueUnit = (hourValue) => hourValue + (hourValue > 1 ? "hrs":"hr");
// RENDER DATA TO DOM
const renderData = (json) => {
    json.forEach(object => {
        // tracker <section> node
        const tracker = document.createElement("section");
        tracker.className= "tracker";
        dashboard.appendChild(tracker);
        // inline style properties - CSS custom properties
        const titleKebabCase = object.title.toLowerCase().split(" ").join("-");
        tracker.style.setProperty("--before-svg", `url("../images/icon-${titleKebabCase}.svg")`);
        tracker.style.setProperty("--before-background-color", `var(--color-${titleKebabCase})`);

        // tracker heading node
        const trackerHeading = document.createElement("h2");
        trackerHeading.textContent = object.title;
        tracker.appendChild(trackerHeading);
        trackerHeading.className = "activity";

        console.log("\n", object.title)
        for (const [timeframe, time] of  Object.entries(object.timeframes)) {
            console.log(timeframe, time);

            // timeframe node
            const div = document.createElement("div");
            tracker.appendChild(div);
            div.className = timeframe;
            div.classList.add("timeframe");
            
            // current time node
            const currentTime = document.createElement("time");
            currentTime.textContent = appropriateHourValueUnit(time.current);
            div.appendChild(currentTime);
            currentTime.className = "current-time";
            
            // previous time node
            const paragraph = document.createElement("p");
            div.appendChild(paragraph);
            let paragraphText;
            if (timeframe==="daily") paragraphText = "Yesterday";
            else if (timeframe==="weekly") paragraphText = "Last Week";
            else if (timeframe==="monthly") paragraphText = "Last Month";
            const previousTime = document.createElement("time");
            previousTime.textContent = appropriateHourValueUnit(time.previous);
            paragraph.append(paragraphText, " - ", previousTime); 
            paragraph.className = "previous-time";
        }
    });
};
// SELECT FOR DASHBOARD CONTENT
const displaySelectedDashboardContent = (event) => {
    // manipulate <main #dashboard>'s classlist for which content to display
    switch (event.target.id) {
        case "show-daily-time-button":
            // display state of dashboard
            dashboard.classList.add("daily");
            dashboard.classList.remove("weekly");
            dashboard.classList.remove("monthly");
            // clicked state of button
            showDailyTimeButton.classList.add("clicked");
            showWeeklyTimeButton.classList.remove("clicked");
            showMonthlyTimeButton.classList.remove("clicked");
            break;
        case "show-weekly-time-button":
            // display state of dashboard
            dashboard.classList.remove("daily");
            dashboard.classList.add("weekly");
            dashboard.classList.remove("monthly");
            // clicked state of button
            showDailyTimeButton.classList.remove("clicked");
            showWeeklyTimeButton.classList.add("clicked");
            showMonthlyTimeButton.classList.remove("clicked");            break;
        case "show-monthly-time-button":
            // display state of dashboard
            dashboard.classList.remove("daily");
            dashboard.classList.remove("weekly");
            dashboard.classList.add("monthly");
            // clicked state of button
            showDailyTimeButton.classList.remove("clicked");
            showWeeklyTimeButton.classList.remove("clicked");
            showMonthlyTimeButton.classList.add("clicked");
            break;
        default: break;
    }
};


// ##### i.   FETCH JSON DATA
fetch("./data.json")
    .then(response => {
        return response.json();
    })
    .then(json => {
        // ##### ii.  RENDER DATA TO DOM
        renderData(json);
    })
    .catch(error => {
        console.error("ERROR:", error);
    });


// ##### iii.   CHANGE THE DISPLAY OF TIME TRACKERS ON USER EVENT
dashboardContentController.addEventListener("click", displaySelectedDashboardContent);