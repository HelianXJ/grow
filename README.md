# grow

Generator for projects that makes life easy (inspired by vue-cli)

## features

1. Write your own custom template and store them on github
2. Generate project from templates on github
3. List available templates

## Usage

#### Config your github account

- `grow config --username your-github-username`

No need to explain, this will create a file `~/.growconfig` holding your github configs. You have to set your GitHub username to run other commands

#### Create A Project

- `grow init your-template-name your-project-name`

This will create a project with the name you input using the template on the current working directory. Note that this project is held by a folder named `your-project-name`.

- `grow init your-template-name your-project-name -i`

This is almost the same with the first one above, but instead it will create all of the files on the current working directory.

- `grow list`

List templates on your GitHub. Template Repos are suffixed with `'-gt'`

#### Create A Template

1. Create a repo on your github like 'blablabla-gt', with `'-gt'` at the end
2. Setup your template project as usual
3. Put a grow.config.js file inside the repo with configurations. The config file is used to fill the `{{xxx}}` inside your template. 

For more information, just look into my simple vue.js template [vue-gt](https://github.com/assuming/vue-gt.git)

## Upcoming features

No idea XD