function solution(numer1, denom1, numer2, denom2) {
    var answer = [];
     // 분수 덧셈: 통분
    var numer = numer1 * denom2 + numer2 * denom1;
    var denom = denom1 * denom2;
    
    // 최대공약수(GCD) 구하기
    function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
    }
    
    var g = gcd(numer, denom);
    
    answer[0] = numer / g;
    answer[1] = denom / g;
    return answer;
}