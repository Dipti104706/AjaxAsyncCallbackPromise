//let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; 
//it is not require as in browser level call it is already available
//using promises 
function makePromiseCall(methodType,url,async=true,data=null)
{
    return new Promise(function(resolve,reject)
    {
    let xhr = new XMLHttpRequest();
    //onload and onerror handler used here inplace of onreadystatechange()
    //onload perform during http connection
    xhr.onload=function()
    {
        console.log("State Change Called... Ready State: "+xhr.readyState+" Status: "+xhr.status);
        
         if(xhr.status.toString().match('^[2][0-9]{2}$'))
         {
             resolve(xhr.responseText);
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
    //onerror after http connection
    xhr.onerror = function(){
        reject({
            status:this.status,
            statusText:xhttp.statusText
        });
    };
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