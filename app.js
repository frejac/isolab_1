var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

// Start listening on port
server.listen(10151);

// Serve the index.html file
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});


// Called when client connects
io.sockets.on('connection', function (client) {
	// Called when receving 'message' from the client
	client.on('message', function (data) {
		// Log data to the console
		console.log(data);
		// Sends a message to all connected clients


		if (data.message == "NewUser") {
			if (game.gameon)
				return sendGameWithStatus(data.nick + " tried to join, but game is on");
			for (i = 0; i < game.players.length; i++)
				if (game.players[i].nick == data.nick)
					return sendGameWithStatus(data.nick + " tried to join again, nice try!");
			game.players.push({ nick: data.nick, active: true, lastmessage: "", items: [] });
			return sendGameWithStatus(data.nick + " joined the game");
		}


		if (data.message == "StartGame") {
			if (game.gameon)
				return sendGameWithStatus(data.nick + " tried to start the game, but game is already started");
			game.gameon = true;
			game.listinfo.length = items.length;
			return sendGameWithStatus(data.nick + " started the game");

		}

		if (!game.gameon)
			return;

		found = false;
		taken = false;
		okPlayer = false;
		player = null;
		playersLeft = 0;
		okTurn = false;

		for (i = 0; i < game.players.length; i++) {
			if (!game.players[i].out)
				playersLeft++;

			if (game.players[i].nick == data.nick) {
				okPlayer = true;
				player = game.players[i];
				okTurn = i == game.turn;
			}
		}

		if (!okPlayer)
			return sendGameWithStatus("Unknown nick: " + data.nick + ". Get out of here");

		if (playersLeft == 1)
			return sendGameWithStatus("Hm, this is not supposed to happen");

		if (!player.active)
			return sendGameWithStatus("Forget it, " + player.name + " you are already OUT");

		if (!okTurn)
			return sendGameWithStatus(data.nick + " tried to say something, but its not hens turn");

		for (i = 0; i < items.length; i++) {
			if (items[i].name.toLowerCase() == data.message.toLowerCase()) {
				found = true;
				for (j = 0; j < game.players.length; j++) {
					if (contains(game.players[j].items, data.message.toLowerCase())) {
						player.active = false;
						player.lastmessage = data.message;
						taken = true;
						playersLeft--;
						sendGameWithStatus(data.nick + " said " + data.message + ", but that is already taken by " + game.players[j].nick + ". " + player.nick + " is out.");
					}
				}
				if (!taken) {
					player.items.push(data.message.toLowerCase());
					player.lastmessage = data.message;
					game.listinfo.taken++;
					sendGameWithStatus(player.nick + " said " + data.message + ". Great!");
				}
			}
		}
		if (!found) {
			player.active = false;
			playersLeft--;
			sendGameWithStatus(data.nick + " said " + data.message + ", but that is not in the list. " + data.nick + " is out.");
		}

		if (playersLeft == 1) {
			for (i = 0; i < players.length; i++) {
				if (!players[i].out) {
					sendGameWithStatus("We have a winner: " + game.players[i].nick);
				}
			}
		}

		for (i = game.turn + 1; i < game.turn + game.players.length; i++) {

			a = i;
			if (a >= game.players.length)
				a = a - game.players.length;

			if (game.players[a].active) {
				game.turn = a;
				break;
			}
		}
	});
});

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

function sendGameWithStatus(status) {
	game.status = status;
	io.sockets.emit('message', game);
}

var game =  {
  gameon: false,
  status : "",
  turn: 0,
  secondsleft: 30, 
  players : [ ],
  listinfo : { name : "Huvudstäder i Afrika", length : 50, taken : 0 } 
}

//the Items
var items = [
      {
        "name": "Alger",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Luanda",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Porto-Novo",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Gaborone",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Ouagadougou",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Bujumbura",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Bangui",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Djibouti",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Kairo",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Malabo",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Yamoussoukro",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Asmara",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Addis Ababa",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Libreville",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Banjul",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Accra",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Conakry",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Bissau",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Yaoundé",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Praia",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Nairobi",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Moroni",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Brazzaville",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Kinshasa",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Maseru",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Monrovia",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Tripoli",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Antananarivo",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Lilongwe",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Bamako",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Rabat",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Nouakchott",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Port Louis",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Dzaoudzi",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Maputo",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Windhoek",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Niamey",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Abuja",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Saint-Denis",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Kigali",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Jamestown",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "São Tomé",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Dakar",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Victoria",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Freetown",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Mogadishu",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Khartoum",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Mbabane",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Pretoria",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Dodoma",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "N'Djamena",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Lomé",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Tunis",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Kampala",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Al-Ayun",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Lusaka",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      },
      {
        "name": "Harare",
        "metadata": [
          {
            
          },
          {
            
          }
        ]
      }
    ];