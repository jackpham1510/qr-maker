(function (){
  let selection = window.getSelection();
  if (selection.type === "Range") {
    //console.log(selection.toString());
    return selection.toString();
  }
})()
