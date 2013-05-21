/*
 * jQuery Search as you Type plugin
 * Version 0
 * @requires jQuery v1.2.3 or later
 *
 * Website: http://drawne.com
 */
 
(function($) {
	$.fn.sayt	=	function(options) {
	
		//Include default stylesheet, feel free to comment
		$('head').append('<link rel="stylesheet" href="sayt.css" type="text/css" />');
		
		// Define default options
		var defaults = {
			inputId: '%-sayt',
			classPrefix: 'sayt-',
			noResultsText: 'No results.',
			inputWidth: $(this).outerWidth()-2,
			minChars: 2
		};
		
		
		var options = $.extend(defaults, options);
		
		
		options.inputId = options.inputId.replace('%', $(this).attr('id'));
		
		
		var lastQuery = '';
		var data;
		
		
		$(this).attr('autocomplete', 'off');
		$(this).after('<ul class="'+options.classPrefix+'box" id="'+options.inputId+'" style="display: none;"></ul>');
		var input = $(this);
		var boxObj = $('#'+options.inputId);
		
		
		
		//Actual function with keyup
		var timeout = null;
		var currentRequest = null;
		var requestCount = 0;
		input.keyup(function(event) {
		
			//only trigger on keystokes
			if (event.which != 13 && event.which != 9 && event.which != 37 && event.which != 38 && event.which != 39 && event.which != 40){
			
				var query = input.val();
				if(query == "" || query.length < options.minChars){
					//do nothing if min value isn't met
				}else{
				
					currentRequest = $.ajax({
						url: options.src+"?query="+query+"&callback=?",
						crossDomain: true, 
						contentType: "application/json",
						dataType: "jsonp",
						data: {
							jsonp: "callback"
						},
						requestCount: ++requestCount,
					    success: function(data) {
							 if (requestCount !== this.requestCount) return;
							 	
							 	var output = "";
							 	
								var hasData = false;
								$.each(data, function(i, section) {
									if (section['data'].length > 0)
									{
										hasData = true;
									}
								});
								
								if(!hasData){
								
								
								
								}else{
								 	
								 	$.each(data, function(i, section) {
								 		$.each(section['data'], function (ii, item) {
								 			if(item['title'] != ""){
									 		
									 			var link = (item['url'] != "") ? "<a href='" + item['url'] + "'>" : "<a>";
										 		
									 			output += "<li>" + link;
									 			output += item['title'];
									 			output += "</a></li>";
								 			
								 			}
								 			
								 		})
								 	})
								 	
								 	boxObj.html(output);
								
								 	boxObj.css('width', options.inputWidth);
								 	boxObj.css('position', 'absolute');
									boxObj.css('top', input.offset().top+input.outerHeight());
									boxObj.css('left', input.offset().left);
										 	
								 	boxObj.fadeIn(200);
								 	
							 	}
							 	
								return;
					    },
					    error: function(xhr, textStatus, errorThrown) {
						},
							
						beforeSend : function()
							{
								if(currentRequest != null)
								{
									currentRequest.abort()
									//cannont use in a JSONP request
								}
							}
					});	
					
				}
			};
		});
		
		
		input.blur(function() {
			boxObj.fadeOut(0);
		});
		
		
	}
})(jQuery);