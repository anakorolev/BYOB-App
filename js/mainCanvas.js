/*global DPApp: true, Backbone */

var DPApp = DPApp || {};

(function () {
	'use strict';

	var camera, container, controls, scene, projector, renderer;
	var mesh, mixer;
	var selectedModel = 2;
	var selectedHeadModel = 6;
	var modelArray = ["","","obj/IronGiantBody.obj", "obj/BeautyBotBody.json", "obj/IronGiantBody.obj", "obj/BeautyBotBody.json","IG Head","obj/BeautyBotHead.json","IG Head","obj/BeautyBotHead.json"];

	// Robot View
	// -------------------
	//
	// Display an individual todo item, and respond to changes
	// that are made to the item, including marking completed.
	DPApp.RobotView = Mn.View.extend({

		template: '#template-canvas',

		ui: {
			canvas: '#canvas'
		},

		events: {
			'click .arrowBody': 'onBodyUpdate',
			'click .arrowHead': 'onHeadUpdate',
			'click .downloadFiles': 'onDownload'
		},

		initialize: function initialize () {
			renderer = new THREE.WebGLRenderer();
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( window.innerWidth, window.innerHeight );
			
			camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 10000 );
			camera.position.z = -10;
			camera.position.y = 2;
			camera.target = new THREE.Vector3( 0, 0, 1 );
			
			controls = new THREE.TrackballControls( camera, renderer.domElement );
			controls.rotateSpeed = 1.0;
			controls.zoomSpeed = 1.2;
			controls.panSpeed = 0.8;
			controls.noZoom = false;
			controls.noPan = false;
			controls.staticMoving = true;
			controls.dynamicDampingFactor = 0.3;
			controls.update();
			
			scene = new THREE.Scene();
			scene.background = new THREE.Color( 0xf5f5f5 );
			//
			var light = new THREE.DirectionalLight( 0xefefff, 1.5 );
			light.position.set( 1, 1, 1 ).normalize();
			scene.add( light );
			var light = new THREE.DirectionalLight( 0xffefef, 1.5 );
			light.position.set( -1, -1, -1 ).normalize();
			scene.add( light );
			var loader = new THREE.JSONLoader();
			
			this.loadRobot(loader);
			
			var c = renderer.domElement;
			console.log(c);
			document.getElementById("canvas").appendChild(c);
			
			window.addEventListener( 'resize', this.onWindowResize(), false );
		},
		
		loadRobot: function loadRobot(loader) {
			
			loader.load("models/IronGiantBody.json", function( geometry, materials ) {
				var blin = materials[0];
				var normalTexture = new THREE.MeshNormalMaterial();
				
				var materialArray = [blin, normalTexture];
				
				mesh = new THREE.Mesh( geometry, materialArray[0] );
				mesh.name = 'ig1';
				
				mesh.scale.set( 0.2, 0.2, 0.2 );
				
				mesh.position.set( 0, -2, 10);
				mesh.rotation.x = THREE.Math.degToRad(180);
				console.log(mesh);
				scene.add( mesh );
				console.log(scene);
				renderer.render( scene, camera );
			} );
			
			loader.load("models/bottomFInal.json", function( geometry, materials ) {
				var blin = materials[0];
				var normalTexture = new THREE.MeshNormalMaterial();
				
				var materialArray = [blin, normalTexture];
				
				mesh = new THREE.Mesh( geometry, materialArray[0] );
				mesh.name = 'beauty bot 1';
				
				mesh.scale.set( 3, 3, 3 );
				
				mesh.position.set( -20, -5, 30);
				console.log(mesh);
				scene.add( mesh );
				console.log(scene);
				renderer.render( scene, camera );
			} );
			loader.load("models/IronGiantBody.json", function( geometry, materials ) {
				var blin = materials[0];
				var normalTexture = new THREE.MeshNormalMaterial();
				
				var materialArray = [blin, normalTexture];
				
				mesh = new THREE.Mesh( geometry, materialArray[1] );
				mesh.name = 'ig2';
				mesh.scale.set( 0.2, 0.2, 0.2 );
				
				mesh.position.set( 0, -2, 50);
				mesh.rotation.x = THREE.Math.degToRad(180);
				console.log(mesh);
				scene.add( mesh );
				console.log(scene);
				renderer.render( scene, camera );
			} );
			loader.load("models/bottomFInal.json", function( geometry, materials ) {
				var blin = materials[0];
				var normalTexture = new THREE.MeshNormalMaterial();
				
				var materialArray = [blin, normalTexture];
				
				mesh = new THREE.Mesh( geometry, materialArray[1] );
				mesh.name = 'beauty bot 2';
				mesh.scale.set( 3, 3, 3 );
				
				mesh.position.set( 20, -5, 30);
				console.log(mesh);
				scene.add( mesh );
				console.log(scene);
				renderer.render( scene, camera );
			} );
			
			loader.load("models/IronGiantHead.json", function( geometry, materials ) {
				var blin = materials[0];
				var normalTexture = new THREE.MeshNormalMaterial();
				
				var materialArray = [blin, normalTexture];
				
				mesh = new THREE.Mesh( geometry, materialArray[0] );
				mesh.name = 'ig head 1';
				
				mesh.scale.set( 0.4, 0.4, 0.4 );
				mesh.rotation.y = THREE.Math.degToRad(180);
				mesh.position.set( 0, 5, 10);
				console.log(mesh);
				scene.add( mesh );
				console.log(scene);
				renderer.render( scene, camera );
			} );
			
			loader.load("models/topFInal.json", function( geometry, materials ) {
				var blin = materials[0];
				var normalTexture = new THREE.MeshNormalMaterial();
				
				var materialArray = [blin, normalTexture];
				
				mesh = new THREE.Mesh( geometry, materialArray[0] );
				mesh.name = 'beauty bot top 1';
				
				mesh.scale.set( 3, 3, 3 );
				
				mesh.position.set( -20, 0, 30);
				console.log(mesh);
				scene.add( mesh );
				console.log(scene);
				renderer.render( scene, camera );
			} );
			loader.load("models/IronGiantHead.json", function( geometry, materials ) {
				var blin = materials[0];
				var normalTexture = new THREE.MeshNormalMaterial();
				
				var materialArray = [blin, normalTexture];
				
				mesh = new THREE.Mesh( geometry, materialArray[1] );
				mesh.name = 'ig head 2';
				mesh.scale.set( 0.4, 0.4, 0.4 );
				mesh.rotation.y = THREE.Math.degToRad(180);
				mesh.position.set( 0, 5, 50);
				console.log(mesh);
				scene.add( mesh );
				console.log(scene);
				renderer.render( scene, camera );
			} );
			loader.load("models/topFInal.json", function( geometry, materials ) {
				var blin = materials[0];
				var normalTexture = new THREE.MeshNormalMaterial();
				
				var materialArray = [blin, normalTexture];
				
				mesh = new THREE.Mesh( geometry, materialArray[1] );
				mesh.name = 'beauty bot top 2';
				mesh.scale.set( 3, 3, 3 );
				
				mesh.position.set( 20, 0, 30);
				console.log(mesh);
				scene.add( mesh );
				console.log(scene);
				renderer.render( scene, camera );
			} );
			
		},
		
		onWindowResize: function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
			renderer.render(scene,camera);
		},

		onBodyUpdate: function onBodyUpdate(value) {
			console.log(value);
			var direction = value.target.attributes[3].value;
			
			if (direction == 'next') {
		    	    if((selectedModel + 1) <= 5){
		    	        selectedModel += 1;
		    	    } else {
		    	        selectedModel = 2;
		    	    }
		    	} else  {
		    	    if((selectedModel - 1) >= 2){
		    	        selectedModel -= 1;
		    	    } else {
		    	        selectedModel = 5;
		    	    }
		    	}
		    	
		    	if (selectedModel === 2) {
		    		console.log('in here 2');
		    		console.log(scene.children);
		    		scene.getObjectByName('ig1').position.set(0, -2, 10);
		    		scene.getObjectByName('beauty bot 1').position.set( -20, -5, 30);
		    		scene.getObjectByName('ig2').position.set(0, -2, 50);
		    		scene.getObjectByName('beauty bot 2').position.set(  20, -5, 30);
		    		renderer.render(scene,camera);
		    	} else if (selectedModel === 3) {
		    		console.log('in here 3');
		    		console.log(scene.children);
		    		scene.getObjectByName('beauty bot 1').position.set(0, -5, 10);
		    		scene.getObjectByName('ig2').position.set( -20, -2, 30);
		    		scene.getObjectByName('beauty bot 2').position.set(0, -5, 50);
		    		scene.getObjectByName('ig1').position.set(  20, -2, 30);
			    	renderer.render(scene,camera);
		    	} else if (selectedModel === 4) {
		    		console.log('in here 4');
		    		console.log(scene.children);
		    		scene.getObjectByName('ig2').position.set(0, -2, 10);
		    		scene.getObjectByName('beauty bot 2').position.set( -20, -5, 30);
		    		scene.getObjectByName('ig1').position.set(0, -2, 50);
		    		scene.getObjectByName('beauty bot 1').position.set(  20, -5, 30);
		    		renderer.render(scene,camera);
		    	} else if (selectedModel === 5) {
		    		console.log('in here 5');
		    		console.log(scene.children);
		    		scene.getObjectByName('beauty bot 2').position.set(0, -5, 10);
		    		scene.getObjectByName('ig1').position.set( -20, -2, 30);
		    		scene.getObjectByName('beauty bot 1').position.set(0, -5, 50);
		    		scene.getObjectByName('ig2').position.set(  20, -2, 30);
		    		renderer.render(scene,camera);
		    	}
		},
		
		onHeadUpdate: function onHeadUpdate(value) {
			console.log(value);
			var direction = value.target.attributes[3].value;
			
			if (direction == 'next') {
		    	    if((selectedHeadModel + 1) <= 9){
		    	        selectedHeadModel += 1;
		    	    } else {
		    	        selectedHeadModel = 6;
		    	    }
		    	} else  {
		    	    if((selectedHeadModel - 1) >= 6){
		    	        selectedHeadModel -= 1;
		    	    } else {
		    	        selectedHeadModel = 9;
		    	    }
		    	}
		    	
		    	if (selectedHeadModel === 6) {
		    		scene.getObjectByName('ig head 1').position.set(0, 5, 10);
		    		scene.getObjectByName('beauty bot top 1').position.set( -20, 0, 30);
		    		scene.getObjectByName('ig head 2').position.set(0, 5, 50);
		    		scene.getObjectByName('beauty bot top 2').position.set( 20, 0, 30);
		    		console.log('in here 6');
		    		console.log(scene.children);
		    		renderer.render(scene,camera);
		    	} else if (selectedHeadModel === 7) {
		    		scene.getObjectByName('beauty bot top 1').position.set(0, 0, 10);
		    		scene.getObjectByName('ig head 2').position.set( -20, 5, 30);
		    		scene.getObjectByName('beauty bot top 2').position.set(0, 0, 50);
		    		scene.getObjectByName('ig head 1').position.set(  20, 5, 30);
		    		console.log('in here 7');
		    		console.log(scene.children);
			    	renderer.render(scene,camera);
		    	} else if (selectedHeadModel === 8) {
		    		scene.getObjectByName('ig head 2').position.set(0, 5, 10);
		    		scene.getObjectByName('beauty bot top 2').position.set( -20, 0, 30);
		    		scene.getObjectByName('ig head 1').position.set(0, 5, 50);
		    		scene.getObjectByName('beauty bot top 1').position.set( 20, 0, 30);
		    		console.log('in here 8');
		    		console.log(scene.children);
		    		renderer.render(scene,camera);
		    	} else if (selectedHeadModel === 9) {
		    		scene.getObjectByName('beauty bot top 2').position.set(0, 0, 10);
		    		scene.getObjectByName('ig head 1').position.set( -20, 5, 30);
		    		scene.getObjectByName('beauty bot top 1').position.set(0, 0, 50);
		    		scene.getObjectByName('ig head 2').position.set(  20, 5, 30);
		    		console.log('in here 9');
		    		console.log(scene.children);
		    		renderer.render(scene,camera);
		    	}
		},
		
		onDownload: function onDownload() {
			var downloadLinks = [];
			if(selectedHeadModel === 6 || selectedHeadModel === 8) {
				downloadLinks.push('obj/IronGiantJaw.obj');
				downloadLinks.push('obj/IronGiantHead.obj');
			} else {
				downloadLinks.push(modelArray[selectedHeadModel]);
			}
			downloadLinks.push(modelArray[selectedModel]);
			
			console.log(downloadLinks);
			
			var tempDownloadLink = document.createElement("a");
			tempDownloadLink.style.display = 'none';
			document.body.appendChild(tempDownloadLink);
			
			for(var n = 0; n < downloadLinks.length; n++) {
				var d = downloadLinks[n];
				tempDownloadLink.setAttribute('href', d);
				tempDownloadLink.setAttribute('download', d);
				tempDownloadLink.click();
			}
			
		},

		onRender: function onRender() {
			controls.update();
			renderer.render( scene, camera );
		}
	});
})();