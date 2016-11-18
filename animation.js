//This script handles the animaton
      var camera, scene, renderer, screen;
      var voxels = {}; //3D Isometric device graphics
      var voxelIndex = 0;
      var voxelsLeft = 1;
      var thisVoxel;

      var spread =1250; //Spread of spawn points
      var xSpawn, zSpawn;
      var spawnRate = 125;
      var readySpawn = true;

      var myTimer =0;
      var easing = 0.025;
      var targetSpeed = 17;
      var currentSpeed = 17;
      var d = 0;//Destination
      var selector = 0;

      var allPredictions = 17;
      var predictionsInc = 0; //Prediction incriment

      var h2 = document.getElementsByTagName('h2')[0];
      var h3 = document.getElementsByTagName('h3')[0];


          //Load textures and assign them to material arrays to texture certain faces
          var texture = new THREE.TextureLoader().load( 'screen.png' );
          var texture2 = new THREE.TextureLoader().load( 'key.png' );

          var materials = [
             new THREE.MeshBasicMaterial( { color: 0xde6661, transparent: true, opacity:1, overdraw: true}),
             new THREE.MeshBasicMaterial( { color: 0xde6661, transparent: true, opacity:1, overdraw: true }),
            new THREE.MeshBasicMaterial( { color: 0xfbceb7, transparent: true, opacity:1, overdraw: true}),
             new THREE.MeshBasicMaterial( { map: texture2, transparent: true, opacity:1, overdraw: true }),
             new THREE.MeshBasicMaterial( { map: texture, transparent: true, opacity:1, overdraw: true}),
             new THREE.MeshBasicMaterial( { map: texture2, transparent: true, opacity:1, overdraw: true})
          ];

          texture2 = new THREE.TextureLoader().load( 'key3.png' );

          var materials2 = [
             new THREE.MeshBasicMaterial( { color: 0xde6661, transparent: true, opacity:1, overdraw: true}),
             new THREE.MeshBasicMaterial( { color: 0xde6661, transparent: true, opacity:1, overdraw: true }),
            new THREE.MeshBasicMaterial( { color: 0xfbceb7, transparent: true, opacity:1, overdraw: true}),
             new THREE.MeshBasicMaterial( { map: texture2, transparent: true, opacity:1, overdraw: true }),
             new THREE.MeshBasicMaterial( { map: texture, transparent: true, opacity:1, overdraw: true}),
             new THREE.MeshBasicMaterial( { map: texture2, transparent: true, opacity:1, overdraw: true})
          ];

          texture = new THREE.TextureLoader().load( 'screen2.png' );

          var materials3 = [
             new THREE.MeshBasicMaterial( { color: 0xde6661, transparent: true, opacity:1, overdraw: true}),
             new THREE.MeshBasicMaterial( { color: 0xde6661, transparent: true, opacity:1, overdraw: true }),
            new THREE.MeshBasicMaterial( { color: 0xfbceb7, transparent: true, opacity:1, overdraw: true}),
             new THREE.MeshBasicMaterial( { map: texture2, transparent: true, opacity:1, overdraw: true }),
             new THREE.MeshBasicMaterial( { map: texture, transparent: true, opacity:1, overdraw: true}),
             new THREE.MeshBasicMaterial( { map: texture2, transparent: true, opacity:1, overdraw: true})
          ];

        //Spline connection the voxels
        var connect = new THREE.Geometry(); 
        connect.dynamic = true;
        var connections = {};
        var connectionIndex = 0;
        var consLeft = 0; //Conections left
        var lineMaterial = new THREE.LineBasicMaterial({
          color: 0x00ff99,opacity: 0.25,
          linewidth: 1
        });

      init();
      animate();

      function init() {
          
          container = document.createElement( 'div' );
          container.className = "viewport";

          renderer = new THREE.CanvasRenderer();
          renderer.setSize( document.getElementById('container').offsetWidth, document.getElementById('container').offsetHeight);
          renderer.setClearColor( "rgb(86,100,110)" );
          document.getElementById("container").appendChild( renderer.domElement );

          scene = new THREE.Scene();

          camera = new THREE.OrthographicCamera( 
            window.innerWidth / - 2, window.innerWidth / 2, 
            window.innerHeight / 2, window.innerHeight / - 2, -9999, 9999 
           );

          camera.position.x = 0;
          camera.position.y = 100;
          camera.position.z = 0;
          scene.add(camera);


          //Populate device array
          for(var i = 0; i < 3; i++){
            xSpawn = Math.random()*spread-(spread/2);
            zSpawn = Math.random()*spread-(spread/2);
            
            if(i > 0){
              for(var j in voxels){
                if(CalculateDistance(voxels[j].laptop.position, new THREE.Vector3(xSpawn, 0, zSpawn)) < 125){
                  readySpawn = false;
                }
              
             }
            }

            if(readySpawn){
              new Voxel(xSpawn, 0, zSpawn);
              voxelsLeft++;

            }
            readySpawn = true;
          }

          
        
          new Connection();

          window.addEventListener( 'resize', onWindowResize, false );
      }


      function CalculateDistance(p1, p2)
      {
          var diffZ = p1.z - p2.z;
          var diffX = p1.x - p2.x;
          return Math.sqrt((diffZ * diffZ) + (diffX * diffX));
      }

      function lerp(a, b, f)
      {
       return a + f * (b - a);
      }


      function spawn(){
        for(var i = 0; i < currentSpeed*0.05; i++){
        xSpawn = Math.random()*spread-(spread/2);
        zSpawn = Math.random()*spread-(spread/2)-500;
        
        if(voxelIndex > 0){
          for(var j in voxels){
            if(CalculateDistance(voxels[j].laptop.position, new THREE.Vector3(xSpawn, 0, zSpawn)) < 75){
              readySpawn = false;
            }
          
         }
        }

        if(readySpawn)
          new Voxel(xSpawn, 0, zSpawn);
        readySpawn = true;
        }
      }

      setInterval(spawn, spawnRate);

      function makeConnection(){
        for(var i = 0; i < currentSpeed*0.2; i++){
        new Connection();
          }
      
      }
      setInterval(makeConnection, 100);

      function GoToNext(){

        if(selector < predictionsNum-1){
          selector++;


          h2.textContent = "Predictions made now: " + predictionsArr[selector];

          allPredictions+=parseInt(predictionsArr[selector]);
          h3.textContent = "Predictions made in the past hour: " + allPredictions;
        }else{
          selector= 0;
        }
          reDraw = true;
      }

      function incrementPredictions(){
        predictionsInc++;
        h2.textContent = "Predictions made now: " + parseInt(parseInt(predictionsArr[selector])+ parseInt(predictionsInc));
      }
      function subtractPredictions(){
        predictionsInc--;
        h2.textContent = "Predictions made now: " + parseInt(parseInt(predictionsArr[selector])+ parseInt(predictionsInc));
      }


      function GetVoxel()
      { 
          var arr = [];
          for(var i in voxels)
          {
            arr.push(i);
          }

          return arr[Math.floor(Math.random()*arr.length)];

      }


      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
      }

      function animate() {

          //Easing
          targetSpeed = parseInt(predictionsArr[selector]) + predictionsInc;
          d = targetSpeed - currentSpeed;
          currentSpeed += d * easing;

          requestAnimationFrame(animate);
          camera.position.x = Math.cos( 1 ) * 200;
          camera.position.z = Math.sin( 1 ) * 120;
          camera.lookAt( scene.position );

          voxelsLeft = 1;

          for(var i in voxels){
            voxels[i].draw();
            voxelsLeft++;
          }

          if(Math.random()>currentSpeed/11){
            thisVoxel = GetVoxel();
            voxels[thisVoxel].life = voxels[thisVoxel].maxLife;
          }
          
          for(var i in connections)
            connections[i].draw();
          
          renderer.render(scene, camera);
      }
