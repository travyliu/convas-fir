window.onload=function(){
	var canvas=document.querySelector('#canvas');
	var ctx=canvas.getContext('2d');
    
    var ROM=15;
    
    for(var i=0; i<ROM; i++){
   /*var lingrad=ctx.createLinearGradient(20.5,20.5+i*40,580,20.5+i*40);
   lingrad.addColorStop(0.5,'red');
   lingrad.addColorStop(1,'blue');*/
	ctx.beginPath();
	ctx.moveTo(20,20.5+i*40);
    ctx.lineTo(580,20.5+i*40);
    /*ctx.strokeStyle=lingrad;*/
    ctx.stroke();
  
  /*ling=ctx.createLinearGradient(20.5+i*40,20.5,20.5+i*40,580);
   lingrad.addColorStop(0.7,'black');
   lingrad.addColorStop(1,'blue');*/
    ctx.beginPath();
    ctx.moveTo(20.5+i*40,20);
    ctx.lineTo(20.5+i*40,580);
    /*ctx.strokeStyle=ling;*/
    ctx.stroke();
}

    ctx.beginPath();
	ctx.moveTo(300.5,300.5);
    ctx.arc(300,300,3,0,Math.PI*2);
    ctx.fill();


    var z=[140.5,460.5];
    for(var i=0;i<z.length;i++){
    	for(var j=0;j<z.length;j++){
    	ctx.beginPath();
	    ctx.arc(z[i],z[j],3,0,Math.PI*2);
        ctx.fill();	
    	}
    }

    /*ctx.beginPath();
	ctx.moveTo(140,140);
    ctx.arc(140,140,3,0,Math.PI*2);
    ctx.fill();

    ctx.beginPath();
	ctx.moveTo(140,460);
    ctx.arc(140,460,3,0,Math.PI*2);
    ctx.fill();

    ctx.beginPath();
	ctx.moveTo(460,460);
    ctx.arc(460,460,3,0,Math.PI*2);
    ctx.fill();

    ctx.beginPath();
	ctx.moveTo(460,140);
    ctx.arc(460,140,3,0,Math.PI*2);
    ctx.fill();*/

   /*var lingrad=ctx.createLinearGradient(20,300,580,300);
   lingrad.addColorStop(0,'red');
   lingrad.addColorStop(0.2,'orange');
   lingrad.addColorStop(0.4,'yellow');
   lingrad.addColorStop(0.6,'green');
   lingrad.addColorStop(0.8,'blue');
   lingrad.addColorStop(1,'teal');
   
   ctx.lineWidth=6;
   ctx.lineCap='round';
   ctx.strokeStyle=lingrad;
   ctx.fillStyle=lingrad;
   ctx.fillRect(0,0,600,100);



   ctx.beginPath();
   ctx.moveTo(20,300);
    ctx.lineTo(580,300);
    ctx.stroke();*/
  /*var black='black';*/
 /*var white='white';*/

  var luozi=function(x,y,color){
  	var zx=40*x+20.5;
  	var zy=40*y+20.5;

  	var black=ctx.createRadialGradient(zx,zy,1,zx,zy,14);
  	black.addColorStop(0.1,'#555');
  	black.addColorStop(1,'black');
    var white=ctx.createRadialGradient(zx,zy,1,zx,zy,14);
  	white.addColorStop(0.1,'#fff');
  	white.addColorStop(1,'#ddd');


  	ctx.fillStyle=color?black:white;
  	ctx.beginPath();
  	ctx.arc(zx,zy,14,0,Math.PI*2);
  	ctx.fill();
  }


/*luozi(3,4);
luozi(3,6,true);
luozi(4,7);*/

    var qizi={}; //相当一本字典
    var kaiguan=true;
 canvas.onclick=function(e){
    var x=Math.round((e.offsetX-20.5)/40);
    var y=Math.round((e.offsetY-20.5)/40);
    if(qizi[x+'_'+y]){return;}
    luozi(x,y,kaiguan);
    qizi[x+'_'+y]=kaiguan?'black':'white';
    kaiguan=!kaiguan;
    localStorage.data=JSON.stringify(qizi);

 }

 if(localStorage.data){
	qizi=JSON.parse(localStorage.data);
	for(var i in qizi){
		var x=i.split('_')[0];
		var y=i.split('_')[1];
		luozi(x,y,(qizi[i]=='black')?true:false);
		kaiguan=!kaiguan;
	}
}
canvas.ondblclick=function(ev){
 ev.stopPropagation();
};
document.ondblclick=function(){
	localStorage.clear();
	location.reload();
}

}