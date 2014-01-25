$(document).on('ready', function(){

	var totalQuotes = 6;

	var quote = function(innerText,author,submitDate,rating,qid){
		this.innerText = innerText;
		this.author = author;
		this.submitDate = submitDate;
		this.rating = rating;
		this.qid = qid;
	};

	var submitInfo = function(e){
		e.preventDefault();
		showAll();
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

	//show all
	var showAll = function () {

		$('#content').find('[id^=qid]').slideDown(750);
		$(this).closest('body').find('.star-container').children().attr('src','grey-star.png')
		$('.filter-box').hide();
	};

	//author quotes
	var authorQuotes = function () {
		var author = $(this).text();
		var authors = $(this).closest('#content').find('[id^=qid]').find('.author-link');	
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
		$('.filter-box').prependTo($("#content")).show(750).css('display','inline');
	};

	//rate the quote
	var rateQuote = function () {
		var counter=$(this).index() + 1;
		$(this).closest('.star-rating').find('.star').attr('src','grey-star.png');
		$(this).closest('[id^=qid]').attr('data-rating','s'+counter);

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

	//this generates a random quote
	var randQuote = function () {
		var randomNumber = Math.floor(Math.random()*totalQuotes+1);

		$('#content').find('[id^=qid]').attr('class','quote-box');
		$('#content').find('#qid-'+randomNumber).attr('class','quote-box active');
		$('#content').find('[id^=qid]').hide();
		$('#content').find('.active').show();

		$('.filter-box').find('.author-filter').text('Random Quote');
		$('.filter-box').prependTo($("#content")).show(750).css('display','inline');
	};

	//thos filters quotes based upon stars
	var filterQuote = function () {
		$('.star-container').children().attr('src','grey-star.png');

		var counter=$(this).index() + 1;
		var obj = $(this);

		for (var i=0;i<counter;i++) {
			obj.attr('src','gold-star.png');
			obj = obj.prev();
		}

		$('#content').find('[id^=qid]').hide();
		$('#content').find('[data-rating="s'+counter+'"]').show();
		$('.filter-box').find('.author-filter').text(counter+' star ratings shown');
		$('.filter-box').prependTo($("#content")).show(750).css('display','inline');
	}

	//delete quotes
	var deleteQuote = function () {
		$(this).closest('[id^=qid]').children().hide();
		$('#confirmation').show().appendTo($(this).closest('[id^=qid]'));
		// p.slideUp(750,function(){ $target.remove(); });
	};

	var deleteConfirm = function () {
		$(this).closest('[id^=qid]').slideUp(750,function(){ 
			$target.remove();
		});
	};

	var undoConfirm = function () {
		$(this).closest('[id^=qid]').children().slideDown(750);
		$(this).closest('[id^=qid]').find('#confirmation').hide();
	};

	//hover stars filter
	var hoverStars = function () {
		var number = $(this).index()+1;
		$(this).closest('.star-container').find('.star-header:lt('+number+')').attr('src','gold-star.png');
	};

	var mouseOut = function () {
		var number = $(this).index();
		$(this).closest('.star-container').find('.star-header:gt('+number+')').attr('src','grey-star.png');
	}
	//hover stars quotes
	var hoverQuoteStars = function () {
		var number = $(this).index()+1;
		$(this).closest('.star-rating').find('.star:lt('+number+')').attr('src','gold-star.png');
	};

	var quoteMouseOut = function () {
		var strCounter = $(this).closest('[id^=qid]').attr('data-rating');
		var counter = parseInt(strCounter.substring(1,2));
		
		for (var i=0;i<counter;i++) {
			obj.find(".star").attr('src','gold-star.png');
			obj = obj.prev();
		}
		console.log(counter);
	}


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
	$(document).on('click','#random-quote', randQuote);
	$(document).on('click','.star-header', filterQuote);
	$(document).on('mouseover','.star-header', hoverStars);
	$(document).on('mouseout','.star-header', mouseOut);

	$(document).on('mouseover','.inline-list', hoverQuoteStars);
	$(document).on('mouseout','.inline-list', quoteMouseOut);
	$(document).on('click','.undo', undoConfirm);
	$(document).on('click','.delete', deleteConfirm);
});



