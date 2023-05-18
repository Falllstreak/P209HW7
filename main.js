let HikeArray = [];

let HikeObject = function(pTrail, pWhere, pWhen, pTOD, pDistance, pElevation, pTime, pNotes) {
  this.ID = Math.random().toString(16).slice(5)
  this.trailname = pTrail;
  this.where = pWhere;
  this.when = pWhen;
  this.timeofday = pTOD;
  this.distance = pDistance;
  this.elevation = pElevation;
  this.time = pTime;
  this.note = pNotes;
}

HikeArray.push(new HikeObject("Hike Mountain", "Washington", "2023-05-01", "Evening", "8 Miles", "345 Feet", "3 hours", "This felt so much longer than it was."));
HikeArray.push(new HikeObject("Hike Hill", "Colorado", "2020-08-22", "Morning", "12 Miles", "570 Feet", "6 hours", "I don't recommend mornings for this one."));
HikeArray.push(new HikeObject("Hike View", "Oregon", "2018-07-09", "Night", "3 Miles", "200 Feet", "1 hours", "Easiest hike ever!"));

let selectedTOD = "";

// code runs immediately
//================================================================

// runs  when dom is loaded
document.addEventListener("DOMContentLoaded", function(event) {

  createList();

  document.getElementById("buttonAdd").addEventListener("click", function() {
    HikeArray.push(new HikeObject(
      document.getElementById("trailInput").value,
      document.getElementById("locationInput").value,
      document.getElementById("dateInput").value,
      selectedTOD,
      document.getElementById("distanceInput").value,
      document.getElementById("trailElevation").value,
      document.getElementById("trailTime").value,
      document.getElementById("noteInput").value,
      // movieArray.length,  // set ID
    ));
    document.location.href = "index.html#listHikes";


    createList();
    console.log(HikeArray);
  });

  $(document).bind("change", "#select-TOD", function(event, ui) {
    selectedTOD = $('#select-TOD').val();
  });

  $(document).on("pagebeforeshow", "#listHikes", function(event) { // have to use jQuery 
    createList();
  });

});


//======================================
// function defintions
function createList() {
  // clear prior data
  var myul = document.getElementById("hikeListul");
  myul.innerHTML = "";

  HikeArray.forEach(function(element, ) { // use handy array forEach method
    var li = document.createElement('li');
    // added data-role="listview" to the ul in the html
    li.innerHTML = element.trailname + " -    [" + element.when + "]    ";
    myul.appendChild(li);
  });
};