const endPointRoot = "bcitchairheir.com/COMP4537/termproject/"
function checkauth(username, password) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", endPointRoot + "user/" + username, username, password);
    xhttp.setRequestHeader('Authorization', "Basic "+ btoa("username:password"));
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 & this.status == 200) {
            return true;
        }
         else {
             return false;
         }
    }
}
// Student Functions

//Post Function for User
function postUser(username, firstname, lastname, password) {
    //Hash Password Here
    let userJSON = JSON.stringify({username: + username, fname: + firstname, lname: + lastname, password: password});
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", endPointRoot + "user", true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhttp.send(userJSON);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
}

function getUser() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", endPointRoot + "user/" + username, true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText));
        }
    }
}

function putUser(newfirst, newlast) {
    let userJSON = JSON.stringify({firstname: + newfirst, lastname: + newlast});
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", endPointRoot + "user/" + username, true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhttp.send(userJSON);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText));
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
            console.log("Successfully Deleted Student");
        }
        else {
            console.log("Delete Failed");
        }
    }
}

//Class Functions

function postClass(classname) {
    let classJSON = JSON.stringify({name: + studentname});
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", endPointRoot + "classes", true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhttp.send(classJSON);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
}

function getClass(classname) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", endPointRoot + "classes/" + classname, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
}

function putClass(classname, newname) {
    let classJSON = JSON.stringify({name: + newname});
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", endPointRoot + classname, "class", true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhttp.send(classJSON);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
}

function deleteClass(classID) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", endPointRoot + "students", true);
    xhttp.send(classID);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
}


// Grade Functions

function postGrade(name, grade, classID) {
    let studentJSON = JSON.stringify({name: + name, grade: grade, classID: classID});
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

function getGrade(gradeName) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", endPointRoot + "grades/" + gradeName);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }

}

function putGrade(gradeName, newname, newgrade) {
    let gradeJSON = JSON.stringify({name: newname, score: newgrade});
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", endPointRoot + "grades/" + gradeName);
    xhttp.send(gradeJSON);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
}
function deleteGrade(gradeID) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", endPointRoot + "students", true);
    xhttp.send(gradeID);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
}

//Miscallaneous Functions

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
    xhttp.open("GET", endPointRoot + "key/app.js?type=key", true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let keyholder = document.getElementById("keyholder");
            keyholder.innerHTML = this.responseText;
        })
    }
}