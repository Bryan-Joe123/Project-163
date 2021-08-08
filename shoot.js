AFRAME.registerComponent('shoot', {
    init: function () {
        window.addEventListener("keypress",(e)=>{
            if(e.key == "z"){
                bullet=document.createElement("a-entity")
                bullet.setAttribute("geometry", {
                    primitive: "sphere",
                    radius: 0.1,
                });
                bullet.setAttribute("material", "color", "black");
                

                var cam = document.getElementById("camera");

                bullet.setAttribute("rotation",cam.getAttribute("rotation"))

                pos = cam.getAttribute("position");

                bullet.setAttribute("position", {
                    x: pos.x,
                    y: pos.y,
                    z: pos.z,
                });

                var camera = document.querySelector("#camera").object3D;

                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction);

                bullet.setAttribute("velocity", direction.multiplyScalar(-10));

                var scene = document.querySelector("#scene");

                bullet.setAttribute("dynamic-body", {
                    shape: "sphere",
                    mass: "0",
                });

                //add the collide event listener to the bullet
                bullet.addEventListener("collide", this.removeBullet);

                scene.appendChild(bullet);
            }
        })
    },
    removeBullet:function(e){
        var element = e.detail.target.el;
        var elementHit = e.detail.body.el;
        var scene = document.querySelector("#scene");
        e.detail.body.el.classList.contains("wall");
        if(e.detail.body.el.classList.contains("wall")){
            var bulletHole = document.createElement("a-plane")
            bulletHole.setAttribute("position",element.getAttribute("position"))
            bulletHole.setAttribute("src", "data:image/png;base64,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")
            bulletHole.setAttribute("rotation", {
                x: elementHit.getAttribute("rotation").x,
                y: elementHit.getAttribute("rotation").y,
                z: elementHit.getAttribute("rotation").z,
            }
            )
            bulletHole.setAttribute("material", "color", "black");
            bulletHole.setAttribute("scale", { x: 0.5, y: 0.5, z: 0.5});
            console.log(Math.random() * 1000 + 200);
            element.removeEventListener("collide", this.removeBullet);

            scene.appendChild(bulletHole)
            scene.removeChild(element);
        }
    }

});
