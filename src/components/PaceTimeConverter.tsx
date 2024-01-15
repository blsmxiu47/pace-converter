import { useState, useEffect } from "react"

import useDebounce from "../hooks/useDebounce"
import { padZero, unpadZero, handleFocus, validateTimeInput } from "../utils/utils"

const KM_TO_MI = 0.62137119;
const HM_TO_KM = 21.0975;
const M_TO_KM = 42.195;
const debounceDelay = 200;

export default function PaceTimeConverter() {
    const [paceUnit, setPaceUnit] = useState<'km' | 'mi'>('km');
    const [minPerKmMin, setMinPerKmMin] = useState<number>(0);
    const [minPerKmSec, setMinPerKmSec] = useState<number>(0);
    const [minPerMiMin, setMinPerMiMin] = useState<number>(0);
    const [minPerMiSec, setMinPerMiSec] = useState<number>(0);
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
    
    const debouncedMinPerKmMin = useDebounce(minPerKmMin, debounceDelay);
    const debouncedMinPerKmSec = useDebounce(minPerKmSec, debounceDelay);
    const debouncedMinPerMiMin = useDebounce(minPerMiMin, debounceDelay);
    const debouncedMinPerMiSec = useDebounce(minPerMiSec, debounceDelay);
    const debouncedFiveKTimeHr = useDebounce(fiveKTimeHr, debounceDelay);
    const debouncedFiveKTimeMin = useDebounce(fiveKTimeMin, debounceDelay);
    const debouncedFiveKTimeSec = useDebounce(fiveKTimeSec, debounceDelay);
    const debouncedTenKTimeHr = useDebounce(tenKTimeHr, debounceDelay);
    const debouncedTenKTimeMin = useDebounce(tenKTimeMin, debounceDelay);
    const debouncedTenKTimeSec = useDebounce(tenKTimeSec, debounceDelay);
    const debouncedHalfMarathonTimeHr = useDebounce(halfMarathonTimeHr, debounceDelay);
    const debouncedHalfMarathonTimeMin = useDebounce(halfMarathonTimeMin, debounceDelay);
    const debouncedHalfMarathonTimeSec = useDebounce(halfMarathonTimeSec, debounceDelay);
    const debouncedMarathonTimeHr = useDebounce(marathonTimeHr, debounceDelay);
    const debouncedMarathonTimeMin = useDebounce(marathonTimeMin, debounceDelay);
    const debouncedMarathonTimeSec = useDebounce(marathonTimeSec, debounceDelay);
    
    const validTimeUnits = ['hour', 'minute', 'second'];
    const validSources = ['per_km', 'per_mi', '5k', '10k', 'half marathon', 'marathon'];
    const [source, setSource] = useState<typeof validSources[number] | null>(null);
    const timeValues = [
        { label: '5k', timeHr: fiveKTimeHr, timeMin: fiveKTimeMin, timeSec: fiveKTimeSec },
        { label: '10k', timeHr: tenKTimeHr, timeMin: tenKTimeMin, timeSec: tenKTimeSec },
        { label: 'half marathon', timeHr: halfMarathonTimeHr, timeMin: halfMarathonTimeMin, timeSec: halfMarathonTimeSec },
        { label: 'marathon', timeHr: marathonTimeHr, timeMin: marathonTimeMin, timeSec: marathonTimeSec },
    ];

    function secondsPerKmToTimes(seconds: number) {
        if (source !== 'per_km') {
            setMinPerKmMin(Math.floor(seconds / 60));
            setMinPerKmSec(seconds % 60);
        }
        if (source !== 'per_mi') {
            const totalSecondsPerMi = seconds / KM_TO_MI;
            setMinPerMiMin(Math.floor(totalSecondsPerMi / 60));
            setMinPerMiSec(Math.round(totalSecondsPerMi % 60));
        }
        if (source !== '5k') {
            setFiveKTimeHr(Math.floor(seconds * 5 / 3600));
            setFiveKTimeMin(Math.floor(seconds * 5 % 3600 / 60));
            setFiveKTimeSec(seconds * 5 % 60);
        }
        if (source !== '10k') {
            setTenKTimeHr(Math.floor(seconds * 10 / 3600));
            setTenKTimeMin(Math.floor(seconds * 10 % 3600 / 60));
            setTenKTimeSec(seconds * 10 % 60);
        }
        if (source !== 'half marathon') {
            setHalfMarathonTimeHr(Math.floor(seconds * HM_TO_KM / 3600));
            setHalfMarathonTimeMin(Math.floor(seconds * HM_TO_KM % 3600 / 60));
            setHalfMarathonTimeSec(seconds * HM_TO_KM % 60);
        }
        if (source !== 'marathon') {
            setMarathonTimeHr(Math.floor(seconds * M_TO_KM / 3600));
            setMarathonTimeMin(Math.floor(seconds * M_TO_KM % 3600 / 60));
            setMarathonTimeSec(seconds * M_TO_KM % 60);
        }
    }

    // pace unit changed
    useEffect(() => {
            setMinPerKmMin(0);
            setMinPerKmSec(0);
            setMinPerMiMin(0);
            setMinPerMiSec(0);
            setFiveKTimeHr(0);
            setFiveKTimeMin(0);
            setFiveKTimeSec(0);
            setTenKTimeHr(0);
            setTenKTimeMin(0);
            setTenKTimeSec(0);
            setHalfMarathonTimeHr(0);
            setHalfMarathonTimeMin(0);
            setHalfMarathonTimeSec(0);
            setMarathonTimeHr(0);
            setMarathonTimeMin(0);
            setMarathonTimeSec(0);
    }, [paceUnit]);

    // min/km input changed
    useEffect(() => {
        if (source === 'per_km') {
            const totalSecondsPerKm = debouncedMinPerKmMin * 60 + debouncedMinPerKmSec;
            secondsPerKmToTimes(totalSecondsPerKm);
        }
    }, [source, debouncedMinPerKmMin, debouncedMinPerKmSec]);

    // min/mi input changed
    useEffect(() => {
        if (source === 'per_mi') {
            const totalSecondsPerKm = (debouncedMinPerMiMin * 60 + debouncedMinPerMiSec) * KM_TO_MI;
            secondsPerKmToTimes(totalSecondsPerKm);
        }
    }, [source, debouncedMinPerMiMin, debouncedMinPerMiSec]);

    // 5k time input changed
    useEffect(() => {
        if (source === '5k') {
            const totalSecondsPerKm = (debouncedFiveKTimeHr * 3600 + debouncedFiveKTimeMin * 60 + debouncedFiveKTimeSec) / 5;
            secondsPerKmToTimes(totalSecondsPerKm);
        }
    }, [source, debouncedFiveKTimeHr, debouncedFiveKTimeMin, debouncedFiveKTimeSec]);

    // 10k time input changed
    useEffect(() => {
        if (source === '10k') {
            const totalSecondsPerKm = (debouncedTenKTimeHr * 3600 + debouncedTenKTimeMin * 60 + debouncedTenKTimeSec) / 10;
            secondsPerKmToTimes(totalSecondsPerKm);
        }
    }, [source, debouncedTenKTimeHr, debouncedTenKTimeMin, debouncedTenKTimeSec]);

    // half marathon time input changed
    useEffect(() => {
        if (source === 'half marathon') {
            const totalSecondsPerKm = (debouncedHalfMarathonTimeHr * 3600 + debouncedHalfMarathonTimeMin * 60 + debouncedHalfMarathonTimeSec) / HM_TO_KM;
            secondsPerKmToTimes(totalSecondsPerKm);
        }
    }, [source, debouncedHalfMarathonTimeHr, debouncedHalfMarathonTimeMin, debouncedHalfMarathonTimeSec]);

    // marathon time input changed
    useEffect(() => {
        if (source === 'marathon') {
            const totalSecondsPerKm = (debouncedMarathonTimeHr * 3600 + debouncedMarathonTimeMin * 60 + debouncedMarathonTimeSec) / M_TO_KM;
            secondsPerKmToTimes(totalSecondsPerKm);
        }
    }, [source, debouncedMarathonTimeHr, debouncedMarathonTimeMin, debouncedMarathonTimeSec]);

    const handleMinPerKmMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSource('per_km');
        const value = validateTimeInput(e.target.value, 'minute');
        if (value === undefined) {
            return;
        } else {
            setMinPerKmMin(value);
        }
    };

    const handleMinPerKmSecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSource('per_km');
        const value = validateTimeInput(e.target.value, 'second');
        if (value === undefined) {
            return;
        } else {
            setMinPerKmSec(value);
        }
    }

    const handleMinPerMiMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSource('per_mi');
        const value = validateTimeInput(e.target.value, 'minute');
        if (value === undefined) {
            return;
        } else {
            setMinPerMiMin(value);
        }
    }

    const handleMinPerMiSecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSource('per_mi');
        const value = validateTimeInput(e.target.value, 'second');
        if (value === undefined) {
            return;
        } else {
            setMinPerMiSec(value);
        }
    };

    const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>, source: typeof validSources[number], timeUnit: typeof validTimeUnits[number]) => {
        setSource(source);
        const value = validateTimeInput(e.target.value, timeUnit);
        if (value === undefined) {
            return;
        } else {
            switch (timeUnit) {
                case 'hour':
                    switch (source) {
                        case '5k':
                            setFiveKTimeHr(value);
                            break;
                        case '10k':
                            setTenKTimeHr(value);
                            break;
                        case 'half marathon':
                            setHalfMarathonTimeHr(value);
                            break;
                        case 'marathon':
                            setMarathonTimeHr(value);
                            break;
                    }
                    break;
                case 'minute':
                    switch (source) {
                        case '5k':
                            setFiveKTimeMin(value);
                            break;
                        case '10k':
                            setTenKTimeMin(value);
                            break;
                        case 'half marathon':
                            setHalfMarathonTimeMin(value);
                            break;
                        case 'marathon':
                            setMarathonTimeMin(value);
                            break;
                    }
                    break;
                case 'second':
                    switch (source) {
                        case '5k':
                            setFiveKTimeSec(value);
                            break;
                        case '10k':
                            setTenKTimeSec(value);
                            break;
                        case 'half marathon':
                            setHalfMarathonTimeSec(value);
                            break;
                        case 'marathon':
                            setMarathonTimeSec(value);
                            break;
                    }
                    break;
            }
        }
    }

    function hourMinuteInputs(inputLabel: typeof validSources[number], timeHr: number, timeMin: number) {
        if (timeHr > 0) {
            return (
                <>
                    <input
                        type="number"
                        pattern="\d{0,2}"
                        className='input-value'
                        value={unpadZero(timeHr)}
                        onFocus={handleFocus} 
                        onChange={(e) => handleTimeInputChange(e, inputLabel, 'hour')}
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
                        onChange={(e) => handleTimeInputChange(e, inputLabel, 'minute')}
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
                    onChange={(e) => handleTimeInputChange(e, inputLabel, 'minute')}
                    min={0}
                    max={99}
                />
            )
        }
    }

    return (
        <div className="converter">
            <div className='input-group'>
                <div className="units-switch">
                    <label>
                        min / km
                        <input
                            type="radio"
                            name="pace-unit"
                            value="km"
                            checked={paceUnit === 'km'}
                            onChange={() => setPaceUnit('km')}
                        />
                    </label>
                    <label>
                        min / mi
                        <input
                            type="radio"
                            name="pace-unit"
                            value="mi"
                            checked={paceUnit === 'mi'}
                            onChange={() => setPaceUnit('mi')}
                        />
                    </label>
                </div>
                <label>
                    min / {paceUnit}
                    <div className='time-input'>
                        <input
                            type="number"
                            pattern="\d{0,2}"
                            className='input-value'
                            value={paceUnit === 'km' ? unpadZero(minPerKmMin) : unpadZero(minPerMiMin)}
                            onFocus={handleFocus} 
                            onChange={paceUnit === 'km' ? handleMinPerKmMinChange : handleMinPerMiMinChange}
                            min={0}
                            max={99}
                        />
                        <span>:</span>
                        <input
                            type="number"
                            pattern="\d{0,2}"
                            className='input-value'
                            value={paceUnit === 'km' ? padZero(minPerKmSec) : padZero(minPerMiSec)}
                            onFocus={handleFocus} 
                            onChange={paceUnit === 'km' ? handleMinPerKmSecChange : handleMinPerMiSecChange}
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
                                {hourMinuteInputs(time.label, time.timeHr, time.timeMin)}
                                <span>:</span>
                                <input
                                    type="number"
                                    pattern="\d{0,2}"
                                    className='input-value'
                                    value={padZero(time.timeSec)}
                                    onFocus={handleFocus} 
                                    onChange={(e) => handleTimeInputChange(e, time.label, 'second')}
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