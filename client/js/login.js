const endPointRoot = "https://www.bcitchairheir.com/COMP4537/termproject/API/v1/";
const myStorage = window.localStorage;
const key = myStorage.getItem('apikey');

//Authentication Functions
//AJAX Call to get API key from Server.
let getKey = (username, password) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", endPointRoot + "key?username=" + username + "&password=" + password, true);
    xhttp.send();
    xhttp.onreadystatechange = () => {
        if(this.readyState == 4 && this.status == 200) {
            myStorage.setItem('apikey', xhttp.responseText);
            return true;
        } else {
            return false;            
        }
    }
}
//AJAX Call to Login With Existing Username and Password.
let login = () => {
    let username = document.getElementById("login_input_username").innerHTML;
    let password = document.getElementById("login_input_password").innerHTML;
    if(username && password) {
        let status = getKey(username, password);
        if(status) {
            location.href = "https://kparkweb.com/COMP4537/termproject/html/main_page.html"
        } else {
            alert("Login Failed!");
        }        
    }
}
//Function to redirect to signup page.
let onClickSignUp = () => {
    this.window.location = 'https://www.kparkweb.com/COMP4537/termproject/API/V1/html/signup.html';
}