const https = require('https')
const querystring = require('querystring')

module.exports = async function(context, req) {
  const body = req.body
  return new Promise((resolve, reject) => {
    if (body) {
      const options = {
        host: getEnvironmentVariable('tokenHost'),
        port: parseInt(getEnvironmentVariable('tokenPort')),
        path: getEnvironmentVariable('tokenPath'),
        method: 'POST'
      }

      const paramsObj = querystring.parse(body)
      paramsObj.client_secret = getEnvironmentVariable('tokenClientSecret')
      const postData = querystring.stringify(paramsObj)

      let result = null

      const req = https.request(options, res => {
        res.on('data', chunk => {
          result = chunk
        })
        res.on('end', () => {
          context.res = {
            status: 200,
            body: result
          }
          resolve()
        })
      })

      req.write(postData)
      req.end()
    } else {
      context.res = {
        status: 400,
        body: 'Please pass a request body'
      }
      resolve()
    }
  })
}

function getEnvironmentVariable(name) {
  return process.env[name]
}
