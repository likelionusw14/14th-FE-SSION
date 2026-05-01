//문제 1

function solution(num1, num2) {
    if (0 <= num1 && num1 <= 100 && 0 <= num2 && num2 <= 100) {
        const result = num1 * num2;
        return result;
    }
}

//문제2

function solution(num1, num2) {
    if (0 <= num1 && num1 <= 100 && 0 <= num2 && num2 <= 100) {
        const result = Math.floor((num1 / num2) * 1000);
        return result;
    }
}

//문제3

function solution(num1, num2) {
    if (0 <= num1 && num1 <= 10000 && 0 <= num2 && num2 <= 10000) {
        return num1 === num2 ? 1 : -1;
    }
}

//문제4

function solution(num1, num2) {
    if (0 <= num1 && num1 <= 100 && 0 <= num2 && num2 <= 100)
        return (num1 % num2);
}

//문제5

function solution(age) {
    if (0 < age && age <= 120) {
        return (2023 - age);
    }
}

//문제6

function solution(num1, num2) {
    if (-50000 <= num1 && num1 <= 50000 && -50000 <= num2 && num2 <= 50000)
        return (num1 - num2);
}

//문제7

function solution(num1, num2) {
    if (0 < num1 && num1 <= 100 && 0 < num2 && num2 <= 100)
        return Math.floor(num1 / num2);
}

//문제8

function solution(array, height) {
    if (array.length < 1 || array.length > 100) return 0;
    if (height < 1 || height > 200) return 0;

    const tall = array.filter(function (item) {
        return (item >= 1 && item <= 200) && (item > height);
    });

    return tall.length
}

//문제9

function solution(num1, num2) {
    if (-50000 <= num1 && num1 <= 50000 && -50000 <= num2 && num2 <= 50000) {
        return num1 + num2;
    }
}

//문제10

function solution(n) {
    if (1 <= n && n <= 100) {
        return Math.floor((n + 6) / 7);
    }
}

//문제11

function solution(slice, n) {
    var answer = 0;
    answer = Math.floor(n / slice);
    if (n % slice != 0) {
        answer += 1;
    }
    return answer;
}

//문제12

function solution(numbers) {
    const sum = numbers.reduce((acc, cur) => acc + cur, 0);
    return (sum / numbers.length);
}