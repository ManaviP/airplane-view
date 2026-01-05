import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Cabin3(props) {
    const { nodes, materials } = useGLTF("/models/airplane_inside.glb");

    const Seats = () => (
        <>
            <mesh geometry={nodes.Chair_blinn2_0.geometry} material={materials.blinn2} />
            <mesh geometry={nodes.Chair_blinn1_0.geometry} material={materials.blinn1} />
            <mesh geometry={nodes.Chair_lambert1_0.geometry} material={materials.lambert1} />
            <mesh geometry={nodes.Chair_blinn3_0.geometry} material={materials.blinn3} />

            {/* Floor */}
            <mesh geometry={nodes.Floor_lambert3_0.geometry} material={materials.lambert3} />
        </>
    );

    const FullCabin = () => (
        <>
            <Seats />
            {/* Walls + windows (if any) */}
        </>
    );

    return (
        <group {...props} dispose={null}>
            {/* LEFT CLUSTER */}
            <group scale={0.01} position={[-5, 0, 0]}>
                <FullCabin />
            </group>

            {/* MIDDLE CLUSTER (seats only) */}
            <group scale={0.01} position={[0, 0, 0]}>
                <Seats />
            </group>

            {/* RIGHT CLUSTER MIRRORED */}
            <group scale={0.01} position={[5, 0, 0]} rotation={[0, Math.PI, 0]}>
                <FullCabin />
            </group>
        </group>
    );
}

useGLTF.preload("/models/airplane_inside.glb");
