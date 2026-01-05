import React from "react";

export default function OverheadBin({
                                        position = [0, 1.45, 0],
                                        rotation = [0, 0, 0],
                                        scale = [1.6, 0.35, 0.6],
                                    }) {
    return (
        <group position={position} rotation={rotation} scale={scale}>
            {/* MAIN BODY */}
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                    color="#c3d6e7ff"   // light blue
                    roughness={0.35}
                    metalness={0.05}
                />
            </mesh>

            {/* FRONT SLOPE */}
            <mesh position={[0.5, -0.15, 0]} rotation={[0, 0, Math.PI / 10]}>
                <boxGeometry args={[0.2, 0.8, 1]} />
                <meshStandardMaterial
                    color="#c5d4dfff"
                    roughness={0.35}
                    metalness={0.05}
                />
            </mesh>

            {/* BOTTOM BEVEL */}
            <mesh position={[0, -0.5, 0]}>
                <boxGeometry args={[1, 0.1, 1]} />
                <meshStandardMaterial
                    color="#78bfff"
                    roughness={0.4}
                />
            </mesh>

            {/* TOP LIP */}
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[1, 0.05, 1]} />
                <meshStandardMaterial
                    color="#b7e3ff"
                    roughness={0.25}
                />
            </mesh>
        </group>
    );
}
