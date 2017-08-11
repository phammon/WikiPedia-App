$(document).ready(function() {
	$('#forms1').click(function() {
		//store users input when the button is clicked in a variable
		var userInput = $('#forms').val();
		//call checkForm function and store it in variable for comparison
		var check = checkForm(userInput);
		//if the checkForm function comes back true we will run the ajax call, otherwise we will display an error message.
		if(check === true) {
		//calls slide up function to make room for links
		slideUp();
		$.ajax({
			url: 'http://en.wikipedia.org/w/api.php?action=query&format=json&list=search&prop=info&inprop=url&srsearch=' + userInput,
			type: 'GET',
			dataType: 'jsonp',
			success: function(data) {
				var searchLength = data.query.search.length;
				console.log(searchLength);

				//loop through wikipedia articles
				for(var i = 0; i < searchLength; i++) {
					//print titles of articles
					var artTitle = data.query.search[i].title;
					var artSnipp = data.query.search[i].snippet;
					
					//call create list element function
					createList(artTitle, artSnipp);
				}
			}
		}); //end ajax
	} else {
		return false;
	}

	}); //end click function
	
	// functions to use in code above
	});
		function checkForm(userInput) {
			if (userInput === "") {
				alert("Please enter valid text to search wikipedia");
				return false;
			} else {
				return true;
			}
		}
		function slideUp () {
			$('#searchContainer').attr("class", "transition");
			//$('#searchContainer').addClass('.transition');
			$('.listContainer').attr("class", "containerTransition");
		}
		function createList(artTitle, artSnipp) {
			var listCount = document.getElementById("list").getElementsByTagName("li").length;
			
			if (listCount < 10) {
				$("#list").append('<li><a target="_blank" href="https://en.wikipedia.org/wiki/' + artTitle + '">' + artTitle.fontsize(5) + ': ' + '<br/>' + artSnipp + '</a></li>');
			
		   } else {//erase list and create new list with new content
		   		$("#list").empty();
		   		$("#list").append('<li><a href="">' + artTitle.fontsize(5) + ': ' + '<br/>' + artSnipp + '</a></li>');
			
		   }
		}
		function openInNewTab(url) {
  			var win = window.open(url, '_blank');
  			win.focus();
		}
	