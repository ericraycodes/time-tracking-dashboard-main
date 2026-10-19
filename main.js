// debug
console.log("DOM", Boolean(document.querySelector("body")));


/**
 * DASHBOARD LOGIC
 * 
 * Fetch data from JSON file.
 * Render data to the DOM.
 * Change data displays according to context (daily, weekly, monthly)
 *  through manipulating CSS-styled classnames on user interaction.
 */


// Reference
const dashboard = document.getElementById("dashboard");


// suffix hour-unit as either singular or plural in form
const appropriateHourUnitText = (hourValue) => hourValue > 1 ? "hrs":"hr";
// render data to DOM
const renderData = (json) => {
    json.forEach(object => {
        // console.log(object);

        // create tracker <section.tracker>
        const tracker = document.createElement("section");
        tracker.id = object.title.toLowerCase() + "-tracker";
        // tracker.classList.add()

        // tracker heading
        const trackerHeading = document.createElement("h2");
        trackerHeading.textContent = object.title;
        tracker.appendChild(trackerHeading);

        for (const timeframe of  Object.entries(object.timeframes)) {
            // console.log("timeframe:", timeframe);

            // timeframe nodes
            const div = document.createElement("div");
            // current time
            const currentTime = document.createElement("time");
            currentTime.textContent = timeframe[1].current + appropriateHourUnitText(timeframe[1].current);
            div.appendChild(currentTime);
            // previous time
            const paragraph = document.createElement("p");
            // const span = document.createElement("span");
            let text;
            if (timeframe[0]==="daily") text = "Yesterday - ";
            else if (timeframe[0]==="weekly") text = "Last Week - ";
            else if (timeframe[0]==="monthly") text = "Last Month - ";
            // span.textContent = text;
            const previousTime = document.createElement("time");
            previousTime.textContent = timeframe[1].previous + appropriateHourUnitText(timeframe[1].previous);
            
            paragraph.append(text, previousTime);
            div.appendChild(paragraph);
            tracker.appendChild(div);
        }

        // console.log(tracker);
        // append tracker
        dashboard.appendChild(tracker);
    });
};


// FETCH JSON DATA
let DATA;
fetch("./data.json")
    .then(response => {
        // console.log("response:", response.ok , response);
        return response.json();
    })
    .then(json => {
        // store json data
        DATA = json;
        // console.log("JSON:", DATA);

        // RENDER DATA TO DOM
        renderData(json);
    })
    .catch(error => {
        console.error("ERROR:", error);
    });
