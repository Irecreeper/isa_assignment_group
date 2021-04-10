const endPointRoot = "https://www.bcitchairheir.com/COMP4537/termproject/API/v1/";
const myStorage = window.localStorage;
const key = myStorage.getItem('apikey');
const storedusername = myStorage.getItem('username');

//onLoad Function to GET User Details.
let onLoadGetUser = () => {
    //let userJSON = getUser();
    let userJSON = {
        "username" : "bob",
        "fname" : "robert",
        "lname" : "something",
        "password" : "chicken"
    }
    document.getElementById("userdet_input_username").value = userJSON["username"];
    document.getElementById("userdet_input_fname").value = userJSON["fname"];
    document.getElementById("userdet_input_lname").value = userJSON["lname"];
    document.getElementById("userdet_input_password").value = userJSON["password"];
    myStorage.setItem('username', document.getElementById("userdet_input_username").value);

}
//onClick Function to PUT User Details.
let onClickPutUser = () => {
    let newusername = document.getElementById("userdet_input_username").value;
    let newfname = document.getElementById("userdet_input_fname").value;
    let newlname = document.getElementById("userdet_input_lname").value;
    let newpassword = document.getElementById("userdet_input_password").value;
    putUser(storedusername, newusername, newfname, newlname, newpassword);
}

//Get Function for User
let getUser = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", endPointRoot + "user?apikey=" + key, true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myStorage.setItem('username', xhttp.response["username"]);
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
    xhttp.open("PUT", endPointRoot + "user?username=" + username + "&apikey=" + key, true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhttp.send(userJSON);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Details Successfully Updated.");
            this.window.location = 'https://www.kparkweb.com/COMP4537/termproject/API/V1/html/mainpage.html';
        }
    }
}