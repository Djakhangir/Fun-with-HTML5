

const canvas=document.querySelector('#draw'); // we don't draw on cavas element...;

// we draw on context of the canvas element, we can assign it as 2d or 3d as well for gamings or 3d rendering.
const ctx = canvas.getContext('2d'); // ctx is where we do our all drawing on a canvas

//we size our canvas to be the same size as our window, by default we assigned it as 800 width and height in HTML
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

//strokeStyle specifies the color, gradient for the outline(strokes) around shapes. default is black #000
ctx.strokeStyle='#BADA55';

//lineJoin is property of canvas as well and it determines the shape (rount, bivel, miter) used to join two lines where they meet
ctx.lineJoin="round";

//lineCap determines the shape (round, butt, square) to draw the end points of lines 
ctx.lineCap="round";

ctx.lineWidth=100;

//if you want to blend when mouse colors overlay each other (eventually everything is going to be black)
// ctx.globalCompositeOperation='multiply';

//in order to make my cursor to draw when cliked only we do the below: 
//when it is down it is true when it is not it is false
let isDrawing=false;
let lastX=0;
let lastY=0; // y and x we need to indicate where to start and where to stop drawing

//HSL is the Hue, Saturation and Lightness of the colors from the website mother effing hsl where we basically assign...
// the different colors 
let hue=0; 

// to determine maximum and to chage the width of the line to thinner.
let direction=true;

function draw(e) {
    if(!isDrawing)
    return;      // if not drawing Stop the function from running when they are not clicked (drawing);
    console.log(e);

    //
    ctx.strokeStyle=`hsl(${hue}, 100%, 50%)`; // set the color to start, saturation and lightness.
                                                            // to be more clear look at the mothereffinghsl.com
// to change dynamicaly the width of the line we could do this but we do not need it since we assigned 
//direction "the max value of the line-look at the line 63
   // ctx.lineWidth=hue; 

    //to add actual drawing:
    ctx.beginPath();
    //start from:
    ctx.moveTo(lastX, lastY);
    //go to:
    ctx.lineTo(e.offsetX, e.offsetY); //offset values come from actual event that is happening, can be found in the console.log
    ctx.stroke();

    //to make the drawing be where the event happening:
    // lastX=e.offsetX;
    // lastY=e.offsetY; 
    //make it in one line instead of assigning separately above (ES6 tricks):
    [lastX,lastY]=[e.offsetX, e.offsetY];
    hue++; // increment the values of the color. 
    if(hue >= 360) {
        hue = 0;
    }
    if (ctx.lineWidth >= 100 ||  ctx.lineWidth <= 1) { //if that is the case flip the direction of increment
        direction=!direction;
    }
    if (direction) {
        ctx.lineWidth++; // if direction is true then increment the size width of the line otherwise decrease
    } else {
        ctx.lineWidth--;
    }
    
}
//adding the event listener for the function mousemove to throught the event when mouse is moved
canvas.addEventListener('mousemove', draw);
//adding another event listeners for the mouse events when it is drawing 
canvas.addEventListener('mousedown', (e)=> { //this is going to help us to make the events and drawings 
    //start and continue from the point where the mouse is by updating the arrays
isDrawing = true;
[lastX,lastY]=[e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', ()=> isDrawing = false);
canvas.addEventListener('mouseout', ()=> isDrawing = false);

