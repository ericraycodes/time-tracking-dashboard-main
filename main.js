// debug
console.log("DOM", Boolean(document.querySelector("body")));


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


// suffix hour-unit as either singular or plural in form
// const appropriateHourUnitText = (hourValue) => hourValue > 1 ? "hrs":"hr";
// RENDER DATA TO DOM
const renderData = (json) => {
    json.forEach(object => {
        console.log(object);

        // create tracker <section.tracker>
        const tracker = document.createElement("section");
        // tracker.id = object.title.toLowerCase() + "-tracker";
        // tracker.classList.add()

        // tracker heading
        const trackerHeading = document.createElement("h2");
        trackerHeading.textContent = object.title;
        tracker.appendChild(trackerHeading);

        for (const timeframe of  Object.entries(object.timeframes)) {
            console.log("timeframe:", timeframe);

            // timeframe nodes
            const div = document.createElement("div");
            div.className = timeframe[0];
            // current time
            const currentTime = document.createElement("time");
            currentTime.textContent = timeframe[1].current + "hr";
            div.appendChild(currentTime);
            // previous time
            const paragraph = document.createElement("p");
            let paragraphText;
            if (timeframe[0]==="daily") paragraphText = "Yesterday";
            else if (timeframe[0]==="weekly") paragraphText = "Last Week";
            else if (timeframe[0]==="monthly") paragraphText = "Last Month";
            const previousTime = document.createElement("time");
            previousTime.textContent = timeframe[1].previous + "hr";
            
            // append child nodes to parent nodes
            paragraph.append(paragraphText, " - " , previousTime);
            div.appendChild(paragraph);
            tracker.appendChild(div);
        }

        // console.log(tracker);
        // append tracker
        dashboard.appendChild(tracker);
    });
};
// SELECT FOR DASHBOARD CONTENT
const selectDashboardContent = (event) => {
    console.log(event, event.target);
};


// ##### i.   FETCH JSON DATA
// let DATA;
fetch("./data.json")
    .then(response => {
        // console.log("response:", response.ok , response);
        return response.json();
    })
    .then(json => {
        // store json data
        // DATA = json;
        // console.log("JSON:", DATA);

        // ##### ii.  RENDER DATA TO DOM
        renderData(json);
    })
    .catch(error => {
        console.error("ERROR:", error);
    });


// ##### iii.   CHANGE THE DISPLAY OF TIME TRACKERS ON USER EVENT
dashboardContentController.addEventListener("click", selectDashboardContent);