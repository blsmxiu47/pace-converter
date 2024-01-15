export const padZero = (num: number) => {
    num = Math.round(num);
    if (num < 10) {
        return `0${num}`;
    } else {
        return `${num}`;
    }
}

export const unpadZero = (num: number) => {
    num = Math.round(num);
    if (num === 0) {
        return '0';
    }
    return num.toString().replace(/^0+/, '');
}

export const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
}

const timeTypes = ['minute', 'second'];

export const validateTimeInput = (value: string, type: typeof timeTypes[number]) => {
    const valueStr = value.toString().replace(/^0+/, '');
    if (!/^\d{0,2}$/.test(valueStr)) {
        return;
    }
    const num = valueStr === '' ? 0 : parseInt(valueStr, 10);
    let max_num = 99;
    if (type === 'second') {
        max_num = 59;
    }
    if (isNaN(num) || num < 0 || num > max_num) {
        return;
    }
    return num;
}