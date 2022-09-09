<template>
  <div id="game-container" style="text-align: center"></div>
</template>

<script>
import * as PIXI from "pixi.js";
import wallJson from "@/assets/wall.json";

const APP_WIDTH = 512;
const APP_HEIGHT = 384;

let app = null;

// 远景类
function FarTilingSprite() {
  const texture = new PIXI.Texture.from(require("@/assets/bg-far.png"));

  PIXI.TilingSprite.call(this, texture, APP_WIDTH, APP_HEIGHT);
  this.x = 0;
  this.y = 0;
  this.tilePosition.x = 0;
  this.tilePosition.y = 0;
  this.viewportX = 0;
}
FarTilingSprite.prototype = Object.create(PIXI.TilingSprite.prototype);
FarTilingSprite.DELTA_X = 0.128;

FarTilingSprite.prototype.setViewportX = function (newViewportX) {
  const distanceTravelled = newViewportX - this.viewportX;
  this.viewportX = newViewportX;
  this.tilePosition.x -= distanceTravelled * FarTilingSprite.DELTA_X;
};

// 中景类
function MidTilingSprite() {
  const texture = new PIXI.Texture.from(require("@/assets/bg-mid.png"));

  PIXI.TilingSprite.call(this, texture, APP_WIDTH, APP_HEIGHT);
  this.x = 0;
  this.y = 128;
  this.tilePosition.x = 0;
  this.tilePosition.y = 0;
  this.viewportX = 0;
}
MidTilingSprite.prototype = Object.create(PIXI.TilingSprite.prototype);
MidTilingSprite.DELTA_X = 0.64;
// MidTilingSprite.prototype.update = function () {
//   this.tilePosition.x -= 0.64;
// };
MidTilingSprite.prototype.setViewportX = function (newViewportX) {
  const distanceTravelled = newViewportX - this.viewportX;
  this.viewportX = newViewportX;
  this.tilePosition.x -= distanceTravelled * MidTilingSprite.DELTA_X;
};

// 场景运动显示类
function Scroller(stage, textures) {
  this.farSprite = new FarTilingSprite();
  this.midSprite = new MidTilingSprite();
  this.frontSprite = new Walls(textures);
  this.mapBuilder = new MapBuilder(this.frontSprite);
  console.log(this.mapBuilder)
  // console.log(this.frontSprite)

  stage.addChild(this.farSprite, this.midSprite, this.frontSprite);

  this.viewportX = 0;
}

Scroller.prototype.setViewportX = function (viewportX) {
  this.viewportX = viewportX;
  this.farSprite.setViewportX(viewportX);
  this.midSprite.setViewportX(viewportX);
  this.frontSprite.setViewportX(viewportX);
};
Scroller.prototype.getViewportX = function () {
  return this.viewportX;
};

Scroller.prototype.moveViewportXBy = function (units) {
  const newViewportX = this.viewportX + units;
  this.setViewportX(newViewportX);
};

// 分离类
function SliceType() {}

SliceType.FRONT = 0;
SliceType.BACK = 1;
SliceType.STEP = 2;
SliceType.DECORATION = 3;
SliceType.WINDOW = 4;
SliceType.GAP = 5;

function Walls(textures) {
  PIXI.Container.call(this);

  this.pool = new WallSpritesPool(textures);
  this.createLookupTables();

  this.slices = [];

  this.viewportX = 0;
  this.viewportSliceX = 0;
}

function WallSlice(type, y) {
  this.type = type;
  this.y = y;
  this.sprite = null;
}

WallSlice.WIDTH = 64;

Walls.prototype = Object.create(PIXI.Container.prototype);

Walls.VIEWPORT_WIDTH = 512;
Walls.VIEWPORT_NUM_SLICES =
  Math.ceil(Walls.VIEWPORT_WIDTH / WallSlice.WIDTH) + 1;

Walls.prototype.setViewportX = function (viewportX) {
  this.viewportX = this.checkViewportXBounds(viewportX);

  var prevViewportSliceX = this.viewportSliceX;
  this.viewportSliceX = Math.floor(this.viewportX / WallSlice.WIDTH);

  this.removeOldSlices(prevViewportSliceX);
  this.addNewSlices();
};

Walls.prototype.removeOldSlices = function (prevViewportSliceX) {
  var numOldSlices = this.viewportSliceX - prevViewportSliceX;
  if (numOldSlices > Walls.VIEWPORT_NUM_SLICES) {
    numOldSlices = Walls.VIEWPORT_NUM_SLICES;
  }

  for (var i = prevViewportSliceX; i < prevViewportSliceX + numOldSlices; i++) {
    var slice = this.slices[i];
    if (slice.sprite != null) {
      this.returnWallSprite(slice.type, slice.sprite);
      this.removeChild(slice.sprite);
      slice.sprite = null;
    }
  }
};

Walls.prototype.addSlice = function (sliceType, y) {
  var slice = new WallSlice(sliceType, y);
  this.slices.push(slice);
};

Walls.prototype.checkViewportXBounds = function (viewportX) {
  var maxViewportX =
    (this.slices.length - Walls.VIEWPORT_NUM_SLICES) * WallSlice.WIDTH;
  if (viewportX < 0) {
    viewportX = 0;
  } else if (viewportX > maxViewportX) {
    viewportX = maxViewportX;
  }

  return viewportX;
};

Walls.prototype.addNewSlices = function () {
  let firstX = -(this.viewportX % WallSlice.WIDTH);
  // console.log(this.viewportSliceX , Walls.VIEWPORT_NUM_SLICES)
  for (
    let i = this.viewportSliceX, sliceIndex = 0;
    i < this.viewportSliceX + Walls.VIEWPORT_NUM_SLICES;
    i++, sliceIndex++
  ) {
    let slice = this.slices[i];
    if (slice.sprite == null && slice.type != SliceType.GAP) {
      // console.log('this.borrowWallSprite(slice.type)')
      slice.sprite = this.borrowWallSprite(slice.type);

      slice.sprite.x = firstX + sliceIndex * WallSlice.WIDTH;
      slice.sprite.y = slice.y;

      this.addChild(slice.sprite);
    } else if (slice.sprite != null) {
      slice.sprite.x = firstX + sliceIndex * WallSlice.WIDTH;
    }
  }
};

Walls.prototype.createLookupTables = function () {
  this.borrowWallSpriteLookup = [];
  this.borrowWallSpriteLookup[SliceType.FRONT] = this.pool.borrowFrontEdge;
  this.borrowWallSpriteLookup[SliceType.BACK] = this.pool.borrowBackEdge;
  this.borrowWallSpriteLookup[SliceType.STEP] = this.pool.borrowStep;
  this.borrowWallSpriteLookup[SliceType.DECORATION] =
    this.pool.borrowDecoration;
  this.borrowWallSpriteLookup[SliceType.WINDOW] = this.pool.borrowWindow;

  this.returnWallSpriteLookup = [];
  this.returnWallSpriteLookup[SliceType.FRONT] = this.pool.returnFrontEdge;
  this.returnWallSpriteLookup[SliceType.BACK] = this.pool.returnBackEdge;
  this.returnWallSpriteLookup[SliceType.STEP] = this.pool.returnStep;
  this.returnWallSpriteLookup[SliceType.DECORATION] =
    this.pool.returnDecoration;
  this.returnWallSpriteLookup[SliceType.WINDOW] = this.pool.returnWindow;
};

Walls.prototype.borrowWallSprite = function (sliceType) {
  return this.borrowWallSpriteLookup[sliceType].call(this.pool);
};

Walls.prototype.returnWallSprite = function (sliceType, sliceSprite) {
  return this.returnWallSpriteLookup[sliceType].call(this.pool, sliceSprite);
};

function WallSpritesPool(textures) {
  this.createWindows(textures);
  this.createDecorations(textures);
  this.createFrontEdges(textures);
  this.createBackEdges(textures);
  this.createSteps(textures);
}

WallSpritesPool.prototype.borrowWindow = function () {
  return this.windows.shift();
};

WallSpritesPool.prototype.returnWindow = function (sprite) {
  this.windows.push(sprite);
};

WallSpritesPool.prototype.borrowDecoration = function () {
  return this.decorations.shift();
};

WallSpritesPool.prototype.returnDecoration = function (sprite) {
  this.decorations.push(sprite);
};

WallSpritesPool.prototype.borrowFrontEdge = function () {
  return this.frontEdges.shift();
};

WallSpritesPool.prototype.returnFrontEdge = function (sprite) {
  this.frontEdges.push(sprite);
};

WallSpritesPool.prototype.borrowBackEdge = function () {
  return this.backEdges.shift();
};

WallSpritesPool.prototype.returnBackEdge = function (sprite) {
  this.backEdges.push(sprite);
};

WallSpritesPool.prototype.borrowStep = function () {
  return this.steps.shift();
};

WallSpritesPool.prototype.returnStep = function (sprite) {
  this.steps.push(sprite);
};

WallSpritesPool.prototype.createWindows = function (textures) {
  this.windows = [];

  this.addWindowSprites(6, textures.window_01);
  this.addWindowSprites(6, textures.window_02);

  this.shuffle(this.windows);
};

WallSpritesPool.prototype.createDecorations = function (textures) {
  this.decorations = [];

  this.addDecorationSprites(6, textures.decoration_01);
  this.addDecorationSprites(6, textures.decoration_02);
  this.addDecorationSprites(6, textures.decoration_03);

  this.shuffle(this.decorations);
};

WallSpritesPool.prototype.createFrontEdges = function (textures) {
  this.frontEdges = [];

  this.addFrontEdgeSprites(2, textures.edge_01);
  this.addFrontEdgeSprites(2, textures.edge_02);

  this.shuffle(this.frontEdges);
};

WallSpritesPool.prototype.createBackEdges = function (textures) {
  this.backEdges = [];

  this.addBackEdgeSprites(2, textures.edge_01);
  this.addBackEdgeSprites(2, textures.edge_02);

  this.shuffle(this.backEdges);
};

WallSpritesPool.prototype.createSteps = function (textures) {
  this.steps = [];
  this.addStepSprites(2, textures.step_01);
};

WallSpritesPool.prototype.addWindowSprites = function (amount, frameId) {
  for (var i = 0; i < amount; i++) {
    var sprite = PIXI.Sprite.from(frameId);
    this.windows.push(sprite);
  }
};

WallSpritesPool.prototype.addDecorationSprites = function (amount, frameId) {
  for (var i = 0; i < amount; i++) {
    var sprite = PIXI.Sprite.from(frameId);
    this.decorations.push(sprite);
  }
};

WallSpritesPool.prototype.addFrontEdgeSprites = function (amount, frameId) {
  for (var i = 0; i < amount; i++) {
    var sprite = PIXI.Sprite.from(frameId);
    this.frontEdges.push(sprite);
  }
};

WallSpritesPool.prototype.addBackEdgeSprites = function (amount, frameId) {
  for (var i = 0; i < amount; i++) {
    var sprite = PIXI.Sprite.from(frameId);
    sprite.anchor.x = 1;
    sprite.scale.x = -1;
    this.backEdges.push(sprite);
  }
};

WallSpritesPool.prototype.addStepSprites = function (amount, frameId) {
  for (var i = 0; i < amount; i++) {
    var sprite = PIXI.Sprite.from(frameId);
    sprite.anchor.y = 0.25;
    this.steps.push(sprite);
  }
};

WallSpritesPool.prototype.shuffle = function (array) {
  var len = array.length;
  var shuffles = len * 3;
  for (var i = 0; i < shuffles; i++) {
    var wallSlice = array.pop();
    var pos = Math.floor(Math.random() * (len - 1));
    array.splice(pos, 0, wallSlice);
  }
};

function MapBuilder(walls) {
  this.walls = walls;
  this.createMap();
}

MapBuilder.WALL_HEIGHTS = [
  256, // Lowest slice
  224,
  192,
  160,
  128, // Highest slice
];

MapBuilder.prototype.createMap = function () {
  this.createWallSpan(3, 9, true);
  this.createGap(1);
  this.createWallSpan(1, 30);
  this.createGap(1);
  this.createWallSpan(2, 18);
  this.createGap(1);
  this.createSteppedWallSpan(2, 5, 28);
  this.createGap(1);
  this.createWallSpan(1, 10);
  this.createGap(1);
  this.createWallSpan(2, 6);
  this.createGap(1);
  this.createWallSpan(1, 8);
  this.createGap(1);
  this.createWallSpan(2, 6);
  this.createGap(1);
  this.createWallSpan(1, 8);
  this.createGap(1);
  this.createWallSpan(2, 7);
  this.createGap(1);
  this.createWallSpan(1, 16);
  this.createGap(1);
  this.createWallSpan(2, 6);
  this.createGap(1);
  this.createWallSpan(1, 22);
  this.createGap(2);
  this.createWallSpan(2, 14);
  this.createGap(2);
  this.createWallSpan(3, 8);
  this.createGap(2);
  this.createSteppedWallSpan(3, 5, 12);
  this.createGap(3);
  this.createWallSpan(0, 8);
  this.createGap(3);
  this.createWallSpan(1, 50);
  this.createGap(20);
};

MapBuilder.prototype.createGap = function (spanLength) {
  for (var i = 0; i < spanLength; i++) {
    this.walls.addSlice(SliceType.GAP);
  }
};

MapBuilder.prototype.createWallSpan = function (
  heightIndex,
  spanLength,
  noFront,
  noBack
) {
  noFront = noFront || false;
  noBack = noBack || false;

  if (noFront == false && spanLength > 0) {
    this.addWallFront(heightIndex);
    spanLength--;
  }

  var midSpanLength = spanLength - (noBack ? 0 : 1);
  if (midSpanLength > 0) {
    this.addWallMid(heightIndex, midSpanLength);
    spanLength -= midSpanLength;
  }

  if (noBack == false && spanLength > 0) {
    this.addWallBack(heightIndex);
  }
};

MapBuilder.prototype.createSteppedWallSpan = function (
  heightIndex,
  spanALength,
  spanBLength
) {
  if (heightIndex < 2) {
    heightIndex = 2;
  }

  this.createWallSpan(heightIndex, spanALength, false, true);
  this.addWallStep(heightIndex - 2);
  this.createWallSpan(heightIndex - 2, spanBLength - 1, true, false);
};

MapBuilder.prototype.addWallFront = function (heightIndex) {
  var y = MapBuilder.WALL_HEIGHTS[heightIndex];
  this.walls.addSlice(SliceType.FRONT, y);
};

MapBuilder.prototype.addWallBack = function (heightIndex) {
  var y = MapBuilder.WALL_HEIGHTS[heightIndex];
  this.walls.addSlice(SliceType.BACK, y);
};

MapBuilder.prototype.addWallMid = function (heightIndex, spanLength) {
  var y = MapBuilder.WALL_HEIGHTS[heightIndex];
  for (var i = 0; i < spanLength; i++) {
    if (i % 2 == 0) {
      this.walls.addSlice(SliceType.WINDOW, y);
    } else {
      this.walls.addSlice(SliceType.DECORATION, y);
    }
  }
};

MapBuilder.prototype.addWallStep = function (heightIndex) {
  var y = MapBuilder.WALL_HEIGHTS[heightIndex];
  this.walls.addSlice(SliceType.STEP, y);
};

window.scrollerObject = null;
let MIN_SCROLL_SPEED = 1;
let MAX_SCROLL_SPEED = 15;
let SCROLL_ACCELERATION = 0.005;

let scrollSpeed = MIN_SCROLL_SPEED;

export default {
  data() {
    return {};
  },
  mounted() {
    this.gameInit();
  },
  methods: {
    gameInit() {
      app = new PIXI.Application({
        width: APP_WIDTH,
        height: APP_HEIGHT,
        antialias: true,
        backgroundAlpha: false,
        resolution: 1,
        backgroundColor: 0x222222,
      });
      document.getElementById("game-container").appendChild(app.view);

      // console.log(require("@/assets/wall.json"))
      app.loader
        .add({
          name: "wall",
          url: require("@/assets/wall.png"),
        })
        .load((loader, resources) => {
          // console.log(loader, resources);

          const wallSpriteSheet = new PIXI.Spritesheet(
            resources.wall.texture.baseTexture,
            wallJson
          );

          // console.log(wallSprite)
          wallSpriteSheet.parse((textures) => {
            scrollerObject = new Scroller(app.stage, textures);
            requestAnimationFrame(this.update);
          });
        });
    },
    update() {
      scrollerObject.moveViewportXBy(scrollSpeed);
      // scrollSpeed += SCROLL_ACCELERATION;
      // if (scrollSpeed > MAX_SCROLL_SPEED) {
      //   scrollSpeed = MAX_SCROLL_SPEED;
      // }
      requestAnimationFrame(this.update);
    },
  },
};
</script>