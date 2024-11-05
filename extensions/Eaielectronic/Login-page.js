// Name: Login
// ID: usermanagement
// Description: Allows you to create login forms.
// By: SERPENT1867 <https://scratch.mit.edu/users/serpent1867/>
// License: MPL-2.0
class UserManagement {
    constructor() {
        this.users = [];
        this.username = '';
        this.password = '';
        this.email = '';
        this.turbowarp = ''; // Variable for the form state
    }
  
    getInfo() {
        return {
            id: 'usermanagement',
            name: 'User Management',
            color1: '#ff3f00', // Slightly darker blue
            blocks: [
                {
                    opcode: 'openForm',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'open form for [ACTION]',
                    arguments: {
                        ACTION: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'actionsMenu',
                            defaultValue: 'login'
                        }
                    }
                },
                {
                    opcode: 'hideForm',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'hide form',
                },
                {
                    opcode: 'getUsername',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'username',
                },
                {
                    opcode: 'getPassword',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'password',
                },
                {
                    opcode: 'getEmail',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'email',
                },
                {
                    opcode: 'getFormState',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'form state',
                },
                {
                    opcode: 'clear',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'clear values',
                }
            ],
            menus: {
                actionsMenu: {
                    items: ['login', 'create account', 'recover password']
                }
            }
        };
    }
  
    openForm(args) {
        const { ACTION } = args;
        this.turbowarp = ACTION; // Update the form state
        this.hideForm(false); // Hide the previous form if open
  
        const form = document.createElement('form');
        form.style.position = 'absolute';
        form.style.top = '50%';
        form.style.left = '50%';
        form.style.transform = 'translate(-50%, -50%)';
        form.style.padding = '20px';
        form.style.backgroundColor = '#f9f9f9';
        form.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
        form.style.borderRadius = '8px';
        form.style.width = '300px';
        form.style.fontFamily = 'Arial, sans-serif';
  
        const closeButton = document.createElement('span');
        closeButton.textContent = 'â';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.color = '#000';
        closeButton.addEventListener('click', () => {
            this.hideForm();
        });
        form.appendChild(closeButton);
  
        const title = document.createElement('h2');
        title.textContent = ACTION.charAt(0).toUpperCase() + ACTION.slice(1);
        title.style.textAlign = 'center';
        title.style.color = '#333';
        form.appendChild(title);
  
        if (ACTION === 'login' || ACTION === 'create account') {
            const usernameInput = document.createElement('input');
            usernameInput.type = 'text';
            usernameInput.name = 'username';
            usernameInput.placeholder = 'Username';
            usernameInput.style.width = '90%';
            usernameInput.style.padding = '10px';
            usernameInput.style.margin = '10px 0';
            usernameInput.style.border = '1px solid #ccc';
            usernameInput.style.borderRadius = '4px';
            form.appendChild(usernameInput);
  
            const passwordInput = document.createElement('input');
            passwordInput.type = 'password';
            passwordInput.name = 'password';
            passwordInput.placeholder = 'Password';
            passwordInput.style.width = '90%';
            passwordInput.style.padding = '10px';
            passwordInput.style.margin = '10px 0';
            passwordInput.style.border = '1px solid #ccc';
            passwordInput.style.borderRadius = '4px';
            form.appendChild(passwordInput);
        }
  
        if (ACTION === 'create account' || ACTION === 'recover password') {
            const emailInput = document.createElement('input');
            emailInput.type = 'email';
            emailInput.name = 'email';
            emailInput.placeholder = 'Email';
            emailInput.style.width = '95%';
            emailInput.style.padding = '10px';
            emailInput.style.margin = '10px 0';
            emailInput.style.border = '1px solid #ccc';
            emailInput.style.borderRadius = '4px';
            form.appendChild(emailInput);
        }
  
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Send';
        submitButton.style.width = '100%';
        submitButton.style.padding = '10px';
        submitButton.style.margin = '10px 0';
        submitButton.style.backgroundColor = '#4CAF50';
        submitButton.style.color = '#fff';
        submitButton.style.border = 'none';
        submitButton.style.borderRadius = '4px';
        submitButton.style.cursor = 'pointer';
        form.appendChild(submitButton);
  
        const resetPasswordLink = document.createElement('a');
        resetPasswordLink.textContent = 'Reset password';
        resetPasswordLink.style.display = 'block';
        resetPasswordLink.style.textAlign = 'center';
        resetPasswordLink.style.marginTop = '10px';
        resetPasswordLink.style.color = '#007BFF';
        resetPasswordLink.style.cursor = 'pointer';
        resetPasswordLink.addEventListener('click', () => {
            this.hideForm(false);
            this.openForm({ ACTION: 'recover password' });
        });
        form.appendChild(resetPasswordLink);
  
        const createAccountLink = document.createElement('a');
        createAccountLink.textContent = 'Account creation';
        createAccountLink.style.display = 'block';
        createAccountLink.style.textAlign = 'center';
        createAccountLink.style.marginTop = '10px';
        createAccountLink.style.color = '#007BFF';
        createAccountLink.style.cursor = 'pointer';
        createAccountLink.addEventListener('click', () => {
            this.hideForm(false);
            this.openForm({ ACTION: 'create account' });
        });
        form.appendChild(createAccountLink);
  
        document.body.appendChild(form);
  
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            this.username = formData.get('username');
            this.password = formData.get('password');
            this.email = formData.get('email');
  
            if (ACTION === 'login') {
                this.login({ USERNAME: this.username, PASSWORD: this.password });
            } else if (ACTION === 'create account') {
                this.createAccount({ USERNAME: this.username, PASSWORD: this.password, EMAIL: this.email });
            } else if (ACTION === 'recover password') {
                this.recoverPassword({ EMAIL: this.email });
            }
  
            this.hideForm(false);
        });
    }
  
    hideForm() {
        const form = document.querySelector('form');
        if (form) {
            document.body.removeChild(form);
            this.turbowarp = ''; // Reset the form state
        }
    }
  
    createAccount(args) {
        const { USERNAME, PASSWORD, EMAIL } = args;
        const user = { username: USERNAME, password: PASSWORD, email: EMAIL };
        this.users.push(user);
        console.log(`Account created for ${USERNAME}`);
    }
  
    login(args) {
        const { USERNAME, PASSWORD } = args;
        const user = this.users.find(u => u.username === USERNAME && u.password === PASSWORD);
        console.log(user ? `Login successful for ${USERNAME}` : 'Incorrect username or password.');
    }
  
    recoverPassword(args) {
        const { EMAIL } = args;
        const user = this.users.find(u => u.email === EMAIL);
        console.log(user ? `Your password is: ${user.password}` : 'Email not found.');
    }
  
    getUsername() {
        return this.username;
    }
  
    getPassword() {
        return this.password;
    }
  
    getEmail() {
        return this.email;
    }
  
    getFormState() {
        return this.turbowarp;
    }
  
    clear() {
        this.username = '';
        this.password = '';
        this.email = '';
        console.log('Values have been cleared.');
    }
  }
  
  Scratch.extensions.register(new UserManagement());
  
