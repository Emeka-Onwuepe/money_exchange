export function addCommas(x: number | string): string {
    const num = typeof x === 'string' ? parseFloat(x.toString().replace(/,/g, '')) : x;
    if (isNaN(num) || num === null) {
        return '0';
    }
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

export function removeCommas(x: string): number {
    const num = x.toString().replace(/,/g, '');
    return parseFloat(num)

}


console.log(removeCommas('10,000'))
