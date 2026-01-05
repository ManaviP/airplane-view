import React from "react";
import { useGLTF } from "@react-three/drei";

export default function LongFloor(props) {
    const { nodes } = useGLTF("/models/airplane_inside.glb");

    const spacing = -2.4;
    const count = 4;

    const segments = [];

    for (let i = 0; i < count; i++) {
        segments.push(
            <group key={i} position={[0, 0, i * spacing]} scale={[1.35, 1, 1]}>
                {/*        ↑ increase this 1.3 to widen floor */}
                <mesh geometry={nodes.Floor_lambert3_0.geometry}>
                    <meshStandardMaterial
                        color="#f0f0f0"
                        metalness={0.25}
                        roughness={0.55}
                    />
                </mesh>
            </group>
        );
    }

    return (
        <group {...props} scale={[0.166, 0.05, 0.31]}>
            {segments}
        </group>
    );
}
