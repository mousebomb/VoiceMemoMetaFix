/** 对过去的批量文件全量处理
 * 新产生文件先拉到临时目录搞好了再来 */
$inputFolder = "/Users/rhett/Downloads/导入故事";
$outputFolder= "/Users/rhett/Documents/1-Life生活/生命历程/语音备忘录/2023/讲故事";

var fs = require("fs");
var path = require("path");
var exec = require("child_process").exec;


var list = [];


function listFile(dir){
  var arr = fs.readdirSync(dir);
  arr.forEach(function(item){

    var fullpath = path.join(dir,item);
    var stats = fs.statSync(fullpath);
    if(stats.isDirectory()){
      // listFile(fullpath);
    }else{
      if ( item.split(".")[1] =="m4a")
      {
        fixMetadata(fullpath,item);
        list.push(fullpath);
      }
    }
  });
  return list;
}


var cmd ="";
function fixMetadata(inputFullpath,filename)
{
  let title = filename.split(".")[0];
  // let outFileName = inputFullpath.replace(filename,"new/"+filename);
  let outFileName = $outputFolder+"/"+filename;
  cmd+= `ffmpeg -i "${inputFullpath}" -metadata title="${title}" -metadata author="睿睿爸爸" -metadata album_artist="睿睿爸爸" -metadata album="睿睿爸爸讲故事" -c copy  "${outFileName}" -y\n`;
}


listFile($inputFolder);
console.log(list);


console.log(cmd);
exec(cmd);