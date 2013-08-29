var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

// Start listening on port
server.listen(10151);

// Serve the index.html file
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/admin', function (req, res) {
 	res.sendfile(__dirname + '/listadmin.html');
});


// Called when client connects
io.sockets.on('connection', function (client) {
	client.on('listselect', function (data) {
		list = data;
		items = list.items;
		game.listinfo.name = list.name;
		game.listinfo.length = items.length;
	});
	// Called when receving 'message' from the client
	client.on('message', function (data) {
		// Log data to the console
		console.log(data);
		// Sends a message to all connected clients

		if (data.nick == "ADMIN") {
			if (data.message == "RESET") {
				game = {
					gameon: false,
					status: "Game Reset",
					turn: 0,
					secondsleft: 30,
					players: [],
					listinfo: { name: list.name, length: items.length, taken: 0 }
				};
				return;
			}

		}

		if (!list)
			return sendGameWithStatus("No list. Fix first");

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
			return sendGameWithStatus("Ey, game is not on!");

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
  listinfo : { name : "", length : 0, taken : 0 } 
}

var items;
var list;