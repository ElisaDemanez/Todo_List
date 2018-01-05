  Materialize.toast('Hello', 4000, 'red') // 4000 is the duration of the toast
var inputed ;
var Increment = 0; 
var checkboxed;

var keys = Object.keys(localStorage);
for (i = 0; i < keys.length; i++) {

    var myKey = localStorage.key(i)

}

function createLi (spanHTML,ToInput, myitem) {
 //gives me a different id each time
 Increment++;
//create all my tags 
var li = document.createElement("li");   
var input = document.createElement("input");
var label = document.createElement("label"); 
var a = document.createElement("a")
var span = document.createElement('span')
a.setAttribute('class','waves-effect waves-teal btn-flat deleter');
a.setAttribute('id','deleter')
a.setAttribute('onclick','remove(this)')
a.innerHTML ='Delete it !';
span.innerHTML= '<br>'+spanHTML;
//add all my attributes
input.setAttribute('class', 'inputToCheck');
input.setAttribute( 'type', 'checkbox' );
input.setAttribute('id', "test"+Increment)
label.setAttribute('for', 'test'+Increment)
label.className = 'label';
li.className='liToCheck';
//add the value in the label tag
label.innerHTML = ToInput;
// add as a child my other tags
li.appendChild(input); 
li.appendChild(label);
li.appendChild(span);
li.appendChild(a);

// Create a listener each time. ( that calls a function to do stuff when it's checked)
li.addEventListener("change",whenChecked);

if (myitem) {
//get if it was checked:true in the storage and recheck it
if (myitem.checked === "true") {
    li.childNodes[0].checked= true;
    // if checked ten it has done time. replace the creation date by it. 
    span.innerHTML= '<br>Done in '+myitem.achievedInDays+' days and '+myitem.hours+'h '+myitem.minutes+'m.'
}



}

return li;
}

// GET LOCALSTORAGE
getStorage();
function getStorage() {

    var keys = Object.keys(localStorage);
// go through all keys

//FOR UL ONLY ( two for loop in order to create the ul 1st)
for (i = 0; i < keys.length; i++) {

    var myKey = localStorage.key(i)
        // i've added a "u" in front of all my ul keys to know it's ul
        if (myKey.charAt(0)=="u") {
            var StoredItem = localStorage.getItem(keys[i])
            Increment++;
         // add the whole ul 
         document.getElementById('allList').insertAdjacentHTML('beforeend', "<div class=\"ulOuterBlock\">\n    <ul class=\"ulList\" id=\"ul"+StoredItem+"\">\n  <div class=\"onlyAlignRow\"> \n  <h5>"+StoredItem+" :</h5>\n <p>\n  <input type=\"checkbox\" class=\"filled-in favorite\" id=\"filled-in-box"+StoredItem+"\"  />\n <label for=\"filled-in-box"+StoredItem+"\">Favorite</label>\n  </p>\n </div>\n </ul>\n  <span class=\"ulDeleter\">\n <a class=\"waves-effect waves-teal btn-flat deleter ulDeleter\" id=\"ulButton"+StoredItem+"\" onclick=\"removeUl(this)\">Delete it!</a>\n  </span>\n  </div>")
        // add the radio selector
        document.getElementById('selectList').insertAdjacentHTML('beforeend'," <li>\n  <input type=\"radio\" name=\"selectList\" class=\"with-gap\"  id=\"Button"+StoredItem+"\" />\n  <label for=\"Button"+StoredItem+"\">"+StoredItem+"</label>\n     </li>\n  ")

    }
}
//FOR LI ONLY 
for (i = 0; i < keys.length; i++) {
    var myKey = localStorage.key(i)

    if (myKey.charAt(0)=="l") {
    // 3 var as the old infos I need
    var StoredItem = JSON.parse(localStorage.getItem(keys[i]))
    // Storage: input  {"date":1515054760485
    var StoredDate = StoredItem.date; 
    var StoredInput = localStorage.key(i);
    StoredInput = StoredInput.substr(3);
    var whichUl = StoredItem.list;
    

    //I recreate a whole LI as if it was a new one. 
    //retransform date in readable one 
    var myLiDate =getFullDate(new Date(StoredDate));
    var myLi= createLi(myLiDate, StoredInput,StoredItem)
    // I create all my li the same, but what changes between creation and localstro is : the date, the input, and if it was checked of not. 
    document.getElementById(whichUl).appendChild(myLi);
}
}} 





// BUTTON ADD (to be able to use enter)
//When click button
document.getElementById("button").addEventListener("click", add);
// When Enter pressed in the field
document.getElementById("task").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        add ()
    }
});


//CREATE AND DISPLAY FULL LI
function add (checkboxed) {
    var ulToChoose ;
    // gets the id according to the button selectec
    document.querySelectorAll('input[name=selectList]')
    .forEach(function(e) {
        // since its radio button, only one can be checked. So my 'if' = "for the one that's checked"
        if (e.checked == true ) { 
            // gets my button id and transforms it to my ulid
            ulToChoose = e.id; 
            ulToChoose = ulToChoose.slice(6)
            ulToChoose = "ul"+ulToChoose
            console.log(ulToChoose)
            
        }

    });
        // If no list selected ( as a else instead of if in my foreach it would do an alert for each button unchecked)
        if(ulToChoose == null) {alert('You have to choose a list !')}


            inputed = document.getElementById("task").value;
            // Capitalize the first character;
            inputed =inputed.charAt(0).toUpperCase() + inputed.slice(1);
if ('li-'+inputed in localStorage) {}
            if (inputed!=''){
            //Get the date in sec first to localstore it, to be able be calculate the diff 
            var dateInSeconds = new Date().getTime();
            var date =getFullDate(new Date(dateInSeconds))
            //Create LI and add it
            var newli = createLi (date,inputed,false)
            //ulToChoose is theradiobutton selected
            document.getElementById(ulToChoose).appendChild(newli);
            //localSto it
            var values =JSON.stringify({ date: dateInSeconds, checked: 'false', list: ulToChoose})
            localStorage.setItem("li-"+inputed, values);
            //empty the field
            document.getElementById("task").value ='';

        }
        // if input empty
        else { alert('Type somenthing in ! ')}
    }




// CREATE A UL 
document.querySelector("#createUlButton").addEventListener("click", function () {

    //get the text you entered in the field
    inputed = document.getElementById("listEntry").value;
    //does the function if it's not empty
    if (!inputed==''){

        // Capitalize the first character;
        inputed =inputed.charAt(0).toUpperCase() + inputed.slice(1);

        //gives me a different id each time
        Increment++;
         // add the whole ul 
         document.getElementById('allList').insertAdjacentHTML('beforeend', "<div class=\"ulOuterBlock\">\n    <ul class=\"ulList\" id=\"ul"+inputed+"\">\n  <div class=\"onlyAlignRow\"> \n  <h5>"+inputed+" :</h5>\n <p>\n  <input type=\"checkbox\" class=\"filled-in favorite\" id=\"filled-in-box"+inputed+"\"  />\n <label for=\"filled-in-box"+inputed+"\">Favorite</label>\n  </p>\n </div>\n </ul>\n  <span class=\"ulDeleter\">\n <a class=\"waves-effect waves-teal btn-flat deleter ulDeleter\" id=\"ulButton"+inputed+"\" onclick=\"removeUl(this)\">Delete it!</a>\n  </span>\n  </div>")
        // add the radio selector
        document.getElementById('selectList').insertAdjacentHTML('beforeend'," <li>\n  <input type=\"radio\" name=\"selectList\" class=\"with-gap\"  id=\"Button"+inputed+"\" />\n  <label for=\"Button"+inputed+"\">"+inputed+"</label>\n     </li>\n  ")
        //empty field
        document.getElementById("listEntry").value ='';
        localStorage.setItem("ul-"+inputed, inputed)
    }


    else { alert('Type somenthing in ! ')}

})




//DELETE LI  BUTTON 
function remove(link) {
    //confirm is an alert box that returns true/false
    if (confirm("Are you sure you want to delete it ? ") == true) {
        link.parentNode.parentNode.removeChild(link.parentNode);
        // gets the text in my label and remove it from localSto
        var listText = link.previousSibling.previousSibling.innerHTML

        localStorage.removeItem("li-"+listText);
    }       
}




// DELETE UL
function removeUl(link) {

//confirm is an alert box that returns true/false
if (confirm("Are you sure you want to delete it ? ") == true) {
       //Gets the name of my ul, delete the " :" and add "ul-" to transform it as my key, in order to delete in in localSto
       myUlName= link.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1].innerHTML
       myUlName = myUlName.slice(0,-2)
       // console.log(myUlName)
       
       myListName="ul"+myUlName
        // to delete all li that was in ul. 
        var keys = Object.keys(localStorage);
        for (i = 0; i < keys.length; i++) {

            console.log(i)
            var myKey = localStorage.key(i)
            console.log("mykey  ",myKey)

        //if it's li
        if (myKey.charAt(0)=="l") {
            console.log('okokokyepyepype')
            console.log(localStorage.getItem(keys[i]))
            var StoredItem = JSON.parse(localStorage.getItem(keys[i]));            
            var StoredList = StoredItem.list;

            if(StoredList == myListName) {

                console.log('deleted')
                localStorage.removeItem(myKey)
                //if you delete one, update numb of keys
                keys = Object.keys(localStorage);
                console.log('keylenght  ',keys.length)
            }
        }
    }

    console.log(myUlName)
    myUlKeyName= "ul-"+myUlName
    console.log(myUlKeyName)
    localStorage.removeItem(myUlKeyName);

    myUlBox= link.parentNode.parentNode
    myUlBox.remove();

        // remove the ul selector button
        var identifier= link.id.substr(2);
        var ulbutt = document.querySelector('input[id='+identifier+']')
        ulbutt.parentNode.remove(); 
        
    }    
}



//FILTER FUNCTION
document.querySelector('.sorting').addEventListener("change",function(e) {
    var inputToCheck = document.querySelectorAll('.inputToCheck');
    
    //the element.target will be one of your button, since it's the only elements we have.

    //SORT IF ITS UNCHECKED/ TASKS TO DO
    if (e.target.id == 'ToDoItems') {

        inputToCheck.forEach(function(element) {
            var isItChecked = element.checked; 
            if (isItChecked) { element.parentNode.style.display  = "none";}
            else { element.parentNode.style.display  = "block";}
        });
    }
    //SORT IF ITS CHECKED
    if (e.target.id == 'DoneItems') {
        inputToCheck.forEach(function(element) {
            var isItChecked = element.checked;
            if (!isItChecked) {  element.parentNode.style.display  = "none";}
            else {   element.parentNode.style.display  = "block";}
        });
    }
    //SORT ALL
    if (e.target.id =='AllItems') {
        inputToCheck.forEach(function(element) {
            element.parentNode.style.display  = "block";
        });

    }
    e.stopPropagation();       
});
//FILTER FAVORITES DISPLAY
document.querySelector('#selectFavorites').addEventListener("change", function () 
{
    var fav = document.querySelectorAll('.favorite');

    if(this.checked) {
        fav.forEach(function(el){
            if (!el.checked) {el.parentNode.parentNode.parentNode.parentNode.style.display  = "none"}
        })
    }
    //redisplay everything when unchecked
    else {
        fav.forEach(function(el){
            el.parentNode.parentNode.parentNode.parentNode.style.display  = "block"
        })
    }
})




//Change the date and store te fact it's checked
function whenChecked(){
    var taskName = this.childNodes[1].innerHTML;
    // get its localstorage version
    var taskStored =JSON.parse(localStorage.getItem("li-"+taskName))

    //this.childNodes[0] = the <input>
    if (this.childNodes[0].checked) {
        //DATE 
        var dateInSeconds = new Date().getTime();
        var dateDiff = (dateInSeconds -taskStored.date)/ 1000 ;

        //whats () is important, the mathfloor% round it.
        var diffInDay= Math.floor(dateDiff/86400) 
        // get what's left from the day. the *86400 retransform it in ms . 
        dateDiff = Math.floor(dateDiff -= diffInDay * 86400)

        var diffInHours= Math.floor(dateDiff/3600) ; 
        dateDiff = Math.floor(dateDiff -= diffInHours * 3600)
        var diffInMinutes = Math.floor(dateDiff/60);


        var textInLabel = this.childNodes[2]
        
        textInLabel.innerHTML ='<br>Done in '+diffInDay+' days and '+diffInHours+'h '+diffInMinutes+'m.';

        okgo = JSON.stringify({ date: taskStored.date, checked:'true',list: taskStored.list, achievedInDays:diffInDay, hours:diffInHours, minutes:diffInMinutes })
    }

    if (!this.childNodes[0].checked) {

    // Reput the creation date if unchecked
    var textInLabel = this.childNodes[2]


    //replace back the text by the original date
    textInLabel.innerHTML ='<br>'+getFullDate(new Date(taskStored.date));

    okgo = JSON.stringify({ date:taskStored.date, checked:'false',list: taskStored.list })

}

localStorage.setItem('li-'+taskName, okgo)  
};




function getFullDate(d){

    var day = d.getDate();
    var month = d.getMonth()+1;
    var year = d.getFullYear();
    var hour = d.getHours();
    var minutes = d.getMinutes();
    var fulldate = day+'/'+month+'/'+year+' '+hour+'h'+minutes ;
    return fulldate

}
