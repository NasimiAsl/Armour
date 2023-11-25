var maker = function (scene, op, builder, mat, init) {

    var gb = new BABYLONX.Geometry(GB.GeometryBase(op, builder, op.custom)).toMesh(scene);

    gb.material = new BABYLONX.ShaderBuilder()

        .Func(function (me) {
            me.Setting.FragmentWorld = true;
            me.Setting.VertexWorld = true;
            me.Setting.Look = true;

            me = me.InLine(`

        vec3 wps = vec4(world*vec4(pos,1.)).xyz;
        vec3 wnm = mat3(world)*nrm;
        float wfs =dot(wnm, normalize(camera-wps));
        float wfs2 = pow(  wfs*0.5,3. )*2.0;  

            
        `);

            return mat(me);
        }).BuildMaterial(scene);

    if (init) init(gb, gb.material);

    gb.material.setArray4('suns', scene.getSuns());

    return gb;
}

window.rootUps = [];
window.rootMoves = [];


window.winMove = function (evt) {

    for (var ie in rootMoves) {
        rootMoves[ie](evt);
    }

}

window.winUp = function (evt) {

    for (var ie in rootUps) {
        rootUps[ie](evt);
    }

}

/*
onkeydown="if(scene)scene.keyD(event)" onkeyup="if(scene)scene.keyU(event)" ontouchmove="event.preventDefault()"
*/


function init(){ 

    var scene = createScene();
    scene.clearColor = new BABYLON.Color4(0.15,0.0,0.25,1.);

    __log('Engine Ready.');
    requestAnimationFrame(function() {
        __log(' ')
    }); 

}; init();