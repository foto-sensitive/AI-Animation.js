
class Voxel{
            constructor(x, y, z){
                if(Math.random()>0.5){
                  this.parts = 2;
                  if(Math.random()>0.5)
                    this.pc = true;
                  else
                    this.pc = false;
                }
                else{
                  this.parts = 1;
                  if(Math.random()>0.5){
                    this.tablet = true;
                    if(Math.random()>0.5)
                    this.tower = true;
                    else
                    this.tower = false;
                  }
                  else{
                    this.tablet = false;
                  }
                } 

                this.colorRnd = Math.random();

                if(this.colorRnd<0.33){
                  this.mat = materials;
                }
                else if(this.colorRnd>0.33 && this.colorRnd <0.66){
                  this.mat = materials2;
                }
                else if(this.colorRnd > 0.66){
                   this.mat = materials3;
                 }

                 //How fast expired voxels ascend
                 this.ascension = 0.5;

                this.laptop = new THREE.Mesh();
                scene.add( this.laptop );
                this.screen = new THREE.Mesh(
                new THREE.BoxGeometry( 100, 65, 10 ),
                new THREE.MeshFaceMaterial( this.mat ) );
                if(this.parts == 2){
                  if(!this.pc){
                  this.keyboard = new THREE.Mesh(
                  new THREE.BoxGeometry( 100, 65, 10 ),
                  new THREE.MeshFaceMaterial( this.mat ) );
                  this.keyboard.position.z += this.screen.geometry.parameters.height/2;
                  this.keyboard.position.y -= this.screen.geometry.parameters.height/2;
                  }else{
                  this.keyboard = new THREE.Mesh(
                  new THREE.BoxGeometry( 35, 35, 10 ),
                  new THREE.MeshFaceMaterial( this.mat ) );
                  this.keyboard.position.y -= this.screen.geometry.parameters.height/1.6;
                  }
                  this.keyboard.rotation.x = Math.PI / 2; 
                }

                if(this.tablet){
                  this.screen.rotation.x = -Math.PI/2;
                  if(!this.tower){
                    this.scaleEnd = 0.5;
                  }else{
                    this.screen.scale.z = 5;
                    this.screen.scale.x = 0.5;
                    this.screen.scale.y = 0.75;
                    this.screen.rotation.z  = -Math.PI / 2;  
                    this.scaleEnd = 1;
                  }
                }else{
                  this.scaleEnd = 1;
                }

                if(this.pc)
                  this.scaleEnd = 1.25;

                if(Math.random() > 0.5 && !this.tablet)//Determine orientation
                  this.laptop.rotation.y = Math.PI / 2;

                //Positioning from constructor
                this.laptop.position.x = x;
                this.laptop.position.y = y;
                this.laptop.position.z = z;

                this.laptop.add( this.screen );
                if(this.parts == 2)
                 this.laptop.add( this.keyboard );

                voxelIndex++;
                voxels[voxelIndex] = this;
                this.id = voxelIndex;

                this.laptop.scale.x = 0.05;
                this.laptop.scale.y = 0.05;
                this.laptop.scale.z = 0.05;

                this.scale = 0;
                this.ease = 0.0005;

                this.scaleEnd *= Math.random()*0.8+0.35;

                this.life = 0;
                this.maxLife = Math.random()*750+200;
            }
            draw(){

              //speed
              this.laptop.position.z+=(currentSpeed/7);

              if(this.scale < this.scaleEnd){
                this.scale+=this.ease;
                this.ease+=0.005;
              }

              this.laptop.scale.x=this.scale;
              this.laptop.scale.y=this.scale;
              this.laptop.scale.z=this.scale;

              //Elevate voxel as it expires
              if(this.life > this.maxLife){
                 this.laptop.position.y+=this.ascension;
                 this.ascension+=0.5;
              }

              this.life++;
              //Delete object once life expires
              if(this.laptop.position.y > 1000){
                scene.remove(this.laptop);
                delete voxels[this.id];
              }
            }
          }
