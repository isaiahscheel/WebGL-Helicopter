var helicopter = function(color, ang1, ang2, p){
    this.color = color;
    this.top_angle = ang1;
    this.back_angle = ang2;
    this.position = p;
};

var drawCylinder = function(scale, m, color){
    let myM = mat4.clone(m);
     //Front side disk
     mat4.translate(myM,myM,vec3.fromValues(0,scale,0));
     mat4.scale(myM,myM, vec3.fromValues(scale,scale,scale));
     gl.uniformMatrix4fv(uni.uModel, false, myM);
     Shapes.disk.render(gl, uni, color);
 
     //cylinder
     myM = mat4.clone(m);
     mat4.translate(myM,myM,vec3.fromValues(0,scale,0));
     mat4.scale(myM,myM, vec3.fromValues(scale,scale,scale));
     gl.uniformMatrix4fv(uni.uModel, false, myM);
     Shapes.cylinder.render(gl, uni, color);
 
     //Back Side Disk
     myM = mat4.clone(m);
     mat4.translate(myM,myM,vec3.fromValues(0,scale,scale));
     mat4.scale(myM,myM, vec3.fromValues(scale,scale,scale));
     gl.uniformMatrix4fv(uni.uModel, false, myM);
     Shapes.disk.render(gl, uni, color);

};

var drawPropeller = function(size1, size2, m, color){
    let myM = mat4.clone(m);
    mat4.translate(myM,myM,vec3.fromValues(0,0,size1));
    mat4.rotateX(myM, myM, 3 * Math.PI/2);
    drawCylinder(size1, myM, color);

    myM = mat4.clone(m);
    mat4.rotateY(myM,myM,Math.PI/4);
    mat4.scale(myM,myM,vec3.fromValues(1, 1, size2));
    drawCylinder(size1/3,myM, color);

    myM = mat4.clone(m);
    mat4.rotateY(myM,myM, 3 * Math.PI / 2);
    mat4.scale(myM,myM,vec3.fromValues(1, 1, size2));
    drawCylinder(size1/3,myM, color);

    myM = mat4.clone(m);
    mat4.rotateY(myM,myM, Math.PI);
    mat4.scale(myM,myM,vec3.fromValues(1, 1, size2));
    drawCylinder(size1/3,myM, color);

};

helicopter.prototype.render = function(gl, uni){
    var  model = mat4.create();
    mat4.translate(model, model, this.position);

    //Body
    drawCylinder(0.75, model, this.color);

     //Tail Cone
     mat4.fromTranslation(model, this.position); //Move
     mat4.translate(model, model, vec3.fromValues(0, 0.75, 0.375));
     mat4.scale(model,model, vec3.fromValues(3,0.33,0.33));
     mat4.rotateY(model, model, Math.PI/2)
     mat4.translate(model,model, vec3.fromValues(0,0,-1));
     gl.uniformMatrix4fv(uni.uModel, false, model);
     Shapes.cone.render(gl, uni, this.color);
 
     //Back Cylinder
     mat4.fromTranslation(model, this.position); //Move
     mat4.translate(model, model, vec3.fromValues(-3,0.50,0.25));
     drawCylinder(0.25, model, this.color);
    
     //Top propeller
     mat4.fromTranslation(model, this.position); //Move
     mat4.translate(model, model, vec3.fromValues(0,1.5,0.33))
     mat4.rotateY(model,model,this.top_angle); // Rotate
     drawPropeller(0.20, 20, model, this.color);

     //Back Propeller
     mat4.fromTranslation(model, this.position); //Move
     mat4.translate(model, model,vec3.fromValues(-3, 0.75, 0.5));
     mat4.rotateX(model, model, Math.PI/2);
     mat4.rotateY(model,model,this.back_angle); // Rotate
     drawPropeller(0.15, 20, model, this.color);

};