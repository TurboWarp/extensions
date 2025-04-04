# Hatch.lol
This is the official TurboWarp extension for integration with Hatch.lol's Main API and Save State API, written by one of Hatch.lol's engineers.

## Blocks
```scratch
(project ID :: #ffbd59)
```
Checks the URL for the project ID and returns it. Returns -1 if no ID was found.

### Main API
Blocks that interact with Hatch.lol's Main API.

```scratch
(server status code :: #ffbd59)
```
Returns the status code received from fetching the Main API.

```scratch
<server ok? :: #ffbd59>
```
Returns true if fetching the Main API returns an okay status code.

```scratch
([... v] of project/user [] :: #ffbd59)
```
Returns the selected data point of the project/user with the given ID/username, respectively.

> [!TIP]
> If you're grabbing multiple data points of the same object, it is recommended to store the JSON in a string and grab the values using the JSON extension, as shown in the example below. This reduces strain on the servers and speeds up the project:
```scratch
set [data v] to ([JSON v] of user (username) :: #ffbd59)
say (join [your name is: ] (value of [displayName] in (data) :: #3271d0)) for [2] secs
say (join [you live in: ] (value of [country] in (data) :: #3271d0)) for [2] secs
```

### Save State API
Blocks that interact with Hatch.lol's Save State API.

```scratch
save [] to user [] :: #ffbd59
```
Save the given string to the given username's save data for the current project. Does not do anything if project ID is -1.

> [!NOTE]
> The character limit for save data is 1,000. If a given string is over that number, the data will not be updated.

```scratch
(save data of user [] :: #ffbd59)
```
Returns the save data for the given username from the Save State API.
