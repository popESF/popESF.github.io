(function(){
  var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var field=document.getElementById("stars"),g=["✦","✧","✮","✯","*","+","·","✶"],stars=[];
  function build(){
    field.innerHTML="";stars=[];
    var n=Math.min(110,Math.round(innerWidth*innerHeight/14000));
    for(var i=0;i<n;i++){
      var s=document.createElement("span"),z=9+Math.random()*16;
      s.className="st"+(Math.random()<.18?" p":Math.random()<.22?" c":"");
      s.textContent=g[Math.floor(Math.random()*g.length)];
      s.style.left=Math.random()*100+"%";s.style.top=Math.random()*100+"%";
      s.style.fontSize=z+"px";s.style.setProperty("--s",z+"px");
      s.style.setProperty("--d",(2.5+Math.random()*5).toFixed(1)+"s");
      s.style.setProperty("--l",(-Math.random()*6).toFixed(1)+"s");
      field.appendChild(s);stars.push(s);
    }
  }
  build();
  var rt;addEventListener("resize",function(){clearTimeout(rt);rt=setTimeout(build,250)});
  if(reduce)return;
  var last=0;
  addEventListener("pointermove",function(e){
    var now=performance.now();if(now-last<40)return;last=now;
    for(var i=0;i<stars.length;i++){
      var r=stars[i].getBoundingClientRect(),dx=r.left-e.clientX,dy=r.top-e.clientY;
      stars[i].classList.toggle("near",dx*dx+dy*dy<9000);
    }
    var t=document.createElement("span");
    t.className="trail";t.textContent=g[Math.floor(Math.random()*3)];
    t.style.left=e.clientX+"px";t.style.top=e.clientY+"px";
    t.style.fontSize=(10+Math.random()*10)+"px";
    document.body.appendChild(t);setTimeout(function(){t.remove()},1000);
  });
})();
