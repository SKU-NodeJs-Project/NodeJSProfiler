//변수 선언
const fileNamePrint = document.querySelector(".upload_name");
const fileInput = document.getElementById("chooseFile");
// 업로드한 파일명 띄워주는 이벤트 헨들러
fileInput.onchange = () => {
  const selectedFile = [...fileInput.files];
  const fileName = selectedFile[0].name;
  fileNamePrint.value = fileName;
};
