# Subconscious Profile - Kanban Board

A clean, minimal Kanban board for personal reflection and productivity built with React and PrimeReact.

## Features

- **10 Personal Reflection Columns**: Remember, Goals, Grateful For, Habits to Add, Habits to Stop, Personal Tools, Professional Tools, Health, Themes, Hobbies
- **Drag & Drop**: Move cards between columns seamlessly
- **Card Details Modal**: Click any card to edit title, notes, status, and sub-tasks
- **Status Management**: Track progress with Not Started, In Progress, Done statuses
- **Sub-tasks & Reflections**: Add, edit, and delete sub-tasks for each card
- **Persistent Storage**: All data is saved in localStorage
- **Clean UI**: Modern design with rounded corners, soft shadows, and clear typography
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- React 19
- PrimeReact (UI Components)
- @hello-pangea/dnd (Drag & Drop)
- Vite (Build Tool)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/arizsalman/notion-footer.git
cd notion-footer
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

### Adding Cards

- Click "New Page" button under any column
- Enter a title for your new card

### Editing Cards

- Click on any card to open the detail modal
- Edit title, notes, status, and sub-tasks
- Click "Save" to update the card

### Moving Cards

- Drag and drop cards between columns
- Changes are automatically saved

### Managing Sub-tasks

- In the card modal, add new sub-tasks
- Check/uncheck completed sub-tasks
- Delete sub-tasks you no longer need

### Deleting Cards

- Open the card modal
- Click the "Delete" button
- Confirm the deletion

## Project Structure

```
src/
├── component/
│   ├── kanban/
│   │   ├── KanbanBoard.jsx      # Main board component
│   │   ├── KanbanColumn.jsx     # Individual column component
│   │   ├── KanbanCard.jsx       # Individual card component
│   │   ├── CardModal.jsx        # Card detail modal
│   │   └── KanbanBoard.css      # Board styles
│   └── SubconsciousProfile.jsx  # Legacy component
├── App.jsx                      # Main app component
└── main.jsx                     # App entry point
```

## Features in Detail

### Columns

- **Remember**: Life lessons and important memories
- **Goals**: Spiritual, Social, Health objectives
- **Grateful For**: People, possessions, and experiences
- **Habits to Add**: Positive habits to develop
- **Habits to Stop**: Negative habits to break
- **Personal Tools**: Personal productivity tools
- **Professional Tools**: Work-related tools and resources
- **Health**: Health-related tasks and reminders
- **Themes**: Personal themes and topics
- **Hobbies**: Recreational activities and interests

### Card Properties

- **Title**: The main card name
- **Notes**: Detailed description or thoughts
- **Status**: Not Started, In Progress, or Done
- **Sub-tasks**: Smaller actionable items within the card

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Author

Ariz Salman - [GitHub](https://github.com/arizsalman)
