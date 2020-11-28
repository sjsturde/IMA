'use strict';
var mapContainer = document.getElementById('map-container');

var containerRect = mapContainer.getClientRects()[0];

var mapComponents = {
    app: null,
    stage: {
        width: containerRect.width,
        height: containerRect.height,
        ratio: containerRect.width / containerRect.height,
        scaled: {
            width: containerRect.width,
            height: containerRect.height
        }
    },
    currentLayer: 'default',
    layers: {
        default: PIXI.Texture.fromImage('images/map.jpg'),
    },
    dimensions: {
        width: 1,
        height: 1,
        ratio: 1
    },
    scene: new PIXI.Container(),
    background: null,
    pinConfig: {
        texture: PIXI.Texture.fromImage('images/pin-red.png'),
        anchorCoords: new PIXI.Point(0.5, 0.75),
        scale: new PIXI.Point(0.5, 0.5)
    },
    pins: [],
    pinContainer: new PIXI.Container()
};

// Run init
var initMap = function () {
    // Set up PIXI Canvas
    mapComponents.app = new PIXI.Application(
        {
            width: mapComponents.stage.width,
            height: mapComponents.stage.height,
            backgroundColor: '0xf6f8e3',
            roundPixels: true,
            resolution: window.devicePixelRatio,
            //antialias: true
        });

    // Add root object to stage
    mapComponents.app.stage.addChild(mapComponents.scene);

    setBackgroundLayer();

    // Set pixel ratio to match display
    //mapComponents.app.renderer.resolution = 2;//window.devicePixelRatio;

    // Create root object to hold the scene
    mapComponents.scene.interactive = true;
    mapComponents.scene.buttonMode = true;

    // Allows drag to pan on root object (scene)

    // Use pointer events to capture mouse and touch
    mapComponents.scene.on('pointerdown', onDragStart);
    mapComponents.scene.on('pointerup', onDragEnd);
    mapComponents.scene.on('pointerupoutside', onDragEnd);
    mapComponents.scene.on('pointermove', onDragMove);

    for (var i = 0; i < imaEvents.length; i++) {
        var element = imaEvents[i];
        mapComponents.pins.push(new Pin(element, mapComponents.pinContainer));
    }

    mapComponents.scene.addChild(mapComponents.pinContainer);


    // Add to DOM
    mapContainer.appendChild(mapComponents.app.view);
}

var closeAllPins = function () {
    for (var i = 0; i < mapComponents.pins.length; i++) {
        mapComponents.pins[i].closeWindow();
    }
};

var setBackgroundLayer = function () {
    // Wait for layer texture to load
    if (mapComponents.layers[mapComponents.currentLayer].width > 1) {
        // set background
        mapComponents.dimensions.width = mapComponents.layers[mapComponents.currentLayer].width;
        mapComponents.dimensions.height = mapComponents.layers[mapComponents.currentLayer].height;
        mapComponents.dimensions.ratio = mapComponents.layers[mapComponents.currentLayer].width / mapComponents.layers[mapComponents.currentLayer].height;
        var bg = new PIXI.Sprite(mapComponents.layers[mapComponents.currentLayer]);

        mapComponents.background = mapComponents.scene.addChildAt(bg, 0);


        stageResizeHander();
        window.addEventListener("resize", stageResizeHander);
    } else {
        window.requestAnimationFrame(setBackgroundLayer);
    }
}

// Handle resizes
var stageResizeHander = function () {
    var containerRect = mapContainer.getClientRects()[0];
    var newstage = {
        width: containerRect.width,
        height: containerRect.height,
        ratio: containerRect.width / containerRect.height,
    };
    mapComponents.stage = newstage;
    mapComponents.app.renderer.resize(mapComponents.stage.width, mapComponents.stage.height);

    // Set background size
    mapComponents.stage.scaled = {};
    mapComponents.stage.scaled.height = mapComponents.stage.height;
    mapComponents.stage.scaled.width = mapComponents.stage.height * mapComponents.dimensions.ratio;


    mapComponents.background.height = mapComponents.stage.scaled.height;
    mapComponents.background.width = mapComponents.stage.scaled.width;

    mapComponents.scene.x = (mapComponents.stage.width - mapComponents.stage.scaled.width) * 0.5;

    for (var i = 0; i < mapComponents.pins.length; i++) {
        mapComponents.pins[i].updatePosition();
    }
};



function onDragStart(event) {
    this.data = event.data;
    this.isDragging = true;
    this.dragPosition = this.data.getLocalPosition(this.parent);
    //Think of a way to fix this will not close the pin on pin click just reopen the window, but will 
    // close on drag event
    //closeAllPins();
}
function onDragEnd(event) {
    this.isDragging = false;
    this.dragPosition = null;
    this.data = null;
}
function onDragMove() {
    if (this.isDragging === true) {
        if (mapComponents.stage.width < mapComponents.stage.scaled.width) {
            // Get new position to compare to last frame
            var newPosition = this.data.getLocalPosition(this.parent);

            // Update postions from drag
            this.x += (newPosition.x - this.dragPosition.x);
            //this.y += (newPosition.y - this.dragPosition.y);

            // Prevent scene from moving too far left<->right
            var minX = ((mapComponents.stage.scaled.width - mapComponents.stage.width) * -1); // Farthest left before revealing background
            var maxX = 0; //(mapComponents.app.renderer.width - mapComponents.background.width) * 0.5;
            if (this.x > maxX) {
                this.x = maxX;
            } else if (this.x < minX) {
                this.x = minX;
            }
            /*
                    // Prevent scene from moving too far top<->bottom
                    var minY = ((this.height - app.renderer.height) * -1);
                    if (this.y > 0) {
                        this.y = 0;
                    }else if (this.y < minY) {
                        this.y = minY;
                    }
            */
            // Store current position for next frame
            this.dragPosition = newPosition;
        } else {
            this.x = (mapComponents.stage.width - mapComponents.stage.scaled.width) * 0.5;
        }

    }
}

var imaEvents = [
    {
        hor: 0.67,
        ver: 0.2,
        title: "Mini Golf 1",
        image: 'images/mini_golf.jpg',
        location: "IMA Galleries",
        info: "lorem ipsum dolor sit amet, consectetur adipiscing elit. donec interdum.",
        time: "Open 5AM to 7PM",
    },
    {
        hor: 0.36,
        ver: 0.29,
        title: "Audubon 2",
        image: 'images/audubon.jpg',
        location: "IMA Galleries",
        info: "lorem ipsum dolor sit amet, consectetur adipiscing elit. donec interdum.",
        time: "Open 5AM to 7PM",

    },
    {
        hor: 0.5,
        ver: 0.68,
        title: "Beer Garden 3",
        image: 'images/beer_garden.jpg',
        location: "IMA Galleries",
        info: "lorem ipsum dolor sit amet, consectetur adipiscing elit. donec interdum.",
        time: "Open 5AM to 7PM",
    },
    {
        hor: 0.5,
        ver: 0.4,
        title: "Priscilla Queen of the Desert 4",
        image: 'images/audubon.png',
        location: "IMA Galleries",
        info: "lorem ipsum dolor sit amet, consectetur adipiscing elit. donec interdum.",
        time: "Open 5AM to 7PM",

    },
    {
        hor: 0.25,
        ver: 0.47,
        title: "Audubon 5",
        image: 'images/audubon.jpg',
        location: "IMA Galleries",
        info: "lorem ipsum dolor sit amet, consectetur adipiscing elit. donec interdum.",
        time: "Open 5AM to 7PM",
    },
    {
        hor: 0.4,
        ver: 0.5,
        title: "Mini Golf  a place to 6",
        image: 'images/mini_golf.jpg',
        location: "IMA Galleries",
        info: "lorem ipsum dolor sit amet, consectetur adipiscing elit. donec interdum.",
        time: "Open 5AM to 7PM",
    },
    {
        hor: 0.7,
        ver: 0.7,
        title: "Mini Golf 7",
        image: 'images/beer_garden.jpg',
        location: "IMA Galleries",
        info: "lorem ipsum dolor sit amet, consectetur adipiscing elit. donec interdum.",
        time: "Open 5AM to 7PM",
    },
    {
        hor: 0.54,
        ver: 0.25,
        title: "Mini Golf 8",
        image: 'images/mini_golf.jpg',
        location: "IMA Galleries",
        info: "lorem ipsum dolor sit amet, consectetur adipiscing elit. donec interdum.",
        time: "Open 5AM to 7PM",
    },
    {
        hor: 0.2,
        ver: 0.7,
        title: "Mini Golf 9",
        image: 'images/beer_garden.jpg',
        location: "IMA Galleries",
        info: "lorem ipsum dolor sit amet, consectetur adipiscing elit. donec interdum.",
        time: "Open 5AM to 7PM",
    },
    {
        hor: 0.7,
        ver: 0.45,
        title: "Mini Golf 10",
        image: 'images/audubon.jpg',
        location: "IMA Galleries",
        info: "lorem ipsum dolor sit amet, consectetur adipiscing elit. donec interdum.",
        time: "Open 5AM to 7PM",
    },

];

function Pin(config, container) {
    this.config = config;
    this.container = container;

    // Animation
    this.isOpen = false;
    this._targetWindowScale = new PIXI.Point(0, 0);
    this.bounceProgress = Math.random();
    this.bounceHeight = 20;
    this.bounceScale = .75;

    // Pin icon
    this._icon = new PIXI.Sprite(mapComponents.pinConfig.texture);
    this._icon.anchor.set(mapComponents.pinConfig.anchorCoords.x, mapComponents.pinConfig.anchorCoords.y);
    this._icon.scale = mapComponents.pinConfig.scale;
    this._icon.interactive = true;
    this._icon.buttonMode = true;





    this.toggleWindow = function (event) {
        if (this.isOpen) {
            this._targetWindowScale.set(0, 0);
        } else {
            closeAllPins();
            this.bringToFront();
            this._targetWindowScale.set(1, 1);
        }
        this.isOpen = !this.isOpen;
    }.bind(this);

    this._icon.on('pointertap', this.toggleWindow);

    this.openWindow = function () {
        this.isOpen = false;
        this.toggleWindow(null);
        console.log("false");
    }

    this.closeWindow = function () {
        this.isOpen = true;
        this.toggleWindow(null);
    }


    this.container.addChild(this._icon);

    // Window
    this._window = new PIXI.Container();
    this._window.scale = this._targetWindowScale;
    this.container.addChild(this._window);

    this._banner = new PIXI.Graphics();
    this._banner.beginFill(0x000000);
    this._banner.drawRoundedRect(0, 0, 350, 125, 20);
    this._banner.endFill();
    this._banner.interactive = false;

    this._window.addChild(this._banner);

    // Frame
    this._frame = new PIXI.Graphics();
    this._frame.beginFill(0xF2F3EF);
    this._frame.drawRoundedRect(0, 0, 350, 150, 20);
    this._frame.endFill();
    this._frame.interactive = false;

    //Time
    this._time = new PIXI.Text(this.config.time,
        new PIXI.TextStyle({
            fill: 0xFFFFFF,
            fontWeight: 'bold',
            fontSize: 16,
            fontFamily: 'Arial',
            align: 'center',
        }));
    this._time.x = (this._banner.width * .35);
    this._time.y = this._banner.height * .1;
    this._banner.addChild(this._time);


    // Image
    this._image = PIXI.Sprite.fromImage(this.config.image);
    this._image.x = this._frame.width * .025;
    this._image.y = this._frame.height * .075;
    this._image.scale.x = this._frame.scale.x * .7;
    this._image.scale.y = this._frame.scale.y * .8;
    this._frame.addChild(this._image);

    // Title
    this._title = new PIXI.Text(this.config.title,
        new PIXI.TextStyle({
            fill: 0xed583d,
            fontWeight: 'bold',
            fontSize: 20,
            fontFamily: 'Arial',
            align: 'left',
            wordWrap: true,
            wordWrapWidth: (this._frame.width * .55),
        }));
    this._title.x = this._frame.width * 0.45;
    this._title.y = this._frame.height * 0.05;

    this._frame.addChild(this._title);

    this._location = new PIXI.Text(this.config.location,
        new PIXI.TextStyle({
            fill: 0xd3d3d3,
            fontWeight: 'bold',
            fontSize: 14,
            fontFamily: 'Arial',
            align: 'left',
            wordWrap: true,
            wordWrapWidth: (this._frame.width * .55),
        }));
    this._location.x = this._frame.width * 0.45;
    this._location.y = this._frame.height * 0.4;

    this._frame.addChild(this._location);

    //Info 
    this._info = new PIXI.Text(this.config.info,
        new PIXI.TextStyle({
            fill: 0x000000,
            fontWeight: 'bold',
            fontSize: 14,
            fontFamily: 'Arial',
            align: 'left',
            wordWrap: true,
            wordWrapWidth: (this._frame.width * .55),
        }));

    this._info.x = this._frame.width * 0.45;
    this._info.y = this._frame.height * 0.6;

    this._frame.addChild(this._info);

    this._window.addChild(this._frame);

    this.updatePosition = function () {
        this._icon.x = this.config.hor * mapComponents.stage.scaled.width;
        this._icon.y = this.config.ver * mapComponents.stage.scaled.height;
        this._icon.initialY = this._icon.y;
        this._icon.initialHeight = this._icon.height;
        //Sets the position of the window based on window size.
        this._window.x = this._icon.x + (this._icon.width * this._icon.anchor.x);
        this._window.y = this._icon.initialY - this._window.height - this._icon.initialHeight;
        //if the window when open will over flow it changes the opening points. 
        if (((this._icon.width + this._icon.x) + this._frame.width) > mapComponents.background.width) {
            this._window.x = this._icon.x - (this._icon.width * this._icon.anchor.x);
        }
        if (this._icon.initialY - (this._frame.height + (this._frame.height * .25) + this._icon.initialHeight) < 0) {
            this._window.y = this._icon.initialY;
        }
    };

    this.bringToFront = function () {
        this.container.removeChild(this._window);
        this.container.addChildAt(this._window, this.container.children.length);
    };
    this.onTick = function (deltaTime) {
        // Window opens North East normally
        if (this._window.scale.x != this._targetWindowScale.x) {

            var delta = this._targetWindowScale.x - this._window.scale.x;
            var step = Math.abs(delta) < 0.01 ? delta : (delta * deltaTime) * 0.1;
            this._window.scale = new PIXI.Point(this._window.scale.x + step, this._window.scale.y + step);

            //adjusts the position of x and Y as the window scales up
            this._window.x = this._icon.x + (this._icon.width * this._icon.anchor.x);
            this._window.y = this._icon.initialY - this._window.height - this._icon.initialHeight;

            //if the window opens too far to the right, will change opening X posion of window
            if (((this._icon.width + this._icon.x) + this._frame.width) > mapComponents.background.width) {
                this._window.x = this._icon.x - (this._icon.width * this._icon.anchor.x);
                this._frame.x = this._frame.width * -1;
                this._banner.x = this._frame.x;
            }
            //if the window opens too far to the top of the canvas will change opening Y posion of window
            if ((this._icon.initialY - (this._frame.height + (this._frame.height * .25) + this._icon.initialHeight)) < 0) {
                this._window.y = this._icon.initialY;
            }

        }
        //TODO the jumping error occurs here if I remove the .8 check it doesn't jump.
        if (this._window.scale.x == 1) {
            //when the scale is 1 for a window meaning it is open slides the banner up from the frame at a factor
            if (this._banner.y > (this._frame.y - (this._frame.height * .25))) {
                this._banner.y -= 4;
            }
            //return the banner to starting position TODO think of a better way to return it to the original state 
        } else if (this._window.scale.x == 0) {
            this._banner.y = 0;
        }

        this.bounceProgress += .02;
        if (this.bounceProgress > 1 || this.bounceProgress < 0) {
            this.bounceProgress = 0;
        }

        this._icon.scale.y = pingpong(mapComponents.pinConfig.scale.y, this.bounceScale, this.bounceProgress);
        this._icon.y = pingpong(this.config.ver * mapComponents.stage.scaled.height, (this.config.ver * mapComponents.stage.scaled.height) - this.bounceHeight, this.bounceProgress);
    };
    this._window.scale.y = this._window.scale.y * -1;

    this._start = function () { mapComponents.app.ticker.add(this.onTick, this); };
    this._end = function () { mapComponents.app.ticker.remove(this.animation, this); };

    this._start();

}

function pingpong(start, end, time) {
    return time < 0.5 ? start + ((end - start) * time) : end - ((end - start) * time);
}


initMap();