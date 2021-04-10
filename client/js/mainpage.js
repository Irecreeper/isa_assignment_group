let redirect_signup = () => {
    this.window.location = 'file://C:/nodeJStest/term_project/isa_assignment_group/client/html/signup.html';
}
let createClassList = () => {
    let classJSON =  [
    {
        "classname": "sample1",
        "student" : "samplestudent1"
    },
    {
        "classname": "sample2",
        "student" : "samplestudent2"
    }]
    createJSONTable(classJSON, "mainpage_gradelist");
}
//Method to create Table for Display based on JSON recieved from GET requests.
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
        }
    }
    
    let divContainer = document.getElementById(elementID);
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}