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
                var height = eng.canvas.offsetHeight;
                if (eng.width != width || eng.hieght != height) {
                    eng.width = width;
                    eng.hieght = height;
                    eng.engine.resize();
                }
            }

        };


        return setting;
    },
    applyEvent: function (eng, scene) {

        var th = this;

        var clickDown = {};

        scene.frame = function (t) {

            if (scene.KeyF1 != scene.KeyF1Called) {
                scene.KeyF1Called = scene.KeyF1;

                if (scene.KeyF1 && eng.locker) {

                    scene.lockerMode = !scene.lockerMode;

                    if (scene.lockerMode) {
                        eng.locker.visibility = 1.;
                        eng.grid.material.flagUp(2);
                        eng.locker.isPickable = true;
                    } else {
                        eng.locker.visibility = 0.;
                        eng.grid.material.flagDown(2);
                        eng.locker.isPickable = false;
                    }
                }
            }

        };

        scene.click = function (x, y, p) {




            if (main3D.helper_click)
                main3D.helper_click(x, y, p);
        };

        scene.onPointerDown = function (d, p) {

            clickDown.x = event.offsetX;
            eng.w = eng.canvas.offsetWidth;
            eng.h = eng.canvas.offsetHeight;
            clickDown.y = event.offsetY;
            clickDown.d = 1;
            clickDown.t = new Date().getTime();
            clickDown.b = event.button;

            if (!eng.scene.KeyCtrl && !eng.scene.KeyShift && !eng.scene.KeyAlt &&
                clickDown.d && clickDown.b == 0) {

                clickDown.camRotation = 1;
                th.cameraRotation(eng, clickDown.dx, clickDown.dy, true);
            }
            else if (!eng.scene.KeyCtrl && eng.scene.KeyShift && !eng.scene.KeyAlt &&
                clickDown.d && clickDown.b == 0) {

                clickDown.camRadiusChange = 1;
                th.cameraRadiusChange(eng, clickDown.dx, clickDown.dy, true);
            }

            if (!eng.scene.KeyCtrl &&
                clickDown.d && clickDown.b == 2) {

                clickDown.camMovement = 1;
                th.cameraMovement(eng, clickDown.dx, clickDown.dy, true);
            }

            scene.prepareForClick();
            var p2 = scene.pick(scene.pointerX, scene.pointerY);

            if (p2.hit) {

                if (eng.scene.KeyCtrl &&
                    clickDown.d && clickDown.b == 2) {

                    clickDown.objMovement = p2.pickedMesh;

                    clickDown.objMovement.ocmd = th.rollCalc('ts', clickDown.objMovement, {});

                    th.objMovement(eng, clickDown.objMovement, clickDown.dx, clickDown.dy, true);
                }
                else if (p2.pickedMesh.dragable) {

                    clickDown.objDraged = p2.pickedMesh;
                    p2.pickedMesh.isPickable = false;


                    /// update all line helpers  

                }
            }

        };

        scene.prepareForDrag = function(){  
             if(scene.preparedForDrag) return;
            scene.preparedForDrag = 1;
            for(var i in scene.meshes){
                scene.meshes[i].isPickable =  scene.meshes[i].isHelper;
            }
        };

        scene.prepareForClick = function(){ 
             if(scene.preparedForClick) return;  
            scene.preparedForClick = 1;
            for(var i in scene.meshes){
                scene.meshes[i].isPickable =  scene.meshes[i].isPoint;
            }
        };

        scene.onPointerMove = function (d, p) {

            clickDown.dx = event.offsetX - clickDown.x;
            clickDown.dy = event.offsetY - clickDown.y;
            clickDown.mx = event.offsetX;
            clickDown.my = event.offsetY;
            clickDown.dt = new Date().getTime() - clickDown.t;

            clickDown.m = 1;

            if (clickDown.camRotation)
                th.cameraRotation(eng, clickDown.dx, clickDown.dy);

            if (clickDown.camRadiusChange)
                th.cameraRadiusChange(eng, clickDown.dx, clickDown.dy);

            if (clickDown.camMovement)
                th.cameraMovement(eng, clickDown.dx, clickDown.dy);

            if (clickDown.objMovement)
                th.objMovement(eng, clickDown.objMovement, clickDown.dx, clickDown.dy, null, eng.scene.KeyShift);

            if (clickDown.objDraged) {

                scene.prepareForDrag();
                
                var p2 = scene.pick(scene.pointerX, scene.pointerY);
                if (p2.hit) {

                    var par_pos = { x: 0, y: 0, z: 0 };

                    if (clickDown.objDraged.parent) {
                        par_pos = {
                            x: clickDown.objDraged.parent.absolutePosition.x,
                            y: clickDown.objDraged.parent.absolutePosition.y,
                            z: clickDown.objDraged.parent.absolutePosition.z
                        };

                        if (clickDown.objDraged.parent.updateLines)
                            clickDown.objDraged.parent.updateLines(clickDown.objDraged.parent);
                    }

                    if( clickDown.objDraged.isSub && !scene.KeyCtrl ){ 

                        if(clickDown.objDraged.left){
                            clickDown.objDraged.parent.p2.position.x = -p2.pickedPoint.x + par_pos.x;
                            clickDown.objDraged.parent.p2.position.y = -p2.pickedPoint.y + par_pos.y;
                            clickDown.objDraged.parent.p2.position.z = -p2.pickedPoint.z + par_pos.z;
                        }else {
                            
                            clickDown.objDraged.parent.p1.position.x = -p2.pickedPoint.x + par_pos.x;
                            clickDown.objDraged.parent.p1.position.y = -p2.pickedPoint.y + par_pos.y;
                            clickDown.objDraged.parent.p1.position.z = -p2.pickedPoint.z + par_pos.z; 
                        }

                    }

                    clickDown.objDraged.position.x = p2.pickedPoint.x - par_pos.x;
                    clickDown.objDraged.position.y = p2.pickedPoint.y - par_pos.y;
                    clickDown.objDraged.position.z = p2.pickedPoint.z - par_pos.z;

                    clickDown.camRotation = 0;
                    clickDown.camMovement = 0;
                    clickDown.camRadiusChange = 0;

                }
            }


        };

        scene.onPointerUp = function (d, p) {

            if (!clickDown.objMovement &&
                event.button == 0 &&
                clickDown.d && (new Date().getTime() - clickDown.t < 300)) {

                    scene.prepareForDrag();

                 var p2 = scene.pick(scene.pointerX, scene.pointerY);
                scene.click(clickDown.x, clickDown.y, p2);
            }

          

            clickDown.b = null;

            clickDown.d = 0;
            clickDown.m = 0;


            if (clickDown.objMovement) {
                th.roll('ts', clickDown.objMovement, {}, clickDown.objMovement.ocmd);
            }


            if (clickDown.objDraged) {
               
                clickDown.objDraged.isPickable = true;
            }

            scene.preparedForDrag = 0;
            scene.preparedForClick = 0;
            

            clickDown.objMovement = null;
            clickDown.objDraged = null;

            clickDown.camRotation = 0;
            clickDown.camMovement = 0;
            clickDown.camRadiusChange = 0;



        };

        document.body.addEventListener('keyup',
            function (event) {

                if (scene.KeyZ && scene.KeyCtrl && !scene.KeyShift) {

                    th.undo();
                } else if (scene.KeyZ && scene.KeyCtrl && scene.KeyShift) {
                    th.redo();
                }

                __log(event.keyCode);

                scene.keyU(event)
            });
        document.body.addEventListener('keydown', scene.keyD);
        document.body.addEventListener('wheel', function () {

        });

    },
    rollList: [],
    rollActivePos: 0,
    rollCalc: function (type, obj, cmd) {
        cmd.type = type;
        cmd.model = obj;
        switch (type) {
            case 'ts': {

                cmd.mx = cmd.model.position.x;
                cmd.my = cmd.model.position.y;
                cmd.mz = cmd.model.position.z;
                cmd.rx = cmd.model.rotation.x;
                cmd.ry = cmd.model.position.y;
                cmd.rz = cmd.model.position.z;
                cmd.sx = cmd.model.scaling.sx;
                cmd.sy = cmd.model.scaling.sy;
                cmd.sz = cmd.model.scaling.sz;
                break;
            }
            case 'del': {
                cmd.visibility = cmd.model.visibility;
                cmd.model.isDeleted = true;
                break;
            }
        }

        return cmd;

    },
    roll: function (type, obj, cmd, ocmd) {

        cmd = this.rollCalc(type, obj, cmd);
        cmd.ocmd = ocmd;

        this.rollActivePos++;
        this.rollList[this.rollActivePos] = cmd;

    },
    undo: function () {

        if (!this.rollList[this.rollActivePos]) return;

        this.rollBack(this.rollList[this.rollActivePos--].ocmd);
        if (this.rollActivePos < 0) this.rollActivePos = 0;
    },
    redo: function () {
        if (!this.rollList[this.rollActivePos + 1]) return;

        this.rollBack(this.rollList[++this.rollActivePos]);
    },
    rollBack: function (cmd) {



        switch (cmd.type) {
            case 'ts': {

                cmd.model.position.x = cmd.mx;
                cmd.model.position.y = cmd.my;
                cmd.model.position.z = cmd.mz;
                cmd.model.rotation.x = cmd.rx;
                cmd.model.position.y = cmd.ry;
                cmd.model.position.z = cmd.rz;
                cmd.model.scaling.x = def(cmd.sx, 1);
                cmd.model.scaling.y = def(cmd.sy, 1);
                cmd.model.scaling.z = def(cmd.sz, 1);
                break;
            }
            case 'del': {
                cmd.model.visibility = cmd.visibility;
                cmd.model.isDeleted = false;
                break;
            }
        }
    }
}
