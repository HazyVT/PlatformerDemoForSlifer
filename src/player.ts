import Slifer, { Image, Vector2, Rectangle } from "slifer";

class Player {
    public static position: Vector2;
    public static size: Vector2;
    public static rect: Rectangle;
    public static isGrounded = false;

    private static walkImages: Image[] = [];
    private static idleImage: Image;
    private static jumpImage: Image;
    private static current_sprite = 0;
    private static image: Image;
    private static animating: boolean = true;
    private static animation: string;
    private static flip = false;
    private static speed = 20;
    private static gravity = 16;
    private static yvel = 0;

    public static load() {
        this.idleImage = Slifer.Graphics.loadImage("./art/Sir-BC_stop.png");
        this.jumpImage = Slifer.Graphics.loadImage("./art/Sir-BC_jump.png");
        this.walkImages.push(
            Slifer.Graphics.loadImage("./art/walk/Sir-BC_walk1.png")
        );
        this.walkImages.push(
            Slifer.Graphics.loadImage("./art/walk/Sir-BC_walk2.png")
        );
        this.walkImages.push(
            Slifer.Graphics.loadImage("./art/walk/Sir-BC_walk3.png")
        );
        this.walkImages.push(
            Slifer.Graphics.loadImage("./art/walk/Sir-BC_walk4.png")
        );
        this.walkImages.push(
            Slifer.Graphics.loadImage("./art/walk/Sir-BC_walk5.png")
        );
        this.walkImages.push(
            Slifer.Graphics.loadImage("./art/walk/Sir-BC_walk6.png")
        );
        this.walkImages.push(
            Slifer.Graphics.loadImage("./art/walk/Sir-BC_walk7.png")
        );
        this.walkImages.push(
            Slifer.Graphics.loadImage("./art/walk/Sir-BC_walk8.png")
        );

        this.image = this.idleImage;
    }

    public static update(dt: number) {
        if (this.animating) this.current_sprite += 0.2;

        if (this.current_sprite >= this.walkImages.length - 1) {
            this.current_sprite = 0;
        }

        var xm =
            Number(Slifer.Keyboard.isDown("d")) -
            Number(Slifer.Keyboard.isDown("a"));

        this.chooseAnimation(xm);

        if (this.yvel < 10) {
            this.yvel += this.gravity * dt;
        }

        if (this.isGrounded) {
            this.yvel = 0;
            if (Slifer.Keyboard.isPressed("space")) {
                this.isGrounded = false;
                this.yvel = -this.speed * 10 * dt;
                this.animation = "jump";
            }
        }

        this.position.x += xm * this.speed * dt;
        this.position.y += this.yvel * dt;
    }

    private static animate() {
        this.animating = true;
    }

    private static chooseAnimation(xm: number) {
        if (this.isGrounded) {
            if (xm != 0) {
                if (xm == 1) this.flip = true;
                if (xm == -1) this.flip = false;

                //console.log(this.position);

                this.animation = "move";
                this.animating = true;
                this.image = this.walkImages[Math.floor(this.current_sprite)];
            } else {
                this.animation = "idle";
                this.current_sprite = 0;
                this.animating = false;
                this.image = this.idleImage;
            }
        } else {
            this.animating = false;
            this.image = this.jumpImage;
        }
    }

    public static draw() {
        Slifer.Graphics.drawEx(
            this.image,
            this.position,
            0,
            new Vector2(3, 3),
            this.flip
        );
    }
}

export default Player;
