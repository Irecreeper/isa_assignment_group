const endPointRoot = "https://www.bcitchairheir.com/gradebase/";

//Post Function for User
let postUser = (username, firstname, lastname, password) => {
  let userJSON = JSON.stringify({
    "username": username,
    "fname": firstname,
    "lname": lastname,
    "password": password
  });

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", endPointRoot + "user", true);
  xhttp.send(userJSON);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      alert("Successfully Registered!");
      location.replace('https://www.kparkweb.com/COMP4537/termproject/API/V1/html/login.html');
    }
  }
}

//onClick method to POST new User.
let onClickPostUser = () => {
  let newusername = document.getElementById("signup_input_username").value;
  let newpassword = document.getElementById("signup_input_password").value;
  let newfname = document.getElementById("signup_input_fname").value;
  let newlname = document.getElementById("signup_input_lname").value;

  postUser(newusername, newfname, newlname, newpassword);
}
