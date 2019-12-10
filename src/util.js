const gcd = (a, b) => {
    if (a === 0) { return Math.abs(b); }
    if (b === 0) { return Math.abs(a); }
    if (Math.abs(a) > Math.abs(b)) { return gcd(b, a % b); }
    return gcd(a, b % a);
}

export { gcd };
