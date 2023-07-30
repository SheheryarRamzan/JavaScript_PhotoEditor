//SHEHERYAR RAMZAN
//20I-0441 
//SECTION B
//ASSIGNEMTN 2

//-------------------------------------LOADING IMAGE----------------------------

function openimg()
{

    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _this => {

        let files =   Array.from(input.files);
        console.log(files);

        // getting a hold of the file reference
        var imageFile =  _this.target.files[0]; 
                
        // setting up the reader
        var reader = new FileReader();

        reader.readAsDataURL(imageFile); 
                
        // here we tell the reader what to do when it's done reading...
        reader.onload = readerEvent => {

            var content = readerEvent.target.result; 
            document.querySelector('#myimg').src = content;

        }

    };
    input.click();
}

//------------------------------FIXING FILTER BUTTONS------------------------------

filter_opt = document.querySelectorAll('.filter button')
filter_name = document.querySelector('.filter-info .name')

slider_input = document.querySelector(".slider input");
slider_value = document.querySelector(".filter-info .value");
image_preview = document.querySelector(".preview-img img");

var brightness = 100, satuarate = 100, inversion = 0, gray_scale = 0, blur = 0, sepia = 0, rotate=0; //Setting values to default



filter_opt.forEach(temp => 
{

        temp.addEventListener('click', function(){
        document.querySelector(".filter .active").classList.remove("active");
        temp.classList.add('active');
        filter_name.innerText= temp.innerText


        //-------------------GETTING ALL FILTERS FIXED (NOT AFFECTED BY OTHER FILTERS)----------------------

        switch(temp.id)
        {
            case "brightness":
                slider_input.value = brightness;
                slider_value.innerText = brightness + "%";
                break;
            case "inversion":
                slider_input.value = inversion;
                slider_value.innerText = inversion + "%";
                break;
            case "saturation":
                slider_input.value = satuarate;
                slider_value.innerText = satuarate + "%";
                break;
            case "grayscale":
                slider_input.value = gray_scale;
                slider_value.innerText = gray_scale + "%";
                break;
            case "sepia":
                slider_input.value = sepia;
                slider_value.innerText = sepia + "%";
                break;
            case "blur":
                slider_input.max="200";
                slider_input.value = blur;
                slider_value.innerText = blur + "px";
                break;
             case "rotate":
                slider_input.value = rotate;
                slider_input.max="360";
                slider_value.innerText = rotate + "deg";
                break;
        }

    });
});

//-------------------------------FIXING SLIDER--------------------------------------

slider_input.addEventListener('input', function()
{
    //---------------------------SETTING SLIDER VALUE--------------------------

    console.log(slider_input.value);    //PRINTING TO CONSOLE TO DRY RUN


    selectedfilter=document.querySelector('.filter .active');

    if (selectedfilter.id==="rotate")
    {
        slider_value.innerText = slider_input.value + "deg";
    
    }
    else if (selectedfilter.id==="brightness" || selectedfilter.id==="sepia" || selectedfilter.id==="grayscale" || 
    selectedfilter.id==="saturation" || selectedfilter.id==="inversion")
    {
        slider_value.innerText = slider_input.value + "%";
    }

    else if(selectedfilter.id==="blur")
    {
        slider_value.innerText = slider_input.value + "px"
    }
    //slider_value.innerText = slider_input.value + "%";
    
    switch(selectedfilter.id)
    {
        case "brightness":
            brightness = slider_input.value;
            break;
        case "saturation":
            satuarate = slider_input.value;
            break;
        case "inversion":
            inversion = slider_input.value;
            break;
        case "grayscale":
            gray_scale = slider_input.value;
            break;
        case "sepia":
            sepia = slider_input.value;
            break;
        case "blur":
            blur = slider_input.value;
            break;
        case "rotate":
            rotate = slider_input.value;
            break;
    }

    //--------------------------------------APPLYING FILTERS TO IMAGE------------------------------------------

    image_preview.style.filter = 'grayscale('+gray_scale+'%) blur('+blur+'px) brightness('+brightness+'%) invert('+inversion+'%) saturate('+satuarate+'%) sepia('+sepia+'%)'
    image_preview.style.transform = 'rotate('+rotate+'deg)'
   
})


let rotatel = 0;
let rotater = 0;
let fhoriz = 1;
let fver = 1;

//----------------------------ROTATE IMAGE LEFT---------------------------------

function rotateleft()
{
    rotatel = rotatel -90;
    document.getElementById("myimg").style.transform = 'rotate('+rotatel+'deg)';
};

//----------------------------ROTATE IMAGE RIGHT----------------------------------

function rotateright()
{
    rotater = rotater + 90;
    document.getElementById("myimg").style.transform = 'rotate('+rotater+'deg)';
};


//--------------------------------------FLIP HORIZONTALLY--------------------------

function flipHorizontal()
{
    if(fhoriz === 1)
    {
        fhoriz = -1;
        document.getElementById("myimg").style.transform = 'scaleX(-1)'
    }
    else
    {       
        fhoriz = 1;
        document.getElementById("myimg").style.transform = 'scaleX(+1)'
    }
}

//--------------------------------------FLIP VERTICALLY-----------------------------

function flipVertical()
{
    if(fver === 1)
    {
        fver = -1;
        document.getElementById("myimg").style.transform = 'scaleY(-1)'
    }
    else
    {       
        fver = 1;
        document.getElementById("myimg").style.transform = 'scaleY(+1)'
    }
}

//-----------------------------------RESET FILTER-----------------------------------

function resetFilter()
{
    brightness = 100, satuarate = 100, inversion = 0, gray_scale = 0, blur = 0, sepia = 0, rotate=0;
    image_preview.style.filter = 'grayscale('+gray_scale+'%) blur('+blur+'px) brightness('+brightness+'%) invert('+inversion+'%) saturate('+satuarate+'%) sepia('+sepia+'%)'
    image_preview.style.transform = 'rotate('+rotate+'deg)'
}

//------------------------------------DOWNLOADING IMAGE------------------------------

function downloadImg()
{
    const image_canvas = document.createElement('canvas');
    const canvas_image = image_canvas.getContext('2d');
    
    image_canvas.width = image_preview.naturalWidth; 
    image_canvas.height = image_preview.naturalHeight;
    
    canvas_image.filter='grayscale('+gray_scale+'%) blur('+blur+'px) brightness('+brightness+'%) invert('+inversion+'%) saturate('+satuarate+'%) sepia('+sepia+'%)';
    canvas_image.save();

    canvas_image.translate(image_canvas.width/2, image_canvas.height/2);
    canvas_image.scale(fhoriz, fver);
    canvas_image.rotate(rotate * Math.PI / 180);

    canvas_image.drawImage(image_preview,-image_canvas.width/2,-image_canvas.height/2,image_canvas.width,image_canvas.height);
    canvas_image.restore();

    let image_link = document.createElement("a");
    image_link.setAttribute('download', "EditedImage.png");
    image_link.setAttribute('href', image_canvas.toDataURL("image/png"));
    image_link.click();
}
