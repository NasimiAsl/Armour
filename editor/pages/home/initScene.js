window.__log = function (m, c) { first('#log').innerHTML = m; };
local = {
    updateFaceHelperByCamera: function (camera, locker) {

        if (locker) {

            locker.position.x = camera._currentTarget.x;
            locker.position.y = camera._currentTarget.y;
            locker.position.z = camera._currentTarget.z;

            locker.rotation.y = -90 * deg - camera.alpha;
            locker.rotation.x = -camera.beta;
        }

        /*scene.camfaceHelper.scaling.x = eng.camera.radius / 20.;
        scene.camfaceHelper.scaling.y = eng.camera.radius / 20.;
        scene.camfaceHelper.scaling.z = eng.camera.radius / 20.; */

    },
    objRotationXY: function (eng, obj, dx, dy, start) {

        var th = this;
        if (start) {
            obj.oldRotation = {
                x: obj.rotation.x,
                y: obj.rotation.y,
                z: obj.rotation.z
            };
        }

        obj.rotation.x = obj.oldRotation.x - dx * 0.01;
        obj.rotation.y = obj.oldRotation.y - dy * 0.01;

         

    },
    cameraRotation: function (eng, dx, dy, start) {

        var th = this;
        if (start) {
            th.oldRotation = {
                a: eng.camera.alpha,
                b: eng.camera.beta,
                r: eng.camera.radius
            };
        }

        if(start) return;

        eng.camera.alpha = th.oldRotation.a - dx * 0.01;
        eng.camera.beta = min(PI, max(0, th.oldRotation.b - dy * 0.01));

        th.updateFaceHelperByCamera(eng.camera, eng.locker);


    }, 
    cameraRadiusChange: function (eng, dx, dy, start) {

        var th = this;
        if (start) {
            th.oldRotation = {
                a: eng.camera.alpha,
                b: eng.camera.beta,
                r: eng.camera.radius,
                f: eng.camera.fov
            };
        }

        if(start) return; 

        eng.camera.radius = th.oldRotation.r - dy * (0.03   );
        eng.camera.fov = min(1.6,max(0.3 , th.oldRotation.f -  dx * (0.01   )*0.1 ));
      
        th.updateFaceHelperByCamera(eng.camera, eng.locker); 

    },
    objMovement: function (eng, obj, dx, dy, start, dep, flat) {

        var th = this;
        if (start) {
            obj.oldMovment = {
                x: obj.position.x,
                y: obj.position.y,
                z: obj.position.z
            };
        }
        

        if (!dep) {

            var dt = {
                x: eng.locker.top.absolutePosition.x - eng.locker.absolutePosition.x,
                y: eng.locker.top.absolutePosition.y - eng.locker.absolutePosition.y,
                z: eng.locker.top.absolutePosition.z - eng.locker.absolutePosition.z
            };
            var dl = {
                x: eng.locker.left.absolutePosition.x - eng.locker.absolutePosition.x,
                y: eng.locker.left.absolutePosition.y - eng.locker.absolutePosition.y,
                z: eng.locker.left.absolutePosition.z - eng.locker.absolutePosition.z
            };
            obj.position.x = obj.oldMovment.x - 0.01 * (dy * dl.x - dx * dt.x);
            obj.position.y = obj.oldMovment.y - 0.01 * (dy * dl.y - dx * dt.y);
            obj.position.z = obj.oldMovment.z - 0.01 * (dy * dl.z - dx * dt.z);

        } else {

            var dd = {
                x: eng.locker.depth.absolutePosition.x - eng.locker.absolutePosition.x,
                y: eng.locker.depth.absolutePosition.y - eng.locker.absolutePosition.y,
                z: eng.locker.depth.absolutePosition.z - eng.locker.absolutePosition.z
            };

            obj.position.x = obj.oldMovment.x - 0.01 * (dy * dd.x);
            obj.position.y = obj.oldMovment.y - 0.01 * (dy * dd.y);
            obj.position.z = obj.oldMovment.z - 0.01 * (dy * dd.z);

        }

      


    },
    cameraMovement: function (eng, dx, dy, start) {

        var th = this;
        if (start) {
            th.oldMovment = {
                x: eng.camera._currentTarget.x,
                y: eng.camera._currentTarget.y,
                z: eng.camera._currentTarget.z
            };
        }

        if(start) return;

        var dt = {
            x: eng.locker.top.absolutePosition.x - eng.locker.absolutePosition.x,
            y: eng.locker.top.absolutePosition.y - eng.locker.absolutePosition.y,
            z: eng.locker.top.absolutePosition.z - eng.locker.absolutePosition.z
        };
        var dl = {
            x: eng.locker.left.absolutePosition.x - eng.locker.absolutePosition.x,
            y: eng.locker.left.absolutePosition.y - eng.locker.absolutePosition.y,
            z: eng.locker.left.absolutePosition.z - eng.locker.absolutePosition.z
        };


        eng.camera._currentTarget.x = th.oldMovment.x + 0.01 * (dy * dl.x - dx * dt.x);
        eng.camera._currentTarget.y = th.oldMovment.y + 0.01 * (dy * dl.y - dx * dt.y);
        eng.camera._currentTarget.z = th.oldMovment.z + 0.01 * (dy * dl.z - dx * dt.z);



        th.updateFaceHelperByCamera(eng.camera, eng.locker);


    },


    init: function (eng) {


        eng.maker({}, GB.models.sample, function (me) { me.Light({ phonge: 1 }); return me });

        this.applyEvent(eng, eng.scene);
        // eng.camera.attachControl(eng.canvas, true);

        eng.locker = eng.maker({ w: 100, h: 100 }, GB.models.faceXZ);
        eng.locker.visibility = 0.;
        eng.locker.isPickable = false;

        eng.grid = eng.maker({ w: 100, h: 100 }, GB.models.faceXZ, function (me) {

            me.Transparency().InLine(`

            float li =  pow(cos(0.2*3.14159265*pos.x),10.0); 
            li = max(li ,  pow(cos(0.2*3.14159265*pos.z),10.0));
            if(li > 0.975 ) li = (li-0.975)*20.0; else li = 0.;

            float len = 1.-min(1.,max(0.,length(wps- camera)/20.)); 
            float len2 = 1.-min(1.,max(0.,length(wps- camera)/50.)); 
            li*=len2*0.5;

            float li2 = 0.;
            
            if(len >0.){
                li2 = pow(cos(10.*0.2*3.14159265*pos.x),9.0); 
                li2 = max(li2 , pow(cos(10.*0.2*3.14159265*pos.z),9.0)); 
                if(li2 > 0.95 ) li2 = (li2-0.95)*20.0; else li2 = 0.; 
                li2 *=len;  
            }   
            
            result = vec4( vec3 (li+0.5 ,0.5 ,0.5+0.5*li2),  
                 0.5*max(li,li2)   );

            `).Back();
            return me;
        });
        eng.grid.isPickable = false;


        eng.locker.top = new BABYLON.Mesh();
        eng.locker.left = new BABYLON.Mesh();
        eng.locker.depth = new BABYLON.Mesh();

        eng.locker.top.isPickable = false;
        eng.locker.left.isPickable = false;
        eng.locker.depth.isPickable = false;

        eng.locker.top.parent = eng.locker;
        eng.locker.top.position.x = 1;

        eng.locker.left.parent = eng.locker;
        eng.locker.left.position.z = 1;

        eng.locker.depth.parent = eng.locker;
        eng.locker.depth.position.y = 1;

        this.cameraRotation(eng, 0, 0, 1);
        this.cameraMovement(eng, 0, 0, 1);

        __log('scene is Ready.');


    },
    addFixedHelper: function (scene) {

    }
};