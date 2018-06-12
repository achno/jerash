var button;
var pSlider1;

// Simulation variables
var pile1, pile2;
var time, timemax;
var p;
var tent, peep;


function setup()
{
    // create canvas
    createCanvas(windowWidth-20, windowHeight-20);
    textFont("sans",30);
    //fill(250);

    // load images
    tent   = loadImage("../images/tent.svg");
    peep   = loadImage("../images/peep.png");

    // setup simulation variables
    pA = 0;
    pB = 0;
    timemax = 5000;
    time = -1;

    // create sliders
    pSlider1 = createSlider(0, 100, 50);
    pSlider1.position(615, 100);
	pSlider1.style('width', '165px');

    pSlider2 = createSlider(0, timemax, 0);
    pSlider2.position(615, 150);
	pSlider2.style('width', '165px');

    // create button
    var col = color(242,230,213,50);
    button = createButton('&#9658; PLAY');
    button.style('background-color',col)
    button.style('font-size','25px');
    button.mousePressed(run_simulation);
    button.position(510,pSlider2.y+45);

}


function run_simulation()
{
    preference = pSlider1.value();
	time_b     = pSlider2.value();
    reset_simulation();
}

function reset_simulation()
{
    pA = 0; pB = 0; time = 0;
}

function update_simulation()
{
    if( ( time >= 0 ) && (time < timemax) )
    {
        for(dt=0; dt<timemax/100; dt++)
        {
            var r = random(100);

			if (time < time_b )
			{
				r = 101;
			}
			//console.log(time, r, time_b, preference)

            if( r > preference )
            {
                pA += 1;
            }
            else
            {
                pB += 1;
            }
            time += 1;
        }

        //console.log(pA,pB);
    }
}

function draw_simulation(x, y)
{
    var c_stroke;
    if( ( time > 0 ) && (time <= timemax) )
    {
        push();
            strokeWeight(4);
            translate(x,y);
            height = 263;

            var fa = height*pA/timemax
            var fb = height*pB/timemax
            push();
	            c_stroke = color(0,204,255);
				if( fa > 0 )
				{
		            stroke(c_stroke);
		            fill(color('#79D5FB'));
		            rect(100,200,50,-fa);
		            percent_a = round(pA/(pA+pB)*100)
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
		            rect(200,200,50,-fb);
		            percent_b = round(pB/(pA+pB)*100)
				}
				else
				{
					percent_b = 0;
				}		           
	            noStroke();
	            fill(c_stroke);
	            text(percent_b+"%", 200, 200-fb-7);
            pop();
        pop();
    }
}

function draw_tent(x,y)
{
    push();
    translate(x,y);
    scale(0.65)
    image(tent,0,0);
    pop();
}

function draw()
{
    //background(125);
	background(240);
    noStroke();

	fill(50);
    textFont("sans",30);
    text("Change the preference between pots", 50, 45);

	text("buy A", pSlider1.x-110 , pSlider1.y+10);
	text("buy B", pSlider1.x+185, pSlider1.y+10);
	text("no gap",  pSlider2.x-110 , pSlider2.y+10);
	text("big gap", pSlider2.x+185, pSlider2.y+10);

    tent_x = 40
    tent_y = 70

    draw_tent(tent_x, tent_y)
    //image(peep, tent_x+0.15*tent.width, tent.height, peep.width/2, peep.height/2)

    update_simulation();
    draw_simulation(tent_x+0.05*tent.width, tent_y+0.28*tent.height)//tent_y+tent.height);


}
