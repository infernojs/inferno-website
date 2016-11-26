let babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
};

babelHelpers.createClass = function () {
    function defineProperties(target, props) {
        for (let i = 0; i < props.length; i++) {
            let descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

babelHelpers;

let MONITOR_GRAPH_HEIGHT = 30;
let MONITOR_GRAPH_WIDTH = 100;
let container = null;
let initialized = false;
let frameTasks = [];
let rafId = -1;
/**
 * Initialize Performance Monitor
 */
function initPerfMonitor(options) {
    if (!initialized) {
        if (options.container) {
            container = options.container;
        }
        initialized = true;
    }
}
/**
 * Check that everything is properly initialized
 */
function checkInit() {
    if (!container) {
        container = document.createElement("div");
        container.style.cssText = "position: fixed;" + "opacity: 0.9;" + "right: 0;" + "bottom: 0";
        document.body.appendChild(container);
    }
    initialized = true;
}
/**
 * Schedule new task that will be executed on the next frame
 */
function scheduleTask(task) {
    frameTasks.push(task);
    if (rafId === -1) {
        requestAnimationFrame(function (t) {
            rafId = -1;
            let tasks = frameTasks;
            frameTasks = [];
            for (let i = 0; i < tasks.length; i++) {
                tasks[i]();
            }
        });
    }
}

let Result = function Result(min, max, mean, now) {
    babelHelpers.classCallCheck(this, Result);

    this.min = min;
    this.max = max;
    this.mean = mean;
    this.now = now;
};
/**
 * Data object contains all data samples
 */


let Data = function () {
    function Data() {
        babelHelpers.classCallCheck(this, Data);

        this.samples = [];
        this.maxSamples = MONITOR_GRAPH_WIDTH;
    }

    babelHelpers.createClass(Data, [{
        key: "addSample",
        value: function addSample(v) {
            if (this.samples.length === this.maxSamples) {
                this.samples.shift();
            }
            this.samples.push(v);
        }
    }, {
        key: "calc",
        value: function calc() {
            let min = this.samples[0];
            let max = this.samples[0];
            let sum = 0;
            for (let i = 0; i < this.samples.length; i++) {
                let k = this.samples[i];
                if (k < min) {
                    min = k;
                }
                if (k > max) {
                    max = k;
                }
                sum += k;
            }
            let now = this.samples[this.samples.length - 1];
            let mean = sum / this.samples.length;
            return new Result(min, max, mean, now);
        }
    }]);
    return Data;
}();

let MonitorWidget = function () {
    function MonitorWidget(name, unitName) {
        let _this = this;

        let flags = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
        babelHelpers.classCallCheck(this, MonitorWidget);

        this._syncView = function () {
            let result = _this.results[_this.results.length - 1];
            let scale = MONITOR_GRAPH_HEIGHT / (result.max * 1.2);
            let min = (_this.flags & 32 /* RoundValues */) === 0 ? result.min.toFixed(2) : "" + Math.round(result.min);
            let max = (_this.flags & 32 /* RoundValues */) === 0 ? result.max.toFixed(2) : "" + Math.round(result.max);
            let mean = (_this.flags & 32 /* RoundValues */) === 0 ? result.mean.toFixed(2) : "" + Math.round(result.mean);
            let now = (_this.flags & 32 /* RoundValues */) === 0 ? result.now.toFixed(2) : "" + Math.round(result.now);
            _this.text.innerHTML = "" + ((_this.flags & 1 /* HideMin */) === 0 ? "<div>min: &nbsp;" + min + _this.unitName + "</div>" : "") + ((_this.flags & 2 /* HideMax */) === 0 ? "<div>max: &nbsp;" + max + _this.unitName + "</div>" : "") + ((_this.flags & 4 /* HideMean */) === 0 ? "<div>mean: " + mean + _this.unitName + "</div>" : "") + ((_this.flags & 8 /* HideNow */) === 0 ? "<div>now: &nbsp;" + now + _this.unitName + "</div>" : "");
            if ((_this.flags & 16 /* HideGraph */) === 0) {
                _this.ctx.fillStyle = "#010";
                _this.ctx.fillRect(0, 0, MONITOR_GRAPH_WIDTH, MONITOR_GRAPH_HEIGHT);
                _this.ctx.fillStyle = "#0f0";
                for (let i = 0; i < _this.results.length; i++) {
                    _this.ctx.fillRect(i, MONITOR_GRAPH_HEIGHT, 1, -(_this.results[i].now * scale));
                }
            }
            _this._dirty = false;
        };
        this.name = name;
        this.unitName = unitName;
        this.flags = flags;
        this.results = [];
        this.element = document.createElement("div");
        this.element.style.cssText = "padding: 2px;" + "background-color: #020;" + "font-family: monospace;" + "font-size: 12px;" + "color: #0f0";
        this.label = document.createElement("div");
        this.label.style.cssText = "text-align: center";
        this.label.textContent = this.name;
        this.text = document.createElement("div");
        this.element.appendChild(this.label);
        this.element.appendChild(this.text);
        if ((flags & 16 /* HideGraph */) === 0) {
            this.canvas = document.createElement("canvas");
            this.canvas.style.cssText = "display: block; padding: 0; margin: 0";
            this.canvas.width = MONITOR_GRAPH_WIDTH;
            this.canvas.height = MONITOR_GRAPH_HEIGHT;
            this.ctx = this.canvas.getContext("2d");
            this.element.appendChild(this.canvas);
        } else {
            this.canvas = null;
            this.ctx = null;
        }
        this._dirty = false;
    }

    babelHelpers.createClass(MonitorWidget, [{
        key: "addResult",
        value: function addResult(result) {
            if (this.results.length === MONITOR_GRAPH_WIDTH) {
                this.results.shift();
            }
            this.results.push(result);
            this.invalidate();
        }
    }, {
        key: "invalidate",
        value: function invalidate() {
            if (!this._dirty) {
                this._dirty = true;
                scheduleTask(this._syncView);
            }
        }
    }]);
    return MonitorWidget;
}();
/**
 * Start FPS monitor
 */


function startFPSMonitor() {
    checkInit();
    let data = new Data();
    let w = new MonitorWidget("FPS", "", 2 /* HideMax */ | 1 /* HideMin */ | 4 /* HideMean */ | 32 /* RoundValues */);
    container.appendChild(w.element);
    let samples = [];
    let last = 0;
    function update(now) {
        let elapsed = (now - (last === 0 ? now : last)) / 1000;
        let fps = 1 / elapsed;
        if (fps !== Infinity) {
            if (samples.length === 64) {
                samples.shift();
            }
            samples.push(fps);
            let sum = 0;
            for (let i = 0; i < samples.length; i++) {
                sum += samples[i];
            }
            let mean = sum / samples.length;
            data.addSample(mean);
            w.addResult(data.calc());
        }
        last = now;
        requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}
/**
 * Start Memory Monitor
 */
function startMemMonitor() {
    checkInit();
    if (performance.memory !== void 0) {
        (function () {
            let update = function update() {
                data.addSample(Math.round(mem.usedJSHeapSize / (1024 * 1024)));
                w.addResult(data.calc());
                setTimeout(update, 30);
            };

            let data = new Data();
            let w = new MonitorWidget("Memory", "MB", 1 /* HideMin */ | 4 /* HideMean */);
            container.appendChild(w.element);
            let mem = performance.memory;

            update();
        })();
    }
}

let Profiler = function Profiler(name, unitName) {
    babelHelpers.classCallCheck(this, Profiler);

    this.data = new Data();
    this.widget = new MonitorWidget(name, unitName);
    this.startTime = 0;
};

let profilerInstances = {};
function startProfile(name) {
    let profiler = profilerInstances[name];
    if (profiler !== void 0) {
        profiler.startTime = performance.now();
    }
}
function endProfile(name) {
    let now = performance.now();
    let profiler = profilerInstances[name];
    if (profiler !== void 0) {
        profiler.data.addSample(now - profiler.startTime);
        profiler.widget.addResult(profiler.data.calc());
    }
}
/**
 * Initialize profiler and insert into container
 */
function initProfiler(name) {
    checkInit();
    let profiler = profilerInstances[name];
    if (profiler === void 0) {
        profilerInstances[name] = profiler = new Profiler(name, "ms");
        container.appendChild(profiler.widget.element);
    }
}

export default {
    initPerfMonitor,
    startFPSMonitor,
    startMemMonitor,
    startProfile,
    endProfile,
    initProfiler
}
