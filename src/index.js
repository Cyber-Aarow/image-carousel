import './main.css';
//Stuff you'll need to touch if you want more/less
let size = 3;

const dots = document.querySelectorAll('.dot');
const dot0 = document.querySelector('#dot0');
const dot1 = document.querySelector('#dot1');
const dot2 = document.querySelector('#dot2');


//Stuff you don't need to touch
const nextButton = document.querySelector('#next_butt');
const prevButton = document.querySelector('#prev_butt');
const images = document.querySelector('#images');
let start = 0, currentImage = 1, end = size + 1;
let isAnimated = false;
let autoAdvanceID;


//Functions (will need to touch)
function moveToImage(){
    let moveTo = currentImage * -574;
    images.style.transform = `translateX(${moveTo}px)`;
}

function clearDots(){
    dots.forEach(dot => dot.classList.remove('dot_active'));
}

function setDot(){
    if(currentImage == 1 || currentImage == end){
        clearDots();
        dot0.classList.add('dot_active');
    }
    else if(currentImage == 2){
        clearDots();
        dot1.classList.add('dot_active');
    }
    else if(currentImage == 3 || currentImage == start){
        clearDots();
        dot2.classList.add('dot_active');
    }
}

function resetAutoScroll(){
    clearInterval(autoAdvanceID);
    autoAdvanceID = setInterval(autoAdvance, 10000); //Only touch if you want auto-scroll faster/slower
}
//(no touch this one)
function autoAdvance(){
    nextButton.click();
}


//Initial setup (no touch)
moveToImage();
resetAutoScroll();
requestAnimationFrame(()=> {
    images.classList.add('animated');
});


//Event Listeners (no touch)
nextButton.addEventListener('click', ()=>{
    if(!isAnimated){
        isAnimated = true;
        currentImage++;
        moveToImage();
        setDot();
        resetAutoScroll();
    }
});

prevButton.addEventListener('click', ()=>{
    if(!isAnimated){
        isAnimated = true;
        currentImage--;
        moveToImage();
        setDot();
        resetAutoScroll();
    } 
});

images.addEventListener('transitionend', ()=> {
    requestAnimationFrame(()=>{
        if(currentImage == end){
            currentImage = start + 1;
            requestAnimationFrame(() => {
                images.classList.remove('animated');
                requestAnimationFrame(()=> {
                    moveToImage(images);
                    requestAnimationFrame(()=> {
                        images.classList.add('animated');
                        isAnimated = false;
                    });
                });
            });
        }
        else if(currentImage == start){
            images.classList.remove('animated');
            currentImage = end - 1;
            requestAnimationFrame(() => {
                images.classList.remove('animated');
                requestAnimationFrame(()=> {
                    moveToImage(images);
                    requestAnimationFrame(()=> {
                        images.classList.add('animated');
                        isAnimated = false;
                    });
                });
            });
        }
        else{
            isAnimated = false;
        }
    });
});


//More Event Listeners (no touch, but add or subtract more based on size)
dot0.addEventListener('click', ()=>{
    if(!isAnimated && !dot0.classList.contains('dot_active')){
        isAnimated = true;
        currentImage = 1; //Change this
        moveToImage();
        setDot();
    }
});    

dot1.addEventListener('click', ()=>{
    if(!isAnimated && !dot1.classList.contains('dot_active')){
        isAnimated = true;
        currentImage = 2; //Change this
        moveToImage();
        setDot();
    }
});    

dot2.addEventListener('click', ()=>{
    if(!isAnimated && !dot2.classList.contains('dot_active')){
        isAnimated = true;
        currentImage = 3; //Change this
        moveToImage();
        setDot();
    }
});    