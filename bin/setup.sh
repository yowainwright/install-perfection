#!/bin/sh

if [ ! -f .env ]; then
  cp .env_starter .env
  echo "created .env file from .env_starter"
  export $(grep -v '^#' .env | xargs)
else
  export $(grep -v '^#' .env | xargs)
fi

# Get .env variables
[ ! -f .env ] || export $(grep -v '^#' .env | xargs)

# Check to see if Homebrew, Go, and Pre-commit are installed, and install it if it is not
HAS_NVM=$(command -v nvm >/dev/null)
HAS_BUN=$(command -v bun >/dev/null)


if $HAS_NVM; then
  . ~/.nvm/nvm.sh install
else
  echo "Please install NVM or ensure your version matches the .nvmrc file"
  exit 1
fi

BUN_MSG="Please install bun or ensure your version matches the bun version within the .env file"

# load bun
if $HAS_BUN; then
  BUN_LOADED_VERSION=$(command bun --version)
  if [ "$BUN_LOADED_VERSION" != "$BUN_VERSION" ]; then
    read -r -p "bun versions are out of snyc. Run 'npm install -g bun@${BUN_VERSION}'? [Y/n]" response
    response=$(echo "$response" | tr '[:upper:]' '[:lower:]')
    if [ $response = "y" ] || [ -z $response ]; then
      npm install -g bun@$BUN_VERSION
      echo 'bun version updated globally'
    else
      echo $BUN_MSG
      exit 1
    fi;
  else
    echo "bun version is up-to-date"
  fi
else
  echo $BUN_MSG
  exit 1
fi
