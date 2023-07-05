`use strict`;
function refreshTime() {
  const localDate = document.getElementById("date");
  const timeToNextEvent = document.getElementById("timeToNextEvent");
  const nextEvent = document.getElementById("nextEvent");
  const nextEventsList = document.getElementById("nextEventsList");

  var data;
  readTextFile("schedule.json", function(text){

    const dateString = new Date().toLocaleDateString();
    const formattedDate = dateString.replace(", ", " - ");

    data = JSON.parse(text);
    console.log(data);

    //var data = '[["2023-06-24T16:15:00","Free Practice 2"],["2023-06-24T17:15:00","Free Practice 2"],["2023-06-25T18:25:00","Free Practice 2"], ["2023-06-25T19:55:00","Free Practice 2"]]';
    //data = JSON.parse(data);

    // CREATE LIST
    var list = "<ul>";

    var i = 0;
    for (let element of data) {

      //console.log(element);
      //console.log(element[0]);
      //console.log(element[1]);

      let date1 = new Date().getTime();
      let date2 = Date.parse(element[0]);

      //console.log(date1);
      //console.log(date2);

      var result = ""
      var nextEventValue = ""
      if (date1 < date2) {
        //result = (`${dateString} is less than ${nextEvent}`);
        // Stop loop, we found the next event in program
        //result = "date1>date2"+" - "+date1+" - "+element[0]+" - "+i;
        const formattedNextEvent = new Date(date2).toLocaleTimeString();
        //console.log(formattedNextEvent);
        const formatNextEventHHmm = (new Date(date2).getHours()<10?'0':'') + new Date(date2).getHours() +":"+ (new Date(date2).getMinutes()<10?'0':'') + new Date(date2).getMinutes();

        //console.log(formatNextEventHHmm);
        const deltaTime = date2-date1;
        nextEventValue = formatNextEventHHmm+" - "+ element[1];

        if (deltaTime > 86400000) {
          timeToNextEventValue = "in " + Math.floor(deltaTime/1000/3600/24) + " days, " + new Date(deltaTime-3600000).getHours() +" hours and "+ new Date(deltaTime).getMinutes()+ " minutes";
        } else {
          timeToNextEventValue = "in " + new Date(deltaTime-3600000).getHours() +" hours and "+ new Date(deltaTime).getMinutes()+ " minutes";
        }



        break;
      } else if (date1 > date2) {
        //result = (`${dateString} is greater than ${nextEvent}`);
        // Continue loop until finding next events, do nothing
        nextEventValue = "date1>date2"+" - "+date1+" - "+element[0]+" - "+i;
        timeToNextEventValue = "date1>date2"+" - "+date1+" - "+element[0]+" - "+i;

      } else {
        //result = (`Both dates are equal`);

        const formattedNextEvent = new Date(date2).toLocaleTimeString();
        nextEventValue = formattedNextEvent +" - "+ element[1];
        timeToNextEventValue = formattedNextEvent;

        break;
      }
      i++;
    }


    var i = 0;
    for (let element of data) {

      let date1 = new Date().getTime();
      let date2 = Date.parse(element[0]);

      let dateEvent = new Date(date2)
      const dateString = dateEvent.toLocaleDateString();
      const formattedDate = dateString.replace(", ", " - ");

      const dayString = dateEvent.getDate();
      const monthString = dateEvent.getDate();

      const formatNextEventHHmm = (dateEvent.getDate()<10?'0':'') + dateEvent.getDate()+ "/" + (dateEvent.getMonth()<10?'0':'') + dateEvent.getMonth() + " - " + (dateEvent.getHours()<10?'0':'') + dateEvent.getHours() +":"+ (dateEvent.getMinutes()<10?'0':'') + dateEvent.getMinutes();


      if (date1 < date2) {
        // Add to Event LIST
        if (i<= 30) {
          list +=
          `<li>
          <div class="list_-item-y48xfc" style="margin-top:${i*42}px">
            <div class="rectangle-Hkuhi7">
            </div><p class="x1515-free-practic-Hkuhi7 x1515-free-practic">${formatNextEventHHmm+" - "+ element[1]}<br></p>
          </div>
          </li>`;
        }
      } else if (date1 > date2) {
        i--;
      }
      i++;
    }
    list += "</ul>";

    // Publish Results
    localDate.textContent = formattedDate;
    timeToNextEvent.textContent = timeToNextEventValue;
    nextEvent.textContent = nextEventValue;
    nextEventsList.innerHTML = list;

  });


}
function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  }
  rawFile.send(null);
}

refreshTime();
setInterval(refreshTime, 5000);