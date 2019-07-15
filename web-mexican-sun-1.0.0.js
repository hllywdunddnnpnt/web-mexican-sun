
function WebMexicanSun()
	{
		this.pageMin = 1;
		this.pageSpan = 3;
		this.datalist = [];
		this.html = '';
		this.url = "";
		this.webms_init = function(data_func)
			{
				webms_query_data(this);
				this.pageMax = this.pageMin + this.pageSpan - 1;
				var ref = this;
				this.pageSpan.$loop(this.pageMin,1,function(page)
					{
						webms_get_page_data(ref, data_func, page);
					});
				this.info = webms_get_nav_link_data(this);
			};
		this.webms_build = function(elm_id, callback)
			{
				var ref = this;
				if (!$isfunc(callback)) $error("The specified callback function, is not a valid function");
				else if (!$iselm($id(elm_id))) $error("The specified element id, is invalid");
				else
					{
						if (this.datalist.length > 0)
							{
								this.datalist.$cycle(function(item)
									{
										ref.html += callback(item); // builds the manga articles, and adds the html to the "html" variable
									}); 
								$id(elm_id).innerHTML = ref.html;
							}
						else
							{
								$warn("The datalist is empty, no data was returned");
							}
					}
			};
	}

// pass the page number and retreive an array (of objects) of all the details of the mangas that are displayed on that page
function webms_get_page_data(ref, data_func, page)
	{
		var url = ref.url + page;
	// retrieves the contents from the html file of the given link
		$ajax_post(url,{},function(result)
			{
			// take the html files text and convert it into a html object
				var resultHTML = result.$toHTML();
			// cycle through the articles and add its title to an array
				data_func(resultHTML, ref.datalist, page);
			},false);
	}

function webms_get_nav_link_data(ref)
	{
		var next = webms_get_nav_link_data2(ref, true);
		var prev = webms_get_nav_link_data2(ref, false);
		return {
			next,
			prev,
		};
	}

function webms_get_nav_link_data2(ref, forward)
	{
		if (!$isboo(forward)) forward = true;
		var new_query = obj_query.$copy();
		if (!new_query.page) new_query.page = ref.pageMin;
		var span_next = new_query.span ? new_query.span : ref.pageSpan;
		new_query.page = (forward ? new_query.page + ref.pageSpan : new_query.page - ref.pageSpan);
		var max = new_query.page + ref.pageSpan - 1;
		var url = $query_string_update(location.href,new_query);
		var obj = {};
		if (new_query.page > 0)
			{
				obj.url = url;
				obj.start = new_query.page;
				obj.end = max;
			}
		return obj;
	}

function webms_query_data(ref, page)
	{
		obj_query = $query_string(location.href);
		if ($ispos(obj_query.page)) ref.pageMin = obj_query.page; // overrides the select page, if it is specified in the url
		if ($ispos(obj_query.span)) ref.pageSpan = obj_query.span; // overrides the amount of pages to select, if it is specified in the url
	}