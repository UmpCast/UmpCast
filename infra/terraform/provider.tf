provider "aws" {
  region = "us-west-1"
}
provider "helm" {
  kubernetes {
    host                   = data.aws_eks_cluster.prod.endpoint
    cluster_ca_certificate = base64decode(data.aws_eks_cluster.prod.certificate_authority.0.data)
    token                  = data.aws_eks_cluster_auth.prod.token
  }
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.prod.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.prod.certificate_authority.0.data)
  token                  = data.aws_eks_cluster_auth.prod.token
}


terraform {
  backend "remote" {
    organization = "umpcast"
    workspaces {
      prefix = "umpcast-"
    }
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.4.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.9.0"
    }
  }

}
