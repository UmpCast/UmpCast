# dionysus

This repository exposes DionysusService which bundles a k8s Deployment and ClusterIP service

### Development

-   Install cdk8s `brew install cdk8s`
-   Synthesize k8s manifests to dist/ `cdk8s synth`
-   Import k8s objects to "imports/k8s" `cdk8s import`
-   Apply manifests `kubectl apply -f dist/`
