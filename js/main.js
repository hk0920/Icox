/*main.js*/

var $devWidth; //변수 : var 빈그릇
var $limitsize=768; // = :대입연산자 , 같다라는 뜻이 아니다.
					// 768(태블릿크기)을 limitsize라는 변수에 대입한다.라는 뜻 , 768이 들어있는 그릇

$(document).ready(function(){ //문서의 모든것을 읽고 시작해라! js는 꼭 제일 먼저 들어가야 된다.
	
	$(window).resize(function(){ //window창이 줄어들고 늘어날때 마다 body사이즈를 지정해준다.
		$devWidth = $("body").width();
		//console.log($devWidth); //console.log :가로값을 알기 위해서 변수 안에 있는 것을 찍어주겠다. 

	});
	
	/*전체메뉴*/
	$("div.allmenu_view").click(function(){//div는 상관없다.a 와 다른 경우
		$(".allmenu_view").hide(10,function(){ //콜백함수 : 앞에 있는 애가 실행된 후에 바로 이어서 실행되는 아이
			$(".allMenu_box").slideDown("slow");
		});
		
	});
	
	$("a.all_close").click(function(e){//a같은경우에는 기본동작 클릭을 없애고 처음부터 js로 적용되게해야한다.
		e.preventDefault();
		//<a>요소의 기본값 동작으로 새 페이지가 열리는 것을 방지 : e.preventDefault();
		$(".allMenu_box").slideUp("slow",function(){
			$(".allmenu_view").show(10);
		});
	
	});

	/*주메뉴*/
	$(".gnb > ul > li > a").bind("mouseover focus",function(){
		if($devWidth < $limitsize){
			return false;  //return false : 함수 실행 중지하라 / 약속어 함수 실행하지 않고 빠져나와라
			}
		// if(조건문){조건이 참일 경우에만 실행;}
		$(".gnb > ul > li > ul").hide();
		$(this).next().show();
		
		$(".gnb > ul > li > a").css({"height":"29px","background":"none"});
		$(this).css({"height":"32px","background":"url(images/over_icon.gif) no-repeat 50% 100%"});//index에 꽃아줬기때문에 경로가 바뀜

		
	});

	
	$(".gnb").bind("mouseleave blur",function(){//mouseleave : 하위 내용까지 없앨경우
		if($devWidth < $limitsize){
			return false;
			}

		$(".gnb > ul > li > ul").slideUp("slow");
		$(".gnb > ul > li > a").css({"background":"none","height":"29px"});
	});


	/*탭메뉴*/
	$(".content2 > section > h2 > a").click(function(e){
		e.preventDefault();
		
		$(".content2 > section > div").hide();
		$(this).parent().next().show();
		



		//.each : 모든 이미지를 각각 바꾸는것 
		$(".content2 > section > h2 img").each(function(){
			$(this).attr("src",$(this).attr("src").replace("_over.gif",".gif"));
		});
			
		//attr : attribute 속성
		$(this).children().attr("src",$(this).children().attr("src").replace(".gif","_over.gif")); //replace : 글씨만 바꿀 수 있는 것
		// replace를 쓰려면 바꿀 아이와 속성을 replace 앞에 다시 한번 더 써준다.******이중으로 써줘야 적용이 가능하다.******
	});



//내가푼것
//	$(".content2 > section:first-child > h2 > a").bind("click focus",function(){
//		$(".item1").show(10,function(){
//			$(".item2").hide();
			
//		});

//	});

	


//	$(".content2 > section:last-child > h2 > a").bind("click focus",function(){
//		$(".item2").show(10,function(){
//			$(".item1").hide();
//		});

//	});

	
	
	/*배너*/
	//배너는 몇번째 배너인지 알아야 한다! 이유는 순서가 중요하기때문에 넘어가는 것때문에?
	var $bnnNum=0; //몇번째 배너인지 따지기 위해서 만든 변수
					//배너1: $bnnNum=0,배너2: $bnnNum=1

	$(".next").click(function(){
		if($bnnNum >=1){return false;}
		
		$bnnNum++; //1씩 증가  현재 배너가 몇번째냐를 알 수 있는 것 
		
		$book_w=$("body > section").width();//section값을 변수로 만든것
		$("div.book_frame").animate({left:-$book_w*$bnnNum},300,function(){;//변수 이름에는 ""을 안붙인다. ""는 문자에만 붙이는 것
			$(".book_roll img").attr("src","images/state_out.png");
			$(".book_roll img").eq($bnnNum).attr("src","images/state_over.png");
		})

	});

	$(".prev").click(function(){
		if($bnnNum <=0){return false;}

		$bnnNum--;//1씩 감소

		$book_w=$("body > section").width();
		$("div.book_frame").animate({left:-$book_w*$bnnNum},300,function(){
			$(".book_roll img").attr("src","images/state_out.png");
			$(".book_roll img").eq($bnnNum).attr("src","images/state_over.png");//eq : 몇번째
		});
	});

	/*http://jquerymobile.com   : 현재 jquery는 모바일에 적용이 안되서 이 사이트에 들어가서 해야됨*/
	
		
	//모바일 기기의 방향을 전환(가로/세로) 할 때 화면의 너비가 
	//달라지는 것에 대비해서 항상 바른 위치에 있도록 애니메이션 적용
	$("body > section").bind("orientationchange",function(e){
		$book_w=$("body > section").width();
		$("div.book_frame").animate({left:-$book_w*$bnnNum},300);
	});
	

	//모바일에서 
	$("body > section").bind("swipeleft",function(){ //swipe : 모바일에서 손으로 미는 효과
		$(".next").trigger("click");
		//triggle() :클릭한것처럼 강제로 이벤트발생 
		//next를 클릭했을때 처럼 같아져라
	});


	$("body > section").bind("swiperight",function(){
		$(".prev").trigger("click");
	});





});