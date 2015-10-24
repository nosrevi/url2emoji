var redisCollection = new Meteor.RedisCollection("redis");

Router.route('/:_emoji', function() {
  var long_url = redisCollection.get('Emoji:url:' + this.params._emoji) || '/';
  this.response.writeHead(302, {
    'Location': long_url 
  });
  this.response.end();
}, {where: 'server'});

Router.route('/', function() {
  this.render('hello');
});

if (Meteor.isClient) {

  Template.hello.events({
    'submit .shorten': function (event) {
      event.preventDefault();
      if (validUrl(long_url.value)) {
        shorten(long_url.value);
      } else {
        alert('Invalid URL');
      }
    }
  });

  function validUrl(url) {
    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(url);
  }

  function shorten(url) {

    var cached = redisCollection.get('Emoji:url:' + url);
    if (cached) {
        long_url.value = cached;
    } else {
        redisCollection.incr('Emoji:total_cnt', function(err, res) {
            if (err) {
              long_url.value = 'Ops...unable to convert...';
            } else {
                var encoded = Int2emoji.encode(res);
                redisCollection.set('Emoji:url:' + url, encoded, function(err, res){
                    if (err) {
                        long_url.value = 'Ops...unable to convert...';
                    } else {
                        redisCollection.set('Emoji:url:' + encoded, url, function(err, res){
                            if (!err) {
                                long_url.value = encoded;
                            }
                        });
                    }
                });
            }
        });
    }

  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
