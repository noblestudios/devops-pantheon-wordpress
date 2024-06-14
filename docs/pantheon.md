# Pantheon

## Setup

- Create the Pantheon Sandbox Site
  ```shell
  terminus site:create \
    --region us \
    --org "Noble Studios" \
    "<site>" \
    "<label>" \
    "WordPress"
  ```

- Put site into Git mode
  ```shell
  terminus connection:set <site>.dev git
  ```

- Install WordPress
  ```shell
    WP_URL=`terminus env:info <site>.dev --field=domain`
    
    terminus remote:wp <site>.dev --progress -- core install \
        --url=$WP_URL \
        --title="Noble Basecamp" \
        --admin_user='@noblestudios' \
        --admin_password="changemelater" \
        --admin_email="developers@noblestudios.com"
  ```
  
- Create the MultiDev Environment `development`
  ```shell
  terminus multidev:create <site>.dev development
  ```

- Add Pantheon Files to Project
  ```shell
  terminus local:clone -- <site>
  mkdir -p web
  mv $HOME/pantheon-local-copies/<site>/* web/.
  git commit -am 'Add Pantheon Site to Project'
  ```

- Add Pantheon Git Origin
  ```shell  
  PANTHEON_GIT_REMOTE=`terminus connection:info --format FORMAT --field "git_host" -- <site>.dev`
  PANTHEON_GIT_USERNAME=`terminus connection:info --format FORMAT --field "git_username" -- <site>.dev`
  git remote add pantheon ssh://$PANTHEON_GIT_USERNAME@$PANTHEON_GIT_REMOTE:2222/~/repository.git
  ```

## GitHub Action Setup

Environment variables required:

| Name | Description
|----  |---- |
| **PANTHEON_ID** | The Pantheon Site ID
