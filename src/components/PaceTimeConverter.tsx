/* Component for converting min/km or min/mi pace to race times (e.g. 5k, 10k, half marathon, marathon) */
import { useState, useEffect } from "react"

import useDebounce from "../hooks/useDebounce"
import { padZero, unpadZero, handleFocus } from "../utils/utils"

// const KM_TO_MI = 0.62137119;
const KM_TO_HM = 21.0975;
const KM_TO_M = 42.195;
const debounceDelay = 200;

export default function PaceTimeConverter() {
    const [minPerKmMin, setMinPerKmMin] = useState<number>(0);
    const [minPerKmSec, setMinPerKmSec] = useState<number>(0);
    const [fiveKTimeHr, setFiveKTimeHr] = useState<number>(0);
    const [fiveKTimeMin, setFiveKTimeMin] = useState<number>(0);
    const [fiveKTimeSec, setFiveKTimeSec] = useState<number>(0);
    const [tenKTimeHr, setTenKTimeHr] = useState<number>(0);
    const [tenKTimeMin, setTenKTimeMin] = useState<number>(0);
    const [tenKTimeSec, setTenKTimeSec] = useState<number>(0);
    const [halfMarathonTimeHr, setHalfMarathonTimeHr] = useState<number>(0);
    const [halfMarathonTimeMin, setHalfMarathonTimeMin] = useState<number>(0);
    const [halfMarathonTimeSec, setHalfMarathonTimeSec] = useState<number>(0);
    const [marathonTimeHr, setMarathonTimeHr] = useState<number>(0);
    const [marathonTimeMin, setMarathonTimeMin] = useState<number>(0);
    const [marathonTimeSec, setMarathonTimeSec] = useState<number>(0);

    const [isKmSecValid, setIsKmSecValid] = useState(true);
    // const [isTimeSecValid, setIsTimeSecValid] = useState(true);

    const [source, setSource] = useState<'km' | 'mi' | null>(null);

    const debouncedMinPerKmMin = useDebounce(minPerKmMin, debounceDelay);
    const debouncedMinPerKmSec = useDebounce(minPerKmSec, debounceDelay);
    // const debouncedfiveKTimeMin = useDebounce(fiveKTimeMin, debounceDelay);
    // const debouncedfiveKTimeSec = useDebounce(fiveKTimeSec, debounceDelay);
  
    // min/km input changed
    useEffect(() => {
        if (source === 'km' && debouncedMinPerKmMin !== null && debouncedMinPerKmSec !== null && isKmSecValid) {
            const totalSecondsPerKm = debouncedMinPerKmMin * 60 + debouncedMinPerKmSec;

            setFiveKTimeHr(Math.floor(totalSecondsPerKm * 5 / 3600));
            setFiveKTimeMin(Math.floor(totalSecondsPerKm * 5 % 3600 / 60));
            setFiveKTimeSec(Math.round(totalSecondsPerKm * 5 % 60));

            setTenKTimeHr(Math.floor(totalSecondsPerKm * 10 / 3600));
            setTenKTimeMin(Math.floor(totalSecondsPerKm * 10 % 3600 / 60));
            setTenKTimeSec(Math.round(totalSecondsPerKm * 10 % 60));

            setHalfMarathonTimeHr(Math.floor(totalSecondsPerKm * KM_TO_HM / 3600));
            setHalfMarathonTimeMin(Math.floor(totalSecondsPerKm * KM_TO_HM % 3600 / 60));
            setHalfMarathonTimeSec(Math.round(totalSecondsPerKm * KM_TO_HM % 60));

            setMarathonTimeHr(Math.floor(totalSecondsPerKm * KM_TO_M / 3600));
            setMarathonTimeMin(Math.floor(totalSecondsPerKm * KM_TO_M % 3600 / 60));
            setMarathonTimeSec(Math.round(totalSecondsPerKm * KM_TO_M % 60));
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

    // array of timeMin and timeSec values to display
    const timeValues = [
        { label: '5k', timeHr: fiveKTimeHr, fiveKTimeHr, timeMin: fiveKTimeMin, timeSec: fiveKTimeSec },
        { label: '10k', timeHr: tenKTimeHr, timeMin: tenKTimeMin, timeSec: tenKTimeSec },
        { label: 'half marathon', timeHr: halfMarathonTimeHr, timeMin: halfMarathonTimeMin, timeSec: halfMarathonTimeSec },
        { label: 'marathon', timeHr: marathonTimeHr, timeMin: marathonTimeMin, timeSec: marathonTimeSec },
    ];

    function hourMinuteInputs(timeHr: number, timeMin: number) {
        if (timeHr > 0) {
            return (
                <>
                    <input
                        type="number"
                        pattern="\d{0,2}"
                        className='input-value'
                        value={unpadZero(timeHr)}
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
                        value={padZero(timeMin)}
                        onFocus={handleFocus} 
                        // onChange={handleTimeSecChange}
                        min={0}
                        max={59}
                    />
                </>
            )
        } else {
            return (
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
            )
        }
    }

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
            <div className="inputs-grid">
                {timeValues.map((time, i) => (
                    <div className='input-group inputs-grid-item' key={i}>
                        <label>
                            {time.label}
                            <div className='time-input'>
                                {hourMinuteInputs(time.timeHr, time.timeMin)}
                                <span>:</span>
                                <input
                                    type="number"
                                    pattern="\d{0,2}"
                                    className='input-value'
                                    value={padZero(time.timeSec)}
                                    onFocus={handleFocus} 
                                    // onChange={handleTimeSecChange}
                                    min={0}
                                    max={59}
                                />
                            </div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}