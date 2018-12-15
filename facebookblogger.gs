var BLOG_ID = '';

function publish() {
  var url =
    'https://graph.facebook.com' +
    '/pagename/feed' +
    //   + '?access_token=' + encodeURIComponent(getToken());
    '?fields=' +
    encodeURIComponent(
      'name,full_picture,message,attachments{subattachments,url}'
    ) +
    '&access_token=useraccesstoken';
  // + service.getAccessToken();

  var response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });

  var json = response.getContentText();
  var jsondata = JSON.parse(json);

  var data = jsondata.data;

  var imgbody = '';
  for (var i = 0; i < data.length; i++) {
    var pagename = data[i].name;

    var images = data[i].full_picture;
    var messages = data[i].message;
    var attachment = data[i].attachments;

    var medias = attachment.data[i].subattachments;
    var album = medias.data[i].media;
    var imagesrc = album.image.src;

    // Logger.log(images);  //check this and adjust following for loop and html showFeed function accordingly
    //  Logger.log(messages);
    //  Logger.log(attachment);
    Logger.log(imagesrc);

    var kind = '#blogger#post';
    // var kind = toPublish.getRange(4,1).getValue();
    // var blogId = toPublish.getRange(4,2).getValue();
    // var readurl = articles[a].url

    var blogId = BLOG_ID;
    var title = pagename;
    var content = messages;
    var imagez = images;
    var attachedimages = imagesrc;
    imgbody +=
      '<img  src="' +
      imagez +
      '">' +
      content +
      '<img src="' +
      attachedimages +
      '"><br>';
  }
  // var imgbody = "<img  src=\""+image+"\">"+content+""
  // <a href=\""+readurl+"\">"
  var body = JSON.stringify({
    kind: kind,
    blog: {
      id: blogId
    },
    title: title,
    content: imgbody
    // "images": [
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
    Authorization: 'Bearer ' + token // ScriptApp.getOAuthToken() //contains Blogger scope always
  };
  var options = {
    headers: headers,
    method: 'post',
    contentType: 'application/json',
    payload: body,
    muteHttpExceptions: false
  };

  try {
    var response = UrlFetchApp.fetch(api, options);
    var responseCode = response.getResponseCode();
    Logger.log(responseCode);
    var json = JSON.parse(response.getContentText());
    Logger.log(json);
  } catch (err) {
    Logger.log(err); // error with url fetch call
  }

  var authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL);
  var authorizationUrl = ScriptApp.getAuthorizationInfo(
    ScriptApp.AuthMode.FULL
  );
}
