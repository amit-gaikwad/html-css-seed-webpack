import './css/style.css';

function getNumberOfRequests(num) {
    var requests = [];
    for (let i = 1; i <= num; i++) {
        requests.push({ reqId: i });
    }
    return requests;
}

export function callPoolRequests(poolSize, totalRequests, callback) {
    var requests = getNumberOfRequests(totalRequests);
    window.nextRequestNumber = 0;
    for (let i = 0; i < poolSize; i++) {
        window.nextRequestNumber = i;
        doAjax(requests[window.nextRequestNumber]).then((res) => {
            if (window.nextRequestNumber < totalRequests) {
                window.nextRequestNumber += 1;
                doAjax(requests[window.nextRequestNumber]).then((res) => {
                    if (window.nextRequestNumber < totalRequests) {
                        window.nextRequestNumber += 1;
                        doAjax(requests[window.nextRequestNumber]).then((res) => {
                            if (window.nextRequestNumber < totalRequests) {
                                window.nextRequestNumber += 1;
                                doAjax(requests[window.nextRequestNumber]).then((res) => {
                                    if (window.nextRequestNumber < totalRequests) {
                                        window.nextRequestNumber += 1;
                                    }
                                    console.log(res);
                                })
                            }
                            console.log(res);
                        })
                    }
                    console.log(res);
                })
            }
            console.log(res);
        }).catch((err) => {
            console.log("err");
        })
    }
}

function handleAjax(requests, nextRequestNumber,totalRequests, callback){
    doAjax(requests[nextRequestNumber]).then((res) => {
        if (nextRequestNumber < totalRequests) {
            nextRequestNumber += 1;
        }
        console.log(res);
    })
}

function doAjax(obj) {
    console.log("" + (Math.random() * 1000000) % 10);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ name: "amit", reqId: obj.reqId })
        }, (Math.random() * 1000000) % 5000)
    });

}

callPoolRequests(5, 20);

/* 
export function callPoolRequests(poolSize, requests, callback, isNew = true) {
    let totalRequests = requests.length;
    if(isNew){
        window.allRequestsNumber=requests.length;
        window.nextRequestNumber = -1;
        for (let i = 0; i < poolSize; i++) {
            window.nextRequestNumber += 1;
            doAjax(requests[window.nextRequestNumber]).then((res) => {
                console.log(res);
                if (window.nextRequestNumber < totalRequests) {
                    window.nextRequestNumber += 1;
                    callPoolRequests(1, requests,undefined,false);
                }
            }).catch((err) => {
                console.log("err");
            })
        }
    }else{
        doAjax(requests[window.nextRequestNumber]).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log("err");
        })
        callPoolRequests(1, requests,undefined,false)
    }
}


function doAjax(obj) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ name: "amit", reqId: obj.reqId })
        }, (Math.random() * 1000000) % 5000)
    });

}
 */
