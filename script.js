const dragArea = document.querySelector('.drag-area');
const dragText = document.querySelector('.header');
const container = document.querySelector('.container');

let button = document.querySelector('.button')
let input = document.querySelector('input')

let file;

button.onclick = () => {
    input.click();
};

//when browse 
input.addEventListener('change', function(){
    file = this.files[0];
    dragArea.classList.add('active');
    displayFile();
    
});
//when file is inside drag area
container.addEventListener('dragover',(event)=>{
    event.preventDefault();
    dragText.textContent = "Release to Upload";
    container.classList.add('active');
    //console.log('file in drag area');
});
//when file left drag area
container.addEventListener('dragleave',(event)=>{
    dragText.textContent="Drag & Drop";
    container.classList.remove('active');
    //container.classList.remove('active');
    //console.log('file not in drag area');

});



//when file dropped in drag area
container.addEventListener('drop',(event)=>{
    event.preventDefault();
    container.classList.remove('active');

    file = event.dataTransfer.files[0];
    displayFile();
});

function displayFile(){
    let fileType = file.type;
    let validExtensions = ['image/jpg', 'image/jpeg', 'image/png',  'application/pdf'];
    if (validExtensions.includes(fileType)) {
        let fileReader = new FileReader();   
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            //console.log(fileURL);
            let imgTag =`<img src="${fileURL}" alt="">`;
            dragArea.innerHTML = imgTag;
        };
        fileReader.readAsDataURL(file);
    } else {
        alert('This file is not valid');
        dragArea.classList.remove('active');
    }
}