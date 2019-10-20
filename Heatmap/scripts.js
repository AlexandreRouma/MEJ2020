const ctx = document.getElementById('viewport').getContext('2d');

let lives = 0;
let dies = 0;

//setInterval(run, 1);

run();

// drawHeatmap(10, 10, 256, 256, genTestHeatmap(256, 256), 1, [
//     {r: 0, g: 0, b: 64},
//     {r: 64, g: 128, b: 256},
//     {r: 256, g: 256, b: 0},
//     {r: 256, g: 0, b: 0},
// ]);

function run() {
    ctx.fillStyle = '#171e24'; 
    ctx.fillRect(0, 0, 800, 800);

    let result = runTest(750, 750, 10000000);

    drawHeatmap(10, 10, 750, 750, result.map, result.max, [
        {r: 0, g: 0, b: 64},
        {r: 64, g: 128, b: 256},
        {r: 256, g: 256, b: 0},
        {r: 256, g: 0, b: 0},
    ]);

}

function runTest(w, h, n) {
    let hm = genEmptyHeatmap(w, h);
    let max = 0;
    let zeroCount = 0;
    for (let i = 0; i < n; i++) {
        let path = [
            {alpha: eval('Math.random() * Math.PI'), l: 200},
            {alpha: eval('Math.random() * Math.PI * 2'), l: 100},
        ];
        let pos = getFinalPos(w / 2, h / 2, path);
        pos.x = Math.round(pos.x);
        pos.y = Math.round(pos.y);
        if (pos.x < w && pos.y < h && pos.x >= 0 && pos.y >= 0) {
            if (pos.x == w/2 && pos.y == h/2) {
                zeroCount++;
            }
            hm[pos.y][pos.x]++;
            if (hm[pos.y][pos.x] > max) {
                max = hm[pos.y][pos.x];
            }
        }
    }
    console.log(zeroCount)
    return {
        map: hm,
        max: max
    };
}

function genEmptyHeatmap(w, h) {
    let hm = new Array(h);
    for (let y = 0; y < h; y++) {
        hm[y] = new Array(w);
        for (let x = 0; x < w; x++) {
            hm[y][x] = 0;
        }
    }
    return hm;
}

function genTestHeatmap(w, h) {
    let hm = new Array(h);
    for (let y = 0; y < h; y++) {
        hm[y] = new Array(w);
        for (let x = 0; x < w; x++) {
            hm[y][x] = x / w;
        }
    }
    return hm;
}

function drawHeatmap(x, y, w, h, data, max, gradient) {
    ctx.strokeStyle = '#d2dae2';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.rect(x, y, w + 6, h + 6)
    ctx.stroke();

    ctx.lineWidth = 1;
    for (let dy = 0; dy < h; dy++) {
        for (let dx = 0; dx < w; dx++) {
            let color = valueToColor(data[dy][dx], max, gradient)
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.rect(x + dx + 3, y + dy + 3, 1, 1);
            ctx.stroke();
        }
    }

    for (let i = 0; i < h - 1; i++) {
        ctx.strokeStyle = valueToColor(i, h - 1, gradient);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.rect(x + w + 16, y + i + 3, 10, 1);
        ctx.stroke();
    }

}

function valueToColor(val, max, spec) {
    val = Math.min(val, max);
    let norm = (val / max) * (spec.length - 1);
    let up = Math.ceil(norm);
    let down = Math.floor(norm);
    let weightUp = norm - down;
    let weightDown = up - norm;
    if (weightDown == 0 && weightUp == 0) {
        weightDown = 1;
    }
    return `rgb(${(spec[up].r * weightUp) + (spec[down].r * weightDown)}, ${(spec[up].g * weightUp) + (spec[down].g * weightDown)}, ${(spec[up].b * weightUp) + (spec[down].b * weightDown)})`;
}


function getFinalPosTest(sx, sy, paths) {
    return {x: (Math.random() - 0.5) * 50 + sx, y: (Math.random() - 0.5) * 50 + sy};
}

function getFinalPos(sx, sy, paths) {
    let x = sx;
    let y = sy;
    for (let i = 0; i < paths.length; i++) {
        // Add movement
        x += Math.cos(-paths[i].alpha) * paths[i].l;
        y += Math.sin(-paths[i].alpha) * paths[i].l;
    }
    return {x: x, y: y};
}