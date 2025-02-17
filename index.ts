import { Slifer, Color, Font, Cursor } from 'slifer';
import Terminal from './src/terminal';
import Adv from './src/adv';
import Game from './src/game';
import System, { Dialogue } from "./src/system";

const window = Slifer.createWindow("Game", 640, 480);

export const white = new Color(255, 255, 255, 255);
export const black = new Color(0, 0, 0, 255);
const cursor = new Color(65, 65, 65, 255);

export const font = new Font("./font.ttf", 12);
const defCursor = new Cursor("./adv/default-cursor.png");

let time = 0;


Adv.load();

const sd1 = new Dialogue(
	new Map([
		["start", 1]
	]),
	"Hello?"
);

const sd2 = new Dialogue(
	new Map([
		["start", 2]
	])
)

System.allEvents.push()

while (!Slifer.shouldClose()) {
	Slifer.Graphics.setBackground(black);

	Slifer.setCursor(defCursor);

	time += Slifer.deltaTime;

	if (Math.floor(time) == 4) {
		System.setRule("start", 1);
	}


	switch (Game.state) {
		case "terminal":
			Terminal.update();

			Terminal.draw(font);
			break;
		case "adv":
			Adv.update();

			Adv.draw(font);
			break;
	}

	System.update();
	
	Slifer.Graphics.render();
}
