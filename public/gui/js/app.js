var App = App || {};

App.GameScreen = (function () {

	"use strict";

// ----------

	return {
		init: function () {

//			viewDataURL 	= holder.data("view-data-url");

			this.EVENT_START_GAME 	= "StartGame";
			this.EVENT_NEW_USER 	= "NewUser";

			this.test("wohoo");

			this.introScreen 	= $('.intro-screen');
			this.endScreen 		= $('.end-screen');
			this.joinGameScreen = $('.join-game-screen');
			this.gameScreen 	= $('.game-screen');
			this.playerList 	= $('.player-list');
			this.startGameButton= $('.start-game');
			this.listInfo		= $('.list-info');

//			this.gameScreen.addClass(".inactive");


			window.console.log( this.joinGameScreen, this.gameScreen );


			this.bind();
		},

		bind: function () {

			$('.submit-name').bind( 'click', $.proxy( this.join, this ) );
			$('.submit-answer').bind( 'click', $.proxy( this.sendMessage, this ) );
			$('.start-game').bind( 'click', $.proxy( this.startGame, this ) );
		},

		test: function ( a ) {
			window.console.log('test ', a);
		},
		//
		// GAME
		//
		showScreen: function ( screen ) {
			if( screen == "GAME" ) {

				this.gameScreen.removeClass('inactive');
				this.joinGameScreen.addClass('inactive');
			}
		},

		updateGame: function () {

			var data = this.gameData,
				listinfo = data.listinfo,
				players = data.players,
				html = "",
				cssClass = "",
				index=0;

			$.each( players, function( key, value ) {
				window.console.log(value);

				cssClass = "";
				if(value.active == false ) {
					cssClass = ".player-lost";
				} else if(data.turn === index ) {
					cssClass = ".player-turn";
				}

				html += ('<li class="'+cssClass+'">'+value.nick+'   '+ value.lastmessage +'</li>');

				index+=1;
			});

			this.playerList.html( html );
			this.listInfo.html( listinfo.taken + ' / ' + listinfo.length );
		},
		//
		// SERVER RELATED...
		//
		sendMessage: function ( e ) {
			e.preventDefault();

			var message = $('input[name="message"]');//document.getElementById('message');
			var nick = this.nickName;//document.getElementById('nick');
			window.console.log('nick: ', nick.val());
			window.console.log('mess: ', message.val());

			// Simple validation
			if (nick.value == '') {
				alert('You must enter your nick!');
				console.log('hej');
				return false;
			}

			// Send the message to the server
			this.socket.emit('message', { nick: nick.val(), message: message.val() });

			// Clear the input
			message.val('');

			return false;
		},

		join: function () {
			this.nickName = $('input[name="nickname"]');
			//$('.nick-name').html(this.nickName.val());

			this.showScreen("GAME");

			this.connect();
		},

		connect: function () {

			if(this.isConnected !== true) {

				window.console.log('connect');
				var that = this;
				this.socket = io.connect('http://localhost:10151');
				// Called when client is connected to server
				this.socket.on('connect', function () {
					console.log('socket connected');

					// Send the username to the server
					that.socket.emit('message', { nick: that.nickName.val(), message:that.EVENT_NEW_USER });

					// Called when client receives message from server
					that.socket.on('message', function (data) {
						// Log to browser console
						console.log('socket on', data);

						that.gameData = data;
						that.updateGame();
						// Add the message to the ul list
						var li = document.createElement('li');
							li.innerHTML = data.status;
//							li.innerHTML = data.nick + " says: " + data.message;
						document.getElementById('chat').appendChild(li);
					});

				});
				this.isConnected = true;
			}
		},

		startGame: function () {
			window.console.log('startGame');
			this.socket.emit('message', { nick: this.nickName.val(), message: this.EVENT_START_GAME });
		}
	};
});