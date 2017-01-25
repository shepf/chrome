// console.log("check_dom_change start");
if (jQuery) {
// jQuery 已加载
// console.log("jQuery 已加载");
} else {
// jQuery 未加载
// console.log("jQuery 未加载");
}

// $("#cronTask11352>tr:nth-child(2)>td:nth-child(7)").text();
//$("#cronTask11352>tr:nth-child(2)>td:nth-child(7)").text().trim().split("%")[0];
// Number($("#cronTask11352>tr:nth-child(2)>td:nth-child(7)").text().trim().split("%")[0]);

// console.log(strHtml);
// var num_process = 1;
// function check_cmn_process(argument) {
//     num_process = Number($("#cronTask11352>tr:nth-child(2)>td:nth-child(7)").text().trim().split("%")[0]);

//     if (num_process === 100) {

//         console.log("should start task");
//     }else{
//         console.log("wait wait wait "+num_process);
//     }


// }


// check_cmn_process();









///////////////////////////////////////////////
var task_name_str = '3she';
var timer=5000; //5s


var parent_id_xx = 11352;

function get_html(task_name_str) {
        

        $.ajax({
        type:'POST',
        url:'https://10.0.1.117/list/getList',
        data:'csrfmiddlewaretoken=JB1VjC21l9t1tWRXiw5w5BUhJ47Lab3y&ip=&task_name='+task_name_str+'&domain=&task_status=&rs_template=&account=&time_start_scan=&time_end_scan=&task_type=&page=1&page_count=25',
        dataType:'text',
        async:true,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。 注意啦 同步将锁定浏览器 
        timeout:120000,//设置请求超时时间（毫秒）。
        success:function(data)
        {   
            
            //取这个cmn_proess的值
            //考虑放到一个html标签中,然后再去查
            document.getElementById("content").innerHTML = data;

            console.log("get_html ");

            // getSubXml();
            cronGroupChecked(11352);
        },
        error:function(a,b,c)
        {
            
        },
        complete:function()//请求完成后回调函数 (请求成功或失败时均调用)。
        {
            
        }

    })

}

// function getSubXml() {
    
//         $.ajax({
//         type:'POST',
//         url:'https://10.0.1.117/list/getSubXml',
//         data:'parent_id=11352&csrfmiddlewaretoken=JB1VjC21l9t1tWRXiw5w5BUhJ47Lab3yName',
//         dataType:'html',
//         async:true,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。 注意啦 同步将锁定浏览器 
//         timeout:120000,//设置请求超时时间（毫秒）。
//         success:function(data)
//         {   
            
//             console.log("getSubXml \n");
//             //取这个cmn_proess的值
//             //考虑放到一个html标签中,然后再去查

//             // alert(data);
//             document.getElementById("cronTask11352").innerHTML = data;
//             num_process = Number($("#cronTask11352>tr:nth-child(2)>td:nth-child(7)").text().trim().split("%")[0]);

//             console.log(num_process);
//             // setTimeout(function(){get_html(task_name_str);},timer);
//         },
//         error:function(a,b,c)
//         {
            
//         },
//         complete:function()//请求完成后回调函数 (请求成功或失败时均调用)。
//         {
            
//         }

//     })

// }

var GroupTaskIds = [];

Array.prototype.in_array = function(e)  
{  
    for(i=0;i<this.length && this[i]!=e;i++);  
    return !(i==this.length);  
} 

function toJsionObj(name,data)
{
    var j_str =  '{ "name":"'+name+'", "value":"'+data+'"}';
    var j_obj = eval('(' + j_str + ')');
    return j_obj
}

var t;
function cronGroupChecked(gid) 
{ // 周期任务展开
    var data = [];
    if(!GroupTaskIds.in_array(gid))
    {
        GroupTaskIds.push(gid);
    };
    for (var i=0; i<GroupTaskIds.length; i++) {
        if (GroupTaskIds[i]!=gid) {
            jQuery('#cronTask'+GroupTaskIds[i]).hide();
            jQuery.each(jQuery('#cronTask'+GroupTaskIds[i]).find("input:checkbox"),function(index,o){o.checked=false});
            jQuery('#cronImg'+GroupTaskIds[i]).removeClass().addClass("ico plus"); 
        }else{
                if(jQuery('#cronImg' + GroupTaskIds[i]).attr('class') == 'ico plus')
                {
                    jQuery('#cronTask' + GroupTaskIds[i]).show();
                    jQuery('#cronImg' + GroupTaskIds[i]).removeClass().addClass("ico minus");
                    var parent_id = toJsionObj('parent_id',gid);
                    var csrfmiddlewaretoken = jQuery('#condition').serializeArray()[0];
                    data.push(parent_id);
                    data.push(csrfmiddlewaretoken);
                    jQuery.ajax({
                        type:'POST',
                        url:'/list/getSubXml',
                        data:data,
                        success:function(msg){
                            //alert(msg);
                            jQuery('#cronTask'+gid).html(msg);

                            //do something
                            // document.getElementById("cronTask11352").innerHTML = data;
                            num_process = Number($("#cronTask11352>tr:nth-child(2)>td:nth-child(7)").text().trim().split("%")[0]);
                            console.log(num_process);

                            if (num_process === 100) {

                                //重扫前通知修改文件
                                beforeReScan();
                                if (flag) {
                                    console.log("clearTimeout break!");
                                    return;
                                }

                                //重扫 parent_id 
                                reScan(11352);
                            }

                            t = setTimeout(function(){get_html(task_name_str);},timer);
            
                        }
                    });
                }else{
                    jQuery('#cronTask' + GroupTaskIds[i]).hide();
                    jQuery.each(jQuery('#cronTask'+GroupTaskIds[i]).find("input:checkbox"),function(index,o){o.checked=false});
                    jQuery('#cronImg' + GroupTaskIds[i]).removeClass().addClass("ico plus");
                };
        };
    };


}

//重新扫描
function reScan(gid) {

        $.ajax({
        type:'POST',
        url:'https://10.0.1.117/list/reScan/',
        data:'csrfmiddlewaretoken=JB1VjC21l9t1tWRXiw5w5BUhJ47Lab3y&ip=&task_name=&domain=&task_status=&rs_template=&account=&time_start_scan=&time_end_scan=&op=rescan&id='+gid+'&task_type=&page=1&page_count=25',
        dataType:'html',
        async:true,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。 注意啦 同步将锁定浏览器 
        timeout:120000,//设置请求超时时间（毫秒）。
        success:function(data)
        {   
            
            console.log("reScan parent_id:"+ gid+"success\n");
            //取这个cmn_proess的值
            //考虑放到一个html标签中,然后再去查

            // alert(data);
        },
        error:function(a,b,c)
        {
            
        },
        complete:function()//请求完成后回调函数 (请求成功或失败时均调用)。
        {
            
        }

    })

}


var flag = false;
function beforeReScan() {
    

    //因为chrome插件在 https 环境 ajax请求http失败、
    //采用解决方案：content_script 通知 background_script，background_script 再ajax请求

    chrome.runtime.sendMessage('hello',function(response) {
        // document.write(response);
        // console.log("message come form bk.js");
        console.log(response);

        if (response.indexOf("break") > -1) {
            flag = true;
        }else{
            flag = false;
        }
    });


}

get_html(task_name_str);


