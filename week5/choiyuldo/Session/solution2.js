function solution(num1, num2) {
    var answer = 0;
    if (num1 >= -50000 && num1 <= 50000){
        if (num2 >= -50000 && num2 <= 50000){
            answer = num1 - num2;
            return answer;
        }
        else 
            return;
    }
    else 
        return;
    
}