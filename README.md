# Gist-Sync
-----------

⚠ Work-in-Progress ⚠

Sync files from your repository to GitHub Gists.

## Workflow Setup

### Gist Token

The `GITHUB_TOKEN` that comes with GitHub Actions by default, is restricted to the local repository. In other words, it _does not_ have permission to access GitHub Gists. You will have to provide a [**personal access token**](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) (with the `gist` permission) as a secret.

1. Get a [personal-access-token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).
1. Add it to your [repository secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) in the repo settings.
1. pass the secret to the action using the [workflow file](#workflow-file)

```yaml
    env:
      GIST_TOKEN: ${{ secret.[SECRET_NAME] }}
```

### Workflow file

Create the workflow file `.github/workflows/gist-sync.yaml`

```yaml
# =========================================
#                   GIST-SYNC
# -----------------------------------------
# Sync files from your repo to GitHub Gists
# =========================================

name: Gist-Sync

# Activation Events
# =================

on:
  workflow_dispatch:  # When a workflow event is dispatched manually

# Jobs
# ====

jobs:
  Gist-Sync:
    runs-on: ubuntu-latest
    
    name: Gist-Sync
    steps:
    
      # Actions/Checkout
      # ================

      # Required for GITHUB_WORKSPACE
      - name: Checkout
        uses: actions/checkout@v2

      # Execute Gist-Sync Action
      # ========================

      - name: Gist-Sync
        uses: Shresht7/Gist-Sync@main
        id: Gist-Sync

        # Config Parameters
        # -----------------

        with:
          dryrun: true          # Will not make any actual changes if true (default: true)
          gists: 'gists.yaml'   # File containing the file-gist mapping


        # Environment Variables
        # ---------------------

        env:
          GIST_TOKEN: ${{ secrets.GIST_TOKEN }} # Personal-Access-Token with gist permissions.

```

### Inputs

#### dryrun

Potential changes will only be logged if `dryrun` is `true`. For Gist-Sync to actually modify anything, you will have to set `dryrun` to `false`. (default: `true`)

#### gists

Name of the config file that maps files to their corresponding gist IDs. (default: `gists.yaml`)
**Note**: This file should be placed directly in your `.github` folder in the root of your repo.

## Usage

1. Create a [`GIST_TOKEN`](#gist-token) and setup the [workflow](#workflow-setup). Modify the workflow file as needed (e.g. disable `dryrun` by setting it to `false`).
2. Create a new [Gist](https://gist.github.com/) and note it's ID. **Note**: The workflow does not create new gists on its own, you have to provide an existing Gist ID.
3. Create `gists.yaml` in the `.github` directory. This files maps Gist IDs to corresponding files.
4. Run the workflow 🚀

### Example gists.yaml

```yaml
- id: GIST_ID
  files:
    - README.md
    - httpStatusCodes.ts
```

### Multiple Gists

You can sync to multiple gists!

```yaml
- id: GIST_ID_1
  files:
    - README.md
    - httpStatusCodes.ts

- id: GIST_ID_2
  files:
    - README.md
    - http_status_codes.rs
```

## Permissions

This action needs a [**personal access token**](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) (with the _gist_ permission) in order to update gists.