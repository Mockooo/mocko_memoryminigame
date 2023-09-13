-- // Made by Mocko With Love

-- // Variables
local Playing = false
local Win = nil

-- // Command for testing it
RegisterCommand("testmemoryminigame", function(source, args, raw)
    if (Start(1, 3, 10, 10, 1000, 2000, 5000)) then
        print("You Have Won the Minigame")
    else
        print("You Have Lost the Minigame")
    end
end)

-- // Start Function that starts the game and recalls if the game was won or not
function Start(rounds, trys, rows, columns, waitbeforeStart, highlightBoxesTime, highlightBoxesSpeed)
    if (Playing) then return end
    Playing = true
    Win = nil
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = "start",
        rounds = rounds,
        trys = trys,
        trystrys = trys,
        rows = rows,
        columns = columns,
        waitbeforeStart = waitbeforeStart,
        highlightBoxesTime = highlightBoxesTime,
        highlightBoxesSpeed = highlightBoxesSpeed

    })
    while (Playing) do Wait(100) end
    return Win
end

-- // Stop Function wich end the Game
function Stop()
    SendNUIMessage({
        action = "stop",
    })
end

-- // NuiCallBack to Catch the Exit out of the Game
RegisterNUICallback("exit", function(data)
    SetNuiFocus(false, false)
    Win = data.Win
    Playing = false
end)