const { createClient } = require('redis');

/**
 * @description Create a redis client
 * @returns {RedisClient}
 */
// const config = {
//   socket: {
//     host: 'redis',
//     port: 6379
//   }
// };
const client = createClient({
    socket: {
        host: 'redis',
        port: 6379
    }
});

module.exports = { client };
