document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById('toggle-chat-btn');
  const chatBox = document.getElementById('chat-box');

  toggleBtn.addEventListener('click', () => {
    if (chatBox.style.display === 'none' || chatBox.style.display === '') {
      chatBox.style.display = 'block';
    } else {
      chatBox.style.display = 'none';
    }
  });
});
