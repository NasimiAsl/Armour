
var createScene = function () {
    BABYLONX.ShaderBuilder.InitializeEngine();
    BABYLONX.GeometryBuilder.InitializeEngine();

    // This creates a basic Babylon Scene object (non-mesh)
    var canvas = first("Canvas");
    var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true });

    var scene = new BABYLON.Scene(engine);

    scene.moveV = 0;
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


    // This creates and positions a free camera (non-mesh)
    camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(-30, 0, 0), scene);
    camera.lowerRadiusLimit = 1.1;

    // This targets the camera to scene origin 
    camera.wheelPrecision *= 5.;
    camera.minZ = 0.001;
    camera.maxZ = 0.1;


    scene.watcher = new BABYLON.ArcRotateCamera("camera1", 3, 3, 3, new BABYLON.Vector3(-30, 0, 0), scene);
    scene.watcher.minZ = 0.1;
    scene.watcher.maxZ = 200000.;
    scene.watcher.upperRadiusLimit = 50000;
    scene.watcher.lowerRadiusLimit = 0.005;


    // This attaches the camera to the canvas
    // scene.watcher.attachControl(canvas, true);

    scene.activeCamera = scene.watcher;


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


    var lastTarget = { x: 1., y: 0., z: 0. };

    var posa = 0.;

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


    engine.runRenderLoop(function () {
        scene.render();
    });

    __log('Scene Initialized.')

    return scene;
}; 
