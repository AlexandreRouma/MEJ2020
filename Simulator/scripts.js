const ctx = document.getElementById('viewport').getContext('2d');

let lives = 0;
let dies = 0;

setInterval(run, 1);

function run() {
    let path = [
        {alpha: eval('Math.random() * Math.PI'), l: 50},
        {alpha: eval('Math.random() * Math.PI * 2'), l: 50},
        {alpha: eval('Math.random() * Math.PI * 2'), l: 50},
        {alpha: eval('Math.random() * Math.PI * 2'), l: 50},
    ];

    ctx.fillStyle = '#171e24'; 
    ctx.fillRect(0, 0, 800, 800);

    ctx.strokeStyle = '#d2dae2';
    ctx.lineWidth = 4;
    ctx.beginPath();
    
    ctx.moveTo(0,400);
    ctx.lineTo(800,400);
    ctx.stroke();

    if (getFinalPos(0, 400, path).y >= 400) {
        ctx.strokeStyle = '#0be881';
        lives++;
    }
    else {
        ctx.strokeStyle = '#ff3f34';
        dies++;
    }

    ctx.fillStyle = '#808e9b';    
    drawPath(400, 400, 400, path, true, ctx);

    ctx.fillText(`lives: ${lives}, dies: ${dies}, runs: ${lives + dies}, D/L: ${lives / (lives + dies)}`, 50, 50)
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

function drawPath(miny, sx, sy, paths, drawPivots, ctx) {
    let x = sx;
    let y = sy;
    let lx = x;
    let ly = y;
    for (let i = 0; i < paths.length; i++) {
        // Calculate end position
        x += Math.cos(-paths[i].alpha) * paths[i].l;
        y += Math.sin(-paths[i].alpha) * paths[i].l;

        // Draw path
        ctx.lineWidth = 2;

        ctx.beginPath(); 
        ctx.moveTo(lx,ly);
        ctx.lineTo(x,y);
        ctx.stroke();

        if (drawPivots) {
            ctx.beginPath(); 
            ctx.arc(lx, ly, 5, 0, 2 * Math.PI, false);
            ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
            ctx.fill();
        }

        // Save last pos
        lx = x;
        ly = y;
    }
}