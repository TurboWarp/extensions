// Name: Finger ios/android
// ID: multiTouchDetection
// Description: Detect multiple fingers on mobile devices. Unlike sensing+ works on all mobile devices.
// By: SERPENT1867 <https://scratch.mit.edu/users/serpent1867/+
// License: MPL-2.0
(function (Scratch) {
    'use strict';

    class MultiTouchDetection {
        constructor() {
            // Stocke les coordonnées des touches (jusqu'à 10 doigts)
            this.touches = Array(10).fill({ x: 0, y: 0 });

            // Écoute les événements tactiles
            this.setupTouchListeners();
        }

        getInfo() {
            return {
                id: 'multiTouchDetection',
                name: 'Multi-Touch Detection',
                blocks: [
                    {
                        opcode: 'isTouchingFinger',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is touching finger?',
                        filter: [Scratch.TargetType.SPRITE],
                    },
                    {
                        opcode: 'getTouchX',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'touch [INDEX] X position',
                        arguments: {
                            INDEX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                        },
                        filter: [Scratch.TargetType.SPRITE],
                    },
                    {
                        opcode: 'getTouchY',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'touch [INDEX] Y position',
                        arguments: {
                            INDEX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                        },
                        filter: [Scratch.TargetType.SPRITE],
                    },
                    // Nouveau bloc pour la position X d'un doigt touchant un sprite
                    {
                        opcode: 'getTouchXOnSprite',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'touch X position on sprite?',
                        filter: [Scratch.TargetType.SPRITE],
                    },
                    // Nouveau bloc pour la position Y d'un doigt touchant un sprite
                    {
                        opcode: 'getTouchYOnSprite',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'touch Y position on sprite?',
                        filter: [Scratch.TargetType.SPRITE],
                    }
                ]
            };
        }

        // Détection si un doigt touche le sprite
        isTouchingFinger(args, util) {
            const spriteBounds = util.target.getBounds();

            // Vérifie si au moins un doigt touche le sprite
            for (let i = 0; i < this.touches.length; i++) {
                const touch = this.touches[i];
                if (spriteBounds.left <= touch.x && touch.x <= spriteBounds.right &&
                    spriteBounds.bottom <= touch.y && touch.y <= spriteBounds.top) {
                    return true;
                }
            }
            return false;
        }

        // Fonction qui configure les écouteurs d'événements tactiles
        setupTouchListeners() {
            const convertToScratchCoords = (touch) => {
                const canvas = Scratch.renderer.canvas; // Récupère le canvas de Scratch
                const rect = canvas.getBoundingClientRect(); // Récupère la position du canvas
                const scratchX = ((touch.clientX - rect.left) / rect.width) * 480 - 240;
                const scratchY = 180 - ((touch.clientY - rect.top) / rect.height) * 360;
                return { x: scratchX, y: scratchY };
            };

            const touchHandler = (event) => {
                // Met à jour les coordonnées des doigts dans le tableau
                for (let i = 0; i < event.touches.length && i < 10; i++) {
                    const touch = event.touches[i];
                    const { x, y } = convertToScratchCoords(touch);
                    this.touches[i] = { x, y };
                }

                // Réinitialise les positions restantes si moins de doigts
                for (let i = event.touches.length; i < 10; i++) {
                    this.touches[i] = { x: 0, y: 0 };
                }
            };

            window.addEventListener('touchstart', touchHandler);
            window.addEventListener('touchmove', touchHandler);
            window.addEventListener('touchend', touchHandler);
        }

        // Obtenir la position X du toucher d'un doigt donné
        getTouchX(args) {
            const index = Math.max(0, Math.min(9, args.INDEX - 1)); // Limite à 10 doigts
            return this.touches[index].x;
        }

        // Obtenir la position Y du toucher d'un doigt donné
        getTouchY(args) {
            const index = Math.max(0, Math.min(9, args.INDEX - 1)); // Limite à 10 doigts
            return this.touches[index].y;
        }

        // Nouveau: Obtenir la position X d'un doigt touchant un sprite
        getTouchXOnSprite(args, util) {
            const spriteBounds = util.target.getBounds();

            // Cherche le premier doigt touchant le sprite et renvoie sa position X
            for (let i = 0; i < this.touches.length; i++) {
                const touch = this.touches[i];
                if (spriteBounds.left <= touch.x && touch.x <= spriteBounds.right &&
                    spriteBounds.bottom <= touch.y && touch.y <= spriteBounds.top) {
                    return touch.x;
                }
            }
            return 0; // Retourne 0 si aucun doigt ne touche le sprite
        }

        // Nouveau: Obtenir la position Y d'un doigt touchant un sprite
        getTouchYOnSprite(args, util) {
            const spriteBounds = util.target.getBounds();

            // Cherche le premier doigt touchant le sprite et renvoie sa position Y
            for (let i = 0; i < this.touches.length; i++) {
                const touch = this.touches[i];
                if (spriteBounds.left <= touch.x && touch.x <= spriteBounds.right &&
                    spriteBounds.bottom <= touch.y && touch.y <= spriteBounds.top) {
                    return touch.y;
                }
            }
            return 0; // Retourne 0 si aucun doigt ne touche le sprite
        }
    }

    Scratch.extensions.register(new MultiTouchDetection());
})(Scratch);
