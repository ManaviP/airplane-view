import React from "react";
import { useTexture } from "@react-three/drei";
import { BackSide, RepeatWrapping } from "three";

export default function FrontWall(props) {

    // Load cabin front wall texture
    const texture = useTexture("/textures/frontwall2.png");

    // 🔧 Texture fixes (important for PNGs)
    texture.flipY = true;                  // prevent vertical flip
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(1, 1);               // adjust if needed

    return (
        <mesh {...props}>
            {/* width (X), height (Y) */}
            <planeGeometry args={[10, 6]} />

            <meshStandardMaterial
                map={texture}               // 🖼 PNG applied
                metalness={0.1}              // keep low for image clarity
                roughness={0.9}
                side={BackSide}              // visible only from inside
            />
        </mesh>
    );
}
