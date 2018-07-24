/**
 * Generates TriangleMesh vertex data for a cone of a given the radius, slices, and length,
 * with point at the origin.
 * 
 * @param {Number} radius the length of a side of the cube
 */
var generateConeData = function(radius, slices, length) {

    var v = [];
    var n = [];
    var el = [];

    for(let i = 0; i < slices; i++){
        let angle = ((2 * Math.PI) / slices) * i;
        let x = radius * Math.cos(angle);
        let y = radius * Math.sin(angle);
        let z = length;
        v.push(x,y,z);
    }
    v.push(0,0,0);

    for(let i = 0; i < slices; i++){
        el.push(((i+1)%slices), i, slices);
        n.push(0,0,0);
    }


    return {
        index: el,
        normal: n,
        position: v
    };
};