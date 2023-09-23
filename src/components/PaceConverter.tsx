import { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';

const KM_TO_MI = 0.62137119;

const PaceConverter: React.FC = () => {
    const [minPerKmInput, setMinPerKmInput] = useState<string>('');
    const [minPerMiInput, setMinPerMiInput] = useState<string>('');
  
    const debouncedMinPerKm = useDebounce(minPerKmInput, 500);
    const debouncedMinPerMi = useDebounce(minPerMiInput, 500);
  
    useEffect(() => {
      if (debouncedMinPerKm) {
        const [min, sec] = debouncedMinPerKm.split(':').map(Number);
        const totalSecondsPerKm = min * 60 + sec;
        const totalSecondsPerMi = totalSecondsPerKm / KM_TO_MI;
        const minPerMi = `${Math.floor(totalSecondsPerMi / 60)}:${Math.round(totalSecondsPerMi % 60)}`;
        setMinPerMiInput(minPerMi);
      }
    }, [debouncedMinPerKm]);
  
    useEffect(() => {
      if (debouncedMinPerMi) {
        const [min, sec] = debouncedMinPerMi.split(':').map(Number);
        const totalSecondsPerMi = min * 60 + sec;
        const totalSecondsPerKm = totalSecondsPerMi * KM_TO_MI;
        const minPerKm = `${Math.floor(totalSecondsPerKm / 60)}:${Math.round(totalSecondsPerKm % 60)}`;
        setMinPerKmInput(minPerKm);
      }
    }, [debouncedMinPerMi]);

    return (
        <div className="converter">
            <div className='inputs-row'>
                <label>
                    min / km
                    <input
                        type="text"
                        className='input-time'
                        value={minPerKmInput}
                        onChange={(e) => setMinPerKmInput(e.target.value)}
                        placeholder="mm:ss"
                    />
                </label>
                <label>
                    min / mi
                    <input
                        type="text"
                        className='input-time'
                        value={minPerMiInput}
                        onChange={(e) => setMinPerMiInput(e.target.value)}
                        placeholder="mm:ss"
                    />
                </label>
            </div>
        </div>
    );
}

export default PaceConverter;
