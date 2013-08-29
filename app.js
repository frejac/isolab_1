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
		found = false;
		taken = false;
		okPlayer = false;
		player = null;
		playersLeft = 0;

		for (i = 0; i < players.length; i++) {
			if (!players[i].out)
				playersLeft++;

			if (players[i].name == data.nick) {
				okPlayer = true;
				player = players[i];
			}
		}

		if (!okPlayer) {
			io.sockets.emit('message', { nick: "Computer", message: "We do not know you. You are out!" });
			return;
		}

		if (playersLeft == 1) {
			io.sockets.emit('message', { nick: "Computer", message: "How dit it happen!" });
			return;
		}

		if (player.out) {
			io.sockets.emit('message', { nick: "Computer", message: player.name + " you are already OUT" });
			return;
		}

		for (i = 0; i < items.length; i++) {
			if (items[i].name.toLowerCase() == data.message.toLowerCase()) {
				found = true;
				for (j = 0; j < players.length; j++) {
					if (contains(players[j].items, data.message.toLowerCase())) {
						io.sockets.emit('message', { nick: data.nick, message: data.message + ", but that is already taken by " + players[j].name + "." + player.name + " is out." });
						player.out = true;
						taken = true;
						playersLeft--;
					}
				}
				if (!taken) {
					io.sockets.emit('message', { nick: data.nick, message: data.message + ". Great!" });
					player.items.push(data.message.toLowerCase());
				}
			}
		}
		if (!found) {
			io.sockets.emit('message', { nick: data.nick, message: data.message + ", but that is not int the list. " + player.name + " is out." });
			player.out = true;
			playersLeft--;
		}

		if (playersLeft == 1) {
			for (i = 0; i < players.length; i++) {
				if (!players[i].out) {
					io.sockets.emit('message', { nick: "Computer", message: "We have a winner: " + players[i].name });
				}

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

var players = [
	{ name: "Erik", out : false, items: [] },
	{ name: "Karin", out : false, items: [] },
	{ name: "Erica", out : false , items: [] },
	{ name: "Fredrik", out : false , items: []}
];

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
        "name": "Yaound�",
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
        "name": "Saint Denis",
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
        "name": "S�o Tom�",
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
        "name": "Lom�",
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