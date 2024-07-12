
import React, { useState, useEffect } from 'react';

const Countdown: React.FC<{ isSaleActive: boolean }> = ({ isSaleActive }) => {

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (isSaleActive) {
            setDays(0);
            setHours(0);
            setMinutes(0);
            setSeconds(0);
            return;
        }

        const countdown = () => {
            setSeconds((prev) => {
                if (prev > 0) return prev - 1;
                setMinutes((prev) => {
                    if (prev > 0) return prev - 1;
                    setHours((prev) => {
                        if (prev > 0) return prev - 1;
                        setDays((prev) => (prev > 0 ? prev - 1 : 0));
                        return 1;
                    });
                    return 5;
                });
                return 59;
            });
        };

        const intervalId = setInterval(countdown, 1000);
        return () => clearInterval(intervalId);
    }, [isSaleActive]);

    return (
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                    <span style={{ '--value': days }}></span>
                </span>
                days
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                    <span style={{ '--value': hours }}></span>
                </span>
                hours
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                    <span style={{ '--value': minutes }}></span>
                </span>
                min
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                    <span style={{ '--value': seconds }}></span>
                </span>
                sec
            </div>
        </div>
    );
};



export default Countdown;