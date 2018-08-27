/*jshint esversion: 6 */

define(['jquery'],function () {

    return function () {

        let main = `
        <div id="intro" class="uk-container uk-container-small uk-position-center uk-text-center">
			<div>
				<h1 class="uk-heading-primary">Pict • io</h1>
				<h3 id="subtitle" data-i18n="[html]intro.subtitle" class="uk-h3 uk-margin-remove-top">An inclusive mini-game for <strong>humans</strong> and <strong>quasi-humans!</strong></h3>
			</div>
			<div class="uk-margin-medium-top">
				<button id="go-play" data-i18n="intro.PlayBT" class="uk-button uk-button-large uk-button-primary uk-border-rounded">Let's Play</button>
			</div>
			<div class="uk-margin-large-top">
				<button id="-show-instructions" data-i18n="intro.intructionsBT" uk-toggle="target: #instructions" class="uk-button uk-button-text"></button>
			</div>

			<nav class="uk-navbar-container" uk-navbar>
				<div class="uk-navbar-center">
					<ul class="uk-navbar-nav">
						<li><a href="#" onclick="app.i18next.changeLanguage('en')">English</a></li>
						<li><a href="#" onclick="app.i18next.changeLanguage('pt')">Português</a></li>
					</ul>

				</div>
			</nav>

        </div>`;

        let inst = `
        <div id="instructions" uk-offcanvas="mode: push; overlay: true">
			<div class="uk-offcanvas-bar">

				<button class="uk-offcanvas-close" type="button" uk-close></button>

				<div class="uk-text-small">
					<h3 class='uk-h3'>How to Play</h3>
					<p>This game provides humans and machine with a common problem to solve as teams, where players must make themselves understood through drawings.</p>
					<p><strong>Participants:</strong> 2 teams composed of 2 humans and 1 tablet.</p>
					<p><strong>Contents:</strong> 1 board, 1 dice, 1 frame and 2 pawns.</p>
					<p><strong>The goal of the game:</strong> Make the team's pawn the first to go all the way through the board.</p>
					<p>1. Each team chooses a pawn and places it at the beginning of the board.</p>
					<p>2. Each team selects one person to be the first drawer. The team players alternate the drawer at each round.</p>
					<p>3.	The first drawers of each team throw the dice and advance into the board, which provides them with the first challenge. There are three categories of challenges:</p>
					<ul>
						<li>A. Drawing on the Wall</li>
						<li>B. Blind Drawing with Left/ Right Hand</li>
						<li>C. Verbal Description</li>
					</ul>
					<p>4. The drawers can not use other means of communication rather than those indicated for each challenge.</p>
					<p>5. If the team is able to complete the challenge, they can throw the dice and play one more time. After that, it is the other team’s turn to throw the dice.</p>
					<p>6. The game continues this way until one of the pawns completes the entire course.</p>
				</div>
			</div>

		</div>`;

        // return html;

        $(main).appendTo($("#view"));
		$(inst).appendTo($("#view"));

		// i18next.changeLanguage("en");

		console.log(app);
		// app.i18next.changeLanguage("pt");

		$('#intro').localize();
		$('.nav').localize();
		$('#content').localize();

		app.i18next.on('languageChanged', () => {
			console.log($.t('pt.translation.general'));
			$('#intro').localize();
		  });


        $('#go-play').click(function() {
		
		
            $("#intro").animate({
                marginTop: "-100",
                opacity: 0,
            }, 1500, function() {
                showColorChoice();
            } );
    
        });

    };

    // return apply;

});



// define(['jquery'],function () {

//     let html = `
//         <div id="intro" class="uk-container uk-container-small uk-position-center uk-text-center">
// 			<div>
// 				<h1 class="uk-heading-primary">Pict • io</h1>
// 				<h3 class="uk-h3 uk-margin-remove-top">An inclusive mini-game for <strong>humans</strong> and <strong>quasi-humans!</strong></h3>
// 			</div>
// 			<div class="uk-margin-medium-top">
// 				<button id="go-play" class="uk-button uk-button-large uk-button-primary uk-border-rounded">Let's Play</button>
// 			</div>
// 			<div class="uk-margin-large-top">
// 				<button id="-show-instructions" uk-toggle="target: #instructions" class="uk-button uk-button-text">How to play?</button>
// 			</div>
//         </div>`;
        
        

//     return html;

// });
