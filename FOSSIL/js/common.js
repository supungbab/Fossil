// daumkakao 프로젝트에서 사용하는 공통 js파일

// select box가 펼쳐져 있을때 selectbox 외 다른 태그 클릭시 selectbox close 처리하기 위한 구문

var resizeSensor;	//	모바일에서 왼쪽메뉴 높이 변경 이벤트 감지 센서

var scrollDragStopEvent = null;

/*	gnb.vm start	*/
function selectMenu(event, nodeId) {
	
	var isOpened = $(".gnb_corp").hasClass("gnb_select");	//	gnb가 열려있었는지 없었는 지 판단하는 구문

	var doAnimation = $(".gnb_corp").attr("doAnimation");	//	애니메이션 동작 중인지 아닌지 확인하기 위한 flag 변수
	
	if(isMobile == CONSTANT_PC && doAnimation == "true") {	// 애니메이션 동작중이라면 애니메이션 해당 함수 동작 x
		return;
	}
	
	// gnb가 열려져 있다면 애니메이션 x gnb가 닫혀져 있다면 animation on
	
	$(".gnb_corp").find("li").removeClass("on");
	$(".gnb_corp").find("ul").removeClass("gnb_select");

	$("#" + nodeId).parent().parent().addClass("gnb_select");
	
	if(isMobile == CONSTANT_PC) {	//	pc버전일 경우에만 애니메이션 동작하도록 수정
		if(!isOpened) {
			$(".gnb_corp").attr("doAnimation", "true");	//	애니메이션이 시작시 flag 변수 설정
			
			var ulTag = $("#" + nodeId).parent().parent();
			ulTag.css("left", 50);
			ulTag.animate({left: 0}, 500, function(){
				$("#" + nodeId).parent().addClass("on");
				var menuItemNode = $("#page" + _menuCode.slice(0,4));	//	현재 선택되어 있는(현재보고 있는 화면 메뉴) 2deeps 메뉴 선택 하는 기능
				menuItemNode.parent().addClass("on");
				
				
				$(".gnb_corp").attr("doAnimation", "false");	//	애니메이션이 정상적으로 종료되었다면 flag 변수 제거
			});
		}
		else {	//	gnb가 열려져 있다면 애니메이션 x
			$("#" + nodeId).parent().addClass("on");
			var menuItemNode = $("#page" + _menuCode.slice(0,4));	//	현재 선택되어 있는(현재보고 있는 화면 메뉴) 2deeps 메뉴 선택 하는 기능
			menuItemNode.parent().addClass("on");
		}
	}
	else {
		$("#" + nodeId).parent().addClass("on");
		var menuItemNode = $("#page" + _menuCode.slice(0,4));	//	현재 선택되어 있는 2deeps 메뉴 선택 하는 기능
		menuItemNode.parent().addClass("on");
		
		//$(".inner_side").height($(".info_side").height());	//	모바일전용 왼쪽메뉴 전체 높이설정하는구문
		$(".inner_side").height(document.documentElement.clientHeight);
		
		
		if($(".inner_side")[0].scrollHeight > $(".inner_side").height()) {	//	모바일화면에서 메뉴 선택후 스크롤이 생겼다면은
			$(".inner_side").addClass("scroll_on");
			//$(".inner_side").width(231);
			//	왼쪽메뉴 scroll_on 시 y축 스크롤 너비(8px) 만큼 width 좌우로 스크롤 되는 현상발생 이를 해결하기 위해서 강제적으로 width 증가
		}
		else {
			$(".inner_side").removeClass("scroll_on");
			//$(".inner_side").width(230);
		}
	}
}
/*	gnb.vm end	*/



function popCwin( url, name, w, h, scroll) {
	var wl = (window.screen.width/2) - ((w/2) + 10);
	var wt = (window.screen.height/2) - ((h/2) + 50);
	var option = "height="+h+",width="+w+",left="+wl+",top="+wt+",screenX="+wl+",screenY="+wt+",scrollbars="+scroll + ", status=yes";
	var commonPopWin = window.open( url, name, option );
	//commonPopWin.focus();
}

//mobile chk(ipad 제외 )
function mobile_check(){
	var mobile_check;
	var UserAgent = navigator.userAgent; 
	if (UserAgent.match(/iPhone|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null){
	  mobile_check = true;
	}else{
	 mobile_check = false;
	}
	return mobile_check;
}

//광고 영상에서 사용. pc만 object 사용 
function objcheck(){
	var objcheck;
	var UserAgent = navigator.userAgent; 
	if (UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null){
	  objcheck = true;
	}else{
	 objcheck = false;
	}

	return objcheck;
}

//부모 tag에 event 못가게 막는 함수
function preventClickEvent(event) {
	event.cancelBubble = true;
	event.returnValue = false;
	
	if(event.stopPropagation) {
		event.stopPropagation();
	}
}


//신규 커스텀 selectbox 생성함수 추가
/*
 *			//필수파라미터 값
 * 			nodeId : "irScheduleYear",	//	div tag id
 *			item : "test",				//	화면에 표시할 item list
 *			selectValue : "2014",		//	현재 화면에 출력 및 설정한 value
 *			onSelectChangeCallbackFunction : function(i, selectNode, value, event) {	//	selectbox 선택시 callback 되는 함수
 *   				alert("test");
 *			}
 * 
 * 			var selectBoxItem = {	//	item list에 삽입되는 item 양식
 *	        	value : "$!{item.year}",
 *	        	text  : "$!{item.year}",
 *			};
 */


/*
<div id="irScheduleYear" class="opt_corp"> <!-- 옵션펼침 opt_open클래스 추가 -->
	<div class="screen_out">년도 선택상자</div>
	<span class="screen_out">선택내용 : $!{selectedYear}</span>
	<a href="javascript:;" class="link_selected">
		<span class="txt_year">$!{selectedYear}</span>
		<span class="ico_corp ico_arrow"></span>
	</a>
	<input type="hidden" value="$!{selectedYear}">
	<div class="screen_out">선택옵션</div>
	<div class="box_opt">
		<ul class="list_opt">
		#foreach($item in $yearList)
			<li><a href="javascript:;" class="link_option" value="$!{item.year}">$!{item.year}</a></li>
		#end
		</ul>
		<!-- 스크롤바 시작 -->
		<div class="scroll_bar">
			<span class="bg_scroll" style="height:20px;"></span> <!-- 디자인스크롤 위치, 사이즈(높이값) 조절 -->
		</div>
		<!-- 스크롤바 끝 -->
	</div>
</div>
*/

$.fn.customSelectBox = function(options) {
	
	if(options.displayValue == undefined) {
		options.displayValue = options.selectValue;
	}
	
	
	$("#" + options.nodeId).addClass("opt_corp");
	
	$("#" + options.nodeId).append(
			'<div class="screen_out">' + (isEnglish == "N" ?  '년도 선택상자' : 'board select box') + '</div>' + 
			'<span class="screen_out">' + (isEnglish == "N" ?  '선택내용' : 'selected') + ' : ' + options.displayValue + '</span>' + 
			'<a href="javascript:;" class="link_selected">' + 
			'	<span class="txt_year">' + options.displayValue + '</span>' + 
			'	<span class="ico_corp ico_arrow"></span>' + 
			'</a>' + 
			'<input type="hidden" value="' + options.selectValue + '">' + 
			'<div class="screen_out select_none">' + (isEnglish == "N" ?  '선택옵션' : 'select option') + '</div>' + 
			'<div class="box_opt">' + 
			'	<ul class="list_opt">' + 
			//	#foreach($item in $yearList)
			//		<li><a href="javascript:;" class="link_option" value="$!{item.year}">$!{item.year}</a></li>
			//	#end
			'	</ul>' + 
			'	<div class="scroll_bar">' + 
			'		<span class="bg_scroll" style="height:20px;"></span>' + 
			'	</div>' + 
			'</div>'
	);
	
	var selectBoxData = options.item;
	
	for(var i = 0 ; i < selectBoxData.length ; i++) {
		var selectBoxItem = selectBoxData[i];
		$("#" + options.nodeId).find(".list_opt").append('<li><a href="javascript:;" class="link_option" value="' + selectBoxItem.value + '">' + selectBoxItem.text + '</a></li>');
	}
	
	setSelectBoxEvent(options.nodeId , options.onSelectChangeCallbackFunction);
	
	//console.log(options);
};


/*
 * 커스텀 셀렉트 박스 값 설정하는 함수
 * 
 * nodeId : 값을변경할 selectboxID
 * changeVlaue : 변경하려고하는 값
 * onChangeCompleteCallback : 셀렉트박스값 변경하고 callback 되는 액현 함수
 * - oldValue : 값을 변경하기전 값
 * - channgeValue : 변경한 값
 * - changeNode : 변경된 값을 가지고 있는 node
 */
function setSelectBoxValue(nodeId , changeValue, onChangeCompleteCallback) {

	var selectBox = $("#" + nodeId);

	var oldValue = selectBox.find("input").val();

	var changeNode = selectBox.find("a.link_option[value='" + changeValue + "']");

	if(changeNode.length == 0) {	//	설정하려고 하는 value에 해당되는 selectboxItem이 없다면은 selectboxItem 리스트에 있는 노드중 최상위에 있는 노드값으로 설정한다.
		changeNode = $(selectBox.find("a.link_option")[0]);
		changeValue = changeNode.attr("value");
	}
	
	selectBox.find("input").val(changeValue);

	selectBox.find("span.screen_out").html((isEnglish == "N" ?  "선택내용" : "selected") + " : " + changeNode.text());
	selectBox.find("span.txt_year").html(changeNode.text());
	
	if(onChangeCompleteCallback) {
		onChangeCompleteCallback(oldValue, changeValue, changeNode);	//	변경하기전 값(oldValeu), 변경된 값(changeValue), 변경된 값을 가지고 있는 node(changeNode)를 callback 함수에 send
	}
}

/*
 * selectbox disable 여부 설정하는 함수
 */
function setSelectBoxDisable(nodeId, mode) {	//	mode : true 값이 전달되면 selectbox disable하기, false 값이 전달되면 selectbox disable 해제
	var selectBoxNode = $("#" + nodeId);

	if(mode) {	//	disable
		selectBoxNode.addClass("opt_disabled");
	}
	else {	//	enable
		selectBoxNode.removeClass("opt_disabled");
	}
}

// PC용 커스텀 셀렉트박스? 클릭이벤트
function setSelectBoxEvent(selectBoxNodeId, onClickCallbackFunction) {
	$("#" + selectBoxNodeId).click(function(event) {
		
		$("div.opt_corp").not("#" + selectBoxNodeId).removeClass("opt_open");	//	커스텀 셀렉트 박스 동작전에 현재 열려있는 모든 커스텀 셀렉트 박스 close(현재 클릭한 node는 제외하고)
		
		var selectBoxNode = $(this);
		
		if(selectBoxNode.hasClass("opt_disabled")) {			//	해당 selectBox가 disable 상태라면은 click 이벤트 강제종료하기
			preventClickEvent(event);
			return;
		}
	
		if(selectBoxNode.hasClass("opt_open")) {
			selectBoxNode.removeClass("opt_open");
		}
		else {
			selectBoxNode.addClass("opt_open");
		}

		
    	/*
    	 * 잠시 start
    	 * 임시로 넣었음 문제 발생시 rollback
    	 */
    	
    	//스크롤바 표시여부 및 스크롤바 높이 설정하는 구문
    	
		if(!$("#" + selectBoxNodeId).attr("isInte")) {	//	최초 커스텀 셀렉트 box 스크롤 표시여부 및 스크롤바 높이가 지정 안되어 있다면 스크롤바 높이 설정
			var selectBoxArea_Height = $("#" + selectBoxNodeId).find("ul").height();
			var scrollArea_Height = $("#" + selectBoxNodeId).find(".scroll_bar").height();
			
			if(selectBoxArea_Height <= scrollArea_Height) {	//	selectBox 출력 영역 높이가 스크롤바 영역 높이 보다 작거나 같을 경우 스크롤바 hide 처리 시키기
				$("#" + selectBoxNodeId).find(".scroll_bar").hide();
				$("#" + selectBoxNodeId).find(".bg_scroll").hide();
				
				//$("#" + selectBoxNodeId).find(".box_opt").height(selectBoxArea_Height);	//	현재 셀렉트박스 아이템 높이가 스크롤영역 높이보다 작을경우 강제로 셀렉트박스 전체 높이 현재 셀렉트박스 아이템 높이 만큼 조절
				
				$("#" + selectBoxNodeId).find(".box_opt").height(selectBoxArea_Height + Number($("#" + selectBoxNodeId).find("ul").css("margin-top").replace("px","")) * 2);	//	현재 셀렉트박스 아이템 높이가 스크롤영역 높이보다 작을경우 강제로 셀렉트박스 전체 높이 현재 셀렉트박스 아이템 높이 만큼 조절
			}
			else {
				var gap_height = selectBoxArea_Height - scrollArea_Height;
				var scrollBar_Height = scrollArea_Height  - gap_height;
				
				$("#" + selectBoxNodeId).find(".bg_scroll").height(scrollBar_Height);
				
				$("#" + selectBoxNodeId).attr("isInte", "Y");
			}
			selectBoxLiNodeHeight = $("#" + selectBoxNodeId).find("li").height();	// selectbox Li 노드 height 가져오기
	    	//list_opt_height = $($(".list_opt").find("li")[$(".list_opt").find("li").length - 1]).position().top + selectBoxLiNodeHeight;
	    	list_opt_height = $($("#" + selectBoxNodeId).find(".list_opt").find("li")[$("#" + selectBoxNodeId).find(".list_opt").find("li").length - 1]).position().top;
		}
		
		//부모 tag에 event 못가게 막는 함수
		preventClickEvent(event);
	});

	// 스크롤바 drag가능한 영역 클릭시 커스텀 스크롤바 닫히지 않도록(body tag에 걸려있는 click 이벤트) 하기위해서 일부로 event cancel하는 구문
	$("#" + selectBoxNodeId).find(".scroll_bar").click(function(event){
		//부모 tag에 event 못가게 막는 함수
		preventClickEvent(event);
	});
	
	$("#" + selectBoxNodeId).find("ul>li").each(function(i, val) {	//	selectboxOption 내에 있는 li 요소들 select 해서 각각요소에 click 이벤트 주기
		$(val).click(function(event){
			preventClickEvent(event);
			
			//선택한 내용의 대체텍스트 변경하는 구문
			
			$("#" + selectBoxNodeId).find("span.screen_out").html( (isEnglish == "N" ?  "선택내용" : "selected") + " : " + $(this).find('a').text());
			
			// 선택한 내용의 display text 변경하는 구문
			$("#" + selectBoxNodeId).find("span.txt_year").html($(this).find('a').text());
			
			// 선택한 내용의 input val 값 변경하는 구문
			$("#" + selectBoxNodeId).find("input").val($(this).find('a').attr("value"));
			
			// selectbox Item 선택했으니 selectbox 다시 close
			$("#" + selectBoxNodeId).removeClass("opt_open");
			
			//event handler 이용해서 각vm에 해당 event send
			if(onClickCallbackFunction) {
				onClickCallbackFunction(i, this, $(this).find('a').attr("value") , event);	//	선택된 li 인텍스, 선택된 value, 선택된 li node, event 를 callback 함수에 send
			}
		});
	});
	
	var selectBoxLiNodeHeight = 0;
	var list_opt_height = 0;

	
	$("#" + selectBoxNodeId).find('.bg_scroll').draggable({
        scroll: false,
        ///grid: [colWidth, slotHeight],//제거?
        axis: "y",
        start: function(ev, ui) {
        	scrollDragStopEvent = null;
        },
        drag: function(ev, ui) {
        	var customSelectBoxContainer = ui.helper.parent().parent().parent();
        	
        	if(ui.position.top < 0) {
        		ui.position.top = 0;
        	}
        	else if(ui.position.top > customSelectBoxContainer.find(".scroll_bar").height() - ui.helper.height()) {
        		ui.position.top = customSelectBoxContainer.find(".scroll_bar").height() - ui.helper.height();
        	}

        	var dragTopPosition = ui.position.top;
        	
        	var scrollBarHeight = customSelectBoxContainer.find(".scroll_bar").height() - ui.helper.height();
        	
        	var y = (list_opt_height - scrollBarHeight) / scrollBarHeight * dragTopPosition * -1;
        	
        	// 임시로 넣었음 문제 발생시 rollback
        	if($("#" + selectBoxNodeId).find("ul").height() - $("#" + selectBoxNodeId).find(".scroll_bar").height() <= $("#" + selectBoxNodeId).find(".scroll_bar").height()) {
        		// 셀렉트박스 영역 높이 - 스크롤바 높이 차가 스크롤바 영역 높이 값보다 작거나 같을 경우
        		// y = dragTopPosition * -1 로 수정
        		y = dragTopPosition * -1;
        	}
        	
        	customSelectBoxContainer.find(".list_opt").css("margin-top", y);
        },
        stop: function(ev, ui) {
        	var scroll_bar = ui.helper.parent();	//	현재 드래그 되고 있는 스크롤의 drag 영역 스크롤 되는 범위 view 획득
        	var leftStartPosition = scroll_bar.offset().left;	//	현재 마우스 up 한 위치를 계산해서 scroll_Bar 범위 안이라면은 scrollDragStopEvent = null 하지만 scroll_Bar 범위 밖이라면 scrollDragStopEvent = ev 설정 해서 body click 이벤트 에서 처리하도록 한다.
        	var leftEndPosition = scroll_bar.offset().left + scroll_bar.width();
        	
        	var topStartPosition = scroll_bar.offset().top;
        	var topEndPosition = scroll_bar.offset().top + scroll_bar.height();
        	
        	var mouseX = ev.pageX;
        	var mouseY = ev.pageY;
        	
        	if(mouseX >= leftStartPosition && mouseX <= leftEndPosition && mouseY >= topStartPosition && topEndPosition) {
            	scrollDragStopEvent = null;
        	}
        	else {
            	scrollDragStopEvent = ev;
        	}
        }
    });
}

//	모바일 selectbox에 초점이 갔을 경우 테두리 영역 굵게 표시해주는 구문
function focusSelectBox(selectBox) {
	$(".opt_m ").removeClass("opt_on");	//	모든 selectBox opt_open 이벤트 제거
	$(selectBox).parent().addClass("opt_on");	//	해당 selectBox에 opt_open 이벤트 추가
}

//	모바일 selectbox에 초점 잃었을 경우 테두리 영역 굵기 해제하는 구문
function blurSelectBox(selectBox) {
	$(selectBox).parent().removeClass("opt_on");	//	해당 selectBox에 opt_open 이벤트 추가
}

//	채용쪽에서 사용되는 함수
function point(num , clickNode) {
	
	$( "tr[id^='pointSub']" ).not("tr[id='pointSub" + num + "']").hide();	//	현재 선택한 node 외에 모든 td hide
	$( "tr[id^='recruit_']" ).not("tr[id='recruit_" + num + "']").removeClass("tr_hover");	//	현재 선택한 node 외에 모든 td hide
	$( "tr[id^='recruit_']" ).not("tr[id='recruit_" + num + "']").hover(
			function(event) {	//	mouseenter
				$(this).addClass("tr_hover");
			},
			function(event) {	//	mouseleave
				$(this).removeClass("tr_hover");
			}
	);	
	
	
	if(document.getElementById('pointSub' + num).style.display == "none") {
		document.getElementById('pointSub' + num).style.display = "";
		$(clickNode).parent().parent().addClass("tr_hover");
		
		$(clickNode).parent().parent().unbind("hover");
	} else {
		document.getElementById('pointSub' + num).style.display = "none";
		$(clickNode).parent().parent().removeClass("tr_hover");
		
		$(clickNode).parent().parent().hover(
				function(event) {	//	mouseenter
					$(this).addClass("tr_hover");
				},
				function(event) {	//	mouseleave
					$(this).removeClass("tr_hover");
				}
		);	
	}
}

//신규 통합법인사이트 개편 관련 함수
function slideView(event) {	//	leftmenu open, close 담당하는 함수
	if($("body").hasClass("gnb_on")) {	//	left menu가 펼쳐져 있다면 left menu close
		var inner_side_width = $(".inner_side").width();
		var clickScreenX = event.pageX;	//	사용자가 클릭한 x 포지션 획득

		//$(event.currentTarget).hasClass("btn_close") 클릭한 버튼이 pc화면에서 왼쪽메뉴 닫기버튼이 아니라면 아래 구문 수행
		if($(event.currentTarget).hasClass("btn_close") == false && 0 < clickScreenX && clickScreenX < inner_side_width) {	//	gnb가 열려있고 클릭한 지점이 gnb 영역 내부라면 모바일 gnb close 못하게 막기
			return;
		}
		
		if(isMobile == CONSTANT_MOBILE) {
			$("body").removeClass("gnb_on");

			$(".info_side").attr("aria-hidden", "true");

			//안드로이드 저 버전대 분기추가 예정
			document.body.style.overflow = "";   
		    document.documentElement.style.overflow = "";  
		    
		    $(".info_side").height(0);	//	모바일 화면에서 menu 종료버튼 클릭시 info_side 영역이 차지하는 높이 때문에 화면 전체에 info_side 에 걸려있는 click 이벤트가 먹히는 현상 발생 위 현상 수정하려고 고의로 메뉴 닫기버튼 클릭시 height 0 으로 변경 메뉴 열때 body scroll 사이즈 만큼 지정
		}
		else {
            $(".info_side").attr("aria-hidden", "true");
			$("body").removeClass("gnb_on");
		}

		
		//$("#player").attr("controls", "controls");
		
		
		preventClickEvent(event);	//	만약 왼쪽메뉴 열린 상태에서 오른쪽 상단 x 버튼 클릭히 상위노드인 info_side 에 event 가지 않게 하기 위해서
	}
	else {	//	left menu가 열려있지 않다면 left menu close
		if(isMobile == CONSTANT_MOBILE) {	//	head.vm에서 최초로 설정한 전역변수
			$(".info_side").height(document.body.scrollHeight);	//	모바일 화면에서 menu 종료버튼 클릭시 info_side 영역이 차지하는 높이 때문에 화면 전체에 info_side 에 걸려있는 click 이벤트가 먹히는 현상 발생 위 현상 수정하려고 고의로 메뉴 닫기버튼 클릭시 height 0 으로 변경 메뉴 열때 body scroll 사이즈 만큼 지정
			
			$(".info_side").attr("aria-hidden", "false");
			
			//안드로이드 저 버전대 분기추가 예정
			document.body.style.overflow = "hidden";   
		    document.documentElement.style.overflow = "hidden";  
		} else {
            $(".info_side").attr("aria-hidden", "false");
        }

		//$("#player").removeAttr("controls");
		
		$("body").addClass("gnb_on");
	}
}

// 사용자가 클릭한 gnb 메뉴와 sub 메뉴 닫는 함수
function closeAllGnbMenu() {
	$(".gnb_corp").find("li").removeClass("on");			//	클릭했던 gnb 메뉴 css 제거
	$(".gnb_corp").find("ul").removeClass("gnb_select");	//	클릭했던 gnb 메뉴 css 제거
	$(".gnb_corp").removeClass("gnb_select");	//	클릭했던 gnb 메뉴 css 제거
}


//	IR	경영정보 공통함수 start
function changeLeftIRSlide(event) {
	$(".btn_menu.btn_prev").hide();
	$(".btn_menu.btn_next").show();
}

function changeRightIRSlide(event) {
	$(".btn_menu.btn_prev").show();
	$(".btn_menu.btn_next").hide();
}

function prevSlide(event) {
	// event가 상위 노드로 전달되지 못하게 막기
	preventClickEvent(event);
	sl.prev();
}

function nextSlide(event) {
	// event가 상위 노드로 전달되지 못하게 막기
	preventClickEvent(event);
	sl.next();
}
//IR	경영정보 공통함수 end


function onSelectIRBox(event, node) {
	var url = $(node).val();

	window.setTimeout(function(){	// ipad 에서 selectbox onchange함수 내에서 alert메세지 출력시 브라우져가 멈춰버리는 현상 발생 이를 해결하기 위해서 setTimeout이용해서 별도의 쓰레드?에서 popup open
		location.href = url;
	}, 200);
}