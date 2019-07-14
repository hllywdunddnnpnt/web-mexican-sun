
# web-mexican-sun

**Web Mexican Sun is a javascript library that makes it easier to retreive html file contents via XMLHttpRequest**

What can you do?
- You can retreive the contents of a single HTML file, or multiple HTML files.
- You can retreive data that is spread over multiple html pages, (that specifies the page number in the url)

Once you retreive the HTML, you can then extract the data you need, then use HTML/CSS/JAVASCRIPT to display the data on your own HTML page

## Dependieces
These files need to be included in your HTML pages head tag, in the same order. These files are included in the repository so you can store them locally or reference them over the internet

**Locally**
- [joyride-omen.js](joyride-omen-1.0.0.js)
- [web-mexican-sun.js](web-mexican-sun-1.0.0.js)

**Internet**
- [joyride-omen.js](http://www.hllywdunddnnpnt.com/js-joyride-omen/joyride-omen-1.0.0.js)
- [web-mexican-sun.js](http://www.hllywdunddnnpnt.com/js-web-mexican-sun/web-mexican-sun-1.0.0.js)

## Files
The files below are included in this repository, which already contain the code, but you can look to "How to Use" to see how to build these files from scratch
- [index.html](index.html) *this is the html page*
- [main.js](main.js) *this is the main js file*
- [funcs.js](funcs.js) *this is the functions js file*
- [style.css](style.css) *this is the styling css file*

# How to Use

## Step 1 - *index.html*
Create a new html file, name it *"index.html"* and open for edit, then follow the steps below.

1. Add the basic required HTML tags, like DOCTYPE, HTML, HEAD, BODY

2. Include the required js files to your HTML page using a script tags

3. Include *"main.js"* to your HTML page using a script tag. *we will create this file later on*

4. Include *"funcs.js"* to your HTML page using a script tag. *we will create this file later on*

5. Add an empty DIV tag to body and give it an id *we will give it an id of **"write"***

**FILE: *index.html***
```HTML
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="style.css">

	<title>Example</title>

	<script type="text/javascript" src="joyride-omen-1.0.0.js"></script>
	<script type="text/javascript" src="web-mexican-sun-1.0.0.js"></script>

	<script type="text/javascript" src="funcs.js"></script>
	<script type="text/javascript" src="main.js"></script>
</head>
<body>
	<div id="write"></div>
</body>
</html>
```

## Step 2 - *style.css*
Create a new css file, name it *"style.css"*. *We will use this stylesheet to style the webpage later on*

## Step 3 - *main.js*
Create a new js file, name it *"main.js"* and open for edit, then follow the steps below.

1. Define a new function called **load_func**
2. At the top of the page, call the **$onload** function and pass through the **load_func** function in the 1st param
*This tells the script that all the code within **load_func** function, can't run until the webpage has been loaded*

**FILE: *main.js***
```JAVASCRIPT
$onload(load_func);

function load_func()
	{
		// leave blank for now
	}
```

3. At the very top of the page, define a variable, that will reference your **WebMexicanSun** instance, and leave it blank. *Here we will call it **"WMS"***

4. Within the **load_func** function create a new instance of **WebMexicanSun** and assign it to the **WMS** variable

**FILE: *main.js***
```JAVASCRIPT
var WMS;

$onload(load_func);

function load_func()
	{
		// Creates a new instance of WebMexicanSun and assigns to the "WMS" variable so you can reference it
			WMS = new WebMexicanSun();
	});
```

3. Set the Required *properties*.
4. Call the Required *methods*.

	*Note: All propteries must be set before calling methods, as the methods need to use the properties*
	*Note: The first param in the "webms_build" references the id of the div tag that you added to your html page*
	*Note: The "webms_build" method is commented out, as we don't want to call it just yet*

**FILE: *main.js***
```JAVASCRIPT
var WMS;

$onload(load_func);

function load_func()
	{
		// Creates a new instance of WebMexicanSun and assigns to the "WMS" variable so you can reference it
			WMS = new WebMexicanSun();

		// This sets the default starting page
			WMS.pageMin = 1;

		// This sets the default amoutn of pages to be selected
			WMS.pageSpan = 5;

		// This sets the target URL
			WMS.url = "[TARGET_URL]"; 

		// This assigns the "data_func_WMS" callback function, to the data_func property
		// The callback "data_func_WMS" function will be used to retreive the data from the selected webpage(s)
			WMS.data_func = data_func_WMS;

		// This function retreives all the data from the selected webpage(s)
			WMS.webms_init();

		// Prints the instance of WebMexicanSun to the console, for testing
			$log(WMS);

		// This function writes the generated HTML code to the webpage(s)
		// A callback function called "build_func_WMS" is passed through the 2nd param
		/*
			WMS.webms_build("write", build_func_WMS);
		*/
	});
```

## Step 4 - *funcs.js*
Create a new js file and open for edit, then follow the steps below. We will call this file your **Funcs** js file, you can call it anything you want, but here we will call it **"funcs.js"**.

*Note: The 3 functions below can be named anything, but you will need to reference these functions using the names you have given them*

**FILE: *funcs.js***
```JAVASCRIPT
// callback function that will be used to extract and store data
function data_func_WMS (HTML, list, page)
	{
		// leave blank for now
	}

// callback function that will be used to retreive data, this function is to be called in the "data_func_WMS" callback function
function select_func_WMS (article, page)
	{
		// leave blank for now
	}

// callback function that will be used to generate the html code, to build the webpage
function build_func_WMS (item)
	{
		// leave blank for now
	}
```

### Build the **data_func_WMS** function
- The 1st param "HTML" contains the data returned form the selected URL, converted into HTML Element Object
- The 2nd param "list" contians the datalist which the extracted data will be saved to
- The 3rd param "page" contains the selected page number

1. First you need to select the element that contains the data you want, and create a reference list

```
For example if you want to extract data that is displayed in a table, then you need to be able to reference the tables rows (TR tags). Then you need to store all these table row references into a list.
```

**FILE: *funcs.js*** *(snippet)*
```JAVASCRIPT
function data_func_WMS (HTML, list, page)
	{
		var table = $id("table"); // reference the table by id
		var list_tr = table.rows; // stores a reference to all the tables rows (TR tags)
	}
```

2. Once you have your reference list, you need to iterate through the table rows, so that you can extract data from within the rows

**FILE: *funcs.js*** *(snippet)*
```JAVASCRIPT
	ref_list.$cycle(function(item)
		{

		});
```

3. When you iterate through the list results you need to add the returned data to the datalist, the **select_func_WMS** function will return the data, so you need to call it and pass the *"item"* and *"page"* variables

**FILE: *funcs.js*** *(snippet)*
```JAVASCRIPT
	datalist.push( 
		select_func_WMS (item, page) 
	);
```

4. Your **data_func_WMS** function should look like this

**FILE: *funcs.js*** *(snippet)*
```JAVASCRIPT
function data_func_WMS (HTML, list, page)
	{
		var table = $id("table"); // reference the table by id
		var list_tr = table.rows; // stores a reference to all the tables rows (TR tags)

		ref_list.$cycle(function(ref)
			{
				datalist.push( 
					select_func_WMS (ref, page) 
				);
			});
	}
```

### Build the **select_func_WMS** function
- The 1st param "ref" contains the reference to the single element, in this case a single table row (TR tag)

1. First you need to define a new object and return it, this object will contain the data to be returned
*Here will call the object "data"*

**FILE: *funcs.js*** *(snippet)*
```JAVASCRIPT
function select_func_WMS (ref, page)
	{
		var data = {};

		// leave blank for now

		return data;
	}
```

2. Using the *ref* param, extract data and store it in the *data* object

**FILE: *funcs.js*** *(snippet)*
```JAVASCRIPT
function select_func_WMS (ref, page)
	{
		var data = {};

		data.name = ref.[?].innerHTML; // get name
		data.age = ref.[?].innerHTML; // get age
		data.geneder = ref.[?].innerHTML; // get gender

		return data;
	}
```

## Step 5 - *Testing*

1. Open *"index.html"* in the browser, or reload the page if you already have it opened in the browser
2. Open Developer Tools > Console

* If everything works, then you should see a **WebMexicanSun** object printed in the console, which you should be able to click on it to view all its properties and methods.
* If there are any errors or the **WebMexicanSun** object isn't printed in the console then you will have to do some debugging

If you can view the **WebMexicanSun** object in the console, then we want to click on the **datalist** property, which should contain an array, containing all the data that ahs been extracted.

If the **datalist** is empty or the data stored is not correct then you will need to continue to work on your **data_func_WMS** and **build_func_WMS** functions in the *"func.js"* file.

## Step 6 - Build your webpage

Once you have successfully retreived all the correct data you need to create a function that generates the HTML code

### Build the **"build_func_WMS"** function
*Note: The 1st param "item" contains the *data* object, which contains all the rerturned data*

1. First you need to define a new string and return it, this string will contain the html code to be returned
*Here will call the object "html"*

**FILE: *funcs.js*** *(snippet)*
```JAVASCRIPT
function build_func_WMS (item, page)
	{
		var html = '';

		// leave blank for now

		return html;
	}
```

2. First you need to define a new string and return it, this string will contain the html code to be returned
*Here will call the object "html"*

3. Using the *item* param, place data within formatted HTML, as shown below

**FILE: *funcs.js*** *(snippet)*
```JAVASCRIPT
function build_func_WMS (item, page)
	{
		var html = '';

		html += '<div>
			<div>
				Name: ' + ref.name + '
			</div>
			<div>
				Age: ' + ref.age + '
			</div>
			<div>
				Gender: ' + ref.gender + '
			</div>
		</div>';

		return html;
	}
```

4. Uncomment the *webms_build* method call, so that the script can build your webpage using the data from the datalist

## Step 7 -  Styling your webpage

Style your webpage using css in the **"style.css"** file

## Step 8 - *Testing*

Once you have finished editing **build_func_WMS** function, you need to reload the *"index.html"* page in the browser

- If your data is being displayed correctly then you are done
- If your data is not being displayed correctly then you will have to continue to work on your **build_func_WMS** function


