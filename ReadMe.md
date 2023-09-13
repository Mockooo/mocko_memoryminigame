# Mocko-MEMORYMINIGAME
```lua

███╗░░░███╗░█████╗░░█████╗░██╗░░██╗░█████╗░  ░██████╗░█████╗░██████╗░██╗██████╗░████████╗░██████╗
████╗░████║██╔══██╗██╔══██╗██║░██╔╝██╔══██╗  ██╔════╝██╔══██╗██╔══██╗██║██╔══██╗╚══██╔══╝██╔════╝
██╔████╔██║██║░░██║██║░░╚═╝█████═╝░██║░░██║  ╚█████╗░██║░░╚═╝██████╔╝██║██████╔╝░░░██║░░░╚█████╗░
██║╚██╔╝██║██║░░██║██║░░██╗██╔═██╗░██║░░██║  ░╚═══██╗██║░░██╗██╔══██╗██║██╔═══╝░░░░██║░░░░╚═══██╗
██║░╚═╝░██║╚█████╔╝╚█████╔╝██║░╚██╗╚█████╔╝  ██████╔╝╚█████╔╝██║░░██║██║██║░░░░░░░░██║░░░██████╔╝
╚═╝░░░░░╚═╝░╚════╝░░╚════╝░╚═╝░░╚═╝░╚════╝░  ╚═════╝░░╚════╝░╚═╝░░╚═╝╚═╝╚═╝░░░░░░░░╚═╝░░░╚═════╝░

```
## INSTALLATION

Step 1: rename Folder to "mocko_memoryminigame"
Step 2: drag into "resources" Folder
Step 3: edit youre server.cfg and add ensure mocko_memoryminigame somewhere after esx has been started
Step 4: Configurate the Colors in the index.css so it looks like youre Server
Step 6: Restart the Server and Enjoy the Script!
Step 7: Report any Bugs you find to my Discord @mockoo or Under the post!
Step 8: Have Fun!

## Usage

### Notify
```lua
-- BSP1.1                   | Desprection                                                                               | BSP1.2    | Datatype
-----------------------------------------------------------------------------------------------------------------------------------------------
-- rounds                   | The ammount of rounds that will be Played                                                 | 1         | int (1-inf)
-- trys                     | The ammount of fails a Player can have(Resets with every new Board)                       | 3         | int (0-inf)
-- rows                     | The ammount of Rows the Board will have                                                   | 10        | int (1-inf)
-- columns                  | The ammount of columns the Board will have                                                | 10        | int (1-inf)
-- waitbeforeStart          | The ammount of time before Starting the Minigame                                          | 1000      | int (msec)
-- highlightBoxesTime       | The ammount of time the boxes will be lit up                                              | 2000      | int (msec)
-- highlightBoxesSpeed      | The ammount of speed the boxes will be lit up                                             | 500       | int (msec)
-----------------------------------------------------------------------------------------------------------------------------------------------
-- BSP2                     | Desprection
-----------------------------------------------------------------------------------------------------------------------------------------------
-- Stops the Minigame Completly this is if you want the game to stop if the player dies or maybe he leaves the car or something else.
-----------------------------------------------------------------------------------------------------------------------------------------------

-- BSP1.1
exports.mocko_memoryminigame:Start(rounds, trys, rows, columns, waitbeforeStart, highlightBoxesTime, highlightBoxesSpeed)
-- BSP1.2
exports.mocko_memoryminigame:Start(1, 3, 10, 10, 1000, 2000, 5000)

-- BSP2
exports.mocko_memoryminigame:Stop()
```

### Commands
```lua
Command: /testmemoryminigame
What is does: Starts a Minigame with the Values of BSP1.2 and then Prints if Won or Not
```