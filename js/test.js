<script type="text/javascript">
            var dialog = null;
            if (top.dialog){
                dialog = top.dialog;
            }else{
                dialog = new UI.Dialog({name:'dialog'});
            }
			var GroupTaskIds = [];
			Array.prototype.in_array = function(e)  
		    {  
			    for(i=0;i<this.length && this[i]!=e;i++);  
			    return !(i==this.length);  
		    } 
			function checkAll(obj,name){
				var matched_el = jQuery('[name='+name+'][disabled!=disabled]:checkbox');
				matched_el.attr('checked',obj.checked);
				matched_el.each(function(index,o){
					if(o.checked){
						UI.addClass(UI.parent(UI.parent(o)),'marked');
					}else{
						UI.removeClass(UI.parent(UI.parent(o)),'marked');
					}
				});
			}
			function checkItem(name,id)
			{
				var $tmp = jQuery('[name='+name+']:checkbox');
				jQuery('#'+id).attr('checked',$tmp.length==$tmp.filter(':checked').length);
			}
            function marked(o){
                UI.toggleClass(UI.parent(UI.parent(o)),'marked');
            }
			function searchTask(page)
			{
				var data;
				var page_obj;
				var page_count;
				var task_type;
				data = jQuery('#condition').serializeArray();
				task_type = jQuery('#task_type').val();
				task_type_obj = toJsionObj('task_type',task_type);
				page_obj = toJsionObj('page',page);
				page_count_obj = toJsionObj('page_count',jQuery('#page_count').val());
				data.push(task_type_obj);
				data.push(page_obj);
				data.push(page_count_obj);
				
				
				jQuery.ajax({
					type:'POST',
					url:'/list/getList',
					data:data,
					success:function(msg){
						try {
								var result = eval(msg);
								if(result.context.fieldErrors.time_end_scan)
								{
									add_error('time_end_scan',result.context.fieldErrors.time_end_scan);
								} 
								if(result.context.fieldErrors.page)
								{
									alert(result.context.fieldErrors.page);
								}
								if(result.context.fieldErrors.ip)
								{
									add_error('ip',result.context.fieldErrors.ip);
								}
								if(result.context.fieldErrors.task_name)
								{
									add_error('task_name',result.context.fieldErrors.task_name);
								}
								if(result.context.fieldErrors.domain)
								{
									add_error('domain',result.context.fieldErrors.domain);
								}
								if(result.context.fieldErrors.task_type)
								{
									alert(result.context.fieldErrors.task_type);
								}
								if(result.context.fieldErrors.task_status)
								{
									alert(result.context.fieldErrors.task_status);
								}
								if(result.context.fieldErrors.rs_template)
								{
									alert(result.context.fieldErrors.rs_template);
								}
								if(result.context.fieldErrors.bvs_template)
								{
									alert(result.context.fieldErrors.bvs_template);
								}
								if(result.context.fieldErrors.account)
								{
									alert(result.context.fieldErrors.account);
								}
						}catch(e){
							if(jQuery('#time_end_scan_error'))
							{
								clear_error('time_end_scan_error');
							}
							if(jQuery('#ip_error'))
							{
								clear_error('ip_error');
							}
							if(jQuery('#task_name_error'))
							{
								clear_error('task_name_error');
							}
							if(jQuery('#domain_error'))
							{
								clear_error('domain_error');
							}
							if(jQuery('#task_name_error'))
							{
								clear_error('task_name_error');
							}
							jQuery('#content').html(msg);
						}
					}
				});
			}
			function quickSearch(page)
			{
				clearForm('condition');
				searchTask(page);
			}
			
			function add_error(id,error_msg){
				var id = id;
				var error_msg = error_msg;
				clear_error(id+'_error');
				html_str = '<br><div id="'+id+'_error" class="new_line error" style="margin: 0px; display: inline-block;">' + error_msg + '</div>'
				jQuery('#'+id).after(html_str);
			}
			function clear_error(id){
				var id = id;
				if(jQuery('#' + id))
				{
					jQuery('#' + id).prev('br').remove();
					jQuery('#' + id).remove();
					return true;
				}else{
					return false;
				}
			}
			function toJsionObj(name,data)
			{
				var j_str =  '{ "name":"'+name+'", "value":"'+data+'"}';
				var j_obj = eval('(' + j_str + ')');
				return j_obj
			}
			function toPage(m)
			{
				var page;
				if(m == 'top')
				{
					page = jQuery('#to_page').val();					
					jQuery('#to_page1').val(page);
				}else{
					page = jQuery('#to_page1').val();
					jQuery('#to_page').val(page);
				}
				searchTask(page);
			}
			function changeNum(m)
			{
				if(m == 'top')
				{
					page = jQuery('#to_page').val();					
					jQuery('#to_page1').val(page);
				}else{
					page = jQuery('#to_page1').val();
					jQuery('#to_page').val(page);
				}
			}
			function linkCount(sel_id,v)
			{
				jQuery('#page_count').val(v);
				jQuery('#page_count0').val(v);
			}
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
			function clearForm(id)
			{
				jQuery(':input','#'+id).not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
				
			}
			function operItems(opt){
				//var p = $('#do_option option:selected').val();
				var re_opt = opt;
				var data = [];
				var csrfmiddlewaretoken = jQuery('#search_form').serializeArray()[0];
				data.push(csrfmiddlewaretoken);
				var ids = '';
				if(jQuery('[name=taskcheck]:checkbox').filter(':checked').length == 0)
				{
					alert("未选中任何任务");
					return false;
				}else{
					jQuery('[name=taskcheck]:checkbox').filter(':checked').each(function(){
						ids = ids+this.value+",";
					})
				}
				ids = ids.substring(0,ids.length-1);
				m = ''
				if(re_opt == 'delete')
				{
					m = '是否删除?';
				}else if(re_opt == 'rescan'){
					m = '是否重扫'
				}
				else{
					m = '是否执行此操作';
				}
				if(confirm(m))
				{
					location.href = '/list/optTasks/opt/' + opt + '/ids/' + ids;
				}
			}
			function getAllCheck(name)
			{
				var ids = Array();
				jQuery('[name='+name+']:checkbox:checked').each(function(){
					ids.push(this.value);
				})
				return ids.join(',');
			}
            function getAllCheckd()
            {
                var ids = getAllCheck('taskcheck');
                var sub_ids = getAllCheck('subtask');
                if(ids!=""&&sub_ids!=""){
                    return ids+','+sub_ids;
                }else if(ids!=""){
                    return ids;
                }else{
                    return sub_ids;
                }
            }
			function getAllTypeCheck(name)
			{
				var task_type_list = Array();
				jQuery('[name='+name+']:checkbox:checked').each(function(){
					task_type_list.push(jQuery(this).next().val());
				})
				return task_type_list.join(',');
			}
            function getAllTypeCheckd()
            {
                var task_type_str = getAllTypeCheck('taskcheck');
                var sub_task_type_str = getAllTypeCheck('subtask');
                if(task_type_str!=""&&sub_task_type_str!=""){
                    return task_type_str+','+sub_task_type_str;
                }else if(task_type_str!=""){
                    return task_type_str;
                }else{
                    return sub_task_type_str;
                }
            }
            function check_task_type()
            {
                var task_types = getAllTypeCheckd();
                var web=0,sys=0;
                task_type_list = task_types.split(',');
                for(var i=0;i<task_type_list.length;i++){
                    if(task_type_list[i] == '8'){
                        web++;
                    }else{
                        sys++;
                    }
                }
                return (web>0)^(sys>0)
            }
            function export_report(){
                top.ids = getAllCheckd();
                if(top.ids==""){
                    alert('未选中任何任务!');
                    return false;
                }else if(!check_task_type()){
                    alert('请选择同类型任务进行报表输出!');
                    return false;
                }else if(top.ids.split(',').length == 1){
                    jQuery.ajax({
                        url: '/report/export',
                        type:'post',
                        data:{
                            task_id:top.ids,
                            multi_report_name:top.multi_report_name,
                            report_type:'html',
                            csrfmiddlewaretoken:'JB1VjC21l9t1tWRXiw5w5BUhJ47Lab3y'
                        },
                        success: function(data) {
                            var res = eval(data);
                            if(res.result == 'offline_step1'){
   …</script>