const eventForm = document.getElementById('eventForm');
    const eventInput = document.getElementById('eventInput');
    const eventList = document.getElementById('eventList');

    // Load events from LocalStorage
    const loadEvents = () => {
      const events = JSON.parse(localStorage.getItem('events')) || [];
      events.forEach(event => {
        addEventToList(event.text, event.timestamp);
      });
    };

    // Save events to LocalStorage
    const saveEvent = (text, timestamp) => {
      const events = JSON.parse(localStorage.getItem('events')) || [];
      events.push({ text, timestamp });
      localStorage.setItem('events', JSON.stringify(events));
    };

    // Remove event from LocalStorage
    const removeEventFromStorage = (text, timestamp) => {
      let events = JSON.parse(localStorage.getItem('events')) || [];
      events = events.filter(event => event.text !== text || event.timestamp !== timestamp);
      localStorage.setItem('events', JSON.stringify(events));
    };

    // Add event to the list
    const addEventToList = (text, timestamp) => {
      const li = document.createElement('li');

      const eventText = document.createElement('span');
      eventText.textContent = text;
      li.appendChild(eventText);

      const eventTimestamp = document.createElement('div');
      eventTimestamp.className = 'timestamp';
      eventTimestamp.textContent = `Added on: ${timestamp}`;
      li.appendChild(eventTimestamp);

      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.classList.add('remove-btn');
      removeBtn.addEventListener('click', () => {
        removeEventFromStorage(text, timestamp);
        li.remove();
      });

      li.appendChild(removeBtn);
      eventList.appendChild(li);
    };

    // Handle form submission
    eventForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const eventText = eventInput.value.trim();
      if (eventText === '') return;

      const timestamp = new Date().toLocaleString();
      addEventToList(eventText, timestamp);
      saveEvent(eventText, timestamp);

      eventInput.value = '';
    });

    // Initialize
    loadEvents();