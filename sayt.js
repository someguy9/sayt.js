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
			minChars: 2,
			showHeadings: false,
			showImages: true
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
							 	
								var resultsExist = false;
								$.each(data, function(i, section) {
									if (section['data'].length > 0)
									{
										resultsExist = true;
									}
								});
								
								if(!resultsExist) {
								
								
								
								}else{
								 	
								 	$.each(data, function(i, section) {
								 		$.each(section['data'], function (ii, item) {
								 			if(item['title'] != ""){
									 		
									 			var link = (item['url'] != "") ? "<a href='" + item['url'] + "'>" : "<a>";
										 		
									 			output += "<li class='"+options.classPrefix+"result'>" + link;
									 			output += (item['image'] != undefined && options.showImages) ? '<img src="'+item['image']+'" />' : '';
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
								 	
								 	
									/* use keyboard for selecting results */ 
									var current_index = -1,
										$number_list = $('.sayt-box'),
										$options = $number_list.find('.sayt-result'),
										items_total = $options.length;
	
									$options.hover(function() {
										$options.removeClass('selected');
										$(this).addClass('hover selected');
										current_index = $options.index(this);
									}, function() {
										$(this).removeClass('hover selected');
										current_index = -1;
									});
										
									input.bind('keyup', function(e) {
										if (e.which == 40) {
											if (current_index + 1 < items_total) {
												current_index++;
												change_selection();
											}
											input.val(input.val());
											e.preventDefault();
										} else if (e.which == 38) {
											if (current_index > 0) {
												current_index--;
												change_selection();
											}
											input.val(input.val());
											e.preventDefault();
										} else if (e.which == 13) {
											if(!$options.eq(current_index).hasClass('hover') && current_index > -1){
											window.location = $options.eq(current_index).find('a').attr("href");
											e.preventDefault();
											};
										}
									});
									
									function change_selection()
									{
										$options.removeClass('selected');
										$options.removeClass('hover');
										$options.eq(current_index).addClass('selected');
									}
								 	
								 	
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