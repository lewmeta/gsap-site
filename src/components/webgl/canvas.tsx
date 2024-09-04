"use client"

import React, { useEffect, useRef } from 'react';
import styles from './SmokeSimulation.module.css';

const SmokeSimulation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    return (
        <>
            <canvas ref={canvasRef} className={styles.canvas}></canvas>
            <h1 id="h1" className={styles.transitionIn}>
                Smoke Simulation
            </h1>
        </>
    );
};

export default SmokeSimulation;
