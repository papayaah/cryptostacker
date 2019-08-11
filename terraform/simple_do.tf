provider "digitalocean" {
  token = "${var.do_token}"
}

resource "digitalocean_droplet" "web" {
  # Obtain your ssh_key id number via your account. See Document https://developers.digitalocean.com/documentation/v2/#list-all-keys
  ssh_keys           = []
  image              = "${var.do_image}"
  region             = "${var.do_region}"
  size               = "${var.do_instance_size}"
  private_networking = false
  backups            = false
  ipv6               = false
  name               = "${var.app_name}"

  provisioner "file" {
    source      = "${path.module}/files/bootstrap.sh"
    destination = "/tmp/bootstrap.sh"
  }

  provisioner "remote-exec" {
    inline = [
      "chmod +x /tmp/bootstrap.sh",
      "/tmp/bootstrap.sh",
    ]
  }
}

output "web_ip" {
  value = "${digitalocean_droplet.web.ipv4_address}"
}