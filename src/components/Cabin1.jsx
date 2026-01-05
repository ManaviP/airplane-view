import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const Cabin1= (props) =>{
    const { nodes, materials } = useGLTF('/models/airplane_inside.glb')
    return (
        <group {...props} dispose={null}>
            <group scale={0.01}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Floor_lambert3_0.geometry}
                    material={materials.lambert3}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Chair_blinn2_0.geometry}
                    material={materials.blinn2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Chair_blinn1_0.geometry}
                    material={materials.blinn1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Chair_lambert1_0.geometry}
                    material={materials.lambert1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Chair_blinn3_0.geometry}
                    material={materials.blinn3}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Wall_blinn4_0.geometry}
                    material={materials.blinn4}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Window_blinn5_0.geometry}
                    material={materials.blinn5}
                />
            </group>
        </group>
    )
}

useGLTF.preload('/models/airplane_inside.glb')

export default Cabin1;