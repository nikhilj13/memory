defmodule Memory.Game do

	# returns the initial game state
	def new do
		%{
			gameState: initialGameState(),
			clicks: 0
		}
	end

	def client_view(game) do
		game
	end
	
	# returns the initial state for all the tiles
	def initialGameState do
		availableLetters = ["A", "B", "C", "D", "E", "F", "G", "H"]
		Enum.shuffle(availableLetters ++ availableLetters)
		|> Enum.with_index()
		|> Enum.map(fn {letter, index} -> %{
			"letter" => letter, 
			"position" => index, 
			"status" => 0,
			} 
		end)
	end

	# returns an list of all the open tiles
	def getOpenTiles(tiles) do
		Enum.filter(tiles, fn tile -> tile["status"] == 1 end)
	end
	
	# returns the Tile State of tile at 'position'
	def getTileAtPosition(tiles, position) do
		Enum.filter(tiles, fn tile -> tile["position"] == position end)
		|> Enum.at(0)
	end
	
	# sets the status of all the tile positions in 'positions' to 'newStatus'
	def setTileStatus(tiles, position, newStatus) do
		newTiles = tiles
		Enum.map(newTiles, fn tile ->
			if Enum.member?(position, tile["position"]) do
					Map.put(tile, "status", newStatus)
			else
					tile
			end
		end)
	end

	# hides all the shown tiles
	def hideTiles(game) do
    tiles = game.gameState
    newGameState = Enum.map(tiles, fn tile ->
        if tile["status"] == 1 do
            Map.put(tile, "status", 0)
        else
            tile
        end
		end)
		%{
			gameState: newGameState,
			clicks: game.clicks
		}
	end

	# handles a tile click
	def handleTileClick(game, position) do
    openTiles = Memory.Game.getOpenTiles(game.gameState)
    numOpenTiles = Enum.count(openTiles)
    if numOpenTiles == 0 do
        newGameState = Memory.Game.setTileStatus(game.gameState, [position], 1)
        incrementedClicks = game.clicks + 1
        %{
            gameState: newGameState,
            clicks: incrementedClicks
        }
    else 
			if numOpenTiles == 1 do
				openedTile = Enum.at(openTiles, 0)
				currentTile = Memory.Game.getTileAtPosition(game.gameState, position)
				if openedTile["letter"] == currentTile["letter"] do
					newGameState = Memory.Game.setTileStatus(game.gameState, [openedTile["position"], currentTile["position"]], -1)
					incrementedClicks = game.clicks + 1
					%{
						gameState: newGameState,
						clicks: incrementedClicks
					}
				else
					newGameState = Memory.Game.setTileStatus(game.gameState, [currentTile["position"]], 1)
					incrementedClicks = game.clicks + 1
					%{
						gameState: newGameState,
						clicks: incrementedClicks
					}
				end
			else
				game
			end
    end
  end
  
end