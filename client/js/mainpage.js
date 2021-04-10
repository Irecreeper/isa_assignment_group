const endPointRoot = "https://www.bcitchairheir.com/COMP4537/termproject/API/v1/";
const myStorage = window.localStorage;
const key = myStorage.getItem('apikey');

//Function to generate a table of classes connected to user, via GET request.
let createClassList = () => {
    //let classJSON = getClasses();
    let classJSON =  [
    {
        "classname": "sample1",
        "student" : "samplestudent1"
    },
    {
        "classname": "sample2",
        "student" : "samplestudent2"
    }]
    createJSONTable(classJSON, "mainpage_classlist");
}

//Method to create Table for Display based on JSON recieved from GET request.
let createJSONTable = (JSONObject, elementID) => {
    var col = [];
    for(let i = 0; i < JSONObject.length; i++) {
        for(let key in JSONObject[i]) {
            if(col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    //Create Header For Table
    let table = document.createElement("table");
    let tr = table.insertRow(-1);
    for(let i = 0; i < col.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    //Create Rows for Each Entry
    for(let i = 0; i < JSONObject.length; i++) {
        tr = table.insertRow(-1);

        for(let j = 0; j < col.length; j++) {
            let tabCell = tr.insertCell(-1);
            tabCell.innerHTML = JSONObject[i][col[j]];
            //tabCell.onclick = onClickGradePage();
        }
    }
    
    let divContainer = document.getElementById(elementID);
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

//AJAX Call to get JSON of classes for the user via GET request.
let getClasses = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", endPointRoot + "class?apikey=" + key, true);
    xhttp.setRequestHeader('Content-Type', 'applicaton/json; charset=utf-8');
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let data = xhttp.response;
            buildGradeTable(data);
        }
    }
}

//AJAX Call to POST new class to user.
let postClass = () => {
    let newclassname = document.getElementById("mainpage_input_addclass").value;
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", endPointRoot + "class?classname=" + newclassname +"&apikey=" + key, true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
            location.reload();
        } else {
            alert("Class Failed to Add, Try Again.");
        }
    }
}

//Method to redirect to a page showing all the grades under a class.
let onClickGradePage = () => {
    let classname = this.innerHTML;
    myStorage.setItem('classname', classname);
    this.window.location = 'https://www.kparkweb.com/COMP4537/termproject/API/V1/html/gradepage.html';
}

//Method to redirect to User Details Edit page
let onClickUserEditPage = () => {
    this.window.location = 'https://www.kparkweb.com/COMP4537/termproject/API/V1/html/useredit.html';
}
//AJAX Call to PUT new details of a Class.
let putClass = (classname) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", endPointRoot + "class?classname=" + classname +"&apikey=" + key, true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhttp.send(classJSON);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
}

//AJAX Call to DELETE a class.
let deleteClass = (classname) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", endPointRoot + "class?classname=" + classname + "&apikey=" + key, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
}
