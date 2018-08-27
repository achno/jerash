var button;
var pSlider1;

// Simulation variables
var pile1, pile2;
var time, timemax;
var p;
var tent, peep;

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
    tent   = loadImage("../images/tent.svg");
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
    pSlider1.position(715, 100);
    pSlider1.style('width', '100px');

    pSlider2 = createSlider(0, timemax, 0);
    pSlider2.position(715, 150);
    pSlider2.style('width', '100px');

    pSlider3 = createSlider(1, 99, 50);
    pSlider3.position(715, 200);
    pSlider3.style('width', '100px');

    pSlider4 = createSlider(0, n_pots, n_pots/2);
    pSlider4.position(715, 250);
    pSlider4.style('width', '100px');

    // create button
    var col = color(242,230,213,50);
    button = createButton('&#9658; PLAY');
    button.style('background-color',col)
    button.style('font-size','25px');
    button.mousePressed(run_simulation);
    button.position(pSlider4.x-100,pSlider4.y+40);

}


function run_simulation()
{
    preference = pSlider1.value();
    time_b     = pSlider2.value();
    use_pref   = pSlider3.value();
    init_con   = pSlider4.value();
    reset_simulation();
}

function reset_simulation()
{
    time = 0;
    //pA = n_pots/2; pB = n_pots/2;
    pA = n_pots - init_con; pB = init_con;
    pAtot = 0; pBtot = 0;
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
		            rect(195,200,50,-fb);
		            percent_b = round(pB/(pA+pB)*100)
				}
				else
				{
					percent_b = 0;
				}		           
	            noStroke();
	            fill(c_stroke);
	            text(pB, 195, 200-fb-7);
            pop();
            
            translate(300,0);
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
		            rect(190,200,50,-fb);
		            percent_b = round(pBtot/(pAtot+pBtot)*100)
				}
				else
				{
					percent_b = 0;
				}		           
	            noStroke();
	            fill(c_stroke);
	            text(percent_b+"%", 190, 200-fb-7);
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

function draw()
{
    //background(125);
    background(240);
    noStroke();

    fill(50);
    textFont(RobotoFont,28);
    text("Change the usage preference", 50, 45);

    dx = 10

    text("buy A",   pSlider1.x-90-dx , pSlider1.y+10);
    text("buy B",   pSlider1.x+120-dx, pSlider1.y+10);
    text("no gap",  pSlider2.x-90-dx , pSlider2.y+10);
    text("big gap", pSlider2.x+120-dx, pSlider2.y+10);
    text("use A",   pSlider3.x-90-dx , pSlider3.y+10);
    text("use B",   pSlider3.x+120-dx, pSlider3.y+10);
    text("init A",  pSlider4.x-90-dx , pSlider4.y+10);
    text("init B",  pSlider4.x+120-dx, pSlider4.y+10);

    tent_x = 20
    tent_y = 70

    draw_tent(tent_x, tent_y)
    text("Pots in houses", tent_x+40, tent_y+290);
    draw_tent(tent_x+300, tent_y)
    text("Pots in pile", tent_x+370, tent_y+290);

    //image(peep, tent_x+0.15*tent.width, tent.height, peep.width/2, peep.height/2)

    update_simulation_two_step();
    draw_simulation(tent_x-30, tent_y+40)//tent_y+tent.height);


}
