
			var on=1;
			
			function sh(x){
				$('#'+x).toggle(800);
			}
			
			function x(){
				if($(window).width()>=1610){
					$('.main').css('width', '1300');
					$('.left').css('width', '66.5%');
					$('.right').css('width', '33.5%');
					$('.m3').css('width', '100%');
					$('.main_img').css('width', '880');
					
					$('.side').css('display','block');
					$('.sideall').css('width','310px');
					$('.main').css('margin-left','310px');
					$('#togo').css('display','none');
					
				}
				if($(window).width()<=1610&&$(window).width()>=1200){  //1610은 310+1300 즉 사이드 값과 메인값 1324는 메인 값이 줄었을 때 1026(684+(684/2)) 값과 사이드 메뉴 값을 더한값
					
					$('.main').css('width', $(window).width()-314); //312를 뺀것은 side 메뉴 width가 312이기에
					
					$('.left').css('width', '66.5%');
					$('.right').css('width', '33.5%');
					$('.m3').css('width', '100%');
					$('.main_img').css('width', '880');
					
					$('.side').css('display','block');
					$('.sideall').css('width','310px');
					$('.main').css('margin-left','310px');
					$('#togo').css('display','none');					
				}
				if($(window).width()<=1450){
					$('.main_img').css('width', '100%');	
				}
				if($(window).width()<=1200){
					$('#togo').css('display','block');
					if(on==0){
						$('.side').css('display','block');
						$('.sideall').css('width','310px');
						$('.main').css('margin-left','310px');
						$('.main').css('width','684');
						$('#togo').css('background-image','url(img/x.png)');
						$('.left').css('width', '684');
						$('.right').css('width', '684');
						$('.m3').css('width', '100%');	
					}
					else{
						$('.side').css('display','none');
						$('.sideall').css('width','75px');
						$('#togo').css('background-image','url(img/menu.png)');
						$('.main').css('margin-left','75px');	
						$('.left').css('width', '645px');
						$('.right').css('width', '323px');
						$('.main').css('width','968px');
						/*left right값을 더한값이다.*/
						$('.m3').css('width', '100%');
					}
				}
				/*
				if($(window).width()<=1100){ //1100은 이 지점에서 오른쪽 메인이 밑으로 내려가게 하기 위함이다.
					$('.main').css('width', $(window).width()-312);
					$('.left').css('width', '684');
					$('.right').css('width', '684');
					$('.m3').css('width', '50%');
				}
				*/
				/*
				if($(window).width()<1324&&$(window).width()>=1100){
					
				}
				*/
				if($(window).height()<=700)
					$('.sideall').css('height', '700');
				else
					$('.sideall').css('height', '100%');
					
			} //function x() 함수 끝
			
			function sidebox(){
				on=on==1?0:1;
				x();
			}
			
			$(document).ready(function(){
				$(window).scroll(function(){
					if($(this).scrollTop()>200)
						$(".topbt").fadeIn();
					else
						$(".topbt").fadeOut();	
				});
				$('.topbt a').click(function(){
					$('body,html').animate({
						scrollTop:0	
					},800);
					return false;
				});
				x();
			});
			
			$(window).resize(function() {
				x();
					
			});
