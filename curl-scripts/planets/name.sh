#!/bin/sh

API="http://localhost:4741"
URL_PATH="/planets-name"

curl "${API}${URL_PATH}/${NAME}" \
  --include \
  --request GET \

echo
