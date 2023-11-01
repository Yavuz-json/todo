listAll(); //refresh on start

//add new line to database
function add() {
    var getTitle = document.getElementById("title").value;
    var getDate = new Date(document.getElementById("dateTimePicker").value);
    var now = new Date();

    var todoItem = {
        title: getTitle,
        date: formatDate(getDate),
        createdDate: formatDate(now),
        isMarked: false
    };

    var userString = JSON.stringify(todoItem);
    
    var startKeyCounter = 0;
    while (localStorage.getItem(startKeyCounter) !== null) {
        startKeyCounter++;
    }

    localStorage.setItem(startKeyCounter, userString);

    listAll();
}

//refresh the screen
function listAll() {
    document.getElementById("unMarkedPanel").innerHTML = "";
    document.getElementById("markedPanel").innerHTML = "";

    var keys = Object.keys(localStorage).sort(function(a, b){return b-a});

    for(var i=0;i<keys.length;i++) {
        var key = keys[i];
        var localAsList = JSON.parse(localStorage.getItem(key));
        var isCheckedVariable = " ";
        if (localAsList.isMarked == true) {
            isCheckedVariable = " checked "

            document.getElementById("markedPanel").innerHTML += (
            `<div class="todoItem">
            <input class="checkBox" type="checkbox" ` + isCheckedVariable + ` id="` + key + `" onchange="handleCheckboxChange(` + key + `)">
            <p class="title">`+ localAsList.title +`</p>
            <p class="date">` + localAsList.date + `</p>
            <p class="createdDate">Created: ` + localAsList.createdDate + `</p>
        </div>`)
            
        }
        else {
            document.getElementById("unMarkedPanel").innerHTML += (
                `<div class="todoItem done">
                <input class="checkBox" type="checkbox" ` + isCheckedVariable + ` id="` + key + `" onchange="handleCheckboxChange(` + key + `)">
                <p class="title">`+ localAsList.title +`</p>
                <p class="date">` + localAsList.date + `</p>
                <p class="createdDate">Created: ` + localAsList.createdDate + `</p>
            </div>`)
        }
    }
}

//convert the date input to string
function formatDate(date) {
    var month = '' + (date.getMonth() + 1);
    var day = '' + date.getDate();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    //add leading zeroes if necessary
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    return [day, month, year].join('/') + ' ' + [hours, minutes, seconds].join(':');
}

//clear localstorage
function destroy() {
    localStorage.clear();
    listAll();
}

//check box listener
function handleCheckboxChange(id) {
    var localAsList = JSON.parse(localStorage.getItem(id));

    localAsList.isMarked = document.getElementById(id).checked;

    localStorage.setItem(id, JSON.stringify(localAsList));
    listAll();
}