import * as THREE from "three";
import { useTexture } from "@react-three/drei";

export default function Panorama({ img }) {
    const texture = useTexture(img);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    return (
        <mesh>
            <sphereGeometry args={[5, 32, 32]} />
            <meshBasicMaterial
                map={texture}
                side={THREE.BackSide}
            />
        </mesh>
    );
}
