import { DrawnObjectBase } from "./DrawnObjectBase.js";
import { SizeConfig } from "./SizeConfig.js";
//===================================================================
// A simple rectangular object that just fills its bounding box with a color.
//===================================================================
export class FilledObject extends DrawnObjectBase {
    constructor(x = 0, y = 0, w = 42, h = 13, color = 'black') {
        super(x, y, w, h, true);
        //. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        // Color that this object fills itself with.  This can be given as a 
        // color name, a string with an HTML style hex number in it for an RGB 
        // value (e.g '#AB42CD'), or an actual number for an RGB value. Beware that 
        // string values are not checked for validity and will silently turn into 'black' 
        // or be ignored if they are not understood by the underlying JavaScript 
        // implementtion.
        this._color = 'black';
        this._color = color;
        // configure to initially be a fixed size
        this._wConfig = SizeConfig.fixed(w);
        this._hConfig = SizeConfig.fixed(h);
    }
    //. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    // Override w & h setters so they enforce fixed size
    get w() { return super.w; }
    set w(v) {
        // we change to a new fixed config with v if v is a new value
        if (!(v === this.w)) {
            this._w = v;
            this._wConfig = SizeConfig.fixed(v);
            // damage at new size
            this.damageAll();
        }
    }
    get h() { return super.h; }
    set h(v) {
        // we change to a new fixed config with v if v is a new value
        if (!(v === this.h)) {
            this._h = v;
            this._hConfig = SizeConfig.fixed(v);
            // damage at new size
            this.damageAll();
        }
    }
    //. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    // Override configuration setters to enforce fixed size
    get wConfig() { return super.wConfig; }
    set wConfig(v) {
        super.wConfig = SizeConfig.fixed(v.nat);
    }
    get hConfig() { return super.hConfig; }
    set hConfig(v) {
        super.hConfig = SizeConfig.fixed(v.nat);
    }
    get color() { return this._color; }
    set color(v) { this._color = v; }
    //. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    // Method to draw the filled rectangle contents for this object
    _drawSelfOnly(ctx) {
        if (typeof this._color === 'number') {
            // reformat the number into a string holding an HTML style hex notation number
            ctx.fillStyle = '#' + this.color.toString(16);
        }
        else {
            ctx.fillStyle = this.color.toString();
        }
        // filled object is drawn as a rectangle that fills its bounding box
        ctx.fillRect(0, 0, this.w, this.h);
    }
    //. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    // Produce a human readable "tag" string for this object -- a short string which 
    // gives basic information about the object.  We override this from the base class
    // to add the fill color to the result since that is likely to help identify it.
    tagString() {
        return this.constructor.name + '<' + this.debugID + ":'" + this.color + "'" + '>';
    }
} // end of FilledObject class
//===================================================================
//# sourceMappingURL=FilledObject.js.map