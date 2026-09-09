(function(Scratch) {
  'use strict';

  // Tên phòng chat (có thể đổi chuỗi này để tạo phòng riêng)
  const ROOM_ID = 'penguin_room_chat_v1';
  const SSE_URL = `https://ntfy.sh/${ROOM_ID}/sse`;
  const POST_URL = `https://ntfy.sh/${ROOM_ID}`;

  let lastMessage = '';
  const localBroadcast = new BroadcastChannel(ROOM_ID);

  // Đồng bộ tức thì giữa các Tab trên cùng một máy
  localBroadcast.onmessage = (e) => {
    lastMessage = e.data;
    Scratch.vm.runtime.startHats('superChat_onMessage');
  };

  // Đồng bộ qua Internet cho các máy khác nhau (Dùng SSE tránh lỗi CORS)
  let eventSource = null;
  function startListening() {
    if (eventSource) eventSource.close();
    eventSource = new EventSource(SSE_URL);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'message' && data.message) {
          lastMessage = data.message;
          Scratch.vm.runtime.startHats('superChat_onMessage');
        }
      } catch (err) {}
    };

    eventSource.onerror = () => {
      setTimeout(startListening, 3000);
    };
  }

  startListening();

  class SuperChatExtension {
    getInfo() {
      return {
        id: 'superChat',
        name: 'Chat mutiplayer',
        color1: '#0088cc',
        color2: '#006699',
        blocks: [
          {
            opcode: 'sendMessage',
            blockType: Scratch.BlockType.COMMAND,
            text: 'send to [TEXT]',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'hi'
              }
            }
          },
          {
            opcode: 'onMessage',
            blockType: Scratch.BlockType.HAT,
            text: 'When receiving a new message',
            isEdgeTriggered: false
          },
          {
            opcode: 'getLastMessage',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Just received the message'
          }
        ]
      };
    }

    onMessage() {
      return true;
    }

    sendMessage(args) {
      const msg = String(args.TEXT);
      if (!msg) return;

      // Gửi local
      localBroadcast.postMessage(msg);

      // Gửi internet
      fetch(POST_URL, {
        method: 'POST',
        body: msg
      }).catch(() => {});
    }

    getLastMessage() {
      return lastMessage;
    }
  }

  Scratch.extensions.register(new SuperChatExtension());
})(Scratch);
