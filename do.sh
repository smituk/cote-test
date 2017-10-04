#!/bin/sh

build() {
    docker build -t test/api ./api/
    docker build -t test/ping ./ping/
    docker build -t test/binlist ./binlist/
    RETVAL=$?
}
run() {
    docker run -p 8080:8080 -p 41302:8000 -d test/api
    docker run -p 41301:8000 -d test/ping
    docker run -p 41300:8000 -d test/binlist
    RETVAL=$?
}

check() {
    curl -i http://localhost:8080/api/ping
}

case "$1" in
  build)
    build
    ;;
  run)
    run
    ;;
  check)
    check
    ;;
  *)
    echo "Usage: {build|run|check}"
    exit 1
    ;;
esac
exit $RETVAL
