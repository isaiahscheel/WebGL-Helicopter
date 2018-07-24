/**
 * Generates TriangleMesh vertex data for a cylinder of a given the radius and slices in number of rectangles you want (so double the triangles).
 * 
 * 
 * @param {Number} radius the length of a side of the cube
 */
var generateCylinderData = function(radius, slices, length) {

    var v = [];
    var n = [];
    var el = [];

    for(let i = 0; i < slices; i++){
        let angle = ((2 * Math.PI) / slices) * i;
        let x = radius * Math.cos(angle);
        let y = radius * Math.sin(angle);
        let z = length;
        v.push(x,y,z);

        x = (radius * Math.cos(angle));
        y = radius * Math.sin(angle);
        z = 0;
        v.push(x,y,z);
    }
    let p1 = 0;
    let p2 = 1;
    let value = (slices * 2);
     for(let i = 0; i < value; i++){
        el.push(
             (2 * i + 1)%value,       (p2+=1)%value,  p1%value,
             (2 * i + 1)%value,   (p2+=1)%value,    (p1+=2)%value
        );
        n.push(0,0,0,0,0,0);
    }

    return {
        index: el,
        normal: n,
        position: v
    };
};