#!/bin/sh

API="http://localhost:4741"
URL_PATH="/planets-row"

curl "${API}${URL_PATH}/${ROW}" \
  --include \
  --request GET \
  
echo
