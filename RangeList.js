// Task: Implement a class named 'RangeList'
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range list is an aggregate of these ranges: [1, 5), [10, 11), [100,201)
/**
*
* NOTE: Feel free to add any extra member variables/functions you like.
*/

'use strict'

class RangeList {

    constructor() {
        this.rangeList = [];
    }
    
    /**
    * Adds a range to the list
    * @param {Array<number>} range - Array of two integers that specify
    beginning and end of range.
    */
    add(range) {
        // TODO: implement this
        this.rangeList.push(range);
        // 按照区间的左边界排序
        this.rangeList.sort((a, b) => a[0] - b[0]);
        const res = [];
        // 将第一个区间加入答案
        res.push(this.rangeList[0]);
        const len = this.rangeList.length;
        // 从i=1遍历
        for (let i = 1; i < len; i++) {
            // st: start index of target range, et: end index of target range
            let [st, et] = [...this.rangeList[i]];
            if (st > res[res.length - 1][1]) {
                // 若当前区间的左边界大于res最后一个区间的右边界，则他们肯定不会重合
                res.push(this.rangeList[i]);
            } else {
                // 否则，他们会重合，更新res最后一个区间的右边界
                res[res.length - 1][1] = Math.max(res[res.length - 1][1], et);
            }
        }
        this.rangeList = res;
    }

    /**
    * Removes a range from the list
    * @param {Array<number>} range - Array of two integers that specify
    beginning and end of range.
    */
    remove(range) {
        // TODO: implement this
        let [min, max] = [...range];
        // console.log(min, max);
        const len = this.rangeList.length;
        const res = [];
        for(let i = 0; i < len; i++) {
            let [st, et] = [...this.rangeList[i]];
            
            if(min >= et || max < st) {
                // 当前区间在要删除的区间右侧, 当前区间在要删除的区间左侧
                res.push(this.rangeList[i])
            } else {
                // console.log(`[${Math.max(st, min)}, ${Math.min(max, et)}]`);
                // 当前区间与被删除的区间有交集
                // [Math.max(st, min), Math.min(max, et)] 为两个集合的交集，所求为交集的补集
                if(st < Math.max(st, min)) {
                    res.push([st, Math.max(st, min)])
                }
                
                if(et > max) {
                    res.push([max, et])
                }
            }
        }

        this.rangeList = res;
    }

    /**
    * Prints out the list of ranges in the range list
    */
    print() {
        // TODO: implement this
        let printStr = '';
        for(let i = 0, len = this.rangeList.length; i < len; i++) {
            let range = this.rangeList[i];
            let [min, max] = [...range];
            printStr += `[${min}, ${max}) `
        }
        console.log(printStr);
    }
}

// Example run
let rl = new RangeList();
rl.add([1, 5]);
rl.print();
// Should display: [1, 5)
rl.add([10, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 21]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([2, 4]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([3, 8]);
rl.print();
// Should display: [1, 8) [10, 21)
rl.remove([10, 10]);
rl.print();
// Should display: [1, 8) [10, 21)
rl.remove([10, 11]);
rl.print();
// Should display: [1, 8) [11, 21)
rl.remove([15, 17]);
rl.print();
// Should display: [1, 8) [11, 15) [17, 21)
rl.remove([3, 19]);
rl.print();
// Should display: [1, 3) [19, 21)
