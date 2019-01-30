var button;
var pSlider1;

// Simulation variables
var pile1, pile2;
var time, timemax;
var p;
var tent, peep;
var localpot, africanpot;

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
    //textFont("sans",50);
    textFont(RobotoFont,50);
    //fill(250);

    // load images
    tent   = loadImage("../images/tent.png");
    localpot   = loadImage("../images/local_pottery.png");
//  africanpot   = loadImage("../images/african_red_slip.png");
    
    // create slider
    pSlider1 = createSlider(0, 100, 50);
    pSlider1.position(150, 350);
    pSlider1.style('width', '150px');

    // create button
    var col = color(242,230,213,50);
    button = createButton('&#9658; PLAY');
    button.style('background-color',col)
    button.style('font-size','25px');
    button.mousePressed(run_simulation);
    button.position(pSlider1.x+22,pSlider1.y+45);

    // setup simulation variables
    pA = 0;
    pB = 0;
    timemax = 5000;
    time = -1;
}


function run_simulation()
{
    p = pSlider1.value();
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
    var xbar1 = 70;
    var xgap = 60;
    var xbar2 = xbar1 + xgap;
    var rect_width = 40;
    var height = 170;

    if( ( time > 0 ) && (time <= timemax) )
    {
        push();
            strokeWeight(4);
            translate(x,y);

            var fa = height*pA/timemax
            var fb = height*pB/timemax
            push();
                c_stroke = color(0,204,255);
                stroke(c_stroke);
                fill(color('#79D5FB'));
                rect(xbar1,200,rect_width,-fa);
                //image(localpot,95, 195, localpot.width/3, localpot.height/3);

                noStroke();
                fill(c_stroke);
                percent_a = round(pA/(pA+pB)*100)
                text(percent_a+"%", xbar1, 200-fa-7);
            pop();
            push();
                c_stroke = color(255,204,0);
                stroke(c_stroke);
                fill(color('#FFE788'));
                rect(xbar2,200,rect_width,-fb);
                //image(africanpot,205, 180, africanpot.width/3, africanpot.height/3);
                
                noStroke();
                fill(c_stroke);
                percent_b = round(pB/(pA+pB)*100)
                text(percent_b+"%", xbar2, 200-fb-7);

            pop();
        pop();
    }
}

function draw_tent(x,y)
{
    push();
    translate(x,y);
    scale(0.42)
    image(tent,0,0);
    pop();
}



function draw()
{
    //background(125);
    background(240);
    noStroke();

    fill(50);
    textFont(RobotoFont,24);
    text("High ", pSlider1.x-120 , pSlider1.y+5);
    text("High ", pSlider1.x+155,  pSlider1.y+5);
    text("availaiblity", pSlider1.x-120 , pSlider1.y+35);
    text("availaiblity", pSlider1.x+155,  pSlider1.y+35);


    push();
    noStroke()
    textFont(RobotoBold,25);
    //c_stroke = color(0,204,255);
    c_stroke = color(0,189,237);
    fill(c_stroke);
    text("local",    pSlider1.x-65 , pSlider1.y+6);
    //text("Local",    pSlider1.x-110 , pSlider1.y+11);
    //c_stroke = color(255,204,0);
    c_stroke = color(237,189,0);
    fill(c_stroke)
    text("imported", pSlider1.x+210,  pSlider1.y+6);
    //text("Imported", pSlider1.x+155,  pSlider1.y+11);
    pop();

    tent_x = 70
    tent_y = 70
    draw_tent(tent_x, tent_y)

    update_simulation();
    //draw_simulation(tent_x+0.09*tent.width, tent_y+0.27*tent.height)//tent_y+tent.height);
    draw_simulation(tent_x+0.05*tent.width, tent_y+0.06*tent.height)
    textFont(RobotoFont,25);
    text("Change the preference between pots", 40, 45);


}
