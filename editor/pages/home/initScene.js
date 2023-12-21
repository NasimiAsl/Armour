local = {
    updateFaceHelperByCamera: function (camera, locker) {



        if (locker) {



            locker.position.x = camera._currentTarget.x;
            locker.position.y = camera._currentTarget.y;
            locker.position.z = camera._currentTarget.z;

            locker.rotation.y = -90 * deg - camera.alpha;
            locker.rotation.x = - camera.beta;
        }

        /*scene.camfaceHelper.scaling.x = armour.camera.radius / 20.;
        scene.camfaceHelper.scaling.y = armour.camera.radius / 20.;
        scene.camfaceHelper.scaling.z = armour.camera.radius / 20.; */

    },
    applyEvent: function (scene) { 

        console.log(scene);
 

        var clickDown = {}; 
     
        scene.onPointerDown = function (d, p) { 
            

        };

        scene.onPointerUp = function (d, p) {
 

        }; 

        scene.onPointerMove = function (d, p) {
 

        };

    },
    prepare: function (armour, setting) {

        var th = this;

        armour.initCamera = function (scene, setting) {

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

        armour.keyFrame = function (time) { 



            if (armour.camera) {

                armour.camera.wheelPrecision = (armour.camera.radius > 30 ? 200 : 200.) / armour.camera.radius;

                th.updateFaceHelperByCamera(armour.camera, armour.locker);
            }
        };


        return setting;
    },

    init: function (armour) {
         

        armour.maker({}, GB.models.sample, function (me) { me.Light({ phonge: 1 }); return me });

        this.applyEvent( armour.scene);
        // armour.camera.attachControl(armour.canvas, true);

        armour.locker = armour.maker({ w: 100, h: 100 }, GB.models.faceXZ, function (me) {

            me.Transparency().InLine(`

            float li = pow(cos(0.2*3.14159265*pos.x),9.0); 
            li = max(li , pow(cos(0.2*3.14159265*pos.z),9.0));
            if(li > 0.95 ) li = (li-0.95)*20.0; else li = 0.;

            float len = 1.-min(1.,max(0.,length(wps- camera)/20.)); 

            float li2 = 0.;
            
            if(len >0.){
                li2 = pow(cos(10.*0.2*3.14159265*pos.x),9.0); 
                li2 = max(li2 , pow(cos(10.*0.2*3.14159265*pos.z),9.0)); 
                if(li2 > 0.95 ) li2 = (li2-0.95)*20.0; else li2 = 0.; 
                li2 *=len;  
            } 

            float len1 = 1.-min(1.,max(0.,length(wps- camera)/5.)); 

            float li3 = 0.;
            
            if(len1 >0.){
                li3 = pow(cos(100.*0.2*3.14159265*pos.x),9.0); 
                li3 = max(li3 , pow(cos(100.*0.2*3.14159265*pos.z),9.0)); 
                if(li3 > 0.95 ) li3 = (li3-0.95)*20.0; else li3 = 0.; 
                li3 *=len;  
            }  

            float len2 = 1.-min(1.,max(0.,length(wps- camera)/0.4)); 

            float li4 = 0.;
            
            if(len2 >0.){
                li4 = pow(cos(1000.*0.2*3.14159265*pos.x),9.0); 
                li4 = max(li4 , pow(cos(1000.*0.2*3.14159265*pos.z),9.0)); 
                if(li4 > 0.95 ) li4 = (li4-0.95)*20.0; else li4 = 0.; 
                li4 *=len;  
            }  
           
            
            result = vec4( vec3(0.5+0.5*li4 ,0.5+0.5*li3,0.5+0.5*li2),  
              0.5*(mix(li*0.5+li2*0.2,li2*0.2,li)*(1.-li4)+li3*0.1+li4*0.2));

            `).Back();
            return me;
        });




    },
    addFixedHelper: function (scene) {

    }
};