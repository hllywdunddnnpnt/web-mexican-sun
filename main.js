
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
	};
