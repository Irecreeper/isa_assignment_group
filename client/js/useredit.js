const endPointRoot = "https://www.bcitchairheir.com/gradebase/";
const myStorage = window.localStorage;
const apikey = myStorage.getItem('apikey');
const storedusername = myStorage.getItem('username');

//onLoad Function to GET User Details.
let onLoadGetUser = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", endPointRoot + "user?apikey=" + apikey, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let parsedJSON = xhttp.response;
            console.log(xhttp.response);
            myStorage.setItem('user', parsedJSON);
        }
    }
    let userJSON = JSON.parse(myStorage.getItem('user'));
    console.log(userJSON);
    console.log(userJSON[0]);
    document.getElementById("userdet_input_username").value = userJSON[0]["username"];
    document.getElementById("userdet_input_fname").value = userJSON[0]["fname"];
    document.getElementById("userdet_input_lname").value = userJSON[0]["lname"];
    document.getElementById("userdet_input_password").value = userJSON[0]["password"];
    myStorage.setItem('username', document.getElementById("userdet_input_username").value);

}

//Put Function for User
let putUser = () => {
    let newusername = document.getElementById("userdet_input_username").value;
    let newfname = document.getElementById("userdet_input_fname").value;
    let newlname = document.getElementById("userdet_input_lname").value;
    let newpassword = document.getElementById("userdet_input_password").value;
    let userJSON = JSON.stringify({"username" : newusername,
                    "fname" : newfname, 
                    "lname" : newlname,
                    "password" : newpassword});
    
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", endPointRoot + "user?username=" + storedusername + "&apikey=" + apikey, true);
    xhttp.send(userJSON);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Details Successfully Updated.");
            window.location.href = 'https://www.kparkweb.com/COMP4537/termproject/API/V1/html/mainpage.html';
        }
    }
}