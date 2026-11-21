const c=document.getElementById("scratch"),ctx=c.getContext("2d"),img=document.getElementById("invite"),m=document.getElementById("bgMusic"),btn=document.getElementById("musicBtn");
let initialized=false;
function init(){
 const w=img.clientWidth,h=img.clientHeight;
 if(!w||!h)return;
 if(c.width!==w||c.height!==h){
  c.width=w;c.height=h;
  ctx.globalCompositeOperation="source-over";
  ctx.fillStyle="#b0b0b0";
  ctx.fillRect(0,0,c.width,c.height);
  ctx.globalCompositeOperation="destination-out";
 }
}
img.addEventListener("load",init,{once:true});
if(img.complete) init();
if(window.ResizeObserver){new ResizeObserver(init).observe(img);}
btn.onclick=()=>{m.play();btn.innerHTML="🎵 Music Playing";};
let started=false,count=0;
function heart(){let h=document.createElement("div");h.className="heart";h.textContent="❤️";h.style.left=Math.random()*100+"vw";h.style.animationDuration=(4+Math.random()*4)+"s";document.body.appendChild(h);setTimeout(()=>h.remove(),8000);}

function boom(){confetti({particleCount:220,spread:100,origin:{y:.6}});}
function scratch(x,y){ctx.beginPath();ctx.arc(x,y,22,0,Math.PI*2);ctx.fill();count++;
if(!started){started=true;m.play().catch(()=>{});setTimeout(()=>{document.getElementById("label").style.transition="opacity 1s";document.getElementById("label").style.opacity="0";},8000);}
if(count===180)boom();}
c.addEventListener("mousemove",e=>{if(e.buttons!==1)return;let r=c.getBoundingClientRect();scratch(e.clientX-r.left,e.clientY-r.top);});
c.addEventListener("touchmove",e=>{e.preventDefault();let r=c.getBoundingClientRect(),t=e.touches[0];scratch(t.clientX-r.left,t.clientY-r.top);},{passive:false});
const eventDate=new Date("2026-08-15T19:00:00").getTime();
setInterval(()=>{let d=eventDate-Date.now();if(d<0){timer.innerHTML="🎉 Welcome!";return;}
days.textContent=Math.floor(d/86400000);hours.textContent=Math.floor((d%86400000)/3600000);minutes.textContent=Math.floor((d%3600000)/60000);seconds.textContent=Math.floor((d%60000)/1000);},1000);


let heartInterval;
function startHearts(){
 if(heartInterval) return;
 heartInterval=setInterval(()=>{if(started)heart();},500);
 setTimeout(()=>clearInterval(heartInterval),15000);
}
const oldScratch=scratch;
scratch=function(x,y){
 oldScratch(x,y);
 if(started && count===1) startHearts();
 if(count>=90){ // approximate 50%
   ctx.clearRect(0,0,c.width,c.height);
   document.getElementById("label").style.opacity="0";
 }
}



