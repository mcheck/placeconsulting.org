/*--------------------------------------------------------------------------*
 *  File Browser functions
 *--------------------------------------------------------------------------*/

var mouseX = 0;
var mouseY = 0;
var windowX = 1000;
var windowY = 740;

Event.observe(document, 'mousemove', function(event)
{
	mouseX = Event.pointerX(event);
	mouseY = Event.pointerY(event);
});

function get_window_dimensions()
{
	if(document.layers || (document.getElementById && !document.all))
	{
		windowX = window.outerWidth;
		windowY = window.outerHeight;
	}
	else if(document.all)
	{
		windowX = document.body.clientWidth;
		windowY = document.body.clientHeight;
	}
	else
	{
		windowX = 1000;
		windowY = 740;
	}
}

function child_folder(folder)
{
	var get_child = new Ajax.Updater('PM_filesystem2', folder, {method: 'get', onComplete: child_effect});
	breadcrumbs(folder);
	page_form(folder);
   	Effect.Fade('PM_browser_prompt');	
}

function child_effect()
{
	new Rico.Effect.Position( 'PM_filesystem', -540, null, 150, 10);
	new Rico.Effect.Position( 'PM_filesystem2', 20, null, 150, 10, {complete:function(){
								$('PM_filesystem').innerHTML = $('PM_filesystem2').innerHTML;
								$('PM_filesystem').style.left = '0px';
								$('PM_filesystem2').innerHTML = '';
								$('PM_filesystem2').style.left = '580px'; }});

}

function parent_folder(folder)
{
	$('PM_filesystem2').innerHTML = $('PM_filesystem').innerHTML;
	$('PM_filesystem2').style.left = '0px';
	$('PM_filesystem').style.left = '-540px';
	var get_parent = new Ajax.Updater('PM_filesystem', folder, {method: 'get', onComplete: parent_effect});
	breadcrumbs(folder);
	page_form(folder);
}

function parent_effect()
{
	new Rico.Effect.Position('PM_filesystem', 1, null, 150, 5);
	new Rico.Effect.Position('PM_filesystem2', 580, null, 150, 5, {complete: function(){$('PM_filesystem2').innerHTML = '';$('PM_filesystem2').style.width = '0px';}});
}

function breadcrumbs(page)
{
	var get_crumbs = new Ajax.Updater('PM_breadcrumbs', page + '&ajax=crumbs', {method: 'get'});
//	var get_parentdir = new Ajax.Updater('Tab_parentdir', page + '&ajax=parentdir', {method: 'get'});
}

function page_form(page)
{
	var form_value = new Ajax.Request(page + '&ajax=directory', {method: 'get', onComplete: update_form});
}

function update_form(originalRequest)
{
	$('PM_hiddenfolder').value = originalRequest.responseText;
}

function update_body(page)
{
	var get_parent = new Ajax.Updater('PM_filesystem', page + '&ajax=body', {method: 'get'});
}

function submit_form()
{
	page = php_self + '?directory=' + $F('PM_hiddenfolder') + '&sort=' + $F('PM_sort') + '&type=' + $F('PM_type') + '&order=' + $F('PM_order');
	update_body(page);
}

function upload_success()
{
	$('PM_uploadmessage').innerHTML = 'Upload Success';
	Effect.Shake('PM_uploadmessage');
}

function upload_error(error)
{
	$('PM_uploadmessage').innerHTML = error;
	Effect.Shake('PM_uploadmessage');
}

function submit_upload()
{
	$('PM_uploadform').action = 'filebrowser/upload.php?directory=' + $F('PM_hiddenfolder');
	$('PM_uploadform').submit();
}

function make_directory()
{
	page = php_self + '?directory=' + $F('PM_hiddenfolder') + '&makedirectory=true&directoryname=' + $F('directoryname');
	new Ajax.Request(page, {method: 'get', onComplete: submit_form});
}


var oEditor;
if(window.location.href.indexOf('fckdisabled=true') < 0)
{
	oEditor			= window.opener;
	var FCK			= oEditor.FCK ;
	var FCKLang		= oEditor.FCKLang ;
	var FCKConfig	= oEditor.FCKConfig ;
	var FCKDebug	= oEditor.FCKDebug ;
}


function strip_letters(str)
{
	console.log(str)
	str.replace(/([^0-9]+)/, '');
	console.log(str);
	return str;
}

function place_prompt()
{
	midX = mouseX - 65;
	if (midX < 0) 
	{
		midX = 0;
	}
	midY = mouseY - 15;
	$('PM_menuitem_download').style.display = '';
	$('PM_browser_prompt').style.textAlign = 'center';
	$('PM_browser_prompt').style.position = 'absolute';
	$('PM_browser_prompt').style.left = midX + "px";
	$('PM_browser_prompt').style.top = midY + "px";
	$('PM_browser_prompt').style.zIndex = '900';
	Effect.Appear('PM_browser_prompt');
}

function assign_events(link)
{
	$('PM_prompt_download').onclick = binder(prompt_download, link);
	$('PM_prompt_rename').onclick = binder(prompt_rename, link);
	$('PM_prompt_delete').onclick = binder(prompt_delete, link);
	
	if(window.location.href.indexOf('fckdisabled=true') < 0)
	{
		$('PM_prompt_insert').style.display = '';
	}
}

function prompt_image(image, width, height)
{
	place_prompt();
	$('PM_prompt_preview').innerHTML = '<img src="filebrowser/images/review.gif" width=22 height=22 vspace=2 align=absMiddle hSpace=5 border=0>Preview image';

	//$('PM_prompt_preview').onclick = eval("function(){popup_img('" + image + "', '" + width + "', '" + height + "');}");
	$('PM_prompt_preview').onclick = binder(popup_img, host + image, width, height);
	assign_events(image);
	if(window.location.href.indexOf('fckdisabled=true') < 0)
	{
		$('PM_prompt_insert').innerHTML = '<img src="filebrowser/images/insert.gif" width=22 height=22 vspace=2 align=absMiddle hSpace=5 border=0>Insert Image';
		//$('PM_prompt_insert').onclick = eval("function(){insert_image('" + image + "', '" + width + "', '" + height + "');}");
		$('PM_prompt_insert').onclick = binder(insert_image, image, width, height);
	}
}

function prompt_flash(flash, width, height)
{
	place_prompt();
	$('PM_prompt_preview').innerHTML = '<img src="filebrowser/images/review.gif" width=22 height=22 vspace=2 align=absMiddle hSpace=5 border=0>Preview flash';

	//$('PM_prompt_preview').onclick = eval("function(){popup_img('" + flash + "', '" + width + "', '" + height + "');}");
	$('PM_prompt_preview').onclick = binder(popup_img, host + flash, width, height);
	assign_events(flash);
	if(window.location.href.indexOf('fckdisabled=true') < 0)
	{
		$('PM_prompt_insert').innerHTML = '<img src="filebrowser/images/insert.gif" width=22 height=22 vspace=2 align=absMiddle hSpace=5 border=0>Insert Flash';
		//$('PM_prompt_insert').onclick = eval("function(){insert_flash('" + flash + "', '" + width + "', '" + height + "');}");
		$('PM_prompt_insert').onclick = binder(insert_flash, flash, width, height);
	}
}

function prompt_link(file, link)
{
	place_prompt();
	$('PM_prompt_preview').innerHTML = '<img src="filebrowser/images/review.gif" width=22 height=22 vspace=2 align=absMiddle hSpace=5 border=0>Preview file';

	//$('PM_prompt_preview').onclick = popup_link(file);
	$('PM_prompt_preview').onclick = binder(popup_link, host + file);
	assign_events(file);
	if(window.location.href.indexOf('fckdisabled=true') < 1)
	{
		$('PM_prompt_insert').innerHTML = '<img src="filebrowser/images/insert.gif" width=22 height=22 vspace=2 align=absMiddle hSpace=5 border=0>Insert Link to File';		
		//$('PM_prompt_insert').onclick = insert_link(file, link);
		$('PM_prompt_insert').onclick = binder(insert_link, file, link);
	}
}

function prompt_folder(file, link)
{
	place_prompt();
	$('PM_prompt_preview').innerHTML = '<img src="filebrowser/images/folder-open.gif" width=22 height=22 vspace=2 align=absMiddle hSpace=5 border=0>Open folder';
	//$('PM_prompt_preview').onclick = popup_link(file);
	$('PM_prompt_preview').onclick = binder(child_folder, php_self + link);
	$('PM_menuitem_download').style.display = 'none';
	assign_events(file);
	if(window.location.href.indexOf('fckdisabled=true') < 0)
	{
		$('PM_prompt_insert').innerHTML = '<img src="filebrowser/images/insert.gif" width=22 height=22 vspace=2 align=absMiddle hSpace=5 border=0>Insert Link to File';		
		$('PM_prompt_insert').onclick = binder(insert_link, file, link);
	}
}

if (!Function.prototype.apply)
{
	Function.prototype.apply = function(oScope, args)
	{
		var sarg = [];
		var rtrn, call;

		if (!oScope) oScope = window;
		if (!args) args = [];

		for (var i = 0; i < args.length; i++)
		{
			sarg[i] = "args["+i+"]";
		}

		call = "oScope.__applyTemp__(" + sarg.join(",") + ");";

		oScope.__applyTemp__ = this;
		rtrn = eval(call);
		delete oScope.__applyTemp__;
		return rtrn;
	}
}

function binder(fn)
{
	var args = [];
	for (var n = 1; n < arguments.length; n++)
		args.push(arguments[n]);
	return function () { return fn.apply(this, args); };
}

function insert_image(image, width, height)
{
	var img_dlg = window.opener.document;
	img_dlg.getElementById('txtUrl').value = image;
	img_dlg.getElementById('txtWidth').value = width;
	img_dlg.getElementById('txtHeight').value = height;
	img_dlg.getElementById('txtBorder').value = '0';
	window.opener.UpdatePreview();
	window.close();
}

function insert_link(file, link)
{
	var link_dlg = window.opener.document;
	link_dlg.getElementById('txtUrl').value = file;
	window.opener.OnUrlChange();
	window.close();		
}

function insert_flash(flash, width, height)
{
	var flash_dlg = window.opener.document;
	flash_dlg.getElementById('txtUrl').value = flash;
	flash_dlg.getElementById('txtWidth').value = width;
	flash_dlg.getElementById('txtHeight').value = height;
	window.opener.UpdatePreview();
	window.close();		
}

function popup_link(URL)
{
	day = new Date();
	id = day.getTime();
	eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=0,width=580,height=600,left = 20,top = 20');");
	Effect.Fade('PM_browser_prompt');
}

function popup_img(URL, width, height, resizable)
{
	day = new Date();
	id = day.getTime();
	width = parseInt(width) + 20;
	height = parseInt(height) + 20;
	eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=" + width + ",height=" + height + ",left = 20,top = 20');");
	Effect.Fade('PM_browser_prompt');
}

function prompt_download(filename)
{
	day = new Date();
	id = day.getTime();
	downloadframe.location = 'filebrowser/download.php?filename=' + filename;
//	('filebrowser/download.php?filename=' + filename, 'download' + id, 'toolbar=0, scrollbars=0, location=0, statusbar=0, menubar=0, resizable=0, width=200, height=200, left=100, top=100');
	Effect.Fade('PM_browser_prompt');		
}

function prompt_rename(filename)
{
	var name = parse_name(filename);
	var new_name = prompt('Enter new name:', name);
	if ((new_name != name) && (new_name != null) && (new_name != ""))
	{
    	page = php_self + '?ajax=rename&filename=' + filename + '&newname=' + new_name;
		new Ajax.Request(page, {method: 'get', onComplete: submit_form});
	}
	Effect.Fade('PM_browser_prompt');	
}

function prompt_delete(filename)
{
	if (confirm('Do you really want to delete ' + parse_name(filename) + '?'))
    {
    	page = php_self + '?ajax=delete&filename=' + filename;
		new Ajax.Request(page, {method: 'get', onComplete: submit_form});
	}
   	Effect.Fade('PM_browser_prompt');
}

function parse_name(filename)
{
	var name = filename.split("/");
	return name[name.length-1];
}

function select_tab(selected)
{
	var divs = new Array("PM_sorting", "PM_folder", "PM_uploader");
	var tabs = new Array("Tab_sortby", "Tab_makedir", "Tab_upload");

	for (i = 0; i < 3; i++)  {
		if (selected == i)  {
			$(divs[i]).style.display = 'block';
			$(tabs[i]).className = 'PopupTabSelected';
		}
		else  {
			$(divs[i]).style.display = 'none';			
			$(tabs[i]).className = 'PopupTab';			
		}
			
	}
}