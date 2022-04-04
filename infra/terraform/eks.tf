module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  version         = "18.17.0"
  cluster_name    = local.k8s_cluster_name
  cluster_version = "1.21"
  subnet_ids      = module.vpc.private_subnets
  vpc_id          = module.vpc.vpc_id

  eks_managed_node_groups = {
    spot = {
      desired_size = local.k8s_cluster_size
      max_size     = local.k8s_cluster_size
      min_size     = local.k8s_cluster_size

      create_launch_template = false
      launch_template_name   = ""
      disk_size              = 50
      instance_types         = ["r5d.large"]
      capacity_type          = "SPOT"
    }
  }

  tags = {
    created-by = "terraform"
  }
}

data "aws_eks_cluster" "prod" {
  name = module.eks.cluster_id
}

data "aws_eks_cluster_auth" "prod" {
  name = module.eks.cluster_id
}
