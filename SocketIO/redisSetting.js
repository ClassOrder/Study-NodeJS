/* REDIS SETTING */
var redis = require('redis'),
    redisStore = require('socket.io/lib/stores/redis'),
    pub = redis.createClient(),
    sub = redis.createClient(),
    client = redis.createClient();

io.set('store', new RedisStore({
    redisPub: pub,
    redisSub: sub,
    redisClient: client
}));

/* SERVER SOME PART */
var redisPort = 6379;
var redisHostname = 'my.host.name'; // - set Real Server host name

var redis = require('redis'),
    RedisStore = require('socket.io/ib/stores/redis'),
    pub = redis.createClient(redisPort, redisHostname),
    sub = redis.createClient(redisPort, redisHostname),
    client = redis.createClient(redisPort, redisHostname);
