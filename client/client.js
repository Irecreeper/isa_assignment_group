const endPointRoot = "bcitchairheir.com/COMP4537/labs/7/"
function checkauth(username, password) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", endPointRoot + "students", username, password);
    xhttp.setRequestHeader('Authorization', "Basic "+ btoa("username:password"));
    xhttp.send();
}

function postStudent(studentname, elementID) {
    let studentJSON = JSON.stringify({name: + studentname});
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", endPointRoot + "students", true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhttp.send(studentJSON);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }

}

function deleteStudent(studentid) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", endPointRoot + "students" + studentid, true);
    xhttp.send(studentid);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
}

function getRESTCount() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", endPointRoot + "students/", true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            for(i = 0; i < 10; i++) {
                document.getElementById("row" + i).innerHTML = this.responseText;
            }
        }
    }
}

function getKey() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", endPointRoot + "students/app.js?type=key", true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let keyholder = document.getElementById("keyholder");
            keyholder.innerHTML = this.responseText;
        })
    }
}