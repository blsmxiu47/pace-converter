/* Component for converting min/km or min/mi pace to race times (e.g. 5k, 10k, half marathon, marathon) */
import { useState, useEffect } from "react"

import useDebounce from "../hooks/useDebounce"
import { padZero, unpadZero, handleFocus } from "../utils/utils"

// const KM_TO_MI = 0.62137119;
const debounceDelay = 200;

export default function PaceTimeConverter() {
    const [minPerKmMin, setMinPerKmMin] = useState<number>(0);
    const [minPerKmSec, setMinPerKmSec] = useState<number>(0);
    const [timeMin, setTimeMin] = useState<number>(0);
    const [timeSec, setTimeSec] = useState<number>(0);

    const [isKmSecValid, setIsKmSecValid] = useState(true);
    // const [isTimeSecValid, setIsTimeSecValid] = useState(true);

    const [source, setSource] = useState<'km' | 'mi' | null>(null);

    const debouncedMinPerKmMin = useDebounce(minPerKmMin, debounceDelay);
    const debouncedMinPerKmSec = useDebounce(minPerKmSec, debounceDelay);
    // const debouncedTimeMin = useDebounce(timeMin, debounceDelay);
    // const debouncedTimeSec = useDebounce(timeSec, debounceDelay);
  
    // min/km input changed
    useEffect(() => {
        if (source === 'km' && debouncedMinPerKmMin !== null && debouncedMinPerKmSec !== null && isKmSecValid) {
            const totalSecondsPerKm = debouncedMinPerKmMin * 60 + debouncedMinPerKmSec;
            const totalSecondsTime = totalSecondsPerKm * 5; // TODO: this is just a constant for 5k for now. Make dynamic for the selected distance (5k, 10k, half marathon, marathon, etc.)
            setTimeMin(Math.floor(totalSecondsTime / 60));
            setTimeSec(Math.round(totalSecondsTime % 60));
        }
    }, [source, debouncedMinPerKmMin, debouncedMinPerKmSec, isKmSecValid]);

    const handleMinPerKmMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSource('km');
        
        const valueStr = e.target.value.toString().replace(/^0+/, '');
        
        if (!/^\d{0,2}$/.test(valueStr)) return;

        const value = valueStr === '' ? 0 : parseInt(valueStr);

        if (isNaN(value) || value < 0 || value > 99) return;
        
        setMinPerKmMin(value);
    };

    const handleMinPerKmSecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSource('km');

        const valueStr = e.target.value.toString().replace(/^0+/, '');

        if (!/^\d{0,2}$/.test(valueStr)) return;

        setIsKmSecValid(true);
        
        const value = valueStr === '' ? 0 : parseInt(valueStr, 10);
        
        if (isNaN(value) || value < 0 || value > 59) return;
        
        setMinPerKmSec(value);
    };

    return (
        <div className="converter">
            <div className='inputs-row'>
                <label>
                    min / km
                    <div className='time-input'>
                        <input
                            type="number"
                            pattern="\d{0,2}"
                            className='input-value'
                            value={unpadZero(minPerKmMin)}
                            onFocus={handleFocus} 
                            onChange={handleMinPerKmMinChange}
                            min={0}
                            max={99}
                        />
                        <span>:</span>
                        <input
                            type="number"
                            pattern="\d{0,2}"
                            className='input-value'
                            value={padZero(minPerKmSec)}
                            onFocus={handleFocus} 
                            onChange={handleMinPerKmSecChange}
                            min={0}
                            max={59}
                        />
                    </div>
                </label>
            </div>
            <div className='inputs-row'>
                <label>
                    5k Time
                    <div className='time-input'>
                        <input
                            type="number"
                            pattern="\d{0,2}"
                            className='input-value'
                            value={unpadZero(timeMin)}
                            onFocus={handleFocus} 
                            // onChange={handleTimeSecChange}
                            min={0}
                            max={99}
                        />
                        <span>:</span>
                        <input
                            type="number"
                            pattern="\d{0,2}"
                            className='input-value'
                            value={padZero(timeSec)}
                            onFocus={handleFocus} 
                            // onChange={handleTimeSecChange}
                            min={0}
                            max={59}
                        />
                    </div>
                </label>
            </div>
        </div>
    )
}