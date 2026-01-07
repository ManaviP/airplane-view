import React, { useEffect } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function OverheadBin({
                                        position = [0, 1.45, 0],
                                        rotation = [0, 0, 0],
                                        scale = [1.6, 0.35, 0.6],
                                    }) {
    const texture = useTexture("/textures/overheadtexture1.png");

    useEffect(() => {
        if (!texture) return;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        
        texture.repeat.set(12, 1);   // X repeat, Y repeat
        texture.needsUpdate = true;
    }, [texture]);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <mesh>
                <boxGeometry args={[1, 0.6, 1]} />
                <meshStandardMaterial
                    map={texture}
                    roughness={0.35}
                    metalness={0.05}
                />
            </mesh>
        </group>
    );
}
