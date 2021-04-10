const endPointRoot = "https://www.bcitchairheir.com/COMP4537/termproject/API/v1/";
const myStorage = window.localStorage;
const key = myStorage.getItem('apikey');

//Method to generate table of Grades for the class.
let buildGradeTable = (JSONObject, elementID) => {
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
        }
    }
    
    let divContainer = document.getElementById(elementID);
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

//onLoad Method to append table of Grades to the page.
let onLoadGetGrades = () => {
    let gradeJSON = getGrades();
    buildGradeTable(gradeJSON, "gradepage_list");
}

//AJAX Call to GET grades based on a classname query.
let getGrades = () => {
    let xhttp = new XMLHttpRequest();    
    let classname = myStorage.getItem('classname');
    xhttp.open("GET", endPointRoot + "grade?classname=" + classname + "&apikey" + key, true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = xhttp.response;
            buildGradeTable(data, "gradepage_list");
        }
    }
}

//AJAX Call to POST a new grade.
let postGrade = (newname, newgrade) => {
    let classname = myStorage.getItem('classname');
    let studentJSON = {"name" : newname, 
                       "grade" : newgrade};
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", endPointRoot + "grades?classname=" + classname + "&apikey=" + key, true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhttp.send(studentJSON);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
        } else {
            alert("Failed to Add Class, Try Again.");
        }
    }
}

//AJAX Call to PUT an existing grade.
let putGrade = (gradename, classname, newname, newgrade) => {
    let gradeJSON = {"name" : newname, 
                     "score" : newgrade};
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", endPointRoot + "grades?gradename=" + gradename + "&classname=" + classname);
    xhttp.open('Authorization', 'Bearer' + key);
    xhttp.send(gradeJSON);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
}

//AJAX Call to DELETE an existing grade.
let deleteGrade = (gradename, classname) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", endPointRoot + "grades?gradename=" + gradename + "&classname=" + classname +"&apikey=" + key, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
        }
    }
}

//onClick Method to add a new grade.
let onClickPostGrade = () => {
    let newgradename = document.getElementById("gradepage_input_gradename");
    let newgradescore = document.getElementById("gradepage_input_gradescore");
    postGrade(newgradename, newgradescore);
}