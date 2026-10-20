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


// HOUR UNIT SUFFIXED IN SINGULAR/PLURAL FORM
const appropriateHourValueUnit = (hourValue) => hourValue + (hourValue > 1 ? "hrs":"hr");
// RENDER DATA TO DOM
const renderData = (json) => {
    json.forEach(object => {
        // create tracker <section>
        const tracker = document.createElement("section");

        // tracker heading
        const trackerHeading = document.createElement("h2");
        trackerHeading.textContent = object.title;
        tracker.appendChild(trackerHeading);

        console.log("\n", object.title)
        for (const [timeframe, time] of  Object.entries(object.timeframes)) {
            console.log(timeframe, time);

            // timeframe nodes
            const div = document.createElement("div");
            div.className = timeframe;
            // current time
            const currentTime = document.createElement("time");
            currentTime.textContent = appropriateHourValueUnit(time.current);
            div.appendChild(currentTime);
            // previous time
            const paragraph = document.createElement("p");
            let paragraphText;
            if (timeframe==="daily") paragraphText = "Yesterday";
            else if (timeframe==="weekly") paragraphText = "Last Week";
            else if (timeframe==="monthly") paragraphText = "Last Month";
            const previousTime = document.createElement("time");
            previousTime.textContent = appropriateHourValueUnit(time.previous);
            
            // append child nodes to parent nodes
            paragraph.append(paragraphText, " - ", previousTime);
            div.appendChild(paragraph);
            tracker.appendChild(div);
        }

        // append tracker
        dashboard.appendChild(tracker);
    });
};
// SELECT FOR DASHBOARD CONTENT
const displaySelectedDashboardContent = (event) => {
    // manipulate <main #dashboard>'s classlist for which content to display
    switch (event.target.id) {
        case "show-daily-time-button":
            dashboard.classList.add("daily");
            dashboard.classList.remove("weekly");
            dashboard.classList.remove("monthly");
            break;
        case "show-weekly-time-button":
            dashboard.classList.remove("daily");
            dashboard.classList.add("weekly");
            dashboard.classList.remove("monthly");
            break;
        case "show-monthly-time-button":
            dashboard.classList.remove("daily");
            dashboard.classList.remove("weekly");
            dashboard.classList.add("monthly");
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