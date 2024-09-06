//smooth
const lenis = new Lenis({
    smooth: true
  });
  
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  
  requestAnimationFrame(raf);

window.addEventListener('resize', function() { 
    lenis.resize();
    document.body.style.height = 'auto';
    setTimeout(() => {
        document.body.style.height = ''; 
      }, 100);
});

//커서
$(document).on('mousemove', function(e){
    gsap.to('.cursor .big', {
        x: function(){
            return e.clientX - $('.cursor .big').width()/2
        },
        y: function(){
            return e.clientY - $('.cursor .big').height()/2
        },
        duration: .4
    })
    gsap.to('.cursor .small', {
        x: function(){
            return e.clientX - $('.cursor .small').width()/2
        },
        y: function(){
            return e.clientY - $('.cursor .small').height()/2 + 2
        },
        duration: .1
    })
})

//anchor
const aCursor = gsap.fromTo('.cursor .big',{backgroundColor: 'none', scale: 1}, {backgroundColor : '#fff', scale: .4, paused:true, duration: .2});

$('a').not(".work-list .btn-go").on('mouseover', function(){
    gsap.set('.cursor .small', {zIndex:'999999'});
    aCursor.play();
    
})
$('a').not(".work-list .btn-go").on('mouseout', function(){
    gsap.set('.cursor .small', {zIndex:'99999'});
    aCursor.reverse();
    
})

//포폴
const workCursor = gsap.timeline({paused: true})
workCursor.set('.cursor .big', {border: 'none', mixBlendMode:'normal', zIndex:'999999'})
workCursor.fromTo('.cursor .big',{backgroundColor:'transparent', scale:1}, {backgroundColor: '#7100ff', scale : 1.7,duration: .2})
workCursor.fromTo('.cursor .text span', {yPercent: 100}, {yPercent: 0, duration: .3})
//workCursor.progress(1);

$('.work-list > li').on('mouseenter', function(){
    workCursor.play();
})
$('.work-list > li').on('mouseleave', function(){
    workCursor.reverse();
})