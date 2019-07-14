
# web-mexican-sun

**Web Mexican Sun is a javascript library that makes it easier to retreive html file contents via XMLHttpRequest**

What can you do?
- You can retreive the contents of a single HTML file, or multiple HTML files.
- You can retreive data that is spread over multiple html pages, (that specifies the page number in the url)

Once you retreive the HTML, you can then extract the data you need, then use HTML/CSS/JAVASCRIPT to display the data on your own HTML page

## Dependieces
These files need to be included in your HTML pages head tag, in the same order. These files are included in the repository so you can use them locally, or using the links below (will require internet connection to run) 
- [joyride-omen.js](http://www.hllywdunddnnpnt.com/js-joyride-omen/joyride-omen-1.0.0.js) This is a sperate javascript library, which this library requires
- [web-mexican-sun.js](http://www.hllywdunddnnpnt.com/js-web-mexican-sun/web-mexican-sun-1.0.0.js) This is the library js file 

## Files
The files below are included in this repository, which already contain the code, but you can look to "How to Use" to see how to build these files from scratch
- [index.html](index.html) // is your html page
- [main.js](main.js) // is your js file

# How to Use

## Step 1
Create a new html file (i.e "index.html") and open for edit, then follow the steps below.
*(All code under **Step 1:** goes in your html file, that you just created)*

1. Add the basic required HTML tags, like DOCTYPE, HTML, HEAD, BODY

2. Include the required js files to your HTML page using a script tags

3. Include your **Main** js file to your HTML page using a script tag. *replace main.js with the path of your **Main** js file which we havent created yet*

4. Add an empty DIV tag to body and give it an id *replace "write" with the id you chose*

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

## Step 2
Create a new js file and open for edit, then follow the steps below. We will call this file your **Main** js file, you can call it anything you want, but here we will call it **"main.js"**.
*All code under **Step 2:** goes in your **Main** js file)*

1. Call the **$onload** function, and place your code within a callback function that you pass through the 1st parameter. You can also define a function globally then pass its name through the 1st parameter, this is so that your code only runs once the page has fully loaded

2. Create a new instance of WebMexicanSun and assign it to a variable, to use globally you will need to define the variable globally (and leave it empty)

3. Set the Required *properties*.

4. Call the Required *methods*.

	*Note: All propteries must be set before calling methods, as the methods need to use the properties*
	*Note: The first param in the "webms_build" references the id of the div tag that you added to your html page *

```JAVASCRIPT
var WMS;
$onload(function()
	{
		// Creates a new instance of WebMexicanSun and assigns to the "WMS" variable so you can reference it
			WMS = new WebMexicanSun();

		// This sets the default starting page
			WMS.pageMin = 1;

		// This sets the default amoutn of pages to be selected
			WMS.pageSpan = 5;

		// This sets the target URL
			WMS.url = "[TARGET_URL]"; 

		// This assigns a callback function, called the "data_func"
		// The "data_func" function  will be used to retreive the data from the selected webpage(s)
			WMS.data_func = function (HTML, list, page)
				{
					// leave blank for now
				};

		// This function retreives all the data from the selected webpage(s)
			WMS.webms_init();

		// This function writes the generated HTML code to the webpage(s)
		// A callback function called "build_func" needs to be passed through the 2nd param
			WMS.webms_build("write",function (item)
				{
					// leave blank for now
				});
	});
```

## Step 3
Create a new js file and open for edit, then follow the steps below. We will call this file your **Funcs** js file, you can call it anything you want, but here we will call it **"funcs.js"**.

1. Copy & Paste the code below into this file

```JAVASCRIPT
function data_func_WMS (HTML, list, page)
	{
		// leave blank for now
	}

function build_func_WMS (item)
	{
		// leave blank for now
	}

function select_func_WMS (article, page)
	{
		// leave blank for now
	}
```

2. Include your **"Funcs"** js file to your HTML page using a script tag, above the last script tag. Replace "funcs.js" with the correct path.

3. If you named your **"Main"** js file a different name, or created it in a different directory, then update the src path. Replace "main.js" with the correct path.

```HTML
	<script type="text/javascript" src="funcs.js"></script>

	<script type="text/javascript" src="main.js"></script>
</head>
```

4. Open up your **Main** js file, and ready for edit.

You need to make some edits

```JAVASCRIPT
// Replace

	WMS.data_func = function (HTML, list, page)
		{
			// leave blank for now
		};

// With

	WMS.data_func = data_func_WMS;
```

and

```JAVASCRIPT
// Replace

	WMS.webms_build("write",function (item)
		{
			// leave blank for now
		});

// With

	WMS.webms_build("write", build_func_WMS);
```

Comment out the **WMS.webms_build** method that you have called
Below the **WMS.webms_build** method that you have called, print the WebMexicanSun instance to the console

```JAVASCRIPT
	// This function retreives all the data from the selected webpage(s)
		WMS.webms_init();

	$log(WMS);

	// This function writes the generated HTML code to the webpage(s)
	// A callback function called "build_func" needs to be passed through the 2nd param
	//	WMS.webms_build("write", build_func_WMS);
```

Here is what your **Main** js file should look like now

```JAVASCRIPT
var WMS;
$onload(function()
	{
		// Creates a new instance of WebMexicanSun and assigns to the "WMS" variable so you can reference it
			WMS = new WebMexicanSun();

		// This sets the default starting page
			WMS.pageMin = 1;

		// This sets the default amoutn of pages to be selected
			WMS.pageSpan = 5;

		// This sets the target URL
			WMS.url = "[TARGET_URL]"; 

		// This assigns a callback function, called the "data_func"
		// The "data_func" function  will be used to retreive the data from the selected webpage(s)
			WMS.data_func = data_func_WMS;

		// This function retreives all the data from the selected webpage(s)
			WMS.webms_init();

		$log(WMS);

		// This function writes the generated HTML code to the webpage(s)
		// A callback function called "build_func" needs to be passed through the 2nd param
		//	WMS.webms_build("write", build_func_WMS);
	});
```

## Step 4:
Open your **Func** js file and ready for edit.

1  Build the **data_func_WMS** function
	- The 1st param "HTML" contains the data returned form the selected URL, converted into HTML Element Object
	- The 2nd param "list" contians the datalist which the extracted data will be saved to
	- The 4rd param "page" contains the selected page number

  1  First you need to select the element that contains the data you want, and create a reference list

```
For example if you want to extract data that is displayed in a table, then you need to be able to reference the tables rows (TR tags). Then you need to store all these table row references into a list.
```

```JAVASCRIPT
function data_func_WMS (HTML, list, page)
	{
		var table = $id("table"); // reference the table by id
		var list_tr = table.rows; // stores a reference to all the tables rows (TR tags)
	}
```

  2  Once you have your reference list, you need to iterate through the table rows, so that you can extract data from within the rows

```JAVASCRIPT
	ref_list.$cycle(function(item)
		{

		});
```

  3  When you iterate through the list results you need to add the returned data to the datalist, the **select_func_WMS** function will return the data, so you need to call it and pass the *"item"* and *"page"* variables

```JAVASCRIPT
	datalist.push( 
		select_func_WMS (item, page) 
	);
```

  4  Your **data_func_WMS** function should look like this

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

2. Build the **select_func_WMS** function
	- The 1st param "ref" contains the reference to the single element *In this case a single table row (TR tag)*

2a. First you need to define a new object and return it, this object will contain the data to be returned
*Here will call the object "data"*

```JAVASCRIPT
function select_func_WMS (ref, page)
	{
		var data = {};

		// leave this blank

		return data;
	}
```

2b. Using the *ref* param, extract data and store it in the *data* object

```JAVASCRIPT
function select_func_WMS (ref, page)
	{
		var data = {};

		data.name = ""; // get name
		data.age = ""; // get age
		data.geneder = ""; // get gender

		return data;
	}
```

3. Build the **build_func_WMS** function
	- The 1st param "item" contains the *data* object, which contains all the rerturned data 

3a. First you need to define a new string and return it, this string will contain the html code to be returned
*Here will call the object "html"*

```JAVASCRIPT
function build_func_WMS (item, page)
	{
		var html = '';

		// leave this blank

		return html;
	}
```

3a. First you need to define a new string and return it, this string will contain the html code to be returned
*Here will call the object "html"*

3b. Using the *item* param, place data within formatted HTML, as shown below

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

### You have Finished

