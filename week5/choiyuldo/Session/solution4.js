function solution(num1, num2) {
    var answer = 0;
    for(;num1 >= num2;){
        num1 -= num2;
        answer++;
    }
    return answer;
}