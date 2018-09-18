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
    RobotoBold    = loadFont('fonts/Roboto-Bold.ttf')
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
    timemax = 5000;
    time = -1;

    // create sliders
    pSlider1 = createSlider(0, 100, 50);
    pSlider1.position(135, 420);
	pSlider1.style('width', '100px');

	pSlider3 = createSlider(1, 99, 50);
    pSlider3.position(pSlider1.x, pSlider1.y+70);
	pSlider3.style('width', '100px');

    // create button
    var col = color(242,230,213,50);

    button = createButton('&#9658; PLAY');
    button.style('background-color',col)
    button.style('font-size','25px');
    button.mousePressed(run_simulation);
    button.position(pSlider3.x-45,pSlider3.y+50);

}


function run_simulation()
{
    preference = pSlider1.value();
	time_b     = 0; //pSlider2.value();
	use_pref   = pSlider3.value();
    reset_simulation();
}

function reset_simulation()
{
    pA = n_pots/2; pB = n_pots/2; time = 0; pAtot = 0; pBtot = 0;
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

function update_simulation_two_step()
{
    if( ( time >= 0 ) && (time < timemax) )
    {
        for(dt=0; dt<timemax/100; dt++)
        {
            var r = random(100);
	    	var r2 = random(100);
			var ifbreak = 0;
	    	if (time < time_b )
	   	 	{
			r = 101;
			r2 = 101;
	    	}
       	    //console.log(time, r, time_b, preference)
	   		 // INSERT STUFFS HERE
	   		 // Break something
	   		 if ( r2 > use_pref) 
	   		 {
	   		 	if (pA > 0)
	   		 	{
	   		 		pA -= 1; 
	   		 		pAtot += 1;
	   		 		ifbreak = 1;
	   		 	}
	   		 	else 
	   		 	{
	   		 		if (time<time_b && pB > 0 )
	   		 		{
	   		 			pB -= 1;
	   		 			pBtot += 1;
	   		 			ifbreak = 1;
	   		 		}
	   		 	}
	   		 }
	   		 else
	   		 {
	   		 	if (pB > 0)
	   		 	{
		   		 	pB -= 1;
		   		 	pBtot += 1;
		   		 	ifbreak = 1;
		   		 }
	   		 }
	   		 
	   		 // Buy something
			if (ifbreak == 1)
			{
           	 	if( r > preference )
            	{
                	pA += 1;
            	}
            	else
            	{
                	pB += 1;
            	}
            	
            }
            ifbreak = 0
            time += 1;
        }

        //console.log(pA,pB);
    }
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
}

function draw_simulation(x, y)
{
    var c_stroke;
    if( ( time > 0 ) && (time <= timemax+1) )
    {
        push();
            strokeWeight(4);
            translate(x,y);
            height = 90;

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
	            text(pB, 180, 200-fb-7);
            pop();
            
            translate(0,142);
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
		            rect(200,200,50,-fb);
		            percent_b = round(pBtot/(pAtot+pBtot)*100)
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
    text("Change the usage preference", 40, 45);

	dx = 10

    textFont(RobotoFont,20);
    //text("Buy\nlocal",     pSlider1.x-50-dx , pSlider1.y-2);
    //text("Buy\nimported",  pSlider1.x+120-dx, pSlider1.y-2);
	//text("Use\nlocal",     pSlider3.x-50-dx,  pSlider3.y-2);
	//text("Use\nimported",  pSlider3.x+120-dx, pSlider3.y-2);

    text("Buy\n ", pSlider1.x-55-dx , pSlider1.y-2);
    text("Buy\n ", pSlider1.x+115-dx, pSlider1.y-2);
    text("Buy\n",  pSlider3.x-55-dx , pSlider3.y-2);
    text("Buy\n",  pSlider3.x+115-dx, pSlider3.y-2);

    push();
    noStroke();
    textFont(RobotoBold,23);
    //c_stroke = color(0,204,255);
    c_stroke = color(0,189,237);
    fill(c_stroke);
    text(" \nlocal",  pSlider1.x-55-dx , pSlider1.y-5);
    text(" \nlocal",  pSlider3.x-55-dx , pSlider3.y-7);
    //c_stroke = color(255,204,0);
    c_stroke = color(237,189,0);
    fill(c_stroke)
    text(" \nimported", pSlider1.x+115-dx, pSlider1.y-5);
    text(" \nimported", pSlider3.x+115-dx, pSlider3.y-7);
    pop();

    tent_x = 40
    tent_y = -60
	tent2_x = tent_x
	tent2_y = tent_y + 340

    textFont(RobotoFont,22);

    draw_tent(tent_x, tent_y+175)
    text("Pots in houses", tent_x+40, tent_y+290);
	draw_tent2(tent2_x, tent2_y)
    text("Discarded broken pots", tent2_x+40, tent2_y+90);

    update_simulation_two_step();
    draw_simulation(tent_x-5, tent_y+40)


}
