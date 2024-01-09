const dropZone = document.querySelector('.drop-zone');
const fileInput = document.querySelector('#inputFile');
const browseBtn = document.querySelector(".browseBtn");
const host = "https://innshare.herokuapp.com/";
const uploadURL = `${host}api/files`;

const bgProcess = document.querySelector('.bg-process');
const percentDiv = document.querySelector('#')

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    if (!dropZone.classList.contains('dragged')) {
        dropZone.classList.add('dragged');
    }
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragged');
});

fileInput.addEventListener('change', () => {
    uploadFile();
})

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragged');
    const files = e.dataTransfer.files
    // console.log(files);
    if (files.length) {
        fileInput.files = files;
        uploadFile();
    }
});

browseBtn.addEventListener('click', () => {
    fileInput.click();
});

const uploadFile = () => {
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("myFile", file);

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.response);
        }
    }

    xhr.upload.onprogress = updateProgress;

    xhr.open('POST', uploadURL);
    xhr.send(formData);
    xhr.onerror = function () {
        console.error('Error occurred during the XMLHttpRequest.');
    };
}

const updateProgress = (e) => {
    const percent = Math.round((e.loaded / e.total) * 100);
    console.log(percent);
    bgProcess.style.width = `${percent}%`;
    percentDiv.innerText = percent;
}