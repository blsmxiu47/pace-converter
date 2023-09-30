import { useEffect, useRef, useState } from 'react';
import useDebounce from '../hooks/useDebounce';

const KM_TO_MI = 0.62137119;
const debounceDelay = 200;
// TODO: make use of this function appropriately (Handling type number vs string is not so trivial maybe)
const padZero = (num: number) => (num < 10 ? `0${num}` : `${num}`);
const unpadZero = (num: number) => {
    if (num === 0) {
        return '0';
    }
    return num.toString().replace(/^0+/, '');
}

const PaceConverter: React.FC = () => {
    const minPerKmMinRef = useRef<HTMLInputElement>(null);
    const minPerKmSecRef = useRef<HTMLInputElement>(null);
    const minPerMiMinRef = useRef<HTMLInputElement>(null);
    const minPerMiSecRef = useRef<HTMLInputElement>(null);

    const selectAllText = (inputRef: React.RefObject<HTMLInputElement>) => {
        if (inputRef.current) {
            inputRef.current.select();
        }
    }

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
    }, [source, debouncedMinPerMiMin, debouncedMinPerMiSec, isMiSecValid  ]);

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

    const handleMinPerMiMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSource('mi');
        
        let valueStr = e.target.value.toString().replace(/^0+/, '');

        if (!/^\d{0,2}$/.test(valueStr)) return;
        
        const value = valueStr === '' ? 0 : parseInt(valueStr, 10);
        
        if (isNaN(value) || value < 0 || value > 99) return;
        
        setMinPerMiMin(value);
    };

    const handleMinPerMiSecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSource('mi');

        const valueStr = e.target.value.toString().replace(/^0+/, '');
        
        if (!/^\d{0,2}$/.test(valueStr)) return;

        setIsMiSecValid(true);

        const value = e.target.value === '' ? 0 : parseInt(valueStr, 10);
        
        if (isNaN(value) || value < 0 || value > 59) return;
        
        setMinPerMiSec(value);
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
                            value={parseInt(unpadZero(minPerKmMin))}
                            onClick={() => selectAllText(minPerKmMinRef)} 
                            onFocus={() => selectAllText(minPerKmMinRef)} 
                            onChange={handleMinPerKmMinChange}
                            min={0}
                            max={99}
                            placeholder='m'
                        />
                        :
                        <input
                            type="number"
                            pattern="\d{0,2}"
                            className='input-value'
                            value={padZero(minPerKmSec)}
                            onClick={() => selectAllText(minPerKmSecRef)} 
                            onFocus={() => selectAllText(minPerKmSecRef)} 
                            onChange={handleMinPerKmSecChange}
                            min={0}
                            max={59}
                            placeholder='ss'
                        />
                    </div>
                </label>
            </div>
            <div className='inputs-row'>
                <label>
                    min / mi
                    <div className='time-input'>
                        <input
                            type="number"
                            pattern="\d{0,2}"
                            className='input-value'
                            value={parseInt(unpadZero(minPerMiMin))}
                            onClick={() => selectAllText(minPerMiMinRef)} 
                            onFocus={() => selectAllText(minPerMiMinRef)} 
                            onChange={handleMinPerMiMinChange}
                            min={0}
                            max={99}
                            placeholder='m'
                        />
                        <span>:</span>
                        <input
                            type="number"
                            pattern="\d{0,2}"
                            className='input-value'
                            value={padZero(minPerMiSec)}
                            onClick={() => selectAllText(minPerMiSecRef)} 
                            onFocus={() => selectAllText(minPerMiSecRef)} 
                            onChange={handleMinPerMiSecChange}
                            min={0}
                            max={59}
                            placeholder='ss'
                        />
                    </div>
                </label>
            </div>
        </div>
    );
}

export default PaceConverter;
