/**
 * Generates TriangleMesh vertex data for a disk of a given the radius and slices,
 * centered at the origin.
 * 
 * @param {Number} radius the length of a side of the cube
 */
var generateDiskData = function(radius, slices) {

    var v = [];
    var n = [];
    var el = [];

    for(let i = 0; i < slices; i++){
        let angle = ((2 * Math.PI) / slices) * i;
        let x = radius * Math.cos(angle);
        let y = radius * Math.sin(angle);
        let z = 0;
        v.push(x,y,z);
    }
    v.push(0,0,0);
    for(let i = 0; i < slices; i++){
        el.push(slices, i, ((i+1)%slices));
        n.push(0,0,0);
    }

    return {
        index: el,
        normal: n,
        position: v
    };
};