const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const compressBtn = document.getElementById('compressBtn');
const downloadLink = document.getElementById('downloadLink');

fileInput.addEventListener('change', () => {
  fileList.innerHTML = "";
  for (const file of fileInput.files) {
    const li = document.createElement('li');
    li.textContent = file.name;
    fileList.appendChild(li);
  }
});

compressBtn.addEventListener('click', async () => {
  const files = fileInput.files;
  if (!files.length) {
    alert("Please select some files first.");
    return;
  }

  const zip = new JSZip();
  for (const file of files) {
    const content = await file.arrayBuffer();
    zip.file(file.name, content);
  }

  const blob = await zip.generateAsync({ type: "blob" });
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.style.display = 'inline-block';
});