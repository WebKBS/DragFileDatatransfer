const uploadInput = document.getElementById("upload");
const uploadLabel = document.querySelector('label[for="upload"]');

/* 기본 업로드시 이벤트 change */
uploadInput.addEventListener("change", changeHandler);

/* 드래그 이벤트 */
uploadLabel.addEventListener("dragenter", dragEnterHandler);
uploadLabel.addEventListener("dragleave", dragLeaveHandler);
uploadLabel.addEventListener("dragover", dragOverHandler);
uploadLabel.addEventListener("drop", dropHandler);

/**
 * dragenter 이벤트 함수
 * 드래그 된 요소가 드롭 대상에 들어갈 때
 */
function dragEnterHandler(event) {
  event.preventDefault();
  event.stopPropagation();
}

/**
 * dragleave 이벤트 함수
 * 드래그된 요소가 드롭 타겟 떠날때 ex) mouseleave
 */
function dragLeaveHandler(event) {
  event.preventDefault();
  event.stopPropagation();
  uploadLabel.classList.remove("on");
}

/**
 * dragover 이벤트 함수
 * 드래그 된 요소가 드롭 대상 위에있을 때 ex) mouseenter
 */
function dragOverHandler(event) {
  event.preventDefault();
  event.stopPropagation();
  uploadLabel.classList.add("on");
}

/**
 * drop 이벤트 함수
 * 드래그 된 요소가 드롭 되었을때.
 */
function dropHandler(event) {
  event.preventDefault();
  event.stopPropagation();

  let files = event.dataTransfer.files[0]; // 드래그 파일 리스트

  viewImageHandler(files);
  uploadLabel.classList.remove("on");
}

/**
 * Input 체인지 이벤트 핸들러
 */
function changeHandler(event) {
  let files = event.target.files[0]; // input 파일 리스트

  viewImageHandler(files);
}

/**
 * 이미지 닫기 클릭시 이미지 item 삭제
 * @param target - 삭제 시킬 대상 부모 li
 */
function closeImageHandler(target) {
  const removeTargetElement = target.querySelector("button");
  removeTargetElement.addEventListener("click", () => {
    removeTargetElement.parentElement.remove();
    console.log(target);
  });
}

/**
 *  FileReader 브라우저 뷰에 이미지 보여주기
 * @param {*} fileList - input 및 드래그에 들어가는 파일 요소
 */
function viewImageHandler(fileList) {
  const url = URL.createObjectURL(fileList);
  const elements = createElementImage(url);
  document.querySelector("#imageList ul").append(elements);
}

/**
 * 파일 생성시 이미지 엘리먼트 추가
 * @param event - event 대상
 */
function createElementImage(event) {
  const li = document.createElement("li");
  const button = document.createElement("button");
  const img = document.createElement("img");
  img.src = event;
  button.className = "delete_file_btn";
  li.append(button);
  li.append(img);
  return li;
}

/**
 * 파일 생성시 PDF 엘리먼트 추가
 * @param text - pdf 파일 이름
 */
function createElementPDF(text) {
  const li = document.createElement("li");
  const button = document.createElement("button");
  const span = document.createElement("span");
  button.className = "delete_file_btn";
  span.textContent = text;
  li.append(button);
  li.append(span);
  return li;
}

/**
 * 확대 이미지 보기
 * @param {*} ele 추가될 이미지 부모 li 엘리먼트
 */
function expandImage(ele) {
  const target = ele.querySelector("img");
  target.addEventListener("click", () => {
    const eleChildImage = target.src;
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.src = eleChildImage;
    div.append(img);
    div.classList.add("view_modal");
    div.style.position = "fixed";
    div.style.top = "0px";
    div.style.left = "0px";
    div.style.backgroundColor = "rgba(0, 0, 0, .7)";
    div.style.width = "100%";
    div.style.height = "100%";
    div.style.zIndex = "2000";
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.overflowY = "auto";
    img.style.maxWidth = "80%";
    img.style.maxHeight = "80%";
    document.body.append(div);
    document.querySelector(".view_modal").addEventListener("click", (ev) => {
      if (ev.currentTarget === document.querySelector(".view_modal")) {
        document.querySelector(".view_modal").remove();
      }
    });
  });
}

/**
 * 이미지 불러오기 함수
 * @param srcImage - 이미지 주소
 * */
function addFileImage(srcImage) {
  const parentElement = document.querySelector("#imageList ul");
  const li = document.createElement("li");
  const button = document.createElement("button");
  button.className = "delete_file_btn";

  const img = document.createElement("img");
  img.src = srcImage;
  li.append(button);
  li.append(img);
  closeImageHandler(li);
  expandImage(li);
  return parentElement.append(li);
}

/**
 * PDF 불러오기 함수
 * @param srcPDFname - PDF 파일이름
 * */
function addFilePDF(srcPDFname) {
  const parentElement = document.querySelector("#imageList ul");
  const li = document.createElement("li");
  const button = document.createElement("button");
  button.className = "delete_file_btn";

  const span = document.createElement("span");
  span.textContent = srcPDFname;
  li.append(button);
  li.append(span);
  closeImageHandler(li);
  return parentElement.append(li);
}
