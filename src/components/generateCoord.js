/* given the length of a cube, generate all of the cooridnate sets and assign to coords */

export const generateCoord = (p, boxSize) => {
    let colorArr = ["#edf2fb","#e2eafc","#d7e3fc","#ccdbfd","#c1d3fe","#b6ccfe","#abc4ff"]

    // let colorArr = ["#ffbe0b","#fb5607","#ff006e","#8338ec","#3a86ff"]
    // let colorArr = ["#335c67", "#fff3b0", "#e09f3e", "#9e2a2b", "#540b0e"]
    // let colorArr = ["#590d22","#800f2f","#a4133c","#c9184a","#ff4d6d","#ff758f","#ff8fa3","#ffb3c1","#ffccd5","#fff0f3"]
    // let colorArr = ["#f8f9fa","#e9ecef","#dee2e6","#ced4da","#adb5bd","#6c757d","#495057","#343a40","#212529"]

    let coords = []
    let x = -boxSize/2, y = 0, z = -boxSize/2;
    let xEnd = boxSize/2, yEnd = boxSize, zEnd = boxSize/2;
    while(x < xEnd) {
        let xNext = p.min(x + p.random(boxSize * 0.15), xEnd)
        while(z < zEnd) {
            let zNext = p.min(z + p.random(boxSize * 0.15), zEnd)
            while(y < yEnd) {
                let yNext = p.min(y + p.random(boxSize * 0.15), yEnd)
                let center = p.createVector((x + xNext) / 2,(y + yNext) / 2,(z + zNext) / 2)
                let nudgeDistVec = center.mult(1.5).limit(30)
                let nudgedCoord = center.add(nudgeDistVec)
                let xyz = p.createVector(x, y, z)
                let dxyz = p.createVector(xNext, y, z)
                let dxydz = p.createVector(xNext, y, zNext)
                let xydz = p.createVector(x, y, zNext)
                let xdyz = p.createVector(x, yNext, z)
                let dxdyz = p.createVector(xNext, yNext, z)
                let dxdydz = p.createVector(xNext, yNext, zNext)
                let xdydz = p.createVector(x, yNext, zNext)
                let coordArr = [xyz, dxyz, dxydz, xydz, xdyz, dxdyz, dxdydz, xdydz, center]
                let shuffled4 = p.shuffle(coordArr, true)
                let l = xNext - x;
                let w = zNext - z;
                let h = yNext - y;
                let vecDist = center.dist(xyz)
                let ran = p.random()
                let displacement = p.random(vecDist * 3)
                const miniBox = {
                    center,
                    nudgedCoord,
                    xyz,
                    dxyz,
                    dxydz,
                    xydz,
                    xdyz,
                    dxdyz,
                    dxdydz,
                    xdydz,
                    shuffled4,
                    cols: p.random(colorArr),
                    dim: [l,h,w],
                    shouldFill: p.random([true, false]),
                    displacement,
                    ran
                }
                coords.push(miniBox)
                y = yNext
            }
            y = 0
            z = zNext
        }
        z = -boxSize/2;
        x = xNext
    }
    return coords
}