import React from "react";

export default function BackWall(props) {
    return (
        <mesh {...props}>
            {/* width (X) , height (Y) */}
            <planeGeometry args={[10, 6]} />

            <meshStandardMaterial
                color="#f0f0f0"
                metalness={0.4}
                roughness={0.45}
                side={2}   // <-- DoubleSide
            />

        </mesh>
    );
}
