export const padZero = (num: number) => (num < 10 ? `0${num}` : `${num}`);

export const unpadZero = (num: number) => {
    if (num === 0) {
        return '0';
    }
    return num.toString().replace(/^0+/, '');
}

export const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
}