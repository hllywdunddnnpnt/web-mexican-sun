
var list = [];
var obj_query = {};
var page = 
	{
		min: 1, // sets the default, first page to select
		span: 1, // sets the default, amount of pages to select
	};
// page.max = contains the last selected page, set automatically

function webms_init(obj)
	{
		webms_query_data(page);
		obj.page = page;
		webms_cycle_page_data(obj);
		webms_build_display(obj);
	}

function webms_cycle_page_data(obj)
	{
		var min = obj.page.min ? obj.page.min : 1;
		var span = obj.page.span ? obj.page.span : 1;
		span.$loop(min,1,function(page)
			{
				webms_get_page_data(obj, page); // retrieves the data for the selecte page
			});
	}

// pass the page number and retreive an array (of objects) of all the details of the mangas that are displayed on that page
function webms_get_page_data(obj, setpage)
	{
		var url = obj.url ? obj.url : "";
		var page = $isnum(obj.page) ? obj.page : ($isnum(setpage) ? setpage : 1);
		var list = obj.list ? obj.list : [];
		var data_func = obj.data_func ? obj.data_func : function(){return null;};
	// retrieves the contents from the html file of the given link
		$ajax_post(url+page,{},function(result)
			{
			// take the html files text and convert it into a html object
				var resultHTML = result.$toHTML();
			// cycle through the articles and add its title to an array
				data_func(resultHTML,list,page);
			},false);
	}

function webms_build_display(obj)
	{
		var list = obj.list ? obj.list : [];
		var build_func = obj.build_func ? obj.build_func : function(){return null;};
		var html = "";
		list.$cycle(function(item)
			{
				html += build_func(item); // builds the manga articles, and adds the html to the "html" variable
			}); 
		if ($iselm($id(obj.elm_id))) $id(obj.elm_id).innerHTML = html;
	}

function webms_navdata()
	{
		var next = webms_navdata2(true);
		var prev = webms_navdata2(false);
		return {
			next,
			prev,
		};
	}

function webms_navdata2(forward)
	{
		if (!$isboo(forward)) forward = true;
		var new_query = obj_query.$copy();
		if (!new_query.page) new_query.page = page.min;
		var span_next = new_query.span ? new_query.span : page.span;
		new_query.page = (forward ? new_query.page + page.span : new_query.page - page.span);
		var max = new_query.page + page.span - 1;
		var url = $query_string_update(location.href,new_query);
		var obj = {};
		if (new_query.page > 0)${1:}
			{
				obj.url = url;
				obj.start = new_query.page;
				obj.end = max;
			}
		return obj;
	}

function webms_query_data(page)
	{
		obj_query = $query_string(location.href);
		if (obj_query.page) page.min = obj_query.page; // overrides the select page, if it is specified in the url
		if (obj_query.span) page.span = obj_query.span; // overrides the amount of pages to select, if it is specified in the url
		page.max = page.min + page.span - 1;
	}

function $page_top_event(elm, event_type)
	{
		elm.addEventListener(event_type,function(e)
			{
				document.body.scrollTop = 0; // For Safari
  				document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
			});
	}

