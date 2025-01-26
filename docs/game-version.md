# Game Version Extension

## Overview
The Game Version extension is a REST API-based utility designed for managing game versions. It allows you to fetch, set, and update the game version from a server. This extension is useful for games that require version management and update checks.

## Installation
To use the Game Version extension, follow these steps:
1. Open the `gameversion` extension from TurboWarp 
2. Add the extension to your TurboWarp project by implementing the `gameversion` extension.

## Blocks
The Game Version extension provides the following blocks:

### Version Management
- **Label: Version Management**
- **Reporter: current game version**
  - Retrieves the current game version from the server.
- **Command: set game version to [VERSION]**
  - Sets the game version to the specified version.

### Latest Version
- **Label: Latest Version**
- **Reporter: latest game version**
  - Retrieves the latest game version from the server.
- **Command: fetch latest game version from server**
  - Fetches the latest game version from the server.

### Server Settings
- **Label: Server Settings**
- **Command: set server URL to [URL]**
  - Sets the server URL to the specified URL.

### Update Management
- **Label: Update Management**
- **Command: check for updates**
  - Checks for updates by comparing the current game version with the latest version on the server.
- **Reporter: update status**
  - Retrieves the update status (e.g., "Update available" or "No updates available").

## Usage
1. **Set the Server URL**: Use the "set server URL to [URL]" block to specify the server URL where the game version information is stored.
2. **Fetch the Current Version**: Use the "current game version" reporter block to retrieve the current game version from the server.
3. **Set the Game Version**: Use the "set game version to [VERSION]" command block to set the game version to the specified version.
4. **Fetch the Latest Version**: Use the "fetch latest game version from server" command block to fetch the latest game version from the server.
5. **Check for Updates**: Use the "check for updates" command block to check for updates by comparing the current game version with the latest version on the server.
6. **Retrieve Update Status**: Use the "update status" reporter block to retrieve the update status.

## License
This extension is licensed under the MPL-2.0 License.

## Author
The Game Version extension was created by [Thebloxers998](https://scratch.mit.edu/users/Thebloxers998/).

## Contributing
Contributions are welcome! If you have any suggestions or improvements, feel free to create a pull request or open an issue in the repository.

## Contact
For any questions or support, please contact [Thebloxers998](https://scratch.mit.edu/users/Thebloxers998/).
