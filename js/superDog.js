let superDogArray = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019"
    }
];

loadEventDetails();

var filteredEvents = superDogArray;

function buildDropDown() {
    let eventDropDown = document.getElementById("eventDropDown");
    let curEvents = JSON.parse(sessionStorage.getItem("superDogArray")) || superDogArray;
    //...new Set() is a built-in JS syntax
    let distinctEvents = [...new Set(curEvents.map((event) => event.city))];

    let linkedHTMLEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All" >All</a>';
    let resultsHTML = "";

    for (let i = 0; i < distinctEvents.length; i++) {

        resultsHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;
    };

    resultsHTML += linkedHTMLEnd;
    eventDropDown.innerHTML = resultsHTML;
    displayStats();
};

//get the events for the selected city
function getEvents(element) {
    let city = element.getAttribute("data-string");
    let curEvents = JSON.parse(sessionStorage.getItem("superDogArray")) || superDogArray;
    filteredEvents = curEvents;
    document.getElementById("statsHeader").innerHTML = `Stats for ${city} Events`;
    if (city != "All") {
        filteredEvents = curEvents.filter(function (item) {
            if (item.city == city) {
                return item;
            };
        });
    };
    displayStats();
};

function displayStats() {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    for (let i = 0; i < filteredEvents.length; i++) {
        currentAttendance = filteredEvents[i].attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;
        };

        if (least > currentAttendance || least < 0) {
            least = currentAttendance;
        };
    };

    average = total / filteredEvents.length;

    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }
    );

};

//load the event details on the page
function loadEventDetails() {
    let eventDetails = [];
    //set getData function call equal to eventDetails varaible
    eventDetails = getData();
    //call displayData with eventDetails to show data on the page
    displayData(eventDetails);
};

//load up the data needed for display
function getData() {
    //get the events array from sessionStorage and parse it
    let eventDetails = JSON.parse(sessionStorage.getItem("superDogArray")) || [];

    //if the array is empty, populate with hardcoded event details
    if (eventDetails.length === 0) {
        eventDetails = superDogArray;
        sessionStorage.setItem("superDogArray", JSON.stringify(eventDetails));
    };

    return eventDetails;
};

//take the data from the new event modal and create a new object, then push into events array
function saveEvent() {
    //get the events out of local storage and parse them
    let eventDetails = JSON.parse(sessionStorage.getItem("superDogArray")) || superDogArray;

    //create a new object with the new data entered by the user
    let obj = {};
    obj["event"] = document.getElementById("newName").value;
    obj["city"] = document.getElementById("newCity").value;
    obj["state"] = document.getElementById("newState").value;
    obj["attendance"] = parseInt(document.getElementById("newAttendance").value);

    let eventDate = document.getElementById("newDate").value;
    let eventDate2 = `${eventDate} 00:00`

    obj["date"] = new Date(eventDate2).toLocaleDateString();

    //push the new object into the eventDetails array
    eventDetails.push(obj);

    //load the changes into the sessionStorage
    sessionStorage.setItem("superDogArray", JSON.stringify(eventDetails));

    buildDropDown();
    displayData(eventDetails);
};

//load the array into the resultsBody table
function displayData(eventDetails) {
    //get HTML template
    const template = document.getElementById("data-template");
    //get body of results table
    const resultsBody = document.getElementById("resultsBody");
    //clear the table
    resultsBody.innerHTML = "";
    //loop through the events array
    //grab the events from local storage
    let curEvents = JSON.parse(sessionStorage.getItem("superDogArray")) || [];

    if (curEvents.length == 0) {
        curEvents = superDogArray;
        sessionStorage.setItem("superDogArray", JSON.stringify(curEvents));
    };


    for (let i = 0; i < eventDetails.length; i++) {
        //get data row of the table
        const dataRow = document.importNode(template.content, true);

        //assign object data to each line of the template
        dataRow.getElementById("name").textContent = eventDetails[i].event;
        dataRow.getElementById("city").textContent = eventDetails[i].city;
        dataRow.getElementById("state").textContent = eventDetails[i].state;
        dataRow.getElementById("attendance").textContent = formatNumber(eventDetails[i].attendance);
        dataRow.getElementById("date").textContent = eventDetails[i].date;

        //write the data to resultsBody
        resultsBody.appendChild(dataRow);

    };
};

//delete an entry
function deleteEntry() {
    let eventDetails = JSON.parse(sessionStorage.getItem("superDogArray")) || superDogArray;

    //access the rowIndex of the line that the delete button clicked is on
    let cell = this.event.path[2].rowIndex;

    //loop through the events array and find an event with index that matches rowIndex-1
    for (let i = 0; i < eventDetails.length; i++) {
        if (i === cell - 1) {
            eventDetails.splice(i, 1);
        };
    };

    //update the superDogArray in sessionStorage
    sessionStorage.setItem("superDogArray", JSON.stringify(eventDetails));

    //display the updated event data
    buildDropDown()
    displayData(eventDetails);
};

document.getElementById("submitBtn").addEventListener("click", saveEvent);

//Make bootstrap nav card nav-items active on app page
$('#app-list a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
});

//format numbers 
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}