/*
Create a function that takes a positive integer and returns the next bigger 
number that can be formed by rearranging its digits. 

For example:

12 ==> 21
513 ==> 531
2017 ==> 2071

nextBigger(num: 12)   // returns 21
nextBigger(num: 513)  // returns 531
nextBigger(num: 2017) // returns 2071

If the digits can't be rearranged to form a bigger number, return -1:

9 ==> -1
111 ==> -1
531 ==> -1

*/

function nextBigger(n){
  let orgArr = n.toString().split('');
  let difIdx = null;
  
  for(let i = orgArr.length - 1; i > 0; i--){
    if(orgArr[i] > orgArr[i-1]){
      difIdx = i-1;
      break;
    }
  }
  
  if(difIdx === null){ //did not find, no such permutation possible
    return -1
  }
  
  let tempArr = orgArr.slice(difIdx);
  //when temp arr length is only 2, swap values, splice back into original and return it as number
  if(tempArr.length === 2){
    tempArr.reverse();
    orgArr.splice(difIdx, 2, ...tempArr);
    return Number(orgArr.join('')) 
    
  }
  //when array length is greater than 2
  
  let dif = tempArr.shift(); // removing and storing topmost element
  let tempDif = 9; //storing temp highest possible single digit value
  let difChanged = false; // storing bool if dif variable actually changed
  
  for(let i = 0; i < tempArr.length; i++){ 
    if(tempArr[i] > dif && tempArr[i] <= tempDif){ // dif = 3 arr = 6, 3, 5, 4, 6
      tempDif = tempArr[i] // = 6, 5, 4, 6
      difChanged = true;
    }
  }
  //if dif changed, push old dif back onto array, remove new dif from array and set dif to tempDif 
  if(difChanged){
    tempArr.splice(tempArr.indexOf(tempDif), 1)
    tempArr.push(dif)
    dif = tempDif;
  }
  // now sort arr and unshift DIF to the front of the sorted array
  tempArr.sort((a,b) => a - b);
  tempArr.unshift(dif);
  orgArr.splice(difIdx, tempArr.length, ...tempArr);
  
  return Number(orgArr.join(''))
}

/* 
1) turn string into an array of single digit numbers
2) loop through array from end to start
3) compare last-most digit to the one in front of it
4) when the digit-in-front is less than the iterator, grab index of digit-in-front
5) create array from DIF index to end example 127184 = 184 | 7890 = 890
6) if the created array is only of length two, simply swap them
7) else loop over the created array
8) find next highest number compared to left-most digit ex: 890 => next is 9
9) remove and store this number ex: 890 = 8 0, stored = 9
10) sort the created array ascending order ex: 8 0 = 0 8
11) unshift the stored number onto the array ex: stored: 9, arr: 0, 8 unshifted: 9, 0, 8
12) splice into original array the new array, removing same number of elements,
12a) at digit in front index
13) transform array back into a number and return number
*/
