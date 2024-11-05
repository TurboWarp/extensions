// Name: FPS returne
// ID: fpsbasedreturn
// Description: allows you to create games that run at the same speed, even if the FPS changes.
// By: Eaielectronic
// By: SERPENT1867 <https://scratch.mit.edu/users/serpent1867/>
// License: MPL-2.0
(function (Scratch) {
   "use strict";
class FPSBasedReturn {
    constructor() {
        this.previousTime = null;  // Pour stocker l'heure de la dernière frame
        this.fpsValue = 30;        // Initialiser avec une valeur par défaut (30 FPS)
    }

    getInfo() {
        return {
            id: 'fpsbasedreturn',
            name: 'FPS Based Return',
            blocks: [
                {
                    opcode: 'getFPSMultiplier',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'FPS multiplier (based on [REFERENCE] FPS',
                    arguments: {
                        REFERENCE: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 30
                        }
                    }
                },
                {
                    opcode: 'getCurrentFPS',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'current FPS'
                }
            ]
        };
    }

    // Méthode pour obtenir le delta time et calculer une fois les FPS
    calculateFPS() {
        const currentTime = performance.now();

        if (this.previousTime === null) {
            this.previousTime = currentTime;
            return;  // Attendre jusqu'à la prochaine frame pour calculer le delta time
        }

        let deltaTime = (currentTime - this.previousTime) / 1000; // Convertir en secondes
        this.previousTime = currentTime;

        if (deltaTime > 1/30) {
            deltaTime = 1/30;  // Limiter à 30 FPS max pour éviter des pics
        }

        this.fpsValue = 1 / deltaTime;  // Calculer les FPS actuels
    }

    // Méthode pour retourner le FPS actuel
    getCurrentFPS() {
        this.calculateFPS();  // Mettre à jour le FPS
        return this.fpsValue;  // Retourner la valeur des FPS actuels
    }

    // Méthode pour calculer le multiplicateur en fonction des FPS
    getFPSMultiplier(args) {
        const referenceFPS = args.REFERENCE;  // FPS de référence choisi par l'utilisateur
        const fps = this.getCurrentFPS();     // Obtenir les FPS actuels

        const multiplier = referenceFPS / fps;  // Le rapport par rapport au FPS de référence
        return multiplier;
    }
}

// Enregistrer l'extension dans TurboWarp
Scratch.extensions.register(new FPSBasedReturn());
    })(Scratch);
