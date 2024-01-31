function start() {
  var sourceFolder = 'source';
  var targetFolder = 'target';

  var source = DriveApp.getFoldersByName(sourceFolder);
  var target = DriveApp.getFoldersByName(targetFolder);
   
  if (source.hasNext() && target.hasNext()) {
      copyFolder(source.next(), target.next());
  }
  var folders = DriveApp.getFolders();
}

function copyFolder(source, target) {
  var folders = source.getFolders();
  var files = source.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    if (!target.getFilesByName(file.getName()).hasNext()){
      file.makeCopy(file.getName(), target);
    }     
  }
  while (folders.hasNext()) {
    var subFolder = folders.next();
    var folderName = subFolder.getName();
    var targetFolder = target.createFolder(folderName);
    copyFolder(subFolder, targetFolder);
  }
}
