local = {
    prepare: function (eng, setting) { 
         

        eng.initCamera = function (scene, setting) {

            // This creates and positions a free camera (non-mesh)
            var camera = new BABYLON.ArcRotateCamera("camera1", 3, 3, 3, new BABYLON.Vector3(0, 5, -10), scene);

            // This targets the camera to scene origin
            camera.setTarget(BABYLON.Vector3.Zero());

            camera.minZ = 0.01;
            camera.maxZ = 1000.;

            camera.lowerRadiusLimit = 0.05;
            camera.upperRadiusLimit = 100.;


            return camera;
        };

        eng.keyFrame = function (time) {

            if (time % 100 < 1) {
                var width = eng.canvas.offsetWidth;
                var height = eng.canvas.offsetHight;
                if (eng.width != width || eng.hieght != height) {
                    eng.width = width;
                    eng.hieght = height;
                    eng.engine.resize();
                }
            }

        };


        return setting;
    }
}
 