// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
var COS = require('cos-nodejs-sdk-v5');
var fs = require('fs');
var path = require('path');

var cos = new COS({
  SecretId: 'AKID3uVpthEVWGkxuaz5tSmqdAQP8cqnTs1t',
  SecretKey: 'cx2sRkob9QQ9bmgKhnb9RSCetsa092f1'
});

function upload(filepath) {
  var index = filepath.indexOf('build/');
  var key = filepath;
  if (index >= 0) {
    key = filepath.substr(index + 6);
  }
  console.log(filepath, key);
  cos.putObject({
    Bucket: 'fe-1255520126',
    Region: 'ap-guangzhou',
    Key: `ddz/${key}`,
    Body: fs.createReadStream(filepath),
    onProgress: function(progressData) {
      console.log(JSON.stringify(progressData));
    }
  }, function(err, data) {
    console.log(err || data);
  });
}

function scanFiles(filePath) {
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.log(err);
    } else {
      files.forEach(function (filename) {
        var fileFullPath = path.join(filePath, filename);
        fs.stat(fileFullPath, function (err, stat) {
          if (err) {
            console.log(err);
          } else {
            var isFile = stat.isFile();
            var isDir = stat.isDirectory();
            if (isFile) {
              upload(fileFullPath);
            }
            if (isDir) {
              scanFiles(fileFullPath);
            }
          }
        });
      });
    }
  });
}

scanFiles('../build');
