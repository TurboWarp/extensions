// Name: EmailJS
// ID: emailjsExtension
// Description: Allows sending emails using EmailJS service. Requires EmailJS account setup.
// License: MPL-2.0

(function(Scratch) {
    'use strict';
    
    const emailjsUrl = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    
    class EmailJSExtension {
        constructor() {
            this.userId = '';
            this.serviceId = '';
            this.templateId = '';
            this.emailjsLoaded = false;
        }
        
        getInfo() {
            return {
                id: 'emailjsExtension',
                name: 'EmailJS', // 英文名称符合规范
                unsandboxed: true,
                blocks: [
                    {
                        opcode: 'setup',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Set EmailJS User ID:[USERID] Service ID:[SERVICEID] Template ID:[TEMPLATEID]',
                        arguments: {
                            USERID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            },
                            SERVICEID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            },
                            TEMPLATEID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'send',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Send email To:[TO] Subject:[SUBJECT] Message:[MESSAGE]',
                        arguments: {
                            TO: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            },
                            SUBJECT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            },
                            MESSAGE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    }
                ]
            };
        }

        setup(args) {
            this.userId = args.USERID;
            this.serviceId = args.SERVICEID;
            this.templateId = args.TEMPLATEID;
            
            if (!this.emailjsLoaded) {
                return this._loadEmailJS().then(() => {
                    this.emailjsLoaded = true;
                    window.emailjs.init(this.userId);
                });
            }
            return Promise.resolve();
        }
        
        send(args) {
            if (!this.emailjsLoaded) {
                return this._loadEmailJS().then(() => {
                    this.emailjsLoaded = true;
                    return this._sendEmail(args);
                });
            }
            return this._sendEmail(args);
        }
        
        _sendEmail(args) {
            const templateParams = {
                email: args.TO,
                subject: args.SUBJECT,
                message: args.MESSAGE
            };
            
            return window.emailjs.send(this.serviceId, this.templateId, templateParams)
                .then(() => console.log('Email sent successfully'))
                .catch(error => {
                    console.error('Failed to send email:', error);
                    throw new Error('Failed to send email');
                });
        }
        
        _loadEmailJS() {
            return new Promise((resolve, reject) => {
                if (typeof window.emailjs !== 'undefined') {
                    resolve();
                    return;
                }
                
                const script = document.createElement('script');
                script.src = emailjsUrl;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error('Failed to load EmailJS'));
                document.head.appendChild(script);
            });
        }
    }
    
    Scratch.extensions.register(new EmailJSExtension());
})(Scratch);
