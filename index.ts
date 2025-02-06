import Slifer, { Vector2, Rectangle, Timer } from "slifer";
import Player from "./src/player";
import * as map from "./map.json";

const window = Slifer.createWindow("Game", new Vector2(640, 480));
const scale = 3;
const mapimage = Slifer.Graphics.loadImage("./art/map.png");

Player.position = new Vector2(140, 0);
Player.size = new Vector2(8 * scale, 12 * scale);
Player.load();

const fpsTimer = new Timer();
fpsTimer.start();
let countedFrames = 0;

const objects: Rectangle[] = [];
const blue = Slifer.Graphics.makeColor(0, 0, 255, 255);
const bg = Slifer.Graphics.makeColor(79, 91, 96, 255);

map.layer.objects.forEach((object) => {
    const n = new Rectangle(
        new Vector2(object.x * scale, object.y * scale),
        new Vector2(object.width * scale, object.height * scale)
    );
    objects.push(n);
});


while (!Slifer.shouldClose()) {
    Slifer.Graphics.setBackground(bg);

	let avgFPS = countedFrames / (fpsTimer.getTicks() / 1000);
	if (avgFPS > 2000000) avgFPS = 0;

    Player.rect = new Rectangle(Player.position, Player.size);
    Player.update(Slifer.dt, objects);


    Player.draw();

    Slifer.Graphics.drawEx(mapimage, new Vector2(0, 0), 0, new Vector2(scale, scale));

    Slifer.Graphics.render();

    ++countedFrames;

}

Player.quit();
Slifer.quit();
