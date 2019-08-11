/*
*         COMMON
*/
variable "app_name" {
  description = "Application name use for creating folders etc.,"
  default     = "CryptoStacker"
}

variable "app_domain" {
  description = "Our domain name"
  default     = ""
}

variable "app_subdomain" {
  default = "crypto-stacker"
}

# variable "app_email" {}

###############################

######### CLOUDFLARE ##########

###############################

variable "cloudflare_email" {
  default = ""
}

variable "cloudflare_token" {
  default = ""
}

###################################
########## DIGITAL OCEAN ##########
###################################
variable "do_token" {
  default = ""
}

variable "do_region" {
  description = "Digital Ocean New York Data Center 3"
  default     = "nyc3"
}

variable "do_instance_size" {
  description = "Size of the servers"
  default     = "s-1vcpu-1gb"
}

variable "do_image" {
  description = "The droplet image id or slug to use for the base OS"
  default     = "ubuntu-18-04-x64"
}
