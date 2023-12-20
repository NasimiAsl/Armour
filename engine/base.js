//
var _null = 'set null anyway';

function toggleFirst(th) {
    first('div', function (at) { at.classList.toggle('hdn'); }, th.parentNode);

}

function hashTag(h) {
    return window.location.hash.toLowerCase().indexOf(h.toLowerCase()) != -1;
}
function search(h) {
    return window.location.search.toLowerCase().indexOf(h.toLowerCase()) != -1;
}

function frame(be, fn) {
    if (be()) {
        if (def(fn)) { requestAnimationFrame(fn); }
    }
}
var after = 0;
function doDelay(fn, d) {
    after += def(d, 500);
    setTimeout(function () { after -= def(d, 500); fn() }, after);
}

function getPPI() {
    // create an empty element
    var div = document.createElement("div");
    // give it an absolute size of one inch
    div.style.width = "1in";
    // append it to the body
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(div);
    // read the computed width
    var ppi = div.offsetWidth;
    // remove it again
    body.removeChild(div);
    // and return the value
    return parseFloat(ppi);
}

function toRGB(a, b) {
    b = def(b, 255);
    var x = a - floor(a / b) * b;
    a = floor(a / b);
    var y = a - floor(a / b) * b;
    a = floor(a / b);
    var z = a - floor(a / b) * b;

    if (x > 126) x++;
    if (y > 126) y++;
    if (z > 126) z++;

    return { r: x, g: y, b: z };

}

function torgb(a, b) {
    b = def(b, 255);
    var i = toRGB(a, b);

    return { r: i.r / 256, g: i.g / 256, b: i.b / 256 }

}

function toID(a, b) {
    b = def(b, 255);
    var c = 255 / b;

    var x = floor(a.r / c);
    var y = floor(a.g / c);
    var z = floor(a.b / c);

    return z * b * b + y * b + x;
}

function toid(a, b) {

    return toID({ r: a.r * 256, g: a.g * 256, b: a.b * 256 }, b);
}


function def(a, d) {
    if (a != undefined && a != null) return (d != undefined && d != null ? a : true);
    else
        if (d != _null)
            return (d != undefined && d != null ? d : false);
    return null;
}

var always = function () { return true };

function n_1(ar) {
    ar = def(ar, []);
    if (!def(ar.length)) return null;
    return ar[ar.length - 1];
}

function repeat(n, c, e) {
    for (var i = 0; i < n; i++) {
        if (def(c)) c(i, (i == n - 1));
    }
    if (def(e))
        return e();
}

function css_r(th, css) {

    if (def(th.length)) {
        _each(th, function (it, i) { try { if (def(it) && def(it.classList)) it.classList.remove(css); } catch (e) { } }, function () { }, function () { });
    }
    else
        try { if (def(th) && def(th.classList)) th.classList.remove(css); } catch (e) { }

}


function css_t(th, css) {

    if (def(th) && def(th.classList)) th.classList.toggle(css);
}


function css(th, css) {

    if (def(th.length)) {
        _each(th, function (it, i) { try { if (def(it) && def(it.classList)) it.classList._add(css); } catch (e) { } }, function () { }, function () { });
    }
    else
        try { if (def(th) && def(th.classList)) th.classList._add(css); } catch (e) { }

}

String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/gm, '');
}

String.prototype.replaceAll = function (str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
}
// id ? {}

function join(ar1) {
    var ar3 = [];
    return _each(ar1, function (at, i) { _each(at, function (ati, j) { ar3.push(ati); }); }, function () { return ar3; });
}

function create(content, tagname) {
    tagname = def(tagname, "div");
    var el = document.createElement(tagname);
    el.innerHTML = content;
    return el.firstElementChild;
}

function get(op, pr) {
    if (typeof (op) == 'object')
        return op;

    if (def(op.trim)) op = op.trim();
    if (def(pr)) {
        return first(op, null, pr);
    }
    return document.getElementById(op);
}

function gettxt(op, pr) {
    var d = get(op, pr);

    if (d.textContent != d.value && def(d.value) && d.value != "")
        d.textContent = d.value;

    return d.textContent;

}

function getv(op, pr) {

    if (!def(op) || !def(get(op, pr))) return;

    if (get(op, pr).tagName.toLowerCase() == "input" && get(op, pr).getAttribute("type").toLowerCase() == "checkbox") {
        return get(op, pr).checked;
    }

    return get(op, pr).value;
}

function kb(length) {
    return floor(length / 10) / 100 + " kb";
}

function setv(op, val, pr) {

    if (get(op, pr).tagName.toLowerCase() == "input" && get(op, pr).getAttribute("type").toLowerCase() == "checkbox") {
        get(op, pr).checked = val;
    } else get(op, pr).value = val;
}

function getj(op, pr) {
    return js(get(op, pr).value);
}

function js(op) {



    if (!def(op)) return null;
    try {

        var lines =  op.split('\n');
   
        var funjs = "";
        for(var i in lines){          
            if(lines[i].indexOf('//')!=-1){
              funjs += lines[i].split('//')[0];
            }
            else funjs += lines[i];           
        }

        var r = window.eval(" r = " + funjs.replaceAll('\n', ' ').replaceAll('\r', ' ')); return r;
    } catch (e) {
        state(op + " \n\r\n\r " + e.message, 'msg');
    }
}

function first(s, f, p) {
    p = def(p, document);
    var rl = p.querySelector(s);

    if (!def(f)) return rl;

    if (def(rl))
        f(rl);
}


function last(s, f, p) {
    p = def(p, document);
    var rl = p.querySelectorAll(s);


    if (!def(f)) return rl[rl.length - 1];
    if (rl.length > 0)
        f(rl[rl.length - 1]);
}


function all(s, f, e, b, p) {
    p = def(p, document);
    var rl = p.querySelectorAll(s)
    return _for(rl, f, e, b);
}

function all_r(s, f, e, b, p) {
    p = def(p, document);
    var rl = p.querySelectorAll(s)
    return _for_r(rl, f, e, b);
}

function _rd(o, i) {
    if (!def(o)) return o;
    i = def(i, 1000);

    o = floor(o * i) / i;

    return o;
}


var par = function (ctl, i, l, css, cond) {

    cond = def(cond, function (ct) {
        return def(ct.classList) && ct.classList.contains(css);
    });

    if (cond(ctl.parentNode))
        return ctl.parentNode;

    if (i <= l) {
        return par(ctl.parentNode, i + 1, l, css, cond);
    }

    return null;

}

var pTop = function (ctl, i, l, top, cond) {

    cond = def(cond, function (ct) {
        return ct == document;
    });

    if (cond(ctl.parentNode))
        return top;

    if (i <= l) {
        return pTop(ctl.parentNode, i + 1, l, ctl.offsetTop + top, cond);
    }
    else return top;

    return null;

}

var ctl = {
    check: function (th) {
        th.classList.toggle('c-iselect');
    },
    singleSelect: function (th) {
        all('> .c-iselect',
            function (at, i) { at.classList.remove('c-iselect'); },
            function () { th.classList._add('c-iselect'); }, null, th.parentNode);
    },
    upload: function (th) {

    },
    step: function (ct, tick, df) {
        var _ct = get(ct);
        if (!def(df, false)) {
            if (def(ct.getAttribute("step-items"))) {

                var s = js(ct.getAttribute("step-items"));


                var curr = def(ct.getAttribute("curr-item"), false) ? ct.getAttribute("curr-item") : (def(s.values, false) ? s.values[0] : s.items[0]);

                function step_getNext(c, a) {
                    var item = -1;
                    for (var i = 0; i < a.length; i++) {

                        if (c == a[i]) {

                            item = i + 1;
                        }
                    }

                    if (item >= a.length)
                        item = 0;
                    return item;
                }

                var next = step_getNext(curr, (def(s.values, false) ? s.values : s.items));
                if (next != -1) {
                    _ct.src = s.path.replace("#[pic]", s.items[next]);
                    tick(next, s);
                    ct.setAttribute("curr-item", (def(s.values, false) ? s.values[next] : s.items[next]));
                    ct.classList._add('c-iselect');
                }
            }
        }

    },

    list: {

        varHeight: {
            fill: function (ct, items, e) {
                var rowIndex = 0;
                var cc = get(ct).children.length;
                if (def(items.children)) {
                    _each(items.children, function (at, i) {
                        if (def(get(ct).children[i % cc]))
                            get(ct).children[i % cc].innerHTML += at.outerHTML;
                    }, e);
                }
                else {
                    _each(items, function (at, i) {
                        if (def(get(ct).children[i % cc]))
                            get(ct).children[i % cc].innerHTML += at;
                    }, e);
                }
            },
            fetch: function (ct) {
                var items = [];
                var cc = get(ct).children.length.valueOf();
                return _each(get(ct).children, function (at, i) {
                    items = _each(at.children, function (it, j) {
                        items[j.valueOf() * cc * 1 + i.valueOf() * 1] = it.outerHTML;
                    }, function () { return items; });

                }, function () { return items; });
            },
            reBuild: function (ct, cc) {

                var items = ctl.list.varHeight.fetch(ct);

                get(ct).innerHTML = "";
                for (var i = 0; i < cc ; i++) {

                    var element = document.createElement("div");
                    element.setAttribute("class", "w-" + (cc == 5 ? "p20" : (cc == 4 ? "p25" : (cc == 3 ? "p33" : (cc == 2 ? "p50" : "full")))));
                    get(ct).appendChild(element);
                }

                ctl.list.varHeight.fill(ct, items);
            },
            fillEmptyBlock: function (ct) {
                var l = get(ct).offsetHeight;

                _each(get(ct).children, function (at, i) {
                    if (def(at.offsetHeight) && at.offsetHeight > 0 && at.offsetHeight < l - 50) {
                        var it = l - at.offsetHeight - abs(sin(random())) * 150;
                        var cn = floor(it / 550) + (it % 550 != 0 ? 1 : 0);
                        it = floor(it / cn);
                        var od = at.lastElementChild.style.order.valueOf() * 1;

                        for (var j = 0; j < cn; j++) {
                            var elm = document.createElement("div");
                            elm.setAttribute("class", at.firstElementChild.getAttribute("class") + 'f f-ct f-at pert rad-05  ba-i-01  c-bsmoke c-b-htrads1 c-htrads2 owf');
                            elm.setAttribute("style", "height:" + (it) + "px;order:" + (od - (i % 2 == 0 ? 1 : 0) - j));
                            elm.innerHTML = "<div class='f-center rad-05 m-00125' ><img class='m-005' src='/images/shapes/bodoo.svg' /></div>";

                            at.appendChild(elm);
                        }
                    }
                });
            }

        }
    }

};


function fillflip(r, e) {
    if (e) {
        var r2 = [];
        r2 = _for(r, function (at, i) { r2.push(at); }, function () { return r2; });
        return _for_r(r, function (at, i) { r2.push(at); }, function () { return r2; });
    }
    return r;
}

function flipfill(r, e) {
    if (e) {
        var r2 = [];
        r2 = _for_r(r, function (at, i) { r2.push(at); }, function () { return r2; });
        return _for(r, function (at, i) { r2.push(at); }, function () { return r2; });
    }
    return r;
}

function flip(r, e) {
    if (e) {
        var r2 = [];
        return _for_r(r, function (at, i) { r2.push(at); }, function () { return r2; });
    }
    return r;
}


/// Extention methods

Array.prototype.toString = function (op) {

    var s = "[";
    var canPack = false;

    return _each(this,
        function (it, i) {
            if (i == 0) {
                if (it.toString().toLowerCase() != "[object object]" && typeof (it).toString().toLowerCase() != "string")
                    canPack = true;
            }

            if (!canPack && !def(op)) {
                op = function (iti) {
                    var si = "";
                    if (def(iti) && def(iti.x) && def(iti.y) && def(iti.z))
                        return "{x:" + _rd(iti.x) + ",y:" + _rd(iti.y) + ",z:" + _rd(iti.z) + "}"

                    if (def(iti) && typeof (iti).toString().toLowerCase() == "string")
                        return iti;

                    return "{}";
                }
            }

            s += "," + (def(op) && !canPack ? op(it) : it.toString(op));
        },
        function () {
            return s.replace("[,", "[") + "]";
        });
}

DOMTokenList.prototype._add = function (_class) {

    this.remove(_class);
    this.add(_class);

}

DOMTokenList.prototype.addmany = function (classes) {
    var classes = classes.split(' '),
        i = 0,
        ii = classes.length;

    for (i; i < ii; i++) {
        this._add(classes[i]);
    }
}



DOMTokenList.prototype.removemany = function (classes) {
    var classes = classes.split(' '),
        i = 0,
        ii = classes.length;

    for (i; i < ii; i++) {
        this.remove(classes[i]);
    }
}

DOMTokenList.prototype.has = function (cs) {
    var fl = false;

    return _each(this, function (a) {
        if (a == cs) {
            fl = true;
        }
    }, function () { return fl; });
}

function isSelect(c, p) {
    return def(get(c, p).classList) && get(c, p).classList.has('c-iselect');
}

function select(c, p) {
    def(get(c, p).classList) && get(c, p).classList._add('c-iselect');
}
function unSelect(c, p) {
    def(get(c, p).classList) && get(c, p).classList.remove('c-iselect');
}
function toggle(c, p) {
    def(get(c, p).classList) && get(c, p).classList.toggle('c-iselect');
    return isSelect(c, p);
}

var this_helper;
function doEvent(ctl, ev) {
    if (def(ctl) && def(ev)) {
        this_helper = ctl;
        js(ctl.getAttribute('on' + ev).replaceAll('this', 'this_helper'));
    }
}


function _for(ar, _do, e, b) {
    if (def(b)) b();

    if (!def(_do)) return ar;

    for (var i = 0; i < ar.length; i++) {
        _do(ar[i], i);
    }
    if (def(e)) return e();
}
function _for_r(ar, _do, e, b) {
    if (def(b)) b();
    for (var i = ar.length - 1; i >= 0 ; i--) {
        _do(ar[i], i);
    }
    if (def(e)) return e();
}

function _each(ar, _do, e, b) {
    if (def(b)) b();
    for (var x in ar) {
        _do(ar[x], x);
    }
    if (def(e)) return e();
}

function _each_r(ar, _do, e, b) {
    var p = [];
    for (var x in ar) {
        p.push(x);
    }

    return _for_r(p, function (it, i) { _do(ar[it.toString().valueOf()], it); }, e, b);
}

var h_th_a, __th_do, __th_e, __th_d, __th_x, __th_result;

function __th(ar, _do, e, b, d) {
    if (def(ar) && def(ar.length)) {
        h_th_a = [];
        for (var x in ar) {
            h_th_a.push(ar[x]);
        }
        __th_x = 0;
    }
    __th_do = def(_do, def(__th_do, function () { }));
    __th_e = def(e, def(__th_e, function () { }));

    if (def(b)) b();

    if (h_th_a.length > 0 && h_th_a.length > __th_x) {
        __th_result = __th_do(h_th_a[__th_x], __th_x);
        __th_x++;
        requestAnimationFrame(__th);
    }
    else {
        var h_s = function () { return null; };
        if (def(__th_e)) h_s = __th_e;

        __th_a = null;
        __th_do = function () { };
        __th_e = function () { };
        __th_b = function () { };
        __th_x = 0;

        return h_s();
    }
}

var __th2 = function (ar, _do, e, b, d) {
    if (def(ar) && def(ar.length)) {
        this.h_th_a = [];
        for (var x in ar) {
            this.h_th_a.push(ar[x]);
        }
        this.__th_x = 0;
    }
    this.__th_do = def(_do, def(this.__th_do, function () { }));
    this.__th_e = def(e, def(this.__th_e, function () { }));

    if (def(b)) b();

    if (this.h_th_a.length > 0 && this.h_th_a.length > this.__th_x + 1) {
        this.__th_result = this.__th_do(this.h_th_a[this.__th_x], this.__th_x);
        this.__th_x++;
        var r = this.__loop();

        var h_s = function () { return null; };

        if (def(this.__th_e)) h_s = this.__th_e;

        this.__th_a = null;
        this.__th_do = function () { };
        this.__th_e = function () { };
        this.__th_b = function () { };
        this.__th_x = 0;

        return h_s();
    }

}

__th2.prototype = {
    h_th_a: null,
    __th_do: null,
    __th_e: null,
    __th_d: null,
    __th_x: null,
    __th_result: null,
    __loop: function () {
        if (!def(this.h_th_a)) return -1;
        if (this.h_th_a.length > 0 && this.h_th_a.length > this.__th_x + 1) {
            this.__th_result = this.__th_do(this.h_th_a[this.__th_x], this.__th_x);
            this.__th_x++;
            requestAnimationFrame(this.__loop);
            return 0;
        }
    }
};





function _isIn(ar, v) {
    var i2 = false;

    return _each(ar, function (it, i) { if (it == v) i2 = true; }, function () { return i2; });

}

function state(msg, group) {
    if (!def(first('#status'))) return;
    var old = first('#status').innerHTML;

    if (group != null && group != undefined) {
        if (!def(first("#status #" + group)))
            first("#status").innerHTML += ("<div class='underline' id='" + group + "' title='" + group + "'></div>");
        if (def(first("#status #" + group))) first("#status #" + group).innerHTML = msg;
        return;
    }
}

function clearState(group) {
    first("#status #" + group).innerHTML = '';
}
// part : e|error,i|info,w|warning,q|question,a:alert
function ops(msg, part, e) {
    switch (part) {
        case 'e', 'error': { break; }
        case 'w', 'warning': { break; }
        case 'i', 'info': { break; }
        case 'q', 'question': { if (window.confirm(msg)) { e(); } break; }
        case 'a', 'alert': { window.alert(msg); break; }
    }
}

// math base 
var floor = Math.floor;
var sin = Math.sin;
var cos = Math.cos;
var tan = Math.tan;
var atan = Math.atan;
var asin = Math.asin;
var acos = Math.acos;
var pow = function (x, y) { return Math.pow(x, (y ? y : 2.)); }
var ceil = Math.ceil;
var abs = Math.abs;
var exp = Math.exp;
var log = Math.log;
var max = Math.max;
var min = Math.min;
var random = Math.random;

// 
function r3(x) { return floor(x * 1000) / 1000; }
function r2(x) { return floor(x * 100) / 100; }
function r1(x) { return floor(x * 10) / 10; }
function r_3(x) { return floor(x * 1000000) / 1000 }
function r_2(x) { return floor(x * 10000) / 100; }
function r_1(x) { return floor(x * 100) / 10; }


function rd(min, max) {
    return (random()) * (max - min) + min;
}

var round = Math.round;
var sqrt = Math.sqrt;
var PI = Math.PI;
var E = Math.E;

var deg = PI / 180.;
var rad = 180. / PI;



//  ver 1.0.01.003
function dim(v, u) {
    return sqrt(pow(u.x - v.x) + pow(u.y - v.y) + (def(u.z) ? pow(u.z - v.z) : 0));
}
function norm(v) {
    var x = v.x, y = v.y, z = v.z;
    var n = sqrt(x * x + y * y + z * z);

    if (n == 0) return { x: 0.1, y: 0.1, z: 0.1 };

    var invN = 1 / n;
    v.x *= invN;
    v.y *= invN;
    v.z *= invN;

    return v;
}
function sub(v, u) {
    return { x: u.x - v.x, y: u.y - v.y, z: u.z - v.z };
}
function dot(v, u) {
    return { x: u.x * v.x, y: u.y * v.y, z: u.z * v.z };
}
function cross(v, u) {
    var vx = v.x, vy = v.y, vz = v.z, x = u.x, y = u.y, z = u.z;
    var target = { x: 0, y: 0, z: 0 };

    target.x = ((y * vz) - (z * vy));
    target.y = ((z * vx) - (x * vz));
    target.z = ((x * vy) - (y * vx));

    return target;
}
function nott(v) {
    return { x: -1 * v.x, y: -1 * v.y, z: -1 * v.z };
}
function add(v, u) {
    return { x: u.x + v.x, y: u.y + v.y, z: u.z + v.z };
}
function rotate_xy(pr1, pr2, alpha) {
    pp2 = { x: pr2.x - pr1.x, y: pr2.y - pr1.y };

    return {
        x: pr1.x + pp2.x * cos(alpha) - pp2.y * sin(alpha),
        y: pr1.y + pp2.x * sin(alpha) + pp2.y * cos(alpha)
    };
}



function r_y(n, a, c) {

    c = def(c, { x: 0, y: 0, z: 0 });
    var c1 = { x: c.x, y: c.y, z: c.z };
    c1.x = c1.x;
    c1.y = c1.z;

    var p = rotate_xy(c1, { x: n.x, y: n.z }, a);

    n.x = p.x;
    n.z = p.y;

    return n;

}

function r_x(n, a, c) {

    c = def(c, { x: 0, y: 0, z: 0 });
    var c1 = { x: c.x, y: c.y, z: c.z };
    c1.x = c1.y;
    c1.y = c1.z;

    var p = rotate_xy(c1, { x: n.y, y: n.z }, a);

    n.y = p.x;
    n.z = p.y;

    return n;

}

function r_z(n, a, c) {

    c = def(c, { x: 0, y: 0, z: 0 });
    var c1 = { x: c.x, y: c.y, z: c.z };
    var p = rotate_xy(c1, { x: n.x, y: n.y }, a);

    n.x = p.x;
    n.y = p.y;

    return n;

}

 var cln = (s,a,m,x)=>{
          a = def(a,{x:0,y:0,z:0});
          m = def(m,{x:0,y:0,z:0}); 
          x = def(x,{x:1,y:1,z:1}); 
          
          var s=  {x:s.x*x.x+a.x-m.x,y:s.y*x.y+a.y-m.y,z:s.z*x.z+a.z-m.z};
          if(abs(s.x) < 0.000001 )s.x = 0;
          if(abs(s.y) < 0.000001 )s.y = 0;
          if(abs(s.z) < 0.000001 )s.z = 0;
          
          return s;
          };


       
       /* vector to degree 
       output  rx, ry,rz , m rotation priority ( 'xy | zx  ' is xy is rotatex then rotatey )
        */
       function vtd(e){
          if(sqrt(pow(e.y)+pow(e.z) ) > 0 &&  sqrt(pow(e.x)+pow(e.z) ) > 0){
              var ayz= asin(e.y/sqrt(pow(e.y)+pow(e.z) ));  
              if(e.z < 0.) ayz *=-1.0; 
              e  =  (r_x(cln(e),  ayz));  
              var axz= asin(e.z/sqrt(pow(e.x)+pow(e.z) ));  
              if(e.x > 0.) axz *=-1.0;
             
              return {rx:ayz,ry:axz,m:'xy'};
          }
          else if(sqrt(pow(e.x)+pow(e.y) ) > 0 &&  sqrt(pow(e.z)+pow(e.y) ) > 0){
            
              var axy= asin(e.x/sqrt(pow(e.x)+pow(e.y) ));   
              var e1 = r_z(cln(e),  axy); 
              var azy= asin(e1.y/sqrt(pow(e1.z)+pow(e1.y) ));
              return {rz:axy,rx:azy,m:'zx'}; 
          }
          else {  
               return {rx:0,ry:0,m:'xy'};
          }
       } 

       var r_2p = function(v,s,e,alpha){ 
          
          e = cln(e,null,s);  
          var al = vtd(e);  

           if(al.m == 'xy'){ 
             var p = r_y(r_x(cln(v ,null,s),al.rx),al.ry);
             p = r_x(p,alpha );  
             p = r_x(r_y(cln(p),-1.*al.ry),-1.*al.rx); 
             return cln(p,s); 
         }
         else if(al.m == 'zx'){ 
               var p = r_x(r_z(cln(v ,null,s),al.rz),al.rx);
             p = r_z(p,alpha);  
             p = r_z(r_x(cln(p),-1.*al.rx),-1.*al.rz); 
             return cln(p,s);  
         } 

       };
 


function r_la(p,tar) { if(tar.x == 0 ) tar.x += 0.00001;
if(tar.y == 0 ) tar.y += 0.00001;
if(tar.z == 0 ) tar.z += 0.00001;


    var t1 = { x: tar.x, y: tar.y, z: tar.z };
    var t2 = { x: tar.x, y: tar.y, z: tar.z };

    t1 = (t1);

    var a = atan(t1.x / t1.z);

    t2 = (r_y(t2, a));
    var b = atan(t2.z / t2.y);

    p = r_x(p, 90 * deg);
    var ang1 = 0,ang2 = 0,ang3 = 0;
    if (t1.y > 0) {
       ang1 =  -1 * (90 * deg - b);
      ang2 = -a;

    }
    else { 
       ang1 =  1 * (90 * deg - b); 
       ang2 =  180 * deg - a;
        ang3 = 1;
    }
    
   
    p = r_x(p,ang1);
    p = r_y(p,ang2);
    p = r_z(p,ang3*180.*deg);
    



    return p; 
}
 


function vec(x, y, z) {
    return { x: def(x, 0), y: def(y, 0), z: def(z, 0) };
}

//{ p:point,d:direction }
var vec3 = function (p1, p2, isDir) {
    if (!def(p2) && !def(isDir)) {
        this.p = { x: 0, y: 0, z: 0 };
        this.d = p1;
    }
    if (isDir) {
        this.p = p1;
        this.d = p2;
    } else {
        this.p = p1;
        this.d = sub(p2, p1);
    }
}

vec3.prototype = {
    p: { x: 0, y: 0, z: 0 },
    d: { x: 0, y: 1, z: 0 },
    // mode1 : [this, p1:vector]    mode2 : [p1:vector , p2:vector]  mode3 :[p1:point,p2:point,:p3point]
    pageNormal: function (p1, p2, p3) {
        if (!def(p2) && !def(p3)) {
            return new vec3(this.p, cross(this.d, p1.d), true);
        }

        if (!def(p3)) {
            return new vec3(p1.p, cross(p1.d, p2.d), true);
        }

        var v1 = new vec3(p1, p2);
        var v2 = new vec3(p1, p3);

        return new vec3(v1.p, cross(v1.d, v2.d), true);

    },
    normal: function () {
        return new vec3(this.p, norm(this.d), true);
    }
};

var face3 = function (p1, p2, p3) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
}

face3.prototype = {
    p1: {}, p2: {}, p3: {},
    getCenter: function () {
        var v = add(add(this.p1, this.p2), this.p3);
        return vec(v.x / 3., v.y / 3., v.z / 3.);
    },
    normal: function () {

        var v1 = new vec3(this.p1, this.p2);
        var v2 = new vec3(this.p1, this.p3);

        var n = new vec3(v1.p, cross(v1.d, v2.d), true).normal();


        return vec(n.d.x, n.d.y, n.d.z);
    }
};

var qt = (function () {
    function qt(x, y, z, w) {
        if (typeof x === "undefined") { x = 0; }
        if (typeof y === "undefined") { y = 0; }
        if (typeof z === "undefined") { z = 0; }
        if (typeof w === "undefined") { w = 1; }
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    qt.prototype.toString = function () {
        return "{X: " + this.x + " Y:" + this.y + " Z:" + this.z + " W:" + this.w + "}";
    };

    qt.prototype.asArray = function () {
        return [this.x, this.y, this.z, this.w];
    };

    qt.prototype.equals = function (otherQuaternion) {
        return otherQuaternion && this.x === otherQuaternion.x && this.y === otherQuaternion.y && this.z === otherQuaternion.z && this.w === otherQuaternion.w;
    };

    qt.prototype.clone = function () {
        return new qt(this.x, this.y, this.z, this.w);
    };

    qt.prototype.copyFrom = function (other) {
        this.x = other.x;
        this.y = other.y;
        this.z = other.z;
        this.w = other.w;
    };

    qt.prototype.add = function (other) {
        return new qt(this.x + other.x, this.y + other.y, this.z + other.z, this.w + other.w);
    };

    qt.prototype.subtract = function (other) {
        return new qt(this.x - other.x, this.y - other.y, this.z - other.z, this.w - other.w);
    };

    qt.prototype.scale = function (value) {
        return new qt(this.x * value, this.y * value, this.z * value, this.w * value);
    };

    qt.prototype.multiply = function (q1) {
        var result = new qt(0, 0, 0, 1.0);

        this.multiplyToRef(q1, result);

        return result;
    };

    qt.prototype.multiplyToRef = function (q1, result) {
        result.x = this.x * q1.w + this.y * q1.z - this.z * q1.y + this.w * q1.x;
        result.y = -this.x * q1.z + this.y * q1.w + this.z * q1.x + this.w * q1.y;
        result.z = this.x * q1.y - this.y * q1.x + this.z * q1.w + this.w * q1.z;
        result.w = -this.x * q1.x - this.y * q1.y - this.z * q1.z + this.w * q1.w;
    };

    qt.prototype.length = function () {
        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z) + (this.w * this.w));
    };

    qt.prototype.normalize = function () {
        var length = 1.0 / this.length();
        this.x *= length;
        this.y *= length;
        this.z *= length;
        this.w *= length;
    };

    qt.prototype.toEulerAngles = function () {
        var qx = this.x;
        var qy = this.y;
        var qz = this.z;
        var qw = this.w;

        var sqx = qx * qx;
        var sqy = qy * qy;
        var sqz = qz * qz;

        var yaw = Math.atan2(2.0 * (qy * qw - qx * qz), 1.0 - 2.0 * (sqy + sqz));
        var pitch = Math.asin(2.0 * (qx * qy + qz * qw));
        var roll = Math.atan2(2.0 * (qx * qw - qy * qz), 1.0 - 2.0 * (sqx + sqz));

        var gimbaLockTest = qx * qy + qz * qw;
        if (gimbaLockTest > 0.499) {
            yaw = 2.0 * Math.atan2(qx, qw);
            roll = 0;
        } else if (gimbaLockTest < -0.499) {
            yaw = -2.0 * Math.atan2(qx, qw);
            roll = 0;
        }

        return new Vector3(pitch, yaw, roll);
    };

    qt.prototype.toRotationMatrix = function (result) {
        var xx = this.x * this.x;
        var yy = this.y * this.y;
        var zz = this.z * this.z;
        var xy = this.x * this.y;
        var zw = this.z * this.w;
        var zx = this.z * this.x;
        var yw = this.y * this.w;
        var yz = this.y * this.z;
        var xw = this.x * this.w;

        result.m[0] = 1.0 - (2.0 * (yy + zz));
        result.m[1] = 2.0 * (xy + zw);
        result.m[2] = 2.0 * (zx - yw);
        result.m[3] = 0;
        result.m[4] = 2.0 * (xy - zw);
        result.m[5] = 1.0 - (2.0 * (zz + xx));
        result.m[6] = 2.0 * (yz + xw);
        result.m[7] = 0;
        result.m[8] = 2.0 * (zx + yw);
        result.m[9] = 2.0 * (yz - xw);
        result.m[10] = 1.0 - (2.0 * (yy + xx));
        result.m[11] = 0;
        result.m[12] = 0;
        result.m[13] = 0;
        result.m[14] = 0;
        result.m[15] = 1.0;
    };

    qt.prototype.fromRotationMatrix = function (matrix) {
        var data = matrix.m;
        var m11 = data[0], m12 = data[4], m13 = data[8];
        var m21 = data[1], m22 = data[5], m23 = data[9];
        var m31 = data[2], m32 = data[6], m33 = data[10];
        var trace = m11 + m22 + m33;
        var s;

        if (trace > 0) {
            s = 0.5 / Math.sqrt(trace + 1.0);

            this.w = 0.25 / s;
            this.x = (m32 - m23) * s;
            this.y = (m13 - m31) * s;
            this.z = (m21 - m12) * s;

            return;
        }

        if (m11 > m22 && m11 > m33) {
            s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);

            this.w = (m32 - m23) / s;
            this.x = 0.25 * s;
            this.y = (m12 + m21) / s;
            this.z = (m13 + m31) / s;

            return;
        }

        if (m22 > m33) {
            s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);

            this.w = (m13 - m31) / s;
            this.x = (m12 + m21) / s;
            this.y = 0.25 * s;
            this.z = (m23 + m32) / s;

            return;
        }

        s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);

        this.w = (m21 - m12) / s;
        this.x = (m13 + m31) / s;
        this.y = (m23 + m32) / s;
        this.z = 0.25 * s;
    };


    qt.RotationAxis = function (axis, angle) {
        var result = new qt();
        var sin = Math.sin(angle / 2);

        result.w = Math.cos(angle / 2);
        result.x = axis.x * sin;
        result.y = axis.y * sin;
        result.z = axis.z * sin;

        return result;
    };

    qt.FromArray = function (array, offset) {
        if (!offset) {
            offset = 0;
        }

        return new qt(array[offset], array[offset + 1], array[offset + 2], array[offset + 3]);
    };

    qt.RotationYawPitchRoll = function (yaw, pitch, roll) {
        var result = new qt();

        qt.RotationYawPitchRollToRef(yaw, pitch, roll, result);

        return result;
    };

    qt.RotationYawPitchRollToRef = function (yaw, pitch, roll, result) {
        var halfRoll = roll * 0.5;
        var halfPitch = pitch * 0.5;
        var halfYaw = yaw * 0.5;

        var sinRoll = Math.sin(halfRoll);
        var cosRoll = Math.cos(halfRoll);
        var sinPitch = Math.sin(halfPitch);
        var cosPitch = Math.cos(halfPitch);
        var sinYaw = Math.sin(halfYaw);
        var cosYaw = Math.cos(halfYaw);

        result.x = (cosYaw * sinPitch * cosRoll) + (sinYaw * cosPitch * sinRoll);
        result.y = (sinYaw * cosPitch * cosRoll) - (cosYaw * sinPitch * sinRoll);
        result.z = (cosYaw * cosPitch * sinRoll) - (sinYaw * sinPitch * cosRoll);
        result.w = (cosYaw * cosPitch * cosRoll) + (sinYaw * sinPitch * sinRoll);
    };

    qt.Slerp = function (left, right, amount) {
        var num2;
        var num3;
        var num = amount;
        var num4 = (((left.x * right.x) + (left.y * right.y)) + (left.z * right.z)) + (left.w * right.w);
        var flag = false;

        if (num4 < 0) {
            flag = true;
            num4 = -num4;
        }

        if (num4 > 0.999999) {
            num3 = 1 - num;
            num2 = flag ? -num : num;
        } else {
            var num5 = Math.acos(num4);
            var num6 = (1.0 / Math.sin(num5));
            num3 = (Math.sin((1.0 - num) * num5)) * num6;
            num2 = flag ? ((-Math.sin(num * num5)) * num6) : ((Math.sin(num * num5)) * num6);
        }

        return new qt((num3 * left.x) + (num2 * right.x), (num3 * left.y) + (num2 * right.y), (num3 * left.z) + (num2 * right.z), (num3 * left.w) + (num2 * right.w));
    };
    return qt;
})();
lookAt = function (targetPoint, position, yawCor, pitchCor, rollCor) {


    yawCor = yawCor || 0;
    pitchCor = pitchCor || 0;
    rollCor = rollCor || 0;

    var dv = sub(targetPoint, position);
    var yaw = -Math.atan2(dv.z, dv.x) - Math.PI / 2;
    var len = Math.sqrt(dv.x * dv.x + dv.z * dv.z);
    var pitch = Math.atan2(dv.y, len);
    return qt.RotationYawPitchRoll(yaw + yawCor, pitch + pitchCor, rollCor);
};





// nooise

(function (global) {
    var module = global.noise = {};

    function Grad(x, y, z) {
        this.x = x; this.y = y; this.z = z;
    }

    Grad.prototype.dot2 = function (x, y) {
        return this.x * x + this.y * y;
    };

    Grad.prototype.dot3 = function (x, y, z) {
        return this.x * x + this.y * y + this.z * z;
    };

    var grad3 = [new Grad(1, 1, 0), new Grad(-1, 1, 0), new Grad(1, -1, 0), new Grad(-1, -1, 0),
                 new Grad(1, 0, 1), new Grad(-1, 0, 1), new Grad(1, 0, -1), new Grad(-1, 0, -1),
                 new Grad(0, 1, 1), new Grad(0, -1, 1), new Grad(0, 1, -1), new Grad(0, -1, -1)];

    var p = [151, 160, 137, 91, 90, 15,
    131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
    190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
    88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
    77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
    102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
    135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123,
    5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
    223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
    129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
    251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
    49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
    138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];
    // To remove the need for index wrapping, double the permutation table length
    var perm = new Array(512);
    var gradP = new Array(512);

    // This isn't a very good seeding function, but it works ok. It supports 2^16
    // different seed values. Write something better if you need more seeds.
    module.seed = function (seed) {
        if (seed > 0 && seed < 1) {
            // Scale the seed out
            seed *= 65536;
        }

        seed = Math.floor(seed);
        if (seed < 256) {
            seed |= seed << 8;
        }

        for (var i = 0; i < 256; i++) {
            var v;
            if (i & 1) {
                v = p[i] ^ (seed & 255);
            } else {
                v = p[i] ^ ((seed >> 8) & 255);
            }

            perm[i] = perm[i + 256] = v;
            gradP[i] = gradP[i + 256] = grad3[v % 12];
        }
    };

    module.seed(0);

    /*
    for(var i=0; i<256; i++) {
      perm[i] = perm[i + 256] = p[i];
      gradP[i] = gradP[i + 256] = grad3[perm[i] % 12];
    }*/

    // Skewing and unskewing factors for 2, 3, and 4 dimensions
    var F2 = 0.5 * (Math.sqrt(3) - 1);
    var G2 = (3 - Math.sqrt(3)) / 6;

    var F3 = 1 / 3;
    var G3 = 1 / 6;

    // 2D simplex noise
    module.simplex2 = function (xin, yin) {
        var n0, n1, n2; // Noise contributions from the three corners
        // Skew the input space to determine which simplex cell we're in
        var s = (xin + yin) * F2; // Hairy factor for 2D
        var i = Math.floor(xin + s);
        var j = Math.floor(yin + s);
        var t = (i + j) * G2;
        var x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.
        var y0 = yin - j + t;
        // For the 2D case, the simplex shape is an equilateral triangle.
        // Determine which simplex we are in.
        var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
        if (x0 > y0) { // lower triangle, XY order: (0,0)->(1,0)->(1,1)
            i1 = 1; j1 = 0;
        } else {    // upper triangle, YX order: (0,0)->(0,1)->(1,1)
            i1 = 0; j1 = 1;
        }
        // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
        // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
        // c = (3-sqrt(3))/6
        var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
        var y1 = y0 - j1 + G2;
        var x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords
        var y2 = y0 - 1 + 2 * G2;
        // Work out the hashed gradient indices of the three simplex corners
        i &= 255;
        j &= 255;
        var gi0 = gradP[i + perm[j]];
        var gi1 = gradP[i + i1 + perm[j + j1]];
        var gi2 = gradP[i + 1 + perm[j + 1]];
        // Calculate the contribution from the three corners
        var t0 = 0.5 - x0 * x0 - y0 * y0;
        if (t0 < 0) {
            n0 = 0;
        } else {
            t0 *= t0;
            n0 = t0 * t0 * gi0.dot2(x0, y0);  // (x,y) of grad3 used for 2D gradient
        }
        var t1 = 0.5 - x1 * x1 - y1 * y1;
        if (t1 < 0) {
            n1 = 0;
        } else {
            t1 *= t1;
            n1 = t1 * t1 * gi1.dot2(x1, y1);
        }
        var t2 = 0.5 - x2 * x2 - y2 * y2;
        if (t2 < 0) {
            n2 = 0;
        } else {
            t2 *= t2;
            n2 = t2 * t2 * gi2.dot2(x2, y2);
        }
        // Add contributions from each corner to get the final noise value.
        // The result is scaled to return values in the interval [-1,1].
        return 70 * (n0 + n1 + n2);
    };

    // 3D simplex noise
    module.simplex3 = function (xin, yin, zin) {
        var n0, n1, n2, n3; // Noise contributions from the four corners

        // Skew the input space to determine which simplex cell we're in
        var s = (xin + yin + zin) * F3; // Hairy factor for 2D
        var i = Math.floor(xin + s);
        var j = Math.floor(yin + s);
        var k = Math.floor(zin + s);

        var t = (i + j + k) * G3;
        var x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.
        var y0 = yin - j + t;
        var z0 = zin - k + t;

        // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
        // Determine which simplex we are in.
        var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
        var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
        if (x0 >= y0) {
            if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
            else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
            else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
        } else {
            if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
            else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
            else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
        }
        // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
        // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
        // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
        // c = 1/6.
        var x1 = x0 - i1 + G3; // Offsets for second corner
        var y1 = y0 - j1 + G3;
        var z1 = z0 - k1 + G3;

        var x2 = x0 - i2 + 2 * G3; // Offsets for third corner
        var y2 = y0 - j2 + 2 * G3;
        var z2 = z0 - k2 + 2 * G3;

        var x3 = x0 - 1 + 3 * G3; // Offsets for fourth corner
        var y3 = y0 - 1 + 3 * G3;
        var z3 = z0 - 1 + 3 * G3;

        // Work out the hashed gradient indices of the four simplex corners
        i &= 255;
        j &= 255;
        k &= 255;
        var gi0 = gradP[i + perm[j + perm[k]]];
        var gi1 = gradP[i + i1 + perm[j + j1 + perm[k + k1]]];
        var gi2 = gradP[i + i2 + perm[j + j2 + perm[k + k2]]];
        var gi3 = gradP[i + 1 + perm[j + 1 + perm[k + 1]]];

        // Calculate the contribution from the four corners
        var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
        if (t0 < 0) {
            n0 = 0;
        } else {
            t0 *= t0;
            n0 = t0 * t0 * gi0.dot3(x0, y0, z0);  // (x,y) of grad3 used for 2D gradient
        }
        var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
        if (t1 < 0) {
            n1 = 0;
        } else {
            t1 *= t1;
            n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
        }
        var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
        if (t2 < 0) {
            n2 = 0;
        } else {
            t2 *= t2;
            n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
        }
        var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
        if (t3 < 0) {
            n3 = 0;
        } else {
            t3 *= t3;
            n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
        }
        // Add contributions from each corner to get the final noise value.
        // The result is scaled to return values in the interval [-1,1].
        return 32 * (n0 + n1 + n2 + n3);

    };

    // ##### Perlin noise stuff

    function fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    function lerp(a, b, t) {
        return (1 - t) * a + t * b;
    }

    // 2D Perlin Noise
    module.perlin2 = function (x, y) {
        // Find unit grid cell containing point
        var X = Math.floor(x), Y = Math.floor(y);
        // Get relative xy coordinates of point within that cell
        x = x - X; y = y - Y;
        // Wrap the integer cells at 255 (smaller integer period can be introduced here)
        X = X & 255; Y = Y & 255;

        // Calculate noise contributions from each of the four corners
        var n00 = gradP[X + perm[Y]].dot2(x, y);
        var n01 = gradP[X + perm[Y + 1]].dot2(x, y - 1);
        var n10 = gradP[X + 1 + perm[Y]].dot2(x - 1, y);
        var n11 = gradP[X + 1 + perm[Y + 1]].dot2(x - 1, y - 1);

        // Compute the fade curve value for x
        var u = fade(x);

        // Interpolate the four results
        return lerp(
            lerp(n00, n10, u),
            lerp(n01, n11, u),
           fade(y));
    };

    // 3D Perlin Noise
    module.perlin3 = function (x, y, z) {
        // Find unit grid cell containing point
        var X = Math.floor(x), Y = Math.floor(y), Z = Math.floor(z);
        // Get relative xyz coordinates of point within that cell
        x = x - X; y = y - Y; z = z - Z;
        // Wrap the integer cells at 255 (smaller integer period can be introduced here)
        X = X & 255; Y = Y & 255; Z = Z & 255;

        // Calculate noise contributions from each of the eight corners
        var n000 = gradP[X + perm[Y + perm[Z]]].dot3(x, y, z);
        var n001 = gradP[X + perm[Y + perm[Z + 1]]].dot3(x, y, z - 1);
        var n010 = gradP[X + perm[Y + 1 + perm[Z]]].dot3(x, y - 1, z);
        var n011 = gradP[X + perm[Y + 1 + perm[Z + 1]]].dot3(x, y - 1, z - 1);
        var n100 = gradP[X + 1 + perm[Y + perm[Z]]].dot3(x - 1, y, z);
        var n101 = gradP[X + 1 + perm[Y + perm[Z + 1]]].dot3(x - 1, y, z - 1);
        var n110 = gradP[X + 1 + perm[Y + 1 + perm[Z]]].dot3(x - 1, y - 1, z);
        var n111 = gradP[X + 1 + perm[Y + 1 + perm[Z + 1]]].dot3(x - 1, y - 1, z - 1);

        // Compute the fade curve value for x, y, z
        var u = fade(x);
        var v = fade(y);
        var w = fade(z);

        // Interpolate
        return lerp(
            lerp(
              lerp(n000, n100, u),
              lerp(n001, n101, u), w),
            lerp(
              lerp(n010, n110, u),
              lerp(n011, n111, u), w),
           v);
    };

})(this);

// prop.base

var prop = {
    domain: '', // 'www.melyon.com' 
    loader: {}, //  ver 1.0.01.001  
    noise: {
        simplex2d: function (x, y) { return noise.simplex2(x, y); },
        simplex3d: function (x, y, z) { return noise.simplex3(x, y); },
        perlin2d: function (x, y) { return noise.perlin2(x, y); },
        perlin3d: function (x, y, z) { return noise.perlin2(x, y, z); },

    }, //  ver 1.0.01.002
    $3d: {// ver 1.0.01.004
        geos: [],
        shaders: {}, // ver 1.0.01.005
    },
};


function replaceWithPrevios(th) {
    var ki = 0;
    var thPre = null;
    var thWait = false;
    var arrayb = [], arraya = [];

    _each(th.parentNode.children,
        function (ath) {
            if (!thWait) {
                if (ath == th || ath.id == th.id) {

                    thWait = true;

                    arrayb.push(ath.outerHTML);
                    arraya.push(thPre);
                }
                else {
                    if (def(thPre))
                        arrayb.push(thPre);
                    thPre = ath.outerHTML;
                }
            } else

                arraya.push(ath.outerHTML);
        },
        function () {

            th.parentNode.innerHTML = arrayb.join(' ') + arraya.join(' ');
        })
}

function replaceWithNext(th) {

    var ki = 0;
    var thPre = null;
    var thWait = false;
    var arrayb = [], arraya = [];

    _each_r(th.parentNode.children,
        function (ath) {
            if (!thWait) {
                if (def(ath)) {
                    if (ath == th || ath.id == th.id) {

                        thWait = true;

                        arrayb.push(ath.outerHTML);
                        arraya.push(thPre);
                    }
                    else {

                        arrayb.push(thPre);
                        thPre = ath.outerHTML;
                    }
                }
            } else

                arraya.push(ath.outerHTML);
        },
        function () {

            var s = "";
            s = _each_r(arraya, function (s1, i) {
                if (def(s1))
                    s += s1;
            }, function () { return s; });
            s = _each_r(arrayb, function (s1, i) { if (def(s1)) s += s1; }, function () { return s; });


            th.parentNode.innerHTML = s;
        })
}


// thread


th_ide = 0;
function th_s(f) {
    id = th_ide++;
    waitState += "," + id + ",";
    lastThread = id;
    return id;
}

function th_e(id) {
    endState += "," + id + ",";

    lastThread = 0;
}


function thread(f, tid, e, p, master) {

    if (f != null && f != undefined) {
        function fhelper() {

            f(tid, p, master);
        }
        requestAnimationFrame(fhelper);
    }
}

function th_in(tid) {
    return tid != 0 && endState.indexOf("," + tid + ",") == -1;
}


th_for.prototype = { a: [], i: 0, tid: 0, cid: 0 };


var waitState = "", endState = "";


function th_for(a, f, e) {

    // initialize
    if (a != null && a != undefined) {

        if (def(a.slice))
            this.a = a.slice();
        else
            this.a = a;
        this.i = -1;
        this.f = f;
        this.e = e;
        this.tid = th_s(this.fHelper);
        return this;
    }
}
var th_id = 0;
th_for.prototype = {
    a: [],
    i: 0,
    tid: 0,
    cid: 0,
    id: 0,
    f: null,
    e: null,
    cHelper: function (cid, p, th) {
        th.f(cid, p, th);
        thread(th.fHelper, cid, null, null, th);
    },
    fHelper: function (tid, p, th) {
        if (th.cid != 0 && th_in(th.cid)) {
            thread(th.fHelper, tid, null, null, th);
        }
        else {
            th.i++;
            if (th.i < th.a.length) {
                th.cid = th_s(th.cHelper);
                thread(th.cHelper, th.cid, function () {
                    th_e(th.cid);
                    thread(th.fHelper, th.tid, null, null, th);
                }, { item: th.a[th.i], index: th.i, mid: th.tid }, th);
            }
            else {

                th_e(th.tid);
                th.e(th);
            }
        }
    },
    start: function (ms) {
        var th = this;
        th.id = th_id++;
        if (ms != null && ms != undefined)
            setTimeout(function () { th.start() }, ms);
        else thread(th.fHelper, th.tid, null, null, th);
        return th;
    }
};



function addEffect(sel, css1, css2, css3) {
    all(sel, function (at, i) {

        if (!def(at.classList)) return;

        at.classList._add('animated');
        if (at.attributes.item('class').value.indexOf(css1) == -1 || at.attributes.item('class').value.indexOf(css3) == -1) {
            if (css2 != "")
                at.classList.remove(css2);
            if (css3 != "")
                at.classList.remove(css3);
            if (css1 != "")
                at.classList._add(css1);

        }
        //else {
        //    if (css1 != "")
        //        at.classList.remove(css1);
        //    if (css3 != "")
        //        at.classList.remove(css3);
        //    if (css2 != "")
        //        at.classList._add(css2);
        //}
    });
}


function moveto_fn() {
    if (isMoveing) {

        if (abs(movetoparam.ci - movetoparam.e) < 0.2) {
            isMoveing = false;
            movetoparam.fun(movetoparam.e);
        }
        else {
            movetoparam.ci = movetoparam.ci + (movetoparam.e > movetoparam.ci ? 1.00 : -1.00) * (abs(movetoparam.e - movetoparam.s) / (35));
            movetoparam.fun(movetoparam.ci);
        }

        requestAnimationFrame(moveto_fn);
    }
}
var isMoveing = false;
var movetoparam = { s: 0, e: 0, as: 2, fun: function (v) { }, ci: 0 };

function moveTo(s, e, as, fun) {
    movetoparam = { s: s, e: e, as: as, fun: fun, ci: s };
    if (!isMoveing) { isMoveing = true; moveto_fn(); }
}



