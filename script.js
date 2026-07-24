const text =
"I miss you more than words can ever explain ❤️";

let i = 0;

function type(){

if(i < text.length){

document.getElementById("typing").innerHTML += text.charAt(i);

i++;

setTimeout(type,70);

}

}

type();

function scrollToLetter(){

window.scrollTo({

top:window.innerHeight,

behavior:"smooth"

});

}

const start = new Date("2025-01-01");

setInterval(()=>{

const now = new Date();

const diff = Math.floor((now-start)/1000);

document.getElementById("seconds").innerHTML=

diff.toLocaleString()+" Seconds";

},1000);

const quotes=[

"Home is wherever you are.",

"You are my favorite place.",

"Distance means so little when someone means so much.",

"My heart smiles every time I think about you.",

"I cannot wait to hold you again.",

"You are the best thing that has ever happened to me.",

"Even forever doesn't feel long enough with you."

];

let q=0;

setInterval(()=>{

document.getElementById("quote").style.opacity=0;

setTimeout(()=>{

document.getElementById("quote").innerHTML=quotes[q];

document.getElementById("quote").style.opacity=1;

q++;

if(q>=quotes.length) q=0;

},500);

},4000);

function createHeart(){

const heart=document.createElement("div");

heart.className="heart";

heart.innerHTML=["❤️","💕","💖","💗"][Math.floor(Math.random()*4)];

heart.style.left=Math.random()*100+"vw";

heart.style.fontSize=(15+Math.random()*30)+"px";

heart.style.animationDuration=(5+Math.random()*6)+"s";

document.body.appendChild(heart);

setTimeout(()=>heart.remove(),11000);

}

setInterval(createHeart,250);