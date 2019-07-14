
var data_list = []; // will contain a list of data from all the manga selected
page = {
	min: 1, // sets the default, first page to select
	span: 5, // sets the default, amount of pages to select
};

$onload(function()
	{ 
		webms_init({
			url: "[PAGE_URL]", // place the target url here, with the page selector at the very end
			list: data_list, // the array that will contain the data list
			elm_id: "write", // the id of the element to write the HTML to
			data_func: store_data, // the function that will store data into the data list
			build_func: build_article, // function that will generate the HTML to display the all articles
		});
		
	// retreives data to make page navigation buttons
		var nav_data = webms_navdata();

	/*
		- using the "page" and "nav_data" objects you can make page info labels and navigation links/buttons
		- add an event for a "top of the page" link/button
	*/

	});

/*
	DO NOT CHANGE any of the functions below, but you will need to add to them
	The functions below is what the api will use to retreive, store and display the data
*/

// function that passes through the selected article and returns an object with all the data
function retreive_data(article, sel_page) 
	{
		var obj = {};
		return obj;
	}

// function that cycles through all articles and adds the data to the data list
function store_data(HTML, list, sel_page) // data_func
	{
		// retreive_data();
	}

// function that passes the selected data object, and uses the data to build & display the new article
function build_article(item) // build_func
	{
		var html = '';
		return html;
	}