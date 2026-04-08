# Mesh

Mesh lets you communicate with other projects running in the same browser or in TurboWarp Desktop, using special versions of variables and broadcasts. This allows you to for example, create a game that talks to another project running at the same time.

> [!NOTE]
> Only projects running in the same browser as another will receive messages. However, projects running in a different window will work.

## Setup

To setup a connection between a project, create a broadcast or variable in one project, and then create another of the same type and name in another project.

## Blocks

The blocks below are equivalent to other blocks in Scratch, but are received by other projects too.

### Broadcasts

```scratch
when I receive [message v] :: #4cdab2 hat
```
This block will activate when another project sends *this* project a message with the same name. It is triggered using the block below in any other project.

```scratch
broadcast (message v) :: #4cdab2
```
This block sends a message to all other projects that have the extension running. It triggers the hat block above in projects that listen for the message.

```scratch
broadcast (message v) and wait :: #4cdab2
```
This is similar to the block above, but waits for the broadcast to end before continuing to run the script.

### Variables

```scratch
(get (variable v) :: #4cdab2)
```

This block gets the value of a mesh variable.

```scratch
set (variable v) to [value] :: #4cdab2
```

This block sets the value of a mesh variable in all currently connected projects.

```scratch
change (variable v) by (1) :: #4cdab2
```

This block increments the value of a mesh variable in all currently connected projects by the specified number.
