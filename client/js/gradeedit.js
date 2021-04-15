//AJAX Call to PUT an existing grade.
let putGrade = () => {
  let newname = document.getElementById("input_gradename");
  let newgrade = document.getElementById("input_gradescore");
  let classname = localStorage.getItem("classname");
  let gradename = localStorage.getItem("gradename");
  let gradeJSON = {
    "name": newname,
    "score": newgrade
  };
  let xhttp = new XMLHttpRequest();
  xhttp.open("PUT", endPointRoot + "grades?gradename=" + gradename + "&classname=" + classname + "&apikey=" + key);
  xhttp.send(gradeJSON);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  }
}