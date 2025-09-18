module "vpc" {
  source = "./modules/vpc"
}

module "ecs" {
  source = "./modules/ecs"
  ecr_image = "test"
}
