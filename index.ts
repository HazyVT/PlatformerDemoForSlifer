import Slifer, { Vector2, Rectangle } from "slifer";
import Player from "./src/player";
import * as map from "./map.json";

const window = Slifer.createWindow("Game", new Vector2(640, 480));

const mapimage = Slifer.Graphics.loadImage("./art/map.png");
const mappos = new Vector2(0, 0);

Player.position = new Vector2(100, 100);
Player.size = new Vector2(8 * 3, 8 * 3);
Player.load();

const objects: Rectangle[] = [];
const red = Slifer.Graphics.makeColor(255, 0, 0, 255);
const blue = Slifer.Graphics.makeColor(0, 0, 255, 255);
const black = Slifer.Graphics.makeColor(0, 0, 0, 255);

map.layer.objects.forEach((object) => {
    const n = new Rectangle(
        new Vector2(object.x * 3, object.y * 3),
        new Vector2(object.width * 3, object.height * 3)
    );
    objects.push(n);
});

while (!Slifer.shouldClose()) {
    Slifer.Graphics.setBackground(black);
    Player.update(Slifer.dt);
    Player.rect = new Rectangle(Player.position, Player.size);
    //Slifer.Graphics.drawRect(Player.rect, blue);

    Player.draw();

    objects.forEach((rect) => {
        //Slifer.Graphics.drawRect(rect, red);

        if (Player.rect.isColliding(rect)) {
            // My position is greater than rect x
            // My position + size is greater than rect x
            // My posiiton + size is less than rect x
            if (
                Player.position.x + Player.size.x > rect.position.x &&
                Player.position.x < rect.position.x
            ) {
                Player.position.x = rect.position.x - Player.size.x;
                console.log("Right");
            }

            if (
                Player.position.x < rect.position.x + rect.size.x &&
                Player.position.x + Player.size.x >
                    rect.position.x + rect.size.x
            ) {
                Player.position.x = rect.position.x + rect.size.x;
                console.log("Left");
            }

            if (
                Player.position.y + Player.size.y > rect.position.y &&
                Player.position.y < rect.position.y
            ) {
                Player.position.y = rect.position.y - Player.size.y;
                Player.isGrounded = true;
            }
        }
    });

    Slifer.Graphics.drawEx(mapimage, mappos, 0, new Vector2(3, 3));

    Slifer.Graphics.render();
}

Slifer.quit();
