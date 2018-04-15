//defining variables
  const SUBMIT_BUTTON= $('#submit_grid');
  const PIXEL_CANVAS = $('#pixel_canvas');
  let color = $('#colorPicker');
  let hoverEffect = false;
  let prevColor;
  let drag = false;

  //activatig MakeGrid function when the SUBMIT_BUTTON is clicked on
SUBMIT_BUTTON.click(function makeGrid(event) {
  // making sure Grid is clear before making grid
  PIXEL_CANVAS.empty();
  //defining the variables that will store the height and width values.
  let heightVal = $('#input_height').val();
  let widthVal= $('#input_width').val();
  //nested for loops to produce grid, selecting the table and adding the ammount of <tr> and <td> defined by user
  for (let h = 0; h < heightVal; h= h + 1) {
    const cHeight= $('<tr></tr>');
    PIXEL_CANVAS.append(cHeight);
    for (let w = 0; w < widthVal; w= w + 1 ) {
      const cWidth= $('<td></td>');
      cHeight.append(cWidth);
    }
  }
  //add instructions to erase cell (p tag that only becomes visible when the submit button is pressed)
  $('.rightClick').css('visibility', 'visible');
  //to keep the input there after submitting dimensions
  event.preventDefault();
});

//Preview color on the canvas by hovering over cells
PIXEL_CANVAS.on('mouseenter', 'td', function(){
  prevColor = $(this).css('background-color');
  $(this).css('background-color', color.val());
  hoverEffect = true;
});
PIXEL_CANVAS.on('mouseleave', 'td', function(){
  if(hoverEffect === true){
    $(this).css('background-color', prevColor);
    hoverEffect = false;
  }
});

//Color Canvas background
$('.fill').click(function() {
  PIXEL_CANVAS.css('background-color', color.val());
});

//Hover effects on icons
$('.fa-th').hover(function() {
  $(this).css('color',color.val());
}, function(){
  $(this).css('color', 'black');
});

//Color each cell and on mousedown
PIXEL_CANVAS.on('click', 'td', function(){
  $(this).css("background-color", color.val());
});
PIXEL_CANVAS.on('mousedown', 'td', function(e){
  //remove color with mouse right click
  if (e.which == 3) {
    $(this).css('background-color', 'rgba(0, 0, 0, 0)');
     hoverEffect = false;
  }
  // Select color
  else {
    $(this).css('background-color', color.val());
  hoverEffect = false;
  drag = true;
  e.preventDefault();
}
});
// to drag and paint
PIXEL_CANVAS.on('mousemove', 'td', function(){
  if (drag) {
    $(this).css("background-color", color.val());
    hoverEffect = false;
  }
});
// stop painting on mouseup
PIXEL_CANVAS.on ('mouseup', 'td', function () {
  drag = false;
});
//stop painting after leaving the canvas
PIXEL_CANVAS.mouseleave(function () {
  drag = false;
});

//Clear Canvas (back to white)
$('.clear').click(function(){
  PIXEL_CANVAS.css('background-color', 'white');
  $('td').css('background-color', '');
});
//Toggle Grid lines
$('.removeGrid').click(function(evt){
  $('table, tr, td').toggleClass('no-border');
  $('#eyeClosed').toggleClass('fa-eye-slash');
  $('#eye').toggleClass('fa-eye');
  evt.preventDefault();
});
