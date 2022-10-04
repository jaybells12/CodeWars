/*
Your task in this Kata is to emulate text justification in monospace font. You will be given a 
single-lined text and the expected justification width. The longest word will never be greater 
than this width.

Here are the rules:

    Use spaces to fill in the gaps between words.
    Each line should contain as many words as possible.
    Use '\n' to separate lines.
    Gap between words can't differ by more than one space.
    Lines should end with a word not a space.
    '\n' is not included in the length of a line.
    Large gaps go first, then smaller ones ('Lorem--ipsum--dolor--sit-amet,' (2, 2, 2, 1 spaces)).
    Last line should not be justified, use only one space between words.
    Last line should not contain '\n'
    Strings with one word do not need gaps ('somelongword\n').

*/

function justify(text, width) {
  if( text.length < width) return text;
  
  const wordArr = text.split(' ')
  let NLA = [], JTA = [];
  let clw = 0, idx = 0;
  
  for(let i = 0; i < wordArr.length; i++){
    let wLen = wordArr[i].length;
    let word = wordArr[i];
    if(wLen + clw <= width){
      NLA.push(word);
      clw += wLen + 1;
    }else if(wLen + clw > width){
      JTA.push(NLA)
      NLA = [word];
      clw = wLen + 1;
    }
    if( i === wordArr.length - 1){
      JTA.push(NLA)
    }
  }
  
  function distributeSpaces(line){
    let lineWidth = line.join(' ').length;
    if(line.length === 1) return line.toString().concat('\n');
    let i = 0;
    
    while(lineWidth < width){
      
      line[i] += " ";
      lineWidth += 1;
      i++;
      if( i === line.length - 1){
        i = 0;
      }
    }
    
    return line.join(' ').concat('\n');
  }
  
  return JTA.map( (line, idx) => {
    if( idx < JTA.length - 1){
      return JTA[idx] = distributeSpaces(line);
    }else{
      return JTA[idx] = line.join(' ');
    }
  }).join('');

}
