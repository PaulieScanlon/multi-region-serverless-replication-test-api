# multi-region-serverless-replication-test-api

## Usage

This repo is for multi-region AWS Lambda Functions used in the [TBD](https://) app.

- 🚀 API
  - eu-central-1
    - [/](https://cj1qlvv5jk.execute-api.eu-central-1.amazonaws.com/)
  - us-east-1
    - [/](https://7te35k1d7h.execute-api.us-east-1.amazonaws.com/)
  - us-west-2
    - [/](https://wpihj3fmjc.execute-api.us-west-2.amazonaws.com/)
- 🚀 APP [https://](https://)

### Deployment (Prod)

Deployment for all three regions is handled when a push or merge occurs on the `main` branch. This is handled by the a GitHub Action: `./.github/workflows/build-me.yaml`

## Tech

- [Serverless Framework](https://www.serverless.com/framework/docs)
- [Serverless CLI](https://www.serverless.com/framework/docs/getting-started).
