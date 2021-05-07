import React, { Suspense, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useThree, useLoader } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

import Loading from '@/components/canvas/Loading';
import Box from '@/components/canvas/Box';

function ModelScene() {
    const gltf = useGLTF('obj/scene.glb');
    // console.log(gltf);
    const [texture,texture_disp,texture_norm] = useLoader(THREE.TextureLoader, ['img/1.png','img/1_disp.png','img/1_norm.png']);
    const [text_env] = useLoader(THREE.TextureLoader, ['img/2.png']);
    text_env.mapping = THREE.EquirectangularReflectionMapping;
    text_env.mapping = THREE.CubeReflectionMapping;
    gltf.scene.traverse((o)=>{
        if(o.name === 'Sphere'){

            console.log(o)

            o.material = new THREE.MeshPhysicalMaterial({
                clearcoat: 1.0,
                // clearcoatRoughness: 0.1,
                metalness: 0.0,
                roughness: 0.0,
                map: texture,
                normalMap: texture_norm,
                envMap: text_env,
                // displacementScale:0.01,
                // displacementMap: texture_disp,
                side:THREE.DoubleSide
            });

            

        }
    });

    const { scene } = useThree();
    useEffect(()=>{
        scene.background = text_env;
    })

    return <primitive object={gltf.scene} />;
}

function PlanePurchase({ purchase }) {
    const hola = () => console.log('hola')
    return(
        <mesh position={[0,0,0,]} scale={[1,1,1]} onHover={()=>console.log('hover')} onClick={(e)=>hola()}>
            <planeBufferGeometry args={[1,1]} />
            <meshBasicMaterial color='red' side={THREE.DoubleSide} />
        </mesh>
    );
}

export default function Scene({purchase}) {

    const { scene } = useThree();
    useEffect(()=>{
        if(scene){
            scene.background = new THREE.Color('black');
        }
    },[])

    return (
        <>
        <ambientLight intensity={0.15} />
        <directionalLight intensity={0.5} position={[0,100,100]} />
        <Suspense fallback={<Loading />}>
            <ModelScene />
            {/* <PlanePurchase r3f purchase={purchase} /> */}
        </Suspense>
        <OrbitControls />
        <BackgroundPrincipalDiv />
        </>
    );
}

function BackgroundPrincipalDiv() {
    const el = useMemo( () => document.getElementById('principalDiv') ) ;
    useEffect(()=>{
      el.style.zIndex = 0;
      return () => {
        el.style.zIndex = 10;
      }
    },[el]);
    return null;
}