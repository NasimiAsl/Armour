local = { 
    prepare: function (armour, setting) {
        armour.initCamera = function (scene,setting) {

            // This creates and positions a free camera (non-mesh)
            var camera = new BABYLON.ArcRotateCamera("camera1", 3, 3, 3, new BABYLON.Vector3(0, 5, -10), scene);

            // This targets the camera to scene origin
            camera.setTarget(BABYLON.Vector3.Zero());
            camera.minZ = 0.01;
            camera.maxZ = 1000.;

            

            return camera;
        };

        armour.keyFrame = function (time) {

            if(armour.camera){

             armour.locker.position.x = armour.camera._currentTarget.x;
            armour.locker.position.y = armour.camera._currentTarget.y;
            armour.locker.position.z = armour.camera._currentTarget.z;
            armour.locker.lookAt(armour.camera.position); 
            } 
        };


        return setting;
    },

    init: function (armour) {
        var scene = armour.scene;

        armour.camera.attachControl(armour.canvas, true);

        armour.locker =  armour.maker({w:100,h:100},GB.models.faceXY,function(me){

            me.Transparency().InLine(`

            float li = pow(cos(0.2*3.14159265*pos.x),9.0); 
            li = max(li , pow(cos(0.2*3.14159265*pos.y),9.0));
            if(li > 0.95 ) li = (li-0.95)*20.0; else li = 0.;

            float len = 1.-min(1.,max(0.,length(wps- camera)/20.)); 

            float li2 = 0.;
            
            if(len >0.){
                li2 = pow(cos(10.*0.2*3.14159265*pos.x),9.0); 
                li2 = max(li2 , pow(cos(10.*0.2*3.14159265*pos.y),9.0)); 
                if(li2 > 0.95 ) li2 = (li2-0.95)*20.0; else li2 = 0.; 
                li2 *=len;  
            } 

            float len1 = 1.-min(1.,max(0.,length(wps- camera)/5.)); 

            float li3 = 0.;
            
            if(len1 >0.){
                li3 = pow(cos(100.*0.2*3.14159265*pos.x),9.0); 
                li3 = max(li3 , pow(cos(100.*0.2*3.14159265*pos.y),9.0)); 
                if(li3 > 0.95 ) li3 = (li3-0.95)*20.0; else li3 = 0.; 
                li3 *=len;  
            }  
           
            
            result = vec4( vec3(0.5,0.6,0.8),mix(li*0.5+li2*0.2,li2*0.2,li)+li3*0.1);

            `).Back();
            return me;
        });

        
       

    },
    addFixedHelper: function (scene) {

    }
};