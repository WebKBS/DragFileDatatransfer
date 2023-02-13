// 파일 업로드
const fileSelector = document.getElementById('upload');
const uploadLabel = document.querySelector('.upload_label');
const fileName = document.getElementById('file_name');
const fileMsg = document.getElementById('file_msg');
const checkUploadBtn = document.getElementById('check_upload_btn');

const fileExtention = ['text/csv'];

const fileHandler = (fileList, target) => {
  if (fileList[0].type === fileExtention[0]) {
    fileName.textContent = fileList[0].name;
    fileMsg.textContent = '파일 업로드 완료';
    uploadLabel.classList.add('on');
  } else {
    errorMsg();
  }
};

const errorMsg = () => {
  uploadLabel.classList.remove('on');
  uploadLabel.classList.add('error');
  fileName.textContent = '올바르지 않은 파일입니다.';
  fileMsg.textContent = '다시 업로드 해주세요.';
  fileSelector.value = '';
};

fileSelector.addEventListener('change', (event) => {
  const fileList = event.target.files;
  fileHandler(fileList, event.target);
});

uploadLabel.addEventListener('dragover', (event) => {
  event.stopPropagation();
  event.preventDefault();
  uploadLabel.classList.add('move');
  event.dataTransfer.dropEffect = 'copy';
});

uploadLabel.addEventListener('dragleave', (event) => {
  event.stopPropagation();
  event.preventDefault();
  uploadLabel.classList.remove('move');
});

uploadLabel.addEventListener('drop', (event) => {
  event.stopPropagation();
  event.preventDefault();
  uploadLabel.classList.remove('move');
  const fileList = event.dataTransfer?.files;
  const data = new DataTransfer();
  data.items.add(fileList[0]);

  if (data.files[0].type === fileExtention[0]) {
    fileSelector.files = data.files;
    fileHandler(fileList, event.target);
  } else {
    data.items.clear();
    errorMsg();
  }
});
