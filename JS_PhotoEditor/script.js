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

const filterOpt = document.querySelectorAll('.filter button')
const filterName = document.querySelector('.filter-info .name')

const sliderInput = document.querySelector(".slider input");
const sliderValue = document.querySelector(".filter-info .value");
const imagePreview = document.querySelector(".preview-img img");

// Default filter values
let filterValues = {
    brightness: 100,
    saturation: 100,
    inversion: 0,
    grayscale: 0,
    sepia: 0,
    blur: 0,
    rotate: 0,
  };
  
// Function to update the slider
function updateSlider(temp) {
        const value = filterValues[temp.id];
        sliderInput.value = value;

        if (temp.id === "blur") {
            sliderInput.max = "200";
            sliderValue.innerText = value + "px";
        } else if (temp.id === "rotate") {
            sliderInput.max = "360";
            sliderValue.innerText = value + "deg";
        } else {
            sliderValue.innerText = value + "%";
        }
}

function applyFilters() {
        const { brightness, saturation, inversion, grayscale, sepia, blur, rotate } = filterValues;
        imagePreview.style.filter = `grayscale(${grayscale}%) blur(${blur}px) brightness(${brightness}%) invert(${inversion}%) saturate(${saturation}%) sepia(${sepia}%)`;
        imagePreview.style.transform = `rotate(${rotate}deg)`;
}

filterOpt.forEach(temp => 
{

        temp.addEventListener('click', function(){
        document.querySelector(".filter .active").classList.remove("active");
        temp.classList.add('active');
        filterName.innerText= temp.innerText


        //-------------------GETTING ALL FILTERS FIXED (NOT AFFECTED BY OTHER FILTERS)----------------------
        updateSlider(temp);
    });
});

//-------------------------------FIXING SLIDER--------------------------------------

sliderInput.addEventListener('input', function()
{
    //---------------------------SETTING SLIDER VALUE--------------------------

    console.log(sliderInput.value);    //PRINTING TO CONSOLE TO DRY RUN


    const selectedFilter = document.querySelector('.filter .active');

    if (selectedFilter.id==="rotate")
    {
        sliderValue.innerText = sliderInput.value + "deg";
    
    }
    else if(selectedFilter.id==="blur")
    {
        sliderValue.innerText = sliderInput.value + "px"
    }
    else 
    {
        sliderValue.innerText = sliderInput.value + "%";
    }
    //sliderValue.innerText = sliderInput.value + "%";
    
     filterValues[selectedFilter.id] = sliderInput.value;

    //--------------------------------------APPLYING FILTERS TO IMAGE------------------------------------------
    applyFilters();
   
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
    filterValues = {
        brightness: 100,
        saturation: 100,
        inversion: 0,
        grayscale: 0,
        sepia: 0,
        blur: 0,
        rotate: 0,
    };

    applyFilters();

    // Reset the slider and value display to default
    updateSlider(document.querySelector('.filter button.active'));
}

//------------------------------------DOWNLOADING IMAGE------------------------------

function downloadImg()
{
    const image_canvas = document.createElement('canvas');
    const canvas_image = image_canvas.getContext('2d');
    
    image_canvas.width = imagePreview.naturalWidth; 
    image_canvas.height = imagePreview.naturalHeight;
    
    canvas_image.filter='grayscale('+filterValues.grayscale+'%) blur('+filterValues.blur+'px) brightness('+filterValues.brightness+'%) invert('+filterValues.inversion+'%) saturate('+filterValues.satuarate+'%) sepia('+filterValues.sepia+'%)';
    canvas_image.save();

    canvas_image.translate(image_canvas.width/2, image_canvas.height/2);
    canvas_image.scale(fhoriz, fver);
    canvas_image.rotate(rotate * Math.PI / 180);

    canvas_image.drawImage(imagePreview,-image_canvas.width/2,-image_canvas.height/2,image_canvas.width,image_canvas.height);
    canvas_image.restore();

    let image_link = document.createElement("a");
    image_link.setAttribute('download', "EditedImage.png");
    image_link.setAttribute('href', image_canvas.toDataURL("image/png"));
    image_link.click();
}
