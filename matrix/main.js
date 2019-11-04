var matrix=document.querySelector(".matrix");

var listSpan=[];

var createContainer=function(parentNode){

  var div=document.createElement("DIV");
  div.classList.add("container-matrix")
  parentNode.appendChild(div);
  return div;
}
var createSpanHtmlElement=function(parentNode){
  var span=document.createElement("SPAN");
  span.classList.add("span-matrix")
  parentNode.appendChild(span);
  return span;
}

var randomPosition=function(){
  var y=getRandomInt(-window.innerHeight,-window.innerHeight+(window.innerHeight)/10)
  var x=getRandomInt(0,window.innerWidth)
  return {x,y}
}

var getRandomText=function(){
  var text=[]
  var lengthText=getRandomInt(5,25);
  for (var i = 0; i < lengthText; i++) {
    var asciiCode=getRandomInt(48,168);
    text.push(String.fromCharCode(asciiCode))
  }
  return text.join("");
}

var getRandomInt=function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
var addTransition=function(element){
  element.classList.add("span-matrix-translate")

}

var arrayRemove=function (array, element) {

  const index = array.indexOf(element);
  array.splice(index, 1);
}

var showElement=function(element){
  element.classList.add("show");
}

var createSpan=function(container){
  var span=createSpanHtmlElement(container);
  span.innerHTML=getRandomText();
  var positions=randomPosition();
  span.setAttribute("id",uuidv4());
  span.setAttribute("style", "top:"+positions.y+"px;left:"+positions.x+"px;");
  setTimeout(()=>{
    span.setAttribute("style", "top:"+positions.y+"px;left:"+positions.x+"px;transform: translateY("+window.innerHeight*2.1+"px);");
  },100);
  return span
}

var loop=function(timestamp){
  var progress = timestamp - lastRender

  update(progress)

  lastRender = timestamp
  window.requestAnimationFrame(loop)
}

var initEasterEgg=function(parentNode){
  var container=createContainer(parentNode);
  showElement(container);
  return container;
}

var uuidv4=function() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function removeChildElement(id, arraySpan) {
  var element=document.getElementById(id);
  arrayRemove(arraySpan,element);
  container.removeChild(element);
}

var update= function(progress){
    if(arraySpan.length<3000){
      var span =createSpan(container);

      arraySpan.push(span);
      var id=span.id;
      setTimeout(
        removeChildElement.bind(null,id,arraySpan)
      ,5000);
    }
}

var lastRender = 0;
var arraySpan=[];
var container=initEasterEgg(matrix);
window.requestAnimationFrame(loop);
