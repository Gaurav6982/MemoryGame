var cards=document.querySelectorAll('.memory-card');
var start=new Date();
var hasflippedcard=false;
var firstcard,secondcard;
var lock=false;
var score=0;

function flipcard(){
	if(lock) return;
	if(this===firstcard) return;
this.classList.add('flip');
	
	if(!hasflippedcard){
		hasflippedcard=true;
		firstcard=this;
	}
	else{

		
		secondcard=this;

		var isMatch=firstcard.dataset.name===secondcard.dataset.name;
		
		isMatch?disablecard():unflipcard();

	}


};

(function shuffle(){
	
	cards.forEach(card=>{
		var random=Math.floor(Math.random()*12);
		card.style.order=random;

	});

})();
function disablecard(){
	firstcard.removeEventListener('click',flipcard);
			secondcard.removeEventListener('click',flipcard);
			score++;
			if(score==6) end();
			resetboard();
};
function end(){
	document.querySelector('.memory-game').style.display="none";
	document.querySelector('.score').style.display="block";
	var end=new Date();
	var dif=Math.floor((end-start)/1000);
	document.querySelector('.text').innerHTML="You Completed in "+dif+" seconds";
};
function unflipcard(){
	lock=true;
	setTimeout(function(){
				
				firstcard.classList.remove('flip');
				secondcard.classList.remove('flip');
				resetboard();

			},1000);
};

function resetboard(){
	[hasflippedcard,lock]=[false,false];
	[firstcard,secondcard]=[null,null];
};
cards.forEach(card=>card.addEventListener('click',flipcard));