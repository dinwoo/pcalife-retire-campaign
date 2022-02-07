set -e

gulp build --env production

gulp deploy

gulp clean-publish