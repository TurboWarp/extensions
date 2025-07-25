(function(sc) {
    // 使用Map对象存储缓存，性能更好
    const blurCache = new Map()
    
    // 创建SVG皮肤并处理加载回调
    function createSVGSkin(svgData,roX,roY) {
        const skinId = runtime.renderer.createSVGSkin(svgData)
        if (!skinId) return null
        
        const svgSkin = runtime.renderer._allSkins[skinId]
        svgSkin.rotationCenter = [roX,roY,0]
        const originalOnLoad = svgSkin._onLoad
        
        svgSkin._onLoad = function() {
            if (originalOnLoad) originalOnLoad.call(this)
            
            this._svgDirty = true
            const drawableIds = runtime.renderer._skinIdToDrawableId[skinId] || []
            drawableIds.forEach(drawableId => {
                runtime.renderer._allDrawables[drawableId]._skinDirty = true
            })
        }
        
        return skinId
    }

    const vm = sc.vm
    const runtime = vm.runtime
    
    // 完整多语言设置
    const setup = {
        'zh-cn': {
            'extension_name': '高级模糊特效',
            'setBlur': '为我设定[blur]级模糊的[costume]号造型 [cache]缓存',
            'setCache': '为[costume]号造型预生成[blurFrom]-[blurTo]级模糊缓存',
            'restoreBlur':'恢复造型',
            'cache_yes': '使用缓存',
            'cache_no': '不使用缓存',
            'clear_cache': '清空模糊缓存'
        },
        'en': {
            'extension_name': 'Advanced Blur',
            'setBlur': 'Set [costume] number of blur for me [blur] level [cache]',
            'setCache': 'Pre-generate blur cache [blurFrom]-[blurTo] for costume [costume]',
            'restoreBlur':'Restore costume',
            'cache_yes': 'use cache',
            'cache_no': 'no cache',
            'clear_cache': 'Clear blur cache'
        }
    }

    // 增强的翻译函数
    function translate(key, defaultValue, isClone = false) {
        const lang = sc.translate.language in setup ? sc.translate.language : 'en'
        
        // 如果是克隆体且有针对克隆体的翻译key，优先使用
        if (isClone && key === 'setBlur' && setup[lang]['setBlurForClone']) {
            return setup[lang]['setBlurForClone']
        }
        
        return setup[lang][key] || defaultValue || key
    }

    class BlurExtension {
        constructor() {
            sc.translate.setup(setup)
        }

        getInfo() {
            return {
                id: 'blur',
                name: translate('extension_name'),
                color1:'#668cff',
                color2:'#3d6dff',
                color3:'#7c9dff',
                blockIconURI:'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMjMuMDE4NTciIGhlaWdodD0iNzcuODM1NDEiIHZpZXdCb3g9IjAsMCwxMjMuMDE4NTcsNzcuODM1NDEiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xODAuMjQ3NDcsLTEzNi41ODExNykiPjxnIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMjE1LjkyMTY0LDE1NS44MjE0OWwtMjguNDI0MTYsMTguNzg4MTUiIHN0cm9rZT0iIzhjOWJmZiIgc3Ryb2tlLXdpZHRoPSIxNC41Ii8+PHBhdGggZD0iTTIxMS4zNzUzNywxOTguOTE1NDlsLTIzLjg3Nzg5LC0yNC4zMDU4NCIgc3Ryb2tlPSIjOGM5YmZmIiBzdHJva2Utd2lkdGg9IjE0LjUiLz48cGF0aCBkPSJNMjExLjM3NTM3LDE5OC45MTU0OWwtMjMuODc3ODksLTI0LjMwNTg0IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNC41Ii8+PHBhdGggZD0iTTIxNS45MjE2NCwxNTUuODIxNDlsLTI4LjQyNDE2LDE4Ljc4ODE1IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNC41Ii8+PGc+PHBhdGggZD0iTTI1NC40NjkyMSwxNDMuODMxMTdsLTI1LjE0NjMxLDYzLjMzNTQxIiBzdHJva2U9IiM4YzliZmYiIHN0cm9rZS13aWR0aD0iMTQuNSIvPjxwYXRoIGQ9Ik0yNTQuNDY5MjEsMTQzLjgzMTE3bC0yNS4xNDYzMSw2My4zMzU0MSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjQuNSIvPjwvZz48cGF0aCBkPSJNMjY5LjUzMDM2LDE1Ny4yMDg5OWwyNi40ODU2OCwyMS40MzQ0NiIgc3Ryb2tlPSIjOGM5YmZmIiBzdHJva2Utd2lkdGg9IjE0LjUiLz48cGF0aCBkPSJNMjY5LjkxMTQ3LDIwMC41NDA0NWwyNi4xMDQ1OCwtMjEuODk3IiBzdHJva2U9IiM4YzliZmYiIHN0cm9rZS13aWR0aD0iMTQuNSIvPjxwYXRoIGQ9Ik0yNjkuOTExNDcsMjAwLjU0MDQ1bDI2LjEwNDU4LC0yMS44OTciIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI0LjUiLz48cGF0aCBkPSJNMjY5LjUzMDM2LDE1Ny4yMDg5OWwyNi40ODU2OCwyMS40MzQ0NiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjQuNSIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjU5Ljc1MjUyNDk5OTk5OTk5OjQzLjQxODgzMDAwMDAwMDAxNC0tPg==',                
                blocks: [
                    {
                        opcode: 'setBlur',
                        blockType: 'command',
                        text: translate('setBlur', 'Set blur level [blur] for costume [costume]'),
                        arguments: {
                            blur: {
                                type: 'number',
                                defaultValue: 5
                            },
                            costume: {
                                type: 'number',
                                defaultValue: 1
                            },
                            cache: {
                                type: 'boolean',
                                defaultValue: translate('cache_yes'),
                                menu: 'cache'
                            }
                        }
                    },
                    {
                        opcode: 'setCache',
                        blockType: 'command',
                        text: translate('setCache'),
                        arguments: {
                            costume: {
                                type: 'number',
                                defaultValue: 1
                            },
                            blurFrom: {
                                type: 'number',
                                defaultValue: 0
                            },
                            blurTo: {
                                type: 'number',
                                defaultValue: 5
                            }
                        }
                    },
                    {
                        opcode: 'clearCache',
                        blockType: 'command',
                        text: translate('clear_cache')
                    },
                    {
                        opcode: 'restoreBlur',
                        blockType: 'command',
                        text: translate('restoreBlur', 'Restore costume'),
                    }
                ],
                menus: {
                    cache: {
                        items: [
                            {text: translate('cache_yes'), value: true},
                            {text: translate('cache_no'), value: false}
                        ]
                    }
                }
            }
        }

        setBlur(args, util) {
            try {
                const target = util.target
                let { blur, costume } = args
                const useCache = args.cache
                
                if(blur == 0) {
                    this.restoreBlur(undefined,util)
                    return
                }

                blur = Math.ceil(blur)
                costume = Math.max(1, Math.min(costume, target.sprite.costumes_.length))
                
                const cacheKey = `${target.sprite.name}_${costume}_${blur}`
                
                // 检查缓存
                if (useCache && blurCache.has(cacheKey)) {
                    const skinId = blurCache.get(cacheKey)
                    runtime.renderer.updateDrawableSkinId(target.drawableID, skinId)
                    runtime.requestRedraw()
                    return
                }
                
                // 处理SVG
                const originalSvgData = target.sprite.costumes_[costume - 1].asset.decodeText()
                console.log('rox:',roX)
                console.log('roy:',roY)
                const parser = new DOMParser()
                const doc = parser.parseFromString(originalSvgData, "image/svg+xml")
                const svg = doc.querySelector('svg')
                if (!svg) throw new Error("Invalid SVG")
                
                // 处理defs和filter
                let defs = svg.querySelector('defs') || 
                    svg.insertBefore(
                        doc.createElementNS('http://www.w3.org/2000/svg', 'defs'),
                        svg.firstChild
                    )
                
                let filter = defs.querySelector('#blurFilter') || 
                    defs.appendChild(
                        doc.createElementNS('http://www.w3.org/2000/svg', 'filter')
                    )
                filter.id = 'blurFilter'
                
                let blurFilter = filter.querySelector('feGaussianBlur') || 
                    filter.appendChild(
                        doc.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur')
                    )
                blurFilter.setAttribute('stdDeviation', blur)
                
                // 应用滤镜
                Array.from(svg.children)
                    .filter(child => child !== defs)
                    .forEach(child => child.setAttribute('filter', 'url(#blurFilter)'))
                
                // 创建新皮肤
                let roX = target.sprite.costumes_[costume - 1].rotationCenterX
                let roY = target.sprite.costumes_[costume - 1].rotationCenterY
                const newSvgData = new XMLSerializer().serializeToString(svg)
                const skinId = createSVGSkin(newSvgData,roX,roY)
                if (!skinId) throw new Error("Skin creation failed")
                
                // 更新缓存和渲染
                if (useCache) blurCache.set(cacheKey, skinId)
                runtime.renderer.updateDrawableSkinId(target.drawableID, skinId)
                runtime.requestRedraw()
                
            } catch (error) {
                console.error("Blur error:", error)
            }
        }

        setCache(args, util) {
            try {
                const target = util.target
                let { costume, blurFrom, blurTo } = args
                
                // 验证参数
                costume = Math.max(1, Math.min(costume, target.sprite.costumes_.length))
                blurFrom = Math.max(0, Math.ceil(blurFrom))
                blurTo = Math.max(blurFrom, Math.ceil(blurTo))
                
                // 获取原始SVG
                const originalSvgData = target.sprite.costumes_[costume - 1].asset.decodeText()
                const parser = new DOMParser()
                const doc = parser.parseFromString(originalSvgData, "image/svg+xml")
                const svg = doc.querySelector('svg')
                if (!svg) throw new Error("Invalid SVG")
                
                // 准备基础SVG结构
                let defs = svg.querySelector('defs') || 
                    svg.insertBefore(
                        doc.createElementNS('http://www.w3.org/2000/svg', 'defs'),
                        svg.firstChild
                    )
                
                let filter = defs.querySelector('#blurFilter') || 
                    defs.appendChild(
                        doc.createElementNS('http://www.w3.org/2000/svg', 'filter')
                    )
                filter.id = 'blurFilter'
                
                let blurFilter = filter.querySelector('feGaussianBlur') || 
                    filter.appendChild(
                        doc.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur')
                    )
                
                // 应用基础滤镜
                Array.from(svg.children)
                    .filter(child => child !== defs)
                    .forEach(child => child.setAttribute('filter', 'url(#blurFilter)'))
                
                // 批量生成缓存
                for (let i = blurFrom; i <= blurTo; i++) {
                    blurFilter.setAttribute('stdDeviation', i)
                    const newSvgData = new XMLSerializer().serializeToString(svg)
                    const skinId = createSVGSkin(newSvgData)
                    if (skinId) {
                        blurCache.set(`${target.sprite.name}_${costume}_${i}`, skinId)
                    }
                }
                
            } catch (error) {
                console.error("Pre-cache error:", error)
            }
        }

        clearCache() {
            blurCache.clear()
        }
        restoreBlur(args,util){
            let {target} = util
            target.updateAllDrawableProperties()
        }
    }

    // 注册扩展
    sc.extensions.register(new BlurExtension())
})(Scratch)