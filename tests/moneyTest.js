import {formatCurrency} from '../scripts/utils/money.js';

console.log('Test Suite : Format Currency')

console.log('converts cents into dollar')
if(formatCurrency(2095) === '20.95'){
    console.log('pass')
}else {                     // basic test case
    console.log('fail')
}

console.log('works with 0')
if(formatCurrency(0)==='0.00'){
    console.log('pass')
}else{                          //tricky cases 
    console.log('fail')
}

console.log('rounds upto the nearest cent')
if(formatCurrency(2000.5)==='20.01'){
    console.log('pass')               //tricky cases
}else{
    console.log('fail')
}
