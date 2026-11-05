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
        tracker.classList.add(titleKebabCase);
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
            const previousTime = document.createElement("p");
            div.appendChild(previousTime);
            let paragraphText;
            if (timeframe==="daily") paragraphText = "Yesterday";
            else if (timeframe==="weekly") paragraphText = "Last Week";
            else if (timeframe==="monthly") paragraphText = "Last Month";
            const previousTimeText = document.createElement("span");
            previousTimeText.textContent = paragraphText + " - ";
            const previousTimeValue = document.createElement("time");
            previousTimeValue.textContent = appropriateHourValueUnit(time.previous);
            previousTime.append(previousTimeText, previousTimeValue); 
            previousTime.className = "previous-time";
        }

        // tracker setting node <button.tracker-settings>
        const trackerSettingButton = document.createElement("button");
        tracker.appendChild(trackerSettingButton);
        trackerSettingButton.className = "tracker-settings";
        trackerSettingButton.setAttribute("type", "button");
        trackerSettingButton.setAttribute("aria-label", "Time tracker settings");
        fetch("./images/icon-ellipsis.svg")
            .then(response => response.text())
            .then(data => {
                // parse xml document, adopted/appended to a DOM node
                const domParser = new DOMParser();
                const xmlDoc = domParser.parseFromString(data, "text/xml");
                const iconEllipsisSVG = xmlDoc.querySelector("svg");
                iconEllipsisSVG.setAttribute("class", "ellipsis-icon");
                // append svg to dom
                trackerSettingButton.appendChild(iconEllipsisSVG);
                // dynamic viewbox
                const box = iconEllipsisSVG.getBBox();
                iconEllipsisSVG.setAttribute("viewBox", `${box.x} ${box.y} ${box.width} ${box.height}`);
            })
            .catch(error => console.error("ERROR:", error));
    });
};
// SELECT FOR DASHBOARD CONTENT
const displaySelectedDashboardContent = (event) => {
    /**
     * Data is shown correspondent to:
     *  1. when a <button> is clicked, it solely owns the 'clicked' state
     *  2. show <.timeframe> data that corresponds to 'clicked' <button>
     *  3. hide data that is not corresponded to the 'clicked' <button>
     *  4. when another <button> is clicked, cycle back to step 1
     */

    // check which button is clicked
    if (event.target.classList.contains("button")) {
        // console.log(event.target);

        // 1. <button> owner of the 'clicked' state
        // 2. show corresponding <.timeframe>
        switch (event.target.id) {
            case "show-daily-time-button":
                // clicked state of button
                showDailyTimeButton.classList.add("clicked");
                showWeeklyTimeButton.classList.remove("clicked");
                showMonthlyTimeButton.classList.remove("clicked");
                // display state of dashboard
                dashboard.classList.add("daily");
                dashboard.classList.remove("weekly");
                dashboard.classList.remove("monthly");
                break;
            case "show-weekly-time-button":
                // clicked state of button
                showDailyTimeButton.classList.remove("clicked");
                showWeeklyTimeButton.classList.add("clicked");
                showMonthlyTimeButton.classList.remove("clicked");
                // display state of dashboard
                dashboard.classList.remove("daily");
                dashboard.classList.add("weekly");
                dashboard.classList.remove("monthly");
                break;
            case "show-monthly-time-button":
                // clicked state of button
                showDailyTimeButton.classList.remove("clicked");
                showWeeklyTimeButton.classList.remove("clicked");
                showMonthlyTimeButton.classList.add("clicked");
                // display state of dashboard
                dashboard.classList.remove("daily");
                dashboard.classList.remove("weekly");
                dashboard.classList.add("monthly");
                break;
            default: break;
        }
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