resource "aws_ecs_cluster" "indian_instagram_cluster" {
  name = "indian-instagram-cluster"
  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

resource "aws_ecs_cluster_capacity_providers" "indian_instagram_cluster_capacity_provider" {
  cluster_name = aws_ecs_cluster.indian_instagram_cluster.name

  capacity_providers = ["FARGATE"]

  default_capacity_provider_strategy {
    base              = 1
    weight            = 100
    capacity_provider = "FARGATE"
  }
}

# IAM Role for ECS Task Execution
resource "aws_iam_role" "ecs_task_execution" {
  name = "ecsTaskExecutionRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_policy" {
  role       = aws_iam_role.ecs_task_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# Task Definition
resource "aws_ecs_task_definition" "white_heart_task_definition" {
  family                   = "white-heart"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  execution_role_arn = aws_iam_role.ecs_task_execution.arn

  container_definitions = jsonencode([
    {
      name      = "white-heart-app"
      image     = var.ecs_image # Replace with your ECR repo image
      essential = true
      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
          protocol      = "tcp"
        }
      ]
    }
  ])
}

# ECS Service
resource "aws_ecs_service" "white_heart_service" {
  name            = "white-heart-service"
  cluster         = aws_ecs_cluster.indian_instagram_cluster.id
  task_definition = aws_ecs_task_definition.white_heart_task_definition.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = ["subnet-xxxx", "subnet-yyyy"] # replace with your VPC subnets
    security_groups = ["sg-xxxxxxx"]                 # replace with your SG
    assign_public_ip = true
  }

  depends_on = [
    aws_ecs_task_definition.this
  ]
}


