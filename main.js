$(document).ready(function(){

	var totalQuotes = 0;

	quote = function(innerText,author,submitDate,rating,qid){
		this.innerText = innerText;
		this.author = author;
		this.submitDate = submitDate;
		this.rating = rating;
		this.qid = qid;
	};



	var submitInfo = function(e){
		e.preventDefault();
		var quo = new quote();
		quo.innerText = $('#formQuote').val();
		quo.author = $('#formAuthor').val();
		quo.submitDate = niceDate();
		quo.qid=(++totalQuotes);
		// console.log(quo);
		
		//make the div here
		var newQuo = $('#prototype').clone(true);

		newQuo.find('.quote').text(quo.innerText);
		newQuo.find('.author').text(quo.author);
		newQuo.find('.submitted-date').text(quo.submitDate);
		newQuo.attr('id','q'+quo.qid);

		// console.log(newQuo);

		$('#input-form').css('left','-360px');
		$('#input-form').find('#formQuote').val('');
		$('#input-form').find('#formAuthor').val('');
		newQuo.prependTo($("#content"));

	};
	

	var niceDate = function () {
		var d = new Date();
		var arr = d.toString().split(" ");
		var newArr = arr.slice(1,4);
		var newStr = newArr.join(" ");

		return newStr;
	};
		



	$('#input-form').on('click',function(){

			$(this).css('left','-20px');
	});

	$(document).on('submit','#submit-form', submitInfo);

});



