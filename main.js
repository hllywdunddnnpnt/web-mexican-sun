
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

		// This function retreives all the data from the selected webpage(s)
		// A callback function called "data_func_WMS" is passed through the 2nd param, which this function uses the data_func_WMS function to execute the code
			WMS.webms_init(data_func_WMS);

		// Prints the instance of WebMexicanSun to the console, for testing
			$log(WMS);

		// This function writes the generated HTML code to the webpage(s)
		// A callback function called "build_func_WMS" is passed through the 2nd param, which this function uses the build_func_WMS function to execute the code
		/*
			WMS.webms_build("write", build_func_WMS);
		*/
	};
