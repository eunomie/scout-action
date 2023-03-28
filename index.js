// Copyright 2021 Blend Labs, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const childProcess = require('child_process')
const os = require('os')
const process = require('process')

function chooseBinary() {
    const platform = os.platform()
    const arch = os.arch()

    if (platform === 'darwin' && arch === 'x64') {
        return `githubaction-darwin-amd64`
    }
    if (platform === 'darwin' && arch === 'arm64') {
        return `githubaction-darwin-arm64`
    }
    if (platform === 'linux' && arch === 'x64') {
        return `githubaction-linux-amd64`
    }
    if (platform === 'linux' && arch === 'arm64') {
        return `githubaction-linux-arm64`
    }
    if (platform === 'win32' && arch === 'x64') {
        return `githubaction-windows-amd64.exe`
    }
    if (platform === 'win32' && arch === 'arm64') {
        return `githubaction-windows-arm64.exe`
    }

    console.error(`Unsupported platform (${platform}) and architecture (${arch})`)
    process.exit(1)

    return `githubaction-${platform}-${arch}`
}

function main() {
    const binary = chooseBinary()
    const mainScript = `${__dirname}/${binary}`
    const spawnSyncReturns = childProcess.spawnSync(mainScript, { stdio: 'inherit' })
    const status = spawnSyncReturns.status
    if (typeof status === 'number') {
        process.exit(status)
    }
    process.exit(1)
}

if (require.main === module) {
    main()
}