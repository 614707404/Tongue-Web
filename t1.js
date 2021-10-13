import * as THREE from './js/threejs/build/three.module.js';
import { OrbitControls } from './js/threejs/examples/jsm/controls/OrbitControls.js';
import {TongueGeometry} from './TongueGeometry.js';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas });
    const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 100);
    camera.position.set(0, 10, 10);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('black');

    // {
    //     const skyColor = 0xB1E1FF;  // light blue
    //     const groundColor = 0xB97A20;  // brownish orange
    //     const intensity = 1;
    //     const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    //     scene.add(light);
    // }

    // {
    //     const color = 0xFFFFFF;
    //     const intensity = 1;
    //     const light = new THREE.DirectionalLight(color, intensity);
    //     light.position.set(5, 10, 2);
    //     scene.add(light);
    //     scene.add(light.target);
    // }

    // {
    //     var curve = new THREE.EllipseCurve(
    //         0, 0,            // ax, aY
    //         10, 1,           // xRadius, yRadius
    //         0, 2 * Math.PI,  // aStartAngle, aEndAngle
    //         false,            // aClockwise
    //         0                 // aRotation
    //     );

    //     var points = curve.getPoints(50);
    //     var geometry = new THREE.BufferGeometry().setFromPoints(points);

    //     var material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    //     // Create the final object to add to the scene
    //     var ellipse = new THREE.Line(geometry, material);
    //     scene.add(ellipse);
    // }

    {
        var geometry = new TongueGeometry(10, 3, 16, 100);
        var material = new THREE.MeshBasicMaterial();
        var torus = new THREE.Mesh(geometry, material);
        scene.add(torus);
    }


    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render() {
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();
