import React, { Suspense, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF, OrbitControls } from '@react-three/drei';

import Loading from '@/components/canvas/Loading';

function ModelScene() {
    const gltf = useGLTF('obj/scene.glb');
    return <primitive object={gltf.scene} />;
}

export default function Scene() {
    return (
        <>
        <ambientLight />
        <Suspense fallback={<Loading />}>
            <ModelScene />
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