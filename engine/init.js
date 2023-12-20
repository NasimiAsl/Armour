var armour = function (canvas,camera) {
    this.canvas = canvas;
    this.camera = def(camera,this.camera);

 }
armour.prototype = {
    scene: null,
    canvas: null,
    engine: null,

    maker: function (scene, op, builder, mat, init) {

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
    },
    init: function () {

        var scene = createScene();
        scene.clearColor = new BABYLON.Color4(0.15, 0.0, 0.25, 1.);

        requestAnimationFrame(function () {

        });

    },
    camera: function () {
        var scene = this.scene;
        // This creates and positions a free camera (non-mesh)
        camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(-30, 0, 0), scene);
        camera.lowerRadiusLimit = 1.1;

        // This targets the camera to scene origin 
        camera.wheelPrecision *= 5.;
        camera.minZ = 0.001;
        camera.maxZ = 0.1;
    },
    create: function () {
        BABYLONX.ShaderBuilder.InitializeEngine();
        BABYLONX.GeometryBuilder.InitializeEngine();

        // This creates a basic Babylon Scene object (non-mesh)
      
        this.engine = new BABYLON.Engine(this.canvas, true, { preserveDrawingBuffer: true });

        this.scene = new BABYLON.Scene(this.engine);

        var scene = this.scene;

        var time = 0;

        scene.keys = "";
        scene.keyD = function (event) {
            var k = ',' + event.keyCode + ',';
            scene.keys = scene.keys.replaceAll(k, '') + k;
            //scene.alpha_view = scene.activeCamera.alpha;

            scene.KeyShift = event.shiftKey;

            if (event.keyCode == 87) scene.KeyW = 1;
            if (event.keyCode == 83) scene.KeyS = 1;
            if (event.keyCode == 65) scene.KeyA = 1;
            if (event.keyCode == 68) scene.KeyD = 1;
            if (event.keyCode == 81) scene.KeyQ = 1;
            if (event.keyCode == 69) scene.KeyE = 1;
            if (event.keyCode == 38) scene.KeyUp = 1;
            if (event.keyCode == 40) scene.KeyDown = 1;
            if (event.keyCode == 37) scene.KeyLeft = 1;
            if (event.keyCode == 39) scene.KeyRight = 1;
            if (event.keyCode == 32) scene.KeySpace = 1;
            if (event.keyCode == 13) scene.KeyEnter = 1;
            if (event.keyCode == 82) scene.KeyR = 1;
            if (event.keyCode == 84) scene.KeyT = 1;

        }

        scene.keyU = function (event) {
            var k = ',' + event.keyCode + ',';
            scene.keys = scene.keys.replaceAll(k, '');

            scene.KeyShift = event.shiftKey;

            scene.key = event.key;

            if (event.keyCode == 87) scene.KeyW = 0;
            if (event.keyCode == 83) scene.KeyS = 0;
            if (event.keyCode == 65) scene.KeyA = 0;
            if (event.keyCode == 68) scene.KeyD = 0;
            if (event.keyCode == 81) scene.KeyQ = 0;
            if (event.keyCode == 69) scene.KeyE = 0;
            if (event.keyCode == 38) scene.KeyUp = 0;
            if (event.keyCode == 40) scene.KeyDown = 0;
            if (event.keyCode == 37) scene.KeyLeft = 0;
            if (event.keyCode == 39) scene.KeyRight = 0;
            if (event.keyCode == 32) scene.KeySpace = 0;
            if (event.keyCode == 13) scene.KeyEnter = 0;
            if (event.keyCode == 82) scene.KeyR = 0;
            if (event.keyCode == 84) scene.KeyT = 0;

        }

        scene.clearColor = new BABYLON.Color4(0., 0., 0., 1.);


        keyCodeCheck = 0;
        kyCheck = function (ks) {
            if (keyCodeCheck) return 0;
            var f = 1;
            for (var i in ks) {
                if (scene.keys.indexOf(',' + ks[i] + ',') == -1) {
                    f = 0;
                }
            }
            if (f == 1) {
                keyCodeCheck = 1;
                setTimeout(() => {
                    keyCodeCheck = 0;
                }, 300);
            }
            return f;
        }

        scene.registerBeforeRender(function () {

            time++;

            if (scene.keyFrame)
                scene.keyFrame(time);

            new BABYLONX.ShaderMaterialHelper().SetUniforms(
                scene.meshes,
                scene.watcher.position,
                scene.watcher._currentTarget,
                { x: 0, y: 0 },
                { x: 100, y: 100 },
                time);

        });

        this.engine.runRenderLoop(function () {
            scene.render();
        });
        return scene;
    }
};