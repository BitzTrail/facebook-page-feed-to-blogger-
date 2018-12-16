
var BLOG_ID = 'blog numerical id';

// facebook page feed to blogger   as post including attachments need facebook public feed access app with user token 
//Developed by bitztrail@gmail.com Arjun Ram Vs 
//Image attachment Code contribution ALexander Ivanov From googleappscript Russian Community 
//
    
function publish()



{

  var url = 'https://graph.facebook.com'
    + '/love.to.traavel/feed'
 //   + '?access_token=' + encodeURIComponent(getToken());
    +'?fields='+ encodeURIComponent("name,full_picture,message,attachments{subattachments,url}")
  
  +'&access_token=your fb access token with public feed access for personal page use app in dev mode '
  
  
   
    var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
  
    var json = response.getContentText();
    var jsondata = JSON.parse(json);
  
  
  var data =jsondata.data
 var imgbody = '';
  var pagename =data[0].name
   var featuredimage= data[0].full_picture
  var messages =data[0].message
       var attachment = data[0].attachments 

  var medias =attachment.data[0].subattachments
 var i = 0; 
  for (i = 0; i <10 ; i++){
    var album =medias.data[i].media.image.src
  var imass= album
   
var kind ='#blogger#post';
 
   
    var blogId = BLOG_ID
  var title = pagename
  var content = messages
     var imagez = ''
    var attachedimages = imass
  
     imgbody +=
     '<img src="' 
   +attachedimages
   +'"><br>'
  }
  
  var post= ''+content+''+imgbody+'';
   
  Logger.log(post)
  
 // Logger.log(imgbody);

// var imgbody = "<img  src=\""+image+"\">"+content+""
 //<a href=\""+readurl+"\">"
 var body = JSON.stringify({
    'kind': kind,
    'blog': {
      'id': blogId
    },
   'title': title,
  'content': post, 
  
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
  
  
  
