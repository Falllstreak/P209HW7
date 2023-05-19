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


function createListSubset(whichType) {
    // clear prior data
    var hikeListul = document.getElementById("hikeListul");
    hikeListul.innerHTML = "";

    var ul = document.createElement('ul');
    HikeArray.forEach(function (element,) {
        if (element.Genre === whichType) {
            // use handy array forEach method
            var li = document.createElement('li');
            // adding a class name to each one as a way of creating a collection
            li.classList.add('oneHike');
            // use the html5 "data-parm" to encode the ID of this particular data object
            // that we are building an li from
            li.setAttribute("data-parm", element.ID);
            li.innerHTML = element.ID + ":  " + element.Title + "  " + element.Genre;
            hikeListul.appendChild(li);
        }
    });


    // now we have the HTML done to display out list, 
    // next we make them active buttons
    // set up an event for each new li item, 
    var liArray = document.getElementsByClassName("detailList");
    Array.from(liArray).forEach(function (element) {
        element.addEventListener('click', function () {
            // get that data-parm we added for THIS particular li as we loop thru them
            var parm = this.getAttribute("data-parm");  // passing in the record.Id
           
            localStorage.setItem('parm', parm);
            // but also, to get around a "bug" in jQuery Mobile, take a snapshot of the
            // current movie array and save it to localStorage as well.
            let stringHikeArray = JSON.stringify(HikeArray); // convert array to "string"
            localStorage.setItem('HikeArray', stringHikeArray);
            // now jump to our page that will use that one item
            document.location.href = "index.html#details";
            });
        });
 
};
// page before show code *************************************************************************
    // page before show code *************************************************************************
    $(document).on("pagebeforeshow", "#ListAll", function (event) {   // have to use jQuery 
        createList();
    });

    $(document).on("pagebeforeshow", "#ListSome", function (event) {   // have to use jQuery 
        // clear prior data
        var hikeListul = document.getElementById("hikeListul");
        hikeListul.innerHTML = "";
    });

    // need one for our details page to fill in the info based on the passed in ID
    $(document).on("pagebeforeshow", "#details", function (event) {   
        let localParm = localStorage.getItem('parm');  // get the unique key back from the dictionairy
        // next step to avoid bug in jQuery Mobile,  force the movie array to be current
        HikeArray = JSON.parse(localStorage.getItem('HikeArray'));  
 
        let localID = GetArrayPointer(localParm); // map to which array element it is
        
 
      // no longer using pointer -1 now that we have real keys
      // document.getElementById("oneTitle").innerHTML = "The title is: " + movieArray[localID-1].Title;

        document.getElementById("trailInput").innerHTML = "The trail is: " + HikeArray[localID].trailInput;
        document.getElementById("locationInput").innerHTML = "The location is: " + HikeArray[localID ].locationInput;
        document.getElementById("distanceInput").innerHTML = "Distance: " + HikeArray[localID ].distanceInput;
        document.getElementById("trailElevation").innerHTML = "Average trail elevation: " + HikeArray[localID].trailElevation;
        document.getElementById("trailTime").innerHTML = "Time to complete: " + HikeArray[localID].trailTime;
        document.getElementById("oneURL").innerHTML = HikeArray[localID].URL;
    });
 
// end of page before show code *************************************************************************