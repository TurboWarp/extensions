(function() {
    class SoundWaveDecay {
        getInfo() {
            return {
                id: 'soundwavedecay',
                name: 'Sine sound wave',
                color1: '#417505',
                color2: '#ffffff',
                blocks: [
                    {
                        opcode: 'followSineWave',
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            Amplitude: { type: Scratch.ArgumentType.NUMBER },
                            Frequency: { type: Scratch.ArgumentType.NUMBER },
                            Speed: { type: Scratch.ArgumentType.NUMBER },
                            DecayMultiplier: { type: Scratch.ArgumentType.NUMBER },
                            StartX: { type: Scratch.ArgumentType.NUMBER },
                            StartY: { type: Scratch.ArgumentType.NUMBER }
                        },
                        text: 'Follow sine wave: Amp: [Amplitude] Freq: [Frequency] Speed: [Speed] Decay: [DecayMultiplier] StartX: [StartX] StartY: [StartY]'
                    }
                ]
            };
        }

        async followSineWave(args, util) {
            const amplitude = args.Amplitude;
            const frequency = args.Frequency;
            const speed = args.Speed;
            const decay = args.DecayMultiplier;
            const startX = args.StartX;
            const startY = args.StartY;
            
            util.target.setXY(startX, startY);

            let t = 0;

            for (let i = 0; i < 3600; i++) {
                // NT is exactly negative T, adjusted by your decay multiplier
                let nt = (t * decay) * -1;
                
                let yOffset = amplitude * Math.exp(nt) * Math.sin(2 * Math.PI * frequency * t);
                
                util.target.setXY(startX + (i * speed), startY + yOffset);
                
                t += 0.03333333333; // 30 FPS timing

                await util.yield();
            }
        }
    }

    Scratch.extensions.register(new SoundWaveDecay());
})();
