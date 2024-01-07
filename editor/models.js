GB.models = {
    sample: function (setting, geo) {
        var rim = new GB.Rims();
        rim
            .PushSquare(geo, { sf: 'xz', w: 0, d: 0, y: 0.5 })
            .PushSquare(geo, { sf: 'xz', w: 1, d: 1, y: 0.5 }).Connect(geo)
            .PushSquare(geo, { sf: 'xz', w: 1, d: 1, y: 0.5 })
            .PushSquare(geo, { sf: 'xz', w: 1, d: 1, y: -0.5 }).Connect(geo)
            .PushSquare(geo, { sf: 'xz', w: 1, d: 1, y: -0.5 })
            .PushSquare(geo, { sf: 'xz', w: 0, d: 0, y: -0.5 }).Connect(geo);

    },
    cube: function (st, geo) {
        var rim = new GB.Rims();
        rim
            .PushSquare(geo, { sf: 'xz', w: 0, d: 0,       x:st.x, z:st.z, y: st.d/0.5 })
            .PushSquare(geo, { sf: 'xz', w: st.w, d: st.h, x:st.x, z:st.z, y:  st.d/0.5 }).Connect(geo)
            .PushSquare(geo, { sf: 'xz', w: st.w, d: st.h, x:st.x, z:st.z, y: st.d/0.5 })
            .PushSquare(geo, { sf: 'xz', w: st.w, d: st.h, x:st.x, z:st.z, y: -st.d/0.5 }).Connect(geo)
            .PushSquare(geo, { sf: 'xz', w: st.w, d: st.h, x:st.x, z:st.z, y: -st.d/0.5 })
            .PushSquare(geo, { sf: 'xz', w: 0, d: 0,       x:st.x, z:st.z, y: -st.d/0.5 }).Connect(geo);

    },
    column: function (st, geo) {
        var rim = new GB.Rims();
        rim  
            .PushCircle(geo, {s:st.s, sf: 'xy', w: st.w, d: st.h, x:st.x, y:st.y, z: st.d  })
            .PushCircle(geo, {s:st.s, sf: 'xy', w: st.w, d: st.h, x:st.x, y:st.y, z: 0. }).Connect(geo) ;

    }, 
    lineBuilder : function (setting /*{seg:number}*/, geo) {

        var p ;  
        for(var i=1;i<=setting.pts.length-1;i++){
          p = setting.pts[i];
          p.o =  setting.pts[i-1];
          if(!p.c)
          GB.MakeFace(geo,
                [
                    { x: p.x, y: p.y, z: p.z },
                    { x:  p.x , y: p.y, z: p.z },
                    { x:  p.o.x , y:  p.o.y, z: p.o.z} 
                ]
           ,{
                flip: true,
                faceUVMap: "012",
                Face3Point:true, 
           }); 
        } 
    },
    sphare: function (option /*{seg:number}*/, geo) {

        
           var part_Sphare = new GB.Part()
                .Create(function (option, custom) {

                  

                    var setting = {};

                    setting.s = (option.seg.valueOf() * 1);
                    setting.radius = (option.radius.valueOf() * 1);

                    var rim = new GB.Rims();

                    for (var j = 0; j < setting.s; j++) {
                        rim.UV(function (p, i, n) {
                            return { u: 1. - j / n, v: i / n };
                        }).PushRim(geo, {
                            count: setting.s,
                            point: function (p, i) {
                                count = setting.s - 1;

                                p.x = sin(i * deg * 180. / count) * setting.radius;
                                p.y = cos(i * deg * 180. / count) * setting.radius;

                                p = r_y(p, j * 360. * deg / count);

                                return custom(p, option);
                            }
                        });

                        if (j > 0)
                            rim.Connect(geo, null, null, setting.flip);

                    }



                }).Custom(function (p, op) {
                    return p_ts(p, def(option.ts, {}));
                });
      

       part_Sphare.New(option); 

    },
    faceXZ: function (setting, geo) {
        var rim = new GB.Rims().UV(function (p, i, s) { return { u: 0, v: i / s } }).PushRim(geo, GB.rims.line2P({
            p1: { x: setting.w * 0.5, y: 0, z: setting.h * 0.5 },
            p2: { x: -setting.w * 0.5, y: 0, z: setting.h * 0.5 }
        }))
            .UV(function (p, i, s) { return { u: 1, v: i / s } }).PushRim(geo, GB.rims.line2P({
                p1: { x: setting.w * 0.5, y: 0, z: -setting.h * 0.5 },
                p2: { x: -setting.w * 0.5, y: 0, z: -setting.h * 0.5 }
            })).Connect(geo, null, null, setting.flip);
    },
    faceXY: function (setting, geo) {
        var rim = new GB.Rims().UV(function (p, i, s) { return { u: 0, v: i / s } }).PushRim(geo, GB.rims.line2P({
            p1: { x: setting.w * 0.5, z: 0, y: setting.h * 0.5 },
            p2: { x: -setting.w * 0.5, z: 0, y: setting.h * 0.5 }
        }))
            .UV(function (p, i, s) { return { u: 1, v: i / s } }).PushRim(geo, GB.rims.line2P({
                p1: { x: setting.w * 0.5, z: 0, y: -setting.h * 0.5 },
                p2: { x: -setting.w * 0.5, z: 0, y: -setting.h * 0.5 }
            })).Connect(geo, null, null, setting.flip);
    },
    helper_surface_pow: function (setting /*{seg:number}*/, geo) {
        if (!geo) return {
            seg_segment_1_100: 20,
            size: 10,
            dx_arcx_bol: true,
            dz_arcz_bol: true,
            nx_arcnx_bol: true,
            nz_arcnz_bol: true,
            n_power: 1.0,
            l_level: 1.0
        };

        ind = 0;

        var size = setting.size;
        var rad = setting.rad;
        var rim = new GB.Rims();
        var cus = def(setting.cus, function (p, op) {

            var x = p.x;
            var z = p.z;
            if (setting.dz && z > 0) z = 0;
            if (setting.dx && x > 0) x = 0;
            if (setting.nz && z < 0) z = 0;
            if (setting.nx && x < 0) x = 0;

            var v = pow(pow(x / size) + pow(z / size), 1);

            p.y = Math.sign(v) * rad * pow(abs(v), def(setting.n, 1.)) * def(setting.l, 1.);

            p.y = max(-size * 0.5, p.y);

            return p;
        });


        for (var j = 0; j <= setting.seg; j++) {

            rim.UV(function (p, i, s) { return { u: i / setting.seg, v: j / setting.seg }; });
            rim.PushRim(geo, {
                count: setting.seg + 1,
                point: function (p, i) {
                    p.x = size * i / setting.seg - size * 0.5;
                    p.z = size * j / setting.seg - size * 0.5;
                    return cus(p);
                }
            });
            rim.Connect(geo);

        }

    }
};

GB.colorMats = [];
GB.line = function(pts,co,scene){
    if(!GB.colorMats[co.r+'!'+co.g+'!'+co.b]){
        GB.colorMats[co.r+'!'+co.g+'!'+co.b] = 
        new BABYLONX.ShaderBuilder().Solid(co).Wired().BuildMaterial(scene);
    }
    var ms = armour.prototype.maker({pts:pts},lineBuilder).toMesh(scene);
    ms.material = GB.colorMats[co.r+'!'+co.g+'!'+co.b];
    return ms;
};


GB.path3D = function(  p1, ph1, p2, ph2, arc ) {

    var ps = []; 
    for(var i =(arc.start?0:1);i<=arc.seg -(arc.end?1:0);i++){
        
                var v = i / (arc.seg);
                var ip = {
                    x: p1.x * v + (1. - v) * p2.x,
                    y: p1.y * v + (1. - v) * p2.y,
                    z: p1.z * v + (1. - v) * p2.z,
                };

                var v2, v3;
                if (arc.mode && arc.mode == 'sin') {
                    v2 = v * pow(sin(v * PI), def(arc.level, 1.));
                    v3 = (1. - v) * pow(sin((1. - v) * PI), def(arc.level, 1.));
                } else {
                    var v2 = v * pow(pow(1. - pow(v * 2 - 1, 2.0), 0.5), def(arc.level, 1.));
                    var v3 = (1. - v) * pow(pow(1. - pow((1. - v) * 2 - 1, 2.0), 0.5), def(arc.level, 1.));
                }

                var p = {v:v,x : ip.x + ph1.x * v2 * def(arc.power, 1.) + ph2.x * v3 * def(arc.power, 1.),
                    y : ip.y + ph1.y * v2 * def(arc.power, 1.) + ph2.y * v3 * def(arc.power, 1.),
                    z : ip.z + ph1.z * v2 * def(arc.power, 1.) + ph2.z * v3 * def(arc.power, 1.) };

           if(arc.f){
                 try{ p = arc.f(p,i ,norm(cln(p,null,ip )) ,  norm({
                        x: p.x-(p1.x+p2.x)*0.5 ,
                        y: p.y-(p1.y+p2.y)*0.5 ,
                        z: p.z-(p1.z+p2.z)*0.5  }),arc.seg);
                 }catch(e){}
                  }
            

             ps.push(p);
            
    }
return ps; 
};

GB.line_cach = [];

 

GB.drawPath3D2Point = function(  p, p1,op) {

    op = def(op,{});

    var p_1 = p.p1.position;
    if (p.solid) {
        p_1 = { x: 0, y: 0, z: 0 }
    }

    var p_2 = p1.p2.position;

    if (p2.solid) {
        p_2 = { x: 0, y: 0, z: 0 }
    }  

    // var st = js('function(p,i,a,b,c){'+def(p.func,'return p;').replaceAll('\n','')+'}');
    var st = function(p){ return p;}


    var ps = path3D(p.position, p_1, p1.position, p_2,
        { f:st,seg: def(p.seg,32), mode: def(op.mode,'sin') , power: def(op.power,1), level: def(op.level,1) });
 

    if(p.line) p.line.dispose();

    var ps_1 = [p1.position];
    ps_1 = ps_1.concat(ps); 

    p.line = line(ps_1,{r:1.,g:sin(p.position.x)*0.5+0.5,b:sin(p.position.z)*0.5+0.5},scene); 

};