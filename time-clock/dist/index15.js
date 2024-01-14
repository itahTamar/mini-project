//model
//worker personal details
//time clock
var TimeClock = /** @class */ (function () {
    function TimeClock(entaryTime, exitTime) {
        this.entaryTime = entaryTime;
        this.exitTime = exitTime;
        this.id = uid();
    }
    return TimeClock;
}());
var timeCloceArr = [];
var uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
var Employ = /** @class */ (function () {
    function Employ(firstName, lastName, idNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.idNumber = idNumber;
        this.id = uid();
    }
    return Employ;
}());
var workers = [];
//join classes
var WorkerTimeClock = /** @class */ (function () {
    function WorkerTimeClock(worker, timeClock) {
        this.worker = worker;
        this.timeClock = timeClock;
    }
    return WorkerTimeClock;
}());
var workerTimes = [];
//view controlers
//worker info
function renderHandleWorker(rootElement) {
    console.dir(rootElement);
    try {
        var html = "\n            <form onsubmit=\"handleWorker(event)\">\n                <label for=\"firstName\">First name</label>\n                <input type=\"text\" name=\"firstName\" id='firstName' placeholder=\"first name\" required>\n                <label for=\"lastName\">Last name</label>\n                <input type=\"text\" name=\"lastName\" id=\"lastName\" placeholder=\"last name\" required>\n                <label for=\"IDnumber\">ID Number</label>\n                <input type=\"number\" name=\"IDnumber\" id=\"IDnumber\" required>\n                <input type=\"submit\" value=\"LogIn\">        \n            </form>\n        ";
        if (!rootElement)
            throw new Error("No root element");
        rootElement.innerHTML = html;
    }
    catch (error) {
        console.error(error);
    }
}
renderHandleWorker(document.querySelector("#register"));
function handleWorker(ev) {
    try {
        ev.preventDefault();
        var firstName = ev.target.firstName.value;
        var lastName = ev.target.lastName.value;
        var idNumber = ev.target.IDnumber.value;
        var worker = new Employ(firstName, lastName, idNumber);
        //add to array
        workers.push(worker);
        console.log(workers);
        //seich in view
        renderLoggedUser(worker, document.querySelector("#register"));
    }
    catch (error) {
        console.error(error);
    }
}
function renderLoggedUser(worker, rootElement) {
    try {
        var html = "<h2>Hello " + worker.firstName + "</h2>";
        if (!rootElement)
            throw new Error("no root element");
        rootElement.innerHTML = html;
        renderHandleTimeClock(document.querySelector("#logged"));
    }
    catch (error) {
        console.error(error);
    }
}
function renderHandleTimeClock(rootElement) {
    try {
        var html = "\n        <form id=\"timeClockForm\" onsubmit=\"handletimeclock(event)\">\n            <h2>your time cloke for today:</h2>\n            <div class=\"entary\">\n                <label for=\"entary\">start time</label>\n                <input type=\"datetime-local\" name=\"entary\" id=\"entary\">\n            </div>\n            <div class=\"exit\">\n                <label for=\"exit\">exit time</label>\n                <input type=\"datetime-local\" name=\"exit\" id=\"exit\">\n            </div>\n            <input type=\"submit\" value=\"Add\">\n            <input type=\"reset\" value=\"Reset\">\n        </form>";
        if (!rootElement)
            throw new Error("no root elemant");
        rootElement.innerHTML = html;
    }
    catch (error) {
        console.error(error);
    }
}
function handletimeclock(ev) {
    try {
        console.dir(ev);
        console.log(ev);
        ev.preventDefault();
        //get entary time
        var entaryTime = ev.target.entary.value;
        //get exit time
        var exitTime = ev.target.exit.value;
        // console.log(entaryTime, exitTime);
        var timeCloceWorker = new TimeClock(entaryTime, exitTime);
        timeCloceArr.push(timeCloceWorker);
        // console.log(timeCloceArr);
        renderTimeClock(timeCloceArr, timeCloceWorker, document.querySelector("#timeClock"));
    }
    catch (error) {
        console.error(error);
    }
}
function renderTimeClock(timeCloceArr, timeClockWorker, rootElement) {
    try {
        var html_1 = "\n        <table id=\"timeTable\">\n            <tr> <!--row-->\n                <th>entary time</th>  <!--colum-->\n                <th>exit time</th>\n                <th>total hours</th>\n            </tr>";
        timeCloceArr.forEach(function (element) {
            console.log(element);
            html_1 += "\n           <tr>\n            <td>" + element.entaryTime + "</td>\n            <td>" + element.exitTime + "</td>\n            <td>" + calculatHours(element.entaryTime, element.exitTime) + "</td>\n            <td>\n                <button onclick=editTimeClock(" + element.id + ", " + timeClockWorker + ", " + document.querySelector("#editTime") + ")>Edit</button>\n                <button onclick=deleteTimeClock(" + element.id + ", " + timeClockWorker + ", " + document.querySelector('#timeClock') + ")>Delete</button>\n            </td>\n           </tr>";
        });
        html_1 += "</table>";
        if (!rootElement)
            throw new Error("no root elemant");
        rootElement.innerHTML = html_1;
    }
    catch (error) {
        console.error(error);
    }
}
function calculatHours(entaryTime, exitTime) {
    try {
        var start = Date.parse((entaryTime).valueOf()); //get timestamp of entary time
        var end = Date.parse((exitTime).valueOf()); //get timestamp of entary time
        var totalHours = NaN;
        if (start < end) {
            totalHours = Math.floor((end - start) / 1000 / 60 / 60); //millisecound
        }
        return totalHours;
    }
    catch (error) {
        console.error(error);
    }
}
//-------------edit and delete
function editTimeClock(id, timeClockWorker, rootElement) {
    try {
        console.log("at editTimeClock the element.id is:", id);
        var timeClockEntry = timeCloceArr.find(function (entry) { return entry.id === id; });
        if (timeClockEntry) {
            var htmlModel = "\n        <h3>Edit Time Clock Entry</h3>\n        <label for=\"entryInput\">Entry Time:</label>\n        <input type=\"datetime-local\" id=\"entryInput\" value=\"" + timeClockEntry.entaryTime + "\">\n        <label for=\"exitInput\">Exit Time:</label>\n        <input type=\"datetime-local\" id=\"exitInput\" value=\"" + timeClockEntry.exitTime + "\">\n     \n    <!-- <button onclick=\"updateTimeClock('" + timeClockEntry.id + "', " + timeClockWorker + ", " + rootElement + ")\")>Update</button>\n    <button onclick=\"cancelEdit()\">Cancel</button>  -->\n      ";
            if (!rootElement)
                throw new Error("no root elemant");
            rootElement.innerHTML = htmlModel;
        }
    }
    catch (error) {
        console.log(error);
    }
}
//!to correct this two
function updateTimeClock(entryId, timeClockWorker) {
    try {
        //!problam     
        var entryInput = document.querySelector("#entryInput");
        if (entryInput === null)
            throw new Error("entryInput = null");
        var updatedEntry = entryInput.value;
        var updatedExit = document.querySelector("#exitInput").value;
        if (updatedExit === null)
            throw new Error("updatedExit = null");
        //!end    
        // Perform the necessary update based on the user input
        var entryToUpdate = timeCloceArr.find(function (entry) { return entry.id === entryId; });
        if (entryToUpdate) {
            entryToUpdate.entaryTime = updatedEntry;
            entryToUpdate.exitTime = updatedExit;
        }
        // Remove the htmlModel dialog
        // document.body.removeChild(htmlModel);
        // Clear the content of the root element
        var rootElement = document.querySelector("#timeClock");
        if (rootElement) {
            rootElement.innerHTML = '';
        }
        // Render the updated time clock table
        renderTimeClock(timeCloceArr, timeClockWorker, document.querySelector("#timeClock"));
    }
    catch (error) {
        console.error(error);
    }
}
function cancelEdit() {
    // Remove the htmlModel dialog
    // document.body.removeChild(htmlModel);
    // Clear the content of the root element
    var rootElement = document.querySelector("#timeClock");
    if (rootElement) {
        rootElement.innerHTML = '';
    }
}
function deleteTimeClock(id, timeClockWorker, rootElement) {
    // Find the index of the time clock entry in the array based on the provided ID
    var entryIndex = timeCloceArr.findIndex(function (entry) { return entry.id === id; });
    if (entryIndex !== -1) {
        // Remove the entry from the array
        timeCloceArr.splice(entryIndex, 1);
        // Clear the content of the root element
        if (rootElement) {
            rootElement.innerHTML = '';
        }
        // Render the updated time clock table
        // renderTimeClock(timeCloceArr, timeClockWorker, document.querySelector("#timeClock"));
        renderTimeClock(timeCloceArr, timeClockWorker, rootElement);
    }
}
