
console.log('jslaunched')
var inputed ;    
//needed for add
var idIncrement = 0;



// alert('Ahoy');

//ADD THE TASK 

//When you click the button lauch
document.getElementById("button").addEventListener("click", add);
// When you use enter in the field
document.getElementById("task").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        add ()
    }
});

//create and display everything for the task
function add () {
    //get the text you entered in the field
    inputed = document.getElementById("task").value;
    // Capitalize the first character;
    inputed =inputed.charAt(0).toUpperCase() + inputed.slice(1);
    //does the function if it's not empty
    if (!inputed==''){
        //gives me a different id each time
        ++idIncrement;
        //create all my tags 
        var li = document.createElement("li");   
        var input = document.createElement("input");
        var label = document.createElement("label"); 
        //add all my attributes
        input.className = 'inputToCheck'​​​​;
        input.setAttribute( 'type', 'checkbox' );
        input.setAttribute('id', "test"+idIncrement)
        label.setAttribute('for', 'test'+idIncrement)
        label.className = 'label'
        li.className='liToCheck';
        //add the value in the label tag
        label.innerHTML = inputed;
        // add as a child my other tags
        li.appendChild(input); 
        li.appendChild(label);
        
           console.log(li);
        //add all. 
        document.getElementById("ulList").appendChild(li);
        
        //empty the field
        document.getElementById("task").value ='';
        
    }
    // if it's empty
    else { alert('Type somenthing in ! ')}
}

//SORT IF ITS UNCHECKED/ tasks to do
document.getElementById("ToDoItems").addEventListener("change",function (){
    var inputToCheck = document.querySelectorAll('.inputToCheck');
    
    inputToCheck.forEach(function(element) {
        console.log(inputToCheck)
        var isItChecked = element.checked; 
        if (isItChecked) { element.parentNode.style.display  = "none";}
        else { element.parentNode.style.display  = "block";}
        
    });
});

//SORT IF ITS CHECKED
document.getElementById("DoneItems").addEventListener("change",function (){
    var inputToCheck = document.querySelectorAll('.inputToCheck');
    
    inputToCheck.forEach(function(element) {
        var isItChecked = element.checked;
        if (!isItChecked) {  element.parentNode.style.display  = "none";}
        else {   element.parentNode.style.display  = "block";}
    });
    
});
//SORT ALL
document.getElementById("AllItems").addEventListener("change",function  (){
    var inputToCheck = document.querySelectorAll('.inputToCheck');
    
    inputToCheck.forEach(function(element) {
        element.parentNode.style.display  = "block";
    });
    
});

// document.addEventListener("unload",function (){
    window.onbeforeunload = function(){
        // Do something
     
    localStorage.setItem('b','c');
    console.log('ok')
}