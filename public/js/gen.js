var canvas = document.getElementById('canvas'),
context = canvas.getContext('2d');
context.filter = 'blur(4px)';


  //$("#slider").slider('option',{min: 0, max: 500});

make_base();
//display_image()
function display_image()
{
  var width;
  $( function() {
    var handle = $( "#custom-handle" );
    $( "#slider" ).slider({
      min: 100,
      max: 500,
      create: function() {
        handle.text( $( this ).slider( "value" ) );
      },
      slide: function( event, ui ) {
        handle.text( ui.value );
        //console.log(ui.value)
        width = ui.value;
        height = width * base_image.width / base_image.height; 
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.filter = 'blur(4px)';
        context.drawImage(base_image, startX, startY, width, height); //void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

      }
    });
  } );
    setTimeout(function(){
      width=$('#slider').slider("option", "value");
    },200);

  base_image = new Image();
  console.log('CHANGE!');
  base_image.src = '/public/images/goose.png'; //show me your moves
  startX=50;
  startY=50;
  height=100;
  width=100;
  base_image.onload = function(){
      context.drawImage(base_image, startX, startY, height, width);
  }
}

//createBlurSlider();
function createBlurSlider(){
  $( function() {
    //var handle = $( "#custom-handle" );
    $( "#slider-blur" ).slider({
      min: 100,
      max: 500,
      create: function() {
        handle.text( $( this ).slider( "value" ) );
      },
      slide: function( event, ui ) {
        //handle.text( ui.value );

      }
    });
  } );

}



function make_base()
{
  document.getElementById('canvas').width = 754;
  document.getElementById('canvas').height = 740;
  base_image = new Image();
  base_image.src = '/public/images/goose.png';
  context.save();
  rotate = 0;

  function drawGrid(numElements){
    numRows = numElements;
    numColumns = numElements;
    gapPlusWidth = 800/numElements;
    width = gapPlusWidth * .5;
    for(i=0; i<=numRows; i++){
      for(j=0; j<=numColumns; j++){
        height = width * base_image.height / base_image.width; 
        startX = gapPlusWidth*j+20;
        startY = gapPlusWidth*i+20;
        rotate += Math.random()*360;
        context.translate(startX + .5*width, startY + .5*height); //x + .5*width, y + .5*height
        context.rotate((Math.PI / 180) * rotate); // rotate
        context.translate(-1 * (startX + .5*width), -1 * (startY + .5*height)); //x + .5*width, y + .5*height
        context.drawImage(base_image, startX, startY, width, height);
        context.restore();
        context.save();
        console.log(`startX = ${startX}`);
        console.log(`startY = ${startY}`);
      }
    }
    console.log(`height: ${height}`);
    console.log(`width: ${width}`);
    console.log(`width/height: ${width/height}`);
    console.log(`gapPlusWidth: ${gapPlusWidth}`);
  }

  $( function() {
    var handle = $( "#custom-handle" );
    $( "#slider" ).slider({
      min: 4,
      max: 20,
      create: function() {
        handle.text( $( this ).slider( "value" ) );
      },
      slide: function( event, ui ) {
        handle.text( ui.value );
        numElements = ui.value;
        //width = ui.value;
        //height = width * base_image.width / base_image.height; 
        height = width * base_image.width / base_image.height; 
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid(numElements);
        //context.drawImage(base_image, startX, startY, width, height); //void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      }
    });
  } );
    setTimeout(function(){
      width=$('#slider').slider("option", "value");
    },200);

  base_image.onload = function(){
    drawGrid(4);
  }
}