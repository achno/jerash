
// Simulation variables
var pile1, pile2;
var time, timemax;
var p;
var tent, peep;
var old_whichrect;

// Simulation parameters
var preference, time_b;
var prefs = [
                90, 90, 90,
                10, 50, 50,
                10, 3, 10
            ];
var timeb = [
                4000, 2500, 0,
                4500, 2500, 0,
                4500, 3000, 0
            ];
var allfits = [
                0, 0, 0,
                1, 0, 0,
                1, 1, 0
            ];

function preload()
{
    CondensedFont = loadFont('fonts/EncodeSansCondensed-ExtraBold.ttf')
    RobotoFont    = loadFont('fonts/Roboto-Regular.ttf')
    RobotoBold    = loadFont('fonts/Roboto-Bold.ttf')
}

function setup()
{
    // create canvas
    createCanvas(windowWidth-20, windowHeight-20);
    textFont(RobotoFont,27);

    // Tent part

    // load images
    tent   = loadImage("../images/tent.png");
    peep   = loadImage("../images/peep.png");
    mark_yes = loadImage("../images/mark_yes.png");
    mark_no = loadImage("../images/mark_no.png");

    // setup simulation variables
    pA = 0;
    pB = 0;
    timemax = 5000;
    time = -1;
}

function draw_rectangles(plotsize)
{
	width = plotsize
	height = plotsize
	//colours = ['#79D5FB','#FFE788']
        //colours = ['#A1090F', '#1AEB0F']
        //colours = ['#D7191C', '#2C7BB6']
        colours = ['#F1B6DA', '#4DAC26']
	data = [ 0,0,0, 1,0,0, 1,1,0 ] 

	blocksize = width/3

	stroke(250)
	strokeWeight(4)

	for (i=0; i<3; i++){
		for (j=0; j<3; j++){
			fill(color(colours[data[i*3+j]]))
			rect(i*blocksize, j*blocksize, blocksize, blocksize);
		}
	}
}

function mouse_in_rect(x,y,x1,y1,wx,wy)
{
    x2 = x1+wx
    y2 = y1+wy

    if( (x>x1) & (y>y1) & (x<x2) & (y<y2) )
        return true
    else
        return false
}

function check_rectangles(x, y, plotsize)
{
    // for each rectangle, check if mouse is inside the rectangle
    // if the mouse is inside a given rectangle,
    // highlight "fits data" or "doesn't fit data"

    blocksize = width/3

    stroke('w')
    fill('k')
    strokeWeight(0)
    
    which_rect = -1
    for (i=0; i<3; i++){
            for (j=0; j<3; j++){
                    if( mouse_in_rect(x, y, i*blocksize, j*blocksize, blocksize, blocksize) )
                    {
                        which_rect = i*3+j;
                    }
            }
    }
    return which_rect;

}

function write_rectangles(which_rect,plotsize)
{
    width = plotsize
    height = plotsize
    data = [ 0,0,0, 1,0,0, 1,1,0 ] 
    textdata = [ 'DOESN\'T\nFIT DATA', 'FITS\nDATA' ]

    blocksize = width/3

    stroke('w')
    fill('k')
    strokeWeight(0)
    
    i = (which_rect-which_rect%3)/3
    j = which_rect%3

    if( data[which_rect] > 0 )
    {
        textFont(CondensedFont,19);
        epx = 0.17
        epy = 0.42
    }
    else
    {
        textFont(CondensedFont,15);
        epx = 0.065
        epy = 0.43
    }
    text(textdata[data[which_rect]], (i+epx)*blocksize, (j+epy)*blocksize )
    textFont(RobotoFont,27);
}


function draw_axes(plotsize)
{
	axisWidth = 7
	axisLength = plotsize+20
	strokeWeight(0)
	fill(150)

	push();
	rect(0, 0, axisWidth, axisLength)
	rect(2, 1*plotsize/6+30-axisWidth, -20, axisWidth)
	rect(2, 3*plotsize/6+30-axisWidth, -20, axisWidth)
	rect(2, 5*plotsize/6+30-axisWidth, -20, axisWidth)
	
	strokeWeight(0)
    textFont(RobotoFont,24);
    text("Small gap",  -132, 5*plotsize/6+33);
    text("Medium gap", -157, 3*plotsize/6+33);
    text("Large gap",  -132, 1*plotsize/6+33);
	pop();
	
	push();
	translate(0,axisLength);
	rotate(-PI/2);
    textFont(RobotoFont,24);
	rect(0, 0, axisWidth, axisLength)
	rect(2, 1*plotsize/6, -20, axisWidth)
	rect(2, 3*plotsize/6, -20, axisWidth)
	rect(2, 5*plotsize/6, -20, axisWidth)

	strokeWeight(0)
    text("50/50",            -95,  3*plotsize/6+12);
    //text("Prefer\nimported", -120, 1*plotsize/6);
    //text("Prefer\nlocal",    -95,  5*plotsize/6);

    text("Prefer\n", -120, 1*plotsize/6);
    text("Prefer\n",  -95, 5*plotsize/6);

    push();
    noStroke();
    textFont(RobotoBold,23);
    //c_stroke = color(0,204,255);
    c_stroke = color(0,189,237);
    fill(c_stroke);
    text(" \nlocal", -95, 5*plotsize/6 - 5);
    //c_stroke = color(255,204,0);
    c_stroke = color(237,189,0);
    fill(c_stroke)
    text(" \nimported", -120, 1*plotsize/6 - 5);
    pop();



	pop();
}

function change_rect(which_rect)
{
    if( which_rect != old_whichrect )
        change = true
    else
        change = false

    old_whichrect = which_rect
    return change;
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
            if( time < time_b )
            {
                r = 101;
            }
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
        //console.log(pA,pB,time);
    }
}

function draw_simulation(x, y)
{
    var rect1_x = 70;
    var xgap = 48;
    var rect2_x = rect1_x + xgap;
    var rect_width = 35;
    var height = 128;
    var rect_y = 142;
    var c_stroke;

    if( ( time > 0 ) && (time <= timemax) )
    {
        push();
            textFont(RobotoFont,24);
            strokeWeight(4);
            translate(x,y);

            var fa = height*pA/timemax
            var fb = height*pB/timemax
            push();
                c_stroke = color(0,204,255);
                stroke(c_stroke);
                fill(color('#79D5FB'));
                rect(rect1_x,rect_y,rect_width,-fa);
                
                noStroke();
                fill(c_stroke);
                percent_a = round(pA/(pA+pB)*100)
                text(percent_a+"%", -2+rect1_x, rect_y-fa-7);
            pop();
            push();
                c_stroke = color(255,204,0);
                stroke(c_stroke);
                fill(color('#FFE788'));
                rect(rect1_x+xgap,rect_y,rect_width,-fb);
                
                noStroke();
                fill(c_stroke);
                percent_b = round(pB/(pA+pB)*100)
                text(percent_b+"%", -2+rect1_x+xgap,rect_y-fb-7);
            pop();
        pop();
    }
}

function draw_tent(x,y)
{
    push();
    translate(x,y);
    scale(0.32)
    image(tent,0,0);

    if( time == timemax )
        draw_checkmark(0,0,fits);

    pop();
}

function draw_checkmark(x,y,fits)
{
    mark_x = tent.width-75
    mark_y = -50
    mark_size = 120
    if( fits == 1 )
        image(mark_yes, mark_x, mark_y, mark_size, mark_size) 
    else
        image(mark_no, mark_x, mark_y, mark_size, mark_size)
}


function draw()
{
    //print(windowWidth-20, windowHeight-20)
    dx_axes = 175
    dy_axes = 20
    plotsize = 210
    background(240)

    push();
    translate(dx_axes,dy_axes+20);
    relative_mouseX = mouseX - dx_axes
    relative_mouseY = mouseY - dy_axes - 20
    draw_rectangles(plotsize);
    which_rect = check_rectangles(relative_mouseX,relative_mouseY,plotsize);
    if(which_rect >= 0)
        write_rectangles(which_rect,plotsize)
    pop();

    push();
    translate(dx_axes-5,dy_axes+5);
    draw_axes(plotsize);
    pop();

    //tent_x = dx_axes - plotsize*0.35
    //tent_y = dy_axes + plotsize*1.60 + 3

    tent_x = dx_axes + plotsize*1.20
    tent_y = dy_axes + plotsize*0.15

    draw_tent(tent_x, tent_y)
    //image(peep, tent_x+0.15*tent.width, tent.height, peep.width/2, peep.height/2)

    // Simulation to reset if a change in rectangle happens
    if( change_rect(which_rect) )
    {
        reset_simulation(which_rect)
        if( which_rect >= 0 )
        {
            preference = prefs[which_rect]
            time_b     = timeb[which_rect]
            fits       = allfits[which_rect]

            //console.log(preference,time_b)
        }
    }

    //console.log(preference,time_b)

    if( which_rect >= 0 )
    {
        update_simulation()
        draw_simulation(tent_x+0.01*tent.width, tent_y+0.06*tent.height+1)
    }

}


