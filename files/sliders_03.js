var button;
var pSlider1;

// Simulation variables
var pile1, pile2;
var time, timemax;
var p;
var tent, peep, tent2;

function preload()
{
    CondensedFont = loadFont('fonts/EncodeSansCondensed-ExtraBold.ttf')
    RobotoFont    = loadFont('fonts/Roboto-Regular.ttf')
}

function setup()
{
    // create canvas
    createCanvas(windowWidth-20, windowHeight-20);
    textFont(RobotoFont,30);
    //fill(250);

    // load images
    tent   = loadImage("../images/house_temp.png");
    tent2   = loadImage("../images/shardmountain.png");
    peep   = loadImage("../images/peep.png");

    // setup simulation variables
    n_pots = 50;
    pA = n_pots/2;
    pB = n_pots/2;
    pAtot = 0;
    pBtot = 0;
    timemax = 100;
    time = -1;

    // create sliders
    pSlider1 = createSlider(0, 100, 50);
    pSlider1.position(730, 75);
    pSlider1.style('width', '100px');
    preference = pSlider1.value();

    pSlider2 = createSlider(0, n_pots, n_pots/2);
    pSlider2.position(730, 150);
    pSlider2.style('width', '100px');
    init_con   = pSlider2.value();

    // create button
    //button = createButton('&#9658; PLAY');
    var col = color(242,230,213,50);
    var gapsize = 45;
    var initgap = 23;

    buttonA = createButton('USE LOCAL');
    buttonA.style('background-color',col)
    buttonA.style('font-size','25px');
    buttonA.mousePressed(useA);
    buttonA.position(pSlider2.x-75,pSlider2.y+gapsize+initgap);

    buttonB = createButton('USE IMPORTED');
    buttonB.style('background-color',col)
    buttonB.style('font-size','25px');
    buttonB.mousePressed(useB);
    buttonB.position(pSlider2.x-75,pSlider2.y+gapsize*2+initgap);

    buttonR = createButton('RESET');
    buttonR.style('background-color',col)
    buttonR.style('font-size','25px');
    buttonR.mousePressed(run_simulation);
    buttonR.position(pSlider2.x-75,pSlider2.y+gapsize*3+initgap);

    reset_simulation();

}

function run_simulation()
{
    preference = pSlider1.value();
    init_con   = pSlider2.value();
    reset_simulation();
}

function reset_simulation()
{
    time = 0;
    pA = n_pots - init_con; pB = init_con;
    pAtot = 0; pBtot = 0;
}

// break pot A
function useA()
{
    preference = pSlider1.value();
    init_con   = pSlider2.value();
    if (pA > 0)
    {
        pA -= 1; 
        pAtot += 1;
        buy_something();
    }
}

// break pot B
function useB()
{
    preference = pSlider1.value();
    init_con   = pSlider2.value();
    if (pB > 0)
    {
        pB -= 1;
        pBtot += 1;
        buy_something();
    }
}

function buy_something()
{
    var r = random(100);
    if( r > preference )
    {
        pA += 1;
    }
    else
    {
        pB += 1;
    }
    //console.log(pA,pB);
 
 /*
  else if( time==timemax )
  {
    time += 1
  }
  else
  {
    block = 3 // change this block to 0 if I don't want to add the last bit
    for( i=0; i<block; i++ )
    {
      if( pA > 0 ){ pA--; pAtot++; }
      if( pB > 0 ){ pB--; pBtot++; }
    }
  }
  */

}

function draw_simulation(x, y)
{
    var c_stroke;
    time = 1;
    
        push();
            strokeWeight(4);
            translate(x,y);
            height = 160;

            var fa = 0.9*height*pA/n_pots //(pA+pB)
            var fb = 0.9*height*pB/n_pots //(pA+pB)
            push();
	            c_stroke = color(0,204,255);
				if( fa > 0 )
				{
		            stroke(c_stroke);
		            fill(color('#79D5FB'));
		            rect(105,200,50,-fa);
		            percent_a = round(pA/(pA+pB)*100)
				}
				else
				{
					percent_a = 0;
				}
	            noStroke();
	            fill(c_stroke);
	            text(pA, 105, 200-fa-7);
            pop();
            push();
	            c_stroke = color(255,204,0);
				if( fb > 0 )
				{
		            stroke(c_stroke);
		            fill(color('#FFE788'));
		            rect(175,200,50,-fb);
		            percent_b = round(pB/(pA+pB)*100)
				}
				else
				{
					percent_b = 0;
				}		           
	            noStroke();
	            fill(c_stroke);
	            text(pB, 175, 200-fb-7);
            pop();
            
            translate(315,0);
            var fa = height*pAtot/timemax
            var fb = height*pBtot/timemax
            push();
	            c_stroke = color(0,204,255);
				if( fa > 0 )
				{
		            stroke(c_stroke);
		            fill(color('#79D5FB'));
		            rect(100,200,50,-fa);
		            percent_a = round(pAtot/(pAtot+pBtot)*100)
				}
				else
				{
					percent_a = 0;
				}
	            noStroke();
	            fill(c_stroke);
	            text(percent_a+"%", 100, 200-fa-7);
            pop();
            push();
	            c_stroke = color(255,204,0);
				if( fb > 0 )
				{
		            stroke(c_stroke);
		            fill(color('#FFE788'));
		            rect(170,200,50,-fb);
		            percent_b = round(pBtot/(pAtot+pBtot)*100)
				}
				else
				{
					percent_b = 0;
				}		           
	            noStroke();
	            fill(c_stroke);
	            text(percent_b+"%", 170, 200-fb-7);
            pop();
        pop();
    
}

function draw_tent(x,y)
{
    push();
    translate(x,y);
    scale(0.45)
    image(tent,0,0);
    pop();
}

function draw_tent2(x,y)
{
    push();
    translate(x,y);
    scale(0.45)
    image(tent2,0,0);
    pop();
}

function draw()
{
    //background(125);
    background(240);
    noStroke();

    fill(50);
    textFont(RobotoFont,28);
    text("Change the usage preference", 50, 45);

    dx = 10

    textFont(RobotoFont,20);
    
    text("Buy\nlocal",                   pSlider1.x-72-dx , pSlider1.y-2);
    text("Buy\nimported",                pSlider1.x+112-dx, pSlider1.y-2);
    text("Initial\nnumber\nof local",    pSlider2.x-72-dx , pSlider2.y-12);
    text("Initial\nnumber of\nimported", pSlider2.x+112-dx, pSlider2.y-12);
    
    tent_x = 0
    tent_y = 70

    draw_tent(tent_x, tent_y+175)
    text("Pots in houses", tent_x+60, tent_y+290);
    draw_tent2(tent_x+315, tent_y+196.7)
    text("Discarded broken pots", tent_x+330, tent_y+290);

    //image(peep, tent_x+0.15*tent.width, tent.height, peep.width/2, peep.height/2)

    //update_simulation();
    draw_simulation(tent_x-5, tent_y+40)//tent_y+tent.height);


}
