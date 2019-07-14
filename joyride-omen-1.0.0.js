
//http://jsfiddle.net/qymer2Lp/2/

/*
	Headings

	REGEXP
	IS FUNCTIONS
	EVENTS
	ACTIONS
	ELEMENT HANDLING
	IMPORTANT
	ARRAYS
	OBJECTS
	NUMBERS
	STRINGS
	CONVERT
	LOOPS
	ELEMENT FUNCTIONS
	COLORS
	TIME
	Computer Size
	LOCAL STORAGE
	COOKIES
	OTHER
	Tools

*/

var $left = "left", $right = "right", $top = "top", $bottom = "bottom";
var $none = "none";
var $css_dir = [ $left, $right, $top, $bottom ];
var $all = "!all!";
var $count = "!count!";
var $ign = "$";
var $num_asc = "num-asc";
var $num_dsc = "num-dsc";
var $char_asc = "char-asc";
var $char_dsc = "char-dsc";
var $down = "down", $up = "up";
var $first = 1, $last = -1;
var $pos = "positive", $neg = "negative";
var $even = "even", $odd = "odd";
var $array = "array";
var $cookie = "cookie";
var $break = "break";

var $sq = "&apos;";
var $dq = "&quot;";
var $lt = "&lt;";
var $gt = "&gt;";
var $g = "'";
var $Q = '"';
var $array = "array";
var $cookie = "cookie";

var isAndroid = isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1; //&& navigator.userAgent.toLowerCase().indexOf("mobile");
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;



function $object_prototype(name,func)
	{
		Object.defineProperty(Object.prototype, name,
			{
				value : func
			});
	}

/* ------------------------------------>
*	>	REGEXP
* -------------------------------------> */

var f_number = /[^\d.-]/g;
var f_digit = /[^\d]/g;
var f_char = /[^\D]/g;
var f_alpha = /[^A-Za-z]/g;
var f_comment = /\<!--|-->/g;
var f_circle = /\((.*?)\)/g;

var r_white = /\s/g;
var r_number = /\d.-/g;
var r_digit = /\d/g;
var r_char = /\D/g;
var r_alpha = /[A-Za-z]/g;
var r_comment = /<!--[\s\S]*?-->/g;
var r_html = /\s*\<.*?\>\s*/g;
var r_acii = /\s*\&.*?;\s*/g;
var r_break = /\<br\>/g;
var r_circle = /\([\s\S]*?\)/g;

var s_bracket = /\(|\)/g;

var c_emails = /\S+@\S+\.\S+/;
var c_emailx =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

String.prototype._space = function(replace) { return String(this).replace(r_white,replace||""); };
String.prototype._num = function(replace) { return String(this).replace(r_number,replace||""); };
String.prototype._dig = function(replace) { return String(this).replace(r_digit,replace||""); };
String.prototype._char = function(replace) { return String(this).replace(r_char,replace||""); };
String.prototype._alpha = function(replace) { return String(this).replace(r_alpha,replace||""); };
String.prototype._comment = function(replace) { return String(this).replace(r_comment,replace||""); };
String.prototype._html = function(replace) { return String(this).replace(r_html,replace||""); };
String.prototype._acii = function(replace) { return String(this).replace(r_acii,replace||""); };
String.prototype._break = function(replace) { return String(this).replace(r_break,replace||""); };
String.prototype._circle = function(replace) { return String(this).replace(r_circle,replace||""); };
String.prototype._clean = function()
	{
		for (var x = 0, scount = 0; x < String(this).length; x++) if (String(this).charAt(x).match(r_white)) scount++; else break;
		for (var x = String(this).length-1, ecount = 0; x >= 0; x--) if (String(this).charAt(x).match(r_white)) ecount++; else break;
		return String(this).substring(scount,String(this).length-ecount);
	};

String.prototype.$num = function(replace) { return String(this).replace(f_number,replace||""); };
String.prototype.$dig = function(replace) { return String(this).replace(f_digit,replace||""); };
String.prototype.$char = function(replace) { return String(this).replace(f_char,replace||""); };
String.prototype.$alpha = function(replace) { return String(this).replace(f_alpha,replace||""); };
String.prototype.$comment = function(replace) { return String(this).replace(f_comment,replace||""); };
String.prototype.$circle = function(replace) { return String(this).replace(r_circle,replace||""); };

/* ------------------------------------>
*	>	IS FUNCTIONS
* -------------------------------------> */

function $isset(value) { return value !== undefined; }
function $isarr(value) { return $isset(value) && Array.isArray(value); }
function $isstr(value) { return $isset(value) && typeof value === "string"; }
function $isnum(value) { return $isset(value) && typeof value === "number"; }
function $ispos(value) { return $isset(value) && $isnum(value) && value > 0; }
function $isneg(value) { return $isset(value) && $isnum(value) && value < 0; }
function $iseven(value) { return $isnum(value) && (value / 2) == Math.floor(value / 2); }
function $isodd(value) { return $isnum(value) && (value / 2) != Math.floor(value / 2); }
function $isval(value) { return $isset(value) && ($isstr(value) || $isnum(value)); }
function $isobj(value) { return $isset(value) && typeof value === "object"; }
function $iselm(value) { return value instanceof HTMLElement; }
function $ishtml(value) { return $isstr(value) && /<[a-z][\s\S]*>/i.test(value); }
function $isboo(value) { return $isset(value) && typeof value === "boolean"; }
function $isfunc(value) { return $isset(value) && typeof value === "function"; }
function $isfloat(value) { return $isnum(value) && value != $floor(value); }
function $isreg(value) { return $isset(value) && value instanceof RegExp; }
function $isdate(value) { return $isset(value) && $isobj(value) && !isNaN(new Date(value).getDate()); }
function $ismulti(value)
	{
		if ($isset(value) && $isarr(value))
			{
				for (var x = 0; x < value.length; x++) if (!$isarr(value[x])) return false;
				return true;
			}
		return false;
	}
function $ismatrix(value)
	{
		if ($isarr(value))
			{
				for (var x = 0; x < value.length; x++) if (!$isarr(value[x])) return false;
				return true;
			}
		return false;
	}

/* ------------------------------------>
*	>	EVENTS
* -------------------------------------> */

function $onload(callback)
	{
		if (window.addEventListener)
			{
      			window.addEventListener("load", callback, false);
			}
		else if (window.attachEvent)
			{
				window.attachEvent("onload", callback);
			}
		else
			{
      			window.onload = callback;
			}
	}

var $REMOVE = "remove";
function addEventToObject(obj,evt,callback,parameter)
	{
		if (($iselm(obj) || obj === window || obj === document.body) && $isfunc(callback))
			{
				if (parameter == $REMOVE)
					{
						obj.removeEventListener(evt,callback,false);
					}
				else
					{
						obj.addEventListener(evt,callback,false);
						if ($isval(parameter) || $isarr(parameter))
							{
								obj.param = parameter;
								obj.arg = parameter;
							}
					}
			}
	}
//==> Mouse Events

var $event_options = {
	on : false,
	onclick : false, onmouseover : false, onmouseout : false, onchange : false,
};

$object_prototype("$onclick",function(callback,parameter)
	{
		if ($event_options.onclick == true || $event_options.on == true) addEventToObject(Object(this),"click",callback,parameter||"");
		else if ($iselm(this) && $isfunc(callback)) this.addEventListener("click",callback);
	});

$object_prototype("$onclickr",function(callback,parameter)
	{
		if ($iselm(this) && $isfunc(callback)) this.addEventListener("contextmenu",callback);
//		addEventToObject(this,"contextmenu",callback,parameter);
	});
$object_prototype("$onclickd",function(callback,parameter)
	{
		if ($iselm(this) && $isfunc(callback)) this.addEventListener("dblclick",callback);
//		addEventToObject(this,"dblclick",callback,parameter);
	});
$object_prototype("$onmouseover",function(callback,parameter)
	{
		if ($event_options.onmouseover == true || $event_options.on == true) addEventToObject(this,"mouseover",callback,parameter||"");
		else if ($iselm(this) && $isfunc(callback)) this.addEventListener("mouseover",callback)
	});
$object_prototype("$onmouseout",function(callback,parameter)
	{
		if ($event_options.onmouseout == true || $event_options.on == true) addEventToObject(this,"mouseout",callback,parameter||"");
		else if ($iselm(this) && $isfunc(callback)) this.addEventListener("mouseout",callback)
	});
$object_prototype("$onmousemove",function(callback,parameter)
	{
		if ($iselm(this) && $isfunc(callback)) this.addEventListener("mousemove",callback);
//		addEventToObject(this,"mousemove",callback,parameter);
	});
$object_prototype("$onmouseup",function(callback,parameter)
	{
		if ($iselm(this) && $isfunc(callback)) this.addEventListener("mouseup",callback);
//		addEventToObject(this,"mouseup",callback,parameter);
	});
$object_prototype("$onmousedown",function(callback,parameter)
	{
		if ($iselm(this) && $isfunc(callback)) this.addEventListener("mousedown",callback);
//		addEventToObject(this,"mousedown",callback,parameter);
	});

//==> Mouse Events

$object_prototype("$onkeypress",function(callback,parameter)
	{
		if ($iselm(this) && $isfunc(callback)) this.addEventListener("keypress",callback);
//		addEventToObject(this,"keypress",callback,parameter);
	});
$object_prototype("$onkeyup",function(callback,parameter)
	{
		if ($iselm(this) && $isfunc(callback)) this.addEventListener("keyup",callback);
//		addEventToObject(this,"keyup",callback,parameter);
	});
$object_prototype("$onkeydown",function(callback,parameter)
	{
		if ($iselm(this) && $isfunc(callback)) this.addEventListener("keydown",callback);
//		addEventToObject(this,"keydown",callback,parameter);
	});

//==> Form Events

$object_prototype("$onchange",function(callback,parameter)
	{
		if ($event_options.onchange == true || $event_options.on == true) addEventToObject(Object(this),"change",callback,parameter||"");
		else if ($iselm(this) && $isfunc(callback)) this.addEventListener("change",callback);
	});
$object_prototype("$oninput",function(callback,parameter)
	{
		if ($iselm(this) && $isfunc(callback)) this.addEventListener("input",callback);
//		addEventToObject(this,"input",callback,parameter);
	});
$object_prototype("$onsubmit",function(callback,parameter)
	{
		if ($iselm(this) && $isfunc(callback)) this.addEventListener("submit",callback);
//		addEventToObject(this,"submit",callback,parameter);
	});
$object_prototype("$onfocus",function(callback,parameter)
	{
		if ($iselm(this) && $isfunc(callback)) this.addEventListener("focus",callback);
//		addEventToObject(this,"focus",callback,parameter);
	});
$object_prototype("$onblur",function(callback,parameter)
	{
		if ($iselm(this) && $isfunc(callback)) this.addEventListener("blur",callback);
//		addEventToObject(this,"blur",callback,parameter);
	});
$object_prototype("$onscroll",function(callback,parameter)
	{
		if ($iselm(this) && $isfunc(callback)) this.addEventListener("scroll",callback);
//		addEventToObject(this,"scroll",callback,parameter);
	});
$object_prototype("$onselect",function(callback,parameter)
	{
		if ($iselm(this) && $isfunc(callback)) this.addEventListener("select",callback);
//		addEventToObject(this,"select",callback,parameter);
	});

/* ------------------------------------>
*	>	ACTIONS
* -------------------------------------> */

function $pop(value,outline)
	{
		if (!$isval(value)) value = "";
		if (!$isstr(outline)) outline = "";
		alert(outline + value + outline);
	}

function $inp(description,value)
	{
		if (!$isstr(description)) description = "";
		if (!$isval(value)) value = "";
		return prompt(description,value);
	}

function $log(value,outline)
	{
		if (!$isset(value)) value = "";
		if ($isstr(outline)) console.log(outline + value + outline); else console.log(value);
	}

function $info(value)
	{
		if (!$isset(value)) value = "";
		console.info(value);
	}

function $error(value)
	{
		if (!$isset(value)) value = "";
		console.info(value);
	}

function $warn(value)
	{
		if (!$isset(value)) value = "";
		console.info(value);
	}

function $logn(value,round)
	{
		if (!$isnum(value)) value = 0;
        if (!$isboo(round) && !$isnum(round)) round = false;
		if (!$isnum(round) && round === true) round = true;
		if (round >= 0) round = round;
		console.log(value.$format("",round));
	}

function $popn(value,round)
	{
		if (!$isnum(value)) value = 0;
        if (!$isboo(round) && !$isnum(round)) round = false;
		if (!$isnum(round) && round === true) round = true;
		if (round >= 0) round = round;
		alert(value.$format("",round));
	}

function $logc()
	{
		console.clear();
	}

function $logt(lable,callback)
	{
		if (!$isstr(lable)) lable = "none";
		if (!$isfunc(callback)) callback = function(){return 0;};
		console.time(lable);
		callback();
		console.timeEnd(lable);
	}

Number.prototype.$log = function(round)
	{
        if (!$isboo(round) && !$isnum(round)) round = false;
		$logn(Number(this),round);
	};
Number.prototype.$pop = function(round)
	{
        if (!$isboo(round) && !$isnum(round)) round = false;
		$popn(Number(this),round);
	};
String.prototype.$log = function(outline)
	{
		if (!$isstr(outline)) outline = "";
		$log(String(this),outline);
	};
String.prototype.$pop = function(outline)
	{
		if (!$isstr(outline)) outline = "";
		$pop(String(this),outline);
	};
Array.prototype.$log = function()
	{
		$log(this);
	};
Array.prototype.$pop = function()
	{
		$pop(this);
	};
$object_prototype("$log",function()
	{
		$log(this);
	});
$object_prototype("$pop",function()
	{
		$pop(this);
	});
String.prototype.$logt = function(callback)
	{
		$logt(String(this),callback);
	};



/* ------------------------------------>
*	>	ELEMENT HANDLING
* -------------------------------------> */

function $create(string,elm)
	{
		if (!$isstr(string)) return null;
		if (!$iselm(elm)) elm = document;
		return elm.createElement(string);
	}

function $id(value,elm)
	{
		if (!$isstr(value)) return null;
		if (!$iselm(elm)) elm = document;
		return elm.getElementById(value);
	}

function $name(value,elm)
	{
		if (!$isstr(value)) return null;
		if (!$iselm(elm)) elm = document;
		return elm.getElementsByName(value);
	}

function $class(value,elm)
	{
		if (!$isstr(value)) return null;
		if (!$iselm(elm)) elm = document;
		return elm.getElementsByClassName(value);
	}

function $tag(value,elm)
	{
		if (!$isstr(value)) return null;
		if (!$iselm(elm)) elm = document;
		return elm.getElementsByTagName(value);
	}

function $query(value,elm)
	{
		if (!$isstr(value)) return null;
		if (!$iselm(elm)) elm = document;
		return elm.querySelector(value);
	}

function $queryAll(value,elm)
	{
		if (!$isstr(value)) return null;
		if (!$iselm(elm)) elm = document;
		return elm.querySelectorAll(value);
	}

function $attr(value,elm)
	{
		if (!$iselm(elm)) elm = document;
		return elm.querySelectorAll("["+value+"]");
	}
function $data(elm,name)
	{
	    var data = {};
		if ($iselm(elm))
			{
			    [].forEach.call(elm.attributes, function(attr) {
			        if (/^data-/.test(attr.name)) {
			            var camelCaseName = attr.name.substr(5).replace(/-(.)/g, function ($0, $1) {
			                return $1.toUpperCase();
			            });
			            data[camelCaseName] = attr.value;
			        }
			    });
			    return $isstr(name) && data[name] ? data[name] : data;
			}
		else if ($isstr(elm))
			{
				return $attr("data-"+elm);
			}
		return data;
	}

var $_a = $tag("a");
var $_img = $tag("img");
var $_table = $tag("table");
var $_tr = $tag("tr");
var $_th = $tag("th");
var $_td = $tag("td");
var $_font = $tag("font");
var $_input = $tag("input");
var $_div = $tag("div");
var $_span = $tag("span");
var $_select = $tag("select");
var $_head = $tag("head")[0];
var $_body = $tag("body")[0];
var $_form = $tag("form");
var $_center = $tag("center");
var $_h1 = $tag("h1");
var $_h2 = $tag("h2");
var $_h3 = $tag("h3");
var $_p = $tag("p");
var $_script = $tag("script");
var $_style = $tag("style");
var $_br = $tag("br");
var $_frame = $tag("frame");





/* ------------------------------------>
*	>	IMPORTANT
* -------------------------------------> */

var $backindex = -1, $loopindex = 1, $backloopindex = -2, $index = 0;
Array.prototype.$range = function(number,opt)
	{
		if (!$isnum(number)) return false;
		if (!$isnum(opt)) opt = 2;
		if (opt == 1) return number >= 0 && number <= this.length;
		if (opt == 0) return number >= (this.length * -1) && number < 0;
		if (opt == -1) return number > (this.length * -1) && number < 0;
		if (opt == -2) return number >= (this.length * -1) - 1 && number < 0;
		return number >= 0 && number < this.length;
	};

Number.prototype.$range = function(min,max,flag)
	{
		if (!$isnum(min)) min = 0;
		if (!$isnum(max)) max = 1;
		if (!$isboo(flag)) flag = false;
		if (flag)
			{
				if (Number(this) < min) return min;
				if (Number(this) > max) return max;
				return Number(this);
			}
		return Number(this) >= min && Number(this) <= max;
	};

function $inrange()
	{
		if ($isnum(arguments[0])) return arguments[0].$range(arguments[1],arguments[2],arguments[3]);
		return arguments[0];
	}


/* ------------------------------------>
*	>	ARRAYS
* -------------------------------------> */

function $matrix(x,y)
	{
		var newArray = [];
		if ($ispos(x) && $ispos(y))
			{
				for (var z = 0; z < x; z++)
					{
						newArray[z] = new Array(y);
					}
			}
		else if ($ispos(x))
			{
				for (var z = 0; z < x; z++)
					{
						newArray[z] = [];
					}
			}
		else
			{
				newArray[0] = [];
			}
		return newArray;
	}

Array.prototype.$contains = function(value)
	{
		if (!$isval(value)) value = "";
		for (var x = 0; x < this.length; x++)
			{
				if ($isarr(value))
					{
						for (var y = 0; y < value.length; y++)
							{
								if (this[x].search(value[y]) >= 0) return true;
							}
					}
				else
					{
						if (this[x].toString().search(value) >= 0) return true;
					}
			}
		return false;
	};

Array.prototype.$compare = function(value)
	{
		if (!$isval(value)) value = "";
		for (var x = 0; x < this.length; x++)
			{
				if ($isarr(value))
					{
						for (var y = 0; y < value.length; y++)
							{
								if (this[x] == value[y]) return true;
							}
					}
				else
					{
						if (this[x] == value) return true;
					}
			}
		return false;
	};

Array.prototype.$occur = function(value)
	{
		var newArray = [], intCheck = 0;
		if (!$isval(value)) value = "";
		for (var x = 0; x < this.length; x++)
			{
				if (this[x] == value)
					{
						newArray[intCheck] = x;
						intCheck++;
					}
			}
		return newArray;
	};

Array.prototype.$count = function(value)
	{
		if (!$isval(value)) value = "";
		return this.$occur(value).length;
	};

Array.prototype.$index = function(value,index)
	{
		if (!$isval(value)) value = "";
		if (!$isnum(index)) index = 1;
		if (index == 0) return -1;
		var occur = this.$occur(value);
		if (index > 0) index -= 1;
		if (!occur.$range(index) && !occur.$range(index,-1)) return -1;
		return index < 0 ? occur[index + occur.length] : occur[index];
	};

Array.prototype.$isstr = function(flag)
	{
		if (!$isboo(flag)) flag = true;
		for (var x = 0; x < this.length; x++)
			{
				if ($isarr(this[x]) && flag)
					{
						for (var y = 0; y < this[x].length; y++)
							{
								if (!$isstr(this[x][y])) return false;
							}
					}
				else
					{
						if (!$isstr(this[x])) return false;
					}
			}
		return true;
	};

Array.prototype.$isnum = function(flag)
	{
		if (!$isboo(flag)) flag = true;
		for (var x = 0; x < this.length; x++)
			{
				if ($isarr(this[x]) && flag)
					{
						for (var y = 0; y < this[x].length; y++)
							{
								if (!$isnum(this[x][y])) return false;
							}
					}
				else
					{
						if (!$isnum(this[x])) return false;
					}
			}
		return true;
	};

Array.prototype.$isval = function(flag)
	{
		if (!$isboo(flag)) flag = true;
		for (var x = 0; x < this.length; x++)
			{
				if ($isarr(this[x]) && flag)
					{
						for (var y = 0; y < this[x].length; y++)
							{
								if (!$isval(this[x][y])) return false;
							}
					}
				else
					{
						if (!$isval(this[x])) return false;
					}
			}
		return true;
	};

Array.prototype.$isobj = function(flag)
	{
		if (!$isboo(flag)) flag = true;
		for (var x = 0; x < this.length; x++)
			{
				if ($isarr(this[x]) && flag)
					{
						for (var y = 0; y < this[x].length; y++)
							{
								if (!$isobj(this[x][y])) return false;
							}
					}
				else
					{
						if (!$isobj(this[x])) return false;
					}
			}
		return true;
	};

Array.prototype.$iselm = function(flag)
	{
		if (!$isboo(flag)) flag = true;
		for (var x = 0; x < this.length; x++)
			{
				if ($isarr(this[x]) && flag)
					{
						for (var y = 0; y < this[x].length; y++)
							{
								if (!this[x][y] instanceof HTMLElement) return false;
							}
					}
				else
					{
						if (!this[x] instanceof HTMLElement) return false;
					}
			}
		return true;
	};

Array.prototype.$isboo = function(flag)
	{
		if (!$isboo(flag)) flag = true;
		for (var x = 0; x < this.length; x++)
			{
				if ($isarr(this[x]) && flag)
					{
						for (var y = 0; y < this[x].length; y++)
							{
								if (!$isboo(this[x][y])) return false;
							}
					}
				else
					{
						if (!$isboo(this[x])) return false;
					}
			}
		return true;
	};

Array.prototype.$is = function(flag)
	{
		if (!$isset(flag)) flag = true;
		for (var x = 0; x < this.length; x++)
			{
				if ($isarr(this[x]) && flag)
					{
						for (var y = 0; y < this[x].length; y++)
							{
								if (this[x][y] != flag) return false;
							}
					}
				else
					{
						if (this[x] != flag) return false;
					}
			}
		return true;
	};

Array.prototype.$has = function(flag)
	{
		var boo = false;
		if (!$isboo(flag)) flag = true;
		for (var x = 0; x < this.length; x++)
			{
				if (this[x] == flag) boo = true;
			}
		return boo;
	};

Array.prototype.$clean = function(value,compare)
	{
		if (!$isval(value)) value = "";
		if (!$isboo(compare)) compare = true;
		for (var x = this.length-1; x >= 0; x--)
			{
				if (!compare && this[x].$contains(value)) this.$cut(x);
				if (compare && this[x].$compare(value)) this.$cut(x);
			}
	};

Array.prototype.$string = function()
	{
		if (this.length == 0) return "";
		var $arg = arguments.$array(), str = "";
		if (!$isstr($arg[0])) $arg[0] = ",";
		if (!$isstr($arg[1])) $arg[1] = ",";
		for (var x = 0; x < this.length; x++)
			{
                if ($isarr(this[x]))
					{
						str += x > 0 ? $arg[1] : "";
						for (var y = 0; y < this[x].length; y++)
							{
								str += y > 0 ? $arg[0] : "";
								str += this[x][y];
							}
					}
                else
					{
						str += x > 0 ? $arg[0] : "";
						str += this[x];
					}
            }
		return str;
	};

Array.prototype.$display = function(label,ishtml)
	{
  		if (!$isstr(label)) label = "display array";
  		if (!$isstr(ishtml)) ishtml = true;
  		var newString = label + ": (" + this.length + ")" + $n(1,ishtml) + $t(1,ishtml) + "{" + $n(1,ishtml);
		for (var r = 0; r < this.length; r++)
			{
				if ($isstr(this[r]))
					{
						newString += $t(2,ishtml) + "row_" + r + ": " + $Q + this[r] + $Q + $n(1,ishtml);
					}
				else if ($isarr(this[r]))
					{
						newString += $t(2,ishtml) + "row_" + r + ": (" + this[r].length + ")" + $n(1,ishtml) + $t(3,ishtml) + "{" + $n(1,ishtml);
						for (var c = 0; c < this[r].length; c++)
							{
								if (typeof this[r][c] === "string")
									{
										newString += $t(4,ishtml) + "col_" + c + ": " + '"' + this[r][c] + '"' + $n(1,ishtml);
									}
								else
									{
										newString += $t(3,ishtml) + "col_" + c + ": " + this[r][c] + $n(1,ishtml);
									}
							}
						newString += $t(3,ishtml) + "}" + $n(1,ishtml);
					}
				else
					{
						newString += $t(2,ishtml) + "row_" + r + ": " + this[r] + $n(1,ishtml);
					}
			}
		newString += $t(1,ishtml) + "};";
		return newString;
	};

Array.prototype.$print = function(label,ishtml)
	{
		if (!isstr(label)) label = "array";
  		if (!isstr(ishtml)) ishtml = true;
  		var newString = label + ": [" + $n(1,ishtml);
		for (var r = 0; r < this.length; r++)
			{
				newString += r == 0 ? $t(1,ishtml) : "";
				if ($isstr(this[r]))
					{
						newString += r < this.length-1 ? $Q + this[r] + $Q + ", " : $Q + this[r] + $Q + $n(1,ishtml);
					}
				else if ($isarr(this[r]))
					{
						for (var c = 0; c < this[r].length; c++)
							{
								newString += r > 0 && c == 0 ? $t(1,ishtml) : "";
								newString += c == 0 ? "[ " : "";
								if (typeof this[r][c] === "string")
									{
										newString += $Q + this[r][c] + $Q;
									}
								else
									{
										newString += this[r][c];
									}
								newString += c < this[r].length-1 ? ", " : "";
							}
						newString += r < this.length-1 ? " ]," + $n(1,ishtml) : " ]" + $n(1,ishtml);
					}
				else
					{
						newString += r < this.length-1 ? this[r] + ", " : this[r] + $n(1,ishtml);
					}
			}
		newString += "];";
		return newString;
	};

Array.prototype.$unique = function()
	{
		var newArray = [], inc = 0, intCount = 0;
		newArray[0] = this[0];
		for (var x = 1; x < this.length; x++)
			{
				for (var y = 0; y < newArray.length; y++)
					{
						if (this[x] != newArray[y]) intCount++;
					}
				if (intCount == newArray.length)
					{
						inc++;
						newArray[inc] = this[x];
					}
				intCount = 0;
			}
		return newArray;
	};

Array.prototype.$substr = function(start,end)
	{
		if (!$isnum(start)) start = 0;
		if (!$isnum(end)) end = this.length - 1;
		var newArray = [], inc = 0;
		if (start >= 0 && end < this.length)
			{
				for (var x = start; x <= end; x++)
					{
						newArray[inc] = this[x];
						inc++;
					}
				return newArray;
			}
		return this;
	};

Array.prototype.$substring = function(start,count)
	{
		if (!$isnum(start)) start = 0;
		if (!$isnum(count)) count = this.length - start;
		var newArray = [], inc = 0;
		var end = count + start;
		if (end >= this.length) end = this.length - start;
		if (start >= 0 && end < this.length)
			{
				for (var x = start; x < end; x++)
					{
						newArray[inc] = this[x];
						inc++;
					}
				return newArray;
			}
		return this;
	};

Array.prototype.$add = function(value,index)
	{
		if (!$isnum(index)) index = this.length;
		//if (!$isval(value)) value = "";
		if ($isnum(index))
			{
		//		if (index.range(this,1))
				if (this.$range(index,1))
					{
						this.splice(index,0,value);
					}
		//		else if (index.range(this,-2))
				else if (this.$range(index,-2))
					{
						this.splice(this.length + index + 1,0,value);
					}
				else
					{
						this.splice(this.length,0,value);
					}
			}
		else
			{
				this.splice(this.length,0,index);
			}
	};

Array.prototype.$cut = function(index,count)
	{
		if (!$isnum(index)) index = this.length - 1;
		if (!$isnum(count)) count = 1;
		if (this.$range(index))
			{
				if (!count.$range(1,this.length - index)) count = this.length - index;
				this.splice(index,count);
			}
		else if (this.$range(index,-1))
			{
				if (!count.$range(0,this.length + index)) count = this.length + index + 1;
				this.splice(this.length + index,count);
			}
		else
			{
				this.splice(this.length - 1,1);
			}
	};

Array.prototype.$move = function(to,from)
	{
		if (!$isnum(to)) to = this.length - 2;
		if (!$isnum(from)) from = this.length - 1;
		if (!this.$range(to)) to = this.length - 2;
		if (!this.$range(from)) from = this.length - 1;
		var temp = this[to];
		this.splice(to, 1);
		this.splice(from, 0, temp);
	};

Array.prototype.$swap = function(to,from)
	{
		if (!$isnum(to)) to = this.length - 2;
		if (!$isnum(from)) from = this.length - 1;
//		if (!to.range(this)) to = this.length - 2;
//		if (!from.range(this)) from = this.length - 1;
		if (!this.$range(to)) to = this.length - 2;
		if (!this.$range(from)) from = this.length - 1;
		var temp = this[to];
		var temp2 = this[from];
		this.splice(to, 1);
		this.splice(from-1, 1);
		this.splice(from-1, 0, temp);
		this.splice(to, 0, temp2);
	};

Array.prototype.$array = function()
	{
		if ($ismulti(this))
			{
				var newArray = [], z = 0;
				for (var x = 0; x < this.length; x++)
					{
						if ($isarr(this[x]))
							{
								for (var y = 0; y < this[x].length; y++)
									{
										newArray[z] = this[x][y];
										z++;
									}
							}
						else
							{
								newArray[z] = this[x];
								z++;
							}
					}
				return newArray;
			}
		else
			{
				return this;
			}
	};

Array.prototype.$min = function() { return this.$isnum() ? this.indexOf($min(this)) : -1; };
Array.prototype.$max = function() { return this.$isnum() ? this.indexOf($max(this)) : -1; };

Array.prototype.$sort = function(filter,col)
	{
		if (!$isstr(filter)) filter = $num_asc;
        if ($isval(col))
            {
				if (filter == $num_asc) this.sort(function(a, b){return a[col]-b[col];});
				if (filter == $num_dsc) this.sort(function(a, b){return b[col]-a[col];});
				if (filter == $char_asc) this.sort(function(a, b){return (a[col]<b[col] ? -1 : (a[col]>b[col] ? 1 : 0));});
				if (filter == $char_dsc) this.sort(function(a, b){return (a[col]<b[col] ? 1 : (a[col]>b[col] ? -1 : 0));});
            }
		else
			{
				if (filter == $num_asc) this.sort(function(a, b){return a-b;});
				if (filter == $num_dsc) this.sort(function(a, b){return b-a;});
				if (filter == $char_asc || filter == $char_dsc) this.sort();
				if (filter == $char_dsc) this.reverse();
			}
	};

Array.prototype.$fill = function(value)
	{
		if (!$isval(value)) value = "";
		for (var x = 0; x < this.length; x++)
			{
				if ($isarr(this[x]))
					{
						for (var y = 0; y < this[x].length; y++)
							{
								this[x][y] = value;
							}
					}
				else
					{
						this[x] = value;
					}
			}
	};

Array.prototype.$form = function(length,callback)
	{
		if (!$ispos(length)) length = 1;
		if (!$isfunc(callback)) callback = function(){return 0;};
		for (var x = 0; x < length; x++)
			{
				this.push(callback(x,length-1));
			}
	};

Array.prototype.$number = function()
	{
		for (var x = 0; x < this.length; x++)
			{
				this[x] = Number(this[x]);
			}
	};

Array.prototype.$closestTo = function(number)
	{
		var z = $matrix(this.length,3);
		if (this.$isnum())
			{
				for (var x = 0; x < this.length; x++)
					{
						if (this[x] > number)
							{
								z[x][0] = this[x] - number;
							}
						else
							{
								z[x][0] = number - this[x];
							}
						z[x][1] = this[x];
						z[x][2] = x;
					}
				z.$sort($num_asc,0);
				return z[0][2];
			}
		return -1;
	};

Array.prototype.$booCompare = function(value)
	{
		if (!$isval(value)) value = 0;
		var array = [];
		for (var x = 0; x < this.length; x++)
			{
				array[x] = this[x].$compare(value);
			}
		return array;
	};

Array.prototype.$booGreater = function(value)
	{
		if (!$isnum(value)) value = 0;
		var array = [];
		for (var x = 0; x < this.length; x++)
			{
				array[x] = this[x] > value;
			}
		return array;
	};

Array.prototype.$shuffle = function()
	{
		for (var row = this.length-1; row > 0; row--)
			{
				var x = Math.floor(Math.random() * (row + 1));
				var tempx = this[row];
				this[row] = this[x];
				this[x] = tempx;
			}
	};

Array.prototype.$combNode = function()
	{
		var newArray = [];
		this.$cycle(function(value,i)
			{
				if (value)
					{
						newArray.push.apply(newArray, value);
					}
			});
		return newArray;
	};

Array.prototype.$len = function() { return this.length - 1; };
Array.prototype.$last = function() { return this[this.$len()]; };

Array.prototype.$random = function() { return this[$random(0,this.length - 1)]; };

Array.prototype.$isempty = function() { return this.length == 0 ? true : false; };

Array.prototype.$copy = function() { return this.slice(0); };

function $array_combine() { return $ismatrix(arguments.$array()) ? [].concat(arguments.$array().$array()) : []; }

Array.prototype.$obj_index_by_prop = function(prop,value)
	{
		var index = -1;
		this.$cycle(function(val,i,l){
			if (val[prop] == value) 
				{
					index = i;
					return $break;
				}
		});
		return index;
	};

/* ------------------------------------>
*	>	OBJECTS
* -------------------------------------> */

$object_prototype("$array",function()
	{
		var newArray = [], str = "", inc = 0;
		for (var x in this)
			{
				if (this.hasOwnProperty(x)) newArray[inc] = this[x];
                inc++;
			}
		return newArray;
	});

$object_prototype("$show",function() { if ($iselm(this)) this.style.visibility = "visible"; });
$object_prototype("$hide",function() { if ($iselm(this)) this.style.visibility = "hidden"; });
$object_prototype("$none",function() { if ($iselm(this)) this.style.display = "none"; });
$object_prototype("$block",function() { if ($iselm(this)) this.style.display = "block"; });
$object_prototype("$inline",function() { if ($iselm(this)) this.style.display = "inline"; });
$object_prototype("$inlineBlock",function() { if ($iselm(this)) this.style.display = "inline-block"; });

$object_prototype("$length",function()
	{
		var length = 0;
		for (var x in this)
			{
				if (this.hasOwnProperty(x)) length++;
			}
		return length;
	});

$object_prototype("$whipe",function()
	{
		if (($iselm(this)))
			{
				while (this.firstChild)
					{
						this.removeChild(this.firstChild);
					}
			}
	});

$object_prototype("$event",function(e,callback) { if ($iselm(this) && $events.search(e)) this.addEventListener(e,callback); });

$object_prototype("$isselected",function() { return $iselm(this) && this.tagName == "select" ? (this.selectedIndex > 0 ? true : false) : false; });

$object_prototype("$select",function(value) { if ($iselm(this) && this.tagName == "select") this.selectedIndex = $ispos(value) ? value : 0; });

$object_prototype("$remove",function() { if ($iselm(this.parentNode) && $iselm(this)) this.parentNode.removeChild(this); });

$object_prototype("$val",function(index)
	{
		if (!$isnum(index)) index = 0;
		var inc = 0;
		for (var x in this)
			{
				if (inc == index) return this[x];
				inc++;
			}
		return -1;
	});

$object_prototype("$prop",function(index)
	{
		if (!$isnum(index)) index = 0;
		var inc = 0;
		for (var x in this)
			{
				if (inc == index) return x;
				inc++;
			}
		return -1;
	});

$object_prototype("$indexProp",function(prop)
	{
		if (!$isval(prop)) prop = 0;
		var inc = 0; // Object.$length();
		for (var x in this)
			{
				if (prop == x) break;
				inc++;
			}
		return inc == (21 + this.$length()) ? -1 : inc;
	});

$object_prototype("$parent",function(tagname)
	{
		var testObj = this.parentNode;
		if (testObj.tagName) {
		while(testObj.tagName != tagname.toUpperCase())
			{
				testObj = testObj.parentNode;
			}}
		return testObj;
	});

$object_prototype("$cell",function(row,cell)
	{
		if ($iselm(this) && this.tagName == "TABLE")
			{
				if (row.$range(0,this.rows.length))
					{
						if (cell.$range(0,this.rows[row].cells.length))
							{
								return this.rows[row].cells[cell];
							}
					}
			}
		return null;
	});

$object_prototype("$removeAll",function()
	{
		this.$recycle(function(obj,i)
			{
				obj.$remove();
			});
	});

$object_prototype("$copy",function()
	{
		return JSON.parse(JSON.stringify(this));
	});

/* ------------------------------------>
*	>	NUMBERS
* -------------------------------------> */


function $format(number)
	{
		if ($isstr(number)) return number;
        var $arg = arguments.$array(), round = 0, label = "", doRound = true;
        for (var x = 1; x < $arg.length; x++)
			{
				if ($ispos($arg[x])) round = $arg[x];
				if ($isstr($arg[x])) label = $arg[x];
				if ($isboo($arg[x])) doRound = $arg[x];
			}
		var intNum = doRound ? String($round($int(number),round)) : String($int(number));
	   	var p = intNum.split(".");
        p.$clean();
		var chars = p[0].split("").reverse();
		var newstr = "";
		var inc = 0;
		for (var x = 0; x < chars.length; x++)
			{
				inc++;
				if (inc% 3 == 1 && inc!= 1) { newstr = chars[x] + ',' + newstr; }
				else { newstr = chars[x] + newstr; }
			}
		if (p[1] !== undefined) newstr += "." + p[1];
        if (newstr.search("-,") == 0) newstr = "-" + newstr.substring(2,newstr.length);
        if (newstr.search("-") == 0) return label + "-" + newstr.substring(1,newstr.length);
	    return label + newstr;
	}

Number.prototype.$format = function()
	{
//		return isFirefox ? $format(Number(this),arguments[0],arguments[1],arguments[2]) : Number(this).toLocaleString();
		return isAndroid ? Number(this) : $format(Number(this),arguments[0],arguments[1],arguments[2]);
	};

function $int(value)
	{
		return $isval(value) ? Number(value) : null;
	}

Number.prototype.$perc = function()
	{
		return Number(this).$range(0,100);
	};

Number.prototype.$equals = function()
	{
		var $arg = arguments.$array();
		if ($isarr($arg[0]))
			{
				for (var x = 0; x < $arg[0].length; x++)
					{
						if (Number(this) == $arg[0][x]) return true;
					}
				return false;
			}
		if ($arg[0] == $pos) return $ispos(Number(this));
		if ($arg[0] == $pos) return $ispos(Number(this));
		if ($arg[0] == $neg) return $isneg(Number(this));
		if ($arg[0] == $even) return $iseven(Number(this));
		if ($arg[0] == $odd) return $isodd(Number(this));
		var isrange = $isnum($arg[0]) && $isnum($arg[1]) && $arg[1] > $arg[0];
		if (isrange && !$isset($arg[2])) return Number(this).$range($arg[0],$arg[1]);
		if (isrange && $arg[2] == $even) return Number(this).$range($arg[0],$arg[1]) && $iseven(Number(this));
		if (isrange && $arg[2] == $odd) return Number(this).$range($arg[0],$arg[1]) && $isodd(Number(this));
		return $isnum($arg[0]) ? Number(this) == $arg[0] : false;
	};

function $rounder(number,decimal,direction)
	{
		if (!$isnum(number)) return null;
		if (!$ispos(decimal)) decimal = 0;
		if (!$isstr(direction)) direction = "";
		var str = "1";
		if (decimal > 0) for (var x = 0; x < decimal; x++) { str += "0"; }
		var intDec = parseFloat(str);
		if (direction == $down) return Math.floor(number * intDec) / intDec;
		if (direction == $up) return Math.ceil(number * intDec) / intDec;
		return Math.round(number * intDec) / intDec;
	}

function $round(number,decimal)
	{
		if (!$ispos(decimal)) decimal = 0;
		return $isnum(number) ? $rounder(number,decimal) : null;
	}

function $floor(number,decimal)
	{
		if (!$ispos(decimal)) decimal = 0;
		return $isnum(number) ? $rounder(number,decimal,$down) : null;
	}

function $ceil(number,decimal)
	{
		if (!$ispos(decimal)) decimal = 0;
		return $isnum(number) ? $rounder(number,decimal,$up) : null;
	}

function $random(min,max)
	{
		if (!$isnum(min)) min = 0;
		if (!$isnum(max)) max = min + 1;
		return $floor(Math.random() * (max - min + 1) + min);
	}

function $randomUNQ(min,max)
	{
		if (!$isnum(min)) min = 0;
		if (!$isnum(max)) max = min + 1;
		var newArray = [], diff = (max - min), inc = min;
		for (var x = 0; x <= diff; x++) { newArray[q] = inc++; }
		newArray.$shuffle();
		return newArray;
	}

function $roundto(number,nearest,direction)
	{
		if (!$isnum(number)) return 0;
		if (!$isnum(nearest)) nearest = 10;
		if (!$isstr(direction)) direction = "";
		if (direction == $down) return nearest * Math.floor(number / nearest);
		if (direction == $up) return nearest * Math.ceil(number / nearest);
		return nearest * Math.round(number / nearest);
	}

function $min()
	{
		var result = 0, $arg = arguments.$array();
		if ($isarr($arg[0]))
			{
				var x = $arg[0].$copy();
				x.$sort($num_asc);
				result = x[0];
			}
		else if ($isarr($arg))
			{
				$arg.$sort($num_asc);
				result = $arg[0];
			}
		return result;
	}

function $max()
	{
		var result = 0, $arg = arguments.$array();
		if ($isarr($arg[0]))
			{
				var x = $arg[0].$copy();
				x.$sort($num_dsc);
				result = x[0];
			}
		else if ($isarr($arg))
			{
				$arg.$sort($num_dsc);
				result = $arg[0];
			}
		return result;
	}

function $add()
	{
		var result = 0, $arg = arguments.$array();
		if ($isarr($arg[0]))
			{
				for (var x = 0; x < $arg[0].length; x++)
					{
						result += Number($arg[0][x]);
					}
			}
		else if ($isarr($arg))
			{
				for (var x = 0; x < $arg.length; x++)
					{
						result += Number($arg[x]);
					}
			}
		return result;
	}

function $mean()
	{
		var result = 0, $arg = arguments.$array(), round = 2;
		if ($ispos($arg[1])) round = $arg[1];
		if ($isarr($arg[0]))
			{
				for (var x = 0; x < $arg[0].length; x++)
					{
						result += $arg[0][x];
					}
				return $round(result / $arg[0].length,round);
			}
		return 0;
	}

function $range()
	{
		var result = 0, $arg = arguments.$array();
		if ($isarr($arg[0]))
			{
				result = $max($arg[0]) - $min($arg[0]);
			}
		else if ($isarr($arg))
			{
				result = $max($arg) - $min($arg);
			}
		return result;
	}

function $median()
	{
		var result = 0, $arg = arguments.$array(), round = 2;
		var x = $arg[0], r = $arg[1]; // Grabs the Parametres
		if (!$ispos(r)) round = r; // Sets the default Round
		if ($isarr(x)) // If the 1st parameter is an Array of Numbers
			{
				var l = x.length; // Gets the Amoutn of Numbers
				if ($iseven(l)) result = ( (x[l/2] - x[(l/2)-1]) / 2) + x[(l/2)-1]; // If the amount of Numbers is an Even Number
				if ($isodd(l)) result = x[(l-1)/2]; // If the amount of Numbers is an Odd Number
				return $round(result,round); // Rounds the Result and Returns it
			}
		return 0; // Returns 0 if Numbers arent supplied
	}

function $mode()
	{
		var result = 0, $arg = arguments.$array();
		var a = $arg[0], b;
		if ($isarr(a))
			{
				b = a.$copy().$unique();
				var c = [], d = [], inc = 0;
				for (var x = 0; x < b.length; x++)
					{
						c[x] = a.$occur(b[x]).length;
					}
				for (var x = 0; x < b.length; x++)
					{
						if (c[x] == c.$max())
							{
								d[inc] = b[x];
								inc++;
							}
					}
				return c.$max() == 1 ? [] : d;
			}
		return [];
	}

function $div(number1,number2)
	{
		if (!$isnum(number1)) number1 = 1;
		if (!$isnum(number2)) number2 = 1;
		return [ $floor(number1 / number2), (number1 % number2) ];
	}

function $pdecimal(percentage)
	{
		if (!$isnum(percentage)) percentage = 100;
		return percentage / 100;
	}



/* ------------------------------------>
*	>	STRINGS
* -------------------------------------> */

String.prototype.$snake = function(text) 
	{
		return String(this).toLowerCase()._space("_");
	};

String.prototype.$int = function()
	{
		var valReturn = arguments[0] == true ? parseFloat(String(this).$dig()) : parseFloat(String(this).$num());
		return isNaN(valReturn) ? arguments[1] || 0 : valReturn;
	};

String.prototype.$isempty = function() { return String(this).length == 0; };

var $match = "match_h73j3j6h", $index = "index_j63vj54j";
String.prototype.$contains = function(value,option)
	{
		if (!$isval(value) && !$isarr(value)) value = "";
		if (!$isstr(option)) option = "";
		if ($isarr(value))
			{
				var $len = value.length, inc = 0;
				for (var x = 0; x < $len; x++)
					{
						if (String(this).search(value[x]) >= 0)
							{
								if (option == $match) inc++;
								else if (option == $index) return x;
								else inc = $len;
							}
					}
				return inc == $len;
			}
		else
			{
				if (String(this).search(value) >= 0) return true;
			}
		return false;
	};

String.prototype.$compare = function(value)
	{
		//if (!$isval(value)) value = "";
		if ($isarr(value))
			{
				for (var x = 0; x < value.length; x++)
					{
						if (String(this) == value[x]) return true;
					}
			}
		else
			{
				if (String(this) == value) return true;
			}
		return false;
	};

String.prototype.$occur = function(value)
	{
		if (!$isval(value)) value = "";
		var strSplit = String(this).split(value), l = strSplit.length, a = [];
		if (l > 1)
			{
				for (var x = 0; x < l; x++)
					{
						a[x] = strSplit[x].length;
						if (x > 0) a[x] += a[x-1] + value.length;
					}
				return a;
			}
		else
			{
				return [];
			}
	};

String.prototype.$count2 = function(value)
	{
		if (!$isval(value)) value = "";
		return (String(this).match(new RegExp(value,"g")) || []).length;
	};

String.prototype.$count = function(value)
	{
		if (!$isval(value)) value = "";
		return String(this).occur(value).length - 1;
	};

String.prototype.$index = function(value,index)
	{
		if (!$isval(value)) value = "";
		if (!$isnum(index)) index = 1;
		if (index == 0) return -1;
		var occur = String(this).$occur(value);
		if (index > 0) index -= 1;
	//	if (!index.range(occur) && !index.range(occur,-1)) return -1;
		if (!occur.$range(index) && !occur.$range(index,-1)) return -1;
		return index < 0 ? occur[index + occur.length] : occur[index];
	};

String.prototype.$plural = function(value)
	{
		return value == 1 && String(this).charAt(String(this).length - 1).$compare(["s","S"]) ? String(this).substring(0,String(this).length-1) : String(this);
	};

String.prototype.$split = function(value,index)
	{
		if (!$isval(value)) value = "";
		if (!$isnum(index)) index = 0;
		if (String(this).$contains(value))
			{
				var split = String(this).split(value), str = "", str2 = "";
				var occur = String(this).$occur(value);
			//	if (!index.range(occur) && !index.range(occur,-1)) return [ String(this), 0 ];
				if (!occur.$range(index) && !occur.$range(index,-1)) return [ String(this), 0 ];
				if (index == 0) return split;
				else if (index == $first)
					{
						for (var x = 1; x < split.length; x++)
							{
								str += split[x];
								if (x != split.length-1) str += value;
							}
						return [ split[0], str ];
					}
				else if (index == $last)
					{
						for (var x = 0; x < split.length-1; x++)
							{
								str += split[x];
								if (x != split.length-2) str += value;
							}
						return [ str, split[split.length-1] ];
					}
				else
					{
						if (index < 0) index = index + occur.length + 1;
						for (var x = 0; x < index; x++)
							{
								str += split[x];
								if (x != index-1) str += value;
							}
						for (var x = index; x < split.length; x++)
							{
								str2 += split[x];
								if (x != split.length-1) str2 += value;
							}
						return [ str, str2 ];
					}
			}
		else
			{
				return [ String(this) ];
			}
	};

String.prototype.$substring = function(start,count)
	{
		if (!$isnum(start)) start = 0;
		if (!$isnum(start)) count = String(this).length;
		if (count < 0 && count < (String(this).length * -1)) count = (String(this).length * -1) + 1;
		if (count > 0) return String(this).substring(start,start + count);
		if (count < 0) return String(this).substring(start,String(this).length + count);
		return String(this).substring(start,String(this).length + count);
	};

String.prototype.$proper = function()
	{
		return String(this).substring(0,1).toUpperCase() + String(this).substring(1,String(this).length);
	};

String.prototype.$equals = function()
	{
		var $arg = arguments.$array();
		if ($isarr($arg[0]))
			{
				for (var x = 0; x < $arg[0].length; x++)
					{
						if (String(this) == $arg[0][x]) return true;
					}
				return false;
			}
	};

String.prototype.$splitCap = function(split)
	{
		var str = "", array = [];
		for (var x = 0; x < String(this).length; x++)
			{
				str += String(this).charAt(x);
				if (x > 0 && String(this).charAt(x+1) == String(this).charAt(x+1).toUpperCase() && String(this).charAt(x+1) != " ")
					{
						array.$add(str);
						str = "";
					}
			}
		return $isstr(split) ? array.$string(split) : array;
	};

String.prototype._sweep = function(replace)
	{
		var string = String(this);
		string = string.replace(/\n/g,"");
		string = string.replace(/\t/g,"");
		if (replace == true) string = string.replace(/\s/g,"");
		return string;
	};

String.prototype._sweeper = function(replace)
	{
		var string = String(this);
		string = string.replace(/\n/g,"");
		string = string.replace(/\t/g,"");
		string = string._clean();
		if (replace == true) string = string.replace(/\s/g,"");
		return string;
	};

String.prototype.$toHTML = function()
	{
		var html = document.createElement("html");
		html.innerHTML = String(this);
		return html;
	};

function $br(count)
	{
		if (!$ispos(count)) count = 1;
		var newString = "", string = "<br />";
		for (var x = 0; x < count; x++) { newString += string; }
		return newString;
	}

function $n(count)
	{
		if (!$ispos(count)) count = 1;
		var newString = "", string = "\n";
		for (var x = 0; x < count; x++) { newString += string; }
		return newString;
	}

function $r(count)
	{
		if (!$ispos(count)) count = 1;
		var newString = "", string = "\r";
		for (var x = 0; x < count; x++) { newString += string; }
		return newString;
	}

function $t(count)
	{
		if (!$ispos(count)) count = 1;
		var newString = "", string = "\t";
		for (var x = 0; x < count; x++) { newString += string; }
		return newString;
	}

function $ep(count)
	{
		if (!$ispos(count)) count = 1;
		var newString = "", string = "&emsp;";
		for (var x = 0; x < count; x++) { newString += string; }
		return newString;
	}

function $sp(count)
	{
		if (!$ispos(count)) count = 1;
		var newString = "", string = "&nbsp;";
		for (var x = 0; x < count; x++) { newString += string; }
		return newString;
	}

function $stripHash(value)
	{
		if (!$isstr(value)) value = "";
		if (!value.$contain("#")) return value;
		var split = value.split("#");
		split.$cut();
		return split.$string();
	}

function $getHash(value)
	{
		if (!$isstr(value)) value = "";
		if (!value.$contain("#")) return value;
		var split = value.split("#");
		return split.$last();
	}


/* ------------------------------------>
*	>	CONVERT
* -------------------------------------> */

// Array is $tostring <==> $toarray
// Array[Array] is $tostring <==> $toarray
// Array[Object] is $objtostring <==> $objtoarray

// Object is $tostring <==> $toobject
// Object[Object] is ???

String.prototype.$toarray = function()
	{
		var $arg = arguments.$array();
		if (!$isstr($arg[0])) $arg[0] = ",";
		if (!$isstr($arg[1])) $arg[1] = "&";
		var split1 = String(this).split($arg[1]), split2 = [];
		split1.$clean();
		for (var x = 0; x < split1.length; x++)
			{
				split2[x] = split1[x].split($arg[0]);
				split2[x].$clean();
				if (split1.length == 1)
					{
						for (var y = 0; y < split2[x].length; y++)
							{
								split2[x][y] = !isNaN(split2[x][y]) ? Number(split2[x][y]) : split2[x][y];
							}
						return split2[x];
					}
			}
		for (var x = 0; x < split2.length; x++)
			{
				if ($isarr(split2[x]))
					{
						for (var y = 0; y < split2[x].length; y++)
							{
								split2[x][y] = !isNaN(split2[x][y]) ? Number(split2[x][y]) : split2[x][y];
							}
					}
			}
		return split2;
	};

String.prototype.$toobject = function()
	{
		var isnum = false;
		var $arg = arguments.$array();
		if ($isboo($arg[0])) isnum = $arg[0];
		if ($isboo($arg[2])) isnum = $arg[2];
		if (!$isstr($arg[0])) $arg[0] = ":";
		if (!$isstr($arg[1])) $arg[1] = ",";
		var split1 = String(this).split($arg[1]), split2 = [], inc = 0, newObj = {};
		split1.$clean();
		for (var x = 0; x < split1.length; x++)
			{
				split2[x] = split1[x].split($arg[0]);
			}
		for (var x = 0; x < split1.length; x++)
			{
				if (split2[x][0].length > 0)
					{
						newObj[split2[inc][0]] = (!isNaN(split2[inc][1]) && isnum == true) ? Number(split2[inc][1]) : split2[inc][1];
						inc++;
					}
			}
		return newObj;
	};

Array.prototype.$tostring = function()
	{
		var $arg = arguments.$array(), str = "";
		if (!$isstr($arg[0])) $arg[0] = ",";
		if (!$isstr($arg[1])) $arg[1] = "&";
		return this.$string($arg[0],$arg[1]);
	}

Array.prototype.$objtostring = function()
	{
		var $arg = arguments.$array(), str = "";
		if (!$isstr($arg[0])) $arg[0] = ",";
		if (!$isstr($arg[1])) $arg[1] = "&";
		if (!$isstr($arg[2])) $arg[2] = ":";
		for (var x = 0; x < this.length; x++)
			{
                if ($isarr(this[x]))
					{
						str += x > 0 ? $arg[1] : "";
						for (var y = 0; y < this[x].length; y++)
							{
								str += y > 0 ? $arg[0] : "";
								str += this[x][y];
							}
					}
				else if ($isobj(this[x]))
					{
						var inc = 0;
						str += x > 0 ? $arg[1] : "";
						for (var p in this[x])
							{
								if (this[x].hasOwnProperty(p))
									{
										str += inc > 0 ? $arg[0] : "";
										str += p + $arg[2] + this[x][p] ;
										inc++;
									}
							}
					}
                else
					{
						str += x > 0 ? $arg[1] : "";
						str += this[x];
					}
            }
		return str;
	};

$object_prototype("$tostring",function()
	{
		var $arg = arguments.$array(), str = "";
		if (!$isstr($arg[0])) $arg[0] = ":";
		if (!$isstr($arg[1])) $arg[1] = ",";
		for (var x in this)
			{
				if (this.hasOwnProperty(x)) str += x + $arg[0] + this[x] + $arg[1];
			}
		return str.substring(0,str.length-$arg[1].length);
	});

Array.prototype.$arraysToObject = function(sep)
	{
		var split = [], obj = {};
		for (var x = 0; x < this.length; x++)
			{
				if (this[x].$contains(sep))
					{
						split = this[x].split(sep);
					}
				obj[split[0]] = !isNaN(split[1]) ? Number(split[1]) : split[1];
			}
		return obj;
	};

String.prototype.$objtoarray = function()
	{
		var $arg = arguments.$array();
		if (!$isstr($arg[0])) $arg[0] = ",";
		if (!$isstr($arg[1])) $arg[1] = "&";
		if (!$isstr($arg[2])) $arg[2] = ":";
		var split1 = String(this).split($arg[1]), split2 = [], newObj = [], isobj = false;
		split1.$clean();
		for (var x = 0; x < split1.length; x++)
			{
				split2[x] = split1[x].split($arg[0]);
				split2[x].$clean();
				if (split1.length == 1)
					{
						for (var y = 0; y < split2[x].length; y++)
							{
								split2[x][y] = !isNaN(split2[x][y]) ? Number(split2[x][y]) : split2[x][y];
							}
						return split2[x];
					}
			}
		for (var x = 0; x < split2.length; x++)
			{
				split2[x] = split2[x].$arraysToObject($arg[2]);
			}
		return split2;
	};

Array.prototype.$objString = function()
	{
		var $arg = arguments.$array(), str = "";
		if (!$isstr($arg[0])) $arg[0] = ":";
		if (!$isstr($arg[1])) $arg[1] = ",";
		if (!$isstr($arg[2])) $arg[2] = "|";
		var len_Array = this.length;
		for (var x = 0; x < len_Array; x++)
			{
				var len_Object = this[x].$length(), inc = 0;
				for (var y in this[x])
					{
						inc++;
						if (this[x].hasOwnProperty(y))
							{
								str += y + $arg[0] + this[x][y];
								str += inc < len_Object ? $arg[1] : "";
							}
					}
				str += x < (len_Array-1) ? $arg[2] : "";
			}
		return str;
	};

String.prototype.$arrayObject = function()
	{
		var $arg = arguments.$array();
		if (!$isstr($arg[0])) $arg[0] = ":";
		if (!$isstr($arg[1])) $arg[1] = ",";
		if (!$isstr($arg[2])) $arg[2] = "|";
		if (!$isboo($arg[3])) $arg[3] = true;
		var split1 = String(this).split($arg[2]), split2 = [], inc = 0, newArrayObject = [];
		split1.$clean();
		for (var x = 0; x < split1.length; x++)
			{
				split2[x] = split1[x].split($arg[1]);
			}
		for (var x = 0; x < split1.length; x++)
			{
				newArrayObject[x] = {};
			}
		for (var x = 0; x < split1.length; x++)
			{
				for (var y = 0; y < split2[x].length; y++)
					{
						var splithis = split2[x][y].split($arg[0]);
						if ($arg[3])
							{
								newArrayObject[x][splithis[0]] = !isNaN(splithis[1]) ? Number(splithis[1]) : splithis[1];
							}
						else
							{
								newArrayObject[x][splithis[0]] = splithis[1];
							}
					}
			}
		return newArrayObject;
	};



/* ------------------------------------>
*	>	LOOPS
* -------------------------------------> */

Number.prototype.$loop = function(start,increment,callback,stop)
	{
		if (!$isnum(start)) start = 0;
		if (!$isnum(increment)) increment = 1;
		if (!$isnum(stop)) stop = 100;
		var y = start, c = 0;
		if ($isfunc(callback))
			{
				while (true)
					{
						var call = callback(y,c);
						y += increment;
						c++;
						if (c == Number(this) || (c == stop) || call == $break) break;
					}
			}
	};

Number.prototype.$reloop = function(callback,start,increment,stop)
	{
		if (!$isnum(start)) start = 0;
		if (!$isnum(increment)) increment = 1;
		if (!$isnum(stop)) stop = 100;
		var y = start, c = 0;
		if ($isfunc(callback))
			{
				while (true)
					{
						callback(y,c);
						y -= increment;
						c++;
						if (c == Number(this) || (c == stop)) break;
					}
			}
	};

Array.prototype.$looper = function(callback)
	{
        var array = this, inc = 0;
		if (!$isnum(array,$array) || array.length != 2)  array = [ 2, 2 ];
        for (var x = 0; x < array[0]; x++)
			{
				for (var y = 0; y < array[1]; y++)
					{
						callback(inc,x,y,array[0]-1,array[1]-1);
						inc++;
					}
			}
	};

function $coil(start,end,increment,callback,stop)
	{
		if (!$isnum(start)) start = 10;
		if (!$isnum(end)) end = 0;
		if (!$isnum(increment)) increment = 1;
		if (!$ispos(stop)) stop = 100;
		if (increment === 0) increment = 1;
		if (increment < 0 && end > start)
			{
				start = 10;
				end = 0;
			}
		if (increment > 0 && end < start)
			{
				start = 0;
				end = 10;
			}
		if (increment > 0 && increment > start)
			{
				increment = 1;
			}
		if (increment < 0 && increment > end)
			{
				increment = -1;
			}
		if (increment < 0 && (increment - start) < 0)
			{
				increment = -1;
			}
		if (increment > 0 && (increment - end) < 0)
			{
				increment = 1;
			}
		var y = start, c = 0;
		if ($isfunc(callback))
			{
				while (true)
					{
						callback(y,c);
						if (y == end || c == stop) break;
						y += increment;
						c++;
					}
			}
	}

Array.prototype.$cycle = function(callback)
	{
		var l = this.length;
		for(var x = 0; x < l; x++)
			{
				var back = this[x] || this[x] == 0 ? callback(this[x],x,l-1) : "";
				if (back == $break) break;
			}
	};

Array.prototype.$recycle = function(callback)
	{
		var l = this.length;
		for (var x = l - 1; x >= 0; x--)
			{
				var back = this[x] ? callback(this[x],x,l-1) : "";
				if (back == $break) break;
			}
	};

Array.prototype.$cycler = function(callback)
	{
        var inc = 0;
        this.$cycle(function(v1,i)
			{
				v1.$cycle(function(v2,j)
					{
						if (v1 && v2)
							{
								callback(v1,v2,i,j,inc,this.length-1,v1.length-1);
								inc++;
							}
					});
			});
	};

Array.prototype.$filter = function(callback,override)
	{
		if (!$isboo(override)) override = false;
        var l = this.length;
        var newArray = [];
       	if (override)
       		{
       			this.$recycle(function(v1,i)
					{
						if (v1)
							{
								var filter = callback(v1,i,l-1,this);
								if (filter == false) v1.$remove();
							}
					});
       		}
       	else
       		{
       			this.$cycle(function(v1,i)
					{
						if (v1)
							{
								var filter = callback(v1,i,l-1,this);
								if (filter == true) newArray.push(v1);
							}
					});
       			return newArray;
       		}
	};

$object_prototype("$cycle",function(callback)
	{
		var l = this.$length(), i = 0, check = true;
		for (var p in this)
			{
				if (this.hasOwnProperty(p) && !$iselm(this[p]))
					{
						check = false;
						break;
					}
			}
		if (check)
			{
				for (var x = 0; x < l ; x++)
					{
						if ($isset(this[x]) && this[x])
							{
								var back = callback(this[x],x,l-1);
								if (back == $break) break;
							}
					}
			}
		else
			{
				for (var p in this)
					{
						if (this.hasOwnProperty(p))
							{
								var back = this[p] ? callback(this[p],i,p,l-1) : "";
								if (back == $break) break;
								i++;
							}
					}
			}
	});

$object_prototype("$recycle",function(callback)
	{
		var l = this.$length(), i = 0, check = true;
		for (var p in this)
			{
				if (this.hasOwnProperty(p) && !$iselm(this[p]))
					{
						check = false;
						break;
					}
			}
		if (check)
			{
				for (var x = l - 1; x >= 0; x--)
					{
						if ($isset(this[x]) && this[x])
							{
								var back = callback(this[x],x,l-1);
								if (back == $break) break;
							}
					}
			}
		else
			{
				for (var p in this)
					{
						if (this.hasOwnProperty(p))
							{
								var back = this[p] ? callback(this[p],i,p,l-1) : "";
								if (back == $break) break;
								i++;
							}
					}
			}
	});

$object_prototype("$filter",function(callback,override)
	{
		if (!$isboo(override)) override = false;
		var newObject = [], len = this.$length(), inc = 0, check = true;
		for (var p in this)
			{
				if (this.hasOwnProperty(p) && !$iselm(this[p]))
					{
						check = false;
						break;
					}
			}
		if (check)
			{
				if (override == true)
					{
						this.$recycle(function(val,x,l)
							{
								var filter = callback(val,x,l);
								if (filter == false) val.$remove();
							});
					}
				else
					{
						this.$cycle(function(val,x,l)
							{
								var filter = callback(val,x,l);
								if (filter == true) newObject.push(val);
							});
						return newObject;
					}
			}
	});

$object_prototype("$table",function(callback)
	{
		if ($iselm(this) && this.tagName == "TABLE")
			{
				this.rows.$cycle(function(row,r,rl)
					{
						row.cells.$cycle(function(cell,c,cl)
							{
								callback(row,cell,r,c,rl,cl);
							});
					});
			}
	});

$object_prototype("$hasprop",function(prop)
	{
		if (!$isval(prop)) prop = 0;
		var found = false;
		this.$cycle(function(value,i,p)
			{
				if (prop == p)
					{
						found = true;
						return $break;
					}
			});
		return found;
	});

$object_prototype("$setAttribute",function(prop,value,filter)
	{
		var obj = this;
/*		if ($isfunc(filter))
			{
				obj.$filter(filter);
			}*/
		obj.$cycle(function(item,i,li)
			{
				if (item) item.setAttribute(prop,value);
			});
	});
$object_prototype("$setProperty",function(prop,value,filter)
	{
		var obj = this;
/*		if ($isfunc(filter))
			{
				obj.$filter(filter);
			}*/
		obj.$cycle(function(item,i,li)
			{
				if (item) item[prop] = value;
			});
	});
$object_prototype("$setStyle",function(prop,value,filter)
	{
		var obj = this;
/*		if ($isfunc(filter))
			{
				obj.$filter(filter);
			}*/
		obj.$cycle(function(item,i,li)
			{
				if (item) item.style[prop] = value;
			//	if (item) item.setAttribute(prop,value);
			});
	});




/* ------------------------------------>
*	>	ELEMENT FUNCTIONS
* -------------------------------------> */

function $insertBefore(newNode, referenceNode)
	{
		referenceNode.parentNode.insertBefore(newNode, referenceNode.previousSibling);
	}

function $insertAfter(newNode, referenceNode)
	{
		referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}

function $insertStart(newNode, referenceNode)
	{
		referenceNode.parentNode.insertBefore(newNode, referenceNode.parentNode.childNodes[0]);
	}

function $insertIntoStart(newNode, referenceNode)
	{
		referenceNode.insertBefore(newNode, referenceNode.childNodes[0]);
	}

function $font(string,color,size)
	{
		if (!$isval(string)) string = "";
		if (!$isstr(color)) color = "white";
		size = $ispos(size) ? " size='" + size + "'" : "";
		return "<font color='" + color + "'" + size + ">" + string + "</font>";
	}

var $fontColor = [ "white", "green", "red" ];
function $fontNumber(number,obj)
	{
		if (!$isobj(obj)) obj = { size : "", note : "", format : "", colors : "" };
		if (!$isnum(number)) number = 0;
		if (!$ispos(obj.size)) obj.size = "";
		if (!$isstr(obj.note)) obj.note = "";
		if (!$isboo(obj.format)) obj.format = true;
		var toadd = $ispos(number) ? "+" : "";
		var tocolor = $ispos(number) ? $fontColor[1] : ($isneg(number) ? $fontColor[2] : $fontColor[0]);
		if ($isarr(obj.colors) && obj.colors.length == 3)
			{
				tocolor = $ispos(number) ? obj.colors[1] : ($isneg(number) ? obj.colors[2] : obj.colors[0]);
			}
		var string = obj.format ? number.$format() : number;
		return $font(toadd + string + obj.note,tocolor.$col_hash(),obj.size);
	}

function $span(string,size,color)
	{
		if (!$isval(string)) string = "";
		if (!$isnum(size)) size = 12;
		if (!$isstr(color)) color = "white";
		return "<span style='font-size:" + size + "px; color:" + color.$col_hash() + ";'>" + string + "</span>";
	}

function $spanner(string,obj)
	{
		if (!$isobj(obj)) obj = { id : "", class : "", color : "", size : "", bold : "", style : "" };
		if (!$isval(string)) string = "";
		var html = "<span";
		if ($isval(obj.id)) html += " id='" + obj.id + "'";
		if ($isval(obj.class)) html += " class='" + obj.class + "'";
		html += " style='";
		if ($isstr(obj.color)) html += "color:" + obj.color.$col_hash() + ";";
		if ($isnum(obj.size)) html += "font-size:" + obj.size + "px;";
		if (!$isboo(obj.bold)) html += ""; else if (obj.bold === true) html += " font-weight:bold;";
		if ($isstr(obj.style)) html += obj.style;
		html += "'";
		html += ">";
		html += string;
		html += "</span>";
		return html;
	}

function $diver(string,obj)
	{
		if (!$isobj(obj)) obj = { id : "", class : "", color : "", size : "", bold : "", style : "" };
		if (!$isval(string)) string = "";
		var html = "<div";
		if ($isval(obj.id)) html += " id='" + obj.id + "'";
		if ($isval(obj.class)) html += " class='" + obj.class + "'";
		html += " style='";
		if ($isstr(obj.color)) html += "color:" + obj.color.$col_hash() + ";";
		if ($isnum(obj.size)) html += "font-size:" + obj.size + "px;";
		if (!$isboo(obj.bold)) html += ""; else if (obj.bold === true) html += " font-weight:bold;";
		if ($isstr(obj.style)) html += obj.style;
		html += "'";
		html += ">";
		html += string;
		html += "</div>";
		return html;
	}

function $box(string,obj)
	{
		if (!$isobj(obj)) obj = { id : "", class : "", color : "", size : "", bgcolor : "", width : "", height : "", border : "", display : "", style : "" };
		if (!$isval(string)) string = "";
		var html = "<div";
		if ($isstr(obj.id)) html += " id='" + obj.id + "'";
		if ($isstr(obj.class)) html += " class='" + obj.class + "'";
		html += " style='";
		if ($isstr(obj.color)) html += "color:" + obj.color.$col_hash() + ";";
		if ($isnum(obj.size)) html += "font-size:" + obj.size + "px;";
		if ($isstr(obj.bgcolor)) html += "background-color:" + obj.bgcolor.$col_hash() + ";";
		if ($isnum(obj.width)) html += "width:" + obj.width + "px;";
		if ($isstr(obj.width)) html += "width:" + obj.width + ";";
		if ($isnum(obj.height)) html += "height:" + obj.height + "px;";
		if ($isstr(obj.height)) html += "height:" + obj.height + ";";
		if ($isstr(obj.border)) html += "border:" + obj.border + ";";
		if ($isstr(obj.display)) html += "display:" + obj.display + ";";
		if (obj.bold === true) html += " font-weight:bold;";
		if ($isstr(obj.style)) html += obj.style;
		html += "'";
		html += ">";
		html += string;
		html += "</div>";
		return html;
	}

function $select(obj)
	{
		var html = "<select";
		if ($isobj(obj))
			{
				if ($isstr(obj.id)) html += " id='" + obj.id + "'";
				if ($isstr(obj.className)) html += " class='" + obj.className + "'";
				if ($isstr(obj.onchange)) html += " onchange='" + obj.onchange + "'";
				if ($isstr(obj.style))
					{
						html += " style='" + obj.style;
						if ($isstr(obj.display)) html += " display:" + obj.display + ";";
						html += "'";
					}
				html += ">";
				if ($isarr(obj.options))
					{
						if (obj.shuffle === true) obj.options.shuffle();
						for (var x = 0; x < obj.options.length; x++)
							{
								var options = obj.options[x];
								var values = $isarr(obj.values) && obj.values.length == obj.options.length ? obj.values[x] : obj.options[x];
								html += "<option value='" + values + "'>" + options + "</option>";
							}
					}
			}
		else
			{
				html += ">";
			}
		html += "</select>";
		return html;
	}

/* ------------------------------------>
*	>	COLORS
* -------------------------------------> */

function $col_hash(string)
	{
        if (!$isstr(string)) return "";
		return /^[0-9A-Fa-f]{6}$/i.test(string) ? "#" + string : string;
	}

String.prototype.$col_hash = function()
	{
		return /^[0-9A-Fa-f]{6}$/i.test(String(this)) ? "#" + String(this) : String(this);
	};

String.prototype.$ishex = function()
	{
		if (String(this).length == 7) { return /^#[0-9A-Fa-f]{6}$/i.test(String(this)); }
		else { return /^[0-9A-Fa-f]{6}$/i.test(String(this)); }
	};

function $rand_col() { return Math.random().toString(16).substr(2,6); }

function $col_array(x)
	{
		if (!$isnum(x)) x = 1;
		var newArray = new Array(x);
		for (var x = 0; x < newArray.length; x++)
			{
				newArray[x] = $rand_col();
			}
		return newArray;
	}

function $componentToHex(c)
	{
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}

function $hex(r, g, b)
	{
		if (isunset(r) || !$isnum(r)) r = 0;
		if (isunset(g) || !$isnum(g)) g = 0;
		if (isunset(b) || !$isnum(b)) r = 0;
		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	}
/*
function $rgb(hex)
	{
		if (isunset(hex) || !$isstr(hex)) hex = "#000000";
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r : parseInt(result[1],16),
			g : parseInt(result[2],16),
			b : parseInt(result[3],16),
			rgb : [ parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16) ],
			str : function() {
				return "rgb(" + parseInt(result[1],16) + ", " + parseInt(result[2],16) + ", " + parseInt(result[3],16) + ")"
			}
		} : null;
	}*/

String.prototype.$rgb = function()
	{
		return $rgb(String(this));
	};
	
Array.prototype.$hex = function()
	{
		if (this.$isnum() && this.length == 3)
			{
				var real = true;
				for (var x = 0; x < this.length; x++)
					{
						if (!this[x].$range(0,255)) real = false;
					}
				return real ? $hex(this[0],this[1],this[2]) : null;
			}
		return null;
	};



/* ------------------------------------>
*	>	TIME
* -------------------------------------> */

var $MILLI = 1;
var $SEC = $MILLI * 1000;
var $MIN = $SEC * 60;
var $HOUR = $MIN * 60;
var $DAY = $HOUR * 24;
var $WEEK = $DAY * 7;
var $DEC = 0.1;

var $time_units = [ $MILLI, $SEC, $MIN, $HOUR, $DAY, $WEEK, $DEC ];
var $time_text_1 = [ "weeks", "days", "hours", "minutes", "seconds" ];
var $time_text_2 = [ "wk", "day", "hr", "min", "sec" ];
var $time_text_3 = [ "w", "d", "h", "m", "s" ];
var $time_text_4 = [ "wk", "dy", "hr", "mn", "sc" ];
var $time_text = [ $time_text_1, $time_text_2, $time_text_3, $time_text_4 ];
//var $time_object = { weeks:0, days:0, hours:0, minutes:0, seconds:0, start:0 };
var $time_object = [ 0, 0, 0, 0, 0, 0 ];

Array.prototype.$istime = function()
	{
		return this.length == 6 && this.$isnum();
	};

function $time()
	{
		var $arg = arguments.$array(), number = 0, unit1 = $SEC, unit2 = $MILLI;
		if ($isnum($arg[0])) number = $arg[0];
		if ($ispos($arg[1])) unit1 = $arg[1];
		if ($ispos($arg[2])) unit2 = $arg[2];
	//	if ($isnum($arg[1]) && $arg[1].$contains($time_units)) unit1 = $arg[1];
	//	if ($isnum($arg[2]) && $arg[2].$contains($time_units)) unit2 = $arg[2];
		if (unit2 == $DEC) return $decimalMinutes(number) / unit1;
		if (unit1 == $DEC) return $minuteDecimals(number * unit2);
		var milli = 0;
		if (unit2 == $MILLI) milli = number;
		if (unit2 == $SEC) milli = number * 1000;
		if (unit2 == $MIN) milli = (number * 1000) * 60;
		if (unit2 == $HOUR) milli = ((number * 1000) * 60) * 60;
		if (unit2 == $DAY) milli = (((number * 1000) * 60) * 60) * 24;
		if (unit2 == $WEEK) milli = ((((number * 1000) * 60) * 60) * 24) * 7;
		return milli / unit1;
	}

function $timeStamp(obj)
	{
		return $stringTime(obj,["","","","",""],":","",true);
	}

function $stringTime(array,text,sep,space,zero,cutoff,shorten,shorten2,limit)
	{
		if (!array.$istime()) array = $time_object;
		if (!$isarr(text) || text.length != 5) text = $time_text_1;
		if (!$isstr(sep)) sep = ", ";
		if (!$isstr(space)) space = " ";
		if (!$isboo(zero)) zero = true;
		if (!$isnum(cutoff) || !$time_units.$compare(cutoff)) cutoff = $SEC;
		if (!$isboo(shorten)) shorten = false;
		if (!$isboo(shorten2)) shorten2 = false;
		if (!$isarr(limit)) limit = [];
		var string = "";
		var $wk = array[0], $dy = array[1], $hr = array[2], $mn = array[3], $sc = array[4], $start = array[5];
		var $wk2 = $wk, $dy2 = $dy, $hr2 = $hr, $mn2 = $mn, $sc2 = $sc;
//		if ($add(array) == 0) string = "0" + space + text[4];
		if (zero)
			{
				if ($wk2 < 10) $wk2 = "0" + $wk2;
				if ($dy2 < 10) $dy2 = "0" + $dy2;
				if ($hr2 < 10) $hr2 = "0" + $hr2;
				if ($mn2 < 10) $mn2 = "0" + $mn2;
				if ($sc2 < 10) $sc2 = "0" + $sc2;
			}
		if ($start >= $WEEK && cutoff <= $WEEK) string += $wk2 + space + text[0].$plural($wk) + sep;
		if ($start >= $DAY && cutoff <= $DAY) string += $dy2 + space + text[1].$plural($dy) + sep;
		if ($start >= $HOUR && cutoff <= $HOUR) string += $hr2 + space + text[2].$plural($hr) + sep;
		if ($start >= $MIN && cutoff <= $MIN) string += $mn2 + space + text[3].$plural($mn) + sep;
		if ($start >= $SEC && cutoff <= $SEC) string += $sc2 + space + text[4].$plural($sc);
		if (cutoff > $SEC) string = string.substring(0,string.length-sep.length);
		if (shorten)
			{
				string = "";
				if ($wk > 0 && cutoff <= $WEEK) string += $wk2 + space + text[0].$plural($wk) + sep;
				if ($dy > 0 && cutoff <= $DAY) string += $dy2 + space + text[1].$plural($dy) + sep;
				if ($hr > 0 && cutoff <= $HOUR) string += $hr2 + space + text[2].$plural($hr) + sep;
				if ($mn > 0 && cutoff <= $MIN) string += $mn2 + space + text[3].$plural($mn) + sep;
				if ($sc > 0 && cutoff <= $SEC) string += $sc2 + space + text[4].$plural($sc);
				if (cutoff > $SEC) string = string.substring(0,string.length-sep.length);
		  }
		if (shorten2)
			{
				string = "";
				if ($wk > 0) string += $wk2 + space + text[0].$plural($wk);
				else if ($dy > 0 && $wk == 0) string = $dy2 + space + text[1].$plural($dy);
				else if ($hr > 0 && $dy == 0 && $wk == 0 && $mn == 0) string = $hr2 + space + text[2].$plural($hr);
				else if ($hr > 0 && $dy == 0 && $wk == 0 && $mn > 0 && $sc == 0) string = $hr2 + space + text[2].$plural($hr) + sep + $mn2 + space + text[3].$plural($mn);
				else if ($hr == 0 && $dy == 0 && $wk == 0 && $mn > 0 && $sc == 0) string = $mn2 + space + text[3].$plural($mn);
				else if ($hr > 0 && $dy == 0 && $wk == 0 && $mn > 0 && $sc == 0)
					{
						string = $hr2 + space + text[2].$plural($hr) + sep + $mn2 + space + text[3].$plural($mn);
						if (cutoff == $SEC) string += sep + $sc2 + space + text[4].$plural($sc);
					}
				else if ($hr == 0 && $dy == 0 && $wk == 0 && $mn == 0 && $sc == 0) string = $mn2 + space + text[3].$plural($mn);
			}
		if (limit.length == 2 && $isnum(limit[0]) && limit[0] > 0 && $isstr(limit[1]) && $dy >= limit[0]) string = limit[1];
		if (string == "") string = "0" + space + text[4];
		return string;
	}

function $passTime(milli,start)
	{
		var $wk = 0, $dy = 0, $mn = 0, $hr = 0, $sc = 0;
		if (!$isnum(milli)) milli = 0;
		if (!$isnum(start) || !$time_units.$compare(start)) start = $WEEK;
		if (milli == 0) start = 0;
		if (start == $WEEK) $wk = Math.floor(milli / $WEEK);
		if (start == $WEEK) $dy = Math.floor((milli % $WEEK) / $DAY);
		if (start == $DAY) $dy = Math.floor(milli / $DAY);
		if (start == $WEEK || start == $DAY || start == $HOUR) $mn = Math.floor((milli % $HOUR) / $MIN);
		if (start == $MIN) $mn = Math.floor(milli / $MIN);
		if (start == $WEEK || start == $DAY) $hr = Math.floor((milli % $DAY) / $HOUR);
		if (start == $HOUR) $hr = Math.floor(milli / $HOUR);
		if (start == $WEEK || start == $DAY || start == $HOUR || start == $MIN) $sc = Math.floor((milli % $MIN) / $SEC);
		if (start == $SEC) $sc = Math.floor(milli / $SEC);
		return [$wk,$dy,$hr,$mn,$sc,start];
	}

function $decimalMinutes(number)
	{
		if (!$isnum(number)) number = 0;
		var str = "", strSplit, result = 0;
		if ($isfloat(number))
			{
				str = $round(number,2).toString();
				strSplit = str.split('.');
				if (strSplit[1].length == 1) strSplit[1] += "0";
				result = (Number(strSplit[0]) * 60) + Number(strSplit[1]);
			}
		else
			{
				result = (number * 60);
			}
		return result * $SEC;
	}

function $minuteDecimals(number)
	{
		if (!$isnum(number)) number = 0;
		var str = "", strSplit, result = 0, div = [];
		number = $round(number / $SEC);
		if (number < 10)
			{
				result = "0.0" + number;
			}
		else
			{
				div = $div(number,60);
				if (div[1] < 10) div[1] = "0" +  div[1];
				result = div[0] + "." + div[1];
			}
		return Number(result);
	}

function extractDate(date) { return date.split(" G")[0]; }



function $getTime(date)
	{
		if (!$isdate(date)) date = new Date();
		return date.getTime();
	}

function $getTimeNonUTC(date)
	{
		if (!$isdate(date)) date = new Date();
		return date.getTime() - $getOffset($MILLI);
	}

function $getOffset(unit)
	{
		var date = new Date();
		if (unit == $MILLI) return (((date.getTimezoneOffset()) * 60) * 1000) * -1;
		if (unit == $SEC) return (date.getTimezoneOffset() * 60) * -1;
		if (unit == $MIN) return date.getTimezoneOffset() * -1;
		if (unit == $HOUR) return (date.getTimezoneOffset() / 60) * -1;
		return date.getTimezoneOffset() / -60;
	}

function $dateTime(dateepoch,showseconds)
	{
		if (!$isboo(showseconds)) showseconds = true;
		var shift = showseconds ? 3 : 0;
		if ($isdate(dateepoch))
			{
				return new Date(dateepoch.getTime() + $getOffset($MILLI)).toISOString().substring(0,16 + shift);
			}
		else if ($isnum(dateepoch))
			{
				return new Date(dateepoch + $getOffset($MILLI)).toISOString().substring(0,16 + shift);
			}
		else
			{
				return new Date($getTime() + $getOffset($MILLI)).toISOString().substring(0,16 + shift);
			}
	}

function $dateTimeNonUTC(dateepoch,showseconds)
	{
		if (!$isboo(showseconds)) showseconds = true;
		var shift = showseconds ? 3 : 0;
		if ($isdate(dateepoch))
			{
				return dateepoch.toISOString().substring(0,16 + shift);
			}
		else if ($isnum(dateepoch))
			{
				return new Date(dateepoch).toISOString().substring(0,16 + shift);
			}
		else
			{
				return new Date().toISOString().substring(0,16 + shift);
			}
	}

function $dateTimeNonUTCoffset(offset,dateepoch,showseconds)
	{
		if (!$isboo(showseconds)) showseconds = true;
		var shift = showseconds ? 3 : 0;
		offset *= $HOUR;
		if ($isdate(dateepoch))
			{
			//	return dateepoch.toISOString().substring(0,16 + shift);
				return new Date(dateepoch.getTime()+offset).toISOString().substring(0,16 + shift);
			}
		else if ($isnum(dateepoch))
			{
			//	return new Date(dateepoch).toISOString().substring(0,16 + shift);
				return new Date(new Date(dateepoch).getTime()+offset).toISOString().substring(0,16 + shift);
			}
		else
			{
				return new Date(new Date().getTime()+offset).toISOString().substring(0,16 + shift);
			}
	}

function $timeDiff(epoch)
	{
		if (!$isnum(epoch)) return 0;
		return $getTime() - epoch;
	}

function $timeDiffNonUTC(epoch)
	{
		if (!$isnum(epoch)) return 0;
		return $getTimeNonUTC() - epoch;
	}

function $datetimeInput(epoch,id,glass,onchange,style,disable)
	{
		if (!$isnum(epoch)) epoch = $getTime();
		var html = "<input type='datetime-local' value='" + $dateTime(epoch,false) + "' ";
		if ($isstr(id)) html += "id='" + id + "' ";
		if ($isstr(glass)) html += "class='" + glass + "' ";
		if ($isstr(style)) html += "style='" + style + "' ";
		if ($isfunc(onchange)) html += "onchange='(" + onchange + ").call(this)' ";
		if (disable === true) html += "disabled ";
		html += "/>";
		return html;
	}

function $datetimeInputNonUTC(epoch,id,glass,onchange,style,disable)
	{
		if (!$isnum(epoch)) epoch = $getTimeNonUTC();
		var html = "<input type='datetime-local' value='" + $dateTimeNonUTC(epoch,false) + "' ";
		if ($isstr(id)) html += "id='" + id + "' ";
		if ($isstr(glass)) html += "class='" + glass + "' ";
		if ($isstr(style)) html += "style='" + style + "' ";
		if ($isfunc(onchange)) html += "onchange='(" + onchange + ").call(this)' ";
		if (disable === true) html += "disabled ";
		html += "/>";
		return html;
	}

function $epochTimedate(datetime)
	{
		var date = new Date(datetime);
		if ($isdate(date))
			{
				return $getTimeNonUTC(date);
			}
		return $getTime();
	}

function $objectTimeDate(datetime,is12hour)
	{
		if (!$isboo(is12hour)) is12hour = false;
		if ($isstr(datetime) && $isdate(new Date(datetime)))
			{
				var split = datetime.split("T");
				var date = split[0].split("-");
				var time = split[1].split(":");
				date.$cycle(function(value)
					{
						if (value == "") value = 0;
					});
				time.$cycle(function(value)
					{
						if (value == "") value = 0;
					});
				var pos = "";
				if (is12hour)
					{
						if (time[0] > 12)
							{
								time[0] -= 12;
								pos = "PM";
							}
						else
							{
								pos = "AM";
							}
					}
				return {
					year: date[0], month: date[1], day: date[2],
					hour: time[0], min: time[1], sec: time[2],
					pos: pos
				};
			}
		return {};
	}

function $strDateTime(o,cutsec,split)
	{
		var stringDate = "", stringTime = "";
		if (!$isboo(cutsec)) cutsec = false;
		if (!$isboo(split)) split = false;
		if($isset(o.year) && $isset(o.hour))
			{
				stringDate += o.day + "-" + o.month + "-" + o.year;
				stringTime += o.hour + ":" + o.min;
				if (!cutsec) string += ":" + o.sec;
				stringTime += " " + o.pos;
			}
		return split ? [ stringDate, stringTime ] : stringDate + " " + stringTime ;
	}

function $display_countdown(date,callback,timeout)
	{
		if (!$isnum(timeout)) timeout = 1000;
		var time_reset = date.getTime();
		var set_func = function()
			{
				var today = new Date();
				var time_today = today.getTime();
				var time_left = time_reset - time_today;
				callback(time_left);
			};
		set_func();
		var set_timer;
		if (timeout > 0) set_timer = setInterval(set_func,timeout);
	}
function $display_countup(date,callback,timeout)
	{
		if (!$isnum(timeout)) timeout = 1000;
		var time_reset = date.getTime();
		var set_func = function()
			{
				var today = new Date();
				var time_today = today.getTime();
				var time_left = time_today - time_reset;
				callback(time_left);
			};
		set_func();
		var set_timer;
		if (timeout > 0) set_timer = setInterval(set_func,timeout);
	}
function $display_time_NonUTC(callback,offset,timeout)
	{
		if (!$isnum(timeout)) timeout = 1000;
		if (!$isnum(offset)) offset = 0;
		var set_func = function()
			{
				callback($dateTimeNonUTCoffset(offset).substring(11));
			};
		set_func();
		var set_timer = setInterval(set_func,timeout);
	}

/* ------------------------------------>
*	>	Computer Size
* -------------------------------------> */

const $BYTE = 1024;
const $KB = $BYTE * $BYTE;
const $MB = $KB * $BYTE;
const $GB = $MB * $BYTE;
const $TB = $GB * $BYTE;
function $byte(number, unit1, unit2)
	{
		if (!$isnum(number)) number = 0;
		if (!$ispos(unit1)) unit1 = $KB;
		if (!$ispos(unit2)) unit2 = $GB;
		var byte = 0;
		if (unit2 == $BYTE) byte = number;
		if (unit2 == $KB) byte = number * 1024;
		if (unit2 == $MB) byte = (number * 1024) * 1024;
		if (unit2 == $GB) byte = ((number * 1024) * 1024) * 1024;
		if (unit2 == $TB) byte = (((number * 1024) * 1024) * 1024) * 1024;
		return (byte / unit1) * $BYTE;
	}

/* ------------------------------------>
*	>	LOCAL STORAGE
* -------------------------------------> */

var $local = localStorage;
var $session = sessionStorage;
var $delete = "delete";

function $objStore()
	{
		var obj = [];
		for (var key in $local)
			{
				if ($local.hasOwnProperty(key)) obj[key] = $local.getItem(key);
			//	if ($isstr($local[key])) obj[key] = $local.getItem(key);
			}
		return obj;
	}

function $arrStore()
	{
		var arr = [], inc = 0;
		for (var key in $local)
			{
				if ($local.hasOwnProperty(key))
			//	if ($isstr($local[key]))
					{
						arr[inc] = [ key, $local.getItem(key) ];
						inc++;
					}
			}
		return arr;
	}

var $TYPE_INT = "type_int";
var $TYPE_ARRAY = "type_array";
var $TYPE_ARRAY_ARRAY = "type_array_array";
var $TYPE_ARRAY_OBJECT = "type_array_object";
var $TYPE_OBJECT = "type_object";
var $TYPE_NAMES = [
	$TYPE_INT, $TYPE_ARRAY, $TYPE_ARRAY_ARRAY, $TYPE_ARRAY_OBJECT, $TYPE_OBJECT
];
var $TYPE_GET_FUNCS = [
	$FUNC_GET_INT, $FUNC_GET_ARRAY, $FUNC_GET_ARRAY_ARRAY, $FUNC_GET_ARRAY_OBJECT, $FUNC_GET_OBJECT
];
var $TYPE_SET_FUNCS = [
	$FUNC_SET_INT, $FUNC_SET_ARRAY, $FUNC_SET_ARRAY_ARRAY, $FUNC_SET_ARRAY_OBJECT, $FUNC_SET_OBJECT
];
var STORE_FUNC_OBJECT_SPLIT = [":",","];

//== EXAMPLE ==> $store([name],value,overwrite||true,false,$TYPE_ARRAY);
function $storex(name,value,overwrite,istemp,getCallBack,setCallback)
	{
		var $storage = $local;
		if (istemp == true) $storage = $session;
		if ($isstr(getCallBack))
			{
			/*	var get, set;
				$TYPE_NAMES.$cycle(function(val,i)
					{
						if (getCallBack == val)
							{
								get = $TYPE_GET_FUNCS[i];
								set = $TYPE_SET_FUNCS[i];
							}
					});
				getCallBack = get;
				setCallBack = set;*/
				if (getCallBack == $TYPE_INT)
					{
						getCallBack = $FUNC_GET_INT;
						setCallBack = $FUNC_SET_INT;
					}
				else if (getCallBack == $TYPE_ARRAY)
					{
						getCallBack = $FUNC_GET_ARRAY;
						setCallBack = $FUNC_SET_ARRAY;
					}
				else if (getCallBack == $TYPE_ARRAY_ARRAY)
					{
						getCallBack = $FUNC_GET_ARRAY_ARRAY;
						setCallBack = $FUNC_SET_ARRAY_ARRAY;
					}
				else if (getCallBack == $TYPE_ARRAY_OBJECT)
					{
						getCallBack = $FUNC_GET_ARRAY_OBJECT;
						setCallBack = $FUNC_SET_ARRAY_OBJECT;
					}
				else if (getCallBack == $TYPE_OBJECT)
					{
						getCallBack = $FUNC_GET_OBJECT;
						setCallBack = $FUNC_SET_OBJECT;
					}
			}
		if (!$isset(value) && !$isfunc(getCallBack))
			{
				return $storage[name];
			}
		else if (!$isset(value) && $isfunc(getCallBack))
			{
				return getCallBack($storage[name]);
			}
		if (overwrite == false && !$storage[name] || overwrite == true || !$isset(overwrite))
			{
				if ($isset(value) && !$isfunc(setCallback))
					{
						$storage[name] = value;
					}
				else if ($isset(value) && $isfunc(setCallback))
					{
						$storage[name] = setCallback(value);
					}
			}
		if (value == $delete) return $storage.removeItem(name);
	}

function $FUNC_GET_INT(val)
	{
		return val.$int();
	}
function $FUNC_GET_ARRAY(val)
	{
		return val.$toarray();
	}
function $FUNC_GET_ARRAY_ARRAY(val)
	{
		return val.$toarray();
	}
function $FUNC_GET_ARRAY_OBJECT(val)
	{
		return val.$objtoarray();
	}
function $FUNC_GET_OBJECT(val)
	{
		return val.$toobject(STORE_FUNC_OBJECT_SPLIT[0],STORE_FUNC_OBJECT_SPLIT[1],false);
	}
function $FUNC_GET_OBJECT_NUM(val)
	{
		return val.$toobject(":",",",true);
	}

function $FUNC_SET_INT(val)
	{
		return val;
	}
function $FUNC_SET_ARRAY(val)
	{
		return val.$string();
	}
function $FUNC_SET_ARRAY_ARRAY(val)
	{
		return val.$tostring();
	}
function $FUNC_SET_ARRAY_OBJECT(val)
	{
		return val.$objtostring();
	}
function $FUNC_SET_OBJECT(val)
	{
		return val.$tostring(STORE_FUNC_OBJECT_SPLIT[0],STORE_FUNC_OBJECT_SPLIT[1]);
	}
function $FUNC_SET_OBJECT_NUM(val)
	{
		return val.$tostring();
	}

/* ------------------------------------>
*	>	COOKIES
* -------------------------------------> */

var cookie_today = new Date();
var cookie_expiry = new Date(cookie_today.getTime() + 30 * 24 * 3600 * 1000); // plus 30 days

function $cookie_set(cname, cvalue)
	{
		var expires = "expires="+cookie_expiry.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}

function $cookie_get(cname)
	{
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++)
			{
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1);
				if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
			}
		return "";
	}

function $cookie_check(name)
	{
		var cookie = $cookie_get(name);
		if (cookie != "") { return true; }
		return false;
	}

function $cookie_new(name, value)
	{
		if (!$cookie_check(name))
			{
				$cookie_set(name, value);
				return true;
			}
		return false;
	}

function $cookie_delete(cname)
	{
		var expires = "expires="+-1;
		document.cookie = cname + "=" + "; " + expires;
	}



/* ------------------------------------>
*	>	OTHER
* -------------------------------------> */

function $oj(obj)
	{
		var string = "";
		obj.$cycle(function(value,i,p,l)
			{
				string += p + "=" + value;
				if (i < l) string += "&";
			});
		return string;
	}

function $talk_php(url,request,callback,sync)
	{
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST",url,sync || true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.onreadystatechange = function()
			{
				if (xhttp.readyState == 4 && xhttp.status == 200)
					{
						callback(xhttp.responseText);
					}
			};
		xhttp.send($oj(request));
	}

function $read_file(url,request,callback,sync)
	{
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET",url,sync || true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.onreadystatechange = function()
			{
				if (xhttp.readyState == 4 && xhttp.status == 200)
					{
						callback(xhttp.responseText);
					}
			};
		xhttp.send($oj(request));
	}

function $ajax_get(url,request,callback,sync,header)
	{
		if ($isobj(request) && request !== null) request = $oj(request);
		if (!$isstr(header)) header = "application/x-www-form-urlencoded";
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET",url,sync || true);
		xhttp.setRequestHeader("Content-Type", header);
		xhttp.onreadystatechange = function()
			{
				if (xhttp.readyState == 4 && xhttp.status == 200)
					{
						callback(xhttp.responseText);
					}
			};
		xhttp.send(request);
	}

function $ajax_post(url,request,callback,sync,header)
	{
		if ($isobj(request) && request !== null) request = $oj(request);
		if (!$isboo(sync)) sync = true;
		if (!$isstr(header)) header = "application/x-www-form-urlencoded";
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST",url,sync);
		xhttp.setRequestHeader("Content-type", header);
		xhttp.onreadystatechange = function()
			{
				if (xhttp.readyState == 4 && xhttp.status == 200)
					{
						callback(xhttp.responseText);
					}
			};
		xhttp.send(request);
	}

function $ajax_xml(url,request,callback,sync)
	{
		$ajax_get(url,request,callback,sync,"text/xml");
	}
function $ajax_json(url,request,callback,sync)
	{
		$ajax_get(url,request,callback,sync,"text/javascript");
	}

function $ajax(method,url,request,callback,sync)
	{
		if (!$isobj(request)) request = {};
		var xhttp = new XMLHttpRequest();
		xhttp.open(method.toUpperCase(),url,sync || true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.onreadystatechange = function()
			{
				if (xhttp.readyState == 4 && xhttp.status == 200)
					{
						callback(xhttp.responseText);
					}
			};
		xhttp.send($oj(request));
	}


function keyFilter(myfield, e, restrictionType)
	{
		if (!e) var e = window.event;
		if (e.keyCode) code = e.keyCode;
		else if (e.which) code = e.which;
		var character = String.fromCharCode(code);
		if (code==27)
			{
				this.blur();
				return false;
			}
		if (!e.ctrlKey && code!=9 && code!=8 && code!=36 && code!=37 && code!=38 && (code!=39 || (code==39 && character=="'")) && code!=40)
			{
				if (character.match(restrictionType)) return true;
				return false;
			}
	}

function $cleanTable(table)
	{
		table.rows.$recycle(function(row,i)
			{
				if (!row.cells[0]) table.deleteRow(i);
			});
	}

function px()
	{
		var string = "", arg = arguments.$array();
		arg.$cycle(function(value,i,l)
			{
				string += value + "px";
				if (i < l) string += " ";
			});
		return string;
	}

function pc(value)
	{
		return value + "%";
	}

function $query_string(url,number)
	{
		if (!$isboo(number)) number = true;
		var split_get = url.split(/\?/g);
		if (split_get.length > 1)
			{
				var split = split_get[1].split(/\&/g);
				var values = {};
				for (var i = 0; i < split.length; i++)
					{
						var seperate = split[i].split(/\=/g);
						var valv = (seperate[1] ? seperate[1] : "");
						if (number && $isnum(Number(valv))) valv = valv.$int();
						values[ seperate[0] ] = valv;
					}
				return values;
			}
		else return {};
	}

function $query_string_update(url,query)
	{
		return url.split(/\?/g)[0] + "?" + query.$tostring("=","&");
	}

function $get_return(url)
	{
		var split_get = url.split(/\?/g);
		if (split_get.length > 1)
			{
				var split = split_get[1].split(/\&/g);
				var values = [];
				for (var i = 0; i < split.length; i++)
					{
						values[i] = {};
						var seperate = split[i].split(/\=/g);
						values[i].prop = seperate[0];
						values[i].value = seperate[1] ? seperate[1] : "0";
					}
				return values;
			}
		else return [];
	}

function $get_isset(url,value)
	{
		var get = $get_return(url);
		var result = false;
		get.$cycle(function(get_v,i)
			{
				if (get_v.prop == value)
					{
						result = true;
						return $break;
					}
			});
		return result;
	}
function $get_retreive(value,get)
	{
		var request;
		get.$cycle(function(get_v,i)
			{
				if (get_v.prop == value)
					{
						request = get_v.value;
						return $break;
					}
			});
		return request;
	}

function $get_replace(url,values)
	{
		var get = $get_return(url);
		var newget = [];
		get.$cycle(function(get_v,i)
			{
				var match = -1, find = 0, newentry = "";
				values.$cycle(function(val,j)
					{
							if (val[0].$compare(get_v.prop))
								{
									match = j;
									find++;
								}
					});
				newget[i] = get_v.prop + "=" + ((match >= 0) ? values[match][1] : get_v.value);
			});
		return url.split(/\?/g)[0] + "?" + newget.$string("&");
	}

/* ------------------------------------>
*	>	Tools
* -------------------------------------> */

function $$toggle() { return $storex("ms-toggles",arguments[0],arguments[1],false,$FUNC_GET_OBJECT,$FUNC_SET_OBJECT); }

function joyride_toggles()
    {
        $$toggle({},false);
        $data("toggle-id").$cycle(function(val,i,l)
            {
                if (val)
                    {
                        joyride_toggle_event(val,$$toggle,true);
                        val.$onclick(function(e)
                            {
                                joyride_toggle_event(val,$$toggle,false);
                            });
                    }
            });
        $data("toggle-table").$cycle(function(val,i,l)
            {
                if (val && !val.dataset.toggleId)
                    {
                        joyride_toggle_event(val,$$toggle,true);
                        val.$onclick(function(e)
                            {
                                joyride_toggle_event(val,$$toggle,false);
                            });
                    }
            });
    }

function joyride_toggle_event(value,data_toggle,load)
    {
        var id = value.dataset.toggleId, hasId = $isset(id);
        var save = value.dataset.toggleSave, isSave = $isset(save);
        var table = value.dataset.toggleTable, isTable = $isset(table);
        var targets = $data("toggle-target").$filter(function(tar,i)
            {
                return tar && tar.dataset.toggleTarget && tar.dataset.toggleTarget == id;
            }), hasTargets = targets.length > 0;
        var data = data_toggle();
        var hide = true;
        if (isSave && hasId)
            {
                hide = data[id] ? (load == true ? data[id] == 0 : data[id] == 1) : value.innerHTML == "+";
                data[id] = hide ? 0 : 1;
                data_toggle(data);
            }
        else
            {
                hide = load == true ? value.innerHTML == "+" : value.innerHTML == "-";
            }
        if (hasTargets)
            {
                targets.$cycle(function(tar,i)
                    {
                //        tar.style.display = hide ? "none" : "";
                        if (hide) tar.classList.add("hide");
                        else tar.classList.remove("hide");
                    });
            }
        else if (isTable)
            {
                value.$parent("table").rows.$cycle(function(row,r)
                    {
                //        if (r > 0 && row) row.style.display = hide ? "none" : "";
                        if (r > 0 && row)
                            {
                                if (hide) row.classList.add("hide");
                                else row.classList.remove("hide");
                            }
                    });
            }
        value.innerHTML = hide ? "+" : "-";
    }

function joyride_hrefs()
	{
		$data("href").$cycle(function(item,i,li)
			{
				item.$onclick(function(e)
					{
						window.open(item.dataset.href);
					});
			});
	}

/*


function $build_table(array)
{
  var html = "<table border='1'>";
  var collengths = $matrix(array.length,2);
  array.$cycler(function(v,inc,i,j,l1,l2)
  {
    collengths[i][0] = i;
    collengths[i][1] = l2 + 1;
  });
  collengths.$sort($num_asc,1);
  $log(collengths);
  var maxwidth = collengths.$last()[1];
  $log(maxwidth);
  var colspan = 1;
  array.$cycler(function(v,inc,i,j,l1,l2)
  {
    if (j === 0)
      {
        html += "<tr>";
      }
    if (l2 === 0) colspan = maxwidth;
    else if (j === 0 && maxwidth > l2)
      {
        colspan = maxwidth - l2;
      }
    html += "<td " + (colspan > 1 ? "colspan='" + colspan + "'" : "") + ">" + v + "</td>";

    if (j == l2)
      {
        html += "</tr>";
      }
    colspan = 1;
  });
  html += "</table>";
  return html;
}

*/


/*

var tmp = [];
for (i = 0; i < Numbers.length; i++)
	{
		for (j = 0; j < Numbers.length; j++)
			{

				if (Numbers[j] > Numbers[j+1])
					{
						tmp = Numbers[j];
						Numbers[j] = Numbers[j + 1];
						Numbers[j + 1] = tmp;
					}
			}
	}



*/