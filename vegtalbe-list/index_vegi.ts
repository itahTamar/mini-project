//add a button to remove one item from a vegtabel (eg: you had 5 tomatos,
// and when you press the button "I ATE ONE",
// you will be left with 4 tomatos) and add a button to add one vegtabel

//modle - vegtable class

class Vegetable {
    id: string;
    isEdit: boolean = false;  //the defult is that we are not in edit mode
    constructor(public name: string, public image: string, public quantity: number, id?: string | null) {
        //if we get an id that mean we are edit the data, if not its a new data and we create a new id
        if (id) {
            this.id = id;
        } else {
            this.id = `id-${new Date().getTime()}-${Math.random()}`;
        }
    }
    //to set edin mode on or off acording to btn click
    setEdit(set: boolean) {
        this.isEdit = set;
    }
}

//put all the data in array of vegetables
const vegetables: Vegetable[] = getVegetableFromStorage(); //we dont want to zero every reloud of the page, we want to see the storage data

function getVegetableFromStorage(): Vegetable[] {
    try {
        //get vegtebles from localstorage as string
        const vegtableString = localStorage.getItem("vegtables");
        //test if we have somethig to get
        if (!vegtableString) return []; //if we dont have an array to ger we return an empty aררשט

        //convert the string to array of object
        const vegetablesArray = JSON.parse(vegtableString);

        //convert the array of object to array of class vegetable
        const vegetables: Vegetable[] = vegetablesArray.map((vegetable: Vegetable) => {
            return new Vegetable(vegetable.name, vegetable.image, vegetable.quantity, vegetable.id); //inside the inside function
        })

        return vegetables //return the array of the class

    } catch (error) { //if there an error return empry array
        console.error(error);
        return []
    }
}

//view

//show all the vegetable card on screen
//render list of vegetables
//render search
//model -> controler -> view

function renderAllVegetables(vegetables: Vegetable[], htmlElement: HTMLElement | null) {
    try {
        //test if we catch the html element
        if (!htmlElement) throw new Error("No html element");

        //if we did, we want to render all vegetables to the screen
        const html = vegetables.map(vegetable => renderVegetableCard(vegetable)).join('')
        htmlElement.innerHTML = html;

    } catch (error) {
        console.error(error)
    }
}

renderAllVegetables(vegetables, document.querySelector("#vegetableRoot"));

//render every vegetable card
function renderVegetableCard(vegetable: Vegetable) {
    try {
        //if we want to edit the card we check if the edit btn were clicked, when clicked turn isEdit=trou
        if (vegetable.isEdit) {
            //we want to change the DOM to an edit-form
            return `<div class="card">
                        <img src="${vegetable.image}">
                        <form onsubmit="handleSetEdit(event)" id="${vegetable.id}">
                            <input type="text" name="name" value="${vegetable.name}">
                            <input type="url" name="image" value="${vegetable.image}">
                            <input type="number" name="quantity" value="${vegetable.quantity}">                          
                            <br>
                            <button onclick="hendelDelet('${vegetable.id}')">Delet</button>
                            <input type="submit" value="SET">
                        </form>
                    </div> `
        } else {
            //when not in edit mode
            if(vegetable.image === ' '){
                vegetable.image = "https://cdn.carmella.co.il/wp-content/uploads/2020/11/9012.jpg"
            }
            return `<div class="card">
                        <img src="${vegetable.image}">
                        <p>${vegetable.name}</p>
                        <p><button onclick="handelquntityMinosOne('${vegetable.id}')">-</button>
                        ${vegetable.quantity}
                        <button onclick="handelquntityPlusOne('${vegetable.id}')">+</button></p>
                        <button onclick="hendelDelete('${vegetable.id}')">Delet</button>
                        <button onclick="handelEdit('${vegetable.id}')">Edit</button>
                    </div>`
        }
    } catch (error) {
        console.error(error)
    }
}


//controllers

//search mode

function vegetableSearch(){
    try {
        let searchText: HTMLElement|null = document.querySelector('#search').value
        if(searchText===null) throw new Error("element not received")
        let regexp = new RegExp(`^${searchText}`,'i'); 
        const searchVegetables: Vegetable[] = []
        vegetables.forEach(vegetable => {
            if(regexp.test(vegetable.name)){
                searchVegetables.push(vegetable)
            }
            renderAllVegetables(searchVegetables, document.querySelector('#vegetableRoot'))
        })

    } catch (error) {
        console.error(error)
    }
}

//add a new vegetable
//take the input from user and put it in varibels
function handleAddVegetable(ev: any) {
    try {
        ev.preventDefault(); //prevent default from work
        const name = ev.target.name.value;
        const image = ev.target.image.value;
        const quantity = ev.target.quantity.value;

        //create new vegetable class
        const newVegetable = new Vegetable(name, image, quantity);

        //push the new vegetable to the array
        vegetables.push(newVegetable);

        //render the array to see all vegetables
        renderAllVegetables(vegetables, document.querySelector('#vegetableRoot'));

        //save the data to localstorage as string
        localStorage.setItem("vegetable", JSON.stringify(vegetables))

        //reset the form
        ev.target.reset();


    } catch (error) {
        console.error(error)
    }
}

//Delete
//button (view (card)) -> control to delete from array -> edit model and save to loclstorage -> render the new model-view
//the delete function get the vegetable id find its index and delete the sell in the array
function hendelDelete(vegetableId: string) {
    try {
        const index = vegetables.findIndex(vegetable => vegetable.id === vegetableId); //find the index
        if (index === -1) throw new Error("could not find vegetable");

        //cut the sel out the array
        vegetables.splice(index, 1);

        //save to localstorage
        localStorage.setItem("vegetables", JSON.stringify(vegetables))

        //render the new array
        renderAllVegetables(vegetables, document.querySelector("#vegetableRoot"))

    } catch (error) {
        console.error(error)
    }
}

//Edit
//enable editing
//the function will find the card by its id and set it to edit mode (isEdit==true)

function handelEdit(vegetableId: string) {
    try {
        const vegetable = vegetables.find(vegetable => vegetable.id === vegetableId)
        if (!vegetable) throw new Error("could not find vegetble")

        //change to edit mode
        vegetable.setEdit(true);

        //render at edit mode
        renderAllVegetables(vegetables, document.querySelector("#vegetableRoot"))
    } catch (error) {
        console.error(error)
    }
}

//handel the edit data, get it from the form -> save it to localstorage -> render the resulte

function handleSetEdit(ev: any) {
    try {
        ev.preventDefault();
        //get the data from the form
        const name = ev.target.name.value;
        const image = ev.target.image.value;
        const quantity = ev.target.quantity.value;
        const vegetableId: string = ev.target.id;

        //find the sell in the array by its id
        const vegetable: Vegetable | undefined = vegetables.find(vegetable => vegetable.id === vegetableId)
        if (!vegetable) throw new Error("could not find vegetable")

        //put the new data in the sell
        vegetable.name = name;
        vegetable.image = image;
        vegetable.quantity = quantity;

        //set off the edit mode
        vegetable.setEdit(false)
        //check to see the new array
        console.log(vegetables)

        //save the data in localstorage
        localStorage.setItem("vegetable", JSON.stringify(vegetable))

        //render the new data
        renderAllVegetables(vegetables, document.querySelector("#vegetableRoot"))

    } catch (error) {
        console.error(error)
    }
}

//minos One

function handelquntityMinosOne(vegetableId: string) {
    try {
        const vegetable = vegetables.find(vegetable => vegetable.id === vegetableId)
        if (!vegetable) throw new Error("could not find vegetble")

        //tip point = 0 => dont want go under 0
        if (vegetable.quantity === 0) throw new Error("you have zero items")

        //set the new quantity
        vegetable.quantity--;
        
        //render the new quantity
        renderAllVegetables(vegetables, document.querySelector("#vegetableRoot"))

    } catch (error) {
        console.error(error)
    }
}

//plus One

function handelquntityPlusOne(vegetableId: string) {
    try {
        const vegetable = vegetables.find(vegetable => vegetable.id === vegetableId)
        if (!vegetable) throw new Error("could not find vegetble")

        //set the new quantity
        vegetable.quantity++;
        
        //render the new quantity
        renderAllVegetables(vegetables, document.querySelector("#vegetableRoot"))

    } catch (error) {
        console.error(error)
    }
}