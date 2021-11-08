let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; //Using Xmlhttp module to make ajax call
function showTime()
{
    const date=new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Minutes:" + date.getMilliseconds() + "MilliSeconds:";
}
//ajax call
function makeAJAXCall(methodType,url,callBack,async=true,data=null) //data is null, becz we dont post any data,just retrieving
{
    let xhr = new XMLHttpRequest(); //new object
    xhr.onreadystatechange=function() //event listener to see ,when xhr received response what state change occure , means from the establishing connection to, 
                                        //is the server respond or is the server complete the request everything will be seen here with ready state codes and status
                                        //registering a event listener to keep updated when ever any state change occures it ll update me 
    {
        //console.log("State Change Called at:"+showTime()+"... Ready State: "+xhr.readyState+" Status: "+xhr.status);
        if(xhr.readyState===4)
        {
            console.log("State Change Called... Ready State: "+xhr.readyState+" Status: "+xhr.status);
            if(xhr.status===200||xhr.status===201)
            {
                callBack(xhr.responseText); //callback happen only when it is success 
            }
            else if(xhr.status>=400)
            {
                console.log("Handle 400 client error or 500 server error at: "+showTime());
            }
        }
    }
    xhr.open(methodType,url,async); //opening a connection(connection got established through this)
    //for post operation
    if(data)
    {
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(data));
    }
    else
    {
        xhr.send();//sending the request to server
    }
    console.log(methodType+" request send to the server at:"+showTime());
}
//getting data form json
const getURL="http://localhost:3000/employees/1";
function getUserDetails(data)
{
    console.log("Get User Data at: "+showTime()+ "data: "+data);
}
makeAJAXCall("GET",getURL,getUserDetails);
console.log("Made GET AJAX call to server:"+showTime());

//delete operation 
const deleteURL="http://localhost:3000/employees/3";
function userDeleted(data)
{
    console.log("User Deleted: "+data);
}
makeAJAXCall("DELETE",deleteURL,userDeleted,false);//delete call is synchronous here taken as false so it will perform first. because i dont want to crete conflict in creating id , so i want to perform post call after delete operation to make the id same 
console.log("Made DELETE AJAX call to server:"+showTime());
//post call
const postURL="http://localhost:3000/employees";
const empData={"first_name":"Shriya","salary":"80000"};
function userAdded(data)
{
    console.log("User added : "+data);
}
makeAJAXCall("POST",postURL,userAdded,true,empData);
console.log("Made POST AJAX call to server:"+showTime());