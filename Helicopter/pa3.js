
// The WebGL object
var gl;

// The HTML canvas
var canvas;

var grid;    // The reference grid
var axes;    // The coordinate axes
var model;   // Our model matrix

var downKeys = new Set(); // A list of keys that are currently down.

// Uniform variable locations
var uni = {
    uModel: null,
    uView: null,
    uProj: null,
    uColor: null
};

// The rotation angle for animation
var angleY = 0.0;
var rotating = true;  // Whether or not we are rotating the scene

/**
 * Initialize the WebGL context, load/compile shaders, and initialize our shapes.
 */
var init = function() {
    
    // Set up WebGL
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    // Set the viewport transformation
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Set the background color
    gl.clearColor(0.5, 0.5, 0.5, 1.0);
    
    // Enable the z-buffer
    gl.enable(gl.DEPTH_TEST);

    // Load and compile shaders
    program = Utils.loadShaderProgram(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Find the uniform variable locations
    uni.uModel = gl.getUniformLocation(program, "uModel");
    uni.uView = gl.getUniformLocation(program, "uView");
    uni.uProj = gl.getUniformLocation(program, "uProj");
    uni.uColor = gl.getUniformLocation(program, "uColor");

    // Initialize our shapes
    Shapes.init(gl);
    grid = new Grid(gl, 20.0, 20, vec3.fromValues(0.7,0.7,0.7));
    axes = new Axes(gl, 2.5, 0.05);

    // Initialize the model matrix
    model = mat4.create();

    initEventHandlers();

    // Start the animation sequence
    render();
};

/**
 * Render the scene!
 */
var render = function() {
    // Request another draw
    window.requestAnimFrame(render, canvas);

    // Clear the color and depth buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    cameraSetup();
    drawAxesAndGrid();
    drawScene();
};
/*

var drawCylinder = function(scale, m){
    let myM = mat4.clone(m);
     //Front side disk
     mat4.translate(myM,myM,vec3.fromValues(0,scale,0));
     mat4.scale(myM,myM, vec3.fromValues(scale,scale,scale));
     gl.uniformMatrix4fv(uni.uModel, false, myM);
     Shapes.disk.render(gl, uni, Float32Array.from([1,1,1]));
 
     //cylinder
     myM = mat4.clone(m);
     mat4.translate(myM,myM,vec3.fromValues(0,scale,0));
     mat4.scale(myM,myM, vec3.fromValues(scale,scale,scale));
     gl.uniformMatrix4fv(uni.uModel, false, myM);
     Shapes.cylinder.render(gl, uni, Float32Array.from([1,1,1]));
 
     //Back Side Disk
     myM = mat4.clone(m);
     mat4.translate(myM,myM,vec3.fromValues(0,scale,scale));
     mat4.scale(myM,myM, vec3.fromValues(scale,scale,scale));
     gl.uniformMatrix4fv(uni.uModel, false, myM);
     Shapes.disk.render(gl, uni, Float32Array.from([1,1,1]));

}

var drawPropeller = function(size1, size2, m){
    let myM = mat4.clone(m);
    mat4.translate(myM,myM,vec3.fromValues(0,0,size1));
    mat4.rotateX(myM, myM, 3 * Math.PI/2);
    drawCylinder(size1, myM);

    myM = mat4.clone(m);
    mat4.rotateY(myM,myM,Math.PI/4);
    mat4.scale(myM,myM,vec3.fromValues(1, 1, size2));
    drawCylinder(size1/3,myM);

    myM = mat4.clone(m);
    mat4.rotateY(myM,myM, 3 * Math.PI / 2);
    mat4.scale(myM,myM,vec3.fromValues(1, 1, size2));
    drawCylinder(size1/3,myM);

    myM = mat4.clone(m);
    mat4.rotateY(myM,myM, Math.PI);
    mat4.scale(myM,myM,vec3.fromValues(1, 1, size2));
    drawCylinder(size1/3,myM);

}
*/

//Evennt handlers for the keyboard controls
var handleKeys = function() {
    if(downKeys.has( "ArrowUp") ){
        Shapes.helicopter.position[1] += 0.01;
    }   
    if(downKeys.has( "ArrowDown") ){
        Shapes.helicopter.position[1] -= 0.01;
    }
    if(downKeys.has( "ArrowLeft") ){
        Shapes.helicopter.position[0] -= 0.01;
    }
    if(downKeys.has( "ArrowRight") ){
        Shapes.helicopter.position[0] += 0.01;
    }
    if(downKeys.has("KeyA") ){
         Shapes.helicopter.top_angle += 0.1;
    }
    if(downKeys.has("KeyS") ){
         Shapes.helicopter.back_angle += 0.1;
    }
    if(downKeys.has("KeyE") ){
        Shapes.helicopter.position[2] -= 0.01;
   }
   if(downKeys.has("KeyD") ){
    Shapes.helicopter.position[2] += 0.01;
   }
};

/**
 * Draw the objects in the scene.  
 */
var drawScene = function() {
    handleKeys();
    Shapes.helicopter.render(gl,uni);
    // Draw a red cube, translated
   // mat4.translate(model, model, vec3.fromValues(0,2,0));
   // mat4.scale(model, model, vec3.fromValues(3,3,3));
    //Front side disk
    /*
    mat4.translate(model,model,vec3.fromValues(0,0.75,0));
    mat4.scale(model,model, vec3.fromValues(0.75,0.75,0.75));
    gl.uniformMatrix4fv(uni.uModel, false, model);
    Shapes.disk.render(gl, uni, Float32Array.from([1,1,1]));

    //cylinder
    mat4.fromTranslation(model, vec3.fromValues(0,0.75,0));
    mat4.scale(model,model, vec3.fromValues(0.75,0.75,0.75));
    gl.uniformMatrix4fv(uni.uModel, false, model);
    Shapes.cylinder.render(gl, uni, Float32Array.from([1,1,1]));

    //Back Side Disk
    mat4.fromTranslation(model, vec3.fromValues(0, 0.75, 0.75));
    mat4.scale(model,model, vec3.fromValues(0.75,0.75,0.75));
    gl.uniformMatrix4fv(uni.uModel, false, model);
    Shapes.disk.render(gl, uni, Float32Array.from([1,1,1]));
    */
/*
    //Main part
    model = mat4.create();
   drawCylinder(0.75, model);


    //Tail Cone
    mat4.fromTranslation(model, vec3.fromValues(0, 0.75, 0.375));
    mat4.scale(model,model, vec3.fromValues(3,0.33,0.33));
    mat4.rotateY(model, model, Math.PI/2)
    mat4.translate(model,model, vec3.fromValues(0,0,-1));
    gl.uniformMatrix4fv(uni.uModel, false, model);
    Shapes.cone.render(gl, uni, Float32Array.from([1,1,1]));

    //Back Cylinder
    mat4.fromTranslation(model, vec3.fromValues(-3,0.50,0.25));
    drawCylinder(0.25, model);

    mat4.fromTranslation(model, vec3.fromValues(-3,0.60,0.50));
    drawCylinder(0.10, model);

    model = mat4.create();
    mat4.translate(model,model,vec3.fromValues(0,1.5,0.33))
    drawPropeller(0.25, 20, model);

    


   /* mat4.identity();
    mat4.translate(model, model, vec3.fromValues(-1.25, 0, 0));
    mat4.scale(model, model, vec3.fromValues(2.5, 1 ,1 ));
    gl.uniformMatrix4fv(uni.uModel, false, model);
    Shapes.cube.render(gl, uni, Float32Array.from([0.5,0.5,1]));
    */


    // Draw a blue cube, translated and scaled
    //mat4.fromTranslation(model, vec3.fromValues(-0.75,1.0,0.75));
    //mat4.scale(model, model, vec3.fromValues(0.5, 2.0, 0.5));
    //gl.uniformMatrix4fv(uni.uModel, false, model);
    //Shapes.cube.render(gl, uni, Float32Array.from([0,0,0.7]));
    
};

/**
 * Draws the reference grid and coordinate axes.
 */
var drawAxesAndGrid = function() {
    // Make sure the model matrix is the identity
    mat4.identity(model);
    gl.uniformMatrix4fv(uni.uModel, false, model);

    // Draw grid
    grid.render(gl,uni);
    // Draw Axes
    axes.render(gl,uni);
};

/**
 * This function sets up the required transformation matrices to define a 
 * "camera", apply the rotation, and perform a perspective projection. 
 * For this assignment, you can ignore this function, we will learn the
 * details of all of this in class and in future assignments.
 */
var cameraSetup = function() {
    // Update angle
    if( rotating ) {
        angleY += 0.01;
        if( angleY > 2.0 * Math.PI ) angleY -= 2.0 * Math.PI;
    }

    let view = mat4.create();
    let at = vec3.fromValues(0,0,0);      // Point at which the camera is looking
    let up = vec3.fromValues(0,1,0);      // Camera's up direction
    let eye = vec3.fromValues(0,2.5,5.0); // Camera position
    mat4.lookAt(view, eye, at, up);
    mat4.rotateY(view, view, angleY);

    var proj = mat4.create();
    var aspect = canvas.width / canvas.height;
    mat4.perspective(proj, 60.0 * Math.PI / 180.0, aspect, 0.5, 100.0);

    gl.uniformMatrix4fv(uni.uView, false, view);
    gl.uniformMatrix4fv(uni.uProj, false, proj);
};

/*var initEventHandlers = function() {
    document.addEventListener("keydown", function(e) {
        if( e.code === "Space" )
            rotating = !rotating;
    });
};
*/

var initEventHandlers = function() {
    document.addEventListener("keydown", function(e) {
        if( e.code === "Space" )
            rotating = !rotating;
        else {
            e.preventDefault();
            downKeys.add(e.code);
        }
    });

    document.addEventListener("keyup" , function(e) {
        downKeys.delete(e.code);
    });
};

// When the HTML document is loaded, call the init function.
window.addEventListener("load", init);