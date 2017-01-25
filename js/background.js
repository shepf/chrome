console.log("background start");

if (jQuery) {
// jQuery 已加载
console.log("jQuery 已加载2");
} else {
// jQuery 未加载
console.log("jQuery 未加载2");
}


var mydata;
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if (message == 'hello') {


        $.ajax({
        type:'POST',
        // url:'http://10.0.13.22:8088/phpMyAdmin/doc/html/test.php',
        url:'http://10.0.13.22:8088/phpMyAdmin/doc/html/test.php',
        data:'rescan=1',
        dataType:'text',
        async:false,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。 注意啦 同步将锁定浏览器 
        timeout:120000,//设置请求超时时间（毫秒）。
        success:function(data)
        {   
        	//注意，async 设置fasle同步，用来阻塞收到消息后sendResponse的直接调用(独立线程)
        	//采用同步后，在成功收到data后，才会调sendResponse。放在$.ajax之外也一样。
            sendResponse(data);

        },
        error:function(a,b,c)
        {
            
        },
        complete:function()//请求完成后回调函数 (请求成功或失败时均调用)。
        {
            
        }

    })

 //    alert(mydata);
 //    var str_test = "she";   
 //    sendResponse(mydata);
	// // sendResponse('hello from background');


	}
});

