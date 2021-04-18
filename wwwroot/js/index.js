myStorage = window.localStorage;
const myuuid = myStorage.getItem('uuid');
if(!myuuid){
    var uuid = uuidv4();
    myStorage.setItem('uuid', uuid);
}
Dropzone.options.myDropzone = {
    // Prevents Dropzone from uploading dropped files immediately
    paramName: "files",
    autoProcessQueue: false,
    acceptedFiles: ".png,.jpg,.gif,.bmp,.jpeg",
    maxFilesize: 3,
    parallelUploads: 10,
    addRemoveLinks: true,
    dictRemoveFile:"移除文件",
    init: function() {
    var submitButton = document.querySelector("#submit-all")
    myDropzone = this; // closure
    
    submitButton.addEventListener("click", function() {
        var f1 = myDropzone.getQueuedFiles()[0].name;
        console.log(f1);
        myDropzone.getQueuedFiles()[0].name = myuuid + "&" + "123.jpg"
        console.log(myDropzone.getQueuedFiles());
        if (myDropzone.getQueuedFiles().length == 3) { 
            const isUpload = myStorage.getItem('upload');
            if(!isUpload){
                myStorage.setItem('upload', "true");
                myDropzone.processQueue(); 
            }                       
        }    
    // autoProcessQueue: true// Tell Dropzone to process all queued files.
    });
    
    // You might want to show the submit button only when 
    // files are dropped here:
    this.on("addedfile", function() {
      // Show submit button here and/or inform user to click it.
    });
    
      }
    };