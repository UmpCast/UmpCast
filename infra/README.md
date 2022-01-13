# Infrastructure

This repository contains UmpCast's infrastructure configs and developer tools

### Development using Skaffold

- Install the following dependencies
  - minikube: a tool for local k8s development
  - kubectl: a tool to run commands against k8s clusters
  - hyperkit (for macOS): lightweight macOS hypervisor
  - skaffold: command line tool for easy k8s development
  - k9s: terminal based UI to debug k8s cluster
- Start k8s cluster using minikube: `minikube start --driver=hyperkit`
- Add services to k8s cluster (run in root repository): `skaffold dev -f infra/skaffold.yml`
- To view k8s dashboard, run `minikube dashboard`
- To interact with cluster, run `k9s`
- When done, stop the k8s cluster: `minikube stop`

### Development using docker-compose

- Install docker
- To start the containers (run in root repository): `docker compose -f infra/docker-compose.yml up`
