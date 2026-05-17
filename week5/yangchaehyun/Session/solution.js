//1. 두 수의 합 구하기
function solution(num1, num2) {
    var answer = num1 + num2;
    return answer;
}

//----------------------------
//2. 나머지 구하기
/*function solution(num1, num2) {
    return num1 % num2;
}*/

const solution = (num1, num2) => num1 % num2

//----------------------------
//3. 분수의 덧셈
function solution(numer1, denom1, numer2, denom2) {
    var answer = [];
    function getGCD(a, b) {     //유클리드 호제법 사용, 최대 공약수
        while (b !== 0) {
            let r = a % b;
            a = b;
            b = r;
        }
    return a;
    }
    
    function getLCM(a, b) {         //최소 공배수 구하기
        return (a * b) / getGCD(denom1, denom2);
    }
    
    denom = getLCM(denom1, denom2);
    
    numer1 = numer1 * (denom/denom1);
    numer2 = numer2 * (denom/denom2);
    
    numer = numer1 + numer2;        //분모 구하기

    const finalGCD = getGCD(numer, denom);      //마지막으로 분모, 분자 약분

    answer.push(numer / finalGCD);
    answer.push(denom / finalGCD);

    return answer;
}
//----------------------------
//4. 짝수는 싫어요
function solution(n) {
    var answer = [];
    count = 1;
    while (count <= n) {
        if (count % 2 !== 0) {
            answer.push(count);
            count += 1;
        } else { count += 1;}
    }
    return answer;
}
//----------------------------
//5. 피자 나눠먹기 (1)
function solution(n) {
    if (n % 7 !== 0) {
        return Math.trunc(n / 7 + 1);
    } return Math.trunc(n / 7);
}
//----------------------------
//6. 배열의 평균값
function solution(numbers) {
    sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i]   
    }
    return sum / numbers.length
}