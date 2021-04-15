const endPointRoot = "https://www.bcitchairheir.com/gradebase/";
let apikey = localStorage.getItem("apikey");


//Method to create Table for Display based on JSON recieved from GET request.
let createJSONTable = (JSONArray, elementID) => {
    let parsedJSON = JSON.parse(JSONArray);
    //Create Header For Table
    let table = document.createElement("table");
    let tr = table.insertRow(-1);
    let th = document.createElement("th");
    th.innerHTML = "Class Name";
    tr.appendChild(th);

    //Create Rows for Each Entry
    for(let i = 0; i < parsedJSON.length; i++) {
        tr = table.insertRow(-1);
        let object = parsedJSON[i]["name"];
        let tabCell = tr.insertCell(-1);
        tabCell.innerHTML = object;
        
        let detailsbutton = document.createElement("button");
        detailsbutton.innerHTML = "Details";
        detailsbutton.id = object;
        detailsbutton.value = object;
        detailsbutton.setAttribute("onclick", "onClickGradePage(" + object.toString() + ")");
        tr.append(detailsbutton);
        
        let deletebutton = document.createElement("button");
        deletebutton.innerHTML = "Delete";
        deletebutton.value = object;
        deletebutton.setAttribute("onclick", "deleteClass(" + object.toString() + ")") ;
        tr.append(deletebutton);
    }
    
    let divContainer = document.getElementById(elementID);
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

//AJAX Call to get JSON of classes for the user via GET request.
let getClasses = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", endPointRoot + "class?apikey=" + apikey, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            createJSONTable(xhttp.response, "mainpage_classlist");
        }
    }
}

let onLoadMainPage = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", endPointRoot + "user?apikey=" + apikey, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let parsedJSON = JSON.parse(xhttp.response);
            localStorage.setItem('user', parsedJSON);
        }
    }
    let userJSON = JSON.parse(localStorage.getItem('user'));
    console.log(userJSON);
    document.getElementById("mainpage_greeting").innerHTML = "Welcome Back " + userJSON[0]["fname"] + " " + userJSON[0]["lname"];
    getClasses();
}

//AJAX Call to POST new class to user.
let postClass = () => {
    let newclassname = document.getElementById("mainpage_input_addclass").value;
    if(newclassname) {
        let classJSON = JSON.stringify({"name" : newclassname});
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", endPointRoot + "class?apikey=" + apikey, true);
        xhttp.send(classJSON);
        xhttp.onreadystatechange = () => {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
            }
        location.reload();
        }
    } else {
        alert("Field Cannot Be Blank");
    }
    
}

//AJAX Call to DELETE a class.
let deleteClass = (classname) => {
    console.log(classname);
    if(confirm("Are you sure you want to delete this class?")) {
        const xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", endPointRoot + "class?classname=" + classname.value + "&apikey=" + apikey, true);
        xhttp.send();
        xhttp.onreadystatechange = function() {
            location.reload();
        }
    }    
}

//Method to redirect to a page showing all the grades under a class.
let onClickGradePage = (classname) => {
    console.log(classname.value);
    localStorage.setItem('classname', classname.value);
    window.location.href = 'https://www.kparkweb.com/COMP4537/termproject/API/V1/html/gradepage.html';
}

//Method to redirect to User Details Edit page
let onClickUserEditPage = () => {
    window.location.href = 'https://www.kparkweb.com/COMP4537/termproject/API/V1/html/useredit.html';
}