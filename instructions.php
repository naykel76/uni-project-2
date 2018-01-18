<?php if(!session_id()) session_start(); ?>
<!doctype html>
<html lang="en">
	<?php $metaTitle = 'Escape The Flame'; ?>
	<head>
		<?php include $_SERVER['DOCUMENT_ROOT']."/nbw_gotime/app/layouts/head.php"; ?>
	</head>
	<body>
		<header class="header">
			<?php include $_SERVER['DOCUMENT_ROOT']."/nbw_gotime/app/layouts/header.php"; ?>
		</header>
		<div id="middle">
			<div class="container">
				<h1 class="title">Escape The Flame</h1>
				<div class="flex-row">
					<div class="col-md-9">
						<p class="lead mar-t"><strong>Save the birds from the fire of doom!</strong> Shoot Alfred (the cannon ball) into the birds to push them safely into the trees. Don’t be too hasty with your trigger finger because each shot you take increases the height of the wall reducing your ability to use direct power making shots more difficult.</p>
						<h4>Tips and Controls</h4>
						<ul>
							<li>Increase shot power with the up and down arrows or the power slider</li>
							<li>Aim the cannon buy moving the mouse. Note: the closer the mouse is to the cannon the more responsive the aiming will be.</li>
							<li>Score bigger by hitting the birds in the centre</li>
							<li>You can leave the screen and hit the birds from above</li>
						</ul>
						<a href="docs/programming/uni-project-2/" Project 2" class="btn btn-secondary">Proceed to Game</a>
					</div>
					<div class="col-md-3">
						<img src="images/escape-the-flame.png" class="pull-right" alt="Escape The Flame">
						
					</div>
				</div>
				
			</div>
			
		</div>
		<footer id="footer">
			<?php include $_SERVER['DOCUMENT_ROOT']."/nbw_gotime/app/layouts/footer.php"; ?>
		</footer>
	</body>
</html>