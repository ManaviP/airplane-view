import { useThree, useFrame } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CameraRig({ targetPosition, targetLookAt, view, controlsRef }) {
    const { camera } = useThree();
    const isAnimating = useRef(false);

    const [{ camPos, lookAt }, api] = useSpring(() => ({
        camPos: targetPosition,
        lookAt: targetLookAt,
        config: { tension: 50, friction: 18 },
        onStart: () => { isAnimating.current = true; },
        onRest: () => { isAnimating.current = false; }
    }));

    // Animate camera on view change
    useEffect(() => {
        const currentTarget = controlsRef?.current?.target || new THREE.Vector3(0, 0, 0);
        api.start({
            camPos: targetPosition,
            lookAt: targetLookAt,
            from: {
                camPos: [camera.position.x, camera.position.y, camera.position.z],
                lookAt: [currentTarget.x, currentTarget.y, currentTarget.z]
            }
        });
    }, [targetPosition, targetLookAt, api, camera, controlsRef]);

    useFrame(() => {
        if (isAnimating.current) {
            const pos = camPos.get();
            const look = lookAt.get();

            camera.position.set(...pos);
            if (controlsRef.current) {
                controlsRef.current.target.set(...look);
                controlsRef.current.update();
            }
        }
    });

    return null;
}