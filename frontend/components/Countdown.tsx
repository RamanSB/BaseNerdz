
import React, { useState, useEffect } from 'react';

const Countdown: React.FC = () => {

    return (
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                    <span>0</span>
                </span>
                days
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                    <span>0</span>
                </span>
                hours
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                    <span>0</span>
                </span>
                min
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                    <span>0</span>
                </span>
                sec
            </div>
        </div>
    );
};



export default Countdown;