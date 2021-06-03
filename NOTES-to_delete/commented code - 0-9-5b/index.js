
/*

MAIN CONTROLLER FILE FOR THE BLOODAXE POETRY APP

The following code handles the majority of the data and functions that run the Bloodaxe App user interface. 

This document is submitted to the APR panel to illustrate the nature of the work involed in creating this app and other programming projects in the portfolio. 

Lines that are preceded by two forward slashes or enclosed by a slash and an asterisk are comments, used here to explain the function of code that follows it.

*/




//
// Section 1 - APP VARIABLES - Setting the inital data to feed the user interface
//


// The web address of the online portion of the app. (Currently Peter Hebden's own web hosting for testing purposes - release version will be hosted on the Bloodaxe website)
var source_url = "http://bx.sidestep.me";
// The web address to connect to for the front page news section
var news_photo_source = source_url + "/img/news_photo.jpg";

// The source of the app's content when a web connection is available
var offline_poets_array;
// The online source of app content (this is the preferred source)
var poets_array;
// The online source for all content categories (Updated manually - future versions will synchronise automatically with the Bloodaxe website)
var categories_array;
// The online source for news content (Updated manually - future versions will synchronise automatically with the Bloodaxe website)
var news_array;
// The current connection status of the app
var array_source = "Connecting...";
// The last-used display mode on the app interface (e.g. Front page display, content browsing display, poem reading display, etc.)
var previous_mode;
// The display mode currently being used on the app interface.
var current_mode = "front";

// A list of all potential lines of poetry for the front-page quote generator (populated from the main poets_array data defined above)
quotes_array = [];
// Toggles between "fade" and "switch" to differentiate between the animations needed when two lines are on-screen
quote_switch = "fade";

// These variables are set each time an item in a browsing list is clicked to determine which poem is displayed on the reading display
var selected_id_name = "";
var selected_id_number = 0;
var selected_array_index = 0;
var selected_thing = ""; 

//Variable for controlling the social sharing function (See html2canvas documentation for options)
canvas_options = {}; 

//Soundcloud ID for feeding audio from online
soundcloud_id = "a00ba5d43da1e0be6a98405e062206ef";

// Getting saved theme tags, if any
if (localStorage.my_themes != undefined) {
		my_themes = JSON.parse(localStorage.my_themes);
} else {
		my_themes = [];
};
if (localStorage.my_themes_poets != undefined) {
	my_themes_poets = JSON.parse(localStorage.my_themes_poets);
} else {
	my_themes_poets = {};
};
// Getting saved favourites, if any
if (localStorage.fav_array != undefined) {
    fav_array = JSON.parse(localStorage.fav_array);
} else {
    fav_array = [];
};

//Defining the display options on the poem reading display (More fine controls to be added on the release version)
display_options = {
    "size-small" 	: {
                        "font-size": "0.7em",
                        "line-height": "1.2em"
                    },
    "size-med" 		: {
                        "font-size": "1em",
                        "line-height": "1.5em"
                    },
    "size-large" 	: {
                        "font-size": "2em",
                        "line-height": "2.5em"
                    },
    "font-black" 	: "black",
    "font-white" 	: "white",
    "font-gray" 	: "gray",
    "bg-black" 		: "black",
    "bg-white" 		: "white",
    "bg-paper" 		: "#ffffe6",
    "line-wrapping"	: {
                        "overflow-x": "initial",
                        "white-space": "initial"
                    },
    "line-nowrapping": {
                        "overflow-x": "auto",
                        "white-space": "nowrap"
                    }
};

// Defining alphabet characters for search
alphabet_plus = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

//Handling NULL values in JSON database export
var NULL = 0;






//
// Section 2 - APP FUNCTIONS - Commands triggered by user actions
//


//FUNCTION - CSS Control: Altering the layout of the screen to fit the size of the device
function responsive_display(page) {
	console.log("responsive_display()");
	console.log(window.innerWidth+" x "+window.innerHeight);
	fullWidth = window.innerWidth;
	fullHeight = window.innerHeight;

	// Front page display
	if (page == "front") {
		$("#front-header, #news_panel, #search_panel, #browse_panel, #front-footer, #quote_box").css({
			"height": (fullHeight*0.2)
		});
		$("#search_box").css({
			"margin-top": (fullHeight/50),
			"margin-bottom": (fullHeight/50),
			"height": (fullHeight/50)
		});
		$("#search_button, #browse-front").css({
			"max-width": (fullWidth*0.5)
		});
		$("#news_headline").css({
			"padding-top": (fullHeight/20)
		});
		$("#quote_box p").css({
			"font-size": (fullHeight/50)
		});
		$("#quote_wrapper").css({
			"width": (fullWidth*0.9),
			"margin-left": (fullWidth/20)
		});
	}	
	
	// Poem reading display
	if (page == "read") {
		$("#read-header").css({
			"max-height": (fullHeight*0.4)
		});
		$("#settings_panel").css({
			"max-height": (fullHeight*0.6)
		});
		$("#book-link, #author-link").css({
			"width": (fullHeight*0.8)
		});

		$("#meta-expand").css({
			"height": (fullWidth/10),
			"width": (fullWidth/10)
		});
	}	
};


// Function - retreiving app data (attempt online source and fall back on built-in data if needed)
function get_data() {
	console.log("get_data()");
	// FOR POETS INFO - poet name, poem texts, biographies, etc.
	//Retreive data from offline source
	var jqxhr_off = $.getJSON( "poets_array.json", function() {
		console.log( "jqxhr_off success" );
	})
		.done(function() {
			console.log( "second success" );
			poets_array = jqxhr_off.responseJSON;
			array_source = "Offline";
			connection_update(array_source);
			console.log(poets_array);
		})
		.fail(function() {
			console.log( "error getting offline source - FATAL ERROR");
			array_source = "ERROR";
			connection_update(array_source);
			window.alert("FATAL ERROR: Please exit the app");
		})
		.always(function() {
			console.log( "complete" );

			//Attempt to retreive data from online source
			var jqxhr_on = $.getJSON( "http://bx.sidestep.me/handler.php", function() {
				console.log( "jqxhr_on success" );
			})
				.done(function() {
				console.log( "second success" );
				poets_array = jqxhr_on.responseJSON;
				array_source = "Online";
				connection_update(array_source);
				console.log(poets_array);
				})
				.fail(function() {
				console.log( "Poets info: error getting online source" );
				})
				.always(function() {
					console.log( "complete" );
				});
			
			jqxhr_on.complete(function() {
				console.log( "jqxhr_on second complete" );

				//FOR QUOTE GENERATOR

				//POPULATING QUOTES ARRAY WITH CURRENT CONTENTS OF POETS_ARRAY
				if(quotes_array = []) {	
					for (a in poets_array) {
						if (poets_array[a].poem_text != "") {
							new_obj = {
								"id_number" : poets_array[a].id_number,
								"id_name" : poets_array[a].id_name,
								"first_name" : poets_array[a].first_name,
								"last_name" : poets_array[a].last_name,
								"poem_title" : poets_array[a].poem_title,
								"poem_text" : poets_array[a].poem_text
							}
							quotes_array = quotes_array.concat(new_obj);
						}
					}
				};
				console.log(quotes_array);

				// FUNCTION - Populating the random quote panel on the app front page
				window.populate_box = function(line) {
					console.log("populate_box(line): "+line);

					if (line == "first") {
						$("#quote_wrapper").removeClass("fading");
						
						//Selecting random quote
						function random_quote() {
							//log previous quote
							var old_quote_index;
							if (window.quote_index){
								old_quote_index = window.quote_index;
							}
							//select new quote, keep trying if same as previous
							do {
								window.quote_index = Math.floor(Math.random() * quotes_array.length);
							} while (old_quote_index == window.quote_index);

							window.quoted_poet = quotes_array[quote_index];
							window.quoted_poem = quoted_poet.poem_text;
							$("#debug_author").html(quoted_poet.id_name);

							//generating line 1
							window.quoted_line_1 = quoted_poem.slice((quoted_poem.indexOf("<p")),(quoted_poem.indexOf("</p>")+4));
							//generating line 2
							window.quoted_poem_minus_line_1 = quoted_poem.slice((quoted_poem.indexOf("</p>")+4));
							window.quoted_line_2 = quoted_poem_minus_line_1.slice((quoted_poem_minus_line_1.indexOf("<p")),(quoted_poem_minus_line_1.indexOf("</p>")+4));

							//truncating if necessary (for prose poems and very long lines)
							if (window.quoted_line_1.length > 110) {
								window.quoted_line_1 = window.quoted_line_1.slice(0,110) + "...</p>";
								
								window.quoted_line_2 = "<p>&nbsp;</p>";
							}
						};
						
						//Checking quote is suitable (i.e. doesn't start with a blank line)
						do {
							random_quote()
						} while (
							quoted_line_1 == "&nbsp;" 
						);

						//Displaying quote to screen
						$("#quote_wrapper").append(quoted_line_1);
					}

					if (line == "second") {
						$("#quote_wrapper").append(quoted_line_2);
					}

					console.log($("#quote_wrapper").html());
				};

				//FUNCTION - app listening for animations finishing and deciding which is next
				document.addEventListener("animationend", function(){
					if ( ($("#quote_wrapper > p").length) < 2) {
						//Quote box not full
						console.log("listener printing second line");
						populate_box("second");
					} else {
						//Quote box full
						if (quote_switch == "fade") {
							//fading out old lines
							$("#quote_wrapper").addClass("fading");
							quote_switch = "switch";
							console.log(quote_switch);
						} else {
							//adding new lines
							$("#quote_wrapper").empty();
							quote_switch = "fade";
							console.log(quote_switch);
							console.log("listener printing first line");
							populate_box("first");
						}
		
						
					}
					
				});

				//Running populate_box function on app launch
				populate_box("first");
			});
		});
	
	jqxhr_off.complete(function() {
		console.log( "jqxhr_off second complete" );
	});

	// FOR NEWS RETRIEVAL - attempt to get news item from online source
	var jqxhr_news = $.getJSON( "http://bx.sidestep.me/news_handler.php", function() {
		console.log( "jqxhr_news success" );
	  })
		.done(function() {
		  console.log( "second success" );
		  news_array = jqxhr_news.responseJSON;
		  console.log(news_array);
		  $("#news_panel").removeClass("hidden");
		  $("#news_link").attr("href", news_array[1]);
		  $("#news_photo_container").css({
			  "background-image" : "url("+ news_photo_source +")"
		  });
		  $("#news_headline").html(news_array[0])
		})
		.fail(function() {
		// Hiding news panel if news content is unavailable 
		  console.log( "News info: error getting online source" )
		  $("#news_panel").addClass("hidden");
		})
		.always(function() {
		  	console.log( "complete" );
		});
	   
	  jqxhr_news.complete(function() {
		console.log( "second complete" );
	  });

    //CATEGORIES RETREIVAL
	// THIS NEEDS REPLACING WITH ONLINE VERSION FOR RELEASE VERSION (categories_handler.php) - currently working from the built-in list of categories.
	var jqxhr_cat_on = $.getJSON( "categories_array.json", function() {
		console.log( "jqxhr_cat_on success" );
	})
		.done(function() {
			console.log( "Categories info online source - second success" );
			categories_array = jqxhr_cat_on.responseJSON;
			console.log(categories_array);
			//GENERATING LIST OF CURRENT CATEGORIES
			window.category_names = Object.keys(categories_array[0]);
		})
		.fail(function() {
			console.log( "Categories info: Error getting online source");

			//offline source (Currently just a repeat of the 'online' source)
			var jqxhr_cat_off = $.getJSON( "categories_array.json", function() {
				console.log( "jqxhr_cat_off success" );
			})
				.done(function() {
					console.log( "second success" );
					categories_array = jqxhr_cat_off.responseJSON;
					console.log(categories_array);
					//LIST OF CURRENT CATEGORIES
					window.category_names = Object.keys(categories_array[0]);
				})
				.fail(function() {
					console.log( "error getting offline source - FATAL ERROR");
					window.alert("FATAL ERROR: Please exit the app");
				})
				.always(function() {
					console.log( "complete" );
				});
			
			jqxhr_cat_off.complete(function() {
				console.log( "second complete" );
			});
		})
		.always(function() {
			console.log( "complete" );
		});
	
	jqxhr_cat_on.complete(function() {
		console.log( "second complete" );
	});
};

//FUNCTION - Checking connection of device and re-populating all data from online if necessary
function is_online() {
	console.log("is_online()");

	if (array_source != "Online" && navigator.onLine == true) {
		get_data();
	}

	console.log("Connection: " + navigator.onLine);
	return navigator.onLine;

};

// FUNCTION - updating the connection status display on the app interface
function connection_update(status) {
		console.log("connection_update(status)");

    	$('#connection_status').each(function(){
    		$(this).html("<p>"+status+"</p>");
    	});
    	console.log("Connection status: " + status);
    };

// FUNCTION - Removing articles ('a','the',etc.) from names for alphbetical sorting
function article_remove(x) {
    var x_lower = x.toLowerCase();
    var x_a = x_lower.slice(0,2);
    var x_an = x_lower.slice(0,3);
    var x_the = x_lower.slice(0,4);
    if(x_a == "a " || x_an == "an " || x_the == "the ") {
        return x_lower.slice((x_lower.indexOf(" "))+1);
    } else {
        return x_lower;
    }
}

// FUNCTION - Sorting items (poem titles, poet names, etc) alphabetically
function sort_poets(target_array, method) {
		if (target_array == poets_array || target_array == display_poets) {
			if (method == "poem") {
				target_array.sort(function(a, b){
					var nameA = article_remove(a.poem_title);
					var nameB = article_remove(b.poem_title);
					if (nameA < nameB){ //sort string ascending
						return -1;
					} else {
						if (nameA > nameB){
					 		return 1;
						} else {
					 		return 0; //default return value (no sorting)
						}
					}
				});
			} else {
				target_array.sort(function(a, b){
					var nameA = article_remove(a.last_name); 
					var nameB = article_remove(b.last_name);
					if (nameA < nameB){ //sort string ascending
						return -1;
					} else {
						if (nameA > nameB){
					 		return 1;
						} else {
					 		return 0; //default return value (no sorting)
						}
					}
				});
			}
		} else {
			target_array.sort(function(a, b){
				var nameA = article_remove(a[method]);
				var nameB = article_remove(b[method]);
				if (nameA < nameB){ //sort string ascending
					return -1;
				} else {
					if (nameA > nameB){
				 		return 1;
					} else {
				 		return 0; //default return value (no sorting)
					}
				}
			});
		}
	}

// FUNCTION - Changing the display mode of the app (eg. Front page, poem browsing, poem reading, etc.)
function change_mode(mode) {
	console.log("change_mode(mode)");

	//checking if the display mode has changed when the page is changed
	if (mode != current_mode) {
		previous_mode = current_mode;
	}

	is_online();

	document.removeEventListener("scroll", scrollup_reveal);
	
	// Front page mode
    if (mode == 'front') {
        $('*').removeClass('browse read browse_read');
		$('div#main, div#search, div#header').addClass('front');

		responsive_display("front");
    }
	
	// Content browsing mode
    if (mode == 'browse') {
        $('*').removeClass('front read browse_read');
        $('div#main, div#search, div#header, #top-nav').addClass('browse');
        
        $('#content-list').removeClass('themes-display categories-display search-display az-display');
        $('.display-tab#video, #audio-frame').html("");
		$('#browse h1.ui-title').html(browse_title);
		
		document.addEventListener("scroll", scrollup_reveal);
    }
	
	// Poem reading mode
    if (mode == 'read') {
        $('*').removeClass('front browse browse_read');
        $('#menu, #poem-nav, #poem-display, #poem-meta, .display-tab').addClass('read');
		
		responsive_display("read");

		setTimeout(function(){
			$("#text-frame").scrollTop(0);
		},500);
    }
	
	// Combination 'Browsing while readng' mode
    if (mode == 'browse_read') {
        $('*').removeClass('front browse read');
        $('#menu, #poem-nav, #poem-display, #poem-meta, .display-tab').addClass('browse_read');
        $('div#main, div#search, div#header, #top-nav').addClass('browse');
        
        $('#header, #top-nav, #footer').removeClass('hidden');
        if ($('ul#poem-nav').attr('width') < $('body').attr('width')) {
            $('li#menu img').attr("src", "img/icons/menu_close_left.png");
        } else {
            $('li#menu img').attr("src", "img/icons/menu_close_up.png");
        }
        
        subnav_display();
    }
    current_mode = mode;
    console.log(current_mode);
    console.log(display_settings);
    
    connection_update(array_source);
};

// FUNCTION - Return to home page, collapse all sub-menus
var go_home = function() {
	console.log("go_home()");
    $('.navbar').removeClass('hidden');
    $('.sub-navbar').addClass('hidden');
    $('.navbar li').removeClass('active ui-btn-active');
    $("#video").empty();
    $("#audio-frame").empty();
    
    $('#welcome').removeClass('hidden');
    $('#top-nav').removeClass('browse');
    $('#top-nav').addClass('front');
};

// FUNCTION - Open a top-level menu item, clear everything else
var top_level = function() {
	console.log("top_level()");
    change_mode('browse');
    $('.sub-navbar').addClass('hidden');
    $('.list').addClass('hidden');
    $("#video").empty();
    $("#audio-frame").empty();
    
    $('ul#top-nav li').removeClass('active ui-btn-active');
    $(selected_thing).addClass('active ui-btn-active');
    $('#top-nav').removeClass('front');
    $('#top-nav').addClass('browse');
    
    $('#topnav-dropdown option').each(function() {
        $(this).prop("selected", false);
        console.log($(this).attr('id') + " : " + $(this).prop("selected"));
    });
    
    
};

//FUNCTION - Displaying a list of poems/poets
var list_content = function(display) {
	console.log("list_content()");
	$('#content-list').removeClass('hidden');
	$('#content-list').addClass("az-display");
    $('#content-list').empty();
    $('#content-list').html("<ul id='az_select'></ul>");
    $('#content-list').append(
        "<ul>" +
        (function() {
            //SORTING POETS_ARRAY
            if (display == "poets") {
                sort_poets(poets_array);
            } else {
                sort_poets(poets_array, 'poem');
            }
            //CREATING LIST ELEMENTS IN THE INTERFACE
            var gen_list = "";
            for (i = 0; i < poets_array.length; i++) {
                if (display == "poets") {
                    if (
                        i == 0 //is the first poet in the array
                        ||
                        (
                        i != 0 //is not the first poet in the array
                        &&
                        poets_array[i].last_name[0].toLowerCase() != poets_array[(i-1)].last_name[0].toLowerCase()
                        )
                    ) {
                        //Generating list element for alphabetical selection 
                        $("#az_select").append(
                            "<li class='az_link' id='"+poets_array[i].last_name[0].toLowerCase()+"_link'><p>"
                            + poets_array[i].last_name[0]
                            +"</p>&nbsp;</li>"
							); 
                        //Generating invisible alphabetical section marker
                        gen_list = gen_list.concat(
                            "<li class='alphabet_marker' id='"+ poets_array[i].last_name[0].toLowerCase() +"_marker'>"
                            +"</li>"
                            ) 
					}

					gen_list = gen_list.concat(
						"<li class='ui-btn' id='" + poets_array[i].id_number + "'><a href='#read'>"
						+ "<img class='author_photo' onerror='this.style.display=\"none\"' src='" + source_url + "/img/author_photos/" + poets_array[i].id_name + ".jpg'/>"
						+ "<p>" + poets_array[i].first_name + " " + poets_array[i].last_name + "</p>"
						+ "</a></li><hr id='" + poets_array[i].id_number + "'/>"
					);
                } else {
                    gen_list = gen_list.concat(
                        "<li class='ui-btn' id='" + poets_array[i].id_number + "'><a href='#read'>"
                        + "<p><strong>" + poets_array[i].poem_title + "</strong>"
                        + "<br/><em> by " + poets_array[i].first_name + " " + poets_array[i].last_name + "</em></p>"
                        + "</a></li><hr id='" + poets_array[i].id_number + "'/>"
                    );
                }
            };
            return gen_list;
        })()
        + "</ul>");
};

// FUNCTION - Filtering a list of poets/poems based on search / browsing parameters
var filter_content = function(media) {
	console.log("filter_content()");
    if (media == "video") {
        for (i = 0; i < poets_array.length; i++) {
            if (poets_array[i].video == 0) {
                $('div#content-list ul li#' + poets_array[i].id_number).addClass('hidden');
                $('div#content-list ul hr#' + poets_array[i].id_number).addClass('hidden');
            }
        };
    };
    if (media == "audio") {
        for (i = 0; i < poets_array.length; i++) {
            if (poets_array[i].audio == 0) {
                $('div#content-list ul li#' + poets_array[i].id_number).addClass('hidden');
                $('div#content-list ul hr#' + poets_array[i].id_number).addClass('hidden');
            }
        };
    };
};

// FUNCTION - Revealing/hiding the "back to top" button
var scrollup_reveal = function() {
	console.log("scrollup_reveal()");
	if (window.location.hash == "#browse" && window.scrollY != 0) {
		$("#scrollup_container").removeClass("hidden");
	}
	if (
		(window.location.hash == "#browse" && window.scrollY == 0) ||
		window.location.hash != "#browse"
	) {
		$("#scrollup_container").addClass("hidden");
	}
};

// FUNCTION - Filtering displayed themes in the Themes section
var filter_themes = function(source) {
	console.log("filter_themes()");
    if (source == 'bloodaxe') {
        $('div#themes-list ul li').each(function(){
            if (bloodaxe_themes.indexOf($(this).attr('id')) == -1) {
                $(this).addClass('hidden');
            }
        });
    };
    if (source == 'my') {
        var mythemes_count = 0;
        $('div#themes-list ul li').each(function(){
            if (my_themes.indexOf($(this).attr('id')) == -1) {
                $(this).addClass('hidden');
            } else {
                mythemes_count = mythemes_count + 1;
            }
        });
        if (mythemes_count == 0) {
            $('#themes-list').html(
                "<p class='message'>You haven't tagged any poems with themes yet.</p>"
            );
        }
    };
};

// FUNCTION - Open a poets sub-menu item in the content browsing section
var poets_menu = function() {
	console.log("poets_menu()");
    $("#video").empty();
    $("#audio-frame").empty();
    
    $('#content-list').removeClass('hidden');
    
    $('ul#poets-nav li').removeClass('active ui-btn-active');
    $(selected_thing).addClass('active ui-btn-active');
    
    
};

// FUNCTION - Displaying an item (i.e. a poem with any available video, audio, biographies, etc.) in the poem-reading display 
var display_item = function() {
	console.log("display_item()");
    change_mode('read');
    
    $('.display-tab').addClass('hidden');
	$('#text-audio').removeClass('hidden');
    
    $('#poem-nav li, #poem-nav li a').removeClass('active ui-btn-active');
    $('#text-audio-poem').addClass('active ui-btn-active');
    
    $('#display-title').empty();
    $('#display-title').html(
        "<h1>"
        + poets_array[selected_array_index].poem_title
        + "</h1>"
        + "<h2>"
        + poets_array[selected_array_index].first_name + " " + poets_array[selected_array_index].last_name
        + "</h2>"
    );

    if (fav_array.indexOf(selected_id_number) != -1) {
        $('#favourite img').attr("src", "img/favourites-full-icon-inverted.png");
		$('#favourite').addClass('is_fav');
		console.log("is fav");
    } else {
        $('#favourite img').attr("src", "img/favourites-empty-icon-inverted.png");
		$('#favourite').removeClass('is_fav');
		console.log("not fav");
	};
    
    generate_email();
    generate_tweet();
    
    apply_display_settings();
    
    $("#settings_panel").addClass('hidden');
    $("#settings_button").removeClass('active ui-btn-active');
    
    $('#text-audio').removeClass('hidden');
    $('#text-frame').html( function() {
		
		//Populating translation panel, if present
		translation_panel_html = "";
		if (poets_array[selected_array_index].translated == 1) {
			//Populating translation epigraph, if present
			translation_epigraph_html = "";
			if (
				poets_array[selected_array_index].original_epigraph != null
				&& poets_array[selected_array_index].original_epigraph != "null"
				&& poets_array[selected_array_index].original_epigraph != ""
			) {
				translation_epigraph_html = "<div id='translation-epigraph'>" + poets_array[selected_array_index].original_epigraph + "<br/>&nbsp;</div>" ;
			}
			translation_panel_html = "<div id='translation-panel' class='hidden'>"
			+ "<div style='font-weight:bold;'>" + poets_array[selected_array_index].poem_title + "<br/>&nbsp;</div>"
			+ translation_epigraph_html
			+ poets_array[selected_array_index].original_text 
			+ "</div>";

			//Populating translator by-line
			translator_credit = "<div id='translator-credit'> Translated by "+ poets_array[selected_array_index].translator_first_name + " " + poets_array[selected_array_index].translator_last_name +"</div>"

			$("#translation-nav").removeClass("hidden");
			
		} else {
			$("#translation-nav").addClass("hidden");
			translator_credit = "";
		};

		//Populating poem epigraph, if present
		poem_epigraph_html = "";
		if (
			poets_array[selected_array_index].epigraph_text != null
			&& poets_array[selected_array_index].epigraph_text != "null"
			&& poets_array[selected_array_index].epigraph_text != ""
		) {
			poem_epigraph_html = "<div id='poem-epigraph'>"+ poets_array[selected_array_index].epigraph_text +"<br/>&nbsp;</div>" ;
		}

		//returning final HTML for text-frame in the poem display 
		return translation_panel_html 
		+ "<div id='capture_area'>"
		+ "<div class='hidden' id='intext_title' style='font-weight:bold;'>" + poets_array[selected_array_index].poem_title + "<br/>&nbsp;</div>"
		+ poem_epigraph_html
		+ poets_array[selected_array_index].poem_text
		+ "<div class='hidden' id='intext_byline' style='font-style:italic;'>&nbsp;<br/>" + poets_array[selected_array_index].first_name + " " + poets_array[selected_array_index].last_name + "<br/>&nbsp;</div>"
		+ translator_credit
		+ "<div class='ui-btn' id='book-link'> From the collection <em>" + poets_array[selected_array_index].featured_book_title + "</em>, available from the <a target='_blank' href='" + poets_array[selected_array_index].featured_book_link + "'>Bloodaxe website</a>.</div>"
		+ "</div>" 
	});

    $("#bio").addClass('hidden');
    $("#bio").html(
        "<img style='float:left' class='author_photo' onerror='this.style.display=\"none\"' src='" 
		+ source_url + "/img/author_photos/"
        + poets_array[selected_array_index].id_name + ".jpg'/>" 
        + poets_array[selected_array_index].bio
        + "<div class='ui-btn' id='author-link'><a target='_blank' href='" + poets_array[selected_array_index].author_link + "'> View on Bloodaxe website </a></div>"
    );
	
	//embedding the audio recording of the poem where appropriate
    var soundcloud_track = poets_array[selected_array_index].audio_embed;
    
    $('#audio-frame').addClass('hidden');
    $('#audio-frame').empty();
    if (poets_array[selected_array_index].audio == 1) {
        $('#audio-frame').removeClass('hidden');
        $('#audio-frame').html(
        '<audio controls controlslist="nodownload"><source src="https://api.soundcloud.com/tracks/'
        +soundcloud_track+
        '/stream?client_id='
        +soundcloud_id+
        '">Unable to load audio at this time.</audio>'
        );
    } else {
        $('#audio-frame').addClass('hidden');
    };			
    
    $("#video").addClass('hidden');	
    $("#video").empty();	
    if (poets_array[selected_array_index].video == 1) {
        $("#video-poem").removeClass('hidden');
        if (poets_array[selected_array_index].video_embed.includes("vimeo")) {
                    $('#video').html(
                        "<div id='vimeo_embed'></div>"
                    );
                    var options = {
                        url: poets_array[selected_array_index].video_embed,
                        width: 640,
                        loop: false,
						title: false,
						byline: false,
						portrait: false
                    };
                
                    var player = new Vimeo.Player('vimeo_embed', options);
                    var start_time = parseInt(poets_array[selected_array_index].video_start);
                    var end_time = parseInt(poets_array[selected_array_index].video_end);
					
					if (start_time > 0) {
                        player.setCurrentTime(start_time).then(function(data){
                            player.pause();
                        });
                    }
                    
                    if (end_time > 0) {
                                player.on('timeupdate', function(data) {
                                    if (
                                        data['seconds'] > end_time 
                                        || 
                                        data['seconds'] < start_time
                                    ) {
                                        player.pause();
                                        player.setCurrentTime(start_time);
                                    }
                                });
                    }
                
                    
        } else {
        $('#video').html(
        poets_array[selected_array_index].video_embed
        );
        }
    } else {
        $('#video-poem').addClass('hidden');
    };
    if ($('li#videos-button').hasClass('active ui-btn-active') || ( $('li#video-poets').hasClass('active ui-btn-active') && $('li#poets-button').hasClass('active ui-btn-active') ) ) {
        $('#text-audio').addClass('hidden');
        $("#video").removeClass('hidden');
        $('#poem-nav li, #poem-nav li a').removeClass('active ui-btn-active');
        $('#video-poem').addClass('active ui-btn-active');
    } else {
        
	};

	//adjust poem position for header height 
	jqm_top_padding = $("#read-header").height();
	$("#read").css({"padding-top":jqm_top_padding, "bottom":"0"});
	
	//POPULATE CANVAS WITH DELAY (for creating an image of the poem for sharing on social media and email, etc.)
	//Uses the HTML2Canvas plugin - https://html2canvas.hertzen.com/

	//Delaying html2canvas to give page time to load
	setTimeout(function() {

		//Temporarily altering capture_area to get canvas
		$("#read").height($("#text-frame").height()*1.5)
		$("#text-frame").width("auto");
		$("#capture_area").css({
			"background-color":"white", 
			"color":"black"
		}); //could be taken from current display settings?
		$("#intext_title, #intext_byline").removeClass("hidden");

		html2canvas(document.querySelector("#capture_area"), canvas_options).then(function(canvas) {
			console.log("Populating canvas! (poem changed)");
			$("#canvas_container").empty();
			document.querySelector("#canvas_container").appendChild(canvas);
		});
		
		//Re-setting capture_area
		$("#read").height("auto");
		$("#text-frame").width("98%");
		$("#capture_area").css({
			"background-color":"auto", 
			"color":"auto"
		});
		$("#intext_title, #intext_byline").addClass("hidden");
	}, 2000);

    
};

//FUNCTION - Display the correct sub-nav back button
function subnav_display() {
	console.log("subnav_display()");
    if (selected_thing.hasClass('search_item')) {
        $('#search_results_button').removeClass('hidden');
    };
    
    if (selected_thing.hasClass('categories_item')) {
        $('#categories_results_button').removeClass('hidden');
    };
    
    if (selected_thing.hasClass('themes_item')) {
        $('#themes-nav').addClass('hidden');
        $('#theme_results_button').removeClass('hidden');
    };
    
    if (selected_thing.hasClass('favourites_item')) {
        $('#favourites_results_button').removeClass('hidden');
    };
};

// FUNCTION - Open a poem display menu item
var display_tab = function() {
	console.log("display_tab()");
    $('.display-tab').addClass('hidden');
    $('#poem-nav li, #poem-nav li a').removeClass('active ui-btn-active');
    $(selected_thing).addClass('active ui-btn-active');
    
    
};

// FUNCTION - Display the 'Categories' browsing options
function categories_browser() {
	console.log("categories_browser()");
    $('#categories-list').removeClass('hidden');
    $('#content-list').addClass('categories-display');
    
    //SORTING CATEGORIES
    category_names.sort(function(a, b){
        var nameA = article_remove(a);
        var nameB = article_remove(b);
        if (nameA < nameB){ //sort string ascending
            return -1;
        } else {
            if (nameA > nameB){
                return 1;
            } else {
                return 0; //default return value (no sorting)
            }
        }
    });
    
    //DISPLAYING CATEGORIES
    gen_list = "";
    for (c in category_names) {
        if (category_names[c] != 'id_number') {
            gen_list = gen_list.concat(
                "<input type='radio' name='categories' value='" + category_names[c] + "'>"
                + function(){
                    if (category_names[c][0] == category_names[c][0].toUpperCase()) {
                        return category_names[c];
                    } else {
                        var capitalised = category_names[c][0].toUpperCase();
                        for (k = 1; k < category_names[c].length; k++) {
                            capitalised = capitalised.concat(category_names[c][k]);
                        }
                        return capitalised;
                    }
                }()
                + "<br/>"
            );
        }
    };
    $('#categories-list').html(gen_list);
    $('#categories-list').css({"height" : "16em"});
    $("#content-list").removeClass('hidden');
    $('#content-list').html("<p class='message'>Select a category to view poets.</p>");
};  

// FUNCTION - Display the correct results in the Categories browsing display 
function categories_results_display() {
	console.log("categories_results_display()");
    $('.sub-navbar').addClass('hidden');
    $('#categories-list').removeClass('hidden');
    $('#content-list').removeClass('hidden');
    
    display_poets = [];
    gen_list = "<ul>";
    for (i in categories_array) {
        if (categories_array[i][selected_category] == 1) {
            var n_id = categories_array[i]["id_number"];
            var n_index = $.map(poets_array, function(obj, index) {
                if(obj.id_number == n_id) {
                    return index;
                }
            });
            display_poets = display_poets.concat(poets_array[n_index]);
        }
    };
    sort_poets(display_poets);
    for (p in display_poets) {
        gen_list = gen_list.concat(
            "<li class = 'categories_item ui-btn' id='" + display_poets[p].id_number + "'><a href='#read'>"
            + "<p><strong>" + display_poets[p].first_name + " " + display_poets[p].last_name + "</strong></p>"
            + "<br /><p><em> Featured poem: " + display_poets[p].poem_title + "</em></p>"
            + "</a></li>"
        );
    }	
    if (gen_list == '<ul>') {
        $('#categories-list').css({"height" : "16em"});
        gen_list = "<p class='message'>Sorry, that category is currently empty.</p>";
    } else {
        gen_list = gen_list.concat("</ul>");
    };
    $('#categories-list').css({"height" : "8em"});
    $('#content-list').html(gen_list);
    
};

// FUNCTION - Display the 'Themes' browsing options
function themes_browser() {
	console.log("themes_browser()");
    $('ul#themes-nav li').removeClass('active ui-btn-active');
    $(selected_thing).addClass('active ui-btn-active');
    
    
    themes_list = [];
    active_themes = [];
    bloodaxe_themes = [];
    user_themes = [];
    
    for (poet in poets_array) {
        var add_themes = poets_array[poet].themes.split(",");
        var add_user_themes = poets_array[poet].user_themes.split(",");
        bloodaxe_themes = bloodaxe_themes.concat(add_themes);
        user_themes = user_themes.concat(add_user_themes);
        themes_list = themes_list.concat(add_themes);
        themes_list = themes_list.concat(add_user_themes);	
    };
    
    // FILTERING REPEATED THEMES
    
    var filtered_themes_list = [];
    
    for (var a in themes_list) {
        if(themes_list[a] != "" && filtered_themes_list.indexOf(themes_list[a]) === -1){
            filtered_themes_list.push(themes_list[a]);
        };
    };
    
    //SORTING FILTERED LIST
    themes_list = filtered_themes_list.sort();
    
    //DISPLAYING
    
    $('#themes-list').removeClass('hidden');
    $('#themes-list').empty();
    $('#themes-list').html(
        "<ul>" +
        (function() {
            themes_display = "";
            for (var w = 0; w < themes_list.length; w++) {
                    var list_item = "<li class='ui-btn ui-btn-inline' id='" + themes_list[w] + "'>" + themes_list[w] + "</li>";
                    themes_display = themes_display.concat(list_item);
            };
            return themes_display;
        })()
        +"</ul>"
    );
    $('#content-list').removeClass('hidden');
    $('#content-list').html(
        "<p class='message'>Select a theme or combination of themes to browse poems.</p>"
    );
    
};

// FUNCTION - Searching all app content for a particular search term
function search_cycle(word) {
		console.log("search_cycle(word)");
		while (word[word.length-1] == " ") {
			word = word.slice(0,word.length-1);
		}
		console.log(word);

		//searching Poet last name
		for (i=0; i < poets_array.length; i++) {
			target = (poets_array[i].last_name).toLowerCase();
			if (target.indexOf(word) >= 0) {
				results.push(poets_array[i].id_number);
			}
		};
		//searching Poet first name
		for (i=0; i < poets_array.length; i++) {
			target = (poets_array[i].first_name).toLowerCase();
			if (target.indexOf(word) >= 0) {
				results.push(poets_array[i].id_number);
			}
		};
		//searching Poem title
		for (i=0; i < poets_array.length; i++) {
			target = (poets_array[i].poem_title).toLowerCase();
			if (target.indexOf(word) >= 0) {
				results.push(poets_array[i].id_number);
			}
		};
		//searching main Themes
		for (i=0; i < poets_array.length; i++) {
			target = (poets_array[i].themes).toLowerCase();
			if (target.indexOf(word) >= 0) {
				results.push(poets_array[i].id_number);
			}
		};
		//searching user Themes
		for (i=0; i < poets_array.length; i++) {
			target = (poets_array[i].user_themes).toLowerCase();
			if (target.indexOf(word) >= 0) {
				results.push(poets_array[i].id_number);
			}
		};
		//searching Poet bio
		for (i=0; i < poets_array.length; i++) {
			target = (poets_array[i].bio).toLowerCase();
			if (target.indexOf(word) >= 0) {
				results.push(poets_array[i].id_number);
			}
		};
		//searching Poem text
		for (i=0; i < poets_array.length; i++) {
			target = (poets_array[i].poem_text).toLowerCase();
			if (target.indexOf(word) >= 0) {
				results.push(poets_array[i].id_number);
			}
		};
		
	};
	
	// FUNCTION - Displaying search results in the app interface
	function search_display() {
		console.log("search_display()");
		browse_title = "Search";
		change_mode('browse');
		$('ul.navbar li').removeClass('active ui-btn-active');
		$('.sub-navbar').addClass('hidden');
		$('#categories-list, #themes-list').addClass('hidden');
    	$('#content-list').removeClass('hidden');
    	$('#content-list').addClass('search-display');
		$('#content-list').empty();
		$('#content-list').html(
			"<p><strong><em>Search results for '" + search_term + "':</em></strong></p><br />" +
			"<ul>" +
			(function() {
				var gen_list = "";
				for (i=0; i < filtered_results.length; i++) {
	    			var n_id = filtered_results[i];
	    			var n_index = $.map(poets_array, function(obj, index) {
					    if(obj.id_number == n_id) {
					        return index;
					    }
					});
	    			gen_list = gen_list.concat(
						"<li class = 'search_item ui-btn' id='" + n_id + "'><a href='#read'>"
						+ "<p><strong>" + poets_array[n_index].first_name + " " + poets_array[n_index].last_name + "</strong></p>"
						+ "<br /><p><em> Featured poem: " + poets_array[n_index].poem_title + "</em></p>"
						+ "</a></li><hr />"
					);			
	    		};
	    		if (gen_list == "") {
	    			gen_list = "<li><p class='message'>No search results available.</p></li>";
	    		}
	    		return gen_list;
			})()
			+ "</ul>"		
		);
		$("#search_box").val("");
		
	};

// FUNCTION - Displaying the contents of the 'Favourites' list in the app interface
function favourites_display() {
	console.log("favourites_display()");
    $('.sub-navbar').addClass('hidden');
    $('#content-list').removeClass('hidden');
    $('#content-list').empty();
    // DOESN'T SEEM TO BE DISPLAYING ON WEB VERSION?
    $('#content-list').html(
        "<ul>" +
        (function() {
            var gen_list = "";
            if (fav_array.length <= 0) {
                gen_list = "<p class='message'>Your favourites list is empty.</p>";
            };
            for (i=0; i < fav_array.length; i++) {
                var n_id = fav_array[i];
                var n_index = $.map(poets_array, function(obj, index) {
                    if(obj.id_number == n_id) {
                        return index;
                    }
                });
                gen_list = gen_list.concat(
					"<li class = 'favourites_item ui-btn' id='" + n_id + "'>"
					+ "<div class='favourites_remove'>Remove</div>"
					+"<a href='#read'>"
                    + "<p><strong>" + poets_array[n_index].first_name + " " + poets_array[n_index].last_name + "</strong></p>"
                    + "<br /><p><em> Featured poem: " + poets_array[n_index].poem_title + "</em></p>"
                    + "</a></li><hr />"
                );			
            };
            return gen_list;
        })()
        + "</ul>"			
    );
};

// FUNCTION - Populating content of the sharing email - fires with display_item()
function generate_email() {
	console.log("generate_email()");
	$('#share_email_button').attr('href', function(){
		var email_href = 
			"mailto:?subject=Poetry recommendation from the Bloodaxe Poetry App&body="
			+ "I think you'll love " + poets_array[selected_array_index].first_name + " " + poets_array[selected_array_index].last_name + ". "
			+ "Read and hear their work on the Bloodaxe Books website: " + poets_array[selected_array_index].author_link;
		return email_href;
	});
};

// FUNCTION - Getting Twitter's embed widget
window.twttr = (function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0],
	t = window.twttr || {};
	if (d.getElementById(id)) return t;
	js = d.createElement(s);
	js.id = id;
	js.src = "https://platform.twitter.com/widgets.js";
	fjs.parentNode.insertBefore(js, fjs);
	t._e = [];
	t.ready = function(f) {
	t._e.push(f);
	};
	return t;
}(document, "script", "twitter-wjs"));

// FUNCTION - Populating the sharing Tweet content - fires with display_item()
function generate_tweet() {
	console.log("generate_tweet()");
	$('#share_tweet_button').attr('href', function(){
		var tweet_href = 
			"https://twitter.com/intent/tweet?text="
			+ "I've been enjoying the work of " + poets_array[selected_array_index].first_name + " " + poets_array[selected_array_index].last_name
			+ " on the Bloodaxe Poetry App! "
			+ poets_array[selected_array_index].author_link;
		return tweet_href;
	});
};

// FUNCTION - Applying saved custom display settings
function apply_display_settings() {
	console.log("apply_display_settings");
	console.log("Display options: " + display_options);

	//Linking each display option to the poem display
		//Text size
	if($("#size-small").hasClass("active")) {
		$('#text-frame p, .display-tab#bio p, #book-link').css({
			"font-size": display_options['size-small']['font-size'],
			"line-height": display_options['size-small']['line-height']
		});		
	};
	if($("#size-med").hasClass("active")) {
		$('#text-frame p, .display-tab#bio p, #book-link').css({
			"font-size": display_options['size-med']['font-size'],
			"line-height": display_options['size-med']['line-height']
		});
	};
	if($("#size-large").hasClass("active")) {
		$('#text-frame p, .display-tab#bio p, #book-link').css({
			"font-size": display_options['size-large']['font-size'],
			"line-height": display_options['size-large']['line-height']
		});
	};
	display_settings["font-size"] = $(".size_option.active").attr("id");
	display_settings["line-height"] = $(".size_option.active").attr("id");
		//Text colour
	if($("#font-black").hasClass("active")) {
		$('#text-frame p, .display-tab#bio p, #book-link').css({
			"color": display_options['font-black']
		});
	};
	if($("#font-white").hasClass("active")) {
		$('#text-frame p, .display-tab#bio p, #book-link').css({
			"color": display_options['font-white']
		});
	};
	if($("#font-gray").hasClass("active")) {
		$('#text-frame p, .display-tab#bio p, #book-link').css({
			"color": display_options['font-gray']
		});
	};
	display_settings["color"] = $('.text_colour_option.active').attr("id");
		//Background colour
	if($("#bg-black").hasClass("active")) {
		$('#text-frame, #capture_area, .display-tab#bio, #book-link').css({
			"background-color": display_options['bg-black']
		});
	};
	if($("#bg-white").hasClass("active")) {
		$('#text-frame, #capture_area, .display-tab#bio, #book-link').css({
			"background-color": display_options['bg-white']
		});
	};
	if($("#bg-paper").hasClass("active")) {
		$('#text-frame, #capture_area, .display-tab#bio, #book-link').css({
			"background-color": display_options['bg-paper']
		});
	};
	display_settings["background-color"] = $('.bg_colour_option.active').attr("id");
	//Line wrapping
	if($("#line-wrapping").hasClass("active")) {
		$("#text-frame").css({
			"overflow-x": display_options['line-wrapping']['overflow-x']
		});
		$("#text-frame p").css({
			"white-space": display_options['line-wrapping']['white-space']
		});
	};
	if($("#line-nowrapping").hasClass("active")) {
		$("#text-frame").css({
			"overflow-x": display_options['line-nowrapping']['overflow-x']
		});
		$("#text-frame p").css({
			"white-space": display_options['line-nowrapping']['white-space']
		});
	};
	display_settings["line-wrapping"] = $('.line_option.active').attr("id");
	
	//Committing display changes to localStorage
	localStorage.display_settings = JSON.stringify(display_settings);
	console.log("Settings saved!")
}

// Getting saved display settings, if any
if (localStorage.display_settings != undefined) {
	display_settings = JSON.parse(localStorage.display_settings);
	console.log("Settings loaded!");
	apply_display_settings();
} else {
	display_settings = {
		"font-size": 			$(".size_option.active").attr("id"),
		"line-height": 			$(".size_option.active").attr("id"),
		"color": 				$('.text_colour_option.active').attr("id"),
		"background-color": 	$('.bg_colour_option.active').attr("id"),
		"line-wrapping": 		$('.line_option.active').attr('id')
	};
	apply_display_settings();
};

// FUNCTION - Open the selected header panel in the poem-reading display
function open_meta(option) {
	console.log("open_meta()");
	$(option).toggleClass('active ui-btn-active');
	if($(option).hasClass('active')) {
		$('#poem-meta>a').removeClass('active ui-btn-active');
		$(option).addClass('active ui-btn-active');
		$('#poem-meta').addClass('panel_open');
		$('#settings_panel').addClass('hidden');
		$('#tag_panel').addClass('hidden');
		if (option.is('#settings_button')) {
			$('#settings_panel').removeClass('hidden');
			console.log("open settings panel");
		}
		if (option.is('#tag_button')) {
			$('#tag_panel').removeClass('hidden');
			console.log("open themes panel");
		}
	} else {
		$('#settings_panel').addClass('hidden');
		$('#tag_panel').addClass('hidden');
		$('#poem-meta').removeClass('panel_open');
		console.log("closing panels");
	}
	
};





//
// Section 3 - DISPLAY SET-UP - Functions to attach to the app once the interface has fully loaded
//

//Events to fire when document ready
$(document).ready(function() {
	console.log("$(document).ready()");
    document.addEventListener("deviceready", onDeviceReady, false);
	
	$("body").pagecontainer("change", "#front");
});

//Events to fire when device ready
function onDeviceReady() {
	console.log("onDeviceReady()");
    
	//REDIRECT TO FRONT PAGE IF APP RELOADS
	
	if (
		window.location.hash == "#browse"
		|| window.location.hash == "#read"
		|| window.location.hash == "#front"
	) {
		window.location.hash = "";
	}
	
	// Getting all app data
	get_data();
	
	//Preparing the SoundCloud API for playing audio
	if (navigator.onLine) {
		SC.initialize({
		client_id: soundcloud_id,
		redirect_uri: "CALLBACK_URL"
		});
	};

	//CLICK EVENTS

	//Beta test security - checking the password box for the correct password
	$("#pass-box").on("keyup", function(event){
		if (($("#pass-box").val()).toLowerCase() == "apr2018") {
			$("#the-mask").addClass("hidden");
			responsive_display("front");
		}
	})
	
	//HEADER CLICKS

	// Going to front page when header is clicked
	$('#header h1, #header-home').click(function() {
	    selected_thing = $(this);
	    go_home();
	    change_mode('front');
	});
	
	//Opening the search panel when the search button is clicked
	$('.open_search').click(function(){
		$(this).toggleClass('active ui-btn-active');
		$('#search_panel').toggleClass('hidden');
	});
	
	// TOP-LEVEL NAV CLICKS

	//Going to front page when Home button is clicked
	$(".home-button").click(function(){
		change_mode("front");
	});
	
	//Going to 'Poets' browsing page when Poets button is clicked
	$('#poets-button').click(function() {
		selected_thing = $(this);
	    browse_title = "Poets";
	    top_level();
	    
		$('#poets-nav').removeClass('hidden');
		
		list_content("poets");
		
		$('ul#poets-nav li').removeClass('active ui-btn-active');
		$('#all-poets, #all-poets a').addClass('active ui-btn-active');
		
	});
	
	//Going to 'Poems' browsing page when Poems button is clicked
	$('#poems-button').click(function() {
		selected_thing = $(this);
	   	browse_title = "Poems";
	    top_level();
		
		list_content("poems");
		
	});
	
	//Going to 'Videos' browsing page when Videos button is clicked
	$('#videos-button').click(function() {
		selected_thing = $(this);
	    browse_title = "Videos";
	    top_level();
		
		list_content("poems");
		filter_content("video");
		
	});
	
	//Going to 'Audio' browsing page when Audio button is clicked
	$('#audios-button').click(function() {
		selected_thing = $(this);
	    browse_title = "Audio";
	    top_level();
		
		list_content("poems");
		filter_content("audio");
		
	});
	
	//Going to 'About' page when About button is clicked
	$('#about-button').click(function() {
		selected_thing = $(this);
	    top_level();	    
		
		$('#about').removeClass('hidden');
		
	});
	
	//Going to 'Categories' browsing page when Categories button is clicked
	$('#categories-button').click(function() {
		selected_thing = $(this);
	    browse_title = "Categories";
	    top_level();
	    
	    categories_browser();
	    
	});
	
	//Going to 'Themes' browsing page when Themes button is clicked
	$('#themes-button').click(function() {
		selected_thing = $(this);
	    browse_title = "Themes";
	    top_level();
	    
	    $('#themes-nav').removeClass('hidden');
	    $('#content-list').addClass('themes-display');
	    
	    $('#themes-list, #content-list').removeClass('hidden');
	    
	    themes_browser();
	    
	    $('ul#themes-nav li').removeClass('active ui-btn-active');
		$('#all-themes, #all-themes a').addClass('active ui-btn-active');
		
	});
	
	//Going to 'Favourites' browsing page when Favourites button is clicked
	$('#favourites-button').click(function() {
		selected_thing = $(this);
	    browse_title = "Favourites";
	    top_level();
	    
	    favourites_display();
		
	});
	
	//Changing the browse page based on the selected browse option in the dropdown menu
	$('select#topnav-dropdown').change(function(){
		var selected_option = $(this).children(":selected").attr('id');
		$('#'+selected_option).trigger('click');
	});
	
	
	// POETS SUB-MENU CLICKS
	
	//Displaying an unfiltered list of all poets
	$('#all-poets').click(function() {
		selected_thing = $(this);
		poets_menu();
		
		list_content('poets');
		
	});
	
	//Displaying a list of all poets with audio content
	$('#audio-poets').click(function() {
		selected_thing = $(this);
		poets_menu();
		
		list_content('poets');
		filter_content('audio');
		
	});
	
	//Displaying a list of all poets with video content
	$('#video-poets').click(function() {
		selected_thing = $(this);		
		poets_menu();
		
		list_content('poets');
		filter_content('video');
		
	});


	// THEMES SUB-MENU CLICKS
	
	// Displaying a list of all available themes
	$('#all-themes').click(function() {
		selected_thing = $(this);
		themes_browser();
	});
	
	// Displaying a list of themes added by Bloodaxe Books
	$('#bloodaxe-themes').click(function() {
		selected_thing = $(this);
		themes_browser();
		filter_themes('bloodaxe');
	});
	
	// Displaying a list of themes added by the user
	$('#my-themes').click(function() {
		selected_thing = $(this);
		themes_browser();
		filter_themes('my');
	});
	
	
	// DISPLAY ITEM CLICKS
	
	//Displaying a poem based on selection in the browsing screen
	$('#content-list').on('click','ul li',(function() {
		
		selected_thing = $(this);		
		
		if (selected_thing.hasClass("az_link") == false) {

			selected_id_number = selected_thing.attr("id");		
			selected_array_index = $.map(poets_array, function(obj, index) {
				if(obj.id_number == selected_id_number) {
					return index;
				}
			});
			selected_id_name = poets_array[selected_array_index].id_name;
			
			display_item();
		}

		else {
			//Poet and poem alphabetical browsing
			selected_letter = selected_thing.prop("id")[0];
			
			window.scrollTo(0, $("#"+selected_letter+"_marker").offset().top);
		}
		
	}));

	//Removing a poem from the Favourites list based on clicking the "Remove" button on the browsing display
	$('#content-list').on('click','ul li .favourites_remove',(function() {
		console.log("remove!");
		selected_thing = $(this).parent()

		selected_id_number = selected_thing.attr("id");		
		
		var to_remove = fav_array.indexOf(selected_id_number);
		fav_array.splice(to_remove,1);
		localStorage.fav_array = JSON.stringify(fav_array);

		$(selected_thing).addClass("hidden");
	}));
	
	// Scrolling the browsing screen back to the top of the list when the "Back to top" button is clicked
	$('#scrollup').click(function(){
		window.scrollTo(0, 0);
	});
	
	//Displaying a random poem when the 'Random' button is clicked
	$('#random-front, #random-browse').click(function(){
		selected_thing = $(this);
		
		function random_poet() {
			console.log("random_poet()");
			window.selected_array_index = Math.floor(Math.random() * poets_array.length);
			window.selected_id_number = poets_array[selected_array_index].id_number;
			window.selected_id_name = poets_array[selected_array_index].id_name;
		};

		do {
			random_poet();
		} while(poets_array[selected_array_index].poem_title == "");
		
		change_mode('read');
		display_item();
		
	});
	
	
	// POEM DISPLAY NAV CLICKS

	//Clearing active state on all header buttons when an area outside the header is clicked
	$("#text-frame").click(function(){
		$("#poem-meta a").removeClass("ui-btn-active")
	})

	//Returning to the previous screen when a 'Back' button is clicked
	$(".back-button").click(function(){
		change_mode(previous_mode);
	});
	
	//Toggling the poem-reading display menu when the menu button is clicked
	$('#menu').click(function() {
		if (current_mode == 'read') {
			change_mode('browse_read');
		} else {
			if (current_mode == 'browse_read') {
				change_mode('read');
			};
		}
	});
	
	//Displaying the text of a poem when the 'text' button is clicked
	$('#text-audio-poem').click(function() {
		selected_thing = $(this);
		display_tab();
		
		$('#text-audio').removeClass('hidden');

		$("#read").css({
			"background-color" :
				$("#text-frame").css("background-color")
		})
	});
	
	//Displaying the video of a poem when the 'video' button is clicked
	$('#video-poem').click(function() {
		selected_thing = $(this);
		display_tab();
		
		$('#video').removeClass('hidden');

		$("#read").css({
			"background-color" :
				"black"
		})
		
	});
	
	//Replacing video holding image with the video itself when clicked
	$('#video').on('click','img#play_vid',(function() {
		$('#video').html(
			poets_array[selected_array_index].video_embed
		);
	}));
	
	//Displaying the poet's biography when the 'bio' button is clicked
	$('#bio-poem').click(function() {
		selected_thing = $(this);
		display_tab();
		
		$('#bio').removeClass('hidden');

		$("#read").css({
			"background-color" :
				$("#bio").css("background-color")
		})
	});

    //Basic function for silencing audio/video when navigating away from Read mode
	$('.ui-icon-back').click(function(){
		$('.display-tab#video, #audio-frame').html("");
	});


	//TRANSLATIONS
	
	//Displaying the translated text of a translated poem when the 'translated' button is clicked
	$("#translated_poem").click(function(){
		$("#capture_area").removeClass("hidden");
		$("#translation-panel").addClass("hidden");
	});

	//Displaying the original text of a translated poem when the 'original' button is clicked
	$("#original_poem").click(function(){
		$("#capture_area").addClass("hidden");
		$("#translation-panel").removeClass("hidden");
	});

	
	//CATEGORY SELECTION CLICKS
	
	//Dislaying the poets in a particular category when that category is selected
	$('#categories-list').on('click','input:radio',(function() {
		selected_thing = $(this);
		selected_category = selected_thing.attr('value');
		categories_results_display();
	}));
	
	
	//THEME BUTTON CLICKS
	
    //Displaying poets with particular themes when a theme or combination of themes are selected
	$('#themes-list').on('click','ul li',(function() {
		selected_thing = $(this);
		var selected_theme = selected_thing.html();
		$("#content-list").removeClass('hidden');
		$('#content-list').empty();
		
		//ADDING A THEME FILTER
		if (($(selected_thing).hasClass('active ui-btn-active')) == false) {
			$(selected_thing).addClass('active ui-btn-active');
			active_themes.push(selected_theme);
		}
		
		//REMOVING A THEME FILTER
		else {
			$(selected_thing).removeClass('active ui-btn-active');
			var to_remove = active_themes.indexOf(selected_theme);
			active_themes.splice(to_remove,1);

		};
		
		//COMPILING LIST OF POETS WITH THEMES
		
		poets_with_theme = [];
		
		// NO THEMES SELECTED - DISPLAY NOTHING
		if (active_themes.length == 0) {
			$('#content-list').empty();
		
		} else {
			//POPULATING DISPLAY LIST WITH FIRST SELECTED THEME
			for (p in poets_array) {
				if (poets_array[p].themes.indexOf(active_themes[0]) != -1 || poets_array[p].user_themes.indexOf(active_themes[0]) != -1) {
					poets_with_theme.push(poets_array[p].id_number);
				}
			}
			//FILTERING DISPLAY LIST WITH SUBSEQUENT SELECTED THEMES
			for (t = 1; t < active_themes.length; t++) {
				for (p in poets_array) {
					if (poets_with_theme.indexOf(poets_array[p].id_number) != -1 && (poets_array[p].themes.indexOf(active_themes[t]) === -1 && poets_array[p].user_themes.indexOf(active_themes[t]) === -1)) {
						var to_remove = poets_with_theme.indexOf(poets_array[p].id_number);
						poets_with_theme.splice(to_remove, 1);
					}
				}
			}
			//REMOVING DUPLICATES
			var filtered_id_list = [];
			
			for (var a in poets_with_theme) {
				if(filtered_id_list.indexOf(poets_with_theme[a]) === -1){
					filtered_id_list.push(poets_with_theme[a]);
				};
			};
			poets_with_theme = filtered_id_list;
		}

		
		console.log(active_themes);
		console.log(poets_with_theme);
		
		//DISPLAYING FILTERED THEME RESULTS
		
		theme_results_display();
		
		function theme_results_display() {
			console.log("theme_results_display()");

			//$('.page').addClass('hidden');
			$('.sub-navbar').addClass('hidden');
			$('#themes-nav').removeClass('hidden');
			$('#themes-list').removeClass('hidden');
			$('#content-list').removeClass('hidden');
			
			
			if (poets_with_theme.length <= 0) {
				$('#themes-list').css({"height" : "16em"});
				if (active_themes.length <= 0) {
					$('#content-list').html(
						"<p class='message'>Select a theme or combination of themes to browse poems.</p>"
					);
				} else {
					$('#content-list').html(
						"<p class='message'>Sorry, no poems match that combination of themes.</p>"
					);
				}
			} else {
				$('#themes-list').css({"height" : "8em"});
				$('#content-list').html(
					"<ul>" +
					(function() {
						var gen_list = "";
						for (i=0; i < poets_with_theme.length; i++) {
							
							var n_id = poets_with_theme[i];
			    			var n_index = $.map(poets_array, function(obj, index) {
							    if(obj.id_number == n_id) {
							        return index;
							    }
							});
							
			    			gen_list = gen_list.concat(
								"<li class = 'themes_item ui-btn' id='" + n_id + "'><a href='#read'>"
								+ "<p><strong>" + poets_array[n_index].first_name + " " + poets_array[n_index].last_name + "</strong></p>"
								+ "<br /><p><em> Featured poem: " + poets_array[n_index].poem_title + "</em></p>"
								+ "</a></li><hr />"
							);			
			    		};
			    		return gen_list;
					})()
					+ "</ul>"			
				);
			}
		};
		
		$('#theme_results_button').click( function() {
			theme_results_display();	
		});
	
	}));
	
	
	// USER-TAGGING (Themes)
	
	// Open/Close Add Themes panel on 'Themes' button click
	$('#tag_button').unbind("click").click(function() {
		console.log(this);
		open_meta($(this));
	});

	// Adding a new user-added theme when the 'submit' button is clicked
	$('#tag_submit').click(function(){
		var new_tags = $("#tags_box").val();
		new_tags = new_tags.toLowerCase();
		themes_cleaner = function() {
			while (new_tags[new_tags.length - 1] == " " || new_tags[new_tags.length - 1] == "," || new_tags.indexOf(", ") != -1 || new_tags.indexOf(" ,") != -1 || new_tags.indexOf(",,") != -1) {
				new_tags = new_tags.replace(", ",",");
				new_tags = new_tags.replace(" ,",",");
				new_tags = new_tags.replace(",,",",");
				if (new_tags[new_tags.length - 1] == " " || new_tags[new_tags.length - 1] == ",") {
					new_tags = new_tags.slice(0,-1);
				};
			}
		};
		themes_cleaner();
		$("#tags_box").val("");
		
		//STORING ADDED TAGS LOCALLY
		
		var new_tags_array = new_tags.split(",");
		new_tags = "";
		
		for (t in new_tags_array) {
			if (my_themes.indexOf(new_tags_array[t]) == -1) {
				new_tag = String(new_tags_array[t]);
				my_themes = my_themes.concat(new_tag);

				new_theme_object = {
					[new_tag] : []
				};

				$.extend( my_themes_poets, new_theme_object );
			}
		}
		localStorage.my_themes = JSON.stringify(my_themes);
	
		//ADDING NEW TAGS TO POETS_ARRAY, LOCAL STORAGE AND EXTERNAL DATABASE
		var n_index = $.map(poets_array, function(obj, index) {
			if(obj.id_number == selected_id_number) {
				return index;
			}
		});
		
		for (n in new_tags_array) {
			if (poets_array[n_index].user_themes.indexOf(new_tags_array[n]) == -1 && poets_array[n_index].themes.indexOf(new_tags_array[n]) == -1) {
				if (new_tags == "") {
					new_tags = new_tags.concat(new_tags_array[n]);
				} else {
					new_tags = new_tags.concat("," + new_tags_array[n]);
				};

				if (my_themes_poets[new_tags_array[n]].length == 0) {
					my_themes_poets[new_tags_array[n]] = Array(poets_array[n_index].id_number)
				} else {
					my_themes_poets[new_tags_array[n]] = my_themes_poets[new_tags_array[n]].concat(poets_array[n_index].id_number)
				}
			};
		};
		localStorage.my_themes_poets = JSON.stringify(my_themes_poets);
		
		themes_cleaner();
		if (new_tags != "") {
			if (poets_array[n_index].user_themes == "") {
				poets_array[n_index].user_themes = poets_array[n_index].user_themes.concat(new_tags);
			} else {
				poets_array[n_index].user_themes = poets_array[n_index].user_themes.concat("," + new_tags);
			};
			
			// NOTE - Some more code potentially needed here for connecting to external DB (See previous versions)
			
			console.log(selected_id_number);
			console.log(poets_array[n_index].user_themes);
			
			// NOTE - Some more code potentially needed here for storing themes locally (See previous versions)
			
			//updating remote server
			$.ajax({
				url: "http://bx.sidestep.me/put_handler.php", 
				type: "POST",
				data: {
					id_number: selected_id_number,
					user_themes: poets_array[n_index].user_themes
				}
			});
			
		};
	
	});
	
	
	//
	// SEARCH FUNCTIONS
	//	

	//FUNCTION - search app content using term entered in input box
	function do_search(which_box){
		search_term = ($(which_box).val()).toLowerCase();

		while (search_term[search_term.length-1] == " ") {
			search_term = search_term.slice(0,search_term.length-1);
		}
		
		if (search_term != "") {
			search_words = search_term.split(" ");
			results = [];
			console.log(search_term);
			console.log(search_words);
			
			search_cycle(search_term);
			
			for (var i = 0; i < search_words.length; i++) {
				search_cycle(search_words[i]);			
			};
			
			// FILTERING REPEATED RESULTS
			
			filtered_results = [];
			
			for (var d in results) {
				if(filtered_results.indexOf(results[d]) === -1){
					filtered_results.push(results[d]);
				};
			};
			
			console.log(filtered_results);
			window.location.hash = "#browse";
			search_display();
		}
	}
	
	// Firing a search when the user presses "Enter" in the search box on the front page
	$("#search_box").on("keyup", function(event){
		var pressed = event.which || event.keyCode;
		if (pressed == 13) {
			do_search("#search_box");
		}
	})

	// Firing a search when the user presses the "search" button on the front page
	$("#search_button").click(function(){
		do_search("#search_box");
	});

	// Firing a search when the user presses "Enter" in the search box on the results page
	$("#search_box_2").on("keyup", function(event){
		var pressed = event.which || event.keyCode;
		if (pressed == 13) {
			do_search("#search_box_2");
		}
	});

	// Firing a search when the user presses the "search" button on the results page
	$("#search_button_2").click(function(){
		do_search("#search_box_2");
	});

	//Displaying seach results when the 'search results' button is clicked
	$('#search_results_button').click(function() {
		search_display();
	}); 
	
	$('#browse_button').click(function() {
		go_home();
	});
	

	//
	// FAVOURITES
	//
	
	//Toggling adding/removing a poem from the Favourites list when the Favourites button is clicked
	$("#favourite").unbind("click").on( "click", function() {
		console.log("fav click!");
		if ($("#favourite img").attr("src") == "img/favourites-empty-icon-inverted.png" || $('#favourite').hasClass('is_fav') == false) {
			$("#favourite img").attr("src", "img/favourites-full-icon-inverted.png");
			//$('#favourite').html("Remove from Favourites");
			$('#favourite').addClass('is_fav');
			if (fav_array.indexOf(selected_id_number) == -1) {
				fav_array = fav_array.concat(selected_id_number);
			}
		} else {
			$("#favourite img").attr("src", "img/favourites-empty-icon-inverted.png");
			//$('#favourite').html("Add to Favourites");
			$('#favourite').removeClass('is_fav');
			if (fav_array.indexOf(selected_id_number) != -1) {
				var to_remove = fav_array.indexOf(selected_id_number);
				fav_array.splice(to_remove,1);
			}
		}
		localStorage.fav_array = JSON.stringify(fav_array);
	});
	
	//Displaying favourites list when the 'display favourites' button is clicked
	$('#favourites_results_button').click( function() {
			favourites_display();	
		});
	
	
	//
	// SHARING
	//
	
	//FACEBOOK

	//Sharing a poem to Facebook
	$('#share_facebook_button').click(function() {
		
		FB.ui({
		  method: 'share_open_graph',
		  action_type: 'og.likes',
		  action_properties: JSON.stringify({
		    object: poets_array[selected_array_index].author_link,
		  })
		}, function(response){
		  // Debug response (optional)
		  console.log(response);
		});
		
	});


	//
	// SETTINGS DISPLAY CONTROL
	//

	// Opening and closing the header on the poem-reading display
	$(".meta-toggle").unbind("click").click(function(){
		console.log("meta-toggle click!");
		
		if ($(this).is("#meta-collapse")){
			$('#settings_panel').addClass('hidden');
			$('#tag_panel').addClass('hidden');
			$('#poem-meta').removeClass('panel_open');
			console.log("closing panels");

			jqm_top_padding = $("#read-header").height();
			$("#read").css({"padding-top":"0", "bottom":"0"});
			$("#bio").css({"padding-top":"10%"});			
		} else {
			$("#read").css({"padding-top": jqm_top_padding, "bottom":""});
			$("#bio").css({"padding-top":"0"});
		}
		
		$("#intext_title, #intext_byline, #read-header, #meta-expand").toggleClass("hidden");

	});

	// Open/Close Settings panel when the 'Display options' button is clicked
	$('#settings_button').unbind("click").click(function() {
		console.log(this);
		open_meta($(this));
	});
	
	//Highlighting the currently selected display options when clicked
	$('.settings_option').click(function() {
		
		console.log("Click!");
		console.log(display_options);

		//Selecting active setting for each option
		if($(this).hasClass("size_option")) {
			$(".size_option").removeClass('active ui-btn-active');
			$(this).addClass('active ui-btn-active');
		};
		if($(this).hasClass("text_colour_option")) {
			$(".text_colour_option").removeClass('active ui-btn-active');
			$(this).addClass('active ui-btn-active');
		};
		if($(this).hasClass("bg_colour_option")) {
			$(".bg_colour_option").removeClass('active ui-btn-active');
			$(this).addClass('active ui-btn-active');
		};
		if($(this).hasClass("line_option")) {
			$(".line_option").removeClass('active ui-btn-active');
			$(this).addClass('active ui-btn-active');
		};
		
		apply_display_settings();

	});

	//
	// DEBUG - These click functions relate to the testing phase of the app
	//

	$('div.debug p').click(function() {
		$('span.debug').toggleClass('hidden');
	});

	$('#clear_fav').click(function() {
		fav_array = []; 
		delete localStorage.fav_array;
		console.log("Favourites cleared: " + localStorage.fav_array);
	});

	$('#clear_display').click(function() {
		display_settings = {};
		delete localStorage.display_settings;
		console.log("Display settings cleared: " + localStorage.display_settings);
	});

	$('#clear_themes').click(function() {
		my_themes = [];
		my_themes_poets = [];
		delete localStorage.my_themes;
		delete localStorage.my_themes_poets;
		console.log("Added themes cleared: " + localStorage.my_themes);
	});

	$('#show_localstorage').click(function() {
		console.log("Favourites UI array (fav_array): " + fav_array);
		console.log("Favourites stored array (localStorage.fav_array): " + localStorage.fav_array);
		console.log("Display settings UI array (display_settings): " + display_settings);
		console.log("Display settings stored array (localStorage.display_settings): " + localStorage.display_settings);
		console.log("My themes UI array (my_themes): " + my_themes);
		console.log(my_themes_poets);
		console.log("My themes stored array (localStorage.my_themes): " + localStorage.my_themes);
		console.log(localStorage.my_themes_poets);
	});

	
	//
	// QUOTES GENERATOR FOR FRONT PAGE
	//

	// Populating the list of available quotes
	for (a in poets_array) {
		if (poets_array[a].poem_text != "") {
			new_obj = {
				"id_number" : poets_array[a].id_number,
				"id_name" : poets_array[a].id_name,
				"first_name" : poets_array[a].first_name,
				"last_name" : poets_array[a].last_name,
				"poem_title" : poets_array[a].poem_title,
				"poem_text" : poets_array[a].poem_text
			}
			quotes_array = quotes_array.concat(new_obj);
		}
	};

	//CLICK EVENTS

	//Displaying the poem currently being shown in the front page quote window when clicked
	$("#quote_link").click(function(){
		selected_thing = $(this);

		selected_array_index = $.map(poets_array, function(obj, index) {
			if(obj.id_number == quoted_poet.id_number) {
				return index;
			}
		});
		selected_id_number = quoted_poet.id_number;
		selected_id_name = quoted_poet.id_name;

		display_item();
	});

}


//
// CORDOVA EVENT FUNCTIONS
//

function onPause() {
    // Handle the pause event
}

function onResume() {
    // Handle the resume event
}

function onBackKeyDown() {
    // Handle the back button
}


var app = {
    // Application Constructor
    initialize: function() {
		console.log("app.initialize()");
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
		console.log("app.onDeviceReady()");

        //FUNCTION FOR CONVERTING CANVAS TO IMAGE 
        function generate_image() {
			console.log("generate_image v.1");

            the_canvas = document.querySelector("#canvas_container canvas");
            
            //INITIAL POEM IMAGE (SAVED TO DATA)
            poem_img = the_canvas.toDataURL("image/png");
            //HIDDEN IMG DISPLAY
			$("#result").html("<img src='"+poem_img+"' />");
            //DEBUG IMG URL DISPLAY
			$("#image_display").html("<a href='"+poem_img+"'>"+poem_img+"</a>");
			console.log(poem_img);
        };

        //DEBUG APP FILEPATH DISPLAY
		$("#URL_display").html(window.location.href);
		

		//CSS CONTROL FOR LAUNCH
		responsive_display("front");

		//CSS CONTROL LISTENER
		$(window).resize(function(){
			responsive_display();
		});

		
        //CLICK EVENTS

        $("#debug_button").click(function(){
            $("#footer_1").css("display", "none");
            $("#footer_2").css("display", "none");
            $("#footer_3").css("display", "inline");
        });

        $("#debug_back").click(function(){
            $("#footer_3").css("display", "none");
            $("#footer_1").css("display", "inline");
        });
		
		
        $("#share_button").click(function(){
			console.log("share button click v.1");
            generate_image();

            //SocialShare plugin

			selected_poet = poets_array[selected_array_index];

            var options = {
                message: "I've been enjoying the work of "+poets_array[selected_array_index].first_name+" "+poets_array[selected_array_index].last_name+" on the Bloodaxe Poetry App.", // not supported on some apps (Facebook, Instagram)
                subject: poets_array[selected_array_index].first_name+" "+poets_array[selected_array_index].last_name+" on the Bloodaxe Poetry App", // fi. for email
                files: [poem_img], // an array of filenames either locally or remotely
                //url: test_author_link,
                chooserTitle: 'Share using...' // Android only, you can override the default share sheet title
            }

            var onSuccess = function(result) {
                console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
                console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
            }

            var onError = function(msg) {
                console.log("Sharing failed with message: " + msg);
            }

            window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError); 

        });

    },
};





//Initialise the app when opened on the device
app.initialize();

        

