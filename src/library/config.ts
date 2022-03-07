//  Library
import * as core from '@actions/core'
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as yaml from 'js-yaml'

//  Type Definitions
import { Gist } from '../types'

//  ======
//  CONFIG
//  ======

//  DRY RUN
//  -------

/** Dry-run toggle. No actual changes will be made while this is true. */
export const isDryRun = core.getBooleanInput('dryrun') ?? false

//  GISTS
//  -----

//  Read gists.yaml
export const workspaceURL = process.env.GITHUB_WORKSPACE || ''
const fileName = core.getInput('gists')
let fileContents
try {
    fileContents = fs.readFileSync(path.join(workspaceURL, '.github', fileName), 'utf-8')
} catch (_) {
    fileContents = ''
}
console.log(workspaceURL, process.env.GITHUB_WORKSPACE)
console.log(fileContents)

/** Contents of the gists.yaml file. Maps files to gistIDs */
export const gists: Gist[] = yaml.load(fileContents) as Gist[]