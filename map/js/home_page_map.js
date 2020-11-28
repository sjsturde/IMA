var app = new PIXI.Application(window.innerWidth, window.innerHeight, rendererOptions);
app.interactive = true;
document.body.appendChild(app.view);
var rendererOptions = {
    antialiasing: false,
    transparent: false,
    resolution: window.devicePixelRatio,
    autoResize: true,
}

app.renderer.resolution = 2;


var bg = PIXI.Sprite.fromImage('images/picture.jpg');
bg.width = app.renderer.width;
bg.height = app.renderer.height;
app.stage.addChild(bg)


var imaEvents = [
    {
        hor: app.renderer.width * .67,
        ver: app.renderer.height * .2,
        title: "Mini Golf 1",
        image: 'images/mini_golf.jpg',
        info: "Lorem ipsum dolor."
    },
    {
        hor: app.renderer.width * .36,
        ver: app.renderer.height * .29,
        title: "Audubon 2",
        image: 'images/audubon.jpg',
        info: "Lorem ipsum dolor."

    },
    {
        hor: app.renderer.width * .5,
        ver: app.renderer.height * .68,
        title: "Beer Garden 3",
        image: 'images/beer_garden.jpg',
        info: "Lorem ipsum dolor."
    },
    {
        hor: app.renderer.width * .5,
        ver: app.renderer.height * .4,
        title: "Priscilla Queen of the Desert 4",
        image: 'images/audubon.png',
        info: "Lorem ipsum dolor."

    },
    {
        hor: app.renderer.width * .25,
        ver: app.renderer.height * .47,
        title: "Audubon 5",
        image: 'images/audubon.jpg',
        info: "Lorem ipsum dolor."
    },
    {
        hor: app.renderer.width * .4,
        ver: app.renderer.height * .5,
        title: "Mini Golf 6",
        image: 'images/mini_golf.jpg',
        info: "Lorem ipsum dolor."
    },
    {
        hor: app.renderer.width * .7,
        ver: app.renderer.height * .7,
        title: "Mini Golf 7",
        image: 'images/beer_garden.jpg',
        info: "Lorem ipsum dolor."
    },
    {
        hor: app.renderer.width * .54,
        ver: app.renderer.height * .25,
        title: "Mini Golf 8",
        image: 'images/mini_golf.jpg',
        info: "Lorem ipsum dolor."
    },
    {
        hor: app.renderer.width * .2,
        ver: app.renderer.height * .7,
        title: "Mini Golf 9",
        image: 'images/beer_garden.jpg',
        info: "Lorem ipsum dolor."
    },
    {
        hor: app.renderer.width * .7,
        ver: app.renderer.height * .45,
        title: "Mini Golf 10",
        image: 'images/audubon.jpg',
        info: "Lorem ipsum dolor."
    },

];
var new_pin = {
    start: function (index) {
        var pin = PIXI.Sprite.fromImage('images/arrow.png');
        pin.anchor.set(0.5);
        pin.x = imaEvents[index].hor;
        pin.y = imaEvents[index].ver;

        pin.interactive = true;
        pin.buttonMode = true;

        new_circle.start(pin);
        new_rectangle.start(pin);

        pin.on('touchstart', function (event) {
            if (active_pin != null) {
                if (event.currentTarget.children[1].alpha == 1) {
                    event.currentTarget.children[1].alpha = 0;
                    event.currentTarget.children[0].alpha = 0;
                    active_pin = null;

                } else {
                    events[active_pin].children[0].alpha = 0;
                    events[active_pin].children[1].alpha = 0;
                    event.currentTarget.children[1].alpha = 1;
                    event.currentTarget.children[0].alpha = .25;
                    active_pin = index;
                }
            } else {
                active_pin = index;
                event.currentTarget.children[1].alpha = 1;
                event.currentTarget.children[0].alpha = .25;
            }
        });
        pin.on('click', function (event) {
            if (active_pin != null) {
                if (event.currentTarget.children[1].alpha == 1) {
                    event.currentTarget.children[1].alpha = 0;
                    event.currentTarget.children[0].alpha = 0;
                    active_pin = null;

                } else {
                    events[active_pin].children[0].alpha = 0;
                    events[active_pin].children[1].alpha = 0;
                    event.currentTarget.children[1].alpha = 1;
                    event.currentTarget.children[0].alpha = .25;
                    active_pin = index;
                }
            } else {
                active_pin = index;
                event.currentTarget.children[1].alpha = 1;
                event.currentTarget.children[0].alpha = .25;
            }
        });

        app.stage.addChild(pin);
        return pin;
    }
}
var new_rectangle = {
    start: function (pin) {
        var rectangle = new PIXI.Graphics();
        rectangle.lineStyle(1, 0xFF3300, 1);
        rectangle.beginFill(0xF2F3EF);
        rectangle.drawRect(0, 0, (bg.width / 10), (app.renderer.height / 10));
        rectangle.endFill();
        rectangle.x = 10;
        rectangle.y = -(rectangle.height + (rectangle.height / 3));
        rectangle.interactive = true;
        rectangle.buttonMode = true;
        rectangle.alpha = 0;
        text_style.start(rectangle);
        event_image.start(rectangle);

        pin.addChild(rectangle);
    }

}
var new_circle = {
    start: function (pin) {
        var circle = new PIXI.Graphics();
        circle.lineStyle(4, 0xFF3300, 1);
        circle.beginFill(0xF2F3EF);
        circle.drawCircle(0, 0, (bg.width / 20), (app.renderer.height / 20));
        circle.endFill();
        circle.x = 0;
        circle.y = 0;
        // circle.blendMode = PIXI.BLEND_MODES.ADD;
        circle.alpha = 0;

        pin.addChild(circle);
    }
}
var text_style = {
    start: function (rectangle) {
        var header_style = new PIXI.TextStyle({
            fontWeight: 'bold',
            fontSize: rectangle.width * .1,
            fontFamily: 'Arial',
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 100,
        });
        var info_style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: rectangle.width * .1,
            wordWrap: true,
            wordWrapWidth: 440,
            align: 'center'
        });
        header_style.resolution = 10;
        info_style.resolution = 10;
        var header = new PIXI.Text(imaEvents[index].title, header_style);
        header.x = rectangle.width / 2;
        header.y = rectangle.height * .1;
        var text = new PIXI.Text(imaEvents[index].info, info_style);
        text.x = rectangle.width / 2;
        text.y = rectangle.height * .5;

        rectangle.addChild(text);
        rectangle.addChild(header);
    }
}

var event_image = {
    start: function (rectangle) {
        var image = PIXI.Sprite.fromImage(imaEvents[index].image);
        image.scale.x = rectangle.width * .002;
        image.scale.y = rectangle.height * .005;
        image.x = rectangle.width * .03;
        image.y = rectangle.height * .1;

        rectangle.addChild(image);
    }
}

function bounce_up(event) {
    return up = {

        elem: event,

        bounce: 4,

        factor: 1,

        original_y: event.y,

        start: function () {
            app.ticker.add(this.animation, this);
        },
        end: function () {
            app.ticker.remove(this.animation, this);
            bounce_down(this.elem).start();
        },
        animation: function (delta) {
            if (this.elem.y != (this.original_y - this.bounce)) {
                this.elem.y -= this.factor;
                this.elem.scale.x += (this.factor * .1);
            } else {
                this.end();
            }
        }
    }
}
function bounce_down(event) {
    return down = {
        elem: event,

        bounce: 4,

        factor: 1,

        original_y: event.y,

        start: function () {
            app.ticker.add(this.animation, this);
        },
        end: function () {
            app.ticker.remove(this.animation, this);
        },
        animation: function (delta) {
            if (this.elem.y != (this.original_y + this.bounce)) {
                this.elem.y += this.factor;
                this.elem.scale.x -= (this.factor * .1);
            } else {
                this.end();
            }
        }
    }
}
function extend_info(event) {
    return open = {
        elem: event,

        factor: 1,

        original_x: event.children[1].x,

        start: function () {
            app.ticker.add(this.animation, this);
            this.elem.children[1].x = 0;
        },
        end: function () {
            app.ticker.remove(this.animation, this);
        },
        animation: function (delta) {
            if (this.elem.children[1].x < this.original_x) {
                this.elem.children[1].x += this.factor;
                this.elem.children[1].alpha += (this.factor * .1);
            } else {
                this.end();
            }
        }

    }
}
function shrink_info(event) {
    return close = {
        elem: event,

        factor: 1,

        original_x: event.children[1].x,

        start: function () {
            app.ticker.add(this.animation, this);
        },
        end: function () {
            app.ticker.remove(this.animation, this);
            this.elem.children[1].alpha = 0;
            this.elem.children[1].x = this.original_x;
        },
        animation: function (delta) {
            if (this.elem.children[1].x > 0) {
                this.elem.children[1].x -= this.factor;
                this.elem.children[1].alpha -= (this.factor * .1);
            } else {
                this.end();
            }
        }

    }
}
var events = [];
var index = 0;
var active_pin = null;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

while (index < imaEvents.length) {
    var object = new_pin.start(index);
    events.push(object);
    index = index + 1;
}
var bounce_random = getRandomInt(0, 10);
setInterval(function (e) {
    if (bounce_random == active_pin) {
        if ((bounce_random + 1) > 10) {
            bounce_random = 0;
            bounce_up(events[bounce_random]).start();
            bounce_random = bounce_random + 1;
        } else {
            bounce_random = bounce_random + 1;
            bounce_up(events[bounce_random]).start();
            bounce_random = bounce_random + 1;
        }
    }
    else {
        if ((bounce_random + 1) > 10) {
            bounce_random = 0;
            bounce_up(events[bounce_random]).start();
            bounce_random = bounce_random + 1;
        } else {
            bounce_up(events[bounce_random]).start();
            bounce_random = bounce_random + 1;
        }
    }
}, 500);

var infoInterval = setInterval(function (e) {
    if (active_pin == null) {
        var extend_random = getRandomInt(0, 10);
        extend_info(events[extend_random]).start();
        setTimeout(function (e) {
            shrink_info(events[extend_random], imaEvents[extend_random].hor).start();
        }, 2000);
    } else {
        return clearInterval(infoInterval);
    }
}, 5000)



