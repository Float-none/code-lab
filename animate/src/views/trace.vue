<template>
  <div class="ki" id="ki"></div>
</template>

<script>
import * as PIXI from "pixi.js";
const { Application, Rectangle, Graphics } = PIXI;

let app = null;

const APP_WIDTH = 1200;
const APP_HEIGHT = 700;
const stageColor = 0xe2e2e3;

Array.prototype.sortOn = function (params) {
  this.sort(function (a, b) {
    return a[params] - b[params];
  });
  return this;
};

// 节点类
function Nodes(x, y) {
  return {
    x,
    y,
    f: 0,
    g: 0,
    h: 0,
    walkable: true,
    parent: null,
  };
}
// 对比两个节点相同
function isSameNode(nodeA, nodeB) {
  if (nodeA.x === nodeB.x && nodeA.y === nodeB.y) {
    return true;
  }
  return false;
}
// 网格类
function Grid(clos, rows) {
  // let _startNode = null;
  // let _endNode = null;
  const _nodes = [];
  let _numCols = clos || 0;
  let _numRows = rows || 0;
  // this._numCols = clos || 0;
  // this._numRows = rows || 0;
  // 执行网格
  for (let i = 0; i < _numCols; i++) {
    _nodes.push([]);
    for (let j = 0; j < _numRows; j++) {
      _nodes[i][j] = new Nodes(i, j);
    }
  }
  return {
    _numCols: clos || 0,
    _numRows: rows || 0,
    _startNode: null,
    _endNode: null,
    getNode(x, y) {
      return _nodes[x][y];
    },
    setStartNode(x, y) {
      this._startNode = _nodes[x][y];
    },
    setEndNode(x, y) {
      this._endNode = _nodes[x][y];
    },
    setWalkable(x, y, value) {
      _nodes[x][y] = value;
    },
    getStartNode() {
      return this._startNode;
    },
    getEndNode() {
      return this._endNode;
    },
    getNumCols() {
      return _numCols;
    },
    getAllNodes() {
      return _nodes;
    },
  };
}
// 寻路类
function AStar() {
  let _open = [];
  let _closed = [];
  let _grid = null;
  let _endNode = null;
  let _startNode = null;
  let _path = [];
  let _heuristic = diagonal;
  let _straightCost = 1;
  let _diagCost = Math.SQRT2;

  function findPath(Grid) {
    _grid = Grid;
    _startNode = _grid.getStartNode();
    _endNode = _grid.getEndNode();
    _startNode.g = 0;
    _startNode.h = _heuristic(_startNode);
    _startNode.f = _startNode.g + _startNode.h;

    return search();
  }

  function search() {
    let node = _startNode;
    while (!isSameNode(node, _endNode)) {
      let startX = Math.max(0, node.x - 1);
      let startY = Math.max(0, node.y - 1);

      let endX = Math.min(_grid._numCols - 1, node.x + 1);
      let endY = Math.min(_grid._numRows - 1, node.y + 1);

      // console.log(startX,startY,endX,endY)
      for (var i = startX; i <= endX; i++) {
        for (var j = startY; j <= endY; j++) {
          let test = _grid.getNode(i, j);
          if (isSameNode(test, node) || !test.walkable) continue;

          let cost = _straightCost;
          if (!(node.x == test.x || node.y == test.y)) {
            cost = _diagCost;
          }

          let g = node.g + cost;
          let h = _heuristic(test);
          let f = g + h;
          if (isOpen(test) || isClosed(test)) {
            if (test.f > f) {
              test.f = f;
              test.g = g;
              test.h = h;
              test.parent = node;
            }
          } else {
            test.f = f;
            test.g = g;
            test.h = h;
            test.parent = node;
            _open.push(test);
          }
        }
      }
      _closed.push(node);
      if (_open.length === 0) {
        console.log("no path found");
        return false;
      }
      // _open.sortOn("f", Array.NUMERIC);
      _open.sortOn("f");
      node = _open.shift();
      // console.log(node)
    }
    buildPath();
    return true;
  }
  function buildPath() {
    let node = _endNode;
    _path.push(node);
    // while (node != _startNode) {
    while (!isSameNode(_startNode, node)) {
      node = node.parent;
      _path.unshift(node);
    }
  }
  function getPath() {
    return _path;
  }
  function isOpen(node) {
    for (let i = 0; i < _open.length; i++) {
      if (isSameNode(_open[i], node)) {
        return true;
      }
    }
    return false;
  }
  function isClosed(node) {
    for (let i = 0; i < _closed.length; i++) {
      if (isSameNode(_closed[i], node)) {
        return true;
      }
    }
    return false;
  }
  // function manhattan(node) {
  //   return (
  //     Math.abs(node.x - _endNode.x) * _straightCost +
  //     Math.abs(node.y - _endNode.y) * _straightCost
  //   );
  // }
  // function eulidian(node) {
  //   let dx = node.x - _endNode.x;
  //   let dy = node.y - _endNode.y;
  //   return Math.sqrt(dx * dx + dy * dy) * _straightCost;
  // }
  function diagonal(node) {
    let dx = Math.abs(node.x - _endNode.x);
    let dy = Math.abs(node.y - _endNode.y);
    let diag = Math.min(dx, dy);
    let straight = dx + dy;
    return _diagCost * diag + _straightCost * (straight - 2 * diag);
  }
  function getVisited() {
    return _closed.concat(_open);
  }
  return {
    findPath,
    search,
    buildPath,
    getPath,
    isOpen,
    isClosed,
    getVisited,
  };
}

function GridView(Grid) {
  const line = new Graphics();
  const _cellSize = 20;
  let _grid = Grid;
  function drawGrid() {
    line.clear();
    for (let i = 0; i < _grid._numCols; i++) {
      for (let j = 0; j < _grid._numRows; j++) {
        let node = _grid.getNode(i, j);
        line.lineStyle(1);
        line.beginFill(getColor(node));
        line.drawRect(i * _cellSize, j * _cellSize, _cellSize, _cellSize);
      }
    }
  }

  function getColor(node) {
    if (!node.walkable) return 0x007dfb;
    if (isSameNode(node, _grid._startNode)) return 0x9ce9c5;
    if (isSameNode(node, _grid._endNode)) return 0x000000;
    return 0xffffff;
  }

  function findPath() {
    let astar = new AStar();
    const isOver = astar.findPath(_grid);
    console.log("findPath", isOver);
    if (isOver) {
      showVisited(astar);
      showPath(astar);
    }
  }

  function showVisited(astar) {
    let visited = astar.getVisited();
    for (let i = 0; i < visited.length; i++) {
      line.beginFill(0xcccccc);
      line.drawRect(
        visited[i].x * _cellSize,
        visited[i].y * _cellSize,
        _cellSize,
        _cellSize
      );
      line.endFill();
    }
  }

  function showPath(astar) {
    let path = astar.getPath();
    for (let i = 0; i < path.length; i++) {
      line.lineStyle(0);
      line.beginFill(0xff0000);
      line.drawCircle(
        path[i].x * _cellSize + _cellSize / 2,
        path[i].y * _cellSize + _cellSize / 2,
        _cellSize / 3
      );
    }
  }

  // function onGridClick(event) {
  line.on("click", function (event) {
    let xpos = Math.floor(event / _cellSize);
    let ypos = Math.floor(400 / _cellSize);
    _grid.setWalkable(xpos, ypos, !_grid.getNode(xpos, ypos).walkable);
  });
  drawGrid();
  // console.log("init grid", _grid);
  findPath();
  // }
  // line.on("click",function(e){
  //   console.log(e)
  // });
  return line;
}

function PathFinding() {
  let _grid = new Grid(50, 30);
  let _gridView = null;

  _grid.setStartNode(0, 2);
  _grid.setEndNode(48, 27);

  // console.log(_grid.getStartNode());

  _gridView = new GridView(_grid);
  _gridView.x = 50;
  _gridView.y = 0;
  return _gridView;
}

export default {
  data() {
    return {};
  },
  mounted() {
    app = new Application({
      width: APP_WIDTH,
      height: APP_HEIGHT,
      antialias: true,
      backgroundAlpha: true,
      resolution: 1,
      border: 1,
      backgroundColor: stageColor,
    });
    document.getElementById("ki").appendChild(app.view);

    let _grid = new Grid(50, 30);

    _grid.setStartNode(0, 2);
    _grid.setEndNode(48, 27);

    // console.log(_grid.getStartNode());

    let _gridView = new GridView(_grid);
    _gridView.x = 50;
    _gridView.y = 0;

    app.stage.addChild(_gridView);

    app.stage.on("click", function (event) {
      console.log(event)
      // let xpos = Math.floor(event / _cellSize);
      // let ypos = Math.floor(400 / _cellSize);
      // _grid.setWalkable(xpos, ypos, !_grid.getNode(xpos, ypos).walkable);
    });

    app.ticker.add(function (delta) {
      // 正常移动
    });
  },
};
</script>