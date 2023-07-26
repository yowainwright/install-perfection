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
HAS_N=$(command -v n >/dev/null)
HAS_PNPM=$(command -v pnpm >/dev/null)


if $HAS_N; then
  n install auto
else
  echo "Please install N or ensure your Node version matches the .nvmrc file"
  exit 1
fi

PNPM_MSG="Please install pnpm or ensure your version matches the pnpm version within the .env file"

# load pnpm
if $HAS_PNPM; then
  PNPM_LOADED_VERSION=$(command pnpm --version)
  if [ "$PNPM_LOADED_VERSION" != "$PNPM_VERSION" ]; then
    read -r -p "pnpm versions are out of snyc. Run 'npm install -g pnpm@${PNPM_VERSION}'? [Y/n]" response
    response=$(echo "$response" | tr '[:upper:]' '[:lower:]')
    if [ $response = "y" ] || [ -z $response ]; then
      npm install -g pnpm@$PNPM_VERSION
      echo 'pnpm version updated globally'
    else
      echo $PNPM_MSG
      exit 1
    fi;
  else
    echo "pnpm version is up-to-date"
  fi
else
  echo $PNPM_MSG
  exit 1
fi
