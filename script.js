const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});
var timer=0;
function circlechaptakaro(){
    clearTimeout(timer);
    var xscale=1;
    var yscale=1;

    var xprev=0;
    var yprev=0;
    window.addEventListener("mousemove",function(dets){
        xscale=gsap.utils.clamp(.8,1.2,dets.clientX-xprev);//clamps the value of left and top radous of a circle between .8 and .1
        yscale=gsap.utils.clamp(.8,1.2,dets.clientY-yprev);

        xprev=dets.clientX;
        yprev=dets.clientY;

        circleMouseFollower(xscale,yscale);
        timer=setTimeout(function(){//this function runs after 10ms when the mouse probably stops at a place
        document.querySelector(".minicircle").style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`
     },10);

    })
}
function firstPageAnim()
{
    var tl=gsap.timeline();
    tl.from(".nav",{
        y:-10,
        opacity:0,
        ease:Expo.easeInOut,
        duration:1.5,
    })
    .to(".boundingelem",{
        y:0,
        
        ease:Expo.easeInOut,
        duration:1.5,
        stagger:0.2,
    })
    .from("#homefooter",{
        y:-10,
        opacity:0,
        ease:Expo.easeInOut,
        delay:-1.26,
        duration:1.5,
    })
}
circlechaptakaro();
function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
       document.querySelector(".minicircle").style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`
    })
}
// circleMouseFollower();
firstPageAnim();

document.querySelectorAll(".elem").forEach(function(elem){
    var diffrot=0;
    var rot=0;
    elem.addEventListener("mousemove",function(details)
    {
        var diff=details.clientY-elem.getBoundingClientRect().top;
        diffrot=details.clientX-rot;//these values will be used in degrees while accessing rotate in gsap
        rot=details.clientX;
        // console.log(details.clientX,details.clientY);
        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease:Power1,
            top:diff,
            left:details.clientX,
            rotate:gsap.utils.clamp(-20,20,diffrot)
        })
    })
    elem.addEventListener("mouseleave",function(dets)//when mouse moves away from that elem the opacity becomes 0
    {
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease:Power3,
        })
    })
})
