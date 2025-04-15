const NUM_ROWS = 8;
const NUM_COLS = 8; 

/*
    The shortest path from pos1 to pos2. 
    Position is passed in as [x, y]
*/
function knightMoves(pos1, pos2) {

    //checking position is in bounds 
    const visited = new Set(); 
    const pathMap = new Map(); 
    let pathCounter = 0; 
    const directions = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];

    const queue = [];
    queue.push(pos1);
    visited.add([0,0].toString());  

    while (queue.length !== 0) {
        pathCounter++; 
   
        const queueLength = queue.length;  
        for (let i = 0; i < queueLength; i++) {
            const [currX, currY] = queue.shift();

            for (const [shiftX, shiftY] of directions) {

                const newX = currX + shiftX;  
                const newY = currY + shiftY; 
                const currPos = [currX, currY];
                const newPos = [newX, newY];                 

                if (newX >= 0 && newX < NUM_COLS && newY >= 0 && newY < NUM_ROWS && !visited.has(newPos.toString())) {
                    
                    visited.add(newPos.toString()); 
                    queue.push(newPos);
                    pathMap.set(newPos.toString(), currPos.toString());

                    if (newPos.toString() === pos2.toString()) {
                        const path = reconstruction(pos1.toString(), pos2.toString(), pathMap); 
                        return {pathCounter, path}; 
                    }
                }
            }
        }
        if (pathCounter >= 100) {
            throw new Error("Too large of an input.");
        }
    }
}

function reconstruction(firstPos, lastPos, map) {

    let currPos = lastPos; 
    let path = [lastPos]; 
    let iter = 0; 

    while (currPos !== firstPos) {

        const node = map.get(currPos);
        path.push(node); 
        currPos = node; 

        iter++;
        if(iter > 10) {
            throw new Error("Path not found.");
        }
    } 

    return path.reverse(); 
} 

function runAlgo(pos1, pos2) {
    const info = knightMoves(pos1, pos2); 
    
    let path = ``;
    for (let i = 0; i < info.path.length-1; i++) {
        path += `${info.path[i]} => `;
    }

    path += `${info.path[info.path.length-1]}`;

    const stringRepr = `Your knight moved ${info.pathCounter} time${info.pathCounter === 1 ? '':'s'} along the path
    ${path}!`; 

    return stringRepr;
}

console.log(runAlgo([0,0], [7, 7])); 