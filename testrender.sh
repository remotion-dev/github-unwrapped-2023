set -e
export REMOTION_AWS_ACCESS_KEY_ID=AKIA4GQXLGXLO4FS4IGI
export REMOTION_AWS_SECRET_ACCESS_KEY=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
npx remotion lambda functions rmall --region=eu-central-1 --yes
npx remotion lambda functions deploy --region=eu-central-1 --memory=1600 --timeout=120
npx remotion lambda sites create --region=eu-central-1 --site-name=unwrapped2023
npx remotion lambda render https://remotionlambda-eucentral1-fle7dc7zhz.s3.eu-central-1.amazonaws.com/sites/unwrapped2023/index.html Main --region=eu-central-1 --log=verbose
