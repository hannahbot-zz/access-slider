// JavaScript Document
// LIS490JG4 Survey Slider Javascript 
// Dennis Hume and Hannah Kim

 $(document).ready( function() {
 	$(".slider").each(function(){ //everytime you find slider, call function
               // Global function for slider


			//KEY CODES (declared globally)
		          var KEY_CODE = {};		          
		          KEY_CODE.PAGEUP   = 33;
		          KEY_CODE.PAGEDOWN = 34;
		          KEY_CODE.END      = 35;
		          KEY_CODE.HOME     = 36;
		          KEY_CODE.LEFT     = 37;
		          KEY_CODE.UP       = 38;
		          KEY_CODE.RIGHT    = 39;
		          KEY_CODE.DOWN     = 40; 		
 		
			var label_descriptions= new Array();
			
			function updateSlider(thumb, value) {
				var label_min = parseInt(thumb.getAttribute('aria-valuemin'));
				for(var i=0; i<label_descriptions.length; i++){
					var label_max = label_descriptions[i].value					
					if ((value >= label_min) && (value<label_max)){
						break;
					}
					label_min = label_max;
				} //end for
				
				thumb.setAttribute('aria-valuetext', value + ' ' + label_descriptions[i].description); 
								   
			thumb.setAttribute('aria-valuenow', value);
			$(thumb).parent().parent().parent().find("td.value").text(value);
			} //end updateSlider function
		          
 
 				//get thumb function
 		       function getStep( thumb ) {
				   //alert("ready");
		            var slider_min = parseInt(thumb.getAttribute("aria-valuemin"));
		            var slider_max = parseInt(thumb.getAttribute("aria-valuemax"));				
                return Math.round((slider_max - slider_min) / 10);
                } // end function getStep

				//move slider function
		       function moveSlider( thumb, amount ) {
		            var slider_min = parseInt(thumb.getAttribute("aria-valuemin"));
		            var slider_max = parseInt(thumb.getAttribute("aria-valuemax"));
		            var slider_now = parseInt(thumb.getAttribute("aria-valuenow"));
		            slider_now = slider_now + parseInt(amount, 10);
		            if( slider_now > slider_max ) {
		               slider_now = slider_max;
		            } // endif
					
		            if( slider_min > slider_now ) {
		               slider_now = slider_min;
		            } // endif

                updateSlider(thumb, slider_now);
				
				//alert($(�.slider�).slider( �thumb� ));

				// Get width of parent
                var slider_width = parseInt($(thumb).parent().width());
                var thumb_width = parseInt($(thumb).width()) + 2;
                var new_pos = Math.round((1000 * (slider_now - slider_min)) / (slider_max - slider_min));
	            new_pos = Math.round((new_pos * (slider_width - thumb_width)) / 1000) 
                $(thumb).css('left', new_pos + 'px')
		        } // end function moveSlider

		         function moveSliderMinValue( thumb ) {
			     	var slider_now = parseInt(thumb.getAttribute("aria-valuemin"));		            
					updateSlider(thumb, slider_now);
				    $(thumb).css('left', '0px')
		         } // end function moveSlider

		         function moveSliderMaxValue( thumb ) {
		            var slider_now = parseInt(thumb.getAttribute("aria-valuemax"));		            
					updateSlider(thumb, slider_now);
					var slider_width = parseInt($(thumb).parent().width());
					var thumb_width = parseInt($(thumb).width()) + 2;
	                var new_pos = Math.round(slider_width - thumb_width); 
		            $(thumb).css('left', new_pos + 'px')
		         } // end function moveSlider
				
				 
				
              
				  var id=$(this).find("span.id").text();
				  var slidermax=parseInt($(this).find("span.max").text()); //find span with class max
		          var slidermin=parseInt($(this).find("span.min").text());
		  	  	  var slidernow=parseInt($(this).find("span.now").text());
		          var gridlines=parseInt($(this).find("span.gridlines").text());
		          var decimals=parseInt($(this).find("span.decimals").text());	  
				  
			      var labels=[];
				  $(this).find("ol.label li").each(function() {
						labels.push($(this).text());									
									} //end function
									); //end each method
					//alert(labels.length);				  
				
				  //questions array
				  var questions=[];
				  $(this).find("ol.question li").each(function() {
						questions.push($(this).text());									
									} //end function
									); //end each method
				 //alert(questions.length);	
				
				
				//intervals array
				var interval = ((slidermax-slidermin)/(gridlines));
				var value = slidermin;
				var intervals=[];
       		    for (var i=0; i<gridlines+1; i++) {
       			    intervals.push(value);
       			    value = value + interval;
        		} //end for
				//alert(intervals);
					
					
				//alert( slidermin + " " + slidermax + " " + slidernow );
				 
				 $(this).html('');
				 makeLabelDescriptions(slidermin,slidermax, labels);
				 makelabels(this, labels);
				 makeintervals(this, intervals);
				 makequestions(this, questions, gridlines, slidermin, slidermax, slidernow, id);
				 makebars(this);
				 addkeyboardsupport(this);
				 addmousesupport(this);
				 //makeintervals(this, intervals);
			  
     			function makeLabelDescriptions(slidermin, slidermax, labels) {
					var len = 2*labels.length-1;
					var j = 0;
					var k = 0;
					var range = (parseInt(slidermax)-parseInt(slidermin))/len;
					var v = range;
					for(var i = 0; i<=len; i++){
						var o = {};
						if(i%2==0){
							o.value=v;
							o.description=labels[j]+' range';
							k=j+1;
						}
						else { 
							o.value=v;
							o.description='between ' + labels[j] + ' and ' + labels[k] + ' range';
							j++;
						} //end if-else
						label_descriptions.push(o);
						v=v+range;
					} //end for
				} //end makeLabelDecriptions
	  
           
				 // makeintervals functions
				 function makeintervals(node, intervals) {
			       var html="";
				   // var sliderwidth
				   html += "<table class='intervals'>";
				   html += "<tr>";
				   html += "<td class='empty'>";
				   html += "</td>";
				   for(var i=0; i<intervals.length; i++) {
				     html += "<td class='interval'>"+"<span>" + intervals[i] + "</span>"+"</td>";
				   } //end for
				   html += "</tr>";
				   html += "</table>";
				   $(node).append(html);
				   $(node).find('table.intervals td.interval').each(
				   function() {
				     var w = Math.round(parseInt($(this).width())/2);
					  //alert(w);
					  $(this).css('left','-'+w+'px');
				    } //end function
				    ); //end method

				    } //end makeintervals function


            	 //labels array.
			     function makequestions(node, questions, gridlines, slidermin, slidermax, slidernow, id) {
                   var html="";
                   var class ="";
                   html += "<table class='questions'>";
                   for(var i=0; i<questions.length; i++) {
                     class = "question";
                     if( i == 0 ) {
                      class += "first";
                    }
				   html += "<tr>";  
				   html += "<td class='" + class + "' id='slider" + id + '_'+ i + "_label'>";  						
                   html += questions[i];
                   html += "  <div class='sliderrow'>";
                   html += "    <div class='thumb'";
                   html += "          role='slider'";
                   html += "          aria-valuemin='"+ slidermin +"'";
                   html += "          aria-valuemax='"+ slidermax +"'";
                   html += "          aria-valuenow='"+ slidernow +"'";
                   html += "           aria-labelledby='slider" + id + '_' + i + "_label'";
                   html += "           tabindex='0'";
                   html += "         >";
                   html += "      &nbsp";
                   html += "    </div>";
                   html += "  </div>";
                   html += "</td>";
 
                   for(var j=0; j<gridlines; j++) {
                     class = "col";
                     if( j == 0 ) {
                     class += " first";
                   }
                            if( j == (gridlines-1) ) {
                              class += " last";                                
                            } // endif
                            html += "<td class='" + class + "'>"+ "</td>";    
                        } //end for
						html += "<td class='value'></td>";
                        html += "</tr>";
                    } //end for
                    html += "</table>";
                    $(node).append(html);
                    //alert(node.className);
                    } //end makelabels function 
                    
				 function makebars (node) {
				   var questionrows = $(node).find('table.questions tr');
				   for( var i = 0; i<questionrows.length; i++){
				   var first = $(questionrows[i]).find('td.first');
				   var last = $(questionrows[i]).find('td.last');
				   var bar = $(questionrows[i]).find('div.sliderrow');
					//alert(Math.round(parseInt($(first).offset().top))+'px');
				   //$("div.sliderrow").css('top:'+Math.round(parseInt($(first).offset().left))+'px');
				   $(bar).css('top',Math.round(parseInt($(last).offset().top))+'px');
				   var sliderwidth = Math.round((parseInt($(last).offset().left) +parseInt('50') - parseInt($(first).offset().left)));
				   $(bar).width(sliderwidth +'px');
				   $(bar).css('left',Math.round(parseInt($(first).offset().left))+'px');
				   adjustlabels(node, sliderwidth);
				   
				  } //end for		   
			      } //end make bars function
			
		
			    function adjustlabels(node, sliderwidth) {
			      $(node).find(".labeldescriptions").width(sliderwidth + 'px');
			    } //end function
			
                //labels array.
                function makelabels(node, labels) {
                  var html="";
                  html += "<table class='labels'>";
                  html += "<thead>";
                  html += "<tr>";
                  html += "<th class='empty' width='200px'>"; //needs to be offset by this amount
                  html += "<div class='WidthStrut' style='width: 200px;'>";
                  html += "</div>";
                  html += "</th>";
                  html += "<th class='LeftBorder'></th>";
                  html += "<th class='labeldescriptions'>";
                  html += "<table class='labeldescriptions'>"; //they use percentages here
                  html += "<tbody>";
                  html += "<tr>";
                  for(var i=0; i<labels.length; i++) {
                    html += "<td class='label' width='" + ((100)/labels.length) + "%'>" + labels[i] + "</td>";
                   } //end for
                   html += "</tr>";
                   html += "</tbody>";
                   html += "</table>";
                   html += "</th>";
                   html += "<th class='rightborder'></th>"; //functions as right border
                   html += "</tr>";
                   html += "<thead>";
                   html += "</table>";
                   $(node).append(html);
                   //alert(node.className);
                     } //end makelabels function




//KEYBOARD SUPPORT

            function addkeyboardsupport(group) {
				$(group).find('div.thumb').keydown( function(event) {
				 // alert(event.keyCode);
                  switch( event.keyCode ) {
                     case KEY_CODE.RIGHT: 
                     case KEY_CODE.UP: 
                         moveSlider( event.target, 1 );
                         event.stopPropagation();
                         event.preventDefault();
                         return false;

                     case KEY_CODE.LEFT: 
                     case KEY_CODE.DOWN: 
                         moveSlider( event.target, -1 );
                         event.stopPropagation();
                         event.preventDefault();
                         return false;

                     case KEY_CODE.PAGEUP: 
                         //var step = parseInt(getStep(event.target));
                         moveSlider( event.target, 10 );
                         event.stopPropagation(); 
                         event.preventDefault();
                         return false;

                     case KEY_CODE.PAGEDOWN: 
                         //var step = -1 * parseInt(getStep(event.target));
                         moveSlider( event.target, -10 );
                         event.stopPropagation();
                         event.preventDefault();
                         return false;

                     case KEY_CODE.HOME: 
                         moveSliderMinValue( event.target);
                         event.stopPropagation();
                         event.preventDefault();
                         return false;

                     case KEY_CODE.END: 
                         moveSliderMaxValue( event.target);
                         event.stopPropagation();
                         event.preventDefault();
                         return false;

                  } // endswitch
            }  // end keydown function
         );  // end keydown event               

             		$('div.thumb').focus( function(event) {             
                 	$(event.target).addClass('hover');
               		} //end focus function
             		); //end focus method

             		$('div.thumb').blur( function(event) {
               		$(event.target).removeClass('hover');
               		} //end blur function
             		); //end blur method
             		
          } //end addkeyboardsupport function 


//MOUSE SUPPORT		          

		function addmousesupport(group){


            var current_slider_node = null;
            var current_thumb_node = null;
            var current_slider_offset = 0;

             $(group).find('div.thumb').bind( 'mousedown', function(event) {
		 		//alert("ready");
                 current_slider_node = $(event.target).parent();
                 current_thumb_node = event.target;
                 current_slider_offset =  event.pageX -  $(event.target).offset().left;

                 $(document).bind( 'mouseup', function sliderMouseUp() {
                      $(document).unbind( 'mouseup', sliderMouseUp );
                      $(current_slider_node).unbind( 'mousemove');

                      current_thumb_node.focus();
                    } //end bind function
                  ); //end bind method

                 $(current_slider_node).bind('mousemove', function(event){
                       var pos = event.pageX -  $(current_slider_node).offset().left - current_slider_offset;
			           if( 0 > pos ) {
                         pos = 0;
                       } // endif
                      
                       var slider_width = $(current_slider_node).width() - $(current_thumb_node).width() - 2;
                       if( pos > slider_width ) {                        
                          pos = slider_width;
                        } // endif

                        var valuenow = Math.round((pos * ( parseInt(current_thumb_node.getAttribute('aria-valuemax')) - parseInt(current_thumb_node.getAttribute('aria-valuemin')))) / slider_width);                    
						
						//alert(pos +' ' + slider_width + ' ' + valuenow);
                        //current_thumb_node.setAttribute('now', valuenow );
                        updateSlider(current_thumb_node, valuenow);
						$(current_thumb_node).css('left', pos );
                      
                        event.stopPropagation();      
                        event.preventDefault();                  

                        return false;

                    }  // end function
                  ); // end mouse move event

                  event.stopPropagation();      
                  event.preventDefault();      
                  return false;

               }  // end mousedown function
              );  // end mousedown event
  		
					
		} //end addmousesupport function	
							   } //end slider function
							   ); //end slider event
            }  // end ready function
            );  // end ready event


