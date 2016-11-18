      class Connection{
      constructor(_aIndex){
        
                this.timerA = 0;
                this.timerB = 0;
                this.connectionPointer = 1;
                this.connect = new THREE.Geometry(); //Spline connection the voxels
                this.connect.dynamic = true;

                if(Math.random()>0.5)
                  this.stay = true;
                else
                  this.stay=false;

                this.line = new THREE.Line(this.connect, lineMaterial);

                 //Voxel address
                 if (typeof _aIndex != 'undefined'){
                  this.aIndex = _aIndex;
                 }else{
                  this.aIndex = GetVoxel();
                 }
                
                this.bIndex = GetVoxel();
                
                //Voxel positions
                this.a = new THREE.Vector3(0,0,0);
                this.b = new THREE.Vector3(0,0,0);

                this.connect.vertices.push(this.a);
                this.connect.vertices.push(this.b);

                scene.add(this.line);

                connectionIndex++;
                connections[connectionIndex] = this;
                this.id = connectionIndex;

                this.inc = 0.005; //time increment
              
            }

            draw(){
              try{

              this.inc = 0.0025 * (currentSpeed/2);

              if(this.a.y > 2 || this.b.y > 2){
                  scene.remove(this.line);
                  delete connections[this.id];
                   delete this.line;
                  delete connections[this.id];
              }


              if(this.timerA < 1){

                this.timerA+=this.inc;
              }else{
                if(this.timerB < 1){
                   this.timerB+=this.inc;
                }
                else{ 
                  scene.remove(this.line);
                  delete connections[this.id];
                  delete this.line;
                  delete connections[this.id];

                  if(Math.random()>0.5 && this.a.y > 2)
                    new Connection(this.aIndex);
                }
              }


              this.a.x = voxels[this.aIndex].laptop.position.x;
              this.a.y = voxels[this.aIndex].laptop.position.y;
              this.a.z = voxels[this.aIndex].laptop.position.z;
              this.b.x = voxels[this.bIndex].laptop.position.x;
              this.b.y = voxels[this.bIndex].laptop.position.y;
              this.b.z = voxels[this.bIndex].laptop.position.z;

              this.connect.vertices[0].x = lerp(this.a.x, this.b.x, this.timerB);
              this.connect.vertices[0].y = lerp(this.a.y, this.b.y, this.timerB);
              this.connect.vertices[0].z = lerp(this.a.z, this.b.z, this.timerB);

              this.connect.vertices[this.connectionPointer].x = lerp(this.a.x, this.b.x, this.timerA);
              this.connect.vertices[this.connectionPointer].y = lerp(this.a.y, this.b.y, this.timerA);
              this.connect.vertices[this.connectionPointer].z = lerp(this.a.z, this.b.z, this.timerA);
            }
            catch(err){
              scene.remove(this.line);
              this.line.verticesNeedUpdate = true;
                  delete connections[this.id];
                   delete this.line;
                  delete connections[this.id];
            }
              


              /*
              if(this.timerA < 1){
                this.timerA+=0.025;
              }else{
                if(this.timerB < 1){
                  this.timerB+=0.025;
                }
                else{ 
                  scene.remove(this.line);
                  delete connections[this.id];
                   this.line.verticesNeedUpdate = true;
                   delete this.line;
                  delete connections[this.id];
                }
              }

              this.connect.vertices[0].x = lerp(this.a.x, this.b.x, this.timerB);
              this.connect.vertices[0].y = lerp(this.a.y, this.b.y, this.timerB);
              this.connect.vertices[0].z = lerp(this.a.z, this.b.z, this.timerB);

              this.connect.vertices[this.connectionPointer].x = lerp(this.a.x, this.b.x, this.timerA);
              this.connect.vertices[this.connectionPointer].y = lerp(this.a.y, this.b.y, this.timerA);
              this.connect.vertices[this.connectionPointer].z = lerp(this.a.z, this.b.z, this.timerA);
              */

            }

         }