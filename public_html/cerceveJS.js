var image = new Image();

    image.onload = function() {
    var canvasOffset = $('#canvas').offset();
    var imageWidth = image.width;
    var imageHeight = image.height;
    var canvasWidth = imageWidth - 150;
    var canvasHeight = imageHeight;
    var canvasImgDiff = (canvasWidth - imageWidth);
    var cerceveWidth = 300;
    var cerceveHeight = 200;
    var cerceveX =(canvasWidth / 2) - (cerceveWidth / 2);
    var cerceveY =(canvasHeight / 2) - (cerceveHeight / 2);
    var cerceveX2 = cerceveX + cerceveWidth;
    var cerceveY2 = cerceveY + cerceveHeight;
    
    var stage = new Kinetic.Stage({
        container: 'canvas',
        width: canvasWidth,
        height: canvasHeight
    });
    
    var resimBlur = new Kinetic.Image({
        image: image,
        x: canvasImgDiff / 2,
        y: 0,
        width: imageWidth,
        height: imageHeight,
        filter: Kinetic.Filters.Blur,
        filterRadius: 20,
    });
         
    var cerceve = new Kinetic.Blob({
        points: [cerceveX , cerceveY, cerceveX2, cerceveY,
                 cerceveX2, cerceveY2, cerceveX, cerceveY2],
        tension: 0.2,
        stroke: '#7cf',
        strokeWidth: 4,
        fillPatternImage: image,
        fillPatternRepeat: 'repeat',
        fillPatternOffsetX: 0 - canvasImgDiff / 2,
        fillPatternOffsetY: 0,
        draggable: true,
        id: 'cerceve'
    });

    var layer = new Kinetic.Layer();
    var layer2 = new Kinetic.Layer();
    
    layer.add(resimBlur);
    layer2.add(cerceve);
    
    stage.add(layer);
    stage.add(layer2);

    $('#container').on('mousemove', function( event ){
        var pageX = event.pageX;
        //resmin pozisyonunu belirleyen fonksiyon:
        var resimPosition = (pageX - canvasOffset.left - canvasWidth/2 + (canvasImgDiff / 2));
        //resim kayma sınırları:
        if (resimPosition > 0){
            resimPosition = 0;
        }
        else if(resimPosition < (canvasWidth - imageWidth)){
            resimPosition = canvasWidth - imageWidth;
        }
        resimBlur.setX(resimPosition);
        cerceve.setFillPatternOffsetX(-resimPosition);

        stage.draw();
    });
};
image.src = "resim.jpg";