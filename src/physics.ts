import Player from './player';
import { Vector2, Rectangle } from 'slifer';

declare var self: Worker;

self.onmessage = (event) => {
	// Run the players update
	if (Player.animating) Player.current_sprite += 0.25;
	
	        Player.groundedRect = new Rectangle(
	            new Vector2(Player.position.x, Player.position.y + Player.size.y - 4),
	            new Vector2(Player.size.x, 8)
	        );
	
	        if (Player.yvel < 10) {
	            Player.yvel += Player.gravity;
	        }
	        if (Player.current_sprite >= this.walkImages.length) {
	            Player.current_sprite = 0;
	        }
	
	        if (this.yvel != 0 && Slifer.Keyboard.isPressed("space") && this.hasDouble) {
	            this.yvel = -this.jumpSpeed;
	            this.hasDouble = false;
	        }
	
	        var move =
	            Number(Slifer.Keyboard.isDown("d")) -
	            Number(Slifer.Keyboard.isDown("a"));
	
	        this.xvel = move * this.speed;
	
	        this.chooseAnimation(this.xvel);
	
	        objects.forEach((rect) => {
	            this.checkForGrounded(rect);
	
	            this.checkVerticalColl(rect);
	            this.checkHorizontalColl(rect);
	        });
}
