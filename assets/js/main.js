
console.log('jslaunched')
var inputed ;    
//needed for add
var idIncrement = 0;
var checkboxed;

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
function add (checkboxed) {
    var ulToChoose ;
    document.querySelectorAll('input[name=selectList]').forEach(
        function(e) {
            // if it's the 1st one that is checked ( since its radio button, only one can be checked)
            
            if (e.id == 'List1' && e.checked == true) { ulToChoose ='ulList1' }
            if (e.id == 'List2'&& e.checked == true) { ulToChoose ='ulList2' }
            
        });
        
        //get the text you entered in the field
        inputed = document.getElementById("task").value;
        // Capitalize the first character;
        inputed =inputed.charAt(0).toUpperCase() + inputed.slice(1);
        //does the function if it's not empty
        if (!inputed==''){
            
            //gives me a different id each time
            idIncrement++;
            
            //Get the date
            var d = new Date();
            var day = d.getDate();
            var month = d.getMonth();
            var year = d.getFullYear();
            var hour = d.getHours();
            var minutes = d.getMinutes();
            var fulldate = day+'/'+month+'/'+year+' '+hour+'h'+minutes ;
            
            
            document.getElementById(ulToChoose).insertAdjacentHTML('beforeend', "<li class=\"liToCheck\"><input type=\"checkbox\" id=\"test"+idIncrement+"\" class=\"inputToCheck\" ><label for=\"test"+idIncrement+"\" class=\"label\">"+inputed+"</label> <span class=\"hiddenDate\"style=\"display: none;\">"+d+"</span> <span><br>"+fulldate+"</span>    <a class=\"waves-effect waves-teal btn-flat deleter\"onclick=\"remove(this)\">Delete it!</a>  </li>");
            // onclick=\"DoneTime(this)\"
            
            //empty the field
            document.getElementById("task").value ='';
            
            
        }
        // if it's empty
        else { alert('Type somenthing in ! ')}
    }
    
    
    //CHANGE DATE WHEN CHECKED
    
    // function DoneTime (){
    
    //     console.log('yesyesys')
    //     var x= document.querySelector()
    //     console.log (x)
    // }
    
    
    //DELETE BUTTON 
    function remove(link) {
        //confirm is an alert box that returns true/false
        if (confirm("Are you sure you want to delete it ? ") == true) {
            link.parentNode.parentNode.removeChild(link.parentNode);
        }
        
    }
    
    //FILTER FUNCTION
    document.querySelector('.sorting').addEventListener("change",function(e) {
        var inputToCheck = document.querySelectorAll('.inputToCheck');
        //the element.target will be one of your button, since it's the only elements we have.
        
        //SORT IF ITS UNCHECKED/ TASKS TO DO
        if (e.target.id == 'ToDoItems') {
            console.log('okoko')
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
    
    //FAVORITES DISPLAY
    document.querySelector('#selectFavorites').addEventListener("change", function () 
    {
        var fav = document.querySelectorAll('.favorite');
        if(this.checked) {
            
            console.log('fav')
            fav.forEach(function(el){
                if (!el.checked) {el.parentNode.parentNode.parentNode.style.display  = "none"}
            })
            
        }
        //redisplay everything when unchecked
        else {
            fav.forEach(function(el){
                el.parentNode.parentNode.parentNode.style.display  = "block"
            })
        }
    })
    
    
    window.onbeforeunload = function(){
        // Do something
        var liToStore = document.querySelectorAll('.liToCheck');
        liToStore.forEach(function(element) {
            // console.log(element)
            // console.log(typeof element)
            // console.log(element.hasOwnProperty())
            // var jsonObject = JSON.stringify(element);
            // console.log(jsonObject)
            //  localStorage.setItem(idIncrement,jsonObject);
            
        });
        
        // console.log('ok')
    }