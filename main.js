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

		//make the div here
		var newQuo = $('#prototype').clone(true);

		newQuo.find('.quote').text(quo.innerText);
		newQuo.find('.author-link').text(quo.author);
		newQuo.find('.submitted-date').text(quo.submitDate);
		newQuo.attr('id','qid'+quo.qid);

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

	//delete quotes
	var deleteQuote = function () {
		var p = $(this).parent().parent();
		if (p.attr("id") === "prototype") {
			return;
		}

		else {
		p.remove();
		console.log(p);
		};

	};	

	//author quotes
	var authorQuotes = function () {

	};

	//rate the quote
	var rateQuote = function () {

		var clearobj = $(this).siblings(':last')

		for (var i=0;i<5;i++) {
			clearobj.find(".star").attr('src','grey-star.png');
			clearobj = clearobj.prev();
		}

		var counter=$(this).index() + 1;
		var obj = $(this);
		for (var i=0;i<counter;i++) {
			obj.find(".star").attr('src','gold-star.png');
			obj = obj.prev();
		}
		console.log($(this).index());
	};



	$('#input-form').on('click',function(){
			$(this).css('left','-20px');

	});

	$(document).on('submit','#submit-form', submitInfo);
	$(document).on('click','.close-x', deleteQuote);
	$(document).on('click','.author-link', authorQuotes);
	$(document).on('click','.inline-list', rateQuote);
});



