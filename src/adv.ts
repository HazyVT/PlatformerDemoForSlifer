import { Slifer, Font, Vector2, Image, Canvas, Cursor, Rectangle } from 'slifer';
import { white, black } from '..';
import Game, { File } from './game';
import Dialogue from './dialogue'

// 290, 155 , 330, 190
// 286, 330, 330, 360 



class Adv {

	private static map: number[][] = [
		[2],
		[1]
	]
	private static pos : Vector2 = new Vector2(0, 1);
	private static hall: Image;
	private static postHall: Image;
	private static room: Image;
	private static exit: Image;

	private static canvas: Canvas;
	private static defCurs : Cursor;
	private static downCurs : Cursor;
	private static upCurs : Cursor;
	private static leftCurs : Cursor;
	private static rightCurs : Cursor;
	private static inspectCurs: Cursor;
	private static pointCurs : Cursor;

	private static activeDialogue: Dialogue | null = null;

	private static hallToRoom : Rectangle;
	private static time: number = 0;
	
	static load() {
		this.hall = new Image("./adv/hall.png")
		this.room = new Image('./adv/room.png');
		this.exit = new Image("./adv/exit.png");
		this.postHall = new Image("./adv/hall-post.png");
		this.canvas = new Canvas(160, 120);

		this.defCurs = new Cursor("./adv/default-cursor.png");
		this.rightCurs = new Cursor("./adv/right.png");
		this.leftCurs = new Cursor("./adv/left.png");
		this.downCurs = new Cursor("./adv/down.png");
		this.upCurs = new Cursor("./adv/up.png");
		this.inspectCurs = new Cursor("./adv/inspect.png");
		this.pointCurs = new Cursor("./adv/point.png");

		Slifer.setCursor(this.defCurs);
	}

	static update() {
		const room = this.map[this.pos.y][this.pos.x];
		const mpos = Slifer.Mouse.getPosition();
		const tx = (Math.floor(mpos.x / 16) - 10);
		const ty = (Math.floor(mpos.y / 16) - 7);


		if (mpos.x >= 8 && mpos.x <= 16 && mpos.y >= 8 && mpos.y <= 16) {
			Slifer.setCursor(this.pointCurs);

			if (Slifer.Mouse.isPressed('left')) {
				this.activeDialogue = null;
				Game.state = "terminal";
			}
		}

		
		switch (room) {
			case 1:
				if (tx >= 8 && tx <= 10 && ty >= 2 && ty <= 4) {
					Slifer.setCursor(this.upCurs);
					if (Slifer.Mouse.isPressed('left')) {
						this.pos.y -= 1;
					}
				}
				break;
			case 2:
				if (tx >= 8 && tx <= 10 && ty == 14) {
					Slifer.setCursor(this.downCurs);
					if (Slifer.Mouse.isPressed('left')) {
						this.pos.y += 1;
					}
				}

				// Left bed inspection
				if (tx >= 1 && tx <= 4 && ty >= 3 && ty <= 6) {
					Slifer.setCursor(this.inspectCurs);

					if (Slifer.Mouse.isPressed("left")) { 
						this.activeDialogue = new Dialogue("Where he kept him.");
						const rf = new File("room", "txt", "");
						rf.setContent([
							"TWO KIDS GO MISSING FROM TOWN",
							"4th August, 1982",
							" ",
							"Two kids have seemingly gone missing from town city",
							"and have yet to be heard from. The police are conducting",
							"a state wide search in order to find these kids and",
							"bring them home. "
						])
						Game.files.push(rf);
						this.map[this.pos.y + 1][this.pos.x] = 3;
					}
				}

				// Right bed inspection
				if (tx >= 16 && tx <= 18 && ty >= 3 && ty <= 6) {
					Slifer.setCursor(this.inspectCurs);

					if (Slifer.Mouse.isPressed("left")) this.activeDialogue = new Dialogue("Where he kept me.");
				}
				
				break;
			case 3:
				if (tx >= 8 && tx <= 10 && ty >= 2 && ty <= 4) {
					Slifer.setCursor(this.upCurs);

					if (Slifer.Mouse.isPressed('left')) {
						this.pos.y -= 1;
					}
				}
				break;
		}

		if (this.activeDialogue != null) {
			this.time += Slifer.deltaTime;
			
			this.activeDialogue.update();

			if (Math.floor(this.time) >= this.activeDialogue.dialogue.length) {
				this.activeDialogue = null;
			}
		} else {
			this.time = 0;
		}
	}	

	static draw(font: Font) {

		
		const room = this.map[this.pos.y][this.pos.x];
		switch (room) {
			case 1:
				this.canvas.draw(this.hall, 0, 0);
				break;
			case 2:
				this.canvas.draw(this.room, 0, 0);
				break;
			case 3:
				this.canvas.draw(this.postHall, 0, 0);
				break;
		}

		if (this.activeDialogue != null) {
			this.activeDialogue.draw(font);
		}

		Slifer.Graphics.draw(this.exit, 8, 8);


		Slifer.Graphics.drawEx(this.canvas, (640 - 320) / 2, (480 - 240) / 2, 2, 2);
	}
}

export default Adv;
