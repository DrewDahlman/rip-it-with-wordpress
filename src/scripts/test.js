class Test {
  constructor(){
    let foo = [1,2,3];
    _.each( foo, (f) => {
      console.log(f);
    });
  }
}

module.exports = Test;