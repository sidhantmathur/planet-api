#!/bin/sh

API="http://localhost:4741"
URL_PATH="/planets-disc"

curl "${API}${URL_PATH}/${DISC}" \
  --include \
  --request GET \
  
echo
