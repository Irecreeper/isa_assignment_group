const endPointRoot = "https://www.bcitchairheir.com/gradebase/";
const myStorage = window.localStorage;
const key = myStorage.getItem('apikey');

//Method to generate table of Grades for the class.
let buildGradeTable = (JSONArray, elementID) => {
  let parsedJSON = JSON.parse(JSONArray);
  //Create Header For Table
  let table = document.createElement("table");
  let tr = table.insertRow(-1);

  let th = document.createElement("th");
  th.innerHTML = "Grade Name";
  tr.appendChild(th);

  let th2 = document.createElement("th");
  th2.innerHTML = "Score";
  tr.appendChild(th);


  //Create Rows for Each Entry
  for (let i = 0; i < parsedJSON.length; i++) {
    tr = table.insertRow(-1);
    let object = parsedJSON[i];
    let tabCell = tr.insertCell(-1);
    tabCell.innerHTML = object.name;
    let tabCell2 = tr.insertCell(-1);
    tabCell2.innerHTML = object.score;

    let deletebutton = document.createElement("button");
    deletebutton.innerHTML = "Delete";
    deletebutton.value = object.name;
    deletebutton.setAttribute("onclick", "deleteGrade(" + object.name + ")");
    tr.append(deletebutton);

    let editbutton = document.createElement("button");
    editbutton.innerHTML = "Edit";
    editbutton.value = object.name;
    editbutton.setAttribute("onclick", "onClickRedirectEdit(" + object.name + ")");
    tr.append(editbutton);
  }

  let divContainer = document.getElementById(elementID);
  divContainer.innerHTML = "";
  divContainer.appendChild(table);
}


//AJAX Call to GET grades based on a classname query.
let getGrades = () => {
  let xhttp = new XMLHttpRequest();
  let classname = myStorage.getItem('classname');
  document.getElementById("gradepage_div_title_headline").innerHTML = "Grades for " + classname;
  xhttp.open("GET", endPointRoot + "grade?classname=" + classname + "&apikey=" + key, true);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      buildGradeTable(xhttp.response, "gradepage_list");
    }
  }
}

//AJAX Call to POST a new grade.
let postGrade = (newname, newgrade) => {
  let classname = myStorage.getItem('classname');
  console.log(newname);
  console.log(newgrade);
  let studentJSON = JSON.stringify({
    "name": newname,
    "score": newgrade
  });
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", endPointRoot + "grade?classname=" + classname + "&apikey=" + key, true);
  xhttp.send(studentJSON);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      alert(this.responseText);
    }
    location.reload();
  }
}



//AJAX Call to DELETE an existing grade.
let deleteGrade = (gradename) => {
  let classname = localStorage.getItem("classname");
  console.log(gradename.value);
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", endPointRoot + "grade?gradename=" + gradename.value + "&classname=" + classname + "&apikey=" + key, true);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      alert(this.responseText);
    }
    location.reload();
  };
};

//AJAX Call to PUT new details of a Class.
let putClass = () => {
  let newclassname = prompt("Enter the new class name:", this.value);
  if (newclassname !== null || newclassname !== "") {
    let classJSON = {
      "name": newclassname
    };
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", endPointRoot + "class?classname=" + this.value + "&apikey=" + key, true);
    xhttp.send(classJSON);
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
      }
    }
  }
}

//onClick Method to add a new grade.
let onClickPostGrade = () => {
  let newgradename = document.getElementById("gradepage_input_gradename").value;
  let newgradescore = document.getElementById("gradepage_input_gradescore").value;
  postGrade(newgradename, newgradescore);
}

