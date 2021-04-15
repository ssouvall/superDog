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
    //get the events array from localStorage and parse it
    let eventDetails = JSON.parse(localStorage.getItem("superDogArray")) || [];

    //if the array is empty, populate with hardcoded event details
    if (eventDetails.length === 0) {
        eventDetails = superDogArray;
        localStorage.setItem("superDogArray", JSON.stringify(eventDetails));
    };

    return eventDetails;
};

//take the data from the new event modal and create a new object, then push into events array
function saveEvent() {
    //get the events out of local storage and parse them
    let eventDetails = JSON.parse(localStorage.getItem("superDogArray")) || superDogArray;

    //create a new object with the new data entered by the user
    let obj = {};
    obj["event"] = document.getElementById("newName").value;
    obj["city"] = document.getElementById("newCity").value;
    obj["state"] = document.getElementById("newState").value;
    obj["attendance"] = document.getElementById("newAttendance").value;
    obj["date"] = document.getElementById("newDate").value;

    //push the new object into the eventDetails array
    eventDetails.push(obj);

    //load the changes into the localStorage
    localStorage.setItem("superDogArray", JSON.stringify(eventDetails));

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
    for (let i = 0; i < eventDetails.length; i++) {
        //get data row of the table
        const dataRow = document.importNode(template.content, true);

        //assign object data to each line of the template
        dataRow.getElementById("name").textContent = eventDetails[i].event;
        dataRow.getElementById("city").textContent = eventDetails[i].city;
        dataRow.getElementById("state").textContent = eventDetails[i].state;
        dataRow.getElementById("attendance").textContent = eventDetails[i].attendance;
        dataRow.getElementById("date").textContent = eventDetails[i].date;

        //write the data to resultsBody
        resultsBody.appendChild(dataRow);

    };
};

//delete an entry
function deleteEntry() {
    let eventDetails = JSON.parse(localStorage.getItem("superDogArray")) || superDogArray;

    //access the rowIndex of the line that the delete button clicked is on
    let cell = this.event.path[2].rowIndex;

    //loop through the events array and find an event with index that matches rowIndex-1
    for (let i = 0; i < eventDetails.length; i++) {
        if (i == cell - 1) {
            eventDetails.splice(i, 1);
            i--;
        };
    };

    //update the superDogArray in localStorage
    localStorage.setItem("superDogArray", JSON.stringify(eventDetails));

    //display the updated event data
    displayData(eventDetails);
};

document.getElementById("submitBtn").addEventListener("click", saveEvent);