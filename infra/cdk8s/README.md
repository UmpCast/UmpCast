# cdk8s

This repository contains UmpCast's k8s configs using cdk8s

### Development

-   Install cdk8s `brew install cdk8s`
-   Synthesize k8s manifests to dist/ `cdk8s synth`
-   Import k8s objects to "imports/k8s" `cdk8s import`
-   Apply manifests `kubectl apply -f dist/`
