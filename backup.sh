#!/bin/bash
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

# create backup log folder
mkdir -p /var/log/easynote_backup
DATE=$(date +"%Y-%m-%d_%H-%M-%S")

# create log ifle
LOG_FILE="/var/log/easynote_backup/backup_log_"$DATE
touch $LOG_FILE

# redirect stdout/stderr to logfile
exec 3>&1 1>>${LOG_FILE} 2>&1

# remote scp dir
REMOTEDIR="<SET>"

# export dump pattern
FILE_NAME="mongodump"
TMPDIR="/tmp/mongodump"
CONTAINER_NAME="easynotes_db_1"
DB_NAME="notes"

echo "creating temp dir"
rm -rf $TMPDIR && mkdir $TMPDIR

echo "docker executing mongodump"
docker run -it --rm --link $CONTAINER_NAME:mongo -v $TMPDIR:/tmp mongo bash -c 'mongodump -v --host $MONGO_PORT_27017_TCP_ADDR:$MONGO_PORT_27017_TCP_PORT --db '$DB_NAME' --out=/tmp'

echo "running tar"
tar -cvzf "$TMPDIR/${FILE_NAME}.tar.gz" -C $TMPDIR .

echo "sending file to server"
scp -P2222 "$TMPDIR/${FILE_NAME}.tar.gz" "$REMOTEDIR"

echo "cleanning tmp files"
rm -rf $TMPDIR

echo "Done exporting"
