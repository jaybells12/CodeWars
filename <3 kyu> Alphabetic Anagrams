function listPosition(word) {
  
  function factorial(n){
    if(n <= 1) return 1;
    return n*factorial(n-1);
  }
  
  /*
    I used an object for this function because I found it easier for preventing duplicate entries,
    the function maps over a sorted array, looking for repeated etters by comparing indexof and 
    lastindexof. then if the object doesnt  have a key for given letter
    it creates the key and sets the value to the difference between the indices plus 1
    finally i return the object as an array
  */
  
  function repeatingLettersCount(array){
    let obj = {};
    array.map( letter => {
      let loc1 = array.indexOf(letter), loc2 = array.lastIndexOf(letter)
      if(loc1 !== loc2){
        if(!Object.hasOwnProperty(obj, letter)){
          obj[letter] = loc2 - loc1 + 1;
        }
      }
    })
    return Object.entries(obj);
  }
  
  // receives sorted array of letters, the returned value is the number of letters that comes before the 
  // given letter alphabetically, coincidentally, this is also its index.
  
  function countLettersBefore(array, letter){
    return array.indexOf(letter);
  }
  
  let lettersArray = word.split('').sort();
  let letterCount = word.length;
  let repeatingCount = repeatingLettersCount(lettersArray)
  let index = 1;
  
  /*
  for loop has 2 paths, repeating letters and no repeating letters;
  repeating letters:
  here i had to keep track of how many letters repeat and how many times they repeat 
  when the loop index was on a repeated letter, reduce its repeated count, after the main calculation
  to facilitate the math, no count is reduced below 1
  
  the main calculation:
  get permutations possible for current length of word - 1
  multiply this by the number of letters which come before the current letter alphabetically
  this result is added to previous result, or 1 if first iteration
  remove current letter from sorted letters array
  next iteration
  
  final sum gives the index location of a given word in a list of its total possible permutations
  */
  
  for(let i = 0; i < word.length; i++){
    if(repeatingCount.length !== 0){
      let foundIdx = repeatingCount.findIndex( el => { return el.includes(word[i]) } )
      let tempSum = 1;
      for(let j = 0; j < repeatingCount.length; j++){
        tempSum *= factorial(repeatingCount[j][1])
      }
      if( foundIdx !== -1 ){
        repeatingCount[foundIdx][1] = repeatingCount[foundIdx][1] > 1 ? repeatingCount[foundIdx][1] - 1 : 1
      }
      index += ( factorial(letterCount - (i + 1)) / tempSum ) * countLettersBefore(lettersArray, word[i]);
    }else{
      index += factorial(letterCount - (i + 1)) * countLettersBefore(lettersArray, word[i])   
    }
    lettersArray.splice(lettersArray.indexOf(word[i]), 1)
  }
  
  return index;
}
/*
  QUESTION -> E I N O Q S T U
    n = 8, x = number of letters left, which come before current letter
   Q 1st = ( !8-1 ) * 4 = 20160
   U 2nd = ( !8-2 ) * 6 = 4320
   E 3rd = ( !8-3 ) * 0 = 
   S 4th = ( !8-4 ) * 3 = 72
   T 5th = ( !8-5 ) * 3 = 18
   I 6th = ( !8-6 ) * 0 =
   O 7th = ( !8-7 ) * 1 = 1
   N 8th = ( !8-8 ) * 0 =
   + 1 to reach current index;

*/
