import {formatCurrency} from '../scripts/utils/money.js';

describe('test Suite: formatCurrency',()=>{
    it('converts cents into dollars',()=>{
         expect(formatCurrency(2095)).toEqual('20.95')
    })
});

describe('test Suite: same above',()=>{
    it('converts cents into dollars',()=>{
        expect(formatCurrency(0)).toEqual('0.00')
    })
});
describe('test Suite: Near to cents',()=>{
    it('converts cents into dollars',()=>{
        expect(formatCurrency(2000.5)).toEqual('20.01')
    }) 
}) 
