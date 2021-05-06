import React, { Suspense } from 'react';
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
        </>
    );
}