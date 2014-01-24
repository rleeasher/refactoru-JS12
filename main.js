$(document).on('ready', function(){

	var totalQuotes = 6;

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

		newQuo.attr('class', 'quote-box');
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
		var p = $(this).closest('[id^=qid]');
		if (p.attr("id") === "prototype") {
			return;
		}

		else {
			p.slideUp(750,function(){ $target.remove(); });
			console.log(p);
		};


	};

	//show all
	var showAll = function () {

		$('#content').find('[id^=qid]').slideDown(750);
		$('.filter-box').hide(750);
		// var authors = $('#content').find('[id^=qid]').find('.author-link');
		// console.log(authors.length);
		// for (var i = 0; i < authors.length; i++) {
		// 	authors.eq([i]).closest('[id^=qid]').show();
		// };

	};

	//author quotes
	var authorQuotes = function () {
		var author = $(this).text();
		var authors = $(this).closest('#content').find('[id^=qid]').find('.author-link');
		console.log(authors);
		console.log(author);	
		for (var i = 0; i < authors.length; i++) {
			console.log(authors[i]);
			if (authors.eq([i]).text() === author) {
				authors.eq([i]).closest('[id^=qid]').slideDown(750);
			}
			else {
				authors.eq([i]).closest('[id^=qid]').slideUp(750);
			};
		};
		$('.filter-box').find('.author-filter').text(author);
		$('.filter-box').show(750).css('display','inline');


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


	//click back on submit quote
	$('.slide-out').on('click',function(){
		if ($(this).parent().css('left') === "-360px") {
			$(this).parent().css('left','-20px');
		}
		else{
			$(this).parent().css('left','-360px');
		}
	});


	//validator
	$('#submit-form').validate({
		rules: {
			formQuote: {
				required: true
			},
			formAuthor: {
				required: true
			}
		}
	});


	$(document).on('submit','#submit-form', submitInfo);
	$(document).on('click','.close-x', deleteQuote);
	$(document).on('click','.author-link', authorQuotes);
	$(document).on('click','.inline-list', rateQuote);
	$(document).on('click','#header-link', showAll);
	$(document).on('click','#close-filter', showAll);
});



