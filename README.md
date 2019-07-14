#web-mexican-sun

**Web Mexican Sun is a javascript library that makes it easier to retreive html file contents via XMLHttpRequest**

What can you do?
- You can retreive the contents of a single HTML file, or multiple HTML files.
- You can retreive data that is spread over multiple html pages, (that specifies the page number in the url)

Once you retreive the HTML, you can then extract the data you need, then use HTML/CSS/JAVASCRIPT to display the data on your own HTML page

##Dependieces##
These files need to be included in your HTML pages head tag, in the same order. These files are included in the repository so you can use them locally, or using the links below (will require internet connection to run) 
- [joyride-omen.js](http://www.hllywdunddnnpnt.com/js-joyride-omen/joyride-omen-1.0.0.js) This is a sperate javascript library, which this library requires
- [web-mexican-sun.s](http://www.hllywdunddnnpnt.com/js-web-mexican-sun/web-mexican-sun-1.0.0.js) This is the library js file 

##Files##
The files below are included in this repository, which already contain the code, but you can look to "How to Use" to see how to build these files from scratch
- index.html // is your html page
- main.js // is your js file

##How to Use##

**Step 1**
1. Create a new js file (i.e "main.js") and copy/paste the code below, this is where you will put your js code
```JAVASCRIPT
var data_list = []; // array which will store your data list, data retreived from the selected html pages(s)

page.min = 1; // this sets the default value, for the starting page
page.span = 5; // this sets the default value, for the amount of pages it will grab
// "page.max" is automatically set, which contains the default value, for the ending page 

// call the $onload function and place your code in, this means the browser will wait until the page is loaded before running the code
$onload(function()
	{
		webms_init({
			url: "[PAGE_URL]", // set the value to the target url here, with the page selector at the very end
			list: data_list, // set the value to your data_list
			elm_id: "write", // set the value to the id of the element to write the HTML to
			data_func: store_data, // set the value to the function that will store data into the data list
			build_func: build_article, // set the value to the function that will generate the HTML to display the all articles
		});
	});

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
```

In the "webms_init" function, update the "url" value. Replace "[PAGE_URL]" with the url of the target HTML page(s)
In the "webms_init" function, update the "elm_id" value with id name of the HTML element you want to write your HTML code to
Edit the "store_data" and "build_article" functions which will be used to retreive the data you require from the specified url and display the results on your HTML page

**Step 2**
1. Create a new html file (i.e "index.html") and copy/paste the code below, this is where you will put your HTML markup

```HTML
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Example</title>
	<script type="text/javascript" src="joyride-omen-1.0.0.js"></script>
	<script type="text/javascript" src="web-mexican-sun-1.0.0.js"></script>

	<script type="text/javascript" src="main.js"></script>
</head>
<body>
	<div id="write"></div>
</body>
</html>
```

- In the last script tag, in the src property replace "main.js" with the path to your js file
- The div tag that is inside the body tag, replace its id with the id you have chosen (must match the "elm_id" value in your js file)

**Step 3**
1. Create a new css file (i.e "style.css"), this is where you will put your css code that will style your HTML
2. Add your css stylesheet to your head tag
```HTML
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Example</title>
	<link rel="stylesheet" type="text/css" href="style.css">
```
In the link tag, in the href property replace "style.css" with the path to your css stylesheet file