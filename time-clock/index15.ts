//model
//worker personal details
//time clock

class TimeClock {
    id: string;
    constructor(public entaryTime: any, public exitTime: any) {
        this.id = uid();
    }

}

const timeCloceArr: TimeClock[] = [];

const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

class Employ {
    id: string;
    constructor(public firstName: string, public lastName: string, public idNumber: number) {
        this.id = uid();
    }


}

const workers: Employ[] = [];

//join classes
class WorkerTimeClock {
    constructor(public worker: Employ, public timeClock: TimeClock) { }
}

const workerTimes: WorkerTimeClock[] = [];

//view controlers
//worker info
function renderHandleWorker(rootElement: HTMLElement | null) {
    console.dir(rootElement);
    try {
        const html = `
            <form onsubmit="handleWorker(event)">
                <label for="firstName">First name</label>
                <input type="text" name="firstName" id='firstName' placeholder="first name" required>
                <label for="lastName">Last name</label>
                <input type="text" name="lastName" id="lastName" placeholder="last name" required>
                <label for="IDnumber">ID Number</label>
                <input type="number" name="IDnumber" id="IDnumber" required>
                <input type="submit" value="LogIn">        
            </form>
        `
        if (!rootElement) throw new Error("No root element");
        rootElement.innerHTML = html;
    } catch (error) {
        console.error(error);
    }
}

renderHandleWorker(document.querySelector("#register"));

function handleWorker(ev: any) {
    try {
        ev.preventDefault();
        const firstName: string = ev.target.firstName.value;
        const lastName: string = ev.target.lastName.value;
        const idNumber: number = ev.target.IDnumber.value;

        const worker = new Employ(firstName, lastName, idNumber);

        //add to array
        workers.push(worker);

        console.log(workers);

        //seich in view
        renderLoggedUser(worker, document.querySelector("#register"));

    } catch (error) {
        console.error(error);
    }
}

function renderLoggedUser(
    worker: Employ,
    rootElement: HTMLElement | null
) {
    try {
        const html = `<h2>Hello ${worker.firstName}</h2>`;
        if (!rootElement) throw new Error("no root element");

        rootElement.innerHTML = html;
        renderHandleTimeClock(document.querySelector("#logged"));
    } catch (error) {
        console.error(error);
    }
}

function renderHandleTimeClock(rootElement: HTMLElement | null) {
    try {
        const html = `
        <form id="timeClockForm" onsubmit="handletimeclock(event)">
            <h2>your time cloke for today:</h2>
            <div class="entary">
                <label for="entary">start time</label>
                <input type="datetime-local" name="entary" id="entary">
            </div>
            <div class="exit">
                <label for="exit">exit time</label>
                <input type="datetime-local" name="exit" id="exit">
            </div>
            <input type="submit" value="Add">
            <input type="reset" value="Reset">
        </form>`;

        if (!rootElement) throw new Error("no root elemant");

        rootElement.innerHTML = html;

    } catch (error) {
        console.error(error);
    }
}

function handletimeclock(ev: any) {
    try {
        console.dir(ev);
        console.log(ev);
        ev.preventDefault();

        //get entary time
        const entaryTime = ev.target.entary.value;

        //get exit time
        const exitTime = ev.target.exit.value;

            // console.log(entaryTime, exitTime);

        const timeCloceWorker = new TimeClock(entaryTime, exitTime);

        timeCloceArr.push(timeCloceWorker);

            // console.log(timeCloceArr);

        renderTimeClock(timeCloceArr, timeCloceWorker, document.querySelector("#timeClock"));

    } catch (error) {
        console.error(error);
    }
}

function renderTimeClock(timeCloceArr: TimeClock[], timeClockWorker: TimeClock, rootElement: HTMLElement | null) {
    try {
        let html = `
        <table id="timeTable">
            <tr> <!--row-->
                <th>entary time</th>  <!--colum-->
                <th>exit time</th>
                <th>total hours</th>
            </tr>`
        timeCloceArr.forEach(element => {
                 console.log(element);
            html += `
           <tr>
            <td>${element.entaryTime}</td>
            <td>${element.exitTime}</td>
            <td>${calculatHours(element.entaryTime,element.exitTime)}</td>
            <td>
                <button onclick=editTimeClock(${element.id}, ${timeClockWorker}, ${document.querySelector("#editTime")})>Edit</button>
                <button onclick=deleteTimeClock(${element.id}, ${timeClockWorker}, ${document.querySelector('#timeClock')})>Delete</button>
            </td>
           </tr>`
        });
        html += `</table>`;


        if (!rootElement) throw new Error("no root elemant");

        rootElement.innerHTML = html;

    } catch (error) {
        console.error(error);
    }
}

function calculatHours(entaryTime,exitTime) {
    try {
        const start = Date.parse((entaryTime).valueOf() as string); //get timestamp of entary time
        const end = Date.parse((exitTime).valueOf() as string); //get timestamp of entary time
        let totalHours: number | undefined = NaN;
        if (start < end) {
            totalHours = Math.floor((end - start) / 1000 / 60 / 60); //millisecound
        }
        return totalHours;
    } catch (error) {
        console.error(error);
    }
}

//-------------edit and delete
function editTimeClock(id: any, timeClockWorker: TimeClock, rootElement: HTMLElement) {
    try {
            console.log("at editTimeClock the element.id is:", id)
        const timeClockEntry = timeCloceArr.find(entry => entry.id === id);

        if (timeClockEntry) {
            const htmlModel = `
        <h3>Edit Time Clock Entry</h3>
        <label for="entryInput">Entry Time:</label>
        <input type="datetime-local" id="entryInput" value="${timeClockEntry.entaryTime}">
        <label for="exitInput">Exit Time:</label>
        <input type="datetime-local" id="exitInput" value="${timeClockEntry.exitTime}">
     
    <!-- <button onclick="updateTimeClock('${timeClockEntry.id}', ${timeClockWorker}, ${rootElement})")>Update</button>
    <button onclick="cancelEdit()">Cancel</button>  -->
      `;

            if (!rootElement) throw new Error("no root elemant");
            rootElement.innerHTML = htmlModel;
        }
    } catch (error) {
        console.log(error);
    }
}

//!to correct this two
function updateTimeClock(entryId: any, timeClockWorker: TimeClock) {
    try {

   //!problam     
    const entryInput = document.querySelector("#entryInput")
    if (entryInput === null) throw new Error("entryInput = null");
        const updatedEntry = entryInput.value;

        const updatedExit = document.querySelector("#exitInput").value;
        if (updatedExit === null) throw new Error("updatedExit = null");
    //!end    

        // Perform the necessary update based on the user input
        const entryToUpdate = timeCloceArr.find(entry => entry.id === entryId);
        if (entryToUpdate) {
            entryToUpdate.entaryTime = updatedEntry;
            entryToUpdate.exitTime = updatedExit;
        }

        // Remove the htmlModel dialog
        // document.body.removeChild(htmlModel);

        // Clear the content of the root element
          const rootElement = document.querySelector("#timeClock");
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
        const rootElement = document.querySelector("#timeClock");
        if (rootElement) {
            rootElement.innerHTML = '';
        }
}


function deleteTimeClock(id: any, timeClockWorker: TimeClock, rootElement: HTMLElement | null) {
    // Find the index of the time clock entry in the array based on the provided ID
    const entryIndex = timeCloceArr.findIndex(entry => entry.id === id);

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