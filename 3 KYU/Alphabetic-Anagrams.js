/*
Consider a "word" as any sequence of capital letters A-Z (not limited to just "dictionary words").
For any word with at least two different letters, there are other words composed of the same letters 
but in a different order (for instance, STATIONARILY/ANTIROYALIST, which happen to both be dictionary 
words; for our purposes "AAIILNORSTTY" is also a "word" composed of the same letters as these two).

We can then assign a number to every word, based on where it falls in an alphabetically sorted list of 
all words made up of the same group of letters. One way to do this would be to generate the entire list 
of words and find the desired one, but this would be slow if the word is long.

Given a word, return its number. Your function should be able to accept any word 25 letters or less in 
length (possibly with some letters repeated), and take no more than 500 milliseconds to run. To compare, 
when the solution code runs the 27 test cases in JS, it takes 101ms.

For very large words, you'll run into number precision issues in JS (if the word's position is greater 
than 2^53). For the JS tests with large positions, there's some leeway (.000000001%). If you feel like 
you're getting it right for the smaller ranks, and only failing by rounding on the larger, submit a couple 
more times and see if it takes.

Python, Java and Haskell have arbitrary integer precision, so you must be precise in those languages (unless 
someone corrects me).

C# is using a long, which may not have the best precision, but the tests are locked so we can't change it.

Sample words, with their rank:
ABAB = 2
AAAB = 1
BAAA = 4
QUESTION = 24572
BOOKKEEPER = 10743

*/


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
