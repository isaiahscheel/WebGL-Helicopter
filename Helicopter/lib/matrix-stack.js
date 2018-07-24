/**
 * Constructor function for a MatrixStack.  Initially, the stack contains a 
 * single identity matrix.
 */
var MatrixStack = function() {
    this.clear();
};

/**
 * @returns {Number} the number of matrices on this stack.
 */
MatrixStack.prototype.size = function() {
    return this.stack.length;
};

/**
 * Clears this stack.  After this method is called, the stack contains a 
 * single identity matrix.
 */
MatrixStack.prototype.clear = function() {
    this.stack = [];
    this.stack.push( mat4.create() );
};

/**
 * Returns a reference to the matrix at the top of the stack.
 * 
 * @returns {mat4} a reference to the mat4 at the top of the stack.
 */
MatrixStack.prototype.peek = function() {
    return this.stack[this.stack.length - 1];
};

/**
 * Pushes a new matrix which is a copy of the current top of the stack.
 */
MatrixStack.prototype.push = function() {
    let newTop = mat4.clone(this.peek());
    this.stack.push(newTop);
};

/**
 * Removes and returns the matrix at the top of the stack.
 */
MatrixStack.prototype.pop = function() {
    if( this.stack.length > 0 ) {
        return this.stack.pop();
    }
    if( this.stack.length === 0 ) {
        this.stack.push( mat4.create() );
    }
};