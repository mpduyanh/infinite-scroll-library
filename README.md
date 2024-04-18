# Infinite Scroll App

## Overview

This app utilizes virtual scrolling to efficiently load and display large text files. It also includes features for text searching, highlighting, and jumping to specific occurrences of the search term.

## How to Initialize

1. **Frontend Initialization**:
   - Navigate to the `infiniteScrollLib` directory.
   - Run `npm run dev` to start the frontend server.

2. **Backend Initialization**:
   - Navigate to the `flask-server` directory.
   - Activate the virtual environment by running `venv/bin/activate`.
   - Run `python3 server.py` to start the backend server.

## Changing Text Files

1. Locate the `static` folder in the `flask-server` directory.
2. Add your desired text file to the `static` folder.
3. In the `server.py` file, locate the `getfiles` function.
4. In the `with open` operation within the `getfiles` function, change the file path to match your text file.
5. Reload the localhost site to view the updated text.

## Features

- **Infinite Scrolling**: Allows users to scroll through large text files smoothly.
- **Text Searching**: Users can search for specific words or phrases within the text.
- **Text Highlighting**: Highlights the searched text within the viewport.
- **Jumping to Text**: Provides buttons to jump to the next or previous occurrence of the searched text within the viewport.