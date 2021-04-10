const endPointRoot = "https://www.bcitchairheir.com/COMP4537/termproject/API/v1/";
const myStorage = window.localStorage;
const key = myStorage.getItem('apikey');



// Student Functions

//Get Function for User
export let getUser = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", endPointRoot + "user", true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhttp.setRequestHeader('Authorization', 'Bearer' + key);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText));
        }
    }
}
//Put Function for User
let putUser = (username, newusername, newfirst, newlast, newpassword) => {
    let userJSON = {"username" : newusername,
                    "fname" : newfirst, 
                    "lname" : newlast,
                    "password" : newpassword};

    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", endPointRoot + "user?username=" + username, true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhttp.setRequestHeader('Authorization', 'Bearer' + key);
    xhttp.send(userJSON);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText));
        }
    }
}
 //Post Function for User
let postUser = (username, firstname, lastname, password) => {
    let userJSON = {username: + username, 
                    fname: + firstname, 
                    lname: + lastname, 
                    password: password};

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

//Class Functions

//Get Function for Classes
let getClasses = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", endPointRoot + "class", true);
    xhttp.setRequestHeader('Content-Type', 'applicaton/json; charset=utf-8');
    xhttp.setRequestHeader('Authorization', 'Bearer' + key);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let data = xhttp.response;
            buildGradeTable(data);
        }
    }
}
//Post Function for Classes
let postClass = (classname, newclassname) => {
    let classJSON = {name: + newclassname};
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", endPointRoot + "class?classname=" + classname, true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhttp.setRequestHeader('Authorization', 'Bearer' + key);
    xhttp.send(classJSON);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
}

let putClass = (classname, newclassname) => {
    let classJSON = {"name" : newclassname};
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", endPointRoot + "class?classname=" + classname, true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhttp.setRequestHeader('Authorization', 'Bearer' + key);
    xhttp.send(classJSON);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
}

let deleteClass = (classname) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", endPointRoot + "class?classname=" + classname, true);
    xhttp.setRequestHeader('Authorization', 'Bearer' + key);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
}


// Grade Functions

let getGrades = (classname) => {
    let xhttp = new XMLHttpRequest();    
    xhttp.open("GET", endPointRoot + "grade?classname=" + classname, true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhttp.setRequestHeader('Authorization', 'Bearer' + key);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = xhttp.response;
            buildGradeTable(data);
        }
    }

}

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

let postGrade = (classname, newname, newgrade) => {
    let studentJSON = {"name" : newname, 
                       "grade" : newgrade};
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", endPointRoot + "grades?classname=" + classname, true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhttp.setRequestHeader('Authorization', 'Bearer' + key);
    xhttp.send(studentJSON);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }

}

let deleteGrade = (gradename, classname) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", endPointRoot + "grades?gradename=" + gradename + "&classname=" + classname, true);
    xhttp.setRequestHeader('Authorization', 'Bearer' + key);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
}
