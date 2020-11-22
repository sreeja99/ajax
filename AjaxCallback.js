let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime(){
    const date = new Date();
    return date.getHours() +"Hrs:"+date.getMinutes() + "Mins:" +date.getSeconds()+"Secs";
}

function makeAJAXcall(methodType,url,callback,async=true,data=null){
    let xhr =  new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4){
            if(xhr.status==200||xhr.status==201){
                callback(xhr.responseText);
            }
            else if(xhr.status >=400){
                console.log("Handle 400 Client Error or 500 Server Error at : "+showTime()); 
            }
        }
    }
    xhr.open(methodType,url,async);
    if(data){
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(data));
    }
    else 
        xhr.send();
    console.log(methodType+" request sent to server at "+showTime());
}

const getURL = "http://localhost:3000/employees/1";
function getUserDetails(data){
    console.log("Get user data at: "+showTime()+": DATA : "+data);
}
makeAJAXcall("GET",getURL,getUserDetails,true);
console.log("Made GET AJAX call to server at "+showTime());
const deleteURL = "http://localhost:3000/employees/3";
function userDeleted(data){
    console.log("User Deleted at: "+showTime()+" data: "+data);
}
makeAJAXcall("DELETE",deleteURL,userDeleted,false);
console.log("Made DELETE AJAX call to server at "+showTime());

const postURL = "http://localhost:3000/employees";
const emplData = {"name":"Harry","salary":"5000"};
function userAdded(data){
    console.log("User Adde at: "+showTime()+" data: "+data);
}
makeAJAXcall("POST",postURL,userAdded,true,emplData);
console.log("Made POST AJAX call to server at "+showTime());
