// ==UserScript==
// @name         Cool Math Games Filter
// @namespace    https://github.com/kelvcutler/
// @version      0.1
// @description  Block ads and limit sites to only approved games
// @author       Kelv Cutler
// @match        *coolmathgames.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=coolmathgames.com
// @grant        GM_download
// ==/UserScript==

(function() {


    document.querySelectorAll('.row.leaderboard').forEach(n => { n.style.display = 'none';})
    document.querySelectorAll('ul.menu').forEach(n => { n.style.display = 'none';})
    document.querySelectorAll('.main-aside').forEach(n => { n.style.display = 'none';})
    document.getElementById('block-coolmath-carouselingamedetailpage').style.display = 'none';
    document.getElementById('block-views-block-top-picks-games-block-1').style.display = 'none';
    document.getElementById('leaderboard-btf').style.display = 'none';
    document.getElementById('left-ad').style.display = 'none';
    var countDown = 32;
    var coverTheVid = null;
    const vidBlocker = setInterval(() => {
        if(!document.getElementById('videoplayer')) {
            if (!!coverTheVid) {
                coverTheVid.style.display = 'none';
                clearInterval(vidBlocker);
                return
            }
            console.log('video player not found', countDown);
            return;
        }
        const vidRect = document.getElementById('videoplayer').getBoundingClientRect();
        if (!coverTheVid) {
            console.log('video player cover created', countDown);
            coverTheVid = document.createElement('div');
            coverTheVid.style.cssText = 'position:absolute;z-index:100;background:#fff;color:black';
            document.body.appendChild(coverTheVid);
        }
        if (vidRect.width === 0 || countDown <= 0) {
                coverTheVid.style.display = 'none';
                clearInterval(vidBlocker);
                return;
        }
        coverTheVid.style.top = vidRect.top + 'px';
        coverTheVid.style.right = vidRect.right + 'px';
        coverTheVid.style.bottom = vidRect.bottom + 'px';
        coverTheVid.style.left = vidRect.left + 'px';
        coverTheVid.style.width = vidRect.width + 'px';
        coverTheVid.style.height = vidRect.height + 'px';
            console.log('video player updated', countDown);
        coverTheVid.innerText = "You may continue in "+countDown+" seconds...";
        countDown = countDown - 1;
    }, 1000);
    const approvedList = ['0-snake','0-green','0-code-panda','0-defly-io','0-minesweeper','0-batteries-inside','0-destroy-numbers',];
    const urlParts = window.location.href.split('.com/');
    if (urlParts.length < 2 || !approvedList.includes(urlParts[1])) {
        window.location.href = 'https://www.coolmathgames.com/0-snake';
    }
})();
