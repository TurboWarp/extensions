// Name: Raycasting
// ID: raycast
// Description: Throw invisible rays and report information about the sprites it collided with. 
// By: GatocDev https://scratch.mit.edu/users/Gatoc_Dev/
// Original: GatocDev
// License: MPL-2.0

(function(Scratch) {
    'use strict';

    class RaycastExtension {
        constructor() {
            this.rayData = [];
            this.maxRays = 360;
            this.disabledSprites = new Set();
        }

        getInfo() {
            return {
                id: 'raycast',
                name: 'Raycast',
                color1: '#FF6B35',
                color2: '#F7931E',
                color3: '#FFD23F',
                blocks: [
                    {
                        opcode: 'castRay',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'cast ray from X [X] Y [Y] direction [DIRECTION] distance [DISTANCE]',
                        arguments: {
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            DIRECTION: {
                                type: Scratch.ArgumentType.ANGLE,
                                defaultValue: 90
                            },
                            DISTANCE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 200
                            }
                        }
                    },

                    {
                        opcode: 'castMultipleRays',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'cast [COUNT] rays from X [X] Y [Y] spread [SPREAD] degrees distance [DISTANCE]',
                        arguments: {
                            COUNT: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 8
                            },
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            Y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            SPREAD: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 360
                            },
                            DISTANCE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 200
                            }
                        }
                    },

                    '---',
                    {
                        opcode: 'getHitSpriteX',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'hit sprite X at ray [INDEX]',
                        arguments: {
                            INDEX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        }
                    },
                    {
                        opcode: 'getHitSpriteY',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'hit sprite Y at ray [INDEX]',
                        arguments: {
                            INDEX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        }
                    },
                    {
                        opcode: 'getHitSpriteSize',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'hit sprite size at ray [INDEX]',
                        arguments: {
                            INDEX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        }
                    },
                    {
                        opcode: 'getHitSpriteName',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'hit sprite name at ray [INDEX]',
                        arguments: {
                            INDEX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        }
                    },
                    {
                        opcode: 'getAllHitSprites',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'all hit sprites at ray [INDEX]',
                        arguments: {
                            INDEX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        }
                    },
                    {
                        opcode: 'getHitDistance',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'hit distance at ray [INDEX]',
                        arguments: {
                            INDEX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'getRayCount',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'number of active rays'
                    },
                    {
                        opcode: 'rayHitSprite',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'ray [INDEX] hit a sprite?',
                        arguments: {
                            INDEX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        }
                    },
                    {
                        opcode: 'getRayX',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'ray [INDEX] end X',
                        arguments: {
                            INDEX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        }
                    },
                    {
                        opcode: 'getRayY',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'ray [INDEX] end Y',
                        arguments: {
                            INDEX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'disableThisSprite',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'disable this sprite from ray detection'
                    },
                    {
                        opcode: 'enableThisSprite',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'enable this sprite for ray detection'
                    },
                    {
                        opcode: 'clearRays',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'clear all rays'
                    }
                ]
            };
        }

        castRay(args, util) {
            const startX = Scratch.Cast.toNumber(args.X);
            const startY = Scratch.Cast.toNumber(args.Y);
            const direction = Scratch.Cast.toNumber(args.DIRECTION);
            const maxDistance = Scratch.Cast.toNumber(args.DISTANCE);

            const rayResult = this.performRaycast(startX, startY, direction, maxDistance, util);
            
            this.rayData = [rayResult];
            
            if (rayResult.hitSprites && rayResult.hitSprites.length > 0) {
                return JSON.stringify(rayResult.hitSprites);
            } else {
                return JSON.stringify([]);
            }
        }

        castMultipleRays(args, util) {
            const count = Math.min(Math.max(1, Scratch.Cast.toNumber(args.COUNT)), this.maxRays);
            const startX = Scratch.Cast.toNumber(args.X);
            const startY = Scratch.Cast.toNumber(args.Y);
            const spread = Scratch.Cast.toNumber(args.SPREAD);
            const maxDistance = Scratch.Cast.toNumber(args.DISTANCE);

            this.rayData = [];

            const angleStep = count > 1 ? spread / (count - 1) : 0;
            const startAngle = -spread / 2;

            for (let i = 0; i < count; i++) {
                const direction = startAngle + (angleStep * i);
                const rayResult = this.performRaycast(startX, startY, direction, maxDistance, util);
                this.rayData.push(rayResult);
            }
        }

        performRaycast(startX, startY, direction, maxDistance, util) {
            const runtime = util.runtime;
            
            const angleRad = ((direction - 90) * Math.PI) / 180;
            const deltaX = Math.cos(angleRad);
            const deltaY = Math.sin(angleRad);

            let hitSprites = [];
            let closestHit = null;
            let closestDistance = maxDistance;

            const allSprites = runtime.targets.filter(target => {
                return !target.isStage && 
                       target !== util.target && 
                       target.visible &&
                       !this.disabledSprites.has(target.getName());
            });

            // Collect all hits along the ray path
            for (const target of allSprites) {
                const hitResult = this.checkRayTargetIntersection(
                    startX, startY, deltaX, deltaY, maxDistance, target
                );

                if (hitResult) {
                    hitSprites.push({
                        name: target.getName(),
                        distance: hitResult.distance,
                        hitX: hitResult.hitX,
                        hitY: hitResult.hitY,
                        spriteX: target.x,
                        spriteY: target.y,
                        spriteSize: target.size
                    });

                    // Still track closest hit for compatibility
                    if (hitResult.distance < closestDistance) {
                        closestDistance = hitResult.distance;
                        closestHit = {
                            hit: true,
                            spriteName: target.getName(),
                            spriteX: target.x,
                            spriteY: target.y,
                            spriteSize: target.size,
                            hitX: hitResult.hitX,
                            hitY: hitResult.hitY,
                            distance: hitResult.distance
                        };
                    }
                }
            }

            // Sort hits by distance (closest first)
            hitSprites.sort((a, b) => a.distance - b.distance);

            if (closestHit) {
                return {
                    ...closestHit,
                    hitSprites: hitSprites.map(hit => hit.name)
                };
            } else {
                return {
                    hit: false,
                    spriteName: '',
                    spriteX: 0,
                    spriteY: 0,
                    spriteSize: 0,
                    hitX: startX + deltaX * maxDistance,
                    hitY: startY + deltaY * maxDistance,
                    distance: maxDistance,
                    hitSprites: []
                };
            }
        }

        checkRayTargetIntersection(startX, startY, deltaX, deltaY, maxDistance, target) {
            const spriteX = target.x;
            const spriteY = target.y;
            const spriteSize = target.size / 100;

            // Get sprite dimensions
            let bounds = null;
            try {
                if (target.getBounds) {
                    bounds = target.getBounds();
                } else if (target.drawable && target.drawable.getBounds) {
                    bounds = target.drawable.getBounds();
                }
            } catch (e) {
                // Bounds not available
            }

            let width, height;
            if (bounds && bounds.width && bounds.height) {
                width = bounds.width;
                height = bounds.height;
            } else {
                const costume = target.getCostume();
                if (costume && costume.size) {
                    width = costume.size[0] * spriteSize;
                    height = costume.size[1] * spriteSize;
                } else {
                    width = 60 * spriteSize;
                    height = 60 * spriteSize;
                }
            }

            width = Math.max(width, 1);
            height = Math.max(height, 1);

            // Calculate sprite bounds
            const left = spriteX - (width / 2);
            const right = spriteX + (width / 2);
            const bottom = spriteY - (height / 2);
            const top = spriteY + (height / 2);

            // Simple step-by-step ray marching to avoid teleporting
            const stepSize = 1; // Small step size for accuracy
            const steps = Math.ceil(maxDistance / stepSize);
            
            for (let i = 1; i <= steps; i++) {
                const distance = i * stepSize;
                if (distance > maxDistance) break;
                
                const checkX = startX + deltaX * distance;
                const checkY = startY + deltaY * distance;
                
                // Check if this point is inside the sprite bounds
                if (checkX >= left && checkX <= right && 
                    checkY >= bottom && checkY <= top) {
                    return {
                        hitX: checkX,
                        hitY: checkY,
                        distance: distance
                    };
                }
            }
            
            return null;
        }

        getHitSpriteX(args) {
            const index = Math.floor(Scratch.Cast.toNumber(args.INDEX)) - 1;
            if (index >= 0 && index < this.rayData.length && this.rayData[index].hit) {
                return this.rayData[index].spriteX;
            }
            return 0;
        }

        getHitSpriteY(args) {
            const index = Math.floor(Scratch.Cast.toNumber(args.INDEX)) - 1;
            if (index >= 0 && index < this.rayData.length && this.rayData[index].hit) {
                return this.rayData[index].spriteY;
            }
            return 0;
        }

        getHitSpriteSize(args) {
            const index = Math.floor(Scratch.Cast.toNumber(args.INDEX)) - 1;
            if (index >= 0 && index < this.rayData.length && this.rayData[index].hit) {
                return this.rayData[index].spriteSize;
            }
            return 0;
        }

        getHitSpriteName(args) {
            const index = Math.floor(Scratch.Cast.toNumber(args.INDEX)) - 1;
            if (index >= 0 && index < this.rayData.length && this.rayData[index].hit) {
                return this.rayData[index].spriteName;
            }
            return '';
        }

        getAllHitSprites(args) {
            const index = Math.floor(Scratch.Cast.toNumber(args.INDEX)) - 1;
            if (index >= 0 && index < this.rayData.length && this.rayData[index].hitSprites) {
                return JSON.stringify(this.rayData[index].hitSprites);
            }
            return JSON.stringify([]);
        }

        getHitDistance(args) {
            const index = Math.floor(Scratch.Cast.toNumber(args.INDEX)) - 1;
            if (index >= 0 && index < this.rayData.length) {
                return this.rayData[index].distance;
            }
            return 0;
        }

        getRayCount() {
            return this.rayData.length;
        }

        rayHitSprite(args) {
            const index = Math.floor(Scratch.Cast.toNumber(args.INDEX)) - 1;
            if (index >= 0 && index < this.rayData.length) {
                return this.rayData[index].hit;
            }
            return false;
        }

        getRayX(args) {
            const index = Math.floor(Scratch.Cast.toNumber(args.INDEX)) - 1;
            if (index >= 0 && index < this.rayData.length) {
                return this.rayData[index].hitX;
            }
            return 0;
        }

        getRayY(args) {
            const index = Math.floor(Scratch.Cast.toNumber(args.INDEX)) - 1;
            if (index >= 0 && index < this.rayData.length) {
                return this.rayData[index].hitY;
            }
            return 0;
        }

        disableThisSprite(args, util) {
            const spriteName = util.target.getName();
            this.disabledSprites.add(spriteName);
        }

        enableThisSprite(args, util) {
            const spriteName = util.target.getName();
            this.disabledSprites.delete(spriteName);
        }

        clearRays() {
            this.rayData = [];
        }
    }

    Scratch.extensions.register(new RaycastExtension());
})(Scratch);
