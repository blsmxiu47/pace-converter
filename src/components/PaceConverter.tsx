import { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';

import { padZero, unpadZero, handleFocus, validateTimeInput } from '../utils/utils';

const KM_TO_MI = 0.62137119;
const debounceDelay = 200;

export default function PaceConverter() {
    const [minPerKmMin, setMinPerKmMin] = useState<number>(0);
    const [minPerKmSec, setMinPerKmSec] = useState<number>(0);
    const [minPerMiMin, setMinPerMiMin] = useState<number>(0);
    const [minPerMiSec, setMinPerMiSec] = useState<number>(0);

    const [isKmSecValid, setIsKmSecValid] = useState(true);
    const [isMiSecValid, setIsMiSecValid] = useState(true);

    const [source, setSource] = useState<'km' | 'mi' | null>(null);

    const debouncedMinPerKmMin = useDebounce(minPerKmMin, debounceDelay);
    const debouncedMinPerKmSec = useDebounce(minPerKmSec, debounceDelay);
    const debouncedMinPerMiMin = useDebounce(minPerMiMin, debounceDelay);
    const debouncedMinPerMiSec = useDebounce(minPerMiSec, debounceDelay);
  
    // min/km input changed
    useEffect(() => {
        if (source === 'km' && debouncedMinPerKmMin !== null && debouncedMinPerKmSec !== null && isKmSecValid) {
            const totalSecondsPerKm = debouncedMinPerKmMin * 60 + debouncedMinPerKmSec;
            const totalSecondsPerMi = totalSecondsPerKm / KM_TO_MI;
            setMinPerMiMin(Math.floor(totalSecondsPerMi / 60));
            setMinPerMiSec(Math.round(totalSecondsPerMi % 60));
        }
    }, [source, debouncedMinPerKmMin, debouncedMinPerKmSec, isKmSecValid]);

    // min/mi input changed
    useEffect(() => {
        if (source == 'mi' && debouncedMinPerMiMin !== null && debouncedMinPerMiSec !== null && isMiSecValid) {
            const totalSecondsPerMi = debouncedMinPerMiMin * 60 + debouncedMinPerMiSec;
            const totalSecondsPerKm = totalSecondsPerMi * KM_TO_MI;
            setMinPerKmMin(Math.floor(totalSecondsPerKm / 60));
            setMinPerKmSec(Math.round(totalSecondsPerKm % 60));
        }
    }, [source, debouncedMinPerMiMin, debouncedMinPerMiSec, isMiSecValid]);

    const handleMinPerKmMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSource('km');
        const value = validateTimeInput(e.target.value, 'minute');
        if (value === undefined) {
            return;
        } else {
            setMinPerKmMin(value);
        }
    };

    const handleMinPerKmSecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSource('km');
        const value = validateTimeInput(e.target.value, 'second');
        if (value === undefined) {
            return;
        } else {
            setIsKmSecValid(true);
            setMinPerKmSec(value);
        }
    }

    const handleMinPerMiMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSource('mi');
        const value = validateTimeInput(e.target.value, 'minute');
        if (value === undefined) {
            return;
        } else {
            setMinPerMiMin(value);
        }
    }

    const handleMinPerMiSecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSource('mi');
        const value = validateTimeInput(e.target.value, 'second');
        if (value === undefined) {
            return;
        } else {
            setIsMiSecValid(true);
            setMinPerMiSec(value);
        }
    };

    return (
        <div className="converter">
            <div className='input-group'>
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
            <div className='input-group'>
                <label>
                    min / mi
                    <div className='time-input'>
                        <input
                            type="number"
                            pattern="\d{0,2}"
                            className='input-value'
                            value={unpadZero(minPerMiMin)}
                            onFocus={handleFocus} 
                            onChange={handleMinPerMiMinChange}
                            min={0}
                            max={99}
                        />
                        <span>:</span>
                        <input
                            type="number"
                            pattern="\d{0,2}"
                            className='input-value'
                            value={padZero(minPerMiSec)}
                            onFocus={handleFocus} 
                            onChange={handleMinPerMiSecChange}
                            min={0}
                            max={59}
                        />
                    </div>
                </label>
            </div>
        </div>
    );
}