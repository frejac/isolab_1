var App = App || {};

App.GameScreen = (function () {

	"use strict";

// ----------

	return {
		init: function () {

//			viewDataURL 	= holder.data("view-data-url");

			this.EVENT_START_GAME 	= "StartGame";
			this.EVENT_RESET_GAME 	= "RESET";
			this.EVENT_NEW_USER 	= "NewUser";

			this.test("wohoo");

			this.introScreen 	= $('.intro-screen');
			this.endScreen 		= $('.end-screen');
			this.joinGameScreen = $('.join-game-screen');
			this.gameScreen 	= $('.game-screen');
			this.playerList 	= $('.player-list');
			this.startGameButton= $('.start-game');
			this.listInfo		= $('.list-info');
			this.listName		= $('.list-name');
			this.truckerChat	= $('.trucker-chat');

			this.bind();
		},

		bind: function () {

			$('.submit-name').bind( 'click', $.proxy( this.join, this ) );
			$('.submit-answer').bind( 'click', $.proxy( this.sendAnswer, this ) );
			$('.start-game').bind( 'click', $.proxy( this.startGame, this ) );
			$('.reset-game').bind( 'click', $.proxy( this.resetGame, this ) );
		},

		test: function ( a ) {
//			window.console.log('test ', a);
		},
		//
		// GAME
		//
		showScreen: function ( screen ) {
			if( screen == "GAME" ) {

//				this.gameScreen.removeClass('inactive');
//				this.joinGameScreen.addClass('inactive');


				this.joinGameScreen.fadeOut( 250 );
				this.listName.delay( 250 ).fadeIn( 250 );
				this.gameScreen.delay( 1500 ).fadeIn( 250 );
			}
		},

		updateGame: function () {

			var data = this.gameData,
				listinfo = data.listinfo,
				players = data.players,
				html = '<table class="data-table">',
				cssClass = "",
				index=0;

			html += ('<tr><td class="trucker-status"><strong>Player</strong></td><td class="trucker-status"><strong>Status</strong></td></tr>');

			$.each( players, function( key, value ) {
//				window.console.log(value);

				cssClass = "";
				if(value.active == false ) {
					cssClass = "player-lost";
				} else if(data.turn === index ) {
					cssClass = "player-turn";
				}


				html += ('<tr><td class="'+cssClass+'">'+ value.nick +'</td><td class="'+cssClass+'">'+ value.lastmessage +'</td></tr>');

				index+=1;
			});

			html+= '</table>';

			// update texts
			this.listInfo.html( '<table class="data-table"><tr><td><strong>'+ listinfo.taken +'</strong></td><td> of </td></tr><tr><td><strong>'+ listinfo.length +'</strong></td><td> words used</td></tr></table>' );//listinfo.taken + ' / ' + listinfo.length );
			this.playerList.html( html );

			this.truckerChat.html(data.status);
			this.listName.html( 'Now playing \"' + listinfo.name + '\"' );

		},
		//
		// SERVER RELATED...
		//
		sendAnswer: function ( e ) {
			e.preventDefault();

			var message = $('input[name="message"]');
			var nick = this.nickName;


			if( message.val().length < 1 ) {

				alert('You must enter your answer');
				return;
			}

			//	Simple validation
//			if (nick.value == '') {
//				alert('You must enter your nick!');
//				return false;
//			}

			//	Send the message to the server
			this.socket.emit('message', { nick: nick.val(), message: message.val() });

//			this.sendMessage( message ); // WHY NOT WORK???

			// Clear the input
			message.val('');
		},

		sendMessage: function ( message, optionalNickname ) {

			var nick = optionalNickname || this.nickName.val();
			// Send the message to the server
			this.socket.emit('message', { nick: nick, message: message });

			return false;
		},

		join: function () {
			this.nickName = $('input[name="nickname"]');

			if( this.nickName.val().length > 0 ) {

				this.showScreen("GAME");
				this.connect();
			} else {
				alert('You must enter your nick!');
			}
		},

		connect: function () {

			if(this.isConnected !== true) {

				var that = this;
				this.socket = io.connect('http://localhost:10151');
				// Called when client is connected to server
				this.socket.on('connect', function () {

					// Send the username to the server
					that.sendMessage( that.EVENT_NEW_USER );

					// Called when client receives message from server
					that.socket.on('message', $.proxy(that.onTruckerData, that) );
					that.socket.on('timer', $.proxy(that.onTruckerTimer, that) );
				});
				this.isConnected = true;
			}
		},

		onTruckerTimer: function (data) {
//			window.console.log('onTruckerTimer ', data);
			var activePlayerStatus =  $('.data-table').find('.player-turn')[1],
				time = Number(data.time) || 30;

			if (time < 10 ) {
				time = '0'+time;
			}

			$(activePlayerStatus).text( '00:'+time );
		},

		onTruckerData: function (data) {

//			console.log('onTruckerData ', data);

			this.gameData = data;
			this.updateGame();
		},

		startGame: function () {
			this.sendMessage( this.EVENT_START_GAME );
		},

		resetGame: function () {
			this.sendMessage( this.EVENT_RESET_GAME, "ADMIN" );

		}
	};
});