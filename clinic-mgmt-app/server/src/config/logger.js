import SimpleNodeLogger from 'simple-node-logger'

/* logger */
const opts = { 
  logFilePath: 'mylogfile.log',
  timestampFormt: 'YYYY-MM-DD HH:mm:ss.sss'
};
const log = SimpleNodeLogger.createSimpleLogger( opts )

export default log;