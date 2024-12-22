document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notes-container');
    const addNoteButton = document.querySelector('.add-note');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    
    loadNotes();

   
    function loadNotes(filter = '') {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notesContainer.innerHTML = ''; 
        notes.forEach((note, index) => {
            if (filter === '' || note.content.toLowerCase().includes(filter.toLowerCase())) {
                createNoteElement(note, index);
            }
        });
    }

    
    function saveNotes(notes) {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    
    function createNoteElement(note, index) {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.setAttribute('data-index', index);
    
        const textarea = document.createElement('textarea');
        textarea.value = note.content;
        textarea.addEventListener('input', (e) => {
            note.content = e.target.value;
            saveNotesToLocalStorage();
        });
    
        const satisfactionLabel = document.createElement('label');
        satisfactionLabel.textContent = "¿Lo lograste con éxito?";
        satisfactionLabel.style.marginTop = "10px";
    
        const satisfactionCheckbox = document.createElement('input');
        satisfactionCheckbox.type = 'checkbox';
        satisfactionCheckbox.checked = note.satisfied || false;
        satisfactionCheckbox.addEventListener('change', (e) => {
            note.satisfied = e.target.checked;
            saveNotesToLocalStorage();
        });
    
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => {
            deleteNote(index);
        });
    
        noteElement.appendChild(textarea);
        noteElement.appendChild(satisfactionLabel);
        noteElement.appendChild(satisfactionCheckbox);
        noteElement.appendChild(deleteButton);
        notesContainer.appendChild(noteElement);
    }
    

   
    function deleteNote(index) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.splice(index, 1);
        saveNotes(notes);
        loadNotes();
    }

    
    addNoteButton.addEventListener('click', () => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const newNote = { content: '' };
        notes.push(newNote);
        saveNotes(notes);
        loadNotes();
    });

    
    function saveNotesToLocalStorage() {
        const notes = [];
        const noteElements = document.querySelectorAll('.note');
        noteElements.forEach((noteElement, index) => {
            const textarea = noteElement.querySelector('textarea');
            const checkbox = noteElement.querySelector('input[type="checkbox"]');
            notes[index] = {
                content: textarea.value,
                satisfied: checkbox.checked
            };
        });
        saveNotes(notes);
    }
    

    
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        loadNotes(query);
    });
});
