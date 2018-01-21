var button;
var pSlider;

// Simulation variables
var pile1, pile2;
var time, timemax;
var p;


function setup()
{
    // create canvas
    createCanvas(windowWidth, windowHeight);
    textFont("sans",30);
    fill(250);

    // load images
    column = loadImage("img/column.svg");
    tent   = loadImage("img/tent.svg");
    peep   = loadImage("img/peep.png");

    // create button
    var col = color(242,230,213,50);
    button = createButton('&#9658; PLAY');
    button.style('background-color',col)
    button.style('font-size','25px');
    button.mousePressed(run_simulation);
    button.position(425,87);

    // create slider
    pSlider = createSlider(0, 100, 50);
    pSlider.position(100, 100);

    // setup simulation variables
    pA = 0;
    pB = 0;
    timemax = 5000;
    time = -1;
}


function run_simulation()
{
    p = pSlider.value();
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
            if( r > p )
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
                stroke(c_stroke);
                fill(color('#79D5FB'));
                rect(100,200,50,-fa);
                
                noStroke();
                fill(c_stroke);
                percent_a = round(pA/(pA+pB)*100)
                text(percent_a+"%", 100, 200-fa-7);
            pop();
            push();
                c_stroke = color(255,204,0);
                stroke(c_stroke);
                fill(color('#FFE788'));
                rect(200,200,50,-fb);
                
                noStroke();
                fill(c_stroke);
                percent_b = round(pB/(pA+pB)*100)
                text(percent_b+"%", 200, 200-fb-7);
            pop();
        pop();
    }
}

function make_axes(x1,y1,x2,y2){
	// Axes
	stroke(242, 230, 213)
	line(x1+50,y1+50,x1+50,y2-50);
	line(x1+50,y2-50,x2,y2-50);

	line(x2,y1+50,x2,y2-50);
	line(x1+50,y1+50,x2,y1+50);

	fill(242, 230, 213);
	noStroke();
	push();
	translate(x1+20,0.75*y2+0.25*y1);
	rotate(-PI/2);
	text("população (x)", 0, 0);
	pop();

	push();
	translate(0.45*x2+0.55*x1,y2);
	text("tempo (t)", 0, 0);
	pop();
}

function logistic(r,x_in,dt,x1,y1,x2,y2){

	var bottom = 300
	var scale = 200
	bottom = y2-100
	
	var n = (x2-x1)/dt - 1;
	var t0 = x1+75;
	var T = x1+n*dt;

	var x = x_in;
	stroke(167,250,184)
        strokeWeight(10);
	point( t0, bottom-scale*x );
	for(var t=t0; t<T; t+=dt )
	{
		var x_new = r*x*(1-x);
	    strokeWeight(5);
		line( t, bottom-scale*x, t+dt, bottom-scale*x_new );
	    strokeWeight(10);
		point(t+dt, bottom-scale*x_new);
		x = x_new;
	}

	make_axes(x1,y1,x2,y2)
}

function draw_tent(x,y)
{
    push();
    translate(x,y);
    scale(0.85)
    image(tent,0,0);
    pop();
}

function draw() {
    background(150);
    noStroke();
    textFont("sans",40);
    text("Change the ratio between pots", 100, 55);
    textFont("sans",30);
    text("pot A / pot B",  245, 115);

    tent_x = 40
    tent_y = 135
    draw_tent(tent_x, tent_y)
    //image(peep,60 + 0.2*column.height, 150+0.75*column.height, peep.width/2, peep.height/2)
    image(peep, tent_x+0.2*tent.width, 0.65*tent.height, peep.width/2, peep.height/2)

    update_simulation();
    draw_simulation(tent_x+0.15*tent.width, tent.height)//tent_y+tent.height);

    //r = r/200.0
    //x0 = x0/1000.0
    //dt = dt
    //logistic(r,x0,dt,50,225,width-100,height-80);

}
