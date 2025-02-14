const cpfMask = [
    /\d/, /\d/, /\d/, ".", 
    /\d/, /\d/, /\d/, ".", 
    /\d/, /\d/, /\d/, "-", 
    /\d/, /\d/
  ];
  
  const phoneMask = [
    "(", /\d/, /\d/, ")", " ", 
    /\d/, /\d/, /\d/, /\d/, 
    "-", /\d/, /\d/, /\d/, /\d/
  ];



  export {cpfMask,phoneMask}