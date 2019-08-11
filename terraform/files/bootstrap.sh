#! /usr/bin/env sh
apt-get update && apt-get upgrade -y

# install web server
apt-get install -y nginx

# install certbot ppa
apt-get install -y software-properties-common
add-apt-repository universe
add-apt-repository ppa:certbot/certbot
apt-get update

# install certbot for nginx
apt-get install -y certbot python-certbot-nginx

# install zsh
apt-get install -y zsh
chsh -s /usr/bin/zsh root

# install latest node lts (v10)
apt-get install -y curl
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
apt-get install -y nodejs

# create deployer user, allow sudo, disable ssh password prompt and a group for deployers
groupadd deployers
useradd deployer
mkdir -p /home/deployer/.ssh
cp /root/.ssh/authorized_keys /home/deployer/.ssh/.
chown deployer:deployer -R /home/deployer
usermod -a -G deployers deployer
# enable bash shell
usermod -s /bin/bash deployer
# allow sudo without password prompt
echo '%deployers      ALL=(ALL) NOPASSWD:  ALL' >> /etc/sudoers

# create a swap file, might be necessary for 1GB or less RAM
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
# Make the Swap File Permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# increase SSL security
# openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

# let's encrypt needs to renew, this will automate the renewal process
#(crontab -l 2>/dev/null; echo "30 2 * * 1 /usr/bin/letsencrypt renew >> /var/log/le-renew.log") | crontab -
#(crontab -l 2>/dev/null; echo "35 2 * * 1 /bin/systemctl reload nginx") | crontab -
