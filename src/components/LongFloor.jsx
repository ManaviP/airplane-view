import React from "react";
import { useGLTF } from "@react-three/drei";

export default function LongFloor(props) {
    const { nodes, materials } = useGLTF("/models/airplane_inside.glb");

    // spacing between floor sections (match your cabin extension)
    const spacing = -2.4; // same as left cabin extension offset
    const count = 4;      // number of floor segments (increase if cabin becomes longer)

    const segments = [];

    for (let i = 0; i < count; i++) {
        segments.push(
            <mesh
                key={i}
                geometry={nodes.Floor_lambert3_0.geometry}
                material={materials.lambert3}
                position={[0, 0, i * spacing]}
            />
        );
    }

    return (
        <group {...props} scale={[0.27, 0.2, 0.31]}>
            {segments}
        </group>
    );
}
