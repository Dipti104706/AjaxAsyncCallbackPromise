let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
//using promises 
function makePromiseCall(methodType,url,async=true,data=null)
{
    //returning promise object,resolve->success,reject->fail
    return new Promise(function(resolve,reject){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange=function()
        {
            //console.log("State Change Called... Ready State: "+xhr.readyState+" Status: "+xhr.status);
            
            if(xhr.status.toString().match('^[2][0-9]{2}$'))
            {
                resolve(xhr.responseText); //when request is success
            }
            else if(xhr.status.toString().match('^[4,5][0-9]{2}$'))
            {
                reject({
                status:xhr.status,
                statusText:xhr.statusText
                });
                console.log("Handle 400 client error or 500 server error");
            }    
        }
        xhr.open(methodType,url,async);
        if(data)
        {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.send(JSON.stringify(data));
        }
        else
        {
            xhr.send();
        }
        console.log(methodType+" request send to the server");
    });
}

//getting data form json
const getURL="http://localhost:3000/employees/1";
makePromiseCall("GET",getURL,true)
.then(responseText=>{
    console.log("Get user data:"+responseText);
})
.catch(error=>console.log("GET error status:"+JSON.stringify(error)));

//delete operation 
const deleteURL="http://localhost:3000/employees/3";
//once promise received,promise has then() for executing promise,catch() to catch the error if there
makePromiseCall("DElETE",deleteURL,false)
.then(responseText=>{
    console.log("user deleted:"+responseText);
})
.catch(error=>console.log("DELETe error status:"+JSON.stringify(error)));


//post call
const postURL="http://localhost:3000/employees";
const empData={"name":"Dipti","salary":"35000"}
makePromiseCall("POST",postURL,true,empData)
.then(responseText=>{
    console.log("user added :"+responseText);
})
.catch(error=>console.log("POST error status:"+JSON.stringify(error)));