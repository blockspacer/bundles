#!/bin/bash
# set -e
# die () {
# 	echo "Usage: ./entrypoint.sh <envirionment:staging|production>"
# 	exit 1
# }

# Llamada script de seteo de variables de entorno con secrets
echo $CI_ENVIRONMENT_RUN
if [[ $(echo "$CI_ENVIRONMENT_RUN" | grep -E ^master) ]]
then
	. ./config/config-secrets-env.sh  
	yarn start
elif [[ $(echo "$CI_ENVIRONMENT_RUN" | grep -E ^staging\/.*) ]]
then 
	. ./config/config-secrets-uat-env.sh
	yarn dev
else 
	. ./config/config-secrets-env.sh 
	yarn dev
fi
