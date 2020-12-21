#!/bin/sh

API="http://localhost:4741"
URL_PATH="/planets-mass"

curl "${API}${URL_PATH}/${MASS}" \
  --include \
  --request GET \
  
echo
