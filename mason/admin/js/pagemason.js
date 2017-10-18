/**
 * This is the JS file that is included in every file no matter what. It handles most of the functionality sitewide
 * the exception to this is the main editor in /mason/index.php as it has its own unique js code.
 *
 * Most of it is well documented so check it out
 */
var mouseX = 0;
var mouseY = 0;
var windowX = 1000;
var windowY = 740;
var has_preview = false;
var what = 'PM_row';
var expired = false;


/**
* This function will poll the server every minute to see if the users session has expired
* If it has expired it will execute some javascript which will redirect them to the login page
*
* @param void
* @return void
* @author Scott Roach
* @example void
*/
function check_expired()
{
	exp = new Ajax.Request('/mason/admin/common.php?PM_check_logout=true', {evalScripts: true, method: 'get'});
}
var pe = new PeriodicalExecuter(check_expired, 30);
/**
* This function will set an event watch for triggering the help container to expand or collapse.
* If Left or Up is pressed the container will expand, if Down or Right is pressed it will collapse.
* If F1 is pressed it will do the opposite of what it currently is
*
* @param	void
* @return	void
* @author 	Scott Roach
* @example	void
*/
Event.observe(document, 'keypress',
	function(event)
	{
		if($('PM_help_text').style.display == 'none' && event.keyCode == Event.KEY_LEFT)
		{
			show_help();
		}
		if($('PM_help_content').style.width != '1px' && event.keyCode == Event.KEY_RIGHT)
		{
			hide_help();
		}
		if(event.keyCode == 112)
		{
			click_help();
		}
	}
);

/**
* This function will trigger the internal function in prototype to set the indicator to active whenever there is a pending ajax request.
* It will also set it to inactive when any active ajax requests are completed.
*
* @param	void
* @return	void
* @author 	Scott Roach
* @example	void
*/
var activity_indicator = {
	onCreate: function()
	{
		show_indicator();
	},

	onComplete: function()
	{
		if(Ajax.activeRequestCount == 0)
		{
			hide_indicator();
		}
	}
};
Ajax.Responders.register(activity_indicator);

/**
* This function will show the progress indicator
*
* @param	void
* @return	void
* @author 	Scott Roach
* @example	show_indicator();
*/
function show_indicator()
{
	$('PM_activity_indicator').style.display = 'block';	
}

/**
* This function will hide the progress indicator
*
* @param	void
* @return	void
* @author 	Scott Roach
* @example	hide_indicator();
*/
function hide_indicator()
{
	$('PM_activity_indicator').style.display = 'none';	
}

/**
* This function will log where the mouse goes every time it moves.
*
* @param	void
* @return	void
* @author 	Scott Roach
* @example	void
*/
Event.observe(document, 'mousemove', function(event)
{
	mouseX = Event.pointerX(event);
	mouseY = Event.pointerY(event) - document.body.scrollTop;
	if(has_preview)
	{
		set_preview(mouseX, mouseY);
	}
});

/**
* This function will find out the viewable size for the specific browser window
*
* @param	void
* @return	void
* @author 	Scott Roach
* @example	get_window_dimensions();
*/
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

/**
* This function will fix a bug with IE supporting fixed positioning for CSS.
*
* @param	void
* @return	void
* @author 	Scott Roach
* @example	IEscroll_fix();
*/
function IEscroll_fix()
{
	$('PM_help_area').innerHTML = $('PM_help_area').innerHTML
}
nav_type = navigator.userAgent.toLowerCase();
if(nav_type.indexOf('msie') + 1)
{
	window.onscroll = IEscroll_fix;
}


/**
* This function will set the DOM display style to block for the DOM id passed as an arguement
*
* @param	DOM id	what
* @return	void
* @author 	Scott Roach
* @example 	showit('element_info');
*/
function showit(what)
{
	if($(what))
	{
		$(what).style.display = 'block';
	}
}

/**
* This function will set the DOM display style to none (hiding the block) for the DOM id passed as an arguement
*
* @param	DOM id	what
* @return	void
* @author 	Scott Roach
* @example	hideit('element_info');
*/
function hideit(what)
{
	if($(what))
	{
		$(what).style.display = 'none';
	}
}

/**
* This function will hide the layouts box, show the templates box, and call the show_templates function to fetch the templates from the server
*
* @param	string	what
* @return	void
* @author 	Scott Roach
* @example	chooseit('oneleft');
*/
function chooseit(what)
{
	hideit('PM_layouts');
	show_templates("all", "type", what);
	showit('PM_templates');
}

/**
* This function will grab all templates from the server that match the given parameters
*
* @param	string	sortby (all|rating|category|type)
* @param 	string	limitby	(array id that matches compare)
* @param 	string	compare (value that limitby must match)
* @return	void
* @author 	Scott Roach
* @example	show_tempaltes('all', 'type', 'oneleft'); show all "oneleft" templates
*/
function show_templates(sortby, limitby, compare)
{
	var url = '/mason/admin/landing-ajax.php';
	var qs  = 'action=templates&sortby=' + sortby;

	if(limitby != "")
	{
		qs += '&limitby=' + limitby;
	}
	if(compare != "")
	{
		qs += '&compare=' + compare;
	}

	var myAjax = new Ajax.Updater('PM_template_holder', url, {method: 'get', parameters: qs});
}

/**
* This function will actually choose a template from the list of templates
*
* @param	string	template
* @return	void
* @author 	Scott Roach
* @example	choose_template('Blog'); choose the template "Blog"
*/
function choose_template(template, url)
{
	if($F('sitename') == '' || $F('sitename') == null || $F('MountPoint') == 0)
	{
		alert('Please make sure that you have chosen a name and a location for your site.');
		$('sitename').style.border = '1px solid red';
	}
	else
	{
		url = '/mason/pastetemplate.php?template=' + template + '&download=' + url + '&name=' + $F('sitename') + '&path=' + $F('MountPoint') + '&_=';
		var myAjax = new Ajax.Request(url,
				{
					method: 'get',
					onComplete: edit_template
				});
	}
}

/**
* This function just sets the border to 1 pixel wide and solid black for the DOM id "sitename",
* This is for if the person doesnt enter a sitename and chooses a template
*
* @param	void
* @return	void
* @author 	Scott Roach
* @example	clear_alert();
*/
function clear_alert()
{
	$('sitename').style.border = '1px solid black';
}

/**
* This function redirects the user to their newly created site
*
* @param	Object	originalRequest
* @return	void
* @author 	Scott Roach
* @example	edit_template(ajax_object);
*/
function edit_template(originalRequest)
{
	site_details = originalRequest.responseText.split('_');
	window.location = '/mason/index.php?site_id=' + site_details[0] + '&page_id=' + site_details[1];
}


/**
* This function will show the preview DOM id so that it appears. It does this by changing the CSS styling
*
* @param	string what (image uri)
* @return	void
* @author 	Scott Roach
* @example	preview('http://www.somesite.com/someimage.jpg');
*/
function preview(what)
{
	$('PM_preview').style.position = 'absolute';
	$('PM_preview').style.background = 'url(' + what + ') center no-repeat #EEE';
	$('PM_preview').style.display = 'block';
	$('PM_preview').style.width = '400px';
	$('PM_preview').style.height = '400px';
	$('PM_preview').style.border = '1px solid #666';
	$('PM_preview').style.top = (mouseY - 170) + 'px';
	$('PM_preview').style.left = '250px';
	$('PM_preview').style.marginTop = '3px 0 0 0';
}

/**
* This function will hide the preview that was set with preview();
*
* @param	void
* @return	void
* @author 	Scott Roach
* @example	clear_preview();
*/
function clear_preview()
{
	$('PM_preview').style.width = '0px';
	$('PM_preview').style.height = '0px';
	$('PM_preview').style.border = 'none';
	$('PM_preview').style.background = 'none';
	$('PM_preview').style.display = 'none';
}

/**
* This function will check to see if the value of the form (drop down) with the DOM id of "PM_pages" matches the format [0-9]_[0-9].
* If so it will take them to the page editor where the first [0-9] is the site_id and the second [0-9] is the page_id
*
* @param	void
* @return	bool
* @author 	Scott Roach
* @example	edit_site();
*/
function edit_site()
{
//	test = new RegExp(/^\d_\d$/);
	test = new RegExp(/^(\d+)_(\d+)$/);
	if($F('PM_pages').match(test))
	{
		site_details = $F('PM_pages').split('_');
		window.location = '/mason/index.php?site_id=' + site_details[0] + '&page_id=' + site_details[1];
	}
	return false;
}

/**
* This function will search through the HelpText array for any elements that match the string what.
* Ones that do not match will be hidden, those that do will stay visible.
*
* @param	string 	what
* @return	void
* @author 	Scott Roach
* @example	findit('Add a new page');
*/
function findit(what)
{
	show_indicator();
	what   = what.toLowerCase();
	finds  = new Array();
	if(HelpText.length == 0)
	{
		alert('No results');
	}
	else
	{
		found = 0;
		for(var i=0; i<HelpText.length; i++)
		{
			TopicText[i].style.display = 'none';
			finds = what.split(" ");
			wasfound = true;
			for(var j=0; j<finds.length;j++)
			{
				if(SearchText[i].indexOf(finds[j]) < 1 && finds[j] != "")
				{
					wasfound = false;
				}
			}
			if(wasfound)
			{
				HelpText[i].style.display = 'block';
				finds[found] = i;
				found++;
			}
			else
			{
				//Effect.Fade(HelpText[i]);
				HelpText[i].style.display = 'none';

			}
		}
		if(found < 4)
		{
			for(var i=0; i<TopicText.length; i++)
			{
				//Effect.SlideDown(TopicText[i]);
				TopicText[i].style.display = 'block';
				$('PM_toggle_' + TopicText[i].id.replace(/PM_help_topic_/, '')).style.background = 'url(/mason/admin/images/app/bullet_toggle_minus.png) top left no-repeat';
			}
		}
		else
		{
			for(var i=0; i<TopicText.length; i++)
			{
				//Effect.SlideDown(TopicText[i]);
				$('PM_toggle_' + TopicText[i].id.replace(/PM_help_topic_/, '')).style.background = 'url(/mason/admin/images/app/bullet_toggle_plus.png) top left no-repeat';
			}
		}
		$('PM_no_search_results').style.display = found == 0 ? 'block' : 'none';
		hide_indicator();
	}
}

/**
* This function will toggle the descriptions for help categories from visible to hidden and back.
*
* @param	string	what (where what is the help topic title)
* @return	void
* @author 	Scott Roach
* @example	toggle_help('AddPage');
*/
function toggle_help(what)
{
	$('PM_help_topic_' + what).style.display = $('PM_help_topic_' + what).style.display == 'block' ? 'none' : 'block';
	$('PM_toggle_' + what).style.background = $('PM_help_topic_' + what).style.display == 'block' ? 'url(/mason/admin/images/app/bullet_toggle_minus.png) center left no-repeat' : 'url(/mason/admin/images/app/bullet_toggle_plus.png) center left no-repeat';
}

/**
* This function will take the Helpers array and format it on the help page so that it is visually presentable, as well as prepare it for searching.
*
* @param	void
* @return	void
* @author 	Scott Roach
* @example	load_help();
*/
function load_help()
{
	show_indicator();
	var hash = $H(Helpers);
	topic = hash.keys();
	definition = hash.values();
	for(var i=0; i<topic.length; i++)
	{
		$('PM_help_topics').innerHTML += '<div class="PM' + '_help_text"><a href="javascript:to' + 'ggle_help(\'' + topic[i] + '\');"><h5 clas' + 's="PM_help_topic" id="PM_toggle_' + topic[i] + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + topic[i] + '</h5></a><p class="PM_h' + 'elp_toggle" id="PM_help_topic_' + topic[i] + '" style="display: none;">' + definition[i] + '</p></div>' + "\n";
		SearchText[i] = '  ' + topic[i].toLowerCase().stripTags() + ' ' + definition[i].toLowerCase().stripTags();
	}
	$('PM_help_topics').innerHTML += '<h3 id="PM_no_search_results" style="display: none;">Your search did not return any matches</h3>';
	HelpText = document.getElementsByClassName('PM_help_text', 'PM_help_topics');
	TopicText = document.getElementsByClassName('PM_help_toggle', 'PM_help_topics');
	hide_indicator();
}

/**
* This function will popup a window. It is used for the filemananger
*
* @param	string	url
* @return	void
* @author 	Scott Roach
* @example	popUp('http://www.google.com');
*/
function popup(URL)
{
	day = new Date();
	id = day.getTime();
	eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=0,width=580,height=600,left=20,top=20');");
}

/**
* This function will add rollover triggers to all DOM ids that have help topics.
*
* @param	void
* @return	void
* @author 	Scott Roach
* @example	set_helpers();
*/
function set_helpers()
{
	id_to_Helper = new Array();
	Helper_to_id = new Array();
	id_to_Helper[0] = 'DropDownGoTo';
	Helper_to_id[0] = 'PM_pages';
	id_to_Helper[1] = 'AddSite';
	Helper_to_id[1] = 'PM_addsite';
	id_to_Helper[2] = 'DeleteSite';
	Helper_to_id[2] = 'PM_deletesite';
	id_to_Helper[3] = 'EditSite';
	Helper_to_id[3] = 'PM_editsite';
	id_to_Helper[4] = 'ImportSite';
	Helper_to_id[4] = 'PM_importsite';
	id_to_Helper[5] = 'PublishSite';
	Helper_to_id[5] = 'PM_publishsite';
	id_to_Helper[6] = 'FileManager';
	Helper_to_id[6] = 'PM_filemananger';
	id_to_Helper[7] = 'ChangeLoginInformation';
	Helper_to_id[7] = 'PM_changelogin';
	id_to_Helper[8] = 'Help';
	Helper_to_id[8] = 'PM_help';
	id_to_Helper[9] = 'PageMasonLogo';
	Helper_to_id[9] = 'PM_pm_logo';
	id_to_Helper[10] = 'LunarpagesLogo';
	Helper_to_id[10] = 'PM_lp_logo';
	id_to_Helper[11] = 'ChooseTemplateLayout';
	Helper_to_id[11] = 'PM_choose';
	id_to_Helper[12] = 'ChooseTemplate';
	Helper_to_id[12] = 'PM_templates';
	id_to_Helper[13] = 'OneLeft';
	Helper_to_id[13] = 'PM_oneleft';
	id_to_Helper[14] = 'OneTop';
	Helper_to_id[14] = 'PM_onetop';
	id_to_Helper[15] = 'OneRight';
	Helper_to_id[15] = 'PM_oneright';
	id_to_Helper[16] = 'TwoLeft';
	Helper_to_id[16] = 'PM_twoleft';
	id_to_Helper[17] = 'TwoRight';
	Helper_to_id[17] = 'PM_tworight';
	id_to_Helper[18] = 'ChooseLayout';
	Helper_to_id[18] = 'PM_layouts';
	id_to_Helper[19] = 'SiteName';
	Helper_to_id[19] = 'sitename';
	id_to_Helper[20] = 'EditSites';
	Helper_to_id[20] = 'PM_edit_sites';

	for(var i=0; i<Helper_to_id.length; i++)
	{
		if($(Helper_to_id[i]))
		{
			add_listener(Helper_to_id[i], Helpers[id_to_Helper[i]]);
			$(Helper_to_id[i]).onmouseout = function(){default_editable();};
		}
	}
/*	Helper_to_id[21] = '';
	id_to_Helper[21] = '';
	Helper_to_id[22] = '';
	id_to_Helper[22] = '';
	Helper_to_id[23] = '';
	id_to_Helper[23] = '';
	Helper_to_id[24] = '';
	id_to_Helper[24] = '';
	Helper_to_id[25] = '';
	id_to_Helper[25] = '';
	Helper_to_id[26] = '';
	id_to_Helper[26] = '';
	Helper_to_id[27] = '';
	id_to_Helper[27] = '';
	Helper_to_id[28] = '';
	id_to_Helper[28] = '';
	Helper_to_id[29] = '';
	id_to_Helper[29] = '';*/
}

/**
* This function will add will add a function to a specific DOM id element that will call the editable() function with the value of text
*
* @param	string DOM id	element
* @return	string 	text (value of the text to pass to editable())
* @author 	Scott Roach
* @example	add_listener('PM_addsite', 'Clicking this will let you add a new site');
*/
function add_listener(element, text)
{
	$(element).onmouseover = function() {editable(text);};
}

/**
* This function will indicate that there is help info for a certain item, and it will set the help area content to the help info.
*
* @param	string	what (help content)
* @return	void
* @author 	Scott Roach
* @example	editable("Clicking Add Site will allow you to create a new site");
*/
function editable(what)
{
	$('PM_help_text').innerHTML= what;
	$('PM_help_right').style.background = 'url(/mason/admin/images/PM_help_right_over.png) top right no-repeat';
}

/**
* This function will reset the style of the help area to show that there is no specific help context for the item the user is looking at.
*
* @param	void
* @return	void
* @author 	Scott Roach
* @example	default_editable();
*/
function default_editable()
{
	$('PM_help_right').style.background = 'url(/mason/admin/images/PM_help_right.png) top right no-repeat';
}

/**
* This function will expand the help area
*
* @param	void
* @return	void
* @author 	Scott Roach
* @example	show_help();
*/
function show_help()
{
	get_window_dimensions();
	new Rico.Effect.Size( 'PM_help_content', (windowX - 90), null, 500, 10,
	{complete:function() {new Effect.Appear('PM_help_text')}} );
	setcookie('PM_helper', 'open', 30);
}

/**
* This function will collapse the help area.
*
* @param	void
* @return	void
* @author 	Scott Roach
* @example	hide_help();
*/
function hide_help()
{
	new Effect.Fade('PM_help_text', {afterFinish: function(){new Rico.Effect.Size( 'PM_help_content', 1, null, 500, 10);}});
	setcookie('PM_helper', 'closed', 30);
}

/**
* This function will make the help area the opposite of what it currently is. If it is collpased it will call show_help(), if it is expanded it will call hide_help()
*
* @param	void
* @return	void
* @author 	Scott Roach
* @example	click_help();
*/
function click_help()
{
	if($('PM_help_text').style.display == 'none')
	{
		
		show_help();
	}
	else
	{
		hide_help();
	}
}

/**
* This function will make javascript set a cookie with the name "name", value "value" and set it to expire in "days" days
*
* @param	string	name
* @param 	string 	value
* @param 	int/string	days
* @return	void
* @author 	Scott Roach
* @example	setcookie('has_loaded_page', 'true', 365);
*/
function setcookie(name, value, days)
{
	expires = "";
	if(days != "" && days != null)
	{
		date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires="+date.toGMTString();
	}
	document.cookie = name + "=" + value + expires + "; path=/";
}

/**
* This function will get the value for the desired cookie "name"
*
* @param	string	name
* @return	string 	cookie_value
* @author 	Scott Roach
* @example	read_cookie('has_loaded_page'); // returns "true" from previous example
*/
function readcookie(name)
{
	eval('regex = /' + name + '=(.+?)(;|$)/');
	matches = document.cookie.match(regex);
	if(matches == null)
	{
		return false;
	}
	return matches[1];
}

/**
* This function will set the original style of the help area. If there is a cookie set that the help area is collapsed, it will load collapsed.
* If there is not cookie, or the cookie is set as expanded the help area will be loaded as being expanded.
*
* @param	void
* @return	void
* @author 	Scott Roach
* @example	adjust_helper();
*/
function adjust_helper()
{
	$('PM_help_right').style.background = 'url(/mason/admin/images/PM_help_right.png) top right no-repeat';
	cookie = readcookie('PM_helper');
	if(cookie == 'open' || cookie == false)
	{
		get_window_dimensions();
		$('PM_help_content').style.width = (windowX - 90) + 'px';
		$('PM_help_text').style.display = 'block';
	}
	else
	{
		$('PM_help_content').style.width = '1px';
		$('PM_help_text').style.display = 'none';
	}
}

/**
* This function will toggle a div and also change the image of the toggler from a + to a -
*
* @param	string toggle_id
* @param	string plus_id
* @return	void
* @author 	Scott Roach
* @example	edit_toggle('dunno', 'rawr');
*/
function edit_toggle(toggle_id, plus_id)
{
	if($(toggle_id).style.display != 'none')
	{
		$(plus_id).style.background = 'url(/mason/admin/images/app/bullet_toggle_plus.png) center left no-repeat';
	}
	else
	{
		$(plus_id).style.background = 'url(/mason/admin/images/app/bullet_toggle_minus.png) center left no-repeat';
	}
	new Effect.toggle(toggle_id, 'appear');
}

/**
* This function will edit the dropdown for the different mount point options.
*
* @param 	string site (url of site)
* @param 	array folders (common mount folder options)
* @return 	void
* @author 	Scott Roach
* @example	manipulate_mount_point_values('www.bigtoach.com', new Array('site1', 'another_folder'));
*/
function manipulate_mount_point_values(site, folders)
{
	var site_name = $F('sitename');
	site_name = site_name == "" || site_name == null ? 'site_name' : site_name;
	var length = $('MountPoint').options.length;
	for(var i=1; i<length; i++)
	{
		$('MountPoint').options[i].text = site + folders[(i - 1)];
		$('MountPoint').options[i].value = folders[(i - 1)];
		i++;
		$('MountPoint').options[i].text = site + folders[(i - 1)].replace('%', site_name);
		$('MountPoint').options[i].value = folders[(i - 1)].replace('%', site_name);
	}
}

/*
* This function just hides the available mount point options
*
* @return 	void
* @author	Scott Roach
* @example	hode_mounts();
*/
function hide_mounts()
{
	selects = $('PM_edit_mount_point').getElementsByTagName('select');
	for(i=0;i<selects.length;i++)
	{
		selects[i].style.display = 'none';
	}
}

/*
* This function will hide prompt for things based on the passed id of the elements to hide
*
* @param	id what (id of element to hide submit button for)
* @return 	void
* @author	Scott Roach
* @example	cancel_submit('PM_edit_mount_point');
*/
function cancel_submit(what)
{
	if(what == 'PM_edit_mount_point')
	{
		hide_mounts();
	}
	Effect.Fade(what);
}

/*
* This function will position the prompt for different options.
*
* @param	id element (id elemet to position)
* @param	int width (width of the item to position)
* @param	int height (height of the item to position)
* @return 	void
* @author	Scott Roach
* @example	position('PM_edit_mount_point', 200, 200);
*/
function position(element, width)
{
	get_window_dimensions();
	midX = mouseX + 5;//Math.floor((windowX / 2) - (width / 2));
	midY = mouseY + 5;//Math.floor((mouseY) - (height / 2));
	$(element).style.position = 'absolute';
	$(element).style.width = width + "px";
//	$(element).style.height = height + "px";
	$(element).style.top = midY + "px";
	$(element).style.left = midX + "px";
	$(element).style.border = '1px solid #B2ACAB';
	$(element).style.background = '#F3F3F3';
//	$(element).style.padding = '15px';
}

/*
* This function will bring up the prompt to edit a page title
*
* @param	int site_id
* @param	int page_id
* @param	string page_title (current page_title)
* @return 	void
* @author	Scott Roach
* @example	edit_title(0, 3, 'My contact page');
*/
function edit_title(site_id, page_id, page_title, flag)
{
	position('PM_edit_page_title', 250);
	$('PM_edit_title_site_id').value = site_id;
	$('PM_edit_title_page_id').value = page_id;
	if ($('PM_new_page_title').value == '' || flag)
	{
		$('PM_new_page_title').value = page_title;
	}
	Effect.Appear('PM_edit_page_title');
}

/*
* This function will bring up the prompt to edit a page name
*
* @param	int site_id
* @param	int page_id
* @param	string page_name (current page_name)
* @return 	void
* @author	Scott Roach
* @example	edit_page_name(0, 3, contact);
*/
function edit_page_name(site_id, page_id, page_name, flag)
{
	position('PM_edit_page_name', 250);
	$('PM_edit_name_site_id').value = site_id;
	$('PM_edit_name_page_id').value = page_id;
	if ($('PM_new_page_name').value == '' || flag)
	{
		$('PM_new_page_name').value = page_name;
	}
	Effect.Appear('PM_edit_page_name');
}

/*
* This function will bring up the promt to edit a site's name
*
* @param	int site_id
* @param	string site_name (current site_name)
* @return 	void
* @author	Scott Roach
* @example	edit_site_name(0, 'Dentist Site');
*/
function edit_site_name(site_id, site_name)
{
	position('PM_edit_site_name', 250);
	$('PM_edit_site_id').value = site_id;
	$('PM_new_site_name').value = site_name;
	Effect.Appear('PM_edit_site_name');
}

/*
* This function will bring up the prompt to clone a page
*
* @param	int site_id
* @param	int page_id
* @return 	void
* @author	Scott Roach
* @example	clone_page(0, 3); clone page 0, 3
*/
function clone_page(site_id, page_id)
{
	position('PM_clone_page', 250);
	$('PM_clone_site_id').value = site_id;
	$('PM_clone_page_id').value = page_id;
	Effect.Appear('PM_clone_page');
}

/*
* This function will bring up the prompt to edit a mount point
*
* @param	int site_id
* @return 	void
* @author	Scott Roach
* @example	edit_mount_point(0);
*/
function edit_mount_point(site_id)
{
	hide_mounts();
	$('PM_edit_mount_point').style.display = 'none';
	position('PM_edit_mount_point', 300);
	$('PM_mount_point_' + site_id).style.display = 'inline';
	$('PM_mount_point_site_id').value = site_id;
	Effect.Appear('PM_edit_mount_point');
}

/*
* This function will actually edit a page title from the prompt that was put up by edit_title()
*
* @return 	void
* @author	Scott Roach
* @example	submit_page_title();
*/
function submit_page_title(flag)
{
	url = '/mason/admin/landing-ajax.php?action=edittitle&page_id=' + $F('PM_edit_title_page_id') + '&site_id=' + $F('PM_edit_title_site_id') + '&page_title=' + $F('PM_new_page_title') + '&_=1&flag=' + flag;
	var myAjax = new Ajax.Updater('PM_edit_sites', url, {method: 'get', evalScripts: true});
	cancel_submit('PM_edit_page_title');
}

/*
* This function will actually add a cloned page from the prompt that was placed by clone_page()
*
* @return 	void
* @author	Scott Roach
* @example	submit_cloned_page();
*/
function submit_cloned_page(flag)
{
	url = '/mason/admin/landing-ajax.php?action=clonepage&page_id=' + $F('PM_clone_page_id') + '&site_id=' + $F('PM_clone_site_id') + '&page_name=' + $F('PM_cloned_page_name') + '&_=1&flag=' + flag;
	var myAjax = new Ajax.Updater('PM_edit_sites', url, {method: 'get', evalScripts: true});
	cancel_submit('PM_clone_page');
}

/*
* This function will actually edit a page name from the prompt that was put up by edit_page_name()
*
* @return 	void
* @author	Scott Roach
* @example	submit_page_name();
*/
function submit_page_name(flag)
{
	url = '/mason/admin/landing-ajax.php?action=pagename&page_id=' + $F('PM_edit_name_page_id') + '&site_id=' + $F('PM_edit_name_site_id') + '&page_name=' + $F('PM_new_page_name') + '&_=1&flag=' + flag;
	var myAjax = new Ajax.Updater('PM_edit_sites', url, {method: 'get', evalScripts: true});
	cancel_submit('PM_edit_page_name');
}

/*
* This function will actually edit a site name from the prompt that was put up edit_site_name()
*
* @return 	void
* @author	Scott Roach
* @example	submit_site_name();
*/
function submit_site_name()
{
	url = '/mason/admin/landing-ajax.php?action=sitename&site_id=' + $F('PM_edit_site_id') + '&site_name=' + $F('PM_new_site_name') + '&_=1';
	var myAjax = new Ajax.Updater('PM_edit_sites', url, {method: 'get', evalScripts: true});
	cancel_submit('PM_edit_site_name');
}

/*
* This function will actually edit a site's mount point from the prompt that was put up edit_mount_point()
*
* @return 	void
* @author	Scott Roach
* @example	submit_new_mount_point();
*/
function submit_new_mount_point()
{
	selects = $('PM_edit_mount_point').getElementsByTagName('select');
	for(i=0;i<selects.length;i++)
	{
		if(selects[i].style.display == 'inline')
		{
			id_to_use = selects[i].id;
			break;
		}
	}
	url = '/mason/admin/landing-ajax.php?action=mountpoint&site_id=' + $F('PM_mount_point_site_id') + '&mount_point=' + $F(id_to_use) + '&_=1';
	var myAjax = new Ajax.Updater('PM_empty_results', url, {method: 'get', evalScripts: true});
	cancel_submit('PM_edit_mount_point');
}

// Javascript from index.php

function init()
{
//	site_modified = false;
	get_window_dimensions();
	editable(Helpers['InitialHelper']);
	set_editor_links();
	adjust_helper();
}

function set_editor_links()
{
	var html = '';	
	
	html += '<div id="menus"><a href="#" onclick="parent.update_main_content();">OK</a> <a href="#" onclick="parent.close_main_editor();">Cancel</a></div>';
		
	self.frames[0].document.getElementById('controls').innerHTML = html;
	self.frames[1].document.getElementById('controls').innerHTML = '';
}

function IEfix(height, overflow)
{
	if(nav_type.indexOf('msie') + 1)
	{
		thehtml = document.getElementsByTagName('html')[0];
		thehtml.style.height = height;
		thehtml.style.overflow = overflow;
		thebody = document.getElementsByTagName('body')[0];
		thebody.style.height = height;
		thebody.style.overflow = overflow;
		window.scrollTo(0, 0);
	}
}

function find_sites()
{
	var url = main_url + 'getsites.php';
	var myAjax = new Ajax.Updater('sites', url, {onComplete: function(){close_editor();}});
}


function show_sites(originalRequest)
{
	$('sites').innerHTML = originalRequest.responseText;
	close_editor();
}


function find_pages(site_id)
{
	g_site_id = site_id;
	var url = main_url + 'getpages.php?site_id=' + g_site_id;
	var myAjax = new Ajax.Request(url, {onComplete: show_pages});
}


function show_pages(originalRequest)
{
	//$('pages').innerHTML = originalRequest.responseText;
	close_editor();
}


function find_page(page_id)
{
	g_page_id = page_id;
	var url = main_url + 'getpage.php?site_id=' + g_site_id + '&page_id=' + g_page_id;
	var myAjax = new Ajax.Request(url, {onComplete: show_page});
}


function show_page(originalRequest)
{
	$('page_content').innerHTML = originalRequest.responseText;
	//set_CSS_file(0);
	set_CSS_file();
	set_listeners();
	close_editor();
	if($('menu1'))
	{
		Sortable.create('menu1', {onUpdate:function(){reload_menu(1);}, handle: 'handle1', overlap: 'horizontal', constraint: 'horizontal'});
	}
	if($('menu2'))
	{
		Sortable.create('menu2', {onUpdate:function(){reload_menu(2);}, handle: 'handle2', overlap: 'vertical', constraint: 'vertical'});
	}
	if($('page_title'))
	{
		document.title = $('page_title').innerHTML;
	}
}


function reload_menu(menuID)
{
	var url = main_url + 'editpage.php?site_id=' + g_site_id + '&page_id=' + g_page_id + '&edit_type=reordermenu&menu=' + menuID + '&';
	url += Sortable.serialize('menu' + menuID);
	var myAjax = new Ajax.Updater({success: 'menu' + menuID}, url, {onComplete: function()
	{
		if(menuID == 1)
		{
			Sortable.create('menu1', {onUpdate:function(){reload_menu(1);}, handle: 'handle1', overlap: 'horizontal', constraint: 'horizontal'});
		}
		if(menuID == 2)
		{
			Sortable.create('menu2', {onUpdate:function(){reload_menu(2);}, handle: 'handle2', overlap: 'vertical', constraint: 'vertical'});
		}
		set_listeners();
	}});
	
//	site_modified = true;
}


function delete_menu_item(menuID, itemID)
{
	close_editor();
	var url = main_url + 'editpage.php?site_id=' + g_site_id + '&page_id=' + g_page_id + '&edit_type=deletemenuitem&menu=' + menuID + '&menu' + menuID + '=' + itemID;
	var myAjax = new Ajax.Updater({success: 'menu' + menuID}, url, {onComplete: function()
	{
		if(menuID == 1)
		{
			Sortable.create('menu1', {onUpdate:function(){reload_menu(1);}, handle: 'handle1', overlap: 'horizontal', constraint: 'horizontal'});
		}
		if(menuID == 2)
		{
			Sortable.create('menu2', {onUpdate:function(){reload_menu(2);}, handle: 'handle2', overlap: 'vertical', constraint: 'vertical'});
		}
		set_listeners();
	}});
	
//	site_modified = true;
}

function set_drag_helpers(what)
{
	what.onmouseover = function () {editable(Helpers['DragMenuItem']);}
	what.onmouseout = function(){default_editable();}
}

function set_listeners()
{
	elements.each(function(element){add_listeners(element)});
	$('content').onmouseover = function () {editable(Helpers['EditPageContent']);}
	$('content').onmouseout = function(){default_editable();}
	$('content').onclick = show_main_editor;
	$('content').innerHTML = override_links($('content').innerHTML);
	$('content').style.cursor = 'pointer';

	document.getElementsByClassName('handle1', $('menu1')).each(function(element){set_drag_helpers(element)});
	document.getElementsByClassName('handle2', $('menu2')).each(function(element){set_drag_helpers(element)});
}


function add_listeners(what)
{
	var helperid;
	if($('mason-' + what))
	{
		switch(what)
		{
			case 'header':
				helperid = 'EditHeader';
			break;
			case 'footer':
				helperid = 'EditFooter';
			break;
			case 'editable1':
			case 'editable2':
			case 'editable3':
			case 'editable4':
			case 'editable5':
			    helperid = 'EditEditable';
			break;
			default:
				helperid = 'EditMenuItem';
			break;
		}
		$('mason-' + what).onmouseover = function () {editable(Helpers[helperid]);}
		$('mason-' + what).onmouseout = function(){default_editable();}
		$('mason-' + what).onclick = function () {add_edit_field(what);}
		$('mason-' + what).innerHTML = override_links($('mason-' + what).innerHTML);
		$('mason-' + what).style.cursor = 'pointer';
	}
}


function add_edit_field(theid)
{
	close_editor();
	IEfix('100%', 'hidden');
	get_window_dimensions();	
	
	var html = $('edit' + theid).innerHTML;
	self.frames[1].document.getElementById('controls').innerHTML = html;

	$('grey_filler').style.display = 'block';
	$('fck-box-inline').style.left = '50%';
	$('fck-box-inline').style.top = '50%';
	$('fck-box-inline').style.marginTop = (-1 * parseInt((windowY * inline_editor_height) / 2)) + 'px';
	$('fck-box-inline').style.marginLeft = (-1 * parseInt((windowX * inline_editor_width) / 2)) + 'px';
	
	var editor = FCKeditorAPI.GetInstance('fck-editor-inline');
	
	if($('mason-' + theid))
	{
		editor.SetHTML(rewrite_links($('mason-' + theid).innerHTML));
	}
	else
	{
		editor.SetHTML('');
	}
	
	editor.Focus();
}

function close_editor()
{
	elements.each(function(element){if($('edit' + element)) $('edit' + element).style.display = 'none';});
	
	$('grey_filler').style.display = 'none';
	$('fck-box-inline').style.top = '-3000px';	
	IEfix('auto', 'auto');
}


function edit_this(what)
{
//	site_modified = true;
	
	thefck = FCKeditorAPI.GetInstance('fck-editor-inline').GetXHTML();
	if(thefck == '' || thefck == null)
	{
		$('helper').innerHTML = '<span style="color: red;">You must enter some text to submit</span>';
		return;
	}
	close_editor();
	add = '';
	if(!$('mason-' + what))
	{
		add = '&add_item=1';
	}
	var url = main_url + 'editpage.php?page_id=' + g_page_id + '&site_id=' + g_site_id + '&edit_type=' + what + add;
	var myAjax = new Ajax.Request(url, {onComplete: show_page, parameters: 'content=' + escape(encode_html(thefck))});
}


function editor_is_open()
{
	if($('fck-box-inline'))
	{
		return ($('fck-box-inline').style.top.replace('px', '') < 0);
	}
	return false;
}


function encode_html(s)
{
        var str = new String(s);
        str = str.replace(/&/g, "&amp;");
        str = str.replace(/</g, "&lt;");
        str = str.replace(/>/g, "&gt;");
        str = str.replace(/\"/g, "&quot;");
        return str;
}


function override_links(what)
{
	return what.replace(/href=/gi, 'xref=');
}


function rewrite_links(what)
{
	return what.replace(/xref=/gi, 'href=');
}


function add_menu_item(what)
{
	i = 1;
	while($('mason-' + what + '-item' + i))
	{
		i++;
	}
	if(i > 8)
	{
		alert('Eight is enough! You can only have 8 items per menu.');
		return;
	}
	add_edit_field(what + '-item' + i);
//	site_modified = true;
}


function set_CSS_file()
{
	var sheets;
	if(!window.ScriptEngine && navigator.__ice_version)
	{
		sheets = document.styleSheets;
	}
	if(document.getElementsByTagName)
	{
		sheets = document.getElementsByTagName('link');
	}
	else if(document.styleSheets && document.all)
	{
		sheets = document.all.tags('LINK');
	}
	tempstr = '';
	for(i=0; i<sheets.length;i++)
	{

		if(sheets[i].title == ('page' + g_page_id) || sheets[i].title == 'main' || sheets[i].title == 'menu')
		{
			sheets[i].disabled = false;
		}
		else
		{
			sheets[i].disabled = true;
		}
	}
}


function show_main_editor()
{
	close_editor();
	IEfix('100%', 'hidden');
	get_window_dimensions();
	$('grey_filler').style.display = 'block';
	$('fck-editor-main').style.left = '50%';
	$('fck-editor-main').style.top = '50%';
	$('fck-editor-main').style.marginTop = (-1 * parseInt((windowY * main_editor_height) / 2)) + 'px';
	$('fck-editor-main').style.marginLeft = (-1 * parseInt((windowX * main_editor_width) / 2)) + 'px';
	var editor = FCKeditorAPI.GetInstance('fck-editor-main');
	editor.SetHTML($('editable_content').innerHTML);
}


function close_main_editor()
{
	$('grey_filler').style.display = 'none';
	$('fck-editor-main').style.top = '-3000px';
	IEfix('auto', 'auto');
}


function update_main_content()
{
	close_main_editor();
//	site_modified = true;
	thefck = FCKeditorAPI.GetInstance('fck-editor-main').GetXHTML();
	var url = main_url + 'editpage.php?page_id=' + g_page_id + '&site_id=' + g_site_id + '&edit_type=content';
	var myAjax = new Ajax.Request(url, {onComplete: show_page, parameters: 'content=' + escape(encode_html(thefck))});
}

function add_page(site_id)
{
	position('PM_add_page', 250);
	$('PM_add_page_site_id').value = site_id;
	Effect.Appear('PM_add_page');
}

function submit_add_page()
{
	var page_name = $('PM_add_page_name').value;
	if(page_name != "" && page_name != null && page_name.length > 3)
	{
		url = '/mason/admin/landing-ajax.php?action=addpage&page_name=' + page_name + '&site_id=' + $F('PM_add_page_site_id') + '&selected=true&_=1';
		var myAjax = new Ajax.Updater('PM_edit_sites', url,
			{method: 'get', evalScripts: true,
			onComplete: function(){
				var confirmit = confirm("The page was successfully created!\nWould you like to be taken to it?");
				if(confirmit)
				{
					alert_to_save(site_id);
					edit_site();
				}
			}});
		cancel_submit('PM_add_page');
	}
	else if (page_name != null)
	{
		alert("The page name must be at least 4 characters in length\nPlease try again.");
//		add_page(site_id);
	}
	else
	{
		
	}
}


function delete_page(site_id, page_id)
{
	var confirmit = confirm("Are you sure you want to delete this page?");
	if(confirmit)
	{
		url = '/mason/admin/landing-ajax.php?action=rmpage&page_id=' + page_id + '&site_id=' + site_id + '&_=1';
		var myAjax = new Ajax.Updater('PM_edit_sites', url, {method: 'get', evalScripts: true});
		confirmit = confirm("The page has been deleted.\nWould you like to be taken back to the main page?");
		if(confirmit)
		{
			window.location = '/mason/landing.php';
		}
	}
}


function save_site(site_id)
{
	var confirmit = confirm("Are you sure that you want to save your site?");
	if(confirmit)
	{
		url = '/mason/admin/landing-ajax.php?action=savesite&site_id=' + site_id + '&_=1';
		var myAjax = new Ajax.Request(url, {method: 'get', onComplete: function(){alert('Your site has been saved')}});
	}
}

function alert_to_save(site_id)
{
/*	if( site_modified )
	{
		var confirmit = confirm("You are about to leave your page unsaved? Would you like to save it before you navigate away?");
		if(confirmit)
		{
			url = '/mason/admin/landing-ajax.php?action=savesite&site_id=' + site_id + '&_=1';
			var myAjax = new Ajax.Request(url, {method: 'get', onComplete: function(){alert('Your site has been saved')}});
		}
	}
*/	
}

function revert_site(site_id)
{
	var confirmit = confirm("Are you sure that you want to revert your site to the last saved copy?\nAll of your current changes will be lost.");
	if(confirmit)
	{
		url = '/mason/admin/landing-ajax.php?action=revertsite&site_id=' + site_id + '&_=1';
		var myAjax = new Ajax.Request(url, {method: 'get', onComplete: function(){find_page(g_page_id);alert('Your site has been reverted to your last saved copy');}});
	}
}