const endPointRoot = "https://www.bcitchairheir.com/gradebase/";

//Authentication Functions
//AJAX Call to get API key from Server.
let getKey = () => {
    let username = document.getElementById("login_input_username").value;
    let password = document.getElementById("login_input_password").value;
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", endPointRoot + "key?username=" + username + "&password=" + password, true);
    xhttp.send();
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            localStorage.setItem("apikey", xhttp.response);
            if(localStorage.getItem("apikey")) {
                window.location.href = "https://www.kparkweb.com/COMP4537/termproject/API/V1/html/mainpage.html";
            }
        } 
    }
}


//Function to redirect to signup page.
let onClickSignUp = () => {
    window.location.href = 'https://www.kparkweb.com/COMP4537/termproject/API/V1/html/signup.html';
}