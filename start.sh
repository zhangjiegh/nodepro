
#!/bin/bash

#目录设置
APP=/apps/project/node
APP_LOG=/apps/logs/node
APP_NAME=adminDemo

#启动准备
APP_PATH=$APP/$APP_NAME
LOG_PATH=$APP_LOG/$APP_NAME/STDOUT.out
PID_PATH=$APP_PATH/sh/$APP_NAME.pid
START_JS=$APP_PATH/app.js

#设置node.js 路径
NODE_PATH=/apps/svr/node
export PATH=$PATH:$NODE_PATH/bin
export PATH=$PATH:$NODE_PATH/lib/node_modules
node=$NODE_PATH/bin/node
forever=$NODE_PATH/bin/forever


case "$1" in
 start)
  $forever stopall --pidFile $PID_PATH

  $forever start --minUptime 1000 --spinSleepTime 1000 -l $LOG_PATH --pidFile $PID_PATH -a $START_JS
  echo "start=$START_JS logs=$LOG_PATH pid=$PID_PATH"

  ps -ef|grep $APP_NAME |grep -v grep
  if [ $? -ne 0 ]
  then
   echo "$APP_NAME start faile..."
  else
   echo "$APP_NAME is running..."
  fi
  ;;
 stop)
  $forever stop --pidFile $PID_PATH $START_JS

  ps -ef|grep $APP_NAME |grep -v grep
  if [ $? -ne 0 ]
    then
     echo "$APP_NAME stop success..."
    else
     echo "$APP_NAME stop fail..."
  fi
  ;;
 stopall)
  $forever stopall --pidFile $PID_PATH

  ps -ef|grep $APP_NAME |grep -v grep
  if [ $? -ne 0 ]
    then
     echo "$APP_NAME stop success..."
    else
     echo "$APP_NAME stop fail..."
  fi
  ;;
 restartall)
  $forever restartall --pidFile $PID_PATH
  ;;
 reload|restart)
  $forever restart --minUptime 1000 --spinSleepTime 1000 -l $LOG_PATH --pidFile $PID_PATH -a $START_JS
  ;;
 list)
  $forever list
  ;;
 *)
  echo "Usage: $APP_PATH/sh/start.sh {start|stop|restart|reload|stopall|restartall|list}"
  ;;
esac

exit 0







