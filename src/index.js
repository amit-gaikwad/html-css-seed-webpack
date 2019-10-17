import './css/style.css';

function getNumberOfRequests(num) {
    var requests = [];
    for (let i = 1; i <= num; i++) {
        requests.push({ reqId: i });
    }
    return requests;
}

function handleAjaxCall(number,requests,callback){
    if(number < requests.length){
        doAjax(requests[window.nextRequestNumber]).then((res) => {
            window.nextRequestNumber +=1;
            window.countOfExecution +=1;
            if(window.countOfExecution === requests.length){
                callback();
            }
            handleAjaxCall(window.nextRequestNumber,requests,callback)
        })
    }else{
        return;
    }
}

function callPoolRequests(poolSize,requests, callback){
    window.nextRequestNumber =-1;
    window.countOfExecution = 0;
    for(let i=0;i<poolSize;i++){
        window.nextRequestNumber+= 1;
        handleAjaxCall(window.nextRequestNumber, requests,callback);
    }
}


function doAjax(obj) {
    console.log(obj,"is started");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ name: "amit", reqId: obj.reqId });
            console.log(obj,"is ended");
        }, (Math.random() * 1000000) % 5000)
    });

}

var requests = getNumberOfRequests(20);
callPoolRequests(5, requests, ()=>{
    console.log("Successfully Executed...")
});

