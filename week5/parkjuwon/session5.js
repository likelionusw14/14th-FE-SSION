//문제 1 두 수의 합 구하기

function solution(num1, num2) {
    if (-50000 <= num1 && num1 <= 50000 && -50000 <= num2 && num2 <= 50000){
       return num1 + num2;    
       }
}

//문제2 나머지 구하기

function solution(num1, num2) {
    if (0 <= num1 && num1 <= 100 && 0 <= num2 && num2 <= 100 )
    return (num1%num2);
}

//문제3 분수의 덧셈

function solution(numer1, denom1, numer2, denom2) {
    let top = (numer1 * denom2) + (numer2 * denom1);
    let bottom = denom1 * denom2;

    let maximum = 0;
    for (let i = 1; i <= top; i++) {
        if (top % i === 0 && bottom % i === 0) {
            maximum = i;
        }
    }

    return [top / maximum, bottom / maximum];
}

//문제4 짝수는 싫어요

function solution(n) {
    var answer = [];
    for (let i = 1; i <= n; i++){
        if (i % 2 !== 0){
            answer.push(i);
        }
    }
    return answer;
}


//문제5 피자 나눠먹기(1)

function solution(n) {
    if (1 <= n && n <= 100){
        return Math.floor((n+6) / 7);
    }
}

//문제6 배열의 평균값

function solution(numbers) {
    const sum = numbers.reduce((acc, cur) => acc + cur, 0);
    return (sum/numbers.length);
}