provider "aws" {
  region = "us-west-1"
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
  }
}
