# DevOps

> All things DevOps

The artifact we create from this project is a fully built WordPress site with custom theme. 
We then deploy that artifact to a hosting provider. 


## TODO

- [x] Create Ops Base Repo (this repo `devops-starter`)
- [ ] Create Pantheon Base Repo (`pantheon-starter`)
- [ ] Create WPEngine Base Repo (`wpengine-starter`)
- [ ] Create Script to Pull Pantheon|WPengine 
- [ ] Create Script to Pull Base Theme from GitHub


**Typical Setup Instructions for a New Project:**

- Create Empty GitHub Repo for New Project per TS Guidelines (LINK TO KB)
  
- Clone devops repo
  ```shell
  git clone ssh://github.com/devops-starter.git my-new-project
  ```

- Replace Origin with New Project
  ```shell
  git remote set-url origin ssh://github.com/my-new-project.git
  git remote add devops ssh://github.com/devops-starter.git
  git remote update
  ```

- Setup Development Branch
  ```shell
  git checkout -b development
  ```

- Initialize Pantheon or WPEngine Project
  ```shell
  ./bin/init-platform pantheon|wpengine
  ```

- Commit and Begin Work
  ```shell
  git add .
  git commit -am 'Initial Commit'
  git push origin development
  ```

- I want to use Composer to manage wp core and plugins.


**Merge Latest Changes from DevOps into Project:**

```shell
git fetch devops
git merge devops/main
```
