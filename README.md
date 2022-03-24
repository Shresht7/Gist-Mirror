<h1 align='center'>
  Gist-Mirror
</h1>

<p align='center'>
  <!-- slot: description  -->
Mirror files from your repository to GitHub Gists
<!-- /slot -->
</p>

-------------

## 📑 Permissions

This action needs a [**personal access token**](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) (with the _gist_ permission) in order to update gists.


## 📖 Usage

### 1. Workflow Setup

#### 1. Gist Token

The `GITHUB_TOKEN` that comes with GitHub Actions by default, is restricted to the local repository. In other words, it _does not_ have permission to access GitHub Gists. You will have to provide a [**personal access token**](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) (with the `gist` permission) as a secret.

1. Get a [personal-access-token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).
1. Add it to your [repository secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) in the repo settings.
2. When you create the [workflow](#workflow), pass the secret in as the `GIST_TOKEN` environment variable.

```yaml
    env:
      GIST_TOKEN: ${{ secret.[SECRET_NAME] }}
```

#### 2. Gist

Note the `ID` of the gist you want to target. Create an new [Gist](https://gist.github.com/) if required.

> The `ID` is visible in the gist's url. `https://gist.github.com/<user>/<ID>`

The workflow takes a YAML input mapping gist-IDs to their corresponding files. e.g. to upload `README.md` to a gist with id `xyz123` you will provide the following input.

```yaml
with:
  gists: |
    xyz123:
      - README.md
```

> Note the `|`. It signifies that the input is a multiline string and not part of the workflow yaml.

#### 3. Workflow

Use this action in a workflow.

```yaml
- name: Gist-Mirror
  id: Gist-Mirror
  uses: Shresht7/Gist-Mirror@v1
  env:
    GIST_TOKEN: ${{ secrets.GIST_TOKEN }}
  with:
    dryrun: false
    gists: |
      bed31c34989a8ee63ec0dc4981a74c9a:
        - README.md
        - .github/workflows/gist-mirror.yml
```

### On Push Trigger

You can use the on-push events to run the workflow automatically whenever commits are pushed to the remote repository.

Trigger when commits are pushed to the main branch

```yaml
on:
  push:
    branches:
      - main
```

or when commits affect certain files

```yaml
  on:
    push:
      paths:
        - README.md
        - httpStatusCodes.ts
```

Read more about [events that trigger workflows](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)

You can use these event triggers to run the workflow automatically whenever a file (that is to be mirrored to a gist) is changed.

To see a working example, see [Workflow Example](#-workflow-examples).

## 📋 Inputs

<!-- slot: inputs  -->
| Input    | Description                                         |     Default |   Required   |
| :------- | :-------------------------------------------------- | ----------: | :----------: |
| `gists`  | YAML mapping GistIDs to their corresponding files   | `undefined` | **required** |
| `dryrun` | No actual changes will be made if dryrun is enabled |      `true` |              |
<!-- /slot -->

### gists

The `gists` input takes in a YAML configuration mapping gist-ID to their corresponding files. You can specify multiple gist-IDs and multiple files.

```yaml
gist_id_1:
  - README.md

gist_id_2:
  - package.json
  - package-lock.json
  - .gitignore
```

## 

## 📃 Workflow Example

To see a working example of this action, see this [workflow](./.github/workflows/gist-mirror.yml). This is the generated [Gist]([./](https://gist.github.com/Shresht7/bed31c34989a8ee63ec0dc4981a74c9a)).

<details>

  <summary>
    click here to show the workflow
  </summary>

  <br />

<!-- slot: workflow-example  prepend ```yaml, append: ``` -->
```yaml
# ===========================================
#                 GIST-MIRROR
# -------------------------------------------
# Mirror files from your repo to GitHub Gists
# ===========================================

name: Gist-Mirror

# Activation Events
# =================

on:
  push:
    paths:
      # Whenever a commit that affects the given files is pushed
      - README.md
      - ./github/workflows/gist-mirror.yml

  workflow_dispatch: # When a workflow event is dispatched manually
    inputs:
      dryrun:
        description: No actual changes will be made in a dry-run
        default: "false"
        required: false

# Jobs
# ====

jobs:
  Gist-Mirror:
    runs-on: ubuntu-latest

    name: Gist-Mirror
    steps:
      # Actions/Checkout
      # ================

      # Required for GITHUB_WORKSPACE
      - name: Checkout
        uses: actions/checkout@v3

      # Execute Gist-Mirror Action
      # ========================

      - name: Gist-Mirror
        uses: Shresht7/Gist-Mirror@main
        id: Gist-Mirror

        # Config Parameters
        # -----------------

        with:
          dryrun: ${{ github.event.inputs.dryrun }}
          gists: |
            bed31c34989a8ee63ec0dc4981a74c9a:
              - README.md
              - .github/workflows/gist-mirror.yml

        # Environment Variables
        # ---------------------

        env:
          GIST_TOKEN: ${{ secrets.GIST_TOKEN }} # Personal-Access-Token with gist permissions.

```
<!-- /slot -->

</details>

---

## 📑 License

> [MIT License](./LICENSE)