window.onload=function(){
  var canvas=document.querySelector('#canvas');
  var again=document.querySelector('#again');
  var huiqi=document.querySelector('#huiqi');
  var ctx=canvas.getContext('2d');
    
    var 
    ROM=15,//棋盘大小
    z=[140.5,460.5],//棋盘星点位置数据
    qizi={}, //相当一本字典，储存落子数据
    //kaiguan=true;//标示给谁落子
    kaiguan=localStorage.x?false:true;
  var huaqipan=function(){  
    for(var i=0; i<ROM; i++){
  ctx.beginPath();
  ctx.moveTo(20,20.5+i*40);
    ctx.lineTo(580,20.5+i*40);
    /*ctx.strokeStyle=lingrad;*/
    ctx.stroke();
  
  
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

    
    for(var i=0;i<z.length;i++){
      for(var j=0;j<z.length;j++){
      ctx.beginPath();
      ctx.arc(z[i],z[j],3,0,Math.PI*2);
        ctx.fill(); 
      }
    }
}

huaqipan();
    


/*x number 落子的x坐标
  y number 落子的y坐标
  color boolean true代表黑子  false代表白子
*/
  var luozi2=function(x,y,color){
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
var haiqi=document.querySelector('#haiqi');
var baiqi=document.querySelector('#baiqi');
var  luozi=function(x,y,color){
    var zx=40*x+2.5;
    var zy=40*y+2.5;
    //ctx.drawImage(sucai,zx,zy,30,30);
    if(color){
      ctx.drawImage(baiqi,zx,zy,36,36);
    }else{
      ctx.drawImage(haiqi,zx,zy,36,36);
    }
}



/*luozi(3,4);
luozi(3,6,true);
luozi(4,7);*/

    
canvas.onclick=function(e){
    var x=Math.round((e.offsetX-20.5)/40);
    var y=Math.round((e.offsetY-20.5)/40);
    if(qizi[x+'_'+y]){return;}
    luozi(x,y,kaiguan);
    qizi[x+'_'+y]=kaiguan?'black':'white';
    kaiguan=!kaiguan;
    localStorage.data=JSON.stringify(qizi);
    if(!kaiguan){
      localStorage.x=1;
    }else{
      localStorage.removeItem('x');
    }
 }
/*如果本地存储中有棋盘的数据，读取这些数据并绘制到页面中*/
 if(localStorage.data){
  qizi=JSON.parse(localStorage.data);
  for(var i in qizi){
    var x=i.split('_')[0];
    var y=i.split('_')[1];
    luozi(x,y,(qizi[i]=='black')?true:false);
    //kaiguan=!kaiguan;
  }
}
canvas.ondblclick=function(ev){
 ev.stopPropagation();
};
again.onclick=function(){
  localStorage.clear();
  location.reload();
}
huiqi.onclick=function(){
        huaqipan();
        var colorarr=[];
        var zuobiaoarr=[];
        data=JSON.parse(localStorage.data);
        if(JSON.stringify(data)==0){
            huiqi.onclick=null;
            return;
        }
        for(var i in data){
            zuobiaoarr.push(i);
            colorarr.push(data[i]);   
        }
        colorarr.pop();
        zuobiaoarr.pop();
        for(var i=0;i<colorarr.length;i++){
            var x=zuobiaoarr[i].split("_")[0];
            var y=zuobiaoarr[i].split("_")[1];
            luozi(x,y,(colorarr[i]=='black')?true:false);
            if(((colorarr[i]=='black')?true:false)){
               localStorage.x="1";
            }else{
                localStorage.removeItem("x");
            } 
        }
//更新localStorage
        data={};
        for(var i=0;i<zuobiaoarr.length;i++){
            var x=zuobiaoarr[i].split("_")[0];
            var y=zuobiaoarr[i].split("_")[1];
            data[x+'_'+y]=colorarr[i];
        }
        localStorage.data=JSON.stringify(data);
        location.reload();
    }
}