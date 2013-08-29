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
		for (i = 0; i < items.length; i++) {
			if (items[i].name.toLowerCase() == data.message.toLowerCase()) {
				found = true;
				io.sockets.emit('message', { nick: data.nick.value, message: "FOUND: " + data.message });
			}
		}
		if (!found)
			io.sockets.emit('message', { nick: data.nick.value, message: "You is out: " + data.message + " is not in my list" });
	});
});

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