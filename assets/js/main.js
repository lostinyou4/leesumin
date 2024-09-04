Splitting();
$('.char').wrap('<div class="char-wrap">')

//로딩onComplete시 overflow hidden
loadingTl = gsap.timeline({paused: true});

loadingTl.to(".loading .item", {
    keyframes: {
        yPercent: [0, -100, -200, -300 , -400 ]
    },
    duration: 2
},'percent')
loadingTl.to(".loading .bar", {
    keyframes: {
        scaleX: [0, 0.25, 0.50, 0.75 ,1]
    },
    duration:2
},'percent')
loadingTl.delay(1)
loadingTl.to(".percent-num, .percent-wrap i", {
    yPercent: -100
})
loadingTl.fromTo(".loading .anim", {
    yPercent: 100
},{
    yPercent: 0,
})
loadingTl.to(".loading .anim", {
    yPercent: -100,
    delay: 0.5
})
loadingTl.to('.loading',{
    autoAlpha: 0
})
loadingTl.fromTo(".hero .anim", {
    yPercent: 100
},{
    yPercent: 0,
},'<')
loadingTl.fromTo(".hero .desc", {
    autoAlpha: 0
},{
    autoAlpha: 1,
    duration: 1.3,
    delay:0.1
})

window.addEventListener("load", function () {
    loadingTl.play();
  });


//헤더
closeTl = gsap.timeline({paused: true});
closeTl.to('.menu-group', {scale:0})
closeTl.to('.btn-menu .dim', {autoAlpha:0, duration:0.5},">-0.2")
closeTl.progress(1);
$('.btn-menu .dim').on('click', function(e){
    if(e.target.className === 'dim'){
        closeTl.play();
    }
})
$('.btn-menu .close').on('click', function(e){
    closeTl.play();
})

$('.btn-menu .btn').on('click', function(){
    closeTl.progress(1);
    closeTl.reverse();
})
//온오프
const showNav = gsap.from('#header', {
    yPercent: -100,
    paused: true,
    duration: 0.2
}).progress(1);

ScrollTrigger.create({
    start:"top top",
    end: 99999,
    onUpdate: (self) => {
        self.direction === -1 ? showNav.play():showNav.reverse()
        
    }
});

//호버
const menuHover = gsap.to('header .menu-icon', {rotation: 90, paused:true, duration:.3})
$('header .menu-icon').hover(function(){
    menuHover.play();
}, function(){
    menuHover.reverse();
})

const closeHover = gsap.to('header .close', {rotation: 90, paused:true, duration:.3})
$('header .close').hover(function(){
    closeHover.play();
}, function(){
    closeHover.reverse();
})

const contactHover = gsap.to('header .btn-contact .char', {yPercent:-100, stagger:0.03, duration: .3, paused:true, ease: "power1.in"})
$('header .btn-contact').hover(function(){
    contactHover.play();
}, function(){
    contactHover.reverse();
})

$('header .menu-group .chars').each(function(){
    const anchorHover = gsap.to($(this).find('.char'), {yPercent:-100, stagger:0.03, duration: .3, paused:true, ease: "power1.in"})
    $(this).hover(function(){
        anchorHover.play();
    }, function(){
        anchorHover.reverse();
    })
})

//메뉴
$('.menu-list > li').on('click', function(){
    closeTl.play();
   switch( $(this).index() ){
    case 0:
        gsap.to(window, { duration: 2, scrollTo: "#about" });
    break
    case 1:
        gsap.to(window, { duration: 2, scrollTo: "#career" });
    break
    case 2:
        gsap.to(window, { duration: 2, scrollTo: "#experience" });
    break
    case 3:
        gsap.to(window, { duration: 2, scrollTo: "#footer" });
    break
    default :
        gsap.to(window, { duration: 2, scrollTo: "#hero" });
    break
   }
})
$('.btn-contact').on('click', function(){
    gsap.to(window, { duration: 2, scrollTo: "#footer" });
})

//패럴랙스
parallaxTl = gsap.timeline({
    scrollTrigger:{
        trigger:".parallax",
        start:"0% bottom",
        end:"bottom top",
        //markers:true,
        scrub: 0
    }
})
parallaxTl.fromTo(".parallax .img", {
    yPercent: -37
},{
    yPercent: 36
    
})

//소개
aboutTl = gsap.timeline({
    scrollTrigger:{
        trigger:".about",
        start:"0% 60%",
        //markers:true,
        //scrub: 0
    },
    defaults: {duration: 1.7, ease: "power2.out"}
})
aboutTl.fromTo(".about .richtext", {autoAlpha:0}, {autoAlpha: 1})
aboutTl.fromTo(".about .title", {autoAlpha:0}, {autoAlpha: 1}, "<0.5")
aboutTl.fromTo(".about .widgets-group", {autoAlpha:0}, {autoAlpha: 1}, "<0.7")

specTl = gsap.timeline({
    scrollTrigger:{
        trigger:".spec",
        start:"0% 80%",
        invalidateOnRefresh: true,
        //markers:true,
    },
    defaults: {ease: "power2.out"}
})
specTl.fromTo(".spec dl dt", {autoAlpha:0}, {autoAlpha: 1, delay: .2, duration: 1.5})
specTl.fromTo(".spec dl dd", {autoAlpha:0, y:15}, {autoAlpha: 1, y:0, duration: 1}, "< 0.1")
if (window.matchMedia("(max-width: 1024px)").matches) {
    specTl.to(".spec .spec-list > dl", {'--width' :'100%', duration: 1}, '<')
}else{
    specTl.to(".spec .spec-list > dl", {'--height' :'100%', duration: 1}, '<')
}


//포폴타이틀
gsap.fromTo('#career h2 .char', 
    {
        yPercent: 50
    },{
    yPercent: 0,
    stagger: 0.1,
    scrollTrigger : {
        trigger: '#career h2 .char',
        start: "top bottom",
        end: "bottom 70%",
        //markers: true,
        scrub: true
    }
})
gsap.fromTo('#work h2 .char', 
    {
        yPercent: 50
    },{
    yPercent: 0,
    stagger: 0.1,
    scrollTrigger : {
        trigger: '#work h2 .char',
        start: "top bottom",
        end: "bottom 70%",
        //markers: true,
        scrub: true
    }
})

class WorkAnim {
    constructor(workCate) {
        // DOM 요소 설정
        this.pictures = workCate.find('.cursor-img');
        this.workList = workCate.find('.work-list');
        this.works = this.workList.children('li');

        // 상태 변수 초기화
        this.currentPic = null;
        this.prevPic = null;
        this.prevIndex = -1;
        this.currentIndex = -1;

        // 위치 및 스크롤 정보
        this.scrollPos = 0;
        this.yPos = 0;

        // 초기 설정
        this.init();
    }

    // 초기 설정 함수
    init() {
        // 모든 이미지 숨기기
        gsap.set(this.pictures, {
            clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
            webkitClipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)"
        });

        // 마우스 이벤트 등록
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        // 스크롤 이벤트 등록
        $(window).scroll((e) => this.onScroll(e));
    }

    // 마우스 이동 이벤트 핸들러
    onMouseMove(e) {
        if (!window.matchMedia("(max-width: 1024px)").matches) {
            this.yPos = e.pageY;
            this.movePicture();
        }
    }

    // 스크롤 이벤트 핸들러
    onScroll(e) {
        if (this.scrollPos !== $(window).scrollTop()) {
            this.yPos -= this.scrollPos;
            this.scrollPos = $(window).scrollTop();
            this.yPos += this.scrollPos;

            this.movePicture();
        }
    }

    // 마우스 위치에 따라 이미지 이동
    movePicture() {
        if (this.yPos >= this.workList.offset().top && this.yPos <= this.workList.offset().top + this.workList.outerHeight()) {
            gsap.to(this.pictures, { y: this.yPos - this.workList.offset().top });

            // 썸네일 변경
            const cursorPos = this.getCursorPos();
            if (cursorPos !== this.currentIndex) {
                this.prevIndex = this.currentIndex;
                this.currentIndex = cursorPos;
                this.thumbChange();
            }
        } else {
            if (this.prevIndex !== this.currentIndex) {
                this.thumbFadeOut();
            }
            this.prevIndex = -1;
            this.currentIndex = -1;
        }
    }

    // 커서 좌표에 따른 리스트 인덱스 계산
    getCursorPos() {
        for (let i = 0; i < this.works.length; i++) {
            const workScrollPos = this.works.eq(i).offset().top + this.works.eq(i).outerHeight();
            if (workScrollPos > this.yPos) {
                return i;
            }
        }
        return -1;
    }

    // 썸네일 전환
    thumbChange() {
        this.prevPic = this.pictures.eq(this.prevIndex);
        this.currentPic = this.pictures.eq(this.currentIndex);

        if (!window.matchMedia("(max-width: 1024px)").matches) {
            if (this.currentPic) {
                gsap.fromTo(this.currentPic, {
                    clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
                    webkitClipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)"
                }, {
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    webkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    duration: 0.6,
                    ease: "circ.out"
                });
            }
            if (this.prevPic) {
                gsap.fromTo(this.prevPic, {
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    webkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                }, {
                    clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
                    webkitClipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
                    duration: 0.6,
                    ease: "circ.out"
                });
            }
        }
    }

    // 썸네일 숨기기
    thumbFadeOut() {
        this.prevPic = this.pictures.eq(this.prevIndex);
        this.currentPic = this.pictures.eq(this.currentIndex);

        if (!window.matchMedia("(max-width: 1024px)").matches) {
            if (this.currentPic) {
                gsap.fromTo(this.currentPic, {
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    webkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                }, {
                    clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
                    webkitClipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
                    duration: 0.6,
                    ease: "circ.out"
                });
            }
        }
    }
}

// 인스턴스 생성 및 실행
const workAnim1 = new WorkAnim($('#career'));
const workAnim2 = new WorkAnim($('#work'));


//경험
experienceTl = gsap.timeline({
    scrollTrigger:{
        trigger:".experience",
        start:"0% 60%",
        //markers:true,
    }
})
experienceTl.fromTo(".experience .line-wrap", {yPercent: 100}, {yPercent: 0, stagger: .1})
experienceTl.fromTo(".experience-list > li", {autoAlpha:0, y:15}, {autoAlpha: 1, y:0, duration: .7, ease: "power2.out"},"<0.2")
experienceTl.fromTo(".experience-list .bg", {autoAlpha:0, scale:.7, rotation: 5}, {autoAlpha: 1, scale: 1, rotation: 0, duration: 1, ease:"back.inOut(5)"},"-=0.3")

ScrollTrigger.create({
    trigger:'[data-theme="dark"]',
    start:"0% 50%",
    end:"100% 50%",
    //markers:true,
    onEnter:function(){
        $('#wrap').addClass('dark');
    },
    onLeaveBack:function(){
        $('#wrap').removeClass('dark');
    },
    onLeave:function(){
        
    },
    onEnterBack:function(){
       
    }
})