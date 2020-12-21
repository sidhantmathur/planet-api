#!/bin/bash

API="http://localhost:4741"
URL_PATH="/favs"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "fav": {
      "title": "'"${TITLE}"'",
      "name": "'"${NAME}"'"
    }
  }'

echo
