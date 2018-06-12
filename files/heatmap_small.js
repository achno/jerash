function setup()
{
    // create canvas
    createCanvas(windowWidth-20, windowHeight-20);
	textFont("sans",25);
}

function draw_rectangles(plotsize)
{
	width = plotsize
	height = plotsize
	colours = ['#79D5FB','#FFE788']
	data = [ 0,0,0, 1,0,0, 1,1,0 ] 

	blocksize = width/3

	stroke('w')
	strokeWeight(4)

	for (i=0; i<3; i++){
		for (j=0; j<3; j++){
			fill(color(colours[data[i*3+j]]))
			rect(i*blocksize, j*blocksize, blocksize, blocksize);
		}
	}
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
    text("Small",  -95, 1*plotsize/6+35);
    text("Medium", -125, 3*plotsize/6+35);
    text("Large",  -95, 5*plotsize/6+35);
	pop();
	
	push();
	translate(0,axisLength);
	rotate(-PI/2);
	rect(0, 0, axisWidth, axisLength)
	rect(2, 1*plotsize/6, -20, axisWidth)
	rect(2, 3*plotsize/6, -20, axisWidth)
	rect(2, 5*plotsize/6, -20, axisWidth)

	strokeWeight(0)
    text("Small",  -95, 1*plotsize/6+12);
    text("Medium", -125, 3*plotsize/6+12);
    text("Large",  -95, 5*plotsize/6+12);
	pop();
}

function draw()
{
	dx_axes = 150
	dy_axes = 0
	plotsize = 300

	push();
	translate(dx_axes,dy_axes+20);
	draw_rectangles(plotsize);
	pop();

	push();
	translate(dx_axes,dy_axes);
	draw_axes(plotsize);
	pop();


}
