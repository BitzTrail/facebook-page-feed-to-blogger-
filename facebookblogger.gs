
var BLOG_ID = '2402205635238914485';

  
    
function publish()



{

  var url = 'https://graph.facebook.com'
    + '/love.to.traavel/feed'
 //   + '?access_token=' + encodeURIComponent(getToken());
    +'?fields='+ encodeURIComponent("name,full_picture,message,attachments{subattachments,url}")
  
  +'&access_token=EAAEFbh3UUJIBALSykVY7MF94fly4RU4lro9C7t2SX8wUZACoA8GRVeNCGpKHrmjCKMmoVAp9SbD9zr3oy5CSuVxObq2M7pibcJhifZBAAiIkzqtUx4kAICUdzG88GztWsasEsw1tBPJawF3wToZBARBpUdpyqzRgKCTL1G1aQZDZD'
   // + service.getAccessToken();
  
   
    var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
  
    var json = response.getContentText();
    var jsondata = JSON.parse(json);
  
  var data =jsondata.data
  var pagename =data[0].name
   var images= data[0].full_picture
  var messages =data[0].message
       var attachment = data[0].attachments 

  var medias =attachment.data[0].subattachments
  var album =medias.data[0].media
 var imagesrc=album.image.src
      
  // Logger.log(images);  //check this and adjust following for loop and html showFeed function accordingly
//  Logger.log(messages);
//  Logger.log(attachment);
  Logger.log(imagesrc);
       
var kind ='#blogger#post';
 // var kind = toPublish.getRange(4,1).getValue();
 // var blogId = toPublish.getRange(4,2).getValue();
    // var readurl = articles[a].url

   
    var blogId = BLOG_ID
  var title = pagename
  var content = messages
 var imagez = images
 var attachedimages =imagesrc
   var imgbody = "<img  src=\""+imagez+"\">"+content+"<img src=\""+attachedimages+"\">"

// var imgbody = "<img  src=\""+image+"\">"+content+""
 //<a href=\""+readurl+"\">"
 var body = JSON.stringify({
    'kind': kind,
    'blog': {
      'id': blogId
    },
    'title': title,
   'content': imgbody,
 //"images": [
  // {
  //   "url": image
  //  }
 // ],
        
   
   
  
  });
   
  Logger.log(body);
var service = ScriptApp.getService();



var token = ScriptApp.getOAuthToken();

    var api = 'https://www.googleapis.com/blogger/v3/blogs/' + blogId + '/posts/';
 
    
  var headers = {
  'Authorization': 'Bearer ' + token //ScriptApp.getOAuthToken() //contains Blogger scope always
}; 
    
    

    
    var options = {
      'headers': headers,
      'method' : 'post',
      'contentType': 'application/json',
      'payload': body,
      'muteHttpExceptions': false
    };
    
    try {
      var response = UrlFetchApp.fetch(api, options);
      
      var responseCode = response.getResponseCode();
      Logger.log(responseCode);
      var json = JSON.parse(response.getContentText());
      Logger.log(json);
    }
    catch(err) {
      Logger.log(err); // error with url fetch call
    }

    var authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL);
    var authorizationUrl = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL);
    

  
}


  
